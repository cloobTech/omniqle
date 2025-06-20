import { useState } from "react";
import { Button, Select, Text, TextInput, ActionIcon } from "@mantine/core";
import { BsTrash } from "react-icons/bs";
import LineItem from "./LineItem";

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

const bankOptions = [
  { label: "Access Bank", value: "access" },
  { label: "GTBank", value: "gtb" },
  { label: "Zenith Bank", value: "zenith" },
];

const SplittedAccountInvoice = ({ nextStep }: { nextStep: () => void }) => {
  const [bankGroups, setBankGroups] = useState<BankLineGroup[]>([
    {
      bankId: "",
      lineItems: [],
    },
  ]);

  const handleAddBankGroup = () => {
    if (bankGroups.length >= 3) return;
    setBankGroups([
      ...bankGroups,
      {
        bankId: "",
        lineItems: [],
      },
    ]);
  };

  const handleRemoveBankGroup = (groupIndex: number) => {
    const updated = [...bankGroups];
    updated.splice(groupIndex, 1);
    setBankGroups(updated);
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
  };

  const handleRemoveLineItem = (groupIndex: number, lineItemId: number) => {
    const updated = [...bankGroups];
    updated[groupIndex].lineItems = updated[groupIndex].lineItems.filter(
      (item) => item.id !== lineItemId
    );
    setBankGroups(updated);
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

  const totalAmount = bankGroups.reduce(
    (sum, group) =>
      sum + group.lineItems.reduce((s, item) => s + item.amount, 0),
    0
  );

  const getGroupTotal = (groupIndex: number) => {
    return bankGroups[groupIndex].lineItems.reduce(
      (s, item) => s + item.amount,
      0
    );
  };

  const getAvailableBankOptions = (groupIndex: number) => {
    const selectedBankIds = bankGroups
      .filter((_, idx) => idx !== groupIndex)
      .map((g) => g.bankId);
    return bankOptions.filter(
      (option) => !selectedBankIds.includes(option.value)
    );
  };

  return (
    <div className="space-y-6">
      {bankGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="p-4 rounded shadow">
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
            {group.lineItems.map((item) => (
              <LineItem
                key={item.id}
                onRemove={() => handleRemoveLineItem(groupIndex, item.id)}
                onAmountChange={(amt) =>
                  handleLineItemAmountChange(groupIndex, item.id, amt)
                }
              />
            ))}
          </div>

          <Button
            variant="light"
            color="blue"
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

      {bankGroups.length < 3 && (
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
            <Button disabled={totalAmount < 1} onClick={nextStep}>
              Preview invoice
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SplittedAccountInvoice;
