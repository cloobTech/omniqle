import React, { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import {
  Button,
  Select,
  TextInput,
  Text,
  SelectProps,
  Loader,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import ModalHeader from "@src/components/ModalHeader";
import {
  useGetBanksListQuery,
  useVerifyBankAccountMutation,
  useRegisterBankAccountMutation,
} from "../services/api";
import { setLocalBankList } from "../services/paymentSlice";
import { useAppDispatch, useAppSelector } from "@src/index";
import type { Bank } from "../types";
import { bankLogoMap } from "../data/bankLogos";
import { FaUniversity } from "react-icons/fa";
import { useModal } from "@src/index";

const RegisterSchoolBankAccount: React.FC = () => {
  const schoolId = useAppSelector((state) => state?.school?.schoolId);
  const { hideModal } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();
  const banks = useAppSelector((state) => state.banks);
  const {
    data: bankList,
    isSuccess,
    isLoading: loadingBanks,
  } = useGetBanksListQuery({});
  const [
    verifyBankAccount,
    {
      isLoading: fetchingAccountName,
      data: retrivedAcountName,
      isSuccess: accountNameRetrived,
      isError: accountNameError,
    },
  ] = useVerifyBankAccountMutation();
  const [registerBankAccount, { isLoading: bankRegistrationLoading }] =
    useRegisterBankAccountMutation();

  const form = useForm<{
    title: string;
    account_number: string;
    bank_code: string;
    school_email: string;
    primary_string: string;
    main_account: boolean;
  }>({
    initialValues: {
      title: "",
      account_number: "",
      bank_code: "",
      school_email: "",
      primary_string: "",
      main_account: false,
    },
    validate: {
      title: (value) => (value ? null : "Enter Title"),
      account_number: (value) =>
        String(value).length === 10 ? null : "Account number must be 10 digits",
      bank_code: (value) => (value ? null : "Select Bank"),
    },
  });

  const accountNumberLength = String(form.values.account_number).length;

  const handleVerifyAccountName = () => {
    const payload = {
      account_number: form.values.account_number,
      bank_code: form.values.bank_code,
    };

    verifyBankAccount(payload);
  };

  const selectData = Array.from(
    new Map(
      banks.localBankList.map((bank) => [
        bank.code,
        {
          value: bank.code,
          label: bank.name,
        },
      ])
    ).values()
  );

  const renderBankOption: SelectProps["renderOption"] = ({ option }) => {
    const logo = bankLogoMap[option.value];

    return (
      <div className="flex items-center gap-2">
        {logo ? (
          <img
            src={logo}
            alt={option.label}
            className="h-[20px] w-[20px] object-contain"
          />
        ) : (
          <FaUniversity size={20} className="text-gray-500" />
        )}
        <p className="text-sm">{option.label}</p>
      </div>
    );
  };

  const handleBankRegistration = async () => {
    setIsSubmitting(true); //stops the useEffect from running (verifying acc name)
    const payload = {
      title: form.values.title,
      school_name: "Olamide Caleb Bello School",
      school_email: "info@centrumscien.com",
      primary_string: "Olamide",
      main_account: false,
      school_id: schoolId,
      role: "admin",
      account: {
        account_number: form.values.account_number,
        bank_code: form.values.bank_code,
        account_name: retrivedAcountName.data.account_name,
      },
    };
    try {
      await registerBankAccount(payload).unwrap();

      notifications.show({
        title: "Success",
        message: "Account number succefully registered",
        color: "green",
        position: "top-right",
      });
      hideModal();
    } catch (err: any) {
      notifications.show({
        title: "Error",
        position: "top-right",
        message: `${
          (err as any)?.data?.error ?? "Something went wrong. Please try again."
        }`,
        color: "red",
      });
    }
  };
  // Update Bank List
  useEffect(() => {
    if (isSuccess && Array.isArray(bankList.data)) {
      const simplifiedList: Bank[] = bankList.data
        .filter((bank: any) => bank.active === true) // ✅ only active banks
        .map((bank: any) => ({
          name: bank.name,
          code: bank.code,
          logo: bankLogoMap[bank.code ?? ""],
        }));

      dispatch(setLocalBankList(simplifiedList));
    }
  }, [bankList, isSuccess, dispatch]);

  // Effect to watch form values
  useEffect(() => {
    const { title, account_number, bank_code } = form.values;

    if (
      !isSubmitting &&
      title &&
      account_number &&
      bank_code &&
      form.isValid()
    ) {
      handleVerifyAccountName();
    }
  }, [form.values]);
  return (
    <div className="w-[520px]">
      <ModalHeader
        title="Add Account"
        subTitle="Add bank accounts for your school"
      />
      <form
        onSubmit={form.onSubmit(handleBankRegistration)}
        className="my-4 grid gap-4"
      >
        <TextInput
          label="Title"
          placeholder="ex. Tuition fees"
          key={form.key("title")}
          {...form.getInputProps("title")}
        />
        <div>
          <TextInput
            type="text"
            label="Account Number"
            placeholder="Enter account number"
            maxLength={10}
            value={form.values.account_number} // Explicitly control the value
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const value: string = event.target.value;
              if (/^\d*$/.test(value) && value.length <= 10) {
                // Allow only numeric input and limit to 10 characters
                form.setFieldValue("account_number", value);
              }
            }}
          />
          {/* Show warning below the input */}
          {accountNumberLength > 0 && accountNumberLength < 10 && (
            <Text c={"red"} size="xs" mt={4}>
              account number must be 10 digit long
            </Text>
          )}
        </div>
        <Select
          leftSection={loadingBanks ? <Loader size="xs" /> : null}
          searchable
          data={selectData}
          label="Bank Name"
          placeholder="Select Bank"
          {...form.getInputProps("bank_code")}
          nothingFoundMessage="Bank not found"
          renderOption={renderBankOption}
        />
        <div>
          <TextInput
            label="Account Name"
            disabled
            value={
              fetchingAccountName
                ? "verifying account name..."
                : retrivedAcountName?.data?.account_name ?? ""
            }
            leftSection={fetchingAccountName ? <Loader size="xs" /> : null}
          />
          {accountNameError && (
            <small className="text-red-500 ">
              Error! kindly crosscheck bank name and account number
            </small>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <Button
            type="submit"
            disabled={!accountNameRetrived || bankRegistrationLoading}
          >
            {bankRegistrationLoading
              ? "Registering Account..."
              : "Save Account"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterSchoolBankAccount;
