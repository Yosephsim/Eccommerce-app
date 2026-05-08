import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';

const Success = () => {
    const { navigate, setCartItems } = useContext(ShopContext);

    useEffect(() => {
        setCartItems({}); // ካርቱን ያጸዳዋል
        window.scrollTo(0, 0); // ገጹ ሲከፈት ከላይ እንዲጀምር
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 text-center">
            {/* Success Icon */}
            <div className="mb-8 relative">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-200 relative z-10">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <div className="w-24 h-24 bg-green-400 rounded-full absolute top-0 left-0 animate-ping opacity-20"></div>
            </div>

            <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tighter uppercase">
                Payment Received!
            </h1>

            <p className="text-slate-500 max-w-sm mb-10 font-medium leading-relaxed">
                እናመሰግናለን! ክፍያዎ ተፈጽሟል። ትዕዛዝዎን አዘጋጅተን በቅርቡ እናደርሳለን።
            </p>

            {/* Next Steps Card */}
            <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 w-full max-w-md mb-10 text-left flex items-center gap-5">
                <div className="bg-white p-4 rounded-2xl shadow-sm text-2xl">📦</div>
                <div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Next Step</p>
                    <p className="font-bold text-slate-900 leading-none">Order is being processed</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <button
                    onClick={() => navigate('/orders')}
                    className="flex-1 bg-black text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl hover:bg-slate-800 transition-all active:scale-95"
                >
                    Track Orders
                </button>
                <button
                    onClick={() => navigate('/')}
                    className="flex-1 bg-white border-2 border-slate-100 text-slate-900 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-slate-50 transition-all active:scale-95"
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
};

export default Success;