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
        <Form form={form} onFinish={handleSubmit} layout="vertical" className="space-y-8">
            <div className="flex flex-col gap-10">
                {/* Section 1: Personal Information */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                        <h2 className="text-xl font-bold text-gray-800">ব্যক্তিগত তথ্য</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Photo Upload - More Modern Styled */}
                        <div className="md:col-span-2">
                            <FormItem 
                                name="image" 
                                rules={[{ required: true, message: "অনুগ্রহ করে আপনার ছবি আপলোড করুন" }]}
                                valuePropName="file"
                                className="mb-0"
                            >
                                <Upload
                                    listType="picture-card"
                                    maxCount={1}
                                    beforeUpload={() => false}
                                    accept="image/*"
                                    className="kaji-photo-upload"
                                >
                                    <div className="flex flex-col items-center justify-center p-4">
                                        <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                                            <FaCamera className="text-2xl text-primary" />
                                        </div>
                                        <div className="text-sm font-semibold text-gray-700">ছবি আপলোড করুন</div>
                                        <div className="text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">Passport Size Image</div>
                                    </div>
                                </Upload>
                            </FormItem>
                        </div>

                        {/* Full Name */}
                        <div className="md:col-span-2">
                            <label htmlFor="fullName" className="mb-2 text-sm font-bold text-gray-700 flex items-center gap-2">
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
                                    className="w-full outline-none p-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all duration-300" 
                                />
                            </FormItem>
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="mb-2 text-sm font-bold text-gray-700">
                                ইমেইল ঠিকানা
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
                                    className="w-full outline-none p-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all duration-300" 
                                />
                            </FormItem>
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" className="mb-2 text-sm font-bold text-gray-700">
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
                                    className="w-full outline-none p-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all duration-300" 
                                />
                            </FormItem>
                        </div>

                        {/* NID */}
                        <div className="md:col-span-2">
                            <label htmlFor="nid" className="mb-2 text-sm font-bold text-gray-700">
                                জাতীয় পরিচয়পত্র নম্বর (NID)
                            </label>
                            <FormItem 
                                name="nid" 
                                rules={[{ required: true, message: "অনুগ্রহ করে আপনার NID নম্বর লিখুন" }]}
                            >
                                <input 
                                    type="text" 
                                    id="nid" 
                                    placeholder="আপনার ১০ বা ১৭ ডিজিটের এনআইডি নম্বর"
                                    className="w-full outline-none p-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all duration-300" 
                                />
                            </FormItem>
                        </div>
                    </div>
                </div>

                {/* Section 2: Professional Information */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                        <h2 className="text-xl font-bold text-gray-800">পেশাগত তথ্য</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* License Number */}
                        <div>
                            <label htmlFor="licenseNumber" className="mb-2 text-sm font-bold text-gray-700">
                                লাইসেন্স নম্বর
                            </label>
                            <FormItem 
                                name="licenseNumber" 
                                rules={[{ required: true, message: "অনুগ্রহ করে আপনার লাইসেন্স নম্বর লিখুন" }]}
                            >
                                <input 
                                    type="text" 
                                    id="licenseNumber" 
                                    placeholder="লাইসেন্স নম্বর লিখুন"
                                    className="w-full outline-none p-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all duration-300" 
                                />
                            </FormItem>
                        </div>

                        {/* Organization Name */}
                        <div>
                            <label htmlFor="organizationName" className="mb-2 text-sm font-bold text-gray-700">
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
                                    className="w-full outline-none p-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all duration-300" 
                                />
                            </FormItem>
                        </div>
                    </div>
                </div>

                {/* Section 3: Location Details */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                        <h2 className="text-xl font-bold text-gray-800">ঠিকানা ও অবস্থান</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Division */}
                        <div>
                            <label className="mb-2 text-sm font-bold text-gray-700 block">
                                বিভাগ
                            </label>
                            <FormItem 
                                name="division" 
                                rules={[{ required: true, message: "বিভাগ নির্বাচন করুন" }]}
                            >
                                <Select 
                                    placeholder="বিভাগ Choose" 
                                    size="large" 
                                    className="w-full custom-select"
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
                            <label className="mb-2 text-sm font-bold text-gray-700 block">
                                জেলা
                            </label>
                            <FormItem 
                                name="district" 
                                rules={[{ required: true, message: "জেলা নির্বাচন করুন" }]}
                            >
                                <Select 
                                    placeholder="জেলা Choose" 
                                    size="large" 
                                    className="w-full custom-select"
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
                            <label className="mb-2 text-sm font-bold text-gray-700 block">
                                উপজেলা
                            </label>
                            <FormItem 
                                name="upazila" 
                                rules={[{ required: true, message: "উপজেলা নির্বাচন করুন" }]}
                            >
                                <Select 
                                    placeholder="উপজেলা Choose" 
                                    size="large" 
                                    className="w-full custom-select"
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
                        <div className="md:col-span-3">
                            <label htmlFor="addressLine" className="mb-2 text-sm font-bold text-gray-700">
                                বিস্তারিত ঠিকানা
                            </label>
                            <FormItem 
                                name="addressLine" 
                                rules={[{ required: true, message: "অনুগ্রহ করে আপনার বিস্তারিত ঠিকানা লিখুন" }]}
                            >
                                <input 
                                    type="text" 
                                    id="addressLine" 
                                    placeholder="গ্রাম, রাস্তা নম্বর, এলাকা"
                                    className="w-full outline-none p-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all duration-300" 
                                />
                            </FormItem>
                        </div>
                    </div>
                </div>

                {/* Section 4: Security */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                        <h2 className="text-xl font-bold text-gray-800">নিরাপত্তা</h2>
                    </div>

                    <div className="max-w-md">
                        <label htmlFor="password" className="mb-2 text-sm font-bold text-gray-700 block">
                            পাসওয়ার্ড নির্ধারণ করুন
                        </label>
                        <FormItem 
                            name="password" 
                            rules={[{ required: true, message: "অনুগ্রহ করে আপনার পাসওয়ার্ড লিখুন" }]}
                        >
                            <input 
                                type="password" 
                                id="password" 
                                placeholder="কমপক্ষে ৬ অক্ষরের শক্তিশালী পাসওয়ার্ড"
                                className="w-full outline-none p-4 bg-gray-50/50 border border-gray-100 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all duration-300" 
                            />
                        </FormItem>
                    </div>
                </div>

                <div className="pt-6">
                    <button 
                        disabled={loading} 
                        type="submit" 
                        className="w-full sm:w-auto px-12 h-16 bg-primary text-white rounded-2xl hover:bg-[#832043] transition-all duration-300 uppercase tracking-widest font-extrabold shadow-xl shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-70 disabled:transform-none"
                    >
                        {loading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" fontSize={20} />
                        ) : (
                            <>নিবন্ধন সম্পন্ন করুন</>
                        )}
                    </button>
                    <p className="mt-4 text-xs text-gray-400 italic">
                        * সকল তথ্য নির্ভুলভাবে প্রদান করা বাধ্যতামূলক। ভুল তথ্যের জন্য আবেদন বাতিল হতে পারে।
                    </p>
                </div>
            </div>
        </Form>
    );
}
