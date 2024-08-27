import { z } from 'zod';

const EventSchema = z.object({
  title: z.string(),
  organizer: z.string(),
  departments: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: 'يجب أن تختار على الأقل خانة واحدة.',
    }),
  date: z.object({
    from: z.date(),
    to: z.date(),
  }),
  place: z.string(),
  time: z.string(),
  targetAudience: z.string(),
  registrationProcess: z.enum(['ONLINE', 'ON-CAMPUS'], {
    required_error: 'يجب إختيار آلية التسجيل',
  }),
  advertisementProcess: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: 'يجب أن تختار على الأقل خانة واحدة.',
    }),
  instructorsAndGuests: z.string(),
  maleAttendees: z.coerce.number().min(0).max(100000),
  femaleAttendees: z.coerce.number().min(0).max(100000),
  otherAttendees: z.coerce.number().min(0).max(100000),
  type: z.enum(['HACKATHON', 'BOOTCAMP', 'WORKSHOP'], {
    required_error: 'يجب إختيار نوع الفعالية',
  }),
  category: z.enum(['ONLINE', 'ON-CAMPUS'], {
    required_error: 'يجب إختيار فئة الفعالية',
  }),
  items_1: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'يجب أن تختار على الأقل خانة واحدة.',
  }),
  items_2: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'يجب أن تختار على الأقل خانة واحدة.',
  }),
  items_3: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'يجب أن تختار على الأقل خانة واحدة.',
  }),
  eventGoals: z.string(),
  eventPlanning: z.string(),
  eventTiming: z.string(),
  eventFeedbacks: z.string(),
  enhancePriority: z.string(),
  workTeam: z.enum(
    ['CLUB-GOOGLE', 'CLUB-AI-PROGRAMMING', 'CLUB-IEEE', 'CLUB-CYBERSECURITY'],
    {
      required_error: 'يجب إختيار فريق العمل',
    }
  ),
});

export default EventSchema;
