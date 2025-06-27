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
      validate: () => {
        const { hasErrors } = form.validate();

        // ✅ Validate each subLineItem manually
        let subItemHasErrors = false;
        form.values.subLineItems.forEach((sub, index) => {
          if (!sub.description) {
            form.setFieldError(
              `subLineItems.${index}.description`,
              "Description is required"
            );
            subItemHasErrors = true;
          }
          if (!sub.value || sub.value <= 0) {
            form.setFieldError(
              `subLineItems.${index}.value`,
              "Value must be > 0"
            );
            subItemHasErrors = true;
          }
        });

        return { hasErrors: hasErrors || subItemHasErrors };
      },
    }));

    const handleAddSubLineItem = () => {
      const totalSub = form.values.subLineItems.reduce(
        (sum, item) => sum + item.value,
        0
      );
      const remaining = form.values.total_item_fee - totalSub;

      if (remaining > 0) {
        form.insertListItem("subLineItems", {
          description: "",
          value: remaining,
        });
      }
    };

    const handleSubLineItemChange = (
      index: number,
      field: keyof SubLineItem,
      value: any,
      triggerAdd = false
    ) => {
      form.setFieldValue(`subLineItems.${index}.${field}`, value);

      if (triggerAdd) {
        const totalSub = form.values.subLineItems.reduce(
          (sum, item) => sum + item.value,
          0
        );
        if (totalSub < form.values.total_item_fee) {
          const remaining = form.values.total_item_fee - totalSub;
          form.insertListItem("subLineItems", {
            description: "",
            value: remaining,
          });
        }
      }
    };

    const handleRemoveSubLineItem = (index: number) => {
      const updatedSubItems = [...form.values.subLineItems];
      updatedSubItems.splice(index, 1);

      const newTotal = updatedSubItems.reduce((s, i) => s + i.value, 0);
      form.removeListItem("subLineItems", index);

      if (updatedSubItems.length > 0) {
        const lastIndex = updatedSubItems.length - 1;
        const remaining = form.values.total_item_fee - newTotal;
        form.setFieldValue(
          `subLineItems.${lastIndex}.value`,
          updatedSubItems[lastIndex].value + remaining
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
              {...form.getInputProps("item")}
              leftSection={
                (form.values.item || form.values.total_item_fee > 0) && (
                  <BsPlusCircle
                    onClick={handleAddSubLineItem}
                    className="cursor-pointer"
                    size={12}
                  />
                )
              }
              rightSection={
                onRemove && (
                  <BsTrash3
                    onClick={onRemove}
                    className="cursor-pointer text-red-500"
                    size={14}
                  />
                )
              }
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
              error={form.errors.total_item_fee}
              onChange={(event) => {
                const raw = event.target.value.replace(/,/g, "");
                const parsed = parseFloat(raw) || 0;
                form.setFieldValue("total_item_fee", parsed);
                onAmountChange?.(parsed);
              }}
              disabled={!form.values.item}
            />
          </div>
        </div>

        <div className="pl-12 grid gap-2 mt-2">
          {form.values.subLineItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <TextInput
                className="flex-1"
                placeholder="Subline description"
                value={item.description}
                error={form.errors[`subLineItems.${index}.description`]}
                onChange={(e) =>
                  handleSubLineItemChange(index, "description", e.target.value)
                }
                leftSection={
                  <BsDashCircle
                    onClick={() => handleRemoveSubLineItem(index)}
                    size={12}
                  />
                }
              />
              <span className="h-[2px] w-[30px] bg-gray-200"></span>
              <TextInput
                className="w-[120px]"
                type="text"
                value={formatNumber(item.value)}
                error={form.errors[`subLineItems.${index}.value`]}
                onChange={(e) =>
                  handleSubLineItemChange(
                    index,
                    "value",
                    parseNumber(e.target.value)
                  )
                }
                onBlur={() =>
                  handleSubLineItemChange(index, "value", item.value, true)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
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
