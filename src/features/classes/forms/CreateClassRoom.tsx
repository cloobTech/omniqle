import React, { useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { Select, TextInput, Button } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm, UseFormReturnType } from "@mantine/form";
import { useModal } from "@src/index";
import { useCreateGradesMutation } from "../services/api";
import { useAppSelector } from "@src/index";
import ModalHeader from "@src/components/ModalHeader";

interface FormValues {
  forms: {
    [key: number]: {
      level: string;
      name: string;
      class_teacher_id?: number;
    };
  };
}

interface CreateGrade {
  name: string;
  level: number;
  class_teacher_id?: number;
}

export interface ICreateGrade {
  grades: CreateGrade[];
}

const ClassForm: React.FC<{
  form: UseFormReturnType<FormValues>;
  formId: number;
  gradeDisplayNames: { value: string; label: string }[];
}> = ({ form, formId, gradeDisplayNames }) => {
  return (
    <div className="space-y-4 flex-1 ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="Class"
          placeholder="Select a Class Level"
          data={gradeDisplayNames.map(({ value, label }) => ({
            value: value.toString(),
            label,
          }))}
          {...form.getInputProps(`forms.${formId}.level`)}
          clearable
        />

        <TextInput
          label="Class Name"
          placeholder="ex. A, Purple"
          {...form.getInputProps(`forms.${formId}.name`)}
        />
        <Select
          label="Class Teacher (Optional)"
          placeholder="Select Class Teacher"
          data={["Yet to be implemented"]}
          {...form.getInputProps(`forms.${formId}.class_teacher`)}
          clearable
        />
      </div>
    </div>
  );
};

interface CreateClassRoomProps {
  gradeDisplayNames: { value: string; label: string }[];
}

const CreateClassRoom: React.FC<CreateClassRoomProps> = ({
  gradeDisplayNames,
}) => {
  const [createGrades, { isLoading }] = useCreateGradesMutation();

  const { hideModal } = useModal();
  const [forms, setForms] = useState<number[]>([0]); // Track form IDs

  const form = useForm<FormValues>({
    initialValues: {
      forms: {
        0: { level: "", name: "", class_teacher_id: undefined },
      },
    },
    validate: (values) => {
      const errors: Record<string, string> = {};
      Object.entries(values.forms || {}).forEach(([key, form]) => {
        if (!form.level || isNaN(Number(form.level))) {
          errors[`forms.${key}.level`] =
            "Level is required and must be a valid number";
        }
        if (!form.name || form.name.trim().length === 0) {
          errors[`forms.${key}.name`] = "Name is required";
        }
      });
      return errors;
    },
  });

  const addClassForm = () => {
    const newFormId = forms.length > 0 ? Math.max(...forms) + 1 : 0; // Generate a unique form ID
    setForms((prev) => [...prev, newFormId]); // Add a new form ID
    form.setFieldValue(`forms.${newFormId}`, {
      level: "",
      name: "",
      class_teacher_id: undefined, // Default value is undefined
    });
  };

  const removeClassForm = (formId: number) => {
    if (forms.length > 1) {
      setForms((prev) => prev.filter((id) => id !== formId)); // Remove the form ID
      form.setValues((prevValues) => {
        const updatedForms = { ...prevValues.forms };
        delete updatedForms[formId]; // Remove the form data from Mantine's form state
        return { ...prevValues, forms: updatedForms };
      });
    }
  };

  // submit form
  const handleSubmit = async (values: FormValues) => {
    // Transform the forms object into an array of grades
    const gradesArray = Object.values(values.forms).map((form) => ({
      name: form.name,
      level: parseInt(form.level, 10), // Convert level to a number
      ...(form.class_teacher_id && { class_teacher: form.class_teacher_id }), // Include class_teacher only if it exists
    }));

    // Wrap the grades array in an object
    const payload = {
      grades: gradesArray,
    };

    const schoolId = useAppSelector((state) => state?.school?.schoolId);

    try {
      await createGrades({ schoolId, data: payload }).unwrap();
      notifications.show({
        title: "Success",
        message: "Classrooms created successfully!",
        color: "green",
        position: "top-right",
      });
      hideModal();
    } catch (err: unknown) {
      notifications.show({
        title: "Error",
        position: "top-right",
        message: `${
          (err as any)?.data?.errors?.[0] ??
          "Something went wrong. Please try again."
        }`,
        color: "red",
      });
    }
  };

  return (
    <section className="flex flex-col max-h-[80vh]">
      <ModalHeader
        title="Create Classrooms"
        subTitle="create new classrooms for your school."
      />
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className="flex flex-col flex-1"
      >
        {/* Scrollable container for forms */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          {forms.map((formId, index) => (
            <div
              key={formId}
              className="mb-4 flex flex-col gap-4 shadow-sm p-4 bg-white rounded-lg"
            >
              <ClassForm
                form={form}
                formId={formId}
                gradeDisplayNames={gradeDisplayNames}
              />

              {index > 0 && (
                <div className="flex justify-end ml-4">
                  <button
                    type="button"
                    className="text-red-500 !font-bold !text-xs underline cursor-pointer"
                    onClick={() => removeClassForm(formId)}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Fixed footer for buttons */}
        <div className="bg-white pt-4 sticky bottom-0 flex flex-col gap-4">
          <div className="flex justify-end">
            <button
              type="button"
              className="flex items-center text-sm text-gray-700 gap-2 cursor-pointer"
              onClick={() => {
                const isValid = form.validate(); // Trigger validation manually
                if (isValid.hasErrors) {
                  notifications.show({
                    title: "Validation Error",
                    message: "Please fill in all required fields correctly.",
                    color: "red",
                    position: "top-right",
                  });
                } else {
                  addClassForm(); // Proceed to add a new class form if validation passes
                }
              }}
            >
              <BsPlusCircle />
              Add class
            </button>
          </div>
          <div className="flex justify-end py-4">
            <Button type="submit" disabled={isLoading || !form.isValid()}>{`${
              isLoading ? "Submiting..." : "Create classrooms"
            }`}</Button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CreateClassRoom;
