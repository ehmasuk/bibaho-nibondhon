"use client";

import FormItem from "antd/es/form/FormItem";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { loginAction } from "@/actions/authActions";
import { Form, message } from "antd";

import { useState } from "react";

function LoginForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await loginAction(values);
      window.location.href = "/user/dashboard";
      message.success("Login successfully");
    } catch (error) {
      message.error("Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <div className="flex flex-col text-black">
        <div>
          <label htmlFor="#nid" className="mb-2 text-lg inline-block">
            National ID (NID)
          </label>
          <FormItem name="nid" rules={[{ required: true, message: "Please input your NID" }]}>
            <input type="text" id="nid" className="w-full outline-none p-3 border border-black" />
          </FormItem>
        </div>
        <div>
          <label htmlFor="#password" className="mb-2 text-lg inline-block">
            Password
          </label>
          <FormItem name="password" rules={[{ required: true, message: "Please input your password" }]}>
            <input type="password" id="password" className="w-full outline-none p-3 border border-black" />
          </FormItem>
        </div>
        <button disabled={loading} type="submit" className="w-full flex items-center gap-2 justify-center bg-black text-white p-3 hover-effect uppercase">
          Login
          {loading && <AiOutlineLoading3Quarters color="white" className="animate-spin" fontSize={16} />}
        </button>
      </div>
    </Form>
  );
}

export default LoginForm;
