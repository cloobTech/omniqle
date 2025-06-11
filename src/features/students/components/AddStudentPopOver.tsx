import { BsInfoCircle } from "react-icons/bs";
import { Popover, Text } from "@mantine/core";

export default function AddStudentPopover({
  title,
  content,
  withTitle = true,
  className = "",
  iconColor = "black",
  position = "bottom",
}: {
  title?: string;
  content: string;
  withTitle?: boolean;
  className?: string;
  iconColor?: string;
  position?: "top" | "bottom" | "left" | "right";
}) {
  return (
    <div className={`inline-flex items-center ${className}`}>
      <Popover width={200} position={position} withArrow shadow="md">
        <Popover.Target>
          <div className="inline-flex items-center gap-1">
            <BsInfoCircle color={iconColor} size={14} /> {/* Use iconColor */}
            {withTitle && (
              <Text c="gray.6" size="xs">
                {title}
              </Text>
            )}
          </div>
        </Popover.Target>
        <Popover.Dropdown>
          <Text size="xs">{content}</Text>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
}
