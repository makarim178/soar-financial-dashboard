import Image from 'next/image';
import { useMemo } from 'react';

const Contact = ({ contact, selectedContactId, setSelectedContact } : ContactPropsType ) => {
    const { id, name, position, avatar } = contact;
    const isSelected = useMemo(() => selectedContactId === id, [selectedContactId, id]);
  return (
    <div 
        className={`flex flex-col items-center cursor-pointer ${
          isSelected ? 'opacity-100' : 'opacity-70'
        }`}
        onClick={() => setSelectedContact(contact)}
    >
        <div className={`w-18 h-18 rounded-full overflow-hidden mb-3 ${
        isSelected ? 'ring-2 ring-blue-500' : ''
        }`}>
        <Image 
            src={avatar} 
            alt={name} 
            width={70} 
            height={70} 
            className="object-cover w-full h-full"
        />
        </div>
        <h4 className={`text-soar-dark text-base text-nowrap ${isSelected ? 'font-bold' : 'font-normal'}`}>{name}</h4>
        <p className="text-trans-date text-base ${isSelected ? 'font-bold' : 'font-normal'}">{position}</p>
    </div>
  )
}

export default Contact
