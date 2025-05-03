import React from "react";
import { useForm } from "@mantine/form";
import { Button, TextInput } from "@mantine/core";
import { useLoginMutation } from "../slice";
import { useNavigate } from "react-router-dom";

const LoginUser: React.FC = () => {
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value ? null : "Enter Email"),
    },
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    const credentials = { ...values, school_slug: "dlca" };
    try {
      const response = await login(credentials).unwrap();
      if (response.token) {
        navigate("/dashboard");
      }

      form.reset();
    } catch (err: any) {
      if (err?.data) {
        console.error("Error details:", err.data);
      }
    }
  };

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      className="flex flex-col justify-center  w-[80%] md:w-[588px] rounded-lg p-8 bg-white shadow-md gap-4"
    >
      <p className="text-center font-bold uppercase text-2xl text-gray-800">
        OMNIQLE secure login
      </p>
      <Button unstyled className="btn">
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
        type="password"
        key={form.key("password")}
        {...form.getInputProps("password")}
      />

      <Button
        unstyled
        className={`btn `}
        type="submit"
        // disabled={(form.isTouched() || form.isValid())}
      >
        {isLoading ? "Logging in..." : "Login"}
      </Button>
      {error && (
        <p className="text-red-500 text-sm">Login failed. Please try again.</p>
      )}
    </form>
  );
};

export default LoginUser;
