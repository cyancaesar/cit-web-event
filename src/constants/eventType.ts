export const EVENT_TYPE = {
  HACKATHON: 'هاكاثون',
  BOOTCAMP: 'معسكر',
  WORKSHOP: 'ورشة عمل',
} as const;

export type TEVENT_TYPE = typeof EVENT_TYPE;
export type KEVENT_TYPE = keyof TEVENT_TYPE;
