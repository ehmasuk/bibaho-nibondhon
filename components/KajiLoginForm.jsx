"use client";

import { loginAction } from "@/actions/authActions";
import { Form, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function KajiLoginForm() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            await loginAction({ licenseNumber: values.licenseNumber, password: values.password });
            window.location.href = "/kaji/dashboard";
            message.success("কাজী লগইন সফল হয়েছে");
        } catch (error) {
            message.error("ভুল লাইসেন্স নম্বর অথবা পাসওয়ার্ড");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onFinish={handleSubmit} layout="vertical">
            <div className="flex flex-col text-black">
                <div>
                    <label htmlFor="licenseNumber" className="mb-2 text-lg inline-block">
                        লাইসেন্স নম্বর
                    </label>
                    <FormItem 
                        name="licenseNumber" 
                        rules={[{ required: true, message: "অনুগ্রহ করে আপনার লাইসেন্স নম্বর লিখুন" }]}
                    >
                        <input 
                            type="text" 
                            id="licenseNumber" 
                            placeholder="লাইসেন্স নম্বর"
                            className="w-full outline-none p-4 border border-gray-200 rounded-xl focus:border-blue-500 transition" 
                        />
                    </FormItem>
                </div>
                <div>
                    <label htmlFor="password" className="mb-2 text-lg inline-block">
                        পাসওয়ার্ড
                    </label>
                    <FormItem 
                        name="password" 
                        rules={[{ required: true, message: "অনুগ্রহ করে আপনার পাসওয়ার্ড লিখুন" }]}
                    >
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="পাসওয়ার্ড"
                            className="w-full outline-none p-4 border border-gray-200 rounded-xl focus:border-blue-500 transition" 
                        />
                    </FormItem>
                </div>
                <button 
                    disabled={loading} 
                    type="submit" 
                    className="w-full flex items-center gap-2 justify-center bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition uppercase font-bold shadow-lg"
                >
                    কাজী হিসেবে লগইন করুন
                    {loading && <AiOutlineLoading3Quarters className="animate-spin" color="white" fontSize={16} />}
                </button>
            </div>
        </Form>
    );
}
