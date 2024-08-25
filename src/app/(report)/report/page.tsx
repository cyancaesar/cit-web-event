'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

export default function Report() {
  return (
    <div className='min-h-screen grid place-content-center'>
      <Button asChild>
        <Link href='/api/report/all'>إصدار جميع التقارير</Link>
      </Button>
    </div>
  );
}
