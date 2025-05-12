import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { Button, TextInput, Checkbox } from "@mantine/core";
import { useLoginMutation } from "../services/api";
import { useNavigate } from "react-router-dom";
import googleIcon from "../assets/7123025_logo_google_g_icon.svg";

const LoginUser: React.FC = () => {
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value ? null : "Enter Password"),
    },
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    const credentials = { ...values, school_slug: "dlca" };

    try {
      const response = await login(credentials).unwrap();

      if (response.token) {
        localStorage.setItem("token", response.token);
        navigate("/dashboard");
      }

      form.reset();
    } catch (err: any) {
      if (err?.data) {
        console.error("Error details:", err.data);
      }
    }
  };

  const validForm = form.isValid();

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className="flex flex-col justify-center w-[80%] md:w-[588px] rounded-lg p-8 bg-white shadow-md gap-4"
    >
      <Button
        color="dark.8" // equivalent to bg-gray-800
        size="md" // default medium size
        fw="bold" // font-bold
        leftSection={<img src={googleIcon} alt="Google" className="size-8" />}
        className="gap-4" // additional gap if needed
      >
        Login with Google
      </Button>

      <p className="text-center font-bold text-gray-500">OR</p>
      <TextInput
        placeholder="Enter your email"
        key={form.key("email")}
        {...form.getInputProps("email")}
      />
      <TextInput
        placeholder="Enter your password"
        type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
        key={form.key("password")}
        {...form.getInputProps("password")}
      />

      <Checkbox
        label="Show password"
        className="text-gray-600 font-bold"
        size="xs"
        checked={showPassword} // Bind the checkbox to the state
        onChange={(event) => setShowPassword(event.currentTarget.checked)} // Update state on change
      />

      <Button type="submit" disabled={!validForm || isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </Button>
      {error && (
        <p className="text-red-500 text-sm">Login failed. Please try again.</p>
      )}
    </form>
  );
};

export default LoginUser;
