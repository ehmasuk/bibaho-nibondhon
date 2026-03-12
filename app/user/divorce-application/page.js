"use client";

import { Button, Checkbox, DatePicker, Form, Input, message } from "antd";
import Link from "next/link";
import { FaBalanceScale, FaCalendarAlt, FaInfoCircle, FaMapMarkerAlt, FaUserAlt, FaUsers } from "react-icons/fa";

export default function DivorceApplicationPage() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
    message.success("তালাকনামা আবেদন সফলভাবে জমা দেওয়া হয়েছে! (স্থায়ী ডেমো)");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-red-900 px-8 py-10 text-white flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
              <FaBalanceScale className="text-red-300" />
              তালাকনামা আবেদন
            </h1>
            <p className="text-red-100 mt-2">বিবাহ বিচ্ছেদের আবেদনের ডিজিটাল পোর্টাল।</p>
          </div>
          <Link href="/user/dashboard" className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition font-medium">
            ফিরে যান
          </Link>
        </div>

        <div className="p-8 lg:p-12">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-2xl mb-10 flex gap-4">
            <FaInfoCircle className="text-amber-500 text-2xl shrink-0 mt-1" />
            <p className="text-amber-800 text-sm leading-relaxed font-medium">
              <strong>সতর্কবার্তা:</strong> বিবাহ বিচ্ছেদ একটি চূড়ান্ত আইনি পদক্ষেপ। আমরা আপনাকে এটি করার আগে আইনি পরামর্শ বা পারিবারিক কাউন্সিলিং করার পরামর্শ দিচ্ছি।
            </p>
          </div>

          <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={true} className="space-y-10">
            {/* Husband Info */}
            <section className="bg-slate-50 p-6 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <span className="bg-red-600 text-white p-2 rounded-lg text-xl">
                  <FaUserAlt />
                </span>
                <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide">স্বামীর বিবরণ (Husband Details)</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Form.Item label="সম্পূর্ণ নাম" name="husbandFullName" rules={[{ required: true }]}>
                  <Input placeholder="এনআইডি অনুযায়ী" className="rounded-xl p-3" />
                </Form.Item>
                <Form.Item label="এনআইডি নম্বর" name="husbandNid" rules={[{ required: true }]}>
                  <Input placeholder="এনআইডি নম্বর" className="rounded-xl p-3" />
                </Form.Item>
                <Form.Item label="পিতার নাম" name="husbandFatherName" rules={[{ required: true }]}>
                  <Input className="rounded-xl p-3" />
                </Form.Item>
                <Form.Item label="মাতার নাম" name="husbandMotherName" rules={[{ required: true }]}>
                  <Input className="rounded-xl p-3" />
                </Form.Item>
                <Form.Item label="ঠিকানা" name="husbandAddress" className="md:col-span-2" rules={[{ required: true }]}>
                  <Input.TextArea rows={1} className="rounded-xl p-3" />
                </Form.Item>
              </div>
            </section>

            {/* Wife Info */}
            <section className="bg-slate-50 p-6 rounded-2xl border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <span className="bg-red-600 text-white p-2 rounded-lg text-xl">
                  <FaUserAlt />
                </span>
                <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide">স্ত্রীর বিবরণ (Wife Details)</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Form.Item label="সম্পূর্ণ নাম" name="wifeFullName" rules={[{ required: true }]}>
                  <Input placeholder="এনআইডি অনুযায়ী" className="rounded-xl p-3" />
                </Form.Item>
                <Form.Item label="এনআইডি নম্বর" name="wifeNid" rules={[{ required: true }]}>
                  <Input placeholder="এনআইডি নম্বর" className="rounded-xl p-3" />
                </Form.Item>
                <Form.Item label="পিতার নাম" name="wifeFatherName" rules={[{ required: true }]}>
                  <Input className="rounded-xl p-3" />
                </Form.Item>
                <Form.Item label="মাতার নাম" name="wifeMotherName" rules={[{ required: true }]}>
                  <Input className="rounded-xl p-3" />
                </Form.Item>
                <Form.Item label="ঠিকানা" name="wifeAddress" className="md:col-span-2" rules={[{ required: true }]}>
                  <Input.TextArea rows={1} className="rounded-xl p-3" />
                </Form.Item>
              </div>
            </section>

            {/* Divorce Details */}
            <section className="bg-red-50/50 p-6 rounded-2xl border border-red-100">
              <div className="flex items-center gap-3 mb-8 text-red-900">
                <span className="bg-red-600 text-white p-2 rounded-lg text-xl">
                  <FaCalendarAlt />
                </span>
                <h2 className="text-xl font-bold uppercase tracking-wide">বিচ্ছেদের তথ্য</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item label="বিচ্ছেদের কার্যকর তারিখ" name="divorceDate" rules={[{ required: true }]}>
                  <DatePicker className="w-full rounded-xl p-3" />
                </Form.Item>
                <Form.Item label="বিচ্ছেদের স্থান" name="divorceLocation" rules={[{ required: true }]}>
                  <Input prefix={<FaMapMarkerAlt className="text-gray-400" />} className="rounded-xl p-3" />
                </Form.Item>
                <Form.Item label="বিচ্ছেদের কারণ" name="divorceReason" className="md:col-span-2" rules={[{ required: true }]}>
                  <Input.TextArea rows={4} className="rounded-xl p-4" placeholder="বিচ্ছেদের কারণ বিস্তারিত লিখুন" />
                </Form.Item>
              </div>
            </section>

            {/* Witness Section */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <span className="bg-gray-600 text-white p-2 rounded-lg text-xl">
                  <FaUsers />
                </span>
                <h2 className="text-xl font-bold text-gray-900 uppercase tracking-wide">সাক্ষীদের বিবরণ</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Form.Item label="সাক্ষী ১ নাম" name="witness1Name" rules={[{ required: true }]}>
                    <Input className="rounded-xl p-3" />
                  </Form.Item>
                  <Form.Item label="সাক্ষী ১ এনআইডি" name="witness1Nid" rules={[{ required: true }]}>
                    <Input className="rounded-xl p-3" />
                  </Form.Item>
                </div>
                <div className="space-y-4">
                  <Form.Item label="সাক্ষী ২ নাম" name="witness2Name" rules={[{ required: true }]}>
                    <Input className="rounded-xl p-3" />
                  </Form.Item>
                  <Form.Item label="সাক্ষী ২ এনআইডি" name="witness2Nid" rules={[{ required: true }]}>
                    <Input className="rounded-xl p-3" />
                  </Form.Item>
                </div>
              </div>
            </section>

            {/* Kaji Selection & Declaration */}
            <section className="bg-gray-100 p-8 rounded-3xl border border-gray-200">
              <Form.Item label="কাজী/নিকাহ রেজিস্ট্রার নির্বাচন করুন" name="kajiId" rules={[{ required: true }]}>
                <Input placeholder="রেজিস্ট্রার আইডি বা নাম (ডেমো)" className="rounded-xl p-3 w-full" />
              </Form.Item>

              <Form.Item name="declarationAccepted" valuePropName="checked" rules={[{ validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error("ঘোষণা গ্রহণ করা আবশ্যক"))) }]}>
                <Checkbox className="text-gray-700">আমি নিশ্চিত করছি যে বিচ্ছেদের জন্য অনুরোধকৃত তথ্য সঠিক এবং আমি এর আইনি ফলাফলের জন্য অবগত।</Checkbox>
              </Form.Item>
            </section>

            <div className="pt-4">
              <Button
                type="primary"
                htmlType="submit"
                danger
                className="w-full h-16 bg-red-800 hover:bg-red-700 rounded-2xl text-xl font-bold shadow-2xl border-none transition transform active:scale-95"
              >
                বিচ্ছেদ আবেদন জমা দিন
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
