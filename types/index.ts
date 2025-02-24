import { z } from 'zod';
import { inserProductSchema } from '@/lib/constants/validators';

export type Product = z.infer<typeof inserProductSchema> & {
    // This is done automatically
    id: string;
    rating: string;
    createdAt: Date;
};