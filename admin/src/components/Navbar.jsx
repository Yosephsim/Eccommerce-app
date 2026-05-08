import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({ setToken }) => {

  // ገጹ ሪፍሬሽ ሲሆን ተመልሶ እንዳይገባ ዳታውን ሙሉ በሙሉ የሚያጠፋ ፈንክሽን
  const logout = () => {
    // መጀመሪያ State-ኡን ባዶ እናደርጋለን
    setToken('');

    //በብሮውዘሩ የተቀመጡ መረጃዎችን እናጠፋለን
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');

    //ወደ መጀመሪያው ገጽ እንዲመለስ እናደርጋለን
    window.location.replace('/');
  }

  return (
    <nav className='card flex items-center py-3 px-[5px] justify-between border-b !bg-[rgba(7, 107, 123, 0.3)] sticky top-0 z-50 shadow-md'>
      {/*Brand & Identity Section*/}
      <div
        className='flex items-center gap-3 cursor-pointer group'
        onClick={() => window.location.href = '/'}
      >
        <div className='relative'>
          <img
            className='w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full border-2 border-white shadow-sm group-hover:border-[rgba(0,255,0.1)] transition-all duration-300'
            src={assets.logo}
            alt="Yoseph Store Logo"
          />
          {/* Online Indicator */}
          <span className='absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full shadow-sm'></span>
        </div>

        <div className='flex flex-col leading-tight'>
          <h1 className='text-sm sm:text-lg font-[500] tracking-tight text-gray-900 uppercase'>
            Yoseph <span className='text-[#000] font-light italic'>Store</span>
          </h1>
          <div className='flex items-center gap-2'>
            <span className='text-[9px] font-bold text-white bg-[rgba(88,45,0)] px-1.5 py-0.5 rounded uppercase tracking-widest'>
              Admin Panel
            </span>
            <span className='hidden md:block text-[10px] text-gray-400 font-medium'>v1.0.4</span>
          </div>
        </div>
      </div>

      {/*Actions & Logout Section*/}
      <div className='flex items-center gap-5'>
        {/* Help Link */}
        <div className='hidden md:flex items-center gap-1.5 text-gray-500 hover:text-black cursor-pointer transition-all text-sm font-medium'>
          <span>Help</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        {/* Logout Button */}
        <button
          onClick={() => {
            if (window.confirm("እርግጠኛ ነዎት መውጣት ይፈልጋሉ?")) {
              logout();
            }
          }}
          className='bg-white text-gray-700 border border-gray-300 px-4 py-1.5 sm:px-6 sm:py-2 rounded-lg text-xs sm:text-sm font-bold hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 shadow-sm active:scale-95'
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar;