import { AiOutlinePhone, AiOutlineIdcard, AiOutlineHome, AiOutlineGlobal } from "react-icons/ai";

export default function KajiCard({ kaji }) {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group">
            <div className="flex flex-col gap-4">
                {/* Header Profile Info */}
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {kaji.fullName}
                        </h3>
                        <p className="text-blue-600 font-medium text-sm mt-1">
                            {kaji.organizationName}
                        </p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-2xl">
                        <AiOutlineIdcard className="text-blue-600 text-2xl" />
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
                                {kaji.union}, {kaji.upazila}, {kaji.district}, {kaji.division}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Status Badge */}
                <div className="mt-2 text-right">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                        সক্রিয় কাজী
                    </span>
                </div>
            </div>
        </div>
    );
}
