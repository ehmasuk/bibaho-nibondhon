"use client";

import { loginAction } from "@/actions/authActions";
import { Form, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function AdminLoginPage() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            await loginAction({ nid: values.username, password: values.password });
            window.location.href = "/admin/dashboard";
            message.success("Admin Login successfully");
        } catch (error) {
            message.error("Invalid Admin Credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Admin Login</h1>
                <Form onFinish={handleSubmit} layout="vertical">
                    <FormItem 
                        label="Username" 
                        name="username" 
                        rules={[{ required: true, message: "Please input admin username" }]}
                    >
                        <input 
                            type="text" 
                            className="w-full outline-none p-3 border border-gray-300 rounded focus:border-blue-500" 
                        />
                    </FormItem>

                    <FormItem 
                        label="Password" 
                        name="password" 
                        rules={[{ required: true, message: "Please input admin password" }]}
                    >
                        <input 
                            type="password" 
                            className="w-full outline-none p-3 border border-gray-300 rounded focus:border-blue-500" 
                        />
                    </FormItem>

                    <button 
                        disabled={loading} 
                        type="submit" 
                        className="w-full flex items-center gap-2 justify-center bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition duration-300 uppercase font-bold"
                    >
                        Login as Admin
                        {loading && <AiOutlineLoading3Quarters className="animate-spin text-white" fontSize={16} />}
                    </button>
                </Form>
            </div>
        </div>
    );
}
