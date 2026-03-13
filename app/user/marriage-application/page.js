"use client";

import { Form, Input, Select, DatePicker, Button, Divider, checkbox, Checkbox, message, Spin, Empty, Upload } from "antd";
import { FaRegFileAlt, FaMale, FaFemale, FaUsers, FaMapMarkerAlt, FaCalendarAlt, FaMoneyBillWave, FaSearch, FaCamera, FaSignature } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { getActiveKajis } from "@/actions/kajiActions";
import { submitMarriageApplication } from "@/actions/marriageActions";
import { imageToBase64 } from "@/helpers/imageToBase64";
import { useRouter } from "next/navigation";
import KajiCard from "@/components/KajiCard";
import axios from "axios";

const { Option } = Select;
const BD_API_BASE = "https://bdapis.com/api/v1.2";

export default function MarriageApplicationPage() {
    const [form] = Form.useForm();
    const [kajis, setKajis] = useState([]);
    const [loadingKajis, setLoadingKajis] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    
    // Location state
    const [divisions, setDivisions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [upazillas, setUpazillas] = useState([]);
    const [fetchingDivisions, setFetchingDivisions] = useState(false);
    const [fetchingDistricts, setFetchingDistricts] = useState(false);
    const [fetchingUpazillas, setFetchingUpazillas] = useState(false);
    
    const [selectedDivision, setSelectedDivision] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedUpazila, setSelectedUpazila] = useState(null);

    const [selectedKajiId, setSelectedKajiId] = useState(null);
    const router = useRouter();

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

    const handleDivisionChange = async (value) => {
        setSelectedDivision(value);
        setSelectedDistrict(null);
        setSelectedUpazila(null);
        setDistricts([]);
        setUpazillas([]);

        if (!value) return;

        setFetchingDistricts(true);
        try {
            const res = await axios.get(`${BD_API_BASE}/division/${value.toLowerCase()}`);
            setDistricts(res.data.data);
        } catch (err) {
            console.error("Error fetching districts:", err);
            message.error("জেলা লোড করা সম্ভব হয়নি");
        } finally {
            setFetchingDistricts(false);
        }
    };

    const handleDistrictChange = async (value) => {
        setSelectedDistrict(value);
        setSelectedUpazila(null);
        setUpazillas([]);

        if (!value) return;

        setFetchingUpazillas(true);
        try {
            const res = await axios.get(`${BD_API_BASE}/district/${value.toLowerCase()}`);
            const fetchedUpazillas = res.data.data[0]?.upazillas || [];
            setUpazillas(fetchedUpazillas);
        } catch (err) {
            console.error("Error fetching upazillas:", err);
            message.error("উপজেলা লোড করা সম্ভব হয়নি");
        } finally {
            setFetchingUpazillas(false);
        }
    };

    const handleKajiSelect = (id) => {
        setSelectedKajiId(id);
        form.setFieldsValue({ kajiId: id });
    };

    const filteredKajis = useMemo(() => {
        if (!selectedDivision || !selectedDistrict || !selectedUpazila) return [];
        return kajis.filter(kaji => 
            kaji.division === selectedDivision &&
            kaji.district === selectedDistrict &&
            kaji.upazila === selectedUpazila
        );
    }, [kajis, selectedDivision, selectedDistrict, selectedUpazila]);

    useEffect(() => {
        const fetchKajis = async () => {
            setLoadingKajis(true);
            const result = await getActiveKajis();
            if (result.success) {
                setKajis(result.data);
            } else {
                message.error(result.message || "কাজী তথ্য আনতে ব্যর্থ হয়েছে");
            }
            setLoadingKajis(false);
        };
        fetchKajis();
    }, []);

    const onFinish = async (values) => {
        setSubmitting(true);
        try {
            let groomPhotoData = null;
            let groomSignatureData = null;
            let bridePhotoData = null;
            let brideSignatureData = null;

            if (values.groomPhoto && values.groomPhoto.fileList && values.groomPhoto.fileList[0]) {
                groomPhotoData = await imageToBase64(values.groomPhoto.fileList[0].originFileObj);
            }
            if (values.groomSignature && values.groomSignature.fileList && values.groomSignature.fileList[0]) {
                groomSignatureData = await imageToBase64(values.groomSignature.fileList[0].originFileObj);
            }
            if (values.bridePhoto && values.bridePhoto.fileList && values.bridePhoto.fileList[0]) {
                bridePhotoData = await imageToBase64(values.bridePhoto.fileList[0].originFileObj);
            }
            if (values.brideSignature && values.brideSignature.fileList && values.brideSignature.fileList[0]) {
                brideSignatureData = await imageToBase64(values.brideSignature.fileList[0].originFileObj);
            }

            const formData = {
                ...values,
                groomPhoto: groomPhotoData,
                groomSignature: groomSignatureData,
                bridePhoto: bridePhotoData,
                brideSignature: brideSignatureData
            };

            const result = await submitMarriageApplication(formData);
            if (result.success) {
                message.success(result.message);
                form.resetFields();
                router.push("/user/dashboard");
            } else {
                message.error(result.message);
            }
        } catch (error) {
            console.error("Submission Error:", error);
            message.error("আবেদন জমা দিতে সমস্যা হয়েছে।");
        } finally {
            setSubmitting(false);
        }
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
                                <Form.Item label="বরের ছবি" name="groomPhoto" valuePropName="file" rules={[{ required: true, message: 'বরের ছবি আবশ্যক' }]}>
                                    <Upload listType="picture-card" maxCount={1} beforeUpload={() => false} accept="image/*">
                                        <div className="flex flex-col items-center">
                                            <FaCamera className="text-2xl text-gray-400 mb-2" />
                                            <div className="text-xs text-gray-400 text-center">আপলোড</div>
                                        </div>
                                    </Upload>
                                </Form.Item>
                                <Form.Item label="বরের স্বাক্ষর" name="groomSignature" valuePropName="file" rules={[{ required: true, message: 'বরের স্বাক্ষর আবশ্যক' }]}>
                                    <Upload listType="picture-card" maxCount={1} beforeUpload={() => false} accept="image/*">
                                        <div className="flex flex-col items-center">
                                            <FaSignature className="text-2xl text-gray-400 mb-2" />
                                            <div className="text-xs text-gray-400 text-center">আপলোড</div>
                                        </div>
                                    </Upload>
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
                                <Form.Item label="কনের ছবি" name="bridePhoto" valuePropName="file" rules={[{ required: true, message: 'কনের ছবি আবশ্যক' }]}>
                                    <Upload listType="picture-card" maxCount={1} beforeUpload={() => false} accept="image/*">
                                        <div className="flex flex-col items-center">
                                            <FaCamera className="text-2xl text-gray-400 mb-2" />
                                            <div className="text-xs text-gray-400 text-center">আপলোড</div>
                                        </div>
                                    </Upload>
                                </Form.Item>
                                <Form.Item label="কনের স্বাক্ষর" name="brideSignature" valuePropName="file" rules={[{ required: true, message: 'কনের স্বাক্ষর আবশ্যক' }]}>
                                    <Upload listType="picture-card" maxCount={1} beforeUpload={() => false} accept="image/*">
                                        <div className="flex flex-col items-center">
                                            <FaSignature className="text-2xl text-gray-400 mb-2" />
                                            <div className="text-xs text-gray-400 text-center">আপলোড</div>
                                        </div>
                                    </Upload>
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
                             <div className="mb-8">
                                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300">কাজী নির্বাচন করুন</h2>
                                <p className="text-gray-600 mb-4 text-sm mt-2">আপনার এলাকার কাজী খুঁজে পেতে বিভাগ, জেলা এবং উপজেলা নির্বাচন করুন।</p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                    <Select 
                                        placeholder="বিভাগ নির্বাচন করুন" 
                                        size="large" 
                                        className="w-full h-12"
                                        value={selectedDivision}
                                        onChange={handleDivisionChange}
                                        loading={fetchingDivisions}
                                    >
                                        {divisions.map((div) => (
                                            <Option key={div.division} value={div.division}>
                                                {div.divisionbn}
                                            </Option>
                                        ))}
                                    </Select>

                                    <Select 
                                        placeholder="জেলা নির্বাচন করুন" 
                                        size="large" 
                                        className="w-full h-12"
                                        value={selectedDistrict}
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

                                    <Select 
                                        placeholder="উপজেলা নির্বাচন করুন" 
                                        size="large" 
                                        className="w-full h-12"
                                        value={selectedUpazila}
                                        onChange={(val) => setSelectedUpazila(val)}
                                        loading={fetchingUpazillas}
                                        disabled={!upazillas.length}
                                    >
                                        {upazillas.map((up) => (
                                            <Option key={up} value={up}>
                                                {up}
                                            </Option>
                                        ))}
                                    </Select>
                                </div>

                                <Form.Item name="kajiId" rules={[{ required: true, message: 'কাজী নির্বাচন আবশ্যক' }]} hidden>
                                    <Input />
                                </Form.Item>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[500px] overflow-y-auto px-1 py-1 custom-scrollbar">
                                    {loadingKajis ? (
                                        <div className="col-span-full py-10 flex justify-center">
                                            <Spin size="large" />
                                        </div>
                                    ) : filteredKajis.length > 0 ? (
                                        filteredKajis.map(kaji => (
                                            <KajiCard 
                                                key={kaji.id} 
                                                kaji={kaji} 
                                                isSelected={selectedKajiId === kaji.id}
                                                onClick={() => handleKajiSelect(kaji.id)}
                                            />
                                        ))
                                    ) : (
                                        <div className="col-span-full py-10 bg-white rounded-2xl border border-gray-100 flex items-center justify-center">
                                            <Empty description={(!selectedDivision || !selectedDistrict || !selectedUpazila) ? "কাজী দেখতে সম্পূর্ণ ঠিকানা নির্বাচন করুন" : "এই এলাকায় কোনো কাজী পাওয়া যায়নি"} />
                                        </div>
                                    )}
                                </div>
                            </div>

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
                                loading={submitting}
                                disabled={submitting}
                                className="w-full h-16 bg-indigo-900 hover:bg-indigo-800 rounded-2xl text-xl font-bold shadow-2xl border-none transition transform active:scale-95"
                            >
                                {submitting ? "জমাদান করা হচ্ছে..." : "আবেদন জমা দিন"}
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}
