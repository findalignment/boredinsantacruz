// Input validation schemas using Zod
import { z } from 'zod';

export const TripSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200, 'Name too long').trim(),
  description: z.string().max(1000, 'Description too long').optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  isPublic: z.boolean().default(false),
});

export const TripItemSchema = z.object({
  tripId: z.string().min(1, 'Trip ID required'),
  type: z.enum(['Activity', 'Restaurant', 'Note']),
  itemId: z.string().min(1, 'Item ID required'),
  itemName: z.string().min(1).max(200).trim(),
  day: z.number().int().min(1).max(30),
  order: z.number().int().min(0),
  notes: z.string().max(1000).optional(),
});

export const ReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(2000, 'Comment too long').optional(),
  itemType: z.enum(['Activity', 'Restaurant']),
  itemId: z.string().min(1, 'Item ID required'),
});

export const FavoriteSchema = z.object({
  itemType: z.enum(['Activity', 'Restaurant']),
  itemId: z.string().min(1, 'Item ID required'),
  itemName: z.string().min(1).max(200),
});

export const ChatQuerySchema = z.object({
  query: z.string().min(1, 'Query cannot be empty').max(500, 'Query too long'),
});

export const SearchSchema = z.object({
  query: z.string().min(1).max(200),
  filters: z.object({
    category: z.string().optional(),
    indoorOutdoor: z.string().optional(),
    cost: z.number().optional(),
  }).optional(),
});

