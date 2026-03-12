"use client";

import { Form, Input, Select, DatePicker, Button, Divider, checkbox, Checkbox, message } from "antd";
import { FaRegFileAlt, FaMale, FaFemale, FaUsers, FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import Link from "next/link";

export default function MarriageApplicationPage() {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log("Success:", values);
        message.success("বিবাহ নিবন্ধন আবেদন সফলভাবে জমা দেওয়া হয়েছে! (স্থায়ী ডেমো)");
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-indigo-900 px-8 py-10 text-white flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
                            <FaRegFileAlt className="text-blue-300" />
                            বিবাহ নিবন্ধনের আবেদন
                        </h1>
                        <p className="text-indigo-200 mt-2">আইনি নিবন্ধনের জন্য অনুগ্রহ করে সমস্ত বিবরণ সঠিকভাবে পূরণ করুন।</p>
                    </div>
                    <Link href="/user/dashboard" className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition font-medium">
                        ফিরে যান
                    </Link>
                </div>

                <div className="p-8 lg:p-12">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        requiredMark={true}
                        className="space-y-10"
                    >
                        {/* Groom Section */}
                        <section className="bg-slate-50 p-6 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="bg-blue-600 text-white p-2 rounded-lg text-xl">
                                    <FaMale />
                                </span>
                                <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide">বরের বিবরণ (Groom Details)</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <Form.Item label="সম্পূর্ণ নাম" name="groomFullName" rules={[{ required: true, message: 'বরের নাম আবশ্যক' }]}>
                                    <Input placeholder="এনআইডি অনুযায়ী" className="rounded-xl p-3" />
                                </Form.Item>
                                <Form.Item label="এনআইডি নম্বর" name="groomNid" rules={[{ required: true, message: 'এনআইডি নম্বর আবশ্যক' }]}>
                                    <Input placeholder="এনআইডি নম্বর দিন" className="rounded-xl p-3" />
                                </Form.Item>
                                <Form.Item label="পিতার নাম" name="groomFatherName" rules={[{ required: true, message: 'পিতার নাম আবশ্যক' }]}>
                                    <Input placeholder="পিতার সম্পূর্ণ নাম" className="rounded-xl p-3" />
                                </Form.Item>
                                <Form.Item label="মাতার নাম" name="groomMotherName" rules={[{ required: true, message: 'মাতার নাম আবশ্যক' }]}>
                                    <Input placeholder="মাতার সম্পূর্ণ নাম" className="rounded-xl p-3" />
                                </Form.Item>
                                <Form.Item label="ঠিকানা" name="groomAddress" className="md:col-span-2 lg:col-span-2" rules={[{ required: true, message: 'ঠিকানা আবশ্যক' }]}>
                                    <Input.TextArea placeholder="পূর্ণ ঠিকানা দিন" className="rounded-xl p-3" rows={1} />
                                </Form.Item>
                            </div>
                        </section>

                        {/* Bride Section */}
                        <section className="bg-slate-50 p-6 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="bg-pink-600 text-white p-2 rounded-lg text-xl">
                                    <FaFemale />
                                </span>
                                <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide">কনের বিবরণ (Bride Details)</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <Form.Item label="সম্পূর্ণ নাম" name="brideFullName" rules={[{ required: true, message: 'কনের নাম আবশ্যক' }]}>
                                    <Input placeholder="এনআইডি অনুযায়ী" className="rounded-xl p-3" />
                                </Form.Item>
                                <Form.Item label="এনআইডি নম্বর" name="brideNid" rules={[{ required: true, message: 'এনআইডি নম্বর আবশ্যক' }]}>
                                    <Input placeholder="এনআইডি নম্বর দিন" className="rounded-xl p-3" />
                                </Form.Item>
                                <Form.Item label="পিতার নাম" name="brideFatherName" rules={[{ required: true, message: 'পিতার নাম আবশ্যক' }]}>
                                    <Input placeholder="পিতার সম্পূর্ণ নাম" className="rounded-xl p-3" />
                                </Form.Item>
                                <Form.Item label="মাতার নাম" name="brideMotherName" rules={[{ required: true, message: 'মাতার নাম আবশ্যক' }]}>
                                    <Input placeholder="মাতার সম্পূর্ণ নাম" className="rounded-xl p-3" />
                                </Form.Item>
                                <Form.Item label="ঠিকানা" name="brideAddress" className="md:col-span-2 lg:col-span-2" rules={[{ required: true, message: 'ঠিকানা আবশ্যক' }]}>
                                    <Input.TextArea placeholder="পূর্ণ ঠিকানা দিন" className="rounded-xl p-3" rows={1} />
                                </Form.Item>
                            </div>
                        </section>

                        {/* Marriage Details */}
                        <section className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100">
                            <div className="flex items-center gap-3 mb-8 text-indigo-900">
                                <span className="bg-indigo-600 text-white p-2 rounded-lg text-xl">
                                    <FaCalendarAlt />
                                </span>
                                <h2 className="text-xl font-bold uppercase tracking-wide">বিবাহের তথ্য</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Form.Item label="বিবাহের তারিখ" name="marriageDate" rules={[{ required: true, message: 'তারিখ আবশ্যক' }]}>
                                    <DatePicker className="w-full rounded-xl p-3" placeholder="তারিখ নির্বাচন করুন" />
                                </Form.Item>
                                <Form.Item label="দেনমোহর পরিমাণ (টাকা)" name="denmohorAmount" rules={[{ required: true, message: 'পরিমাণ আবশ্যক' }]}>
                                    <Input type="number" prefix={<FaMoneyBillWave className="text-gray-400" />} placeholder="টাকার পরিমাণ" className="rounded-xl p-3" />
                                </Form.Item>
                                <Form.Item label="বিবাহের স্থান" name="marriageLocation" rules={[{ required: true, message: 'স্থান আবশ্যক' }]}>
                                    <Input prefix={<FaMapMarkerAlt className="text-gray-400" />} placeholder="ঠিকানা/স্থান" className="rounded-xl p-3" />
                                </Form.Item>
                            </div>
                        </section>

                        {/* Witnesses Section */}
                        <section className="space-y-8">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="bg-green-600 text-white p-2 rounded-lg text-xl">
                                    <FaUsers />
                                </span>
                                <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide">সাক্ষীদের বিবরণ</h2>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                {/* Groom Witnesses */}
                                <div className="space-y-4">
                                    <h3 className="font-bold text-blue-800 border-b pb-2">বরের পক্ষের সাক্ষী</h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="flex gap-4">
                                            <Form.Item label="সাক্ষী ১ নাম" name="groomWitness1Name" className="flex-1" rules={[{ required: true }]}>
                                                <Input className="rounded-xl p-3" />
                                            </Form.Item>
                                            <Form.Item label="সাক্ষী ১ এনআইডি" name="groomWitness1Nid" className="flex-1" rules={[{ required: true }]}>
                                                <Input className="rounded-xl p-3" />
                                            </Form.Item>
                                        </div>
                                        <div className="flex gap-4">
                                            <Form.Item label="সাক্ষী ২ নাম" name="groomWitness2Name" className="flex-1" rules={[{ required: true }]}>
                                                <Input className="rounded-xl p-3" />
                                            </Form.Item>
                                            <Form.Item label="সাক্ষী ২ এনআইডি" name="groomWitness2Nid" className="flex-1" rules={[{ required: true }]}>
                                                <Input className="rounded-xl p-3" />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>

                                {/* Bride Witnesses */}
                                <div className="space-y-4">
                                    <h3 className="font-bold text-pink-800 border-b pb-2">কনের পক্ষের সাক্ষী</h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="flex gap-4">
                                            <Form.Item label="সাক্ষী ১ নাম" name="brideWitness1Name" className="flex-1" rules={[{ required: true }]}>
                                                <Input className="rounded-xl p-3" />
                                            </Form.Item>
                                            <Form.Item label="সাক্ষী ১ এনআইডি" name="brideWitness1Nid" className="flex-1" rules={[{ required: true }]}>
                                                <Input className="rounded-xl p-3" />
                                            </Form.Item>
                                        </div>
                                        <div className="flex gap-4">
                                            <Form.Item label="সাক্ষী ২ নাম" name="brideWitness2Name" className="flex-1" rules={[{ required: true }]}>
                                                <Input className="rounded-xl p-3" />
                                            </Form.Item>
                                            <Form.Item label="সাক্ষী ২ এনআইডি" name="brideWitness2Nid" className="flex-1" rules={[{ required: true }]}>
                                                <Input className="rounded-xl p-3" />
                                            </Form.Item>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Kaji Selection & Declaration */}
                        <section className="bg-gray-100 p-8 rounded-3xl border border-gray-200">
                             <Form.Item label="কাজী নির্বাচন করুন" name="kajiId" rules={[{ required: true, message: 'কাজী নির্বাচন আবশ্যক' }]}>
                                <Select placeholder="নিকাহ রেজিস্ট্রার (কাজী) নির্বাচন করুন" className="h-14">
                                    <Select.Option value="kaji1">কাজী মোজাম্মেল হক</Select.Option>
                                    <Select.Option value="kaji2">মাওলানা আব্দুল কাদের</Select.Option>
                                    <Select.Option value="kaji3">হাফিজুর রহমান</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item 
                                name="declarationAccepted" 
                                valuePropName="checked"
                                rules={[{ validator:(_, value) => value ? Promise.resolve() : Promise.reject(new Error('ঘোষণা গ্রহণ করা আবশ্যক')) }]}
                            >
                                <Checkbox className="text-gray-700">
                                    আমি ঘোষণা করছি যে উপরের প্রদত্ত সমস্ত তথ্য সঠিক এবং সত্য। কোনো ভুল তথ্যের জন্য আমি দায়ী থাকব।
                                </Checkbox>
                            </Form.Item>
                        </section>

                        <div className="pt-4">
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                className="w-full h-16 bg-indigo-900 hover:bg-indigo-800 rounded-2xl text-xl font-bold shadow-2xl border-none transition transform active:scale-95"
                            >
                                আবেদন জমা দিন
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}
