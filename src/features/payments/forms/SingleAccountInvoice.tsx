import React, { useState } from "react";
import LineItem from "./LineItem";
import { TextInput, Select, Button } from "@mantine/core";
import { BsPlusCircle } from "react-icons/bs";
import { useAppSelector, useAppDispatch } from "@src/index";
import { useGetSchoolBankAccountsQuery } from "../services/api";
import type { RegisteredBankAccount } from "../types/index";
import { updateField } from "../services/invoiceSlice";

// Interface for ref exposed by LineItem
interface LineItemRef {
  getValues: () => any;
  validate: () => { hasErrors: boolean };
}

interface LineItemData {
  id: string;
  amount: number;
  ref: React.RefObject<LineItemRef | null>;
}

const generateId = () =>
  Math.random().toString(36).substring(2, 9) + Date.now();

const SingleAccountInvoice = ({ nextStep }: { nextStep: () => void }) => {
  const dispatch = useAppDispatch();
  const invoice = useAppSelector((state) => state.invoice);
  // Automatically pick the first account key
  const selectedAccountFromStore =
    Object.keys(invoice.line_items || {})[0] || null;
  const [selectedAccount, setSelectedAccount] = useState<string | null>(
    selectedAccountFromStore
  );
  const schoolId = useAppSelector((state) => state?.school?.schoolId);

  const { data: accounts = [] } = schoolId
    ? useGetSchoolBankAccountsQuery({ schoolId })
    : { data: [] };
  const [lineItems, setLineItems] = useState<LineItemData[]>(() => {
    const savedItems = selectedAccountFromStore
      ? invoice.line_items?.[selectedAccountFromStore]
      : undefined;

    if (savedItems && savedItems.length > 0) {
      return savedItems.map((item) => ({
        id: item.id,
        amount: item.total_item_fee,
        ref: { current: null }, // ✅ Use a manually constructed ref object
      }));
    }

    return [{ id: generateId(), amount: 0, ref: { current: null } }]; // ✅ Use a manually constructed ref object
  });

  const handleAddLineItem = () => {
    const newLineItem: LineItemData = {
      id: generateId(), // Generate a unique ID
      amount: 0,
      ref: { current: null }, // ✅ manually constructed ref object
    };
    setLineItems((prev) => [...prev, newLineItem]);
  };

  const handleRemoveLineItem = (id: string) => {
    setLineItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAmountChange = (id: string, amount: number) => {
    setLineItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, amount } : item))
    );
  };

  const totalAmount = lineItems.reduce((sum, item) => sum + item.amount, 0);

  const bankAccountOptions = accounts.map((account: RegisteredBankAccount) => ({
    label: `${account.title} - [${account.account_name}] (${account.account_number})`,
    value: account.paystack_subaccount,
  }));

  // const handleLineItems = () => {
  //   const lineItemsData = lineItems.flatMap((item) => {

  //     const values = item.ref.current?.getValues();

  //     if (!values) return []; // return empty array instead of null

  //     const breakdown = values.subLineItems.reduce(
  //       (
  //         acc: Record<string, number>,
  //         subItem: { description: string; value: number }
  //       ) => {
  //         if (subItem.description && subItem.value) {
  //           acc[subItem.description] = subItem.value;
  //         }
  //         return acc;
  //       },
  //       {} as Record<string, number>
  //     );

  //     return [
  //       {
  //         id: values.id,
  //         item: values.item,
  //         total_item_fee: values.total_item_fee,
  //         required: values.required,
  //         line_item_breakdown: breakdown,
  //       },
  //     ];
  //   });

  //   const payload = {
  //     total_fees: totalAmount,
  //     line_items: {
  //       [selectedAccount!]: lineItemsData,
  //     },
  //   };

  //   dispatch(updateField(payload));
  //   nextStep();
  // };

  const handleLineItems = async () => {
    let allValid = true;
    const lineItemsData = [];

    for (const item of lineItems) {
      const result = item.ref.current?.validate?.();

      if (!result || result.hasErrors) {
        // ✅ proper check
        allValid = false;
        break;
      }

      const values = item.ref.current?.getValues();
      if (!values) continue;

      const breakdown = values.subLineItems.reduce(
        (
          acc: Record<string, number>,
          subItem: { description: string; value: number }
        ) => {
          if (subItem.description && subItem.value) {
            acc[subItem.description] = subItem.value;
          }
          return acc;
        },
        {} as Record<string, number>
      );

      lineItemsData.push({
        id: values.id,
        item: values.item,
        total_item_fee: values.total_item_fee,
        required: values.required,
        line_item_breakdown: breakdown,
      });
    }

    if (!allValid) return; // ✅ form will block submission and display errors

    const payload = {
      total_fees: totalAmount,
      line_items: {
        [selectedAccount!]: lineItemsData,
      },
    };

    dispatch(updateField(payload));
    nextStep();
  };

  return (
    <div>
      <section>
        <p className="text-sm font-semibold mb-4">Input line items</p>
        <div className="grid gap-2">
          {lineItems.map((item) => {
            const savedItem = invoice.line_items?.[selectedAccount!]?.find(
              (saved: any) => saved.id === item.id // Ensure 'saved' has an 'id' property
            );

            return (
              <div key={item.id} className="relative">
                <LineItem
                  ref={item.ref}
                  onRemove={() => handleRemoveLineItem(item.id)}
                  onAmountChange={(amount) =>
                    handleAmountChange(item.id, amount)
                  }
                  initialValues={
                    savedItem
                      ? {
                          id: item.id,
                          item: savedItem.item,
                          required: savedItem.required,
                          total_item_fee: savedItem.total_item_fee,
                          subLineItems: Object.entries(
                            savedItem.line_item_breakdown || {}
                          ).map(([description, value]) => ({
                            description,
                            value,
                          })),
                        }
                      : {
                          id: item.id, // 👈 Even if it's not from savedItem
                          item: "",
                          required: false,
                          total_item_fee: 0,
                          subLineItems: [],
                        }
                  }
                />
              </div>
            );
          })}
        </div>

        <div className="flex flex-col items-end gap-2 mt-8">
          <p
            onClick={handleAddLineItem}
            className="text-xs flex items-center gap-2 cursor-pointer"
          >
            <BsPlusCircle size={12} /> Add
          </p>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">Total Amount</span>
            <TextInput
              className="w-[120px] font-bold"
              value={totalAmount.toLocaleString()}
              readOnly
              leftSection={<span className="text-sm text-gray-500">₦</span>}
            />
          </div>
        </div>

        {totalAmount > 0 && (
          <Select
            data={bankAccountOptions}
            label="Bank Account"
            placeholder="Select account to pay fees into"
            value={selectedAccount}
            onChange={setSelectedAccount}
          />
        )}

        <div className="flex gap-4 justify-end mt-4 ">
          <Button disabled={totalAmount < 1} color="gray">
            Save as draft
          </Button>
          <Button
            disabled={totalAmount < 1 || !selectedAccount}
            onClick={handleLineItems}
          >
            Preview invoice
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SingleAccountInvoice;
