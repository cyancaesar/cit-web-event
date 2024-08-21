export const DEPARTMENT = {
  CE: 'هندسة الحاسب',
  CS: 'علوم الحاسب',
  IT: 'تقنية المعلومات',
} as const;

export type TDEPARTMENT = typeof DEPARTMENT;
export type DEPARTMENT_KEY = keyof TDEPARTMENT;
