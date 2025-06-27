export const formatDate = (dateStr?: string) => {
  return dateStr
    ? new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(dateStr))
    : "";
};
