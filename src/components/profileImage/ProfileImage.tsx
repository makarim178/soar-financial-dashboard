'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useUser } from '@Context/UserContext';

const ProfileImage = ({ size = 50 }: { size: number }) => {
    const { userImageNumber, setUserImageNumber } = useUser();
    useEffect(() => {
      setUserImageNumber(Math.floor(Math.random() * 10) + 1);
    }, [userImageNumber])
    
  return (
    <>
        <Image src={`https://avatar.iran.liara.run/public/${userImageNumber ?? 1}`} width={size} height={size} alt="user-icon" />
    </>
)}

export default ProfileImage
