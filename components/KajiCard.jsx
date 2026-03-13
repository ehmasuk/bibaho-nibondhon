import { AiOutlineGlobal, AiOutlineHome, AiOutlinePhone } from "react-icons/ai";
import { FaUser } from "react-icons/fa";

export default function KajiCard({ kaji, isSelected, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-3xl p-6 shadow-sm border ${isSelected ? 'border-indigo-600 ring-2 ring-indigo-600/20 bg-indigo-50/10' : 'border-gray-100'} hover:shadow-xl transition-all duration-300 group ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex flex-col gap-4">
        {/* Header Profile Info */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-gray-50 flex-shrink-0 bg-slate-50 flex items-center justify-center text-slate-300 shadow-sm">
            {kaji.image ? <img src={kaji.image} alt={kaji.fullName} className="w-full h-full object-cover group-hover:scale-110 transition duration-300" /> : <FaUser size={24} />}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">{kaji.fullName}</h3>
            <p className="text-blue-600 font-medium text-xs mt-0.5 truncate">{kaji.organizationName}</p>
          </div>
        </div>

        <div className="h-px bg-gray-100 w-full" />

        {/* Details Grid */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-600">
            <AiOutlinePhone className="text-gray-400" />
            <span className="text-sm">{kaji.phone}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <AiOutlineGlobal className="text-gray-400" />
            <span className="text-sm">লাইসেন্স: {kaji.licenseNumber}</span>
          </div>

          <div className="flex items-start gap-3 text-gray-600">
            <AiOutlineHome className="text-gray-400 mt-1 flex-shrink-0" />
            <div className="text-sm">
              <p>{kaji.addressLine}</p>
              <p className="text-gray-400 text-xs mt-0.5">
                {kaji.upazila}, {kaji.district}, {kaji.division}
              </p>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mt-2 text-right">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">সক্রিয় কাজী</span>
        </div>
      </div>
    </div>
  );
}
