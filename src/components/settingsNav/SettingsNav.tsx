'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { settingsNavLinks } from '@Constants/navLinks';
import React from 'react'

const SettingsNav = () => {
    const pathname = usePathname();
  return (
    <nav>
      <ul className='flex space-x-16 border-b-1 border-[#F4F5F7]'>
            { settingsNavLinks.length > 0 && settingsNavLinks.map(({id, route, label}: SettingsNavType) => {
                const isActive = pathname === route;
                return (
                    <li key={`${id}-${label}`} className='flex flex-col cursor-pointer' >
                        <Link href={route}>
                            <span className={`px-2 ${isActive ? 'text-soar-dark' : 'text-trans-date'} hover:text-soar-dark`}>{label}</span>
                            { isActive && <div className='rounded-t-lg h-1 bg-soar-dark'></div>}
                        </Link>
                    </li>
                )
            }) 
         }
      </ul>
    </nav>
  )
}

export default SettingsNav
