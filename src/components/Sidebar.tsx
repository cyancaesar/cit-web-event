import Image from 'next/image';

export default function Sidebar() {
  return (
    <div className='hidden lg:flex relative flex-col justify-between items-center'>
      <div></div>
      <div className='z-20 flex flex-col text-3xl items-center text-tu-primary'>
        <Image
          className='py-4'
          src='/assets/logo.png'
          width={170}
          height={170}
          alt='TU logo'
        />
        <div className='text-center space-y-1.5 py-4'>
          <div className='font-medium'>جامعة الطائف</div>
          <div className='font-medium'>كلية الحاسبات وتقنية المعلومات</div>
          <div className='font-medium'>وحدة الأنشطة الطلابية</div>
        </div>
      </div>
      <div className='z-20'>
        {process.env.NEXT_PUBLIC_POWERED_BY && (
          <div className='py-2 text-lg font-bold bg-gradient-to-b to-neutral-300 via-primary from-primary bg-clip-text text-transparent'>
            POWERED BY {process.env.NEXT_PUBLIC_POWERED_BY}
          </div>
        )}
      </div>
      <div
        className='absolute w-full h-full'
        style={{
          backgroundImage: "url('/assets/pattern.png')",
        }}
      ></div>
    </div>
  );
}
