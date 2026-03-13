"use client";

import { useState } from "react";
import { Modal, Button, Tag, Tabs, Descriptions, Image } from "antd";
import { FaEye, FaScroll, FaBalanceScale, FaUserTie } from "react-icons/fa";

export default function AdminApplicationsList({ marriageApps, divorceApps }) {
    const [selectedApp, setSelectedApp] = useState(null);
    const [appType, setAppType] = useState(null); // 'marriage' or 'divorce'
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (app, type) => {
        setSelectedApp(app);
        setAppType(type);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedApp(null);
    };

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

    const ApplicationTable = ({ apps, type }) => {
        if (!apps || apps.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-500 font-medium text-lg">আবেদন তালিকা খালি</p>
                    <p className="text-gray-400 mt-2">বর্তমানে কোনো নতুন আবেদন নেই।</p>
                </div>
            );
        }

        return (
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">
                                {type === 'marriage' ? 'বর ও কনে' : 'স্বামী ও স্ত্রী'}
                            </th>
                            <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">কাজী</th>
                            <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">তারিখ ও স্থান</th>
                            <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">স্ট্যাটাস</th>
                            <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">অ্যাকশন</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {apps.map((app) => (
                            <tr key={app.id} className="hover:bg-slate-50 transition">
                                <td className="px-6 py-4">
                                    {type === 'marriage' ? (
                                        <>
                                            <div className="font-bold text-slate-900">{app.groomFullName}</div>
                                            <div className="text-pink-600 text-xs font-medium italic">ও {app.brideFullName}</div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="font-bold text-slate-900">{app.husbandFullName}</div>
                                            <div className="text-red-600 text-xs font-medium italic">ও {app.wifeFullName}</div>
                                        </>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-sm text-slate-700">
                                        <FaUserTie className="text-slate-400" />
                                        <span>{app.kaji?.fullName || 'N/A'}</span>
                                    </div>
                                    <div className="text-xs text-slate-400 ml-6">{app.kaji?.licenseNumber}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-slate-600">
                                        {new Date(type === 'marriage' ? app.marriageDate : app.divorceDate).toLocaleDateString("bn-BD")}
                                    </div>
                                    <div className="text-xs text-slate-400">
                                        {type === 'marriage' ? app.marriageLocation : app.divorceLocation}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Tag color={statusColors[app.status]}>{statusLabels[app.status]}</Tag>
                                </td>
                                <td className="px-6 py-4">
                                    <Button 
                                        icon={<FaEye />} 
                                        onClick={() => showModal(app, type)}
                                        className="flex items-center gap-2 border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-600"
                                    >
                                        বিবরণ দেখুন
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const items = [
        {
            key: '1',
            label: <span className="flex items-center gap-2 px-2"><FaScroll /> বিবাহ নিবন্ধন ({marriageApps.length})</span>,
            children: <ApplicationTable apps={marriageApps} type="marriage" />,
        },
        {
            key: '2',
            label: <span className="flex items-center gap-2 px-2"><FaBalanceScale /> তালাকনামা ({divorceApps.length})</span>,
            children: <ApplicationTable apps={divorceApps} type="divorce" />,
        },
    ];

    return (
        <div className="admin-apps-list p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 border-l-4 border-indigo-600 pl-4 uppercase tracking-tight">আবেদনসমূহ (System Applications)</h2>
            
            <Tabs defaultActiveKey="1" items={items} className="custom-tabs" />

            <Modal
                title={
                    <div className="flex items-center gap-3 text-xl font-bold">
                        {appType === 'marriage' ? <FaScroll className="text-indigo-600" /> : <FaBalanceScale className="text-red-600" />}
                        <span>{appType === 'marriage' ? "বিবাহ নিবন্ধনের বিবরণ" : "তালাকনামার বিবরণ"}</span>
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
                {selectedApp && (
                    <div className="space-y-8 py-4">
                        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <div>
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Kaji (Registrar)</p>
                                <p className="font-bold text-slate-800">{selectedApp.kaji?.fullName}</p>
                                <p className="text-xs text-slate-500">{selectedApp.kaji?.licenseNumber}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Status</p>
                                <Tag color={statusColors[selectedApp.status]}>{statusLabels[selectedApp.status]}</Tag>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {appType === 'marriage' ? (
                                <>
                                    <section className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
                                        <h3 className="font-bold text-blue-900 mb-4 border-b border-blue-100 pb-2">বরের বিবরণ</h3>
                                        <Descriptions column={1}>
                                            <Descriptions.Item label="নাম">{selectedApp.groomFullName}</Descriptions.Item>
                                            <Descriptions.Item label="এনআইডি">{selectedApp.groomNid}</Descriptions.Item>
                                            <Descriptions.Item label="ঠিকানা">{selectedApp.groomAddress}</Descriptions.Item>
                                        </Descriptions>
                                        <div className="mt-4 grid grid-cols-2 gap-4">
                                            {selectedApp.groomPhoto && (
                                                <div>
                                                    <p className="text-xs text-blue-800 font-bold mb-1">বরের ছবি</p>
                                                    <Image src={selectedApp.groomPhoto} alt="Groom Photo" className="rounded-lg border border-blue-200" width={100} />
                                                </div>
                                            )}
                                            {selectedApp.groomSignature && (
                                                <div>
                                                    <p className="text-xs text-blue-800 font-bold mb-1">বরের স্বাক্ষর</p>
                                                    <Image src={selectedApp.groomSignature} alt="Groom Signature" className="rounded-lg border border-blue-200" width={100} />
                                                </div>
                                            )}
                                        </div>
                                    </section>
                                    <section className="bg-pink-50/50 p-5 rounded-2xl border border-pink-100">
                                        <h3 className="font-bold text-pink-900 mb-4 border-b border-pink-100 pb-2">কনের বিবরণ</h3>
                                        <Descriptions column={1}>
                                            <Descriptions.Item label="নাম">{selectedApp.brideFullName}</Descriptions.Item>
                                            <Descriptions.Item label="এনআইডি">{selectedApp.brideNid}</Descriptions.Item>
                                            <Descriptions.Item label="ঠিকানা">{selectedApp.brideAddress}</Descriptions.Item>
                                        </Descriptions>
                                        <div className="mt-4 grid grid-cols-2 gap-4">
                                            {selectedApp.bridePhoto && (
                                                <div>
                                                    <p className="text-xs text-pink-800 font-bold mb-1">কনের ছবি</p>
                                                    <Image src={selectedApp.bridePhoto} alt="Bride Photo" className="rounded-lg border border-pink-200" width={100} />
                                                </div>
                                            )}
                                            {selectedApp.brideSignature && (
                                                <div>
                                                    <p className="text-xs text-pink-800 font-bold mb-1">কনের স্বাক্ষর</p>
                                                    <Image src={selectedApp.brideSignature} alt="Bride Signature" className="rounded-lg border border-pink-200" width={100} />
                                                </div>
                                            )}
                                        </div>
                                    </section>
                                </>
                            ) : (
                                <>
                                    <section className="bg-red-50/50 p-5 rounded-2xl border border-red-100">
                                        <h3 className="font-bold text-red-900 mb-4 border-b border-red-100 pb-2">স্বামীর বিবরণ</h3>
                                        <Descriptions column={1}>
                                            <Descriptions.Item label="নাম">{selectedApp.husbandFullName}</Descriptions.Item>
                                            <Descriptions.Item label="এনআইডি">{selectedApp.husbandNid}</Descriptions.Item>
                                            <Descriptions.Item label="ঠিকানা">{selectedApp.husbandAddress}</Descriptions.Item>
                                        </Descriptions>
                                    </section>
                                    <section className="bg-orange-50/50 p-5 rounded-2xl border border-orange-100">
                                        <h3 className="font-bold text-orange-900 mb-4 border-b border-orange-100 pb-2">স্ত্রীর বিবরণ</h3>
                                        <Descriptions column={1}>
                                            <Descriptions.Item label="নাম">{selectedApp.wifeFullName}</Descriptions.Item>
                                            <Descriptions.Item label="এনআইডি">{selectedApp.wifeNid}</Descriptions.Item>
                                            <Descriptions.Item label="ঠিকানা">{selectedApp.wifeAddress}</Descriptions.Item>
                                        </Descriptions>
                                    </section>
                                </>
                            )}
                        </div>

                        <section className={`${appType === 'marriage' ? 'bg-indigo-50/50 border-indigo-100' : 'bg-red-50/50 border-red-100'} p-5 rounded-2xl border`}>
                            <h3 className={`font-bold ${appType === 'marriage' ? 'text-indigo-900 border-indigo-100' : 'text-red-900 border-red-100'} mb-4 border-b pb-2`}>
                                {appType === 'marriage' ? "বিবাহের তথ্য" : "বিচ্ছেদের তথ্য"}
                            </h3>
                            {appType === 'marriage' ? (
                                <Descriptions column={2}>
                                    <Descriptions.Item label="তারিখ">{new Date(selectedApp.marriageDate).toLocaleDateString("bn-BD")}</Descriptions.Item>
                                    <Descriptions.Item label="স্থান">{selectedApp.marriageLocation}</Descriptions.Item>
                                    <Descriptions.Item label="দেনমোহর">{selectedApp.denmohorAmount} টাকা</Descriptions.Item>
                                </Descriptions>
                            ) : (
                                <Descriptions column={1}>
                                    <Descriptions.Item label="তারিখ">{new Date(selectedApp.divorceDate).toLocaleDateString("bn-BD")}</Descriptions.Item>
                                    <Descriptions.Item label="স্থান">{selectedApp.divorceLocation}</Descriptions.Item>
                                    <Descriptions.Item label="কারণ">{selectedApp.divorceReason}</Descriptions.Item>
                                </Descriptions>
                            )}
                        </section>
                    </div>
                )}
            </Modal>
        </div>
    );
}
