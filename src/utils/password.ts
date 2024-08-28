// import { hash, verify } from '@node-rs/argon2';
// import bcrypt from 'bcrypt';

export async function saltAndhashPassword(password: string) {
  // const salt = bcrypt.genSaltSync(10);
  // const hash = bcrypt.hashSync(password, salt);
  return password;
}

export async function verifyPassword(password: string, hashedPassword: string) {
  // const isValid = bcrypt.compareSync(password, hashedPassword);
  return password === hashedPassword;
}
