import { validateRequest } from '@/auth';
import ExportReport from './ExportReport';
import Unauthorized from '@/components/Unauthorized';

export default async function Report() {
  const { user } = await validateRequest();
  if (!user || user.role !== 'admin') return <Unauthorized />;

  return (
    <main className='min-h-screen relative flex flex-col justify-center'>
      <div className='z-10 mx-auto flex flex-col gap-8'>
        <ExportReport />
      </div>
      <div
        className='absolute w-full h-full'
        style={{
          backgroundImage: "url('/assets/pattern.png')",
        }}
      ></div>
    </main>
  );
}
