'use client';
import Link from 'next/link';
import Image from 'next/image';
import DefaultLoader from '@Components/defaultLoader/DefaultLoader';
import { useSidebar } from '@Context/SidebarContext';
import ProfileImage from '@Components/profileImage/ProfileImage';

const Topbar = () => {
    const { toggleSidebar, selectedLabel } = useSidebar();
    
  return (
    <header className={`h-[100px] bg-white border-b border-[#E6EFF5] flex items-center justify-between px-4 md:px-6`}>    
        <div className="flex items-center">
            <button 
                className="md:hidden mr-4 p-2 cursor-pointer"
                onClick={toggleSidebar}
                aria-label="Toggle sidebar menu"
                type="button"
            >
                <Image
                    src="/icons/mobile-menu-icon.svg"
                    width={18} height={18}
                    alt="Menu"
                />
            </button>
            { selectedLabel
                ? <h1 className="text-2xl text-title font-extrabold">{selectedLabel}</h1>
                : <DefaultLoader aria-label="Loading page title" />
            }

        </div>  
        <div className="flex items-center space-x-4" role="navigation" aria-label="User actions">
            <div className="h-10 rounded-full bg-soar-light-gray px-4 justify-center items-center gap-4 md:flex hidden" role="search">
                <Image src="/icons/magnifying-glass.svg" width={14} height={14} alt="Search" />
                <label htmlFor="search-input" className="sr-only">Search</label>
                <input 
                    id="search-input"
                    type="text" 
                    placeholder="Search for something..."
                    className="w-full h-full bg-transparent outline-none font-normal text-base text-[#8BA3CB]" 
                    aria-label="Search for something"
                />
            </div>
            <Link 
                href="/settings"
                aria-label="Settings"
                className="md:flex hidden"
            >
                <div className="w-10 h-10 rounded-full bg-soar-light-gray justify-center items-center cursor-pointer md:flex hidden">
                    <Image src="/icons/settings-2.svg" width={18} height={18} alt="Settings" />
                </div>
            </Link>
            <button 
                type="button"
                aria-label="Notifications"
                className="md:flex hidden"
            >
                <div className="w-10 h-10 rounded-full bg-soar-light-gray justify-center items-center cursor-pointer md:flex hidden">
                    <Image src="/icons/bell-icon.svg" width={18} height={18} alt="Notifications" />
                </div>
            </button>
            <button
                type="button"
                aria-label="User profile"
                className="w-12 h-12 rounded-full bg-soar-light-gray flex justify-center align-middle items-center cursor-pointer"
            >
                <ProfileImage size={50} />
            </button>
        </div>
    </header>
  )
}

export default Topbar
