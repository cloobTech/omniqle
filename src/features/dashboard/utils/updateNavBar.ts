export const greetUser = (fullName: string): string => {
  if (!fullName) return "Welcome, Guest"; // Handle empty or undefined names

  const firstName = fullName.split(" ")[0];
  const currentHour = new Date().getHours(); // Get the current hour (0-23)

  let greeting = "Good Morning"; // Default greeting

  if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good Afternoon";
  } else if (currentHour >= 18) {
    greeting = "Good Evening";
  }

  return `${greeting}, ${firstName}`;
};

export const getPageTitle = (pathname: string, userName: string): string => {
  switch (pathname) {
    case "/dashboard":
      return greetUser(userName); // Use fallback userName
    case "/dashboard/classrooms":
      return "Manage Classroom";
    case "/dashboard/employees":
      return "Employee Management";
    default:
      return "Welcome";
  }
};

export const getPageSubtitle = (pathname: string): string => {
  switch (pathname) {
    case "/dashboard":
      return "Overview of your administrative tasks";
    case "/dashboard/classrooms":
      return "Manage and organize classrooms effectively";
    case "/dashboard/employees":
      return "Manage employee records and details";
    default:
      return "The administrative management portal";
  }
};
