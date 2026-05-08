import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const AddStaff = ({ token }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // admin/src/pages/AddStaff.jsx ውስጥ ያለውን onSubmitHandler አስተካክል

            const response = await axios.post(
                backendUrl + '/api/staff/add', // ⬅️ እዚህ ጋር /api/user የነበረውን ወደ /api/staff ቀይረው
                { name, email, password, role: "Delivery" },
                { headers: { token } }
            );

            if (response.data.success) {
                toast.success("አዲስ የዴሊቨሪ ሰራተኛ በተሳካ ሁኔታ ተመዝግቧል!");
                setName(""); setEmail(""); setPassword("");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "ስህተት ተከስቷል");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='w-full'>
            <form onSubmit={onSubmitHandler} className='flex flex-col items-start gap-3 w-full max-w-[500px] text-gray-600'>
                <h2 className='text-2xl font-semibold mb-4 text-black'>አዲስ ሰራተኛ መመዝገቢያ</h2>
                <div className='w-full'>
                    <p className='mb-2'>የሰራተኛው ስም</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} className='w-full px-3 py-2 border border-gray-300 rounded outline-none' type="text" placeholder="ሙሉ ስም ያስገቡ" required />
                </div>
                <div className='w-full'>
                    <p className='mb-2'>ኢሜይል (Email)</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} className='w-full px-3 py-2 border border-gray-300 rounded outline-none' type="email" placeholder="staff@yosephstore.com" required />
                </div>
                <div className='w-full'>
                    <p className='mb-2'>የይለፍ ቃል (Password)</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} className='w-full px-3 py-2 border border-gray-300 rounded outline-none' type="password" placeholder="ቢያንስ 8 ሆሄያት" required />
                </div>
                <button disabled={loading} type="submit" className='w-full py-3 mt-4 bg-black text-white rounded font-medium hover:bg-gray-800 transition disabled:bg-gray-400'>
                    {loading ? "በመመዝገብ ላይ..." : "ሰራተኛውን መዝግብ"}
                </button>
            </form>
        </div>
    )
}

export default AddStaff;