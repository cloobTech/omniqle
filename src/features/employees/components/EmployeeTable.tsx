import { Button } from "@mantine/core";

const EmployeeTable = () => {
  return (
    <div className="bg-white  mt-4 rounded p-4 flex-1">
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-semibold px-2 mb-2 text-sm">Employees</h1>
        <Button>Add New Employee</Button>
      </div>
    </div>
  );
};

export default EmployeeTable;
