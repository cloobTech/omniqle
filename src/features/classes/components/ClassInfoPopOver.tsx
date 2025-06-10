import { BsInfoCircle } from "react-icons/bs";
import { Popover, Text, Group, useMantineTheme } from "@mantine/core";

export default function ClassInfo({
  title,
  content,
  withTitle = true,
  className = "",
}: {
  title?: string;
  content: string;
  withTitle?: boolean;
  className?: string;
}) {
  const theme = useMantineTheme();
  return (
    <div className={className}>
      <Popover width={200} position="bottom" withArrow shadow="md">
        <Popover.Target>
          <Group
            gap="xs"
            p={4}
            mb="xs"
            style={{
              display: "inline-flex",
              borderRadius: theme.radius.sm,
              fontSize: theme.fontSizes.xs,
            }}
          >
            <BsInfoCircle color={theme.colors.primary[5]} size={14} />
            {withTitle && (
              <Text c="gray.6" size="xs">
                {title}
              </Text>
            )}
          </Group>
        </Popover.Target>
        <Popover.Dropdown>
          <Text size="xs">{content}</Text>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
}
