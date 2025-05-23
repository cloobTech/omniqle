import { BsInfoCircle } from "react-icons/bs";
import { Popover, Text, Group, useMantineTheme } from "@mantine/core";

export default function AddStudentPopover({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const theme = useMantineTheme();
  return (
    <div>
      <Popover width={200} position="bottom" withArrow shadow="md">
        <Popover.Target>
          <Group
            gap="xs"
            bg="primary.1"
            p={4}
            mb="xs"
            style={{
              display: "inline-flex",
              borderRadius: theme.radius.sm,
              fontSize: theme.fontSizes.xs,
            }}
          >
            <BsInfoCircle color={theme.colors.primary[5]} size={14} />
            <Text className="!text-gray-700 !font-bold !text-xs">{title}</Text>
          </Group>
        </Popover.Target>
        <Popover.Dropdown>
          <Text size="xs">{content}</Text>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
}
