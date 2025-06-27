import { useState, useEffect } from "react";
import { Popover, Select, Button, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";
import { BsFilter, BsXCircle, BsEraser } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";

type FilterState = {
  loading: boolean;
  onSuccess: boolean;
};

type SelectProp = {
  value: string;
  label: string;
};

type FilterConfig = Record<string, SelectProp[]>;

interface TableFilterProps {
  filterState: FilterState;
  filters: FilterConfig;
  onApply: (values: Record<string, string>) => void;
}

const TableFilter = ({ filters, filterState, onApply }: TableFilterProps) => {
  const [opened, setOpened] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string>
  >({});

  // Build initialValues object like { term: "", discipline: "", ... }
  const initialValues = Object.fromEntries(
    Object.keys(filters).map((key) => [key, ""])
  );

  const form = useForm({
    initialValues,
  });

  const handleSubmit = (values: Record<string, string>) => {
    // Only keep filled filters
    const filled = Object.fromEntries(
      Object.entries(values).filter(([_, val]) => val !== "")
    );
    setSelectedFilters(filled);
    onApply(filled); // send to parent
    setJustSubmitted(true);
  };

  const removeSingleFilter = (key: string) => {
    delete selectedFilters[key];
    // Reset Select Options
    form.setValues({
      ...initialValues,
      ...selectedFilters,
    });
    onApply(selectedFilters);
    setOpened(false);
  };

  useEffect(() => {
    if (justSubmitted && !filterState.loading && filterState.onSuccess) {
      setOpened(false); // close the popover
      setJustSubmitted(false); // reset flag
    }
  }, [filterState.loading, filterState.onSuccess, justSubmitted]);

  return (
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-2">
        {Object.entries(selectedFilters).map(([key, value]) =>
          value ? (
            <div
              key={key}
              className="flex text-xs items-center gap-2 p-1 border border-gray-100 rounded bg-gray-100 px-2 shadow"
            >
              <div>{`${key} - ${value}`}</div>
              <BsXCircle
                className="cursor-pointer"
                onClick={() => removeSingleFilter(key)}
              />
            </div>
          ) : null
        )}
        {Object.entries(selectedFilters).filter(
          ([_, v]) => v != null && v !== ""
        ).length >= 2 && (
          <div
            onClick={() => {
              form.reset(); // reset form values
              setSelectedFilters({});
              onApply({});
              form.setValues(initialValues);
            }}
            className="font-bold flex text-xs items-center gap-2 p-1 rounded bg-gray-20 px-2 cursor-pointer shadow"
          >
            <BsEraser />
            clear all
          </div>
        )}
      </div>
      <Popover
        opened={opened}
        trapFocus
        position="bottom-end"
        withArrow
        shadow="md"
        closeOnClickOutside={false}
      >
        <Popover.Target>
          <Button variant="default" onClick={() => setOpened((o) => !o)}>
            <div className="flex items-center gap-2">
              <BsFilter size={20} className="text-gray-600" />
              <p>Filter</p>
            </div>
          </Button>
        </Popover.Target>

        <Popover.Dropdown>
          <form
            onSubmit={form.onSubmit(handleSubmit)}
            className="space-y-2 w-[280px]  pt-4 relative"
          >
            <FaTimes
              className="absolute cursor-pointer right-0 top-0 text-red-500"
              size={24}
              onClick={() => setOpened(false)}
            />
            {Object.entries(filters).map(([key, options]) => {
              return (
                <Select
                  key={key}
                  label={key
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                  placeholder={`Select ${key
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}`}
                  data={options}
                  {...form.getInputProps(key)}
                />
              );
            })}

            <div className="flex justify-end gap-2 pt-2">
              <Button type="submit" disabled={filterState?.loading}>
                {filterState?.loading ? (
                  <div className="flex items-center gap-2">
                    <Loader size="xs" /> {/* Loader next to text */}
                    Loading
                  </div>
                ) : (
                  "Apply"
                )}
              </Button>
            </div>
          </form>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
};

export default TableFilter;
