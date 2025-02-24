import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Convert prisma object into regular JS object
// T is a generic type parameter that represents the type of the object being converted. => Placeholder
// The function takes an object of type T as input and returns an object of type T.
export const convertToPlainObject = <T>(value: T): T => {
  return JSON.parse(JSON.stringify(value));
}

// Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split('.');
  // return and see, IF there is a decimal. PadEnd Method to add 0's to the decimal if it's less than 2 digits
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : `${int}.00`;
}

// 49.99: int => 49, decima: .99