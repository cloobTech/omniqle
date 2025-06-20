export const removeIdFields = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map(removeIdFields);
    } else if (obj && typeof obj === "object") {
      const newObj: any = {};
      for (const key in obj) {
        if (key !== "id") {
          newObj[key] = removeIdFields(obj[key]);
        }
      }
      return newObj;
    }
    return obj;
  };
  