// Utility to format number
export const formatNumber = (value: number | string) => {
    const number = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(number)) return "";
    return new Intl.NumberFormat().format(number);
  };
  
  // Utility to parse input (remove commas)
 export  const parseNumber = (value: string) => {
    return parseFloat(value.replace(/,/g, ""));
  };
  