import React, { useState } from "react";
import { BsPlusCircle, BsBack } from "react-icons/bs";
import { Select, TextInput } from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import ClassInfo from "../components/ClassInfoPopOver";
import { useModal } from "@src/index";

interface FormValues {
  forms: {
    [key: number]: {
      level: string;
      name: string;
    };
  };
}

const ClassForm: React.FC<{
  form: UseFormReturnType<FormValues>;
  formId: number;
}> = ({ form, formId }) => {
  return (
    <div className="space-y-4 flex-1 mb-4">
      <Select
        withAsterisk
        label="Class Level"
        placeholder="Pick a level"
        data={Array.from({ length: 15 }, (_, i) => ({
          value: `${i + 1}`,
          label: `Level ${i + 1}`,
        }))}
        {...form.getInputProps(`forms.${formId}.level`)}
        clearable
      />
      <TextInput
        withAsterisk
        label="Enter ClassName"
        placeholder="E.G JSS 1A"
        {...form.getInputProps(`forms.${formId}.name`)}
      />
    </div>
  );
};

const CreateClassRoom: React.FC = () => {
  const { hideModal } = useModal();
  const [forms, setForms] = useState<number[]>([0]); // Track form IDs

  const form = useForm<FormValues>({
    initialValues: {
      forms: {
        0: { level: "", name: "" },
      },
    },
  });

  const addClassForm = () => {
    const newFormId = forms.length;
    setForms((prev) => [...prev, newFormId]); // Add a new form ID
    form.setFieldValue(`forms.${newFormId}`, {
      level: "",
      name: "",
    });
  };

  const removeClassForm = (formId: number) => {
    if (forms.length > 1) {
      setForms((prev) => prev.filter((id) => id !== formId)); // Remove the form ID
      form.removeListItem("forms", formId); // Remove the form data from Mantine's form state
    }
  };

  const handleSubmit = (values: FormValues) => {
    // Transform the forms object into an array of grades
    console.log(values);

    const grades = Object.values(values.forms).map((form) => ({
      name: form.name,
      level: parseInt(form.level, 10), // Convert level to a number
    }));

    console.log({ grades });
    // Process or send the data to the backend
  };

  return (
    <section className="flex flex-col max-h-[80vh]">
      <div className="flex items-start justify-between">
        <div>
          <ClassInfo
            title="How to add multiple classroom"
            content="some explanation"
          />
          <ClassInfo title="What is Class Level?" content="some explanation" />
        </div>
        <div
          className="flex items-center gap-2 border border-gray-400 rounded p-1 cursor-pointer"
          onClick={hideModal}
        >
          <BsBack />
          <small className=" text-gray-600">Close</small>
        </div>
      </div>
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className="flex flex-col flex-1"
      >
        {/* Scrollable container for forms */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          {forms.map((formId, index) => (
            <div key={formId} className="mb-6">
              {index > 0 && <hr className="border-t border-gray-300 my-4" />}
              <ClassForm form={form} formId={formId} />
              {index > 0 && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-red-500 text-sm underline cursor-pointer"
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
        <div className="bg-white pt-4 sticky bottom-0">
          <div
            className="flex items-center text-sm text-gray-700 gap-2 justify-end mt-2 cursor-pointer"
            onClick={addClassForm}
          >
            <BsPlusCircle />
            Add class
          </div>
          <div className="flex justify-end py-4">
            <button type="submit" className="btn rounded py-1">
              Create classrooms
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CreateClassRoom;
