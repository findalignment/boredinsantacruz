// Input sanitization to prevent XSS attacks
// Edge runtime compatible (no DOM dependencies)

/**
 * Sanitize HTML input to prevent XSS
 * Removes ALL HTML tags and dangerous content
 */
export function sanitizeHtml(dirty: string): string {
  if (!dirty || typeof dirty !== 'string') {
    return '';
  }
  
  // Remove all HTML tags and dangerous patterns
  return dirty
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/data:text\/html/gi, '')
    .trim();
}

/**
 * Sanitize text input (removes HTML and dangerous patterns)
 */
export function sanitizeText(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  return input
    .replace(/<script[^>]*>.*?<\/script>/gi, '') // Remove script tags
    .replace(/<[^>]+>/g, '') // Remove all HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers (onclick, onerror, etc.)
    .replace(/data:text\/html/gi, '') // Remove data URIs
    .trim()
    .slice(0, 10000); // Limit length to 10K chars
}

/**
 * Sanitize URL to prevent javascript: and data: URIs
 */
export function sanitizeUrl(url: string): string {
  if (!url || typeof url !== 'string') {
    return '';
  }

  const clean = url.trim().toLowerCase();

  // Block dangerous protocols
  const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:', 'about:'];
  for (const protocol of dangerousProtocols) {
    if (clean.startsWith(protocol)) {
      return '';
    }
  }

  return url.trim().slice(0, 2000); // Limit URL length
}

/**
 * Escape HTML entities for safe display
 */
export function escapeHtml(text: string): string {
  if (!text || typeof text !== 'string') {
    return '';
  }

  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  
  return text.replace(/[&<>"'/]/g, (char) => map[char]);
}

/**
 * Sanitize user input for trip/item names
 */
export function sanitizeName(name: string): string {
  return sanitizeText(name).slice(0, 200); // Max 200 chars for names
}

/**
 * Sanitize user input for descriptions/notes
 */
export function sanitizeDescription(description: string): string {
  return sanitizeText(description).slice(0, 1000); // Max 1000 chars for descriptions
}

/**
 * Sanitize email addresses
 */
export function sanitizeEmail(email: string): string {
  if (!email || typeof email !== 'string') {
    return '';
  }

  // Basic email validation and sanitization
  const cleaned = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  return emailRegex.test(cleaned) ? cleaned : '';
}

