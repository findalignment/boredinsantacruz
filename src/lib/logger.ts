// src/lib/logger.ts
/**
 * Simple logging utility for weather and application events
 */

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export class Logger {
  private context: string;
  private minLevel: LogLevel;

  constructor(context: string, minLevel: LogLevel = LogLevel.INFO) {
    this.context = context;
    this.minLevel = minLevel;
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = [LogLevel.DEBUG, LogLevel.INFO, LogLevel.WARN, LogLevel.ERROR];
    return levels.indexOf(level) >= levels.indexOf(this.minLevel);
  }

  private formatMessage(level: LogLevel, message: string, meta?: any): string {
    const timestamp = new Date().toISOString();
    const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] [${level}] [${this.context}] ${message}${metaStr}`;
  }

  debug(message: string, meta?: any) {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.debug(this.formatMessage(LogLevel.DEBUG, message, meta));
    }
  }

  info(message: string, meta?: any) {
    if (this.shouldLog(LogLevel.INFO)) {
      console.log(this.formatMessage(LogLevel.INFO, message, meta));
    }
  }

  warn(message: string, meta?: any) {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(this.formatMessage(LogLevel.WARN, message, meta));
    }
  }

  error(message: string, error?: Error | any, meta?: any) {
    if (this.shouldLog(LogLevel.ERROR)) {
      const errorDetails = error instanceof Error 
        ? { message: error.message, stack: error.stack, ...meta }
        : { error, ...meta };
      console.error(this.formatMessage(LogLevel.ERROR, message, errorDetails));
    }
  }

  // Helper methods for common weather events
  weatherFetch(date: string, source: 'api' | 'cache') {
    this.info(`Weather fetched for ${date}`, { source });
  }

  weatherCached(date: string, ttl: number) {
    this.debug(`Weather cached for ${date}`, { ttl });
  }

  weatherError(operation: string, error: Error) {
    this.error(`Weather operation failed: ${operation}`, error);
  }

  apiCall(endpoint: string, status: number, duration: number) {
    this.info(`API call: ${endpoint}`, { status, duration: `${duration}ms` });
  }
}

// Create loggers for different modules
export const weatherLogger = new Logger('Weather', LogLevel.INFO);
export const cacheLogger = new Logger('Cache', LogLevel.INFO);
export const apiLogger = new Logger('API', LogLevel.INFO);

// Development vs Production logging
if (process.env.NODE_ENV === 'development') {
  weatherLogger['minLevel'] = LogLevel.DEBUG;
  cacheLogger['minLevel'] = LogLevel.DEBUG;
}

