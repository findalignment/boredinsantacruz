/**
 * Airtable Formula Injection Prevention
 * 
 * Airtable formulas are susceptible to injection attacks when user input
 * is directly interpolated. This utility sanitizes values for safe use
 * in filterByFormula strings.
 */

/**
 * Escape single quotes in strings for use in Airtable formulas
 * Airtable uses single quotes for string literals
 */
export function escapeAirtableValue(value: string | number | boolean): string {
  if (typeof value === 'number') {
    return value.toString();
  }
  
  if (typeof value === 'boolean') {
    return value ? 'TRUE()' : 'FALSE()';
  }
  
  if (typeof value !== 'string') {
    return '';
  }
  
  // Escape single quotes by doubling them (SQL-style escaping)
  // Remove any potentially dangerous characters
  return value
    .replace(/'/g, "''") // Escape single quotes
    .replace(/[\r\n\t]/g, ' ') // Remove line breaks/tabs
    .trim();
}

/**
 * Build a safe AND condition for Airtable filterByFormula
 */
export function buildAirtableAnd(conditions: string[]): string {
  const validConditions = conditions.filter(c => c && c.trim());
  if (validConditions.length === 0) {
    return '';
  }
  if (validConditions.length === 1) {
    return validConditions[0];
  }
  return `AND(${validConditions.join(', ')})`;
}

/**
 * Build a safe OR condition for Airtable filterByFormula
 */
export function buildAirtableOr(conditions: string[]): string {
  const validConditions = conditions.filter(c => c && c.trim());
  if (validConditions.length === 0) {
    return '';
  }
  if (validConditions.length === 1) {
    return validConditions[0];
  }
  return `OR(${validConditions.join(', ')})`;
}

/**
 * Build a safe equality condition
 */
export function buildEquals(fieldName: string, value: string | number | boolean): string {
  const escapedValue = escapeAirtableValue(value);
  
  if (typeof value === 'boolean') {
    return `{${fieldName}} = ${escapedValue}`;
  }
  
  if (typeof value === 'number') {
    return `{${fieldName}} = ${escapedValue}`;
  }
  
  // String comparison
  return `{${fieldName}} = '${escapedValue}'`;
}

/**
 * Build a safe FIND condition (for substring search)
 */
export function buildFind(searchValue: string, fieldName: string): string {
  const escapedValue = escapeAirtableValue(searchValue);
  return `FIND('${escapedValue}', {${fieldName}})`;
}

/**
 * Sanitize a record ID (should be alphanumeric with possible hyphens)
 */
export function sanitizeRecordId(id: string): string {
  // Airtable record IDs are typically alphanumeric with 'rec' prefix
  // Example: recABC123xyz
  const cleanId = id.trim();
  
  // Validate format (letters, numbers, and hyphens only)
  if (!/^[a-zA-Z0-9\-]+$/.test(cleanId)) {
    throw new Error('Invalid record ID format');
  }
  
  return cleanId;
}

/**
 * Sanitize user ID from auth session
 */
export function sanitizeUserId(userId: string): string {
  // User IDs should be alphanumeric, possibly with hyphens or underscores
  const cleanId = userId.trim();
  
  // Basic validation
  if (!cleanId || cleanId.length > 255) {
    throw new Error('Invalid user ID');
  }
  
  return escapeAirtableValue(cleanId);
}

/**
 * Sanitize enum values (itemType, etc.)
 */
export function sanitizeEnum(value: string, allowedValues: string[]): string {
  const cleanValue = value.trim();
  
  if (!allowedValues.includes(cleanValue)) {
    throw new Error(`Invalid enum value: ${cleanValue}. Allowed: ${allowedValues.join(', ')}`);
  }
  
  return cleanValue;
}

/**
 * Example usage for common query patterns
 */
export const AirtableQuery = {
  /**
   * Find records by user ID
   */
  byUserId: (userId: string) => {
    const safeUserId = sanitizeUserId(userId);
    return buildEquals('UserId', safeUserId);
  },
  
  /**
   * Find records by user and item
   */
  byUserAndItem: (userId: string, itemType: string, itemId: string) => {
    const safeUserId = sanitizeUserId(userId);
    const safeItemType = sanitizeEnum(itemType, ['Activity', 'Restaurant', 'Wellness']);
    const safeItemId = sanitizeRecordId(itemId);
    
    return buildAirtableAnd([
      buildEquals('UserId', safeUserId),
      buildEquals('ItemType', safeItemType),
      buildEquals('ItemId', safeItemId),
    ]);
  },
  
  /**
   * Find records by item and public status
   */
  byItemAndPublic: (itemType: string, itemId: string) => {
    const safeItemType = sanitizeEnum(itemType, ['Activity', 'Restaurant', 'Wellness']);
    const safeItemId = sanitizeRecordId(itemId);
    
    return buildAirtableAnd([
      buildEquals('ItemType', safeItemType),
      buildEquals('ItemId', safeItemId),
      buildEquals('IsPublic', true),
    ]);
  },
  
  /**
   * Find trip by share token
   */
  byShareToken: (token: string) => {
    // Share tokens should be UUID format
    const cleanToken = token.trim();
    if (!/^[a-f0-9\-]{36}$/i.test(cleanToken)) {
      throw new Error('Invalid share token format');
    }
    return buildEquals('ShareToken', escapeAirtableValue(cleanToken));
  },
  
  /**
   * Find trips by owner or collaborator
   */
  byOwnerOrCollaborator: (userEmail: string) => {
    const safeEmail = escapeAirtableValue(userEmail);
    
    return buildAirtableOr([
      buildEquals('UserId', safeEmail),
      buildFind(safeEmail, 'Collaborators'),
    ]);
  },
  
  /**
   * Find trip items by trip ID
   */
  byTripId: (tripId: string) => {
    const safeTripId = sanitizeRecordId(tripId);
    return buildEquals('TripId', safeTripId);
  },
};

