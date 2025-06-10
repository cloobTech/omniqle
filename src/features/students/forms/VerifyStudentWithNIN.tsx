import React, { useState } from "react";
import { TextInput, Button, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useVerifyPersonMutation } from "@features/verification";
import { notifications } from "@mantine/notifications";
import { useModal } from "@src/index";
import { useAppSelector } from "@src/index";

const VerifyStudentWithNin = ({
  fullName,
  personId,
}: {
  fullName: string;
  personId: string;
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const schoolId = useAppSelector((state) => state?.school?.schoolId);
  const { hideModal } = useModal();
  const [verifyPerson, { isLoading, isError }] = useVerifyPersonMutation();
  const form = useForm({
    initialValues: {
      method: "nin",
      nin: "",
    },

    validate: {
      nin: (value) =>
        String(value).length === 11 ? null : "NIN must be 11 digits long",
    },
  });

  const handleSubmit = async (value: { nin: string; method: string }) => {
    try {
      await verifyPerson({
        schoolId,
        personId,
        body: value,
      }).unwrap();

      notifications.show({
        title: "Success",
        message: "Student successfully verified!",
        color: "green",
        position: "top-right",
      });
      hideModal();
    } catch (err: unknown) {
      const message =
        (err as any)?.data?.details?.mismatches?.[0]?.message ??
        (err as any)?.data?.error ??
        "Something went wrong. Please try again.";
      setErrorMessage(message);
    }
  };

  const validForm = form.isValid();

  return (
    <form className="grid gap-4" onSubmit={form.onSubmit(handleSubmit)}>
      <div className="grid gap-2">
        <TextInput
          styles={{
            input: {
              color: "#333333",
            },
          }}
          label="Full Name"
          disabled
          value={fullName}
        />

        <NumberInput
          label="NIN (National Identification Number )"
          placeholder="1234 7890 3567 1234"
          maxLength={11}
          rightSection
          key={form.key("nin")}
          {...form.getInputProps("nin")}
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={!validForm || isLoading}>
          {isLoading ? "Verifying Student..." : "Verify Student"}
        </Button>
      </div>
      {errorMessage && <small className="text-red-500">{errorMessage}</small>}
    </form>
  );
};

export default VerifyStudentWithNin;
