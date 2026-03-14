"use client";

import { updateDivorceApplicationStatus } from "@/actions/divorceActions";
import { updateMarriageApplicationStatus } from "@/actions/marriageActions";
import { Button, Descriptions, Image, Modal, Tabs, message } from "antd";
import { useState } from "react";
import { FaBalanceScale, FaCheck, FaEye, FaScroll, FaTimes } from "react-icons/fa";

export default function KajiApplicationsList({ marriageApps, divorceApps }) {
  const [selectedApp, setSelectedApp] = useState(null);
  const [appType, setAppType] = useState(null); // 'marriage' or 'divorce'
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = (app, type) => {
    setSelectedApp(app);
    setAppType(type);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedApp(null);
  };

  const handleStatusUpdate = async (id, status) => {
    setLoading(true);
    try {
      const result = appType === "marriage" ? await updateMarriageApplicationStatus(id, status) : await updateDivorceApplicationStatus(id, status);

      if (result.success) {
        message.success(result.message);
        setIsModalVisible(false);
      } else {
        message.error(result.message);
      }
    } catch (error) {
      message.error("Error updating status");
    } finally {
      setLoading(false);
    }
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
        <div className="flex flex-col items-center justify-center py-24 text-center bg-slate-50 rounded border-2 border-dashed border-slate-200">
          <div className="w-20 h-20 bg-slate-100 rounded flex items-center justify-center text-slate-300 text-3xl mb-4">{type === "marriage" ? <FaScroll /> : <FaBalanceScale />}</div>
          <p className="text-slate-500 font-black text-xl mb-1">আবেদন তালিকা খালি</p>
          <p className="text-slate-400 font-medium">বর্তমানে কোনো নতুন আবেদন নেই।</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-4">
          <thead>
            <tr className="text-slate-400">
              <th className="px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em]">{type === "marriage" ? "বর ও কনে" : "স্বামী ও স্ত্রী"}</th>
              <th className="px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em]">তারিখ ও স্থান</th>
              <th className="px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em]">স্ট্যাটাস</th>
              <th className="px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em]">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((app) => (
              <tr key={app.id} className="group bg-slate-50/50 hover:bg-white transition-all duration-300 transform hover:-translate-y-1">
                <td className="px-6 py-5 rounded-l-[1.5rem] border-y border-l border-slate-100 group-hover:border-primary/20 group-hover:shadow-lg group-hover:shadow-primary/5">
                  {type === "marriage" ? (
                    <>
                      <div className="font-black text-slate-800 text-lg mb-0.5">{app.groomFullName}</div>
                      <div className="text-primary font-bold text-xs tracking-wide">ও {app.brideFullName}</div>
                    </>
                  ) : (
                    <>
                      <div className="font-black text-slate-800 text-lg mb-0.5">{app.husbandFullName}</div>
                      <div className="text-red-600 font-bold text-xs tracking-wide">ও {app.wifeFullName}</div>
                    </>
                  )}
                </td>
                <td className="px-6 py-5 border-y border-slate-100 group-hover:border-primary/20 group-hover:shadow-lg group-hover:shadow-primary/5">
                  <div className="text-slate-700 font-bold">{new Date(type === "marriage" ? app.marriageDate : app.divorceDate).toLocaleDateString("bn-BD")}</div>
                  <div className="text-xs text-slate-400 font-medium">{type === "marriage" ? app.marriageLocation : app.divorceLocation}</div>
                </td>
                <td className="px-6 py-5 border-y border-slate-100 group-hover:border-primary/20 group-hover:shadow-lg group-hover:shadow-primary/5">
                  <div
                    className={`inline-flex px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
                      app.status === "PENDING" ? "bg-amber-100 text-amber-600" : app.status === "ACCEPTED" ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
                    }`}
                  >
                    {statusLabels[app.status]}
                  </div>
                </td>
                <td className="px-6 py-5 rounded-r-[1.5rem] border-y border-r border-slate-100 group-hover:border-primary/20 group-hover:shadow-lg group-hover:shadow-primary/5">
                  <button
                    onClick={() => showModal(app, type)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:bg-primary hover:text-white hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                  >
                    <FaEye /> বিবরণ
                  </button>
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
      key: "1",
      label: (
        <span className="flex items-center gap-2 px-4 py-1 text-base font-black uppercase tracking-tight">
          <FaScroll /> বিবাহ ({marriageApps.length})
        </span>
      ),
      children: (
        <div className="pt-6">
          <ApplicationTable apps={marriageApps} type="marriage" />
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <span className="flex items-center gap-2 px-4 py-1 text-base font-black uppercase tracking-tight">
          <FaBalanceScale /> তালাক ({divorceApps.length})
        </span>
      ),
      children: (
        <div className="pt-6">
          <ApplicationTable apps={divorceApps} type="divorce" />
        </div>
      ),
    },
  ];

  const hasMarriageApps = marriageApps && marriageApps.length > 0;
  const hasDivorceApps = divorceApps && divorceApps.length > 0;
  const showTabs = hasMarriageApps && hasDivorceApps;

  return (
    <div className="kaji-apps-list">
      <h2 className="text-3xl font-black text-slate-900 mb-10 flex items-center gap-4">
        <span className="w-3 h-10 bg-primary rounded"></span>
        আবেদন তালিকা
      </h2>

      {showTabs ? (
        <Tabs defaultActiveKey="1" items={items} className="custom-dashboard-tabs" size="large" />
      ) : (
        <div className="pt-2">
          {hasMarriageApps ? (
            <ApplicationTable apps={marriageApps} type="marriage" />
          ) : hasDivorceApps ? (
            <ApplicationTable apps={divorceApps} type="divorce" />
          ) : (
            <ApplicationTable apps={[]} type="marriage" />
          )}
        </div>
      )}

      <Modal
        title={
          <div className="flex items-center gap-4 text-2xl font-black py-4 border-b border-slate-100 w-full mb-6">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${appType === "marriage" ? "bg-primary text-white" : "bg-red-600 text-white"}`}
            >
              {appType === "marriage" ? <FaScroll /> : <FaBalanceScale />}
            </div>
            <div className="flex flex-col">
              <span className="tracking-tight text-slate-900 leading-none mb-1">{appType === "marriage" ? "বিবাহ নিবন্ধনের বিবরণ" : "তালাকনামার বিবরণ"}</span>
              <span className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">আবেদন নম্বর: #{selectedApp?.id?.slice(-8).toUpperCase()}</span>
            </div>
          </div>
        }
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={900}
        centered
        styles={{
          content: { padding: "20px" }
        }}
      >
        {selectedApp && (
          <div className="max-h-[80vh] overflow-y-auto px-8 pb-10 pt-2 hide-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {appType === "marriage" ? (
                <>
                  <section>
                    <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                      <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-blue-500 rounded"></div>
                        বরের বিবরণ
                      </h3>
                      <Descriptions
                        column={1}
                        className="custom-descriptions"
                        contentStyle={{ fontWeight: 700, color: "#1e293b", fontSize: "15px", paddingBottom: "12px" }}
                        labelStyle={{ fontWeight: 800, color: "#64748b", fontSize: "11px", textTransform: "uppercase" }}
                      >
                        <Descriptions.Item label="নাম">{selectedApp.groomFullName}</Descriptions.Item>
                        <Descriptions.Item label="এনআইডি">{selectedApp.groomNid}</Descriptions.Item>
                        <Descriptions.Item label="মোবাইল">{selectedApp.groomMobile}</Descriptions.Item>
                        <Descriptions.Item label="পিতার নাম">{selectedApp.groomFatherName}</Descriptions.Item>
                        <Descriptions.Item label="মাতার নাম">{selectedApp.groomMotherName}</Descriptions.Item>
                        <Descriptions.Item label="ঠিকানা">{selectedApp.groomAddress}</Descriptions.Item>
                      </Descriptions>
                      <div className="mt-8 grid grid-cols-2 gap-6">
                        {selectedApp.groomPhoto && (
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">বরের ছবি</p>
                            <div className="rounded-xl overflow-hidden border-4 border-white shadow-md ring-1 ring-slate-100">
                              <Image src={selectedApp.groomPhoto} alt="Groom Photo" className="w-full h-32 object-cover" />
                            </div>
                          </div>
                        )}
                        {selectedApp.groomSignature && (
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">বরের স্বাক্ষর</p>
                            <div className="rounded-xl overflow-hidden border-4 border-white shadow-md ring-1 ring-slate-100 bg-white flex items-center justify-center p-3">
                              <Image src={selectedApp.groomSignature} alt="Groom Signature" className="w-full h-12 object-contain" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </section>
                  <section>
                    <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                      <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-pink-500 rounded"></div>
                        কনের বিবরণ
                      </h3>
                      <Descriptions
                        column={1}
                        className="custom-descriptions"
                        contentStyle={{ fontWeight: 700, color: "#1e293b", fontSize: "15px", paddingBottom: "12px" }}
                        labelStyle={{ fontWeight: 800, color: "#64748b", fontSize: "11px", textTransform: "uppercase" }}
                      >
                        <Descriptions.Item label="নাম">{selectedApp.brideFullName}</Descriptions.Item>
                        <Descriptions.Item label="এনআইডি">{selectedApp.brideNid}</Descriptions.Item>
                        <Descriptions.Item label="মোবাইল">{selectedApp.brideMobile}</Descriptions.Item>
                        <Descriptions.Item label="পিতার নাম">{selectedApp.brideFatherName}</Descriptions.Item>
                        <Descriptions.Item label="মাতার নাম">{selectedApp.brideMotherName}</Descriptions.Item>
                        <Descriptions.Item label="ঠিকানা">{selectedApp.brideAddress}</Descriptions.Item>
                        {selectedApp.ukilName && (
                          <>
                            <Descriptions.Item label="উকিলের সম্পর্ক">{selectedApp.ukilRelation}</Descriptions.Item>
                            <Descriptions.Item label="উকিলের নাম">{selectedApp.ukilName}</Descriptions.Item>
                          </>
                        )}
                      </Descriptions>
                      <div className="mt-8 grid grid-cols-2 gap-6">
                        {selectedApp.bridePhoto && (
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">কনের ছবি</p>
                            <div className="rounded-xl overflow-hidden border-4 border-white shadow-md ring-1 ring-slate-100">
                              <Image src={selectedApp.bridePhoto} alt="Bride Photo" className="w-full h-32 object-cover" />
                            </div>
                          </div>
                        )}
                        {selectedApp.brideSignature && (
                          <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">কনের স্বাক্ষর</p>
                            <div className="rounded-xl overflow-hidden border-4 border-white shadow-md ring-1 ring-slate-100 bg-white flex items-center justify-center p-3">
                              <Image src={selectedApp.brideSignature} alt="Bride Signature" className="w-full h-12 object-contain" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </section>
                </>
              ) : (
                <>
                  <section>
                    <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                      <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-red-600 rounded"></div>
                        স্বামীর বিবরণ
                      </h3>
                      <Descriptions
                        column={1}
                        className="custom-descriptions"
                        contentStyle={{ fontWeight: 700, color: "#1e293b", fontSize: "15px", paddingBottom: "12px" }}
                        labelStyle={{ fontWeight: 800, color: "#64748b", fontSize: "11px", textTransform: "uppercase" }}
                      >
                        <Descriptions.Item label="নাম">{selectedApp.husbandFullName}</Descriptions.Item>
                        <Descriptions.Item label="এনআইডি">{selectedApp.husbandNid}</Descriptions.Item>
                        <Descriptions.Item label="পিতার নাম">{selectedApp.husbandFatherName}</Descriptions.Item>
                        <Descriptions.Item label="মাতার নাম">{selectedApp.husbandMotherName}</Descriptions.Item>
                        <Descriptions.Item label="ঠিকানা">{selectedApp.husbandAddress}</Descriptions.Item>
                      </Descriptions>
                    </div>
                  </section>
                  <section>
                    <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                      <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-orange-600 rounded"></div>
                        স্ত্রীর বিবরণ
                      </h3>
                      <Descriptions
                        column={1}
                        className="custom-descriptions"
                        contentStyle={{ fontWeight: 700, color: "#1e293b", fontSize: "15px", paddingBottom: "12px" }}
                        labelStyle={{ fontWeight: 800, color: "#64748b", fontSize: "11px", textTransform: "uppercase" }}
                      >
                        <Descriptions.Item label="নাম">{selectedApp.wifeFullName}</Descriptions.Item>
                        <Descriptions.Item label="এনআইডি">{selectedApp.wifeNid}</Descriptions.Item>
                        <Descriptions.Item label="পিতার নাম">{selectedApp.wifeFatherName}</Descriptions.Item>
                        <Descriptions.Item label="মাতার নাম">{selectedApp.wifeMotherName}</Descriptions.Item>
                        <Descriptions.Item label="ঠিকানা">{selectedApp.wifeAddress}</Descriptions.Item>
                      </Descriptions>
                    </div>
                  </section>
                </>
              )}
            </div>

            <section className="mt-8 bg-slate-100 p-8 rounded-2xl border border-slate-200">
              <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                <div className={`w-2 h-6 ${appType === "marriage" ? "bg-primary" : "bg-red-600"} rounded`}></div>
                {appType === "marriage" ? "বিবাহের তথ্য" : "বিচ্ছেদের তথ্য"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {appType === "marriage" ? (
                  <>
                    <InfoBlock label="বিবাহের তারিখ" value={new Date(selectedApp.marriageDate).toLocaleDateString("bn-BD")} />
                    <InfoBlock label="বিবাহের স্থান" value={selectedApp.marriageLocation} />
                    <InfoBlock label="দেনমোহর পরিমাণ" value={`${selectedApp.denmohorAmount} টাকা`} highlight />
                  </>
                ) : (
                  <>
                    <InfoBlock label="বিচ্ছেদের তারিখ" value={new Date(selectedApp.divorceDate).toLocaleDateString("bn-BD")} />
                    <InfoBlock label="বিচ্ছেদের স্থান" value={selectedApp.divorceLocation} />
                    <div className="md:col-span-2 lg:col-span-1">
                      <InfoBlock label="বিচ্ছেদের কারণ" value={selectedApp.divorceReason} />
                    </div>
                  </>
                )}
              </div>
            </section>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-100">
              <div className="text-slate-400 font-medium italic text-xs">আবেদনটি দাখিল করা হয়েছে: {new Date(selectedApp.createdAt).toLocaleDateString("bn-BD")}</div>

              <div className="flex gap-4 w-full sm:w-auto">
                {selectedApp.status === "PENDING" ? (
                  <>
                    <Button
                      danger
                      icon={<FaTimes />}
                      loading={loading}
                      onClick={() => handleStatusUpdate(selectedApp.id, "REJECTED")}
                      className="rounded-xl px-10 h-14 font-bold shadow-sm"
                    >
                      প্রত্যাখ্যান
                    </Button>
                    <Button
                      type="primary"
                      icon={<FaCheck />}
                      loading={loading}
                      onClick={() => handleStatusUpdate(selectedApp.id, "ACCEPTED")}
                      className="bg-emerald-600 hover:bg-emerald-700 border-none rounded-xl px-10 h-14 font-bold shadow-sm"
                    >
                      অনুমোদন
                    </Button>
                  </>
                ) : (
                  <div
                    className={`px-8 py-3 rounded-xl font-black text-lg ${
                      selectedApp.status === "ACCEPTED" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                    }`}
                  >
                    ইতিমধ্যে {statusLabels[selectedApp.status]}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>

      <style jsx global>{`
        .custom-dashboard-tabs .ant-tabs-nav::before {
          border-bottom: 2px solid #f1f5f9;
        }
        .custom-dashboard-tabs .ant-tabs-ink-bar {
          background: #9e2953;
          height: 3px !important;
        }
        .custom-dashboard-tabs .ant-tabs-tab {
          padding: 12px 0 !important;
          margin: 0 24px 0 0 !important;
        }
        .custom-dashboard-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
          color: #9e2953 !important;
        }
        .custom-dashboard-tabs .ant-tabs-tab:hover {
          color: #9e2953 !important;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .custom-descriptions .ant-descriptions-item-content {
          border-bottom: 1px dashed #f1f5f9;
        }
      `}</style>
    </div>
  );
}

function InfoBlock({ label, value, highlight = false }) {
  return (
    <div
      className={`p-6 rounded-xl border ${
        highlight ? "bg-primary text-white border-primary" : "bg-white border-slate-200"
      }`}
    >
      <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${highlight ? 'text-white/60' : 'text-slate-400'}`}>{label}</p>
      <p className={`text-xl font-black tracking-tight ${highlight ? 'text-white' : 'text-slate-900'}`}>{value}</p>
    </div>
  );
}
