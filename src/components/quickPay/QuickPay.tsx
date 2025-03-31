import { useState } from "react";
import Image from "next/image";
import { ContactType } from "@/src/types";

const QuickPay = ({ selectedContact }: { selectedContact: ContactType | null }) => {
    const [amount, setAmount] = useState('');
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleTransfer = async () => {
        if (!selectedContact) {
          throw new Error('Please select a contact');
          return;
        }
        
        if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
          throw new Error('Please enter a valid amount');
          return;
        }
        
        setIsSubmitting(true);
        
        try {
          const response = await fetch('/api/quick-transfer', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contactId: selectedContact.id,
              amount: parseFloat(amount),
            }),
          });
          
          if (!response.ok) {
            throw new Error(`API returned ${response.status}: ${response.statusText}`);
          }
          
          const result = await response.json();
    
          if (result.success) {
            setSuccess(true);
            setTimeout(() => {
              setSuccess(false);
            }, 3000);
          }
          
          // Reset form
          setAmount('');
          
          // Show success message or toast here if needed
        } catch (error) {
          console.error('Error submitting transfer:', error);
          throw new Error('Failed to process transfer');
        } finally {
          setIsSubmitting(false);
        }
      }
  return (
    <div className="flex flex-col md:flex-row items-center justify-between">
        <div>
            <label htmlFor="amount" className="text-base font-normal text-trans-date block mb-1">Write Amount</label>
        </div>
        <div className="flex justify-center items-center bg-[#EDF1F7] rounded-full w-[265px] h-[40px] lg:h-[50px]">
        <div>
            <input
            type="text"
            id="amount"
            value={amount}
            placeholder="525.50"
            onChange={(e) => setAmount(e.target.value)}
            className="bg-transparent px-4 w-full outline-none text-title text-lg font-medium"
            />
        </div>
        <div className="flex justify-center items-center h-full">
            <button
              onClick={handleTransfer}
              disabled={isSubmitting || !selectedContact || !amount}
              className="h-full bg-soar-dark text-white rounded-full px-8 lg:px-4 py-4 flex items-center disabled:opacity-70 cursor-pointer"
            >
            <span className="mr-2 font-medium hidden md:block">Send</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            </button>
        </div>
        </div>          
            {success && <Image className='animate-pulse' src="/icons/tick-icon.svg" width={18} height={18} alt="tick-icon" />}
    </div>
  )
}

export default QuickPay
