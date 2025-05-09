import { BsInfoCircle } from "react-icons/bs";
import { Popover, Text } from "@mantine/core";

export default function ClassInfo({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div>
      <Popover width={200} position="bottom" withArrow shadow="md">
        <Popover.Target>
          <div className="inline-flex gap-2 text-xs bg-primary-light p-1 rounded mb-2">
            <BsInfoCircle className="text-primary" />
            <small className="text-gray-500">{title}</small>
          </div>
        </Popover.Target>
        <Popover.Dropdown>
          <Text size="xs">{content}</Text>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
}
