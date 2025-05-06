import React from "react";
import LoginUser from "../forms/LoginUser";

const Login: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-center  font-bold  text-gray-800 absolute top-4 left-4">
        omniQle<sup className="text-gray-600">TM</sup>{" "}
      </p>
      <LoginUser />
    </div>
  );
};

export default Login;
