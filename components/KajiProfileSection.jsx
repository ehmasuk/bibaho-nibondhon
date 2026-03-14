import { FaBuilding, FaUser, FaIdCard, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";

export default function KajiProfileSection({ kaji }) {
    if (!kaji) return null;

    const statusColors = {
        PENDING: "bg-amber-100 text-amber-800 border-amber-200",
        ACTIVE: "bg-emerald-100 text-emerald-800 border-emerald-200",
        REJECTED: "bg-rose-100 text-rose-800 border-rose-200",
    };

    return (
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden transform hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
            <div className="p-10 md:p-14">
                <div className="flex flex-col lg:flex-row gap-14 items-center lg:items-start text-center lg:text-left">
                    {/* Profile Image */}
                    <div className="relative group shrink-0">
                        <div className="w-56 h-56 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group-hover:border-primary/5 transition-colors duration-500 ring-1 ring-slate-100">
                            {kaji.image ? (
                                <img 
                                    src={kaji.image} 
                                    alt={kaji.fullName} 
                                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                                />
                            ) : (
                                <div className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-200">
                                    <FaUser size={80} />
                                </div>
                            )}
                        </div>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-x-0">
                           <span className={`px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border shadow-lg ${statusColors[kaji.status] || "bg-slate-100 text-slate-800 border-slate-200"}`}>
                                {kaji.status}
                           </span>
                        </div>
                    </div>

                    {/* Information Grid */}
                    <div className="flex-1 w-full mt-4 lg:mt-0">
                        <div className="mb-12">
                            <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">{kaji.fullName || "কাজী নাম নেই"}</h2>
                            <p className="text-primary font-black flex items-center justify-center lg:justify-start gap-2 text-lg tracking-wide uppercase">
                                <FaBriefcase className="opacity-50" /> {kaji.organizationName || "প্রতিষ্ঠানের নাম নেই"}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
                            <InfoItem icon={<FaIdCard />} label="জাতীয় পরিচয়পত্র (NID)" value={kaji.nid} />
                            <InfoItem icon={<FaBriefcase />} label="লাইসেন্স নম্বর" value={kaji.licenseNumber} />
                            <InfoItem icon={<FaEnvelope />} label="ইমেইল এড্রেস" value={kaji.email} />
                            <InfoItem icon={<FaPhone />} label="ফোন নম্বর" value={kaji.phone} />
                            <InfoItem 
                                icon={<FaMapMarkerAlt />} 
                                label="অবস্থান" 
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
        <div className={`flex flex-col md:flex-row items-center lg:items-start gap-4 ${fullWidth ? 'md:col-span-2' : ''}`}>
            <div className="shrink-0 bg-slate-50 p-4 rounded-[1.25rem] text-primary text-xl shadow-inner border border-slate-100/50">
                {icon}
            </div>
            <div className="text-center lg:text-left">
                <p className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 mb-1">{label}</p>
                <p className="text-slate-900 font-bold text-lg leading-snug break-all">{value || "তথ্য নেই"}</p>
            </div>
        </div>
    );
}
