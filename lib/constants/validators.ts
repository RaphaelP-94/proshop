import { z } from 'zod';
import { formatNumberWithDecimal } from '../utils';

const currency = z.string().refine((value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))), {
    message: 'Price must have exactly two decimal places'
});

// Schema for inserting products 
export const inserProductSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(50),
  slug: z.string().min(3, 'Slug must be at least 3 characters').max(100),
  category: z.string().min(3, 'Category must be at least 3 characters').max(50),
  brand: z.string().min(3, 'Brand must be at least 3 characters').max(50),
  description: z.string().min(3, 'Description must be at least 3 characters').max(50),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, 'Product must have at least one image'),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  // ^ = startwith. \d+ = 1 or more digits. (\.\)? = optional decimal point. d{2} = 2 digits. $ = end of string.
  price: currency,
});