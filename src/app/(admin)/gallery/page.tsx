import prisma from '@/lib/db';
import React from 'react';
import ImageViewer from './ImageViewer';
import Image from 'next/image';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { validateRequest } from '@/auth';
import Unauthorized from '@/components/Unauthorized';

export default async function Gallery() {
  const { user } = await validateRequest();
  if (!user || user.role !== 'admin') return <Unauthorized />;

  const images = await prisma.file.findMany({
    include: { Event: { select: { title: true } } },
  });

  console.log(images);

  return (
    <main className='min-h-screen flex relative flex-col gap-4'>
      <div
        className='h-40 relative  border-b-4 border-b-tu-primary flex items-center justify-between px-8'
        style={{
          backgroundImage: "url('/assets/pattern.png')",
        }}
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href='/'>الرئيسية</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className='rtl:rotate-180' />
            <BreadcrumbItem>
              <BreadcrumbPage>معرض الصور</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className='relative w-40 p-4 flex justify-center items-center'>
          <Image
            src='/assets/logo.png'
            alt='TU logo'
            sizes='100vw'
            style={{
              width: '100%',
              height: 'auto',
            }}
            width={500}
            height={300}
          />
        </div>
      </div>
      <div className='flex grow flex-col relative'>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 grid-cols-1 place-content-start place-items-center gap-6 p-8'>
          {images.map((image, key) => (
            <ImageViewer
              key={key}
              objectKey={image.objectKey}
              title={image.Event?.title!}
              bucket={process.env.AWS_S3_BUCKET_NAME!}
              region={process.env.AWS_S3_BUCKET_REGION!}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
