import { getActiveKajis } from "@/actions/kajiActions";
import KajiCard from "@/components/KajiCard";

export default async function KajisListPage() {
    const response = await getActiveKajis();
    const kajis = response.success ? response.data : [];

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-screen-xl mx-auto px-4">
                {/* Page Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                        নিবন্ধিত কাজীদের তালিকা
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        আমাদের প্ল্যাটফর্মে নিবন্ধিত অনুমোদিত কাজীদের তথ্যের তালিকা। 
                        আপনি আপনার নিকটস্থ এলাকার কাজী খুঁজে পেতে পারেন।
                    </p>
                </div>

                {/* Kajis Grid */}
                {kajis.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {kajis.map((kaji) => (
                            <KajiCard key={kaji.id} kaji={kaji} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                        <div className="text-5xl mb-4">🤔</div>
                        <h3 className="text-xl font-bold text-gray-800">কোনো কাজী পাওয়া যায়নি</h3>
                        <p className="text-gray-500 mt-2">বর্তমানে কোনো সক্রিয় কাজী নেই বা কোনো তথ্য আপডেট করা হয়নি।</p>
                    </div>
                )}
            </div>
        </div>
    );
}
