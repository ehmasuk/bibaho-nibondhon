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
        <div className="flex items-center justify-center min-h-screen bg-[#FFF5F8]">
            <div className="w-full max-w-md p-8 md:p-10 bg-white shadow-xl shadow-primary/5 border border-primary/10 rounded-3xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Admin Login</h1>
                    <div className="h-1 w-12 bg-primary mx-auto rounded-full"></div>
                </div>
                <Form onFinish={handleSubmit} layout="vertical">
                    <FormItem 
                        label={<span className="font-medium text-gray-800">Username</span>}
                        name="username" 
                        rules={[{ required: true, message: "Please input admin username" }]}
                    >
                        <input 
                            type="text" 
                            placeholder="Enter username"
                            className="w-full outline-none p-4 border border-gray-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300" 
                        />
                    </FormItem>

                    <FormItem 
                        label={<span className="font-medium text-gray-800">Password</span>}
                        name="password" 
                        rules={[{ required: true, message: "Please input admin password" }]}
                    >
                        <input 
                            type="password"
                            placeholder="Enter password" 
                            className="w-full outline-none p-4 border border-gray-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300" 
                        />
                    </FormItem>

                    <button 
                        disabled={loading} 
                        type="submit" 
                        className="w-full flex items-center gap-2 justify-center bg-primary text-white p-4 rounded-xl hover:bg-[#832043] transition-all duration-300 uppercase tracking-wider font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 mt-4"
                    >
                        Login as Admin
                        {loading && <AiOutlineLoading3Quarters className="animate-spin text-white" fontSize={16} />}
                    </button>
                </Form>
            </div>
        </div>
    );
}
