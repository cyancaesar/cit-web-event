import { auth } from '@/auth';
import ExportReport from './ExportReport';
import Unauthorized from '@/components/Unauthorized';

export default async function Report() {
  const session = await auth();
  if (!session?.user) return <Unauthorized />;
  if (session.user.name != 'admin') return <Unauthorized />;

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
