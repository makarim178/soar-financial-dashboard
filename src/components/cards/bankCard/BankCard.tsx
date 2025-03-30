
import { useMemo } from 'react';
import Image from 'next/image';
import { CardDataType } from '@/src/types';

const BankCard = ({ card }: { card: CardDataType }) => {
  const textColor = useMemo(() => card.isDark ? 'text-white' : 'text-[#343C6A]', [card.isDark])
  const cardTypeSvg = useMemo(() => {
    if (card.cardType === 'visa') return 'visa-icon';
    if (card.cardType === 'mastercard') return card.isDark ? 'master-card-icon' : 'master-card-icon-dark';
  }, [card.cardType, card.isDark])

  return (
    <div 
      className={`rounded-3xl flex flex-col flex-shrink-0 justify-around snap-center border md:w-[350px] md:h-[235px] w-[265px] h-[170px] ${
        card.isDark 
          ? 'bg-gradient-to-r from-[#5B5A6F] to-[#000000]' 
          : 'bg-white border-1 border-soar-border-gray text-[#343C6A]'
      }`}
    >
      <div className={`flex flex-col justify-between p-5`}>
        <div className="flex justify-between items-start mb-[24px] md:mb-6">
          <div className='flex flex-col'>
            <span className={`text-xs font-[Lato] font-normal leading-none ${textColor}`}>Balance</span>
            <span className={`text-base font-[Lato] font-semibold leading-none ${textColor}`}>{card.balance}</span>
          </div> 
          <Image
            src={`/icons/chip-card${ card.isDark ? '' : '-dark'}.svg`}
            className='md:w-[35px] md:h[35px]'
            width={29}
            height={29}
            alt="Credit Card" 
          />
        </div>
                
        <div className="flex space-x-12 md:space-x-16 items-start">
          <div>
            <p className={`text-[10px] md:text-xs font-[Lato] font-normal leading-none ${textColor}`}>CARD HOLDER</p>
            <p className="text-xs md:text-base font-semibold leading-none pt-1">{card.cardHolder}</p>
          </div>
          <div>
            <p className={`text-[10px] md:text-xs leading-none ${textColor}`}>VALID THRU</p>
            <p className="text-xs md:text-base font-semibold leading-none pt-1">{card.validThru}</p>
          </div>
        </div>
      </div>
              
      <div className={`flex justify-between items-center h-[50px] md:h-[70px] rounded-b-3xl p-5 ${
        card.isDark
        ? 'bg-gradient-to-b from-[rgba(255,255,255,0.15)] to-[rgba(255, 255, 255, 0)]'
        : 'border-t-[1px] border-soar-border-gray'
        }`}>
        <p className="text-base md:text-xl tracking-wider">{card.cardNumber}</p>
        <div className="flex justify-between items-center relative">
          <Image 
            src={`/icons/${cardTypeSvg}.svg`}
            alt="Mastercard"
            width={32}
            height={32}
          />
        </div>
      </div>
    </div>
  )
}

export default BankCard
