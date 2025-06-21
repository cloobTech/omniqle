import { useAppSelector, useAppDispatch } from "@src/index";
import InvoicePreviewHeader from "./InvoicePreviewHeader";
import { TextInput, Button, Loader } from "@mantine/core";
import type { LineItem } from "../types/index";

import {
  useGetSchoolBankAccountsQuery,
  useCreateInvoiceMutation,
} from "../services/api";
import type { RegisteredBankAccount } from "../types/index";
import { bankLogoMap } from "../data/bankLogos";
import { useGetCurrentUserQuery } from "@features/users";
import { removeIdFields } from "../utils/removeField";
import { resetForm } from "../services/invoiceSlice";
import { notifications } from "@mantine/notifications";
import { useMemo } from "react";

const PreviewLineItems = ({
  line_items,
}: {
  line_items: Record<string, LineItem[]>;
}) => {
  const schoolId = useAppSelector((state) => state?.school?.schoolId);

  const { data: accounts = [] } = schoolId
    ? useGetSchoolBankAccountsQuery({ schoolId })
    : { data: [] };

  // Create a map of subaccount to account details
  const accountMap = useMemo(() => {
    const map: Record<string, { displayName: string; logo?: string }> = {};
    accounts.forEach((acc: RegisteredBankAccount) => {
      map[acc.paystack_subaccount] = {
        displayName: `${acc.account_name} - ${acc.account_number} (${acc.title})`,
        logo: bankLogoMap[acc.bank_code], // Map bank_code to logo
      };
    });
    return map;
  }, [accounts]);

  // Calculate the grand total of all total_item_fee
  const grandTotal = Object.values(line_items)
    .flat()
    .reduce((sum, item) => sum + Number(item.total_item_fee), 0);

  return (
    <div className="grid gap-4">
      {Object.entries(line_items).map(([subaccount, items]) => (
        <div key={subaccount} className="grid gap-1">
          <div className="bg-[var(--primary-lightest-2)] p-2 mt-2 rounded flex items-center gap-2">
            {/* Display bank logo */}
            {accountMap[subaccount]?.logo && (
              <img
                src={accountMap[subaccount].logo}
                alt="Bank Logo"
                className="w-6 h-6"
              />
            )}
            {/* Display account name */}
            <span>{accountMap[subaccount]?.displayName ?? subaccount}</span>
          </div>

          {items.map((item: LineItem, index: number) => (
            <div key={index}>
              <div className="flex items-center">
                <TextInput className="flex-1" value={item.item} readOnly />
                <span className="h-[2px] w-[30px] bg-gray-200"></span>
                <TextInput
                  className="w-[120px]"
                  value={item.total_item_fee}
                  readOnly
                />
              </div>

              {item.line_item_breakdown && (
                <div className="pl-12 grid gap-2 mt-1">
                  {Object.entries(item.line_item_breakdown).map(
                    ([key, value], i: number) => (
                      <div className="flex items-center" key={i}>
                        <TextInput
                          size="xs"
                          value={key}
                          readOnly
                          className="flex-1"
                        />
                        <span className="h-[2px] w-[30px] bg-gray-200"></span>
                        <TextInput
                          size="xs"
                          className="w-[120px]"
                          value={value}
                          readOnly
                        />
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}

      {/* Grand Total */}
      <div className="mt-4 flex justify-end items-center gap-2">
        <p className="text-sm font-semibold">Total Amount:</p>
        <TextInput
          className="w-[120px] font-bold"
          value={`₦${grandTotal.toLocaleString()}`}
          readOnly
        />
      </div>
    </div>
  );
};

const InvoicePreview = ({
  nextStep,
  prevStep,
}: {
  nextStep: () => void;
  prevStep: () => void;
}) => {
  const dispatch = useAppDispatch();
  const [createInvoice, { isLoading: publishingInvoice }] =
    useCreateInvoiceMutation();
  const schoolId = useAppSelector((state) => state?.school?.schoolId);
  const { data: currentUser } = schoolId
    ? useGetCurrentUserQuery({ schoolId })
    : { data: null };

  const roleMap: Record<string, string> = {
    school_admin: "admin",
    // Add other mappings if needed
  };

  const invoice = useAppSelector((state) => state.invoice);

  // Publish the invoice
  const publishInvoice = async () => {
    // Logic to publish the invoice

    let payload = {
      ...invoice,
      created_by: currentUser?.user?.id,
      role:
        roleMap[currentUser?.user?.role_in_school] ??
        currentUser?.user?.role_in_school,
      transaction_fee_bearer: "school" as "school" | "parent",
      accept_installments: "yes" as "yes" | "no",
      minimum_acceptable_payment: 50000,
      due_date: invoice.due_date ?? "",
      description: invoice.description ?? "",
    };

    // ✅ Remove discipline if it's an empty string
    if (!payload.discipline) {
      delete payload.discipline;
    }
    delete payload.isSplittedAccount;

    // ✅ Remove all `id` fields
    payload = removeIdFields(payload);

    try {
      await createInvoice({
        // @ts-ignore-next-line
        payload,
        schoolId: schoolId ?? 0,
        levelId: invoice.level_id ?? 0,
      }).unwrap();

      dispatch(resetForm());
      nextStep();
    } catch (err: unknown) {
      notifications.show({
        title: "Error",
        position: "top-right",
        message: `${
          (err as any)?.data?.errors?.[0]?.message[0] ??
          "Something went wrong. Please try again."
        }`,
        color: "red",
      });
    }
  };
  return (
    <div>
      <InvoicePreviewHeader />
      <div>
        <p className="text-sm">Your invoice details</p>
      </div>
      <PreviewLineItems line_items={invoice.line_items || {}} />

      <div className="flex items-center justify-between mt-8">
        <Button color="gray" onClick={prevStep}>
          Edit
        </Button>
        <Button disabled={publishingInvoice} onClick={publishInvoice}>
          {publishingInvoice && <Loader size="xs" className="mr-2" />}
          {publishingInvoice ? "Publishing..." : "Publish Invoice"}
        </Button>
      </div>
    </div>
  );
};

export default InvoicePreview;
