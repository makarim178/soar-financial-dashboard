'use client';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { navLinks } from '@Constants/navLinks';
import { useEffect } from 'react';
import DefaultLoader from '@Components/defaultLoader/DefaultLoader';
import { useSidebar } from '@Context/SidebarContext';
import { IconProps } from '../types';
import { SiWebmoney } from 'react-icons/si';

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, setIsOpen, setSelectedLabel } = useSidebar();

  // Update selected label based on current path
  useEffect(() => {
    const currentNav = navLinks.find(item => item.route === pathname);
    if (currentNav) {
      setSelectedLabel(currentNav.title);
    }
  }, [pathname, setSelectedLabel]);

  return (
    <>
      <aside 
        className={`bg-white border-[#E6EFF5] border-r-1 text-title w-[250px] fixed inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
        aria-label="Main navigation"
        aria-hidden={!isOpen ? "true" : "false"}
      >
        <div className="h-[100px] flex items-center p-6">
          <SiWebmoney fill="dark" width={60} height={60} aria-hidden="true" />
          <h1 className="text-2xl text-title font-extrabold pl-[10px]">Fin Task</h1>
        </div>
        <nav className="mt-6" aria-label="Main menu">
          <ul role="menu">
            {navLinks.map((item, index) => {
              const DynamicComponent = dynamic<IconProps>(() => import(`@Components/svgIcons/${item.component}`), {
                  ssr: false,
                  loading: () => <DefaultLoader />
                });
              const isActive = pathname === item.route;
              return (
                <li key={item.label + index}
                  className="flex"
                  role="none"
                >
                  <div 
                    className={`w-[6px] rounded-r-lg ${pathname == item.route ? 'bg-soar-dark' : 'bg-transparent'}`}
                    aria-hidden="true"
                  ></div>
                  <Link 
                    href={item.route}
                    className={`flex items-center px-6 py-3 font-lg ${
                      pathname === item.route ? 'text[#232323]' : 'text-[#B1B1B1]'
                    } hover:text-[#232323]`}
                    onClick={() => setIsOpen(false)}
                    role="menuitem"
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="h-5 w-5 mr-[26px]" aria-hidden="true">
                      <DynamicComponent fill={pathname === item.route ? 'dark' : 'light'} />
                    </span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
      
      {/* Overlay to close sidebar on mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
          aria-label="Close sidebar"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsOpen(false);
            }
          }}
        />
      )}
    </>
  );
}
