"use client";

import { loginAction } from "@/actions/authActions";
import usePost from "@/hooks/usePost";
import { Form, message, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const { Option } = Select;

export default function KajiRegisterForm() {
    const { postData, loading } = usePost();

    const handleSubmit = (values) => {
        postData(
            "/kaji/register",
            values,
            async (data) => {
                message.success(data.message);
                // After registration, log them in automatically
                await loginAction({ licenseNumber: values.licenseNumber, password: values.password });
                window.location.href = "/kaji/dashboard";
            },
            (err) => {
                message.error(err.message || "নিবন্ধন ব্যর্থ হয়েছে");
            }
        );
    };

    return (
        <Form onFinish={handleSubmit} layout="vertical">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
                {/* Full Name */}
                <div className="md:col-span-2">
                    <label htmlFor="fullName" className="mb-2 text-base font-medium inline-block">
                        পূর্ণ নাম
                    </label>
                    <FormItem 
                        name="fullName" 
                        rules={[{ required: true, message: "অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন" }]}
                    >
                        <input 
                            type="text" 
                            id="fullName" 
                            placeholder="আপনার নাম লিখুন"
                            className="w-full outline-none p-3 border border-gray-200 rounded-xl focus:border-blue-500 transition" 
                        />
                    </FormItem>
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="mb-2 text-base font-medium inline-block">
                        ইমেইল
                    </label>
                    <FormItem 
                        name="email" 
                        rules={[
                            { required: true, message: "অনুগ্রহ করে আপনার ইমেইল লিখুন" },
                            { type: 'email', message: "সঠিক ইমেইল এড্রেস লিখুন" }
                        ]}
                    >
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="example@mail.com"
                            className="w-full outline-none p-3 border border-gray-200 rounded-xl focus:border-blue-500 transition" 
                        />
                    </FormItem>
                </div>

                {/* Phone */}
                <div>
                    <label htmlFor="phone" className="mb-2 text-base font-medium inline-block">
                        ফোন নম্বর
                    </label>
                    <FormItem 
                        name="phone" 
                        rules={[{ required: true, message: "অনুগ্রহ করে আপনার ফোন নম্বর লিখুন" }]}
                    >
                        <input 
                            type="text" 
                            id="phone" 
                            placeholder="০১XXXXXXXXX"
                            className="w-full outline-none p-3 border border-gray-200 rounded-xl focus:border-blue-500 transition" 
                        />
                    </FormItem>
                </div>

                {/* NID */}
                <div>
                    <label htmlFor="nid" className="mb-2 text-base font-medium inline-block">
                        জাতীয় পরিচয়পত্র নম্বর (NID)
                    </label>
                    <FormItem 
                        name="nid" 
                        rules={[{ required: true, message: "অনুগ্রহ করে আপনার NID নম্বর লিখুন" }]}
                    >
                        <input 
                            type="text" 
                            id="nid" 
                            placeholder="NID নম্বর"
                            className="w-full outline-none p-3 border border-gray-200 rounded-xl focus:border-blue-500 transition" 
                        />
                    </FormItem>
                </div>

                {/* License Number */}
                <div>
                    <label htmlFor="licenseNumber" className="mb-2 text-base font-medium inline-block">
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
                            className="w-full outline-none p-3 border border-gray-200 rounded-xl focus:border-blue-500 transition" 
                        />
                    </FormItem>
                </div>

                {/* Organization Name */}
                <div className="md:col-span-2">
                    <label htmlFor="organizationName" className="mb-2 text-base font-medium inline-block">
                        প্রতিষ্ঠানের নাম
                    </label>
                    <FormItem 
                        name="organizationName" 
                        rules={[{ required: true, message: "অনুগ্রহ করে আপনার প্রতিষ্ঠানের নাম লিখুন" }]}
                    >
                        <input 
                            type="text" 
                            id="organizationName" 
                            placeholder="প্রতিষ্ঠানের নাম"
                            className="w-full outline-none p-3 border border-gray-200 rounded-xl focus:border-blue-500 transition" 
                        />
                    </FormItem>
                </div>

                {/* Division */}
                <div>
                    <label htmlFor="division" className="mb-2 text-base font-medium inline-block">
                        বিভাগ
                    </label>
                    <FormItem 
                        name="division" 
                        rules={[{ required: true, message: "বিভাগ নির্বাচন করুন" }]}
                    >
                        <Select placeholder="বিভাগ নির্বাচন করুন" size="large" className="w-full">
                            <Option value="Dhaka">ঢাকা</Option>
                            <Option value="Chattogram">চট্টগ্রাম</Option>
                            <Option value="Rajshahi">রাজশাহী</Option>
                            <Option value="Khulna">খুলনা</Option>
                            <Option value="Barishal">বরিশাল</Option>
                            <Option value="Sylhet">সিলেট</Option>
                            <Option value="Rangpur">রংপুর</Option>
                            <Option value="Mymensingh">ময়মনসিংহ</Option>
                        </Select>
                    </FormItem>
                </div>

                {/* District */}
                <div>
                    <label htmlFor="district" className="mb-2 text-base font-medium inline-block">
                        জেলা
                    </label>
                    <FormItem 
                        name="district" 
                        rules={[{ required: true, message: "জেলা নির্বাচন করুন" }]}
                    >
                        <Select placeholder="জেলা নির্বাচন করুন" size="large" className="w-full">
                            <Option value="Dhaka">ঢাকা</Option>
                            <Option value="Gazipur">গাজীপুর</Option>
                            <Option value="Narayanganj">নারায়ণগঞ্জ</Option>
                        </Select>
                    </FormItem>
                </div>

                {/* Upazila */}
                <div>
                    <label htmlFor="upazila" className="mb-2 text-base font-medium inline-block">
                        উপজেলা
                    </label>
                    <FormItem 
                        name="upazila" 
                        rules={[{ required: true, message: "উপজেলা নির্বাচন করুন" }]}
                    >
                        <Select placeholder="উপজেলা নির্বাচন করুন" size="large" className="w-full">
                            <Option value="Savar">সাভার</Option>
                            <Option value="Dhamrai">ধামরাই</Option>
                            <Option value="Uttara">উত্তরা</Option>
                        </Select>
                    </FormItem>
                </div>

                {/* Union */}
                <div>
                    <label htmlFor="union" className="mb-2 text-base font-medium inline-block">
                        ইউনিয়ন
                    </label>
                    <FormItem 
                        name="union" 
                        rules={[{ required: true, message: "ইউনিয়ন নির্বাচন করুন" }]}
                    >
                        <Select placeholder="ইউনিয়ন নির্বাচন করুন" size="large" className="w-full">
                            <Option value="Union 1">ইউনিয়ন ১</Option>
                            <Option value="Union 2">ইউনিয়ন ২</Option>
                        </Select>
                    </FormItem>
                </div>

                {/* Address Line */}
                <div className="md:col-span-2">
                    <label htmlFor="addressLine" className="mb-2 text-base font-medium inline-block">
                        সারসংক্ষেপ ঠিকানা (গ্রাম, সড়ক)
                    </label>
                    <FormItem 
                        name="addressLine" 
                        rules={[{ required: true, message: "অনুগ্রহ করে আপনার ঠিকানা লিখুন" }]}
                    >
                        <input 
                            type="text" 
                            id="addressLine" 
                            placeholder="গ্রাম, সড়ক নম্বর, বাসা নম্বর"
                            className="w-full outline-none p-3 border border-gray-200 rounded-xl focus:border-blue-500 transition" 
                        />
                    </FormItem>
                </div>

                {/* Password */}
                <div className="md:col-span-2">
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
                            placeholder="কমপক্ষে ৬ অক্ষরের পাসওয়ার্ড"
                            className="w-full outline-none p-3 border border-gray-200 rounded-xl focus:border-blue-500 transition" 
                        />
                    </FormItem>
                </div>

                <div className="md:col-span-2 mt-4">
                    <button 
                        disabled={loading} 
                        type="submit" 
                        className="w-full flex items-center gap-2 justify-center bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 transition uppercase font-bold shadow-lg"
                    >
                        কাজী হিসেবে নিবন্ধন করুন
                        {loading && <AiOutlineLoading3Quarters className="animate-spin" color="white" fontSize={16} />}
                    </button>
                </div>
            </div>
        </Form>
    );
}
