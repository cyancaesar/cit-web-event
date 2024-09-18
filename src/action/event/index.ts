'use server';

import { validateRequest } from '@/auth';
import prisma from '@/lib/db';
import EventSchema from '@/lib/schema/EventSchema';
import { revalidatePath } from 'next/cache';

export async function registerEvent(data: unknown, objects: string[]) {
  const { user } = await validateRequest();

  if (!user) return { sucess: false, error: 'غير موثق' };

  const result = EventSchema.safeParse(data);

  if (result.error) {
    return { sucess: false, error: 'فشل في التحقق من البيانات' };
  }

  const event = result.data;

  await prisma.event.create({
    data: {
      acadAffairsPlan: JSON.stringify(event.items_1),
      univStratPlan: JSON.stringify(event.items_2),
      tuga: JSON.stringify(event.items_3),
      advertisementProcess: JSON.stringify(event.advertisementProcess),
      category: event.category,
      department: JSON.stringify(event.departments),
      enhancePriority: event.enhancePriority,
      eventFeedbacks: event.eventFeedbacks,
      eventGoals: event.eventGoals,
      eventPlanning: event.eventPlanning,
      eventTiming: event.eventTiming,
      instructorsAndGuests: event.instructorsAndGuests,
      maleAttendees: event.maleAttendees,
      femaleAttendees: event.femaleAttendees,
      otherAttendees: event.otherAttendees,
      totalAttendees:
        event.maleAttendees + event.femaleAttendees + event.otherAttendees,
      organizer: event.organizer,
      place: event.place,
      registrationProcess: event.registrationProcess,
      targetAudience: event.targetAudience,
      time: event.time,
      title: event.title,
      type: event.type,
      workTeam: event.workTeam,
      date_from: event.date.from,
      date_to: event.date.to,
      files: {
        createMany: {
          data: objects.map((obj) => {
            return { objectKey: obj };
          }),
        },
      },
      user: { connect: { id: user.id } },
    },
  });

  return { sucess: true, error: 'تم تسجيل الفعالية بنجاح' };
}

// TODO: mark as deleted instead of actually deleting record.
export async function deleteEvent(id: string) {
  const { user } = await validateRequest();
  if (!user || user.role !== 'admin')
    return {
      error: 'غير موثق',
    };

  // const event = await prisma.event.findUnique({ where: { id } });
  // if (!event)
  //   return {
  //     error: 'لا توجد فعالية',
  //   };

  // await prisma.event.delete({ where: { id } });

  // revalidatePath('/event');
}
