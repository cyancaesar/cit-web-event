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
      <div></div>
      <div
        className='absolute w-full h-full'
        style={{
          backgroundImage: "url('/assets/pattern.png')",
        }}
      ></div>
    </div>
  );
}
