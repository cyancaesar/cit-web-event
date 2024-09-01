'use client';

import { Skeleton } from '@/components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {
  objectKey: string;
  title: string;
  bucket: string;
  region: string;
};
export default function ImageViewer({
  objectKey,
  title,
  bucket,
  region,
}: Props) {
  const [blobUrl, setBlobUrl] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      const result = await fetch(
        `https://s3.${region}.amazonaws.com/${bucket}/${objectKey}`
      );
      if (result.ok) {
        const blob = await result.blob();
        const url = URL.createObjectURL(blob);
        setBlobUrl(url);
      } else setError(true);
    };
    fetchImage();
  }, [region, bucket, objectKey]);

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <div
            className='md:min-h-[350px] md:max-h-[350px] md:min-w-[350px] md:max-w-[350px] min-h-[250px] max-h-[250px] min-w-[250px] max-w-[250px] relative group hover:cursor-pointer'
            onClick={() => {
              const newWindow = window.open(
                `https://s3.${region}.amazonaws.com/${bucket}/${objectKey}`,
                '_blank',
                'noopener,noreferrer'
              );
              if (newWindow) newWindow.opener = null;
            }}
          >
            <div className='w-full h-full absolute z-20 bg-black opacity-0 group-hover:opacity-50 rounded-lg  transition-all'></div>
            <div className='w-full h-full absolute'>
              {!!blobUrl ? (
                <Image
                  fill
                  className='object-cover rounded-lg shadow-md'
                  src={blobUrl}
                  alt={title}
                />
              ) : error ? (
                <div className='w-full h-full flex items-center justify-center bg-neutral-50 rounded-lg'>
                  <div className='text-xl'>الصورة غير متوفرة</div>
                </div>
              ) : (
                <Skeleton className='w-full h-full flex items-center justify-center'>
                  <div className='text-xl'>تحميل الصورة</div>
                </Skeleton>
              )}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className='text-xl'>{title || 'لا يوجد عنوان'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
