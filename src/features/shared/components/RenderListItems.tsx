import React, { ReactNode } from "react";

type RenderItemProps = {
  data: any[];
  renderItem: (item: any) => ReactNode;
};

const RenderListItem: React.FC<RenderItemProps> = ({
  data,
  renderItem,
}: RenderItemProps) => {
  return <>{data.map((item) => renderItem(item))}</>;
};

export default RenderListItem;
