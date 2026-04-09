"use client";

import { Select, Empty, Spin } from "antd";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import KajiCard from "@/components/KajiCard";

const { Option } = Select;
const BD_API_BASE = "https://bdapis.com/api/v1.2";

export default function KajiDirectoryClient({ initialKajis }) {
    // Location state
    const [divisions, setDivisions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [upazillas, setUpazillas] = useState([]);
    const [fetchingDivisions, setFetchingDivisions] = useState(false);
    const [fetchingDistricts, setFetchingDistricts] = useState(false);
    const [fetchingUpazillas, setFetchingUpazillas] = useState(false);
    
    const [selectedDivision, setSelectedDivision] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedUpazila, setSelectedUpazila] = useState(null);

    useEffect(() => {
        const fetchDivisions = async () => {
            setFetchingDivisions(true);
            try {
                const res = await axios.get(`${BD_API_BASE}/divisions`);
                setDivisions(res.data.data);
            } catch (err) {
                console.error("Error fetching divisions:", err);
            } finally {
                setFetchingDivisions(false);
            }
        };
        fetchDivisions();
    }, []);

    const handleDivisionChange = async (value) => {
        setSelectedDivision(value);
        setSelectedDistrict(null);
        setSelectedUpazila(null);
        setDistricts([]);
        setUpazillas([]);

        if (!value) return;

        setFetchingDistricts(true);
        try {
            const res = await axios.get(`${BD_API_BASE}/division/${value.toLowerCase()}`);
            setDistricts(res.data.data);
        } catch (err) {
            console.error("Error fetching districts:", err);
        } finally {
            setFetchingDistricts(false);
        }
    };

    const handleDistrictChange = async (value) => {
        setSelectedDistrict(value);
        setSelectedUpazila(null);
        setUpazillas([]);

        if (!value) return;

        setFetchingUpazillas(true);
        try {
            const res = await axios.get(`${BD_API_BASE}/district/${value.toLowerCase()}`);
            const fetchedUpazillas = res.data.data[0]?.upazillas || [];
            setUpazillas(fetchedUpazillas);
        } catch (err) {
            console.error("Error fetching upazillas:", err);
        } finally {
            setFetchingUpazillas(false);
        }
    };

    const filteredKajis = useMemo(() => {
        // Initially show all if no filters selected
        if (!selectedDivision && !selectedDistrict && !selectedUpazila) {
            return initialKajis;
        }
        
        return initialKajis.filter(kaji => {
            let match = true;
            if (selectedDivision && kaji.division !== selectedDivision) match = false;
            if (selectedDistrict && kaji.district !== selectedDistrict) match = false;
            if (selectedUpazila && kaji.upazila !== selectedUpazila) match = false;
            return match;
        });
    }, [initialKajis, selectedDivision, selectedDistrict, selectedUpazila]);

    return (
        <div>
            {/* Search Filters */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">ঠিকানা অনুযায়ী কাজীদের খুঁজুন</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select 
                        placeholder="বিভাগ" 
                        size="large" 
                        className="w-full h-12"
                        value={selectedDivision}
                        onChange={handleDivisionChange}
                        loading={fetchingDivisions}
                        allowClear
                    >
                        {divisions.map((div) => (
                            <Option key={div.division} value={div.division}>
                                {div.divisionbn}
                            </Option>
                        ))}
                    </Select>

                    <Select 
                        placeholder="জেলা" 
                        size="large" 
                        className="w-full h-12"
                        value={selectedDistrict}
                        onChange={handleDistrictChange}
                        loading={fetchingDistricts}
                        disabled={!districts.length && !selectedDivision}
                        allowClear
                    >
                        {districts.map((dist) => (
                            <Option key={dist.district} value={dist.district}>
                                {dist.districtbn}
                            </Option>
                        ))}
                    </Select>

                    <Select 
                        placeholder="উপজেলা" 
                        size="large" 
                        className="w-full h-12"
                        value={selectedUpazila}
                        onChange={(val) => setSelectedUpazila(val)}
                        loading={fetchingUpazillas}
                        disabled={!upazillas.length && !selectedDistrict}
                        allowClear
                    >
                        {upazillas.map((up) => (
                            <Option key={up} value={up}>
                                {up}
                            </Option>
                        ))}
                    </Select>
                </div>
            </div>

            {/* Kajis Grid */}
            {filteredKajis.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {filteredKajis.map((kaji) => (
                        <KajiCard key={kaji.id} kaji={kaji} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 md:py-20 bg-white rounded-3xl shadow-sm border border-gray-100 px-4">
                    <div className="text-4xl md:text-5xl mb-4">🤔</div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800">কোনো কাজী পাওয়া যায়নি</h3>
                    <p className="text-gray-500 text-sm mt-2">আপনার নির্বাচিত এলাকায় কোনো সক্রিয় কাজী নেই।</p>
                </div>
            )}
        </div>
    );
}
