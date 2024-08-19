'use client';
import React, { useRef, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Trash } from 'lucide-react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { DatePickerWithRange } from './DatePickerWithRange';

export default function backup() {
  return (
    <>
      <div className='grid grid-cols-2 items-center'>
        <Label>عنوان الفعالية/البرنامج/الورشة التدريبية</Label>
        <Input placeholder='ادخل العنوان' />
      </div>
      <div className='grid grid-cols-2 items-center'>
        <Label>الجهة المنفذة</Label>
        <Input placeholder='الجهة المنفذة' />
      </div>
      <div className='grid grid-cols-2 items-center'>
        <Label>اسم القسم الأكاديمي بالكلية</Label>
        <Input placeholder='القسم الأكاديمي' />
      </div>
      <div className='grid grid-cols-2 items-center'>
        <Label>اليوم / التاريخ</Label>
        <Input placeholder='اليوم' />
        <DatePickerWithRange />
      </div>
      <div className='grid grid-cols-2 items-center'>
        <Label>المكان</Label>
        <Input placeholder='المكان' />
      </div>
      <div className='grid grid-cols-2 items-center'>
        <Label>التوقيت</Label>
        <Input placeholder='التوقيت' />
      </div>
      <div className='grid grid-cols-2 items-center'>
        <Label>الفئة المستهدفة</Label>
        <Input placeholder='الفئة المستهدفة' />
      </div>
      <div className='grid grid-cols-2 items-center'>
        <Label>آلية التسجيل</Label>
        <Input placeholder='آلية التسجيل' />
      </div>

      <div className='grid grid-cols-2 items-center'>
        <Label>آلية الإعلان</Label>
        <Input placeholder='آلية الإعلان' />
      </div>
      <div className='grid grid-cols-2 items-center'>
        <Label>المدربين / الضيوف</Label>
        <Input placeholder='المدربين / الضيوف' />
      </div>
      <div className='grid grid-cols-2 items-center'>
        <Label>عدد الحضور / المستفيدين</Label>
        <Input placeholder='المستفيدين' />
      </div>
      <div className='grid grid-cols-2 items-center'>
        <Label>نوع الفعالية</Label>
        <Input placeholder='المستفيدين' />
      </div>
      <div className='grid grid-cols-2 items-center'>
        <Label>فئة الفعالية</Label>
        <Input placeholder='المستفيدين' />
      </div>
      <div className='grid grid-cols-2 items-start pt-8'>
        <Label>أهداف الفعالية/البرنامج</Label>
        <Textarea placeholder='أدخل أهداف الفعالية/البرنامج' />
      </div>
      <div className='grid grid-cols-2 items-start'>
        <Label>التخطيط والإعداد للفعالية/البرنامج</Label>
        <Textarea placeholder='كيف تم التخطيط؟' />
      </div>
      <div className='grid grid-cols-2 items-start'>
        <Label>الجدول الزمني والتنفيذ للفعالية</Label>
        <Textarea placeholder='مقسمة على فترات زمنية محددة: 7PM - 9PM' />
      </div>
      <div className='grid grid-cols-2 items-start'>
        <Label>تقييم الفعالية (نتائج استطلاع الرأي،آراء وانطباعات)</Label>
        <Textarea placeholder='أبرز الإيجابيات ومقترحات...' />
      </div>
      <div className='grid grid-cols-2 items-start'>
        <Label>أوليات التحسين</Label>
        <Textarea placeholder='أبرز الإيجابيات ومقترحات...' />
      </div>
      <div className='grid grid-cols-2 items-start'>
        <Label>فريق العمل</Label>
        <Select dir='rtl'>
          <SelectTrigger>
            <SelectValue placeholder='إختر فريق العمل' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>
                الأندية الطلابية بكلية الحاسبات وتقنية المعلومات
              </SelectLabel>
              <SelectItem value='club-google'>
                نادي قوقل للطلبة المطورين
              </SelectItem>
              <SelectItem value='club-ai-programming'>
                نادي البرمجة والذكاء الاصطناعي
              </SelectItem>
              <SelectItem value='club-ieee'>نادي IEEE</SelectItem>
              <SelectItem value='club-cybersecurity'>
                نادي الأمن السيبراني
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <>
        <div className='flex flex-col gap-4'>
          <Label>خطة وكالة الشؤون الأكديمية</Label>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center space-x-2 space-x-reverse'>
              <Checkbox id='1-1' />
              <label
                htmlFor='1-1'
                className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                نواتج ومخرجات التعلم
              </label>
            </div>
            <div className='flex items-center space-x-2 space-x-reverse'>
              <Checkbox id='1-2' />
              <label
                htmlFor='1-2'
                className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                جودة الحياة الأكاديمية
              </label>
            </div>
            <div className='flex items-center space-x-2 space-x-reverse'>
              <Checkbox id='1-3' />
              <label
                htmlFor='1-3'
                className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                الكفاءة الأكاديمية
              </label>
            </div>
            <div className='flex items-center space-x-2 space-x-reverse'>
              <Checkbox id='1-4' />
              <label
                htmlFor='1-4'
                className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                الكفاءة الإدارية
              </label>
            </div>
            <div className='flex items-center space-x-2 space-x-reverse'>
              <Checkbox id='1-5' />
              <label
                htmlFor='1-5'
                className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                الإتصال والتواصل
              </label>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <Label>خطة الجامعة الإستراتيجية</Label>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center space-x-2 space-x-reverse'>
              <Checkbox id='2-1' />
              <label
                htmlFor='2-1'
                className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                تعزيز نجاح الطالب بعد تخرجه من الجامعة
              </label>
            </div>
            <div className='flex items-center space-x-2 space-x-reverse'>
              <Checkbox id='2-2' />
              <label
                htmlFor='2-2'
                className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                تعزيز مشاركة الجامعة في الأعمال التطوعية والخدمة المجتمعية
              </label>
            </div>
            <div className='flex items-center space-x-2 space-x-reverse'>
              <Checkbox id='2-3' />
              <label
                htmlFor='2-3'
                className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                رفع كفاءة الإرشاد والتأهيل المهني
              </label>
            </div>
            <div className='flex items-center space-x-2 space-x-reverse'>
              <Checkbox id='2-4' />
              <label
                htmlFor='2-4'
                className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                تعزيز ثقافة الإبتكار وريادة الأعمال لدى الطلاب
              </label>
            </div>
            <div className='flex items-center space-x-2 space-x-reverse'>
              <Checkbox id='2-5' />
              <label
                htmlFor='2-5'
                className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                أتمتة العمليات وتحويلها من ورقية إلى إلكترونية
              </label>
            </div>
            <div className='flex items-center space-x-2 space-x-reverse'>
              <Checkbox id='2-6' />
              <label
                htmlFor='2-6'
                className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                تحسين أداء الموظفين
              </label>
            </div>
            <div className='flex items-center space-x-2 space-x-reverse'>
              <Checkbox id='2-7' />
              <label
                htmlFor='2-7'
                className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                تحسين نمط الحياة داخل الجامعة (الرياضة، الترفيه)
              </label>
            </div>
            <div className='flex items-center space-x-2 space-x-reverse'>
              <Checkbox id='2-8' />
              <label
                htmlFor='2-8'
                className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                تحسين نمط الحياة داخل صناعة بيئة تعليمية محفزة للإبداع والإبتكار
                (الهوايات، الأنشطة، الأندية الطلابية...)
              </label>
            </div>
            <div className='flex items-center space-x-2 space-x-reverse'>
              <Checkbox id='2-9' />
              <label
                htmlFor='2-9'
                className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                تعزيز القيم الإسلامية والهوية الوطنية
              </label>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <Label>سمات خريجي بجامعة الطائف TUGA</Label>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center space-x-2 space-x-reverse'>
              <Checkbox id='3-1' />
              <label
                htmlFor='3-1'
                className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                الإبداع والإبتكار
              </label>
            </div>
            <div className='flex items-center space-x-2 space-x-reverse'>
              <Checkbox id='3-2' />
              <label
                htmlFor='3-2'
                className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                التفكير النقدي وحل المشكلات
              </label>
            </div>
            <div className='flex items-center space-x-2 space-x-reverse'>
              <Checkbox id='3-3' />
              <label
                htmlFor='3-3'
                className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                التواصل والتعاون
              </label>
            </div>
            <div className='flex items-center space-x-2 space-x-reverse'>
              <Checkbox id='3-4' />
              <label
                htmlFor='3-4'
                className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                الكفاءة المعلوماتية
              </label>
            </div>
            <div className='flex items-center space-x-2 space-x-reverse'>
              <Checkbox id='3-5' />
              <label
                htmlFor='3-5'
                className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                كفاءة وسائل الإعلام
              </label>
            </div>
            <div className='flex items-center space-x-2 space-x-reverse'>
              <Checkbox id='3-6' />
              <label
                htmlFor='3-6'
                className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                كفاءة المعلومات والتواصل والتكنولوجيا
              </label>
            </div>
            <div className='flex items-center space-x-2 space-x-reverse'>
              <Checkbox id='3-7' />
              <label
                htmlFor='3-7'
                className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                المرونة والتكيف
              </label>
            </div>
            <div className='flex items-center space-x-2 space-x-reverse'>
              <Checkbox id='3-8' />
              <label
                htmlFor='3-8'
                className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                المبادرة والتوجيه الذاتي
              </label>
            </div>
            <div className='flex items-center space-x-2 space-x-reverse'>
              <Checkbox id='3-9' />
              <label
                htmlFor='3-9'
                className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                المهارات الإجتماعية ومهارات التعامل عبر الثقافات
              </label>
            </div>
            <div className='flex items-center space-x-2 space-x-reverse'>
              <Checkbox id='3-10' />
              <label
                htmlFor='3-10'
                className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                الإنتاجية والمحاسبة
              </label>
            </div>
            <div className='flex items-center space-x-2 space-x-reverse'>
              <Checkbox id='3-11' />
              <label
                htmlFor='3-11'
                className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                القيادة والمسؤولية
              </label>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
