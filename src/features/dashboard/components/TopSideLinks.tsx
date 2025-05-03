import React from "react";
import AdminTopSideLinks from "./AdminTopSideLinks";
import { SideLinkProps } from "../types";

const TopSideLinks: React.FC<SideLinkProps> = ({ isExpanded, setIsExpanded }) => {
  return <AdminTopSideLinks isExpanded={isExpanded} setIsExpanded={setIsExpanded} />;
};

export default TopSideLinks;
