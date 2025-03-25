import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert prisma object into regular JS object
// T is a generic type parameter that represents the type of the object being converted. => Placeholder
// The function takes an object of type T as input and returns an object of type T.
export const convertToPlainObject = <T>(value: T): T => {
  return JSON.parse(JSON.stringify(value));
};

// Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split('.');
  // return and see, IF there is a decimal. PadEnd Method to add 0's to the decimal if it's less than 2 digits
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : `${int}.00`;
}

// 49.99: int => 49, decima: .99

// Format error messages
// Could bring in Zod or Prisma types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any) {
  if (error.name === 'ZodError') {
    // Handle ZodError
    const fieldErrors = Object.keys(error.errors).map(
      (field) => error.errors[field].message
    );
    return fieldErrors.join(', ');
  } else if (
    error.name === 'PrismaClientKnownRequestError' &&
    error.code === 'P2002'
  ) {
    // Handle PrismaClientKnownRequestError
    // Get string in array
    const field = error.meta?.target ? error.meta.target[0] : 'unknown field';
    return `${field.chartAt(0).toUpperCase() + field.slice(1)} already exists`;
  } else {
    // Handle other errors
    return typeof error.message === 'string'
      ? error
      : JSON.stringify(error.message);
  }
}
