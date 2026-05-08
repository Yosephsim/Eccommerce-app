import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const VerifyOrder = ({ url }) => {

    const [orderId, setOrderId] = useState('')
    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await axios.post(url + "/api/order/verify-otp", { orderId, otp })
            if (response.data.success) {
                toast.success(response.data.message)
                setOrderId('')
                setOtp('')
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
        setLoading(false)
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
            <form onSubmit={onSubmitHandler} className='bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-200'>
                <h2 className='text-2xl font-bold mb-6 text-gray-800 text-center'>የዴሊቨሪ ማረጋገጫ (Verification)</h2>

                <div className='mb-4'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>የትዕዛዝ ቁጥር (Order ID)</p>
                    <input onChange={(e) => setOrderId(e.target.value)} value={orderId} className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black' type="text" placeholder='ለምሳሌ: 65f23...' required />
                </div>

                <div className='mb-6'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>የመቀበያ ኮድ (OTP)</p>
                    <input onChange={(e) => setOtp(e.target.value)} value={otp} className='w-full px-4 py-2 border rounded-md tracking-[10px] text-center font-bold text-xl focus:outline-none focus:ring-2 focus:ring-black' type="text" placeholder='____' maxLength='4' required />
                </div>

                <button disabled={loading} className='w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition-colors'>
                    {loading ? "በማረጋገጥ ላይ..." : "ትዕዛዙን አረጋግጥ"}
                </button>
            </form>
        </div>
    )
}

export default VerifyOrder