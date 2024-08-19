'use server';

import prisma from '@/lib/db';
import EventSchema from '@/lib/schema/EventSchema';

export async function registerEvent(data: unknown) {
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
    },
  });

  return { sucess: true, error: 'تم تسجيل الفعالية بنجاح' };
}
