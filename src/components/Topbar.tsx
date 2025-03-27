'use client';

import Image from 'next/image';
import { useSidebar } from '@Context/SidebarContext';

const Topbar = () => {
    const { toggleSidebar, selectedLabel } = useSidebar();
  return (
    <div className={`h-16 bg-white border-b border-[#E6EFF5] flex items-center justify-between px-4 md:px-6`}>    
        <div className="flex items-center">
            <button className="md:hidden mr-4 p-2">
                <Image src="/icons/mobile-menu-icon.svg" width={18} height={18} alt="menu-icon" onClick={toggleSidebar}/>
            </button>
            <h1 className="text-2xl text-[#343C6A] font-extrabold">{selectedLabel}</h1>
        </div>  
        <div className="flex items-center space-x-4">
        {/* Add user profile, notifications, etc. here */}
        <div className="h-10 rounded-full bg-[#F5F7FA] px-4 justify-center items-center gap-4 md:flex hidden">
            <Image src="/icons/magnifying-glass.svg" width={14} height={14} alt="search-icon" />
            <input type="text" placeholder="Search for something..."
                className="w-full h-full bg-transparent outline-none font-normal text-base text-[#8BA3CB]" />
        </div>
        <div className="w-10 h-10 rounded-full bg-[#F5F7FA] justify-center items-center md:flex hidden">
            <Image src="/icons/settings-2.svg" width={18} height={18} alt="user-icon" />
        </div>
        <div className="w-10 h-10 rounded-full bg-[#F5F7FA] justify-center items-center md:flex hidden">
            <Image src="/icons/bell-icon.svg" width={18} height={18} alt="user-icon" />
        </div>
        <div className="w-12 h-12 rounded-full bg-[#F5F7FA] flex justify-center align-middle items-center">
            <Image src="https://avatar.iran.liara.run/public" width={50} height={50} alt="user-icon" />
        </div>
      </div>
    </div>
  )
}

export default Topbar
