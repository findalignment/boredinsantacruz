'use server';

import { tables } from '@/lib/airtable';
import { auth } from '@/lib/auth/config';
import { revalidatePath } from 'next/cache';

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userEmail?: string;
  itemType: 'Activity' | 'Restaurant' | 'Wellness';
  itemId: string;
  rating: number; // 1-5
  title: string;
  content: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt?: string;
  
  // Restaurant-specific ratings
  foodRating?: number;
  ambianceRating?: number;
  serviceRating?: number;
  valueRating?: number;
  
  // Activity-specific ratings
  funRating?: number;
  activityValueRating?: number;
  accessibilityRating?: number;
  weatherRating?: number;
  
  // Wellness-specific ratings
  cleanlinessRating?: number;
  instructorRating?: number;
  equipmentRating?: number;
  wellnessValueRating?: number;
}

export interface CreateReviewData {
  itemType: 'Activity' | 'Restaurant' | 'Wellness';
  itemId: string;
  rating: number;
  title: string;
  content: string;
  isPublic: boolean;
  
  // Optional category-specific ratings
  foodRating?: number;
  ambianceRating?: number;
  serviceRating?: number;
  valueRating?: number;
  funRating?: number;
  activityValueRating?: number;
  accessibilityRating?: number;
  weatherRating?: number;
  cleanlinessRating?: number;
  instructorRating?: number;
  equipmentRating?: number;
  wellnessValueRating?: number;
}

/**
 * Create a new review
 */
export async function createReview(data: CreateReviewData) {
  const session = await auth();
  
  if (!session?.user) {
    return {
      success: false,
      error: 'You must be logged in to write reviews',
    };
  }

  // Validate rating
  if (data.rating < 1 || data.rating > 5) {
    return {
      success: false,
      error: 'Rating must be between 1 and 5',
    };
  }

  try {
    // Check if user already reviewed this item
    const existing = await tables.reviews
      .select({
        filterByFormula: `AND({UserId} = '${session.user.id}', {ItemType} = '${data.itemType}', {ItemId} = '${data.itemId}')`,
        maxRecords: 1,
      })
      .firstPage();

    if (existing.length > 0) {
      return {
        success: false,
        error: 'You have already reviewed this item. Please edit your existing review.',
      };
    }

    // Create review
    const record = await tables.reviews.create({
      UserId: session.user.id,
      UserName: session.user.name || 'Anonymous',
      UserEmail: session.user.email || '',
      ItemType: data.itemType,
      ItemId: data.itemId,
      Rating: data.rating,
      Title: data.title,
      Content: data.content,
      IsPublic: data.isPublic,
      CreatedAt: new Date().toISOString(),
      
      // Category-specific ratings
      FoodRating: data.foodRating,
      AmbianceRating: data.ambianceRating,
      ServiceRating: data.serviceRating,
      ValueRating: data.valueRating,
      FunRating: data.funRating,
      ActivityValueRating: data.activityValueRating,
      AccessibilityRating: data.accessibilityRating,
      WeatherRating: data.weatherRating,
    } as any);

    // Revalidate relevant pages
    revalidatePath(`/activity/${data.itemId}`);
    revalidatePath(`/restaurant/${data.itemId}`);
    revalidatePath('/profile');

    return {
      success: true,
      data: {
        id: (record as any).id,
        ...data,
        userId: session.user.id,
        userName: session.user.name || 'Anonymous',
        createdAt: new Date().toISOString(),
      } as Review,
    };
  } catch (error) {
    console.error('Error creating review:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create review',
    };
  }
}

/**
 * Update an existing review
 */
export async function updateReview(reviewId: string, data: Partial<CreateReviewData>) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return {
      success: false,
      error: 'You must be logged in',
    };
  }

  try {
    // Verify ownership
    const record = await tables.reviews.find(reviewId);
    
    if (record.fields.UserId !== session.user.id) {
      return {
        success: false,
        error: 'You can only edit your own reviews',
      };
    }

    // Update review
    const updated = await tables.reviews.update(reviewId, {
      Rating: data.rating,
      Title: data.title,
      Content: data.content,
      IsPublic: data.isPublic,
      UpdatedAt: new Date().toISOString(),
      
      // Category-specific ratings
      FoodRating: data.foodRating,
      AmbianceRating: data.ambianceRating,
      ServiceRating: data.serviceRating,
      ValueRating: data.valueRating,
      FunRating: data.funRating,
      ActivityValueRating: data.activityValueRating,
      AccessibilityRating: data.accessibilityRating,
      WeatherRating: data.weatherRating,
    } as any);

    // Revalidate relevant pages
    const itemId = record.fields.ItemId as string;
    const itemType = record.fields.ItemType as string;
    revalidatePath(`/${itemType.toLowerCase()}/${itemId}`);
    revalidatePath('/profile');

    return {
      success: true,
      data: updated,
    };
  } catch (error) {
    console.error('Error updating review:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update review',
    };
  }
}

/**
 * Delete a review
 */
export async function deleteReview(reviewId: string) {
  const session = await auth();
  
  if (!session?.user?.id) {
    return {
      success: false,
      error: 'You must be logged in',
    };
  }

  try {
    // Verify ownership
    const record = await tables.reviews.find(reviewId);
    
    if (record.fields.UserId !== session.user.id) {
      return {
        success: false,
        error: 'You can only delete your own reviews',
      };
    }

    const itemId = record.fields.ItemId as string;
    const itemType = record.fields.ItemType as string;

    // Delete it
    await tables.reviews.destroy(reviewId);

    // Revalidate relevant pages
    revalidatePath(`/${itemType.toLowerCase()}/${itemId}`);
    revalidatePath('/profile');

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error deleting review:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete review',
    };
  }
}

/**
 * Get all reviews for an item (public only, or all if user is viewing their own)
 */
export async function getReviews(itemType: 'Activity' | 'Restaurant' | 'Wellness', itemId: string) {
  const session = await auth();
  
  try {
    let formula = `AND({ItemType} = '${itemType}', {ItemId} = '${itemId}')`;
    
    // If not logged in, only show public reviews
    if (!session?.user?.id) {
      formula = `AND(${formula}, {IsPublic} = TRUE())`;
    } else {
      // Show public reviews OR user's own reviews
      formula = `AND(${formula}, OR({IsPublic} = TRUE(), {UserId} = '${session.user.id}'))`;
    }

    const records = await tables.reviews
      .select({
        filterByFormula: formula,
        sort: [{ field: 'CreatedAt', direction: 'desc' }],
      })
      .all();

    const reviews: Review[] = records.map((record) => ({
      id: record.id,
      userId: record.fields.UserId as string,
      userName: record.fields.UserName as string,
      userEmail: record.fields.UserEmail as string | undefined,
      itemType: record.fields.ItemType as 'Activity' | 'Restaurant',
      itemId: record.fields.ItemId as string,
      rating: record.fields.Rating as number,
      title: record.fields.Title as string,
      content: record.fields.Content as string,
      isPublic: record.fields.IsPublic as boolean,
      createdAt: record.fields.CreatedAt as string,
      updatedAt: record.fields.UpdatedAt as string | undefined,
      
      // Category-specific ratings
      foodRating: record.fields.FoodRating as number | undefined,
      ambianceRating: record.fields.AmbianceRating as number | undefined,
      serviceRating: record.fields.ServiceRating as number | undefined,
      valueRating: record.fields.ValueRating as number | undefined,
      funRating: record.fields.FunRating as number | undefined,
      activityValueRating: record.fields.ActivityValueRating as number | undefined,
      accessibilityRating: record.fields.AccessibilityRating as number | undefined,
      weatherRating: record.fields.WeatherRating as number | undefined,
    }));

    return {
      success: true,
      data: reviews,
    };
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'Failed to fetch reviews',
    };
  }
}

/**
 * Get user's reviews
 */
export async function getUserReviews() {
  const session = await auth();
  
  if (!session?.user?.id) {
    return {
      success: false,
      data: [],
      error: 'You must be logged in',
    };
  }

  try {
    const records = await tables.reviews
      .select({
        filterByFormula: `{UserId} = '${session.user.id}'`,
        sort: [{ field: 'CreatedAt', direction: 'desc' }],
      })
      .all();

    const reviews: Review[] = records.map((record) => ({
      id: record.id,
      userId: record.fields.UserId as string,
      userName: record.fields.UserName as string,
      itemType: record.fields.ItemType as 'Activity' | 'Restaurant',
      itemId: record.fields.ItemId as string,
      rating: record.fields.Rating as number,
      title: record.fields.Title as string,
      content: record.fields.Content as string,
      isPublic: record.fields.IsPublic as boolean,
      createdAt: record.fields.CreatedAt as string,
      updatedAt: record.fields.UpdatedAt as string | undefined,
      
      foodRating: record.fields.FoodRating as number | undefined,
      ambianceRating: record.fields.AmbianceRating as number | undefined,
      serviceRating: record.fields.ServiceRating as number | undefined,
      valueRating: record.fields.ValueRating as number | undefined,
      funRating: record.fields.FunRating as number | undefined,
      activityValueRating: record.fields.ActivityValueRating as number | undefined,
      accessibilityRating: record.fields.AccessibilityRating as number | undefined,
      weatherRating: record.fields.WeatherRating as number | undefined,
    }));

    return {
      success: true,
      data: reviews,
    };
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'Failed to fetch reviews',
    };
  }
}

/**
 * Get average rating for an item
 */
export async function getAverageRating(itemType: 'Activity' | 'Restaurant' | 'Wellness', itemId: string) {
  try {
    const records = await tables.reviews
      .select({
        filterByFormula: `AND({ItemType} = '${itemType}', {ItemId} = '${itemId}', {IsPublic} = TRUE())`,
        fields: ['Rating'],
      })
      .all();

    if (records.length === 0) {
      return {
        average: 0,
        count: 0,
      };
    }

    const sum = records.reduce((acc, record) => acc + (record.fields.Rating as number), 0);
    const average = sum / records.length;

    return {
      average: Math.round(average * 10) / 10, // Round to 1 decimal
      count: records.length,
    };
  } catch (error) {
    console.error('Error calculating average rating:', error);
    return {
      average: 0,
      count: 0,
    };
  }
}

/**
 * Check if user has reviewed an item
 */
export async function hasUserReviewed(itemType: 'Activity' | 'Restaurant', itemId: string): Promise<boolean> {
  const session = await auth();
  
  if (!session?.user?.id) {
    return false;
  }

  try {
    const records = await tables.reviews
      .select({
        filterByFormula: `AND({UserId} = '${session.user.id}', {ItemType} = '${itemType}', {ItemId} = '${itemId}')`,
        maxRecords: 1,
      })
      .firstPage();

    return records.length > 0;
  } catch (error) {
    console.error('Error checking review:', error);
    return false;
  }
}

