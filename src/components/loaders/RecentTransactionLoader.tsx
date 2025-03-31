const RecentTransactionLoader = () => {
  return (
    <div className="flex flex-col animate-pulse p-4 gap-4">
        <div className="flex h-[40px] gap-2">
            <div className='w-[40px] bg-trans-card rounded-full'></div>
            <div className='w-[200px] bg-trans-card rounded-full'></div>
            <div className='w-[100px] ml-4 bg-trans-card rounded-full'></div>
        </div>
        <div className="flex h-[40px] space-x-2">
            <div className='w-[40px] bg-trans-paypal rounded-full'></div>
            <div className='w-[200px] bg-trans-paypal rounded-full'></div>
            <div className='w-[100px] ml-4 bg-trans-paypal rounded-full'></div>
        </div>
        <div className="flex h-[40px] space-x-2">
            <div className='w-[40px] bg-trans-money rounded-full'></div>
            <div className='w-[200px] bg-trans-money rounded-full'></div>
            <div className='w-[100px] ml-4 bg-trans-money rounded-full'></div>
        </div>
    </div>
  )
}

export default RecentTransactionLoader
