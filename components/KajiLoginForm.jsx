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
            await loginAction({ ...values, role: "KAJI" });
            window.location.href = "/kaji/dashboard";
            message.success("কাজী লগইন সফল হয়েছে");
        } catch (error) {
            message.error("ভুল এনআইডি নম্বর অথবা পাসওয়ার্ড");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onFinish={handleSubmit} layout="vertical">
            <div className="flex flex-col text-black">
                <div>
                    <label htmlFor="nid" className="mb-2 text-base font-medium flex items-center gap-2">
                        এনআইডি নম্বর
                    </label>
                    <FormItem 
                        name="nid" 
                        rules={[{ required: true, message: "অনুগ্রহ করে আপনার এনআইডি নম্বর লিখুন" }]}
                    >
                        <input 
                            type="text" 
                            id="nid" 
                            placeholder="এনআইডি নম্বর"
                            className="w-full outline-none p-4 border border-gray-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300" 
                        />
                    </FormItem>
                </div>
                <div>
                    <label htmlFor="password" className="mb-2 text-base font-medium inline-block">
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
                            className="w-full outline-none p-4 border border-gray-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300" 
                        />
                    </FormItem>
                </div>
                <button 
                    disabled={loading} 
                    type="submit" 
                    className="w-full flex items-center gap-2 justify-center bg-primary text-white p-4 mt-2 rounded-xl hover:bg-[#832043] transition-all duration-300 uppercase tracking-wider font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                    কাজী হিসেবে লগইন করুন
                    {loading && <AiOutlineLoading3Quarters className="animate-spin" color="white" fontSize={16} />}
                </button>
            </div>
        </Form>
    );
}
