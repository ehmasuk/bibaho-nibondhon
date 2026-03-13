"use client";

import { loginAction } from "@/actions/authActions";
import usePost from "@/hooks/usePost";
import { Form, message, Select, Upload, Button } from "antd";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCamera } from "react-icons/fa";
import { imageToBase64 } from "@/helpers/imageToBase64";

const { Option } = Select;

const BD_API_BASE = "https://bdapis.com/api/v1.2";

export default function KajiRegisterForm() {
    const { postData, loading } = usePost();
    const [form] = Form.useForm();
    
    // State for location data
    const [divisions, setDivisions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [upazillas, setUpazillas] = useState([]);

    // Loading states for fetch
    const [fetchingDivisions, setFetchingDivisions] = useState(false);
    const [fetchingDistricts, setFetchingDistricts] = useState(false);
    const [fetchingUpazillas, setFetchingUpazillas] = useState(false);

    // Fetch divisions on mount
    useEffect(() => {
        const fetchDivisions = async () => {
            setFetchingDivisions(true);
            try {
                const res = await axios.get(`${BD_API_BASE}/divisions`);
                setDivisions(res.data.data);
            } catch (err) {
                console.error("Error fetching divisions:", err);
                message.error("বিভাগ লোড করা সম্ভব হয়নি");
            } finally {
                setFetchingDivisions(false);
            }
        };
        fetchDivisions();
    }, []);

    // Handle Division Change
    const handleDivisionChange = async (divisionName) => {
        // Reset dependent fields
        form.setFieldsValue({ district: undefined, upazila: undefined });
        setDistricts([]);
        setUpazillas([]);

        if (!divisionName) return;

        setFetchingDistricts(true);
        try {
            const res = await axios.get(`${BD_API_BASE}/division/${divisionName.toLowerCase()}`);
            setDistricts(res.data.data);
        } catch (err) {
            console.error("Error fetching districts:", err);
            message.error("জেলা লোড করা সম্ভব হয়নি");
        } finally {
            setFetchingDistricts(false);
        }
    };

    // Handle District Change
    const handleDistrictChange = async (districtName) => {
        // Reset dependent fields
        form.setFieldsValue({ upazila: undefined });
        setUpazillas([]);

        if (!districtName) return;

        setFetchingUpazillas(true);
        try {
            const res = await axios.get(`${BD_API_BASE}/district/${districtName.toLowerCase()}`);
            const fetchedUpazillas = res.data.data[0]?.upazillas || [];
            setUpazillas(fetchedUpazillas);
        } catch (err) {
            console.error("Error fetching upazillas:", err);
            message.error("উপজেলা লোড করা সম্ভব হয়নি");
        } finally {
            setFetchingUpazillas(false);
        }
    };

    const handleSubmit = async (values) => {
        let imageData = null;
        if (values.image && values.image.fileList && values.image.fileList[0]) {
            imageData = await imageToBase64(values.image.fileList[0].originFileObj);
        }

        postData(
            "/kaji/register",
            { ...values, image: imageData },
            async (data) => {
                message.success(data.message);
                // After registration, log them in automatically
                await loginAction({ nid: values.nid, password: values.password, role: "KAJI" });
                window.location.href = "/kaji/dashboard";
            },
            (err) => {
                message.error(err.message || "নিবন্ধন ব্যর্থ হয়েছে");
            }
        );
    };

    return (
        <Form form={form} onFinish={handleSubmit} layout="vertical">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
                {/* Photo Upload */}
                <div className="md:col-span-2 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 p-6 rounded-2xl mb-4 bg-gray-50/50">
                    <label className="mb-4 text-lg font-bold text-gray-700">আপনার ছবি আপলোড করুন</label>
                    <FormItem 
                        name="image" 
                        rules={[{ required: true, message: "অনুগ্রহ করে আপনার ছবি আপলোড করুন" }]}
                        valuePropName="file"
                    >
                        <Upload
                            listType="picture-card"
                            maxCount={1}
                            beforeUpload={() => false}
                            accept="image/*"
                            className="bg-white"
                        >
                            <div className="flex flex-col items-center">
                                <FaCamera className="text-2xl text-gray-400 mb-2" />
                                <div className="text-xs text-gray-400 text-center px-2">পাসপোর্ট সাইজ ছবি (প্রস্তাবিত)</div>
                            </div>
                        </Upload>
                    </FormItem>
                </div>

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
                        <Select 
                            placeholder="বিভাগ নির্বাচন করুন" 
                            size="large" 
                            className="w-full"
                            onChange={handleDivisionChange}
                            loading={fetchingDivisions}
                        >
                            {divisions.map((div) => (
                                <Option key={div.division} value={div.division}>
                                    {div.divisionbn}
                                </Option>
                            ))}
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
                        <Select 
                            placeholder="জেলা নির্বাচন করুন" 
                            size="large" 
                            className="w-full"
                            onChange={handleDistrictChange}
                            loading={fetchingDistricts}
                            disabled={!districts.length}
                        >
                            {districts.map((dist) => (
                                <Option key={dist.district} value={dist.district}>
                                    {dist.districtbn}
                                </Option>
                            ))}
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
                        <Select 
                            placeholder="উপজেলা নির্বাচন করুন" 
                            size="large" 
                            className="w-full"
                            loading={fetchingUpazillas}
                            disabled={!upazillas.length}
                        >
                            {upazillas.map((up) => (
                                <Option key={up} value={up}>
                                    {up}
                                </Option>
                            ))}
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
