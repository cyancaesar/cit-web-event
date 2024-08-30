'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Image from 'next/image';

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
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <div
            className='md:min-h-[350px] md:max-h-[350px] md:min-w-[350px] md:max-w-[350px] min-h-[250px] max-h-[250px] min-w-[250px] max-w-[250px] relative group hover:cursor-pointer'
            onClick={() => {
              const newWindow = window.open(
                `https://${bucket}.s3.${region}.amazonaws.com/${objectKey}`,
                '_blank',
                'noopener,noreferrer'
              );
              if (newWindow) newWindow.opener = null;
            }}
          >
            <div className='w-full h-full absolute z-20 bg-black opacity-0 group-hover:opacity-50 rounded-lg  transition-all'></div>
            <div className='w-full h-full absolute'>
              <Image
                fill
                className='object-cover rounded-lg shadow-md'
                src={`https://${bucket}.s3.${region}.amazonaws.com/${objectKey}`}
                alt={title}
              />
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
