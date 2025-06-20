import React, { useImperativeHandle } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Checkbox } from "@mantine/core";
import { BsPlusCircle, BsDashCircle, BsTrash3 } from "react-icons/bs";
import { formatNumber, parseNumber } from "../utils/thousandFormatter";

interface SubLineItem {
  description: string;
  value: number;
}

interface LineItemProps {
  onRemove?: () => void;
  onAmountChange?: (total_item_fee: number) => void;
  initialValues?: {
    id: string;
    item: string;
    total_item_fee: number;
    required: boolean;
    subLineItems: SubLineItem[];
  };
}

const LineItem = React.forwardRef(
  ({ onRemove, onAmountChange, initialValues }: LineItemProps, ref) => {
    const form = useForm({
      initialValues: {
        id: initialValues?.id,
        required: initialValues?.required || false,
        item: initialValues?.item || "",
        total_item_fee: initialValues?.total_item_fee || 0,
        subLineItems: initialValues?.subLineItems || ([] as SubLineItem[]),
      },
      validate: {
        item: (value) => (value ? null : "Description is required"),
        total_item_fee: (value) =>
          value > 0 ? null : "Amount must be greater than 0",
      },
    });

    useImperativeHandle(ref, () => ({
      getValues: () => form.values,
    }));

    const handleAddSubLineItem = () => {
      const totalSubLineItems = form.values.subLineItems.reduce(
        (sum, item) => sum + item.value,
        0
      );

      if (totalSubLineItems < form.values.total_item_fee) {
        const remainingAmount = form.values.total_item_fee - totalSubLineItems;
        form.insertListItem("subLineItems", {
          description: "",
          value: remainingAmount,
        });
      }
    };

    const handleSubLineItemChange = (
      index: number,
      field: keyof SubLineItem,
      value: any,
      triggerAdd: boolean = false
    ) => {
      form.setFieldValue(`subLineItems.${index}.${field}`, value);

      if (triggerAdd) {
        const totalSubLineItems = form.values.subLineItems.reduce(
          (sum, item) => sum + item.value,
          0
        );

        if (totalSubLineItems < form.values.total_item_fee) {
          const remainingAmount =
            form.values.total_item_fee - totalSubLineItems;
          form.insertListItem("subLineItems", {
            description: "",
            value: remainingAmount,
          });
        }
      }
    };

    const handleRemoveSubLineItem = (index: number) => {
      // Make a copy and remove the item first
      const updatedSubLineItems = [...form.values.subLineItems];
      updatedSubLineItems.splice(index, 1);

      // Recalculate total
      const totalSubLineItems = updatedSubLineItems.reduce(
        (sum, item) => sum + item.value,
        0
      );

      form.removeListItem("subLineItems", index);

      // Adjust the last item's value to make total equal to line item total_item_fee
      if (updatedSubLineItems.length > 0) {
        const lastIndex = updatedSubLineItems.length - 1;
        const remainingAmount = form.values.total_item_fee - totalSubLineItems;

        // Update the form field value after deletion
        form.setFieldValue(
          `subLineItems.${lastIndex}.value`,
          updatedSubLineItems[lastIndex].value + remainingAmount
        );
      }
    };

    return (
      <form>
        <div className="flex gap-2 items-center">
          <Checkbox
            {...form.getInputProps("required")}
            checked={form.values.required}
          />
          <div className="flex-1 flex items-center">
            <TextInput
              className="flex-1"
              placeholder="Major line item description"
              leftSection={
                (form.values.item || form.values.total_item_fee > 0) && (
                  <BsPlusCircle
                    onClick={handleAddSubLineItem}
                    className="cursor-pointer"
                    size={12}
                  />
                )
              }
              // Plus sign as left section
              rightSection={
                onRemove && (
                  <BsTrash3
                    onClick={onRemove}
                    className="cursor-pointer text-red-500"
                    size={14}
                    title="Remove line item"
                  />
                )
              }
              {...form.getInputProps("item")}
            />
            <span className="h-[2px] w-[30px] bg-gray-200"></span>
            <TextInput
              className="w-[120px]"
              type="text"
              placeholder="Amount"
              value={
                form.values.total_item_fee
                  ? formatNumber(form.values.total_item_fee)
                  : ""
              }
              onChange={(event) => {
                const raw = event.target.value.replace(/,/g, "");
                const parsed = parseFloat(raw) || 0;
                form.setFieldValue("total_item_fee", parsed);
                onAmountChange?.(parsed);
              }}
              disabled={!form.values.item} // Disable if item is empty
            />
          </div>
        </div>

        {/* Sub Line Items */}
        <div className="pl-12 grid gap-2 mt-1">
          {form.values.subLineItems.map((item, index) => (
            <div key={index} className="flex  items-center">
              <TextInput
                className="flex-1"
                placeholder="Subline description"
                leftSection={
                  <BsDashCircle
                    onClick={() => handleRemoveSubLineItem(index)} // Minus sign to remove subline item
                    size={12}
                  />
                } // Minus sign as left section
                value={item.description}
                onChange={(event) =>
                  handleSubLineItemChange(
                    index,
                    "description",
                    event.target.value
                  )
                }
              />
              <span className="h-[2px] w-[30px] bg-gray-200"></span>
              <TextInput
                className="w-[120px]"
                type="text"
                value={formatNumber(item.value)}
                onChange={(event) =>
                  handleSubLineItemChange(
                    index,
                    "value",
                    parseNumber(event.target.value)
                  )
                }
                onBlur={() =>
                  handleSubLineItemChange(index, "value", item.value, true)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleSubLineItemChange(index, "value", item.value, true);
                  }
                }}
              />
            </div>
          ))}
        </div>
      </form>
    );
  }
);

export default LineItem;
