import React, { useState } from "react";
import { Button, Select, Text, TextInput, ActionIcon } from "@mantine/core";
import { BsTrash } from "react-icons/bs";
import LineItem from "./LineItem";
import { useGetSchoolBankAccountsQuery } from "../services/api";
import { useAppSelector, useAppDispatch } from "@src/index";
import type { RegisteredBankAccount } from "../types/index";
import { updateField } from "../services/invoiceSlice";

interface SubLineItem {
  description: string;
  value: number;
}

interface LineItemData {
  id: number;
  description: string;
  amount: number;
  subLineItems: SubLineItem[];
}

interface BankLineGroup {
  bankId: string;
  lineItems: LineItemData[];
}

type LineItemRef = React.RefObject<{
  getValues: () => any;
  validate: () => { hasErrors: boolean };
} | null>;

const SplittedAccountInvoice = ({ nextStep }: { nextStep: () => void }) => {
  const dispatch = useAppDispatch();
  const schoolId = useAppSelector((state) => state?.school?.schoolId);
  const invoice = useAppSelector((state) => state.invoice);
  const { data: accounts = [] } = schoolId
    ? useGetSchoolBankAccountsQuery({ schoolId })
    : { data: [] };
  const [bankGroups, setBankGroups] = useState<BankLineGroup[]>(() => {
    const groups: BankLineGroup[] = [];

    for (const [bankId, items] of Object.entries(invoice.line_items || {})) {
      const lineItems = items.map((item, idx) => {
        const subLineItems: SubLineItem[] = Object.entries(
          item.line_item_breakdown || {}
        ).map(([description, value]) => ({
          description,
          value: Number(value),
        }));

        return {
          id: Date.now() + idx,
          description: item.item,
          amount: item.total_item_fee,
          subLineItems,
        };
      });

      groups.push({ bankId, lineItems });
    }

    return groups.length > 0 ? groups : [{ bankId: "", lineItems: [] }];
  });

  const [lineItemRefs, setLineItemRefs] = useState<LineItemRef[][]>(() => {
    const refs: LineItemRef[][] = [];

    for (const items of Object.values(invoice.line_items || {})) {
      const groupRefs = (items as any[]).map(() =>
        React.createRef<{
          getValues: () => any;
          validate: () => { hasErrors: boolean };
        }>()
      );
      refs.push(groupRefs);
    }

    return refs.length > 0 ? refs : [[]];
  });

  const bankOptions = accounts.map((account: RegisteredBankAccount) => ({
    label: `${account.title} - [${account.account_name}] (${account.account_number})`,
    value: account.paystack_subaccount,
  }));

  const handleAddBankGroup = () => {
    if (bankGroups.length >= accounts.length) return;
    setBankGroups([...bankGroups, { bankId: "", lineItems: [] }]);
    setLineItemRefs([...lineItemRefs, []]);
  };

  const handleRemoveBankGroup = (groupIndex: number) => {
    const updatedGroups = [...bankGroups];
    updatedGroups.splice(groupIndex, 1);
    setBankGroups(updatedGroups);

    const updatedRefs = [...lineItemRefs];
    updatedRefs.splice(groupIndex, 1);
    setLineItemRefs(updatedRefs);
  };

  const handleBankChange = (groupIndex: number, newBankId: string | null) => {
    if (!newBankId) return;
    const updated = [...bankGroups];
    updated[groupIndex].bankId = newBankId;
    setBankGroups(updated);
  };

  const handleAddLineItem = (groupIndex: number) => {
    const updated = [...bankGroups];
    updated[groupIndex].lineItems.push({
      id: Date.now(),
      description: "",
      amount: 0,
      subLineItems: [],
    });
    setBankGroups(updated);

    const updatedRefs = [...lineItemRefs];
    if (!updatedRefs[groupIndex]) updatedRefs[groupIndex] = [];
    updatedRefs[groupIndex].push(
      React.createRef<{
        getValues: () => any;
        validate: () => { hasErrors: boolean };
      }>()
    );
    setLineItemRefs(updatedRefs);
  };

  const handleRemoveLineItem = (groupIndex: number, lineItemId: number) => {
    const updated = [...bankGroups];
    const indexToRemove = updated[groupIndex].lineItems.findIndex(
      (item) => item.id === lineItemId
    );
    if (indexToRemove !== -1) {
      updated[groupIndex].lineItems.splice(indexToRemove, 1);
      setBankGroups(updated);

      const updatedRefs = [...lineItemRefs];
      updatedRefs[groupIndex].splice(indexToRemove, 1);
      setLineItemRefs(updatedRefs);
    }
  };

  const handleLineItemAmountChange = (
    groupIndex: number,
    lineItemId: number,
    amount: number
  ) => {
    const updated = [...bankGroups];
    const item = updated[groupIndex].lineItems.find(
      (li) => li.id === lineItemId
    );
    if (item) item.amount = amount;
    setBankGroups(updated);
  };

  const getGroupTotal = (groupIndex: number) =>
    bankGroups[groupIndex].lineItems.reduce((s, item) => s + item.amount, 0);

  const totalAmount = bankGroups.reduce(
    (sum, group) =>
      sum + group.lineItems.reduce((s, item) => s + item.amount, 0),
    0
  );

  const getAvailableBankOptions = (groupIndex: number) => {
    const selected = bankGroups
      .filter((_, idx) => idx !== groupIndex)
      .map((g) => g.bankId);
    return bankOptions.filter(
      (opt: { label: string; value: string }) => !selected.includes(opt.value)
    );
  };

  const handlePreview = async () => {
    let allValid = true;
    const lineItemsByBank: Record<string, any[]> = {};

    for (let groupIndex = 0; groupIndex < bankGroups.length; groupIndex++) {
      const group = bankGroups[groupIndex];
      const bankId = group.bankId;
      if (!bankId) continue;

      for (let lineIndex = 0; lineIndex < group.lineItems.length; lineIndex++) {
        const ref = lineItemRefs[groupIndex]?.[lineIndex];
        const validationResult = ref?.current?.validate?.();

        if (!validationResult || validationResult.hasErrors) {
          allValid = false;
          break;
        }

        const values = ref?.current?.getValues();
        if (!values) continue;

        const breakdown = values.subLineItems?.reduce(
          (
            acc: Record<string, number>,
            sub: { description: string; value: number }
          ) => {
            if (sub.description && sub.value) {
              acc[sub.description] = sub.value;
            }
            return acc;
          },
          {} as Record<string, number>
        );

        const itemData = {
          item: values.item,
          required: values.required,
          total_item_fee: values.total_item_fee,
          line_item_breakdown: breakdown,
        };

        if (!lineItemsByBank[bankId]) {
          lineItemsByBank[bankId] = [];
        }

        lineItemsByBank[bankId].push(itemData);
      }
    }

    if (!allValid) {
      // optionally toast or alert
      console.warn(
        "Validation failed. Please correct errors before continuing."
      );
      return;
    }

    const payload = {
      total_fees: totalAmount,
      line_items: lineItemsByBank,
    };

    console.log("Previewing invoice with data:", payload);
    dispatch(updateField(payload));
    nextStep();
  };

  return (
    <div className="space-y-6">
      {bankGroups.map((group, groupIndex) => (
        <div
          key={groupIndex}
          className="p-4 rounded bg-[var(--muted-card)] border border-gray-300"
        >
          <div className="flex items-center justify-between mb-2">
            <Text>Bank Group {groupIndex + 1}</Text>
            {bankGroups.length > 1 && (
              <ActionIcon
                color="red"
                onClick={() => handleRemoveBankGroup(groupIndex)}
              >
                <BsTrash size={16} />
              </ActionIcon>
            )}
          </div>

          <Select
            label="Select bank for this group"
            data={getAvailableBankOptions(groupIndex)}
            value={group.bankId}
            onChange={(value) => handleBankChange(groupIndex, value)}
            placeholder="Choose bank"
          />

          <div className="mt-4 space-y-3">
            {group.lineItems.map((item, idx) => (
              <LineItem
                key={item.id}
                ref={lineItemRefs[groupIndex]?.[idx]}
                initialValues={{
                  id: item.id.toString(),
                  item: item.description,
                  total_item_fee: item.amount,
                  required: false,
                  subLineItems: item.subLineItems || [],
                }}
                onRemove={() => handleRemoveLineItem(groupIndex, item.id)}
                onAmountChange={(amt) =>
                  handleLineItemAmountChange(groupIndex, item.id, amt)
                }
              />
            ))}
          </div>

          <Button
            variant="light"
            onClick={() => handleAddLineItem(groupIndex)}
            className="mt-4"
          >
            + Add Line Item
          </Button>

          <div className="flex items-center gap-2 mt-4">
            <span className="font-semibold text-sm">Group Total</span>
            <TextInput
              value={getGroupTotal(groupIndex).toLocaleString()}
              readOnly
              leftSection={<span className="text-sm text-gray-500">₦</span>}
            />
          </div>
        </div>
      ))}

      {bankGroups.length < accounts.length && (
        <Button onClick={handleAddBankGroup} variant="outline">
          + Add Bank Group
        </Button>
      )}

      {totalAmount > 0 && (
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2 mt-8">
            <span className="font-semibold text-sm">Total</span>
            <TextInput
              value={totalAmount.toLocaleString()}
              readOnly
              leftSection={<span className="text-sm text-gray-500">₦</span>}
            />
          </div>
          <div className="flex gap-4 mt-4">
            <Button disabled={totalAmount < 1} color="gray">
              Save as draft
            </Button>
            <Button disabled={totalAmount < 1} onClick={handlePreview}>
              Preview invoice
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SplittedAccountInvoice;
