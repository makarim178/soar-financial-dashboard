const QuickTransferLoader = () => {
  return (
    <div className="flex flex-col animate-pulse p-4 justify-between gap-8">
        <div className="flex h-[100px] justify-between">
            <div className='w-[100px] bg-trans-card rounded-full'></div>
            <div className='w-[100px] bg-trans-money rounded-full'></div>
            <div className='w-[100px] bg-trans-paypal rounded-full'></div>
        </div>
        <div className="flex h-[50px] justify-between mt-4">
            <div className='w-[75px] bg-main rounded-full'></div>
            <div className='w-[200px] bg-trans-pos rounded-full'></div>
        </div>
    </div>
  )
}

export default QuickTransferLoader
