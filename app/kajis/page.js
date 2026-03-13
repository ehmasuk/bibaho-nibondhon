import { getActiveKajis } from "@/actions/kajiActions";
import KajiDirectoryClient from "@/components/KajiDirectoryClient";

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

                {/* Searchable Directory Client */}
                <KajiDirectoryClient initialKajis={kajis} />
            </div>
        </div>
    );
}
