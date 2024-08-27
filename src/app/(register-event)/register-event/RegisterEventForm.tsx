'use client';
import React, { useEffect, useRef, useState } from 'react';
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
import {
  CalendarIcon,
  CircleCheckBig,
  LoaderCircle,
  Trash,
  UploadIcon,
  XCircle,
} from 'lucide-react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import EventSchema from '@/lib/schema/EventSchema';
import { registerEvent } from '@/action/event';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import Link from 'next/link';
import { generateDocument } from '@/utils/generateDocument';
import { uploadToS3 } from '@/lib/s3';
import { Progress } from '@/components/ui/progress';
import mime from 'mime';

const items_1 = [
  {
    id: '1_1',
    label: 'نواتج ومخرجات التعلم',
  },
  {
    id: '1_2',
    label: 'جودة الحياة الأكاديمية',
  },
  {
    id: '1_3',
    label: 'الكفاءة الأكاديمية',
  },
  {
    id: '1_4',
    label: 'الكفاءة الإدارية',
  },
  {
    id: '1_5',
    label: 'الإتصال والتواصل',
  },
] as const;

const items_2 = [
  {
    id: '2_1',
    label: 'تعزيز نجاح الطالب بعد تخرجه من الجامعة',
  },
  {
    id: '2_2',
    label: 'تعزيز مشاركة الجامعة في الأعمال التطوعية والخدمة المجتمعية',
  },
  {
    id: '2_3',
    label: 'رفع كفاءة الإرشاد والتأهيل المهني',
  },
  {
    id: '2_4',
    label: 'تعزيز ثقافة الإبتكار وريادة الأعمال لدى الطلاب',
  },
  {
    id: '2_5',
    label: 'أتمتة العمليات وتحويلها من ورقية إلى إلكترونية',
  },
  {
    id: '2_6',
    label: 'تحسين أداء الموظفين',
  },
  {
    id: '2_7',
    label: 'تحسين نمط الحياة داخل الجامعة (الرياضة، الترفيه)',
  },
  {
    id: '2_8',
    label:
      'تحسين نمط الحياة داخل صناعة بيئة تعليمية محفزة للإبداع والإبتكار (الهوايات، الأنشطة، الأندية الطلابية...)',
  },
  {
    id: '2_9',
    label: 'تعزيز القيم الإسلامية والهوية الوطنية',
  },
] as const;

const items_3 = [
  {
    id: '3_1',
    label: 'الإبداع والإبتكار',
  },
  {
    id: '3_2',
    label: 'التفكير النقدي وحل المشكلات',
  },
  {
    id: '3_3',
    label: 'التواصل والتعاون',
  },
  {
    id: '3_4',
    label: 'الكفاءة المعلوماتية',
  },
  {
    id: '3_5',
    label: 'كفاءة وسائل الإعلام',
  },
  {
    id: '3_6',
    label: 'كفاءة المعلومات والتواصل والتكنولوجيا',
  },
  {
    id: '3_7',
    label: 'المرونة والتكيف',
  },
  {
    id: '3_8',
    label: 'المبادرة والتوجيه الذاتي',
  },
  {
    id: '3_9',
    label: 'المهارات الإجتماعية ومهارات التعامل عبر الثقافات',
  },
  {
    id: '3_10',
    label: 'الإنتاجية والمحاسبة',
  },
  {
    id: '3_11',
    label: 'القيادة والمسؤولية',
  },
] as const;

const departments = [
  {
    id: 'CE',
    label: 'هندسة الحاسب',
  },
  {
    id: 'CS',
    label: 'علوم الحاسب',
  },
  {
    id: 'IT',
    label: 'تقنية المعلومات',
  },
];

const advertisementProcess = [
  {
    id: 'EMAIL',
    label: 'الإيميل الجامعي',
  },
  {
    id: 'SOCIAL_MEDIA_PLATFORM',
    label: 'منصات التواصل الإجتماعي',
  },
];

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const fileSchema = z
  .instanceof(File)
  .refine((f) => f.size < MAX_FILE_SIZE, {
    message: 'الحد الأعلى لحجم الملف: 50MB',
  })
  .refine(
    (f) => ACCEPTED_IMAGE_TYPES.includes(f.type),
    `نوع الملفات المسموحة: ${ACCEPTED_IMAGE_TYPES.join(', ')}`
  );

export default function RegisterEventForm() {
  const [open, setOpen] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadCount, setUploadCount] = useState({ total: 0, uploaded: 0 });
  const [files, setFiles] = useState<File[]>([]);
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    console.log(files);
  }, [files]);

  const form = useForm<z.infer<typeof EventSchema>>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      title: '',
      organizer: '',
      departments: [],
      date: {},
      place: '',
      time: '',
      targetAudience: '',
      advertisementProcess: [],
      instructorsAndGuests: '',
      maleAttendees: 0,
      femaleAttendees: 0,
      otherAttendees: 0,
      items_1: [],
      items_2: [],
      items_3: [],
      eventGoals: '',
      eventPlanning: '',
      eventTiming: '',
      eventFeedbacks: '',
      enhancePriority: '',
    },
  });

  async function onSubmit(values: z.infer<typeof EventSchema>) {
    // objects name array that hold reference to s3 file name
    const objects: string[] = [];

    if (files) {
      for (let file of files) {
        const parsed = fileSchema.safeParse(file);
        if (parsed.error) {
          setFileError(true);
          return;
        }
      }

      setUploadCount((prev) => {
        return {
          total: files.length,
          uploaded: 0,
        };
      });
      setUploading(true);
      for await (let file of files) {
        const object = await uploadToS3(file);
        if (!object.success) {
          setUploading(false);
          setUploadError(true);
          return;
        }
        setUploadCount((prev) => {
          return {
            total: prev.total,
            uploaded: Math.min(prev.uploaded + 1, prev.total),
          };
        });
        objects.push(object.filename!);
      }
      setUploadCount((prev) => {
        return { total: 0, uploaded: 0 };
      });
      setUploading(false);
    }

    const result = await registerEvent(values, objects);
    if (result.sucess) setOpen(true);
    await generateDocument(values);
  }

  const renderFileList = () => (
    <>
      {files.map((f, i) => (
        <div key={i} className='relative'>
          <Input
            dir='ltr'
            className='text-center'
            disabled
            value={`${f.name} : ${f.type}`}
          />
          <Button
            className='absolute top-0 left-0'
            variant='outline'
            size='icon'
            type='button'
            onClick={() =>
              setFiles((prev) => {
                const idx = prev.findIndex((v) => v == f);
                if (idx == -1) return [...prev];
                prev.splice(idx, 1);
                return [...prev];
              })
            }
          >
            <Trash className='h-4 w-4 text-muted-foreground' />
          </Button>
        </div>
      ))}
    </>
  );

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='grid py-8 gap-4'
        >
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem className='grid grid-cols-2 items-center'>
                <FormLabel>عنوان الفعالية/البرنامج/الورشة التدريبية</FormLabel>
                <FormControl>
                  <Input placeholder='ادخل العنوان' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='organizer'
            render={({ field }) => (
              <FormItem className='grid grid-cols-2 items-center'>
                <FormLabel>الجهة المنفذة</FormLabel>
                <Select
                  dir='rtl'
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='إختر الجهة المنفذة' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='TAIF_UNIVERSITY'>
                      جامعة الطائف
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='departments'
            render={() => (
              <FormItem className='grid grid-cols-2 items-center py-2'>
                <FormLabel>اسم القسم الأكاديمي بالكلية</FormLabel>
                <div className='grid grid-cols-3 space-x-4 rtl:space-x-reverse'>
                  {departments.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name='departments'
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className='flex flex-row items-start space-x-3 space-y-0 rtl:space-x-reverse'
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className='font-normal'>
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='date'
            render={({ field, fieldState }) => (
              <FormItem className='grid grid-cols-2 items-center'>
                <FormLabel>اليوم / التاريخ</FormLabel>
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <Button
                      id='date'
                      variant='outline'
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !field.value.from && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className='ltr:mr-2 text-tu-primary rtl:ml-2 h-4 w-4' />
                      {field.value.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.to, 'yyyy/MM/dd')} -{' '}
                            {format(field.value.from, 'yyyy/MM/dd')}
                          </>
                        ) : (
                          format(field.value.from, 'yyyy/MM/dd')
                        )
                      ) : (
                        <span>إختر تاريخ الفعالية</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='center'>
                    <Calendar
                      dir='ltr'
                      initialFocus
                      mode='range'
                      defaultMonth={field.value.from}
                      selected={{
                        from: field.value.from!,
                        to: field.value.to,
                      }}
                      onSelect={field.onChange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
                {fieldState.error && (
                  <span className='text-destructive text-sm font-medium'>
                    يجب تحديد تاريخ الفعالية
                  </span>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='place'
            render={({ field }) => (
              <FormItem className='grid grid-cols-2 items-center'>
                <FormLabel>المكان</FormLabel>
                <FormControl>
                  <Input placeholder='المكان' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='time'
            render={({ field }) => (
              <FormItem className='grid grid-cols-2 items-center'>
                <FormLabel>التوقيت</FormLabel>
                <FormControl>
                  <Input placeholder='التوقيت' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='targetAudience'
            render={({ field }) => (
              <FormItem className='grid grid-cols-2 items-center'>
                <FormLabel>الفئة المستهدفة</FormLabel>
                <Select
                  dir='rtl'
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='إختر الفئة المستهدفة' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='TAIF_UNIVERSITY_EMPLOYEES'>
                      جميع منسوبي جامعة الطائف{' '}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='registrationProcess'
            render={({ field }) => (
              <FormItem className='grid grid-cols-2 items-center py-2'>
                <FormLabel>آلية التسجيل</FormLabel>
                <FormControl>
                  <RadioGroup
                    dir='rtl'
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='grid grid-cols-3 space-x-3.5 rtl:space-x-reverse'
                  >
                    <FormItem className='flex items-center space-x-3 rtl:space-x-reverse space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='ON-CAMPUS' />
                      </FormControl>
                      <FormLabel className='font-normal'>حضوري</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 rtl:space-x-reverse space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='ONLINE' />
                      </FormControl>
                      <FormLabel className='font-normal'>أونلاين</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='advertisementProcess'
            render={({ field }) => (
              <FormItem className='grid grid-cols-2 items-center py-2'>
                <FormLabel>آلية الإعلان</FormLabel>
                <div className='grid grid-cols-3 space-x-4 rtl:space-x-reverse'>
                  {advertisementProcess.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name='advertisementProcess'
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className='flex items-center space-x-3 rtl:space-x-reverse space-y-0'
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className='font-normal'>
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='instructorsAndGuests'
            render={({ field }) => (
              <FormItem className='grid grid-cols-2 items-center'>
                <FormLabel>المدربين / الضيوف</FormLabel>
                <FormControl>
                  <Input placeholder='المدربين / الضيوف' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-2 items-start py-2'>
            <Label>عدد الحضور / المستفيدين</Label>
            <div className='flex flex-col gap-2'>
              <FormField
                control={form.control}
                name='maleAttendees'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-2 items-center'>
                    <FormLabel>طلاب</FormLabel>
                    <FormControl>
                      <Input className='text-center' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='femaleAttendees'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-2 items-center'>
                    <FormLabel>طالبات</FormLabel>
                    <FormControl>
                      <Input className='text-center' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='otherAttendees'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-2 items-center'>
                    <FormLabel>أخرى من منسوبي الجامعة</FormLabel>
                    <FormControl>
                      <Input className='text-center' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem className='grid grid-cols-2 items-center'>
                <FormLabel>نوع الفعالية</FormLabel>
                <FormControl>
                  <RadioGroup
                    dir='rtl'
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='grid grid-cols-3 space-x-4 rtl:space-x-reverse'
                  >
                    <FormItem className='flex items-center space-x-3 rtl:space-x-reverse space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='HACKATHON' />
                      </FormControl>
                      <FormLabel className='font-normal'>هاكاثون</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 rtl:space-x-reverse space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='BOOTCAMP' />
                      </FormControl>
                      <FormLabel className='font-normal'>معسكر</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 rtl:space-x-reverse space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='WORKSHOP' />
                      </FormControl>
                      <FormLabel className='font-normal'>ورشة عمل</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem className='grid grid-cols-2 items-center'>
                <FormLabel>فئة الفعالية</FormLabel>
                <FormControl>
                  <RadioGroup
                    dir='rtl'
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='grid grid-cols-3 space-x-4 rtl:space-x-reverse'
                  >
                    <FormItem className='flex items-center space-x-3 rtl:space-x-reverse space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='ON-CAMPUS' />
                      </FormControl>
                      <FormLabel className='font-normal'>حضوري</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center space-x-3 rtl:space-x-reverse space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='ONLINE' />
                      </FormControl>
                      <FormLabel className='font-normal'>عن بعد</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator />
          <div className='space-y-4 pb-4'>
            <h3 className='font-medium tracking-tight text-2xl leading-none text-tu-primary'>
              تحديد الإرتباط مع برامج الوكالة
            </h3>
            <div className='space-y-2'>
              <p className='text-sm text-muted-foreground'>
                يجب أن يكون البرنامج مرتبط بإحدى أو جميع كل ما يلي:
              </p>
              <ul className='text-sm text-muted-foreground list-disc list-inside'>
                <li>خطة وكالة الشؤون الأكاديمية</li>
                <li>خطة الجامعة الاستراتيجية</li>
                <li>سمات خريجي جامعة الطائف</li>
              </ul>
            </div>
          </div>
          <div className='space-y-10 pb-8'>
            <FormField
              control={form.control}
              name='items_1'
              render={() => (
                <FormItem>
                  <div className='mb-4'>
                    <FormLabel className='text-base'>
                      خطة وكالة الشؤون الأكديمية
                    </FormLabel>
                  </div>
                  {items_1.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name='items_1'
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className='flex flex-row items-start space-x-3 space-y-0 rtl:space-x-reverse'
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className='font-normal'>
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='items_2'
              render={() => (
                <FormItem>
                  <div className='mb-4'>
                    <FormLabel className='text-base'>
                      خطة الجامعة الإستراتيجية
                    </FormLabel>
                  </div>
                  {items_2.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name='items_2'
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className='flex flex-row items-start space-x-3 space-y-0 rtl:space-x-reverse'
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className='font-normal'>
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='items_3'
              render={() => (
                <FormItem>
                  <div className='mb-4'>
                    <FormLabel className='text-base'>
                      سمات خريجي بجامعة الطائف TUGA{' '}
                    </FormLabel>
                  </div>
                  {items_3.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name='items_3'
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className='flex flex-row items-start space-x-3 space-y-0 rtl:space-x-reverse'
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className='font-normal'>
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator />
          <FormField
            control={form.control}
            name='eventGoals'
            render={({ field }) => (
              <FormItem className='grid grid-cols-2 items-start'>
                <FormLabel>أهداف الفعالية/البرنامج</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='أدخل أهداف الفعالية/البرنامج'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='eventPlanning'
            render={({ field }) => (
              <FormItem className='grid grid-cols-2 items-start'>
                <FormLabel>التخطيط والإعداد للفعالية/البرنامج</FormLabel>
                <FormControl>
                  <Textarea placeholder='كيف تم التخطيط؟' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='eventTiming'
            render={({ field }) => (
              <FormItem className='grid grid-cols-2 items-start'>
                <FormLabel>الجدول الزمني والتنفيذ للفعالية</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='مقسمة على فترات زمنية محددة: 7PM - 9PM'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='eventFeedbacks'
            render={({ field }) => (
              <FormItem className='grid grid-cols-2 items-start'>
                <FormLabel>
                  تقييم الفعالية (نتائج استطلاع الرأي،آراء وانطباعات)
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='أبرز الإيجابيات ومقترحات...'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='enhancePriority'
            render={({ field }) => (
              <FormItem className='grid grid-cols-2 items-start'>
                <FormLabel>أوليات التحسين</FormLabel>
                <FormControl>
                  <Textarea placeholder='أوليات التحسين' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='workTeam'
            render={({ field }) => (
              <FormItem className='grid grid-cols-2 items-center'>
                <FormLabel>فريق العمل</FormLabel>
                <Select
                  dir='rtl'
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='إختر فريق العمل' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>
                        الأندية الطلابية بكلية الحاسبات وتقنية المعلومات
                      </SelectLabel>
                      <SelectItem value='CLUB-GOOGLE'>
                        نادي قوقل للطلبة المطورين
                      </SelectItem>
                      <SelectItem value='CLUB-AI-PROGRAMMING'>
                        نادي البرمجة والذكاء الاصطناعي
                      </SelectItem>
                      <SelectItem value='CLUB-IEEE'>نادي IEEE</SelectItem>
                      <SelectItem value='CLUB-CYBERSECURITY'>
                        نادي الأمن السيبراني
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-2 items-center'>
            <Label>
              ملحق التغطية الإعلامية{' '}
              <span className='text-muted-foreground mr-2'>(ان وجد)</span>
            </Label>
            <div className='flex flex-col gap-2.5'>
              <div className='relative'>
                <Input disabled placeholder='رفع صور...' />
                <Button
                  onClick={() => {
                    if (fileRef.current) fileRef.current.click();
                  }}
                  type='button'
                  size='icon'
                  className='absolute top-0 left-0'
                >
                  <UploadIcon className='h-4 w-4' />
                </Button>
                <input
                  onChange={(e) =>
                    setFiles([...Array.from(e.target.files ?? [])])
                  }
                  ref={fileRef}
                  id='files'
                  type='file'
                  multiple
                  hidden
                />
              </div>
            </div>
          </div>
          <div className='grid grid-cols-2'>
            <div></div>
            <div className='space-y-2'>{files && renderFileList()}</div>
          </div>

          <Button type='submit'>تسجيل الفعالية</Button>
          {/* <Button onClick={() => generateDocument()} type='button'>
            توليد ملف
          </Button> */}
          <Button variant='secondary' type='button' asChild>
            <Link href='/'>خروج</Link>
          </Button>
        </form>
      </Form>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent dir='rtl'>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-center'>
              <div className='flex items-end gap-2 justify-center'>
                <CircleCheckBig className='text-tu-primary' />
                تم تسجيل الفعالية
              </div>
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className='mx-auto'>إغلاق</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={uploading} onOpenChange={setUploading}>
        <AlertDialogContent dir='rtl'>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-center'>
              <div className='flex flex-col items-center gap-2 justify-center'>
                <LoaderCircle className='text-tu-primary animate-spin h-12 w-12' />
                رفع الملفات الى سحابة نور
                <Progress
                  value={(uploadCount.uploaded / uploadCount.total) * 100}
                />
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription className='text-center'>
              تم رفع {uploadCount.uploaded} من {uploadCount.total}
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={fileError} onOpenChange={setFileError}>
        <AlertDialogContent dir='rtl'>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-center'>
              <div className='flex items-end gap-2 justify-center'>
                <XCircle className='text-destructive' />
                خطأ عند رفع الملفات
              </div>
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div className='flex flex-col px-2'>
            <ul className='list-disc'>
              <li>
                <div>
                  نوع الملفات المقبولة:{' '}
                  <span dir='rtl'>
                    {ACCEPTED_IMAGE_TYPES.map((type) => mime.getExtension(type))
                      .filter((m) => m && m.length > 0)
                      .join(', ')}
                  </span>
                </div>
              </li>
              <li>
                <div>
                  الحد الأقصى لحجم الملف: {MAX_FILE_SIZE / 100000} ميجابايت
                </div>
              </li>
            </ul>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className='mx-auto'>إغلاق</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={uploadError} onOpenChange={setUploadError}>
        <AlertDialogContent dir='rtl'>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-center'>
              <div className='flex items-end gap-2 justify-center'>
                <XCircle className='text-destructive' />
                حدث خطأ عند محاولة رفع الملفات الى سحابة نور
              </div>
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className='mx-auto'>إغلاق</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
