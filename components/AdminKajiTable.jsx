"use client";

import { updateKajiStatus } from "@/actions/kajiActions";
import { Table, Tag, Space, Button, Modal, Descriptions, message, Select, Image } from "antd";
import { useState } from "react";
import { FaEye, FaCheck, FaTimes, FaUndo } from "react-icons/fa";

const { Option } = Select;

export default function AdminKajiTable({ kajis }) {
    const [selectedKaji, setSelectedKaji] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleStatusChange = async (id, newStatus) => {
        setLoading(true);
        try {
            const result = await updateKajiStatus(id, newStatus);
            if (result.success) {
                message.success("স্ট্যাটাস সফলভাবে আপডেট করা হয়েছে");
                window.location.reload(); // Refresh to show updated data
            } else {
                message.error(result.message || "আপডেট ব্যর্থ হয়েছে");
            }
        } catch (error) {
            message.error("একটি ত্রুটি ঘটেছে");
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: "নাম",
            dataIndex: "fullName",
            key: "fullName",
            render: (text) => <span className="font-semibold">{text}</span>
        },
        {
            title: "লাইসেন্স নম্বর",
            dataIndex: "licenseNumber",
            key: "licenseNumber",
        },
        {
            title: "ফোন",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "বিভাগ",
            dataIndex: "division",
            key: "division",
        },
        {
            title: "স্ট্যাটাস",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                let color = "blue";
                let text = status;
                if (status === "PENDING") { color = "orange"; text = "অপেক্ষমান"; }
                if (status === "ACTIVE") { color = "green"; text = "সক্রিয়"; }
                if (status === "REJECTED") { color = "red"; text = "প্রত্যাখ্যাত"; }
                return <Tag color={color}>{text}</Tag>;
            }
        },
        {
            title: "অ্যাকশন",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button 
                        icon={<FaEye />} 
                        onClick={() => { setSelectedKaji(record); setIsModalVisible(true); }}
                        className="flex items-center gap-1"
                    >
                        বিস্তারিত
                    </Button>
                    {record.status === "PENDING" && (
                        <>
                            <Button 
                                type="primary" 
                                ghost 
                                icon={<FaCheck />} 
                                onClick={() => handleStatusChange(record.id, "ACTIVE")}
                                className="flex items-center gap-1 !border-green-500 !text-green-500"
                            >
                                অনুমোদন
                            </Button>
                            <Button 
                                danger 
                                ghost 
                                icon={<FaTimes />} 
                                onClick={() => handleStatusChange(record.id, "REJECTED")}
                                className="flex items-center gap-1"
                            >
                                প্রত্যাখ্যান
                            </Button>
                        </>
                    )}
                    {(record.status === "ACTIVE" || record.status === "REJECTED") && (
                        <Button 
                            icon={<FaUndo />} 
                            onClick={() => handleStatusChange(record.id, "PENDING")}
                            className="flex items-center gap-1"
                        >
                            রিসেট
                        </Button>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <>
            <Table 
                columns={columns} 
                dataSource={kajis} 
                rowKey="id" 
                pagination={{ pageSize: 10 }}
                className="overflow-x-auto"
            />

            <Modal
                title="কাজীর বিস্তারিত তথ্য"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setIsModalVisible(false)}>
                        বন্ধ করুন
                    </Button>
                ]}
                width={800}
            >
                {selectedKaji && (
                    <div className="flex flex-col gap-6">
                        {/* Kaji Photo Section */}
                        {selectedKaji.image && (
                            <div className="flex justify-center mb-4">
                                <div className="p-1 border-2 border-dashed border-gray-200 rounded-3xl">
                                    <Image 
                                        src={selectedKaji.image} 
                                        alt={selectedKaji.fullName} 
                                        width={200} 
                                        height={200}
                                        className="rounded-2xl object-cover"
                                        placeholder={
                                            <div className="w-[200px] h-[200px] bg-gray-100 animate-pulse rounded-2xl" />
                                        }
                                    />
                                </div>
                            </div>
                        )}
                        
                        <Descriptions bordered column={2}>
                        <Descriptions.Item label="নাম" span={2}>{selectedKaji.fullName}</Descriptions.Item>
                        <Descriptions.Item label="ইমেইল">{selectedKaji.email}</Descriptions.Item>
                        <Descriptions.Item label="ফোন">{selectedKaji.phone}</Descriptions.Item>
                        <Descriptions.Item label="এনআইডি (NID)">{selectedKaji.nid}</Descriptions.Item>
                        <Descriptions.Item label="লাইসেন্স নম্বর">{selectedKaji.licenseNumber}</Descriptions.Item>
                        <Descriptions.Item label="প্রতিষ্ঠানের নাম" span={2}>{selectedKaji.organizationName}</Descriptions.Item>
                        <Descriptions.Item label="বিভাগ">{selectedKaji.division}</Descriptions.Item>
                        <Descriptions.Item label="জেলা">{selectedKaji.district}</Descriptions.Item>
                        <Descriptions.Item label="উপজেলা">{selectedKaji.upazila}</Descriptions.Item>
                        <Descriptions.Item label="বিস্তারিত ঠিকানা" span={2}>{selectedKaji.addressLine}</Descriptions.Item>
                        <Descriptions.Item label="অ্যাকাউন্ট স্ট্যাটাস">
                            <Tag color={selectedKaji.status === "ACTIVE" ? "green" : selectedKaji.status === "REJECTED" ? "red" : "orange"}>
                                {selectedKaji.status}
                            </Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="নিবন্ধনের তারিখ">
                            {new Date(selectedKaji.createdAt).toLocaleDateString("bn-BD")}
                        </Descriptions.Item>
                        </Descriptions>
                    </div>
                )}
            </Modal>
        </>
    );
}
