export const generateAcademicSessions = (count = 4) => {
  const currentYear = new Date().getFullYear();
  const sessions = [];

  for (let i = 0; i < count; i++) {
    const startYear = currentYear + i;
    const endYear = startYear + 1;
    const session = `${startYear}/${endYear}`;
    sessions.push({ value: session, label: session });
  }

  return sessions;
};

export const schoolTerms = () => {
  return [
    { value: "first", label: "First Term" },
    { value: "second", label: "Second Term" },
    { value: "third", label: "Third Term" },
  ];
};
