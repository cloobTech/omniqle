import CloseModal from "@src/components/CloseModal";

const ModalHeader = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle?: string;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <p className="font-semibold text-sm">{title}</p>
        <small className="text-xs text-gray-500">{subTitle}</small>
      </div>
      <CloseModal />
    </div>
  );
};

export default ModalHeader;
