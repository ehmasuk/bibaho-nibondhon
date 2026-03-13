import { FaBuilding, FaUser, FaIdCard, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";

export default function KajiProfileSection({ kaji }) {
    if (!kaji) return null;

    const statusColors = {
        PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
        ACTIVE: "bg-green-100 text-green-800 border-green-200",
        REJECTED: "bg-red-100 text-red-800 border-red-200",
    };

    return (
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden mb-10">
            <div className="p-8 md:p-12">
                <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start">
                    {/* Profile Image */}
                    <div className="relative group">
                        <div className="w-48 h-48 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                            {kaji.image ? (
                                <img 
                                    src={kaji.image} 
                                    alt={kaji.fullName} 
                                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                                    <FaUser size={64} />
                                </div>
                            )}
                        </div>
                        <div className="absolute -bottom-3 -right-3">
                           <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${statusColors[kaji.status] || "bg-gray-100 text-gray-800 border-gray-200"}`}>
                                {kaji.status}
                           </span>
                        </div>
                    </div>

                    {/* Information Grid */}
                    <div className="flex-1 w-full text-black">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                            <div>
                                <h2 className="text-3xl font-black text-gray-900 mb-1">{kaji.fullName || "কাজী নাম নেই"}</h2>
                                <p className="text-indigo-600 font-bold flex items-center gap-2">
                                    <FaBriefcase /> {kaji.organizationName || "প্রতিষ্ঠানের নাম নেই"}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <InfoItem icon={<FaIdCard />} label="জাতীয় পরিচয়পত্র (NID)" value={kaji.nid} />
                            <InfoItem icon={<FaBriefcase />} label="লাইসেন্স নম্বর" value={kaji.licenseNumber} />
                            <InfoItem icon={<FaEnvelope />} label="ইমেইল এড্রেস" value={kaji.email} />
                            <InfoItem icon={<FaPhone />} label="ফোন নম্বর" value={kaji.phone} />
                            <InfoItem 
                                icon={<FaMapMarkerAlt />} 
                                label="লকেশন" 
                                value={`${kaji.upazila}, ${kaji.district}, ${kaji.division}`} 
                                fullWidth
                            />
                            <InfoItem 
                                icon={<FaBuilding />} 
                                label="বিস্তারিত ঠিকানা" 
                                value={kaji.addressLine} 
                                fullWidth
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoItem({ icon, label, value, fullWidth = false }) {
    return (
        <div className={`flex items-start gap-4 ${fullWidth ? 'md:col-span-2 lg:col-span-2' : ''}`}>
            <div className="mt-1 bg-slate-50 p-2.5 rounded-xl text-indigo-600 text-lg">
                {icon}
            </div>
            <div>
                <p className="text-[10px] uppercase font-black tracking-widest text-gray-400 mb-1">{label}</p>
                <p className="text-gray-900 font-bold leading-tight break-all">{value || "তথ্য নেই"}</p>
            </div>
        </div>
    );
}
