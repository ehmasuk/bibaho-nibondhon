"use client";

import { useState } from "react";
import { Modal, Button, Tag, Descriptions, Image } from "antd";
import { FaEye, FaFileSignature, FaBalanceScale } from "react-icons/fa";

export default function UserApplicationDetails({ application, type }) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => setIsModalVisible(true);
    const handleCancel = () => setIsModalVisible(false);

    const isMarriage = type === "marriage";

    const statusColors = {
        PENDING: "orange",
        ACCEPTED: "green",
        REJECTED: "red",
    };

    const statusLabels = {
        PENDING: "অপেক্ষমান",
        ACCEPTED: "গৃহীত",
        REJECTED: "প্রত্যাখ্যাত",
    };

    return (
        <>
            <button 
                onClick={showModal}
                className={`${isMarriage ? 'text-blue-600' : 'text-red-600'} hover:underline text-sm font-bold flex items-center gap-1`}
            >
                <FaEye /> View Details
            </button>

            <Modal
                title={
                    <div className="flex items-center gap-3 text-xl font-bold">
                        {isMarriage ? <FaFileSignature className="text-blue-600" /> : <FaBalanceScale className="text-red-600" />}
                        <span>{isMarriage ? "বিবাহ নিবন্ধনের বিবরণ" : "তালাকনামার বিবরণ"}</span>
                    </div>
                }
                open={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="close" onClick={handleCancel} className="rounded-lg">
                        Close
                    </Button>
                ]}
                width={800}
                className="rounded-2xl"
            >
                <div className="space-y-8 py-4">
                    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Application Status</p>
                            <Tag color={statusColors[application.status]} className="mt-1 text-sm px-3 py-1 font-bold">
                                {statusLabels[application.status]}
                            </Tag>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Applied On</p>
                            <p className="mt-1 font-bold text-gray-700">{new Date(application.createdAt).toLocaleDateString("bn-BD")}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {isMarriage ? (
                            <>
                                <section className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
                                    <h3 className="font-bold text-blue-900 mb-4 border-b border-blue-100 pb-2">বরের বিবরণ</h3>
                                    <Descriptions column={1}>
                                        <Descriptions.Item label="নাম">{application.groomFullName}</Descriptions.Item>
                                        <Descriptions.Item label="এনআইডি">{application.groomNid}</Descriptions.Item>
                                        <Descriptions.Item label="মোবাইল">{application.groomMobile}</Descriptions.Item>
                                        <Descriptions.Item label="পিতার নাম">{application.groomFatherName}</Descriptions.Item>
                                        <Descriptions.Item label="মাতার নাম">{application.groomMotherName}</Descriptions.Item>
                                        <Descriptions.Item label="ঠিকানা">{application.groomAddress}</Descriptions.Item>
                                    </Descriptions>
                                    <div className="mt-4 grid grid-cols-2 gap-4">
                                        {application.groomPhoto && (
                                            <div>
                                                <p className="text-xs text-blue-800 font-bold mb-1">বরের ছবি</p>
                                                <Image src={application.groomPhoto} alt="Groom Photo" className="rounded-lg border border-blue-200" width={100} />
                                            </div>
                                        )}
                                        {application.groomSignature && (
                                            <div>
                                                <p className="text-xs text-blue-800 font-bold mb-1">বরের স্বাক্ষর</p>
                                                <Image src={application.groomSignature} alt="Groom Signature" className="rounded-lg border border-blue-200" width={100} />
                                            </div>
                                        )}
                                    </div>
                                </section>

                                <section className="bg-pink-50/50 p-5 rounded-2xl border border-pink-100">
                                    <h3 className="font-bold text-pink-900 mb-4 border-b border-pink-100 pb-2">কনের বিবরণ</h3>
                                    <Descriptions column={1}>
                                        <Descriptions.Item label="নাম">{application.brideFullName}</Descriptions.Item>
                                        <Descriptions.Item label="এনআইডি">{application.brideNid}</Descriptions.Item>
                                        <Descriptions.Item label="মোবাইল">{application.brideMobile}</Descriptions.Item>
                                        <Descriptions.Item label="পিতার নাম">{application.brideFatherName}</Descriptions.Item>
                                        <Descriptions.Item label="মাতার নাম">{application.brideMotherName}</Descriptions.Item>
                                        <Descriptions.Item label="ঠিকানা">{application.brideAddress}</Descriptions.Item>
                                        {application.ukilName && (
                                            <>
                                                <Descriptions.Item label="উকিলের সম্পর্ক">{application.ukilRelation}</Descriptions.Item>
                                                <Descriptions.Item label="উকিলের নাম">{application.ukilName}</Descriptions.Item>
                                            </>
                                        )}
                                    </Descriptions>
                                    <div className="mt-4 grid grid-cols-2 gap-4">
                                        {application.bridePhoto && (
                                            <div>
                                                <p className="text-xs text-pink-800 font-bold mb-1">কনের ছবি</p>
                                                <Image src={application.bridePhoto} alt="Bride Photo" className="rounded-lg border border-pink-200" width={100} />
                                            </div>
                                        )}
                                        {application.brideSignature && (
                                            <div>
                                                <p className="text-xs text-pink-800 font-bold mb-1">কনের স্বাক্ষর</p>
                                                <Image src={application.brideSignature} alt="Bride Signature" className="rounded-lg border border-pink-200" width={100} />
                                            </div>
                                        )}
                                    </div>
                                </section>
                            </>
                        ) : (
                            <>
                                <section className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100">
                                    <h3 className="font-bold text-indigo-900 mb-4 border-b border-indigo-100 pb-2">স্বামীর বিবরণ</h3>
                                    <Descriptions column={1}>
                                        <Descriptions.Item label="নাম">{application.husbandFullName}</Descriptions.Item>
                                        <Descriptions.Item label="এনআইডি">{application.husbandNid}</Descriptions.Item>
                                        <Descriptions.Item label="পিতার নাম">{application.husbandFatherName}</Descriptions.Item>
                                        <Descriptions.Item label="মাতার নাম">{application.husbandMotherName}</Descriptions.Item>
                                        <Descriptions.Item label="ঠিকানা">{application.husbandAddress}</Descriptions.Item>
                                    </Descriptions>
                                </section>

                                <section className="bg-purple-50/50 p-5 rounded-2xl border border-purple-100">
                                    <h3 className="font-bold text-purple-900 mb-4 border-b border-purple-100 pb-2">স্ত্রীর বিবরণ</h3>
                                    <Descriptions column={1}>
                                        <Descriptions.Item label="নাম">{application.wifeFullName}</Descriptions.Item>
                                        <Descriptions.Item label="এনআইডি">{application.wifeNid}</Descriptions.Item>
                                        <Descriptions.Item label="পিতার নাম">{application.wifeFatherName}</Descriptions.Item>
                                        <Descriptions.Item label="মাতার নাম">{application.wifeMotherName}</Descriptions.Item>
                                        <Descriptions.Item label="ঠিকানা">{application.wifeAddress}</Descriptions.Item>
                                    </Descriptions>
                                </section>
                            </>
                        )}
                    </div>

                    <section className={`${isMarriage ? 'bg-indigo-50/50 border-indigo-100' : 'bg-red-50/50 border-red-100'} p-5 rounded-2xl border`}>
                        <h3 className={`font-bold ${isMarriage ? 'text-indigo-900 border-indigo-100' : 'text-red-900 border-red-100'} mb-4 border-b pb-2`}>
                            {isMarriage ? "বিবাহের তথ্য" : "তালাকের তথ্য"}
                        </h3>
                        {isMarriage ? (
                            <Descriptions column={2}>
                                <Descriptions.Item label="তারিখ">{new Date(application.marriageDate).toLocaleDateString("bn-BD")}</Descriptions.Item>
                                <Descriptions.Item label="স্থান">{application.marriageLocation}</Descriptions.Item>
                                <Descriptions.Item label="দেনমোহর">{application.denmohorAmount} টাকা</Descriptions.Item>
                            </Descriptions>
                        ) : (
                            <Descriptions column={1}>
                                <Descriptions.Item label="তারিখ">{new Date(application.divorceDate).toLocaleDateString("bn-BD")}</Descriptions.Item>
                                <Descriptions.Item label="স্থান">{application.divorceLocation}</Descriptions.Item>
                                <Descriptions.Item label="কারণ">{application.divorceReason}</Descriptions.Item>
                            </Descriptions>
                        )}
                    </section>
                </div>
            </Modal>
        </>
    );
}
