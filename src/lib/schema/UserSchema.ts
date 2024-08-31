import { z } from 'zod';

const minLengthErrorMessage = 'يجب أن تكون كلمة المرور أكثر من 8 أحرف';
const maxLengthErrorMessage = 'يجب أن تكون كلمة المرور أقل من 64 أحرف';
const uppercaseErrorMessage =
  'يجب أن تحتوي كلمة المرور على الأقل حروف كبيرة A-Z';
const lowercaseErrorMessage =
  'يجب أن تحتوي كلمة المرور على الأقل حروف صغيرة a-z';
const numberErrorMessage = 'يجب أن تحتوي كلمة المرور على الأقل رقم 0-9';
const specialCharacterErrorMessage =
  'يجب أن تحتوي كلمة المرور على الأقل حرف مميز (!@#$%^&*)';

const passwordMismatchErrorMessage =
  'كلمة المرور لا تطابق مع تأكيد كلمة المرور';

const passwordSchema = z
  .string()
  .min(8, { message: minLengthErrorMessage })
  .max(64, { message: maxLengthErrorMessage })
  .refine((password) => /[A-Z]/.test(password), {
    message: uppercaseErrorMessage,
  })
  .refine((password) => /[a-z]/.test(password), {
    message: lowercaseErrorMessage,
  })
  .refine((password) => /[0-9]/.test(password), { message: numberErrorMessage })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: specialCharacterErrorMessage,
  });

export const createUserSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: 'إسم المتخدم يجب أن يكون أكثر من 3 أحرف' })
      .max(64, 'إسم المتخدم يجب أن يكون أقل من 64 حرف'),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: passwordMismatchErrorMessage,
    path: ['confirmPassword'],
  });

export const changePasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: passwordMismatchErrorMessage,
    path: ['confirmPassword'],
  });
