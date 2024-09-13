'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { saveAs } from 'file-saver';
import { useState } from 'react';

type Props = {
  years: number[];
};

export default function ExportReport({ years }: Props) {
  const [year, setYear] = useState<string>();

  const handleClick = async () => {
    if (year == undefined) return;
    const response = await fetch(
      '/api/report/all?' +
        new URLSearchParams({
          year: year,
        }).toString()
    );
    if (!response.ok) {
      alert('Error.');
      return;
    }

    const contentDisposition = response.headers.get('content-disposition');
    if (!contentDisposition) {
      alert('Error.');
      return;
    }
    const filename = contentDisposition
      .split(';')
      .find((n) => n.includes('filename='))
      ?.replace('filename=', '')
      .replaceAll('"', '')
      .trim();

    console.log(filename);
    const blob = await response.blob();
    saveAs(blob, filename);
  };

  return (
    <Card className='min-w-[350px] lg:min-w-[450px] border-t-4 border-t-tu-primary'>
      <CardHeader className='py-8 pb-4'>
        <CardTitle className='font-medium'>
          إصدار تقرير الفعاليات السنوية
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-6 py-6'>
        <div className='flex flex-col gap-4'>
          <Label>فعاليات السنة</Label>
          <Select onValueChange={(value) => setYear(value)} dir='rtl'>
            <SelectTrigger>
              <SelectValue placeholder='السنة' />
            </SelectTrigger>
            <SelectContent>
              {years.map((year, key) => (
                <SelectItem key={key} value={`${year}`}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleClick}>إصدار</Button>
      </CardContent>
    </Card>
  );
}
