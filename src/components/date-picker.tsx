'use client';

import { useState } from 'react';
import { format, addDays, startOfDay, isSameDay, isToday } from 'date-fns';

interface DatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  maxDays?: number; // Maximum days in the future (default 7 for forecast limit)
}

export function DatePicker({ 
  selectedDate, 
  onDateChange,
  maxDays = 7 
}: DatePickerProps) {
  const today = startOfDay(new Date());
  const [isOpen, setIsOpen] = useState(false);

  // Generate array of available dates
  const availableDates = Array.from({ length: maxDays }, (_, i) => 
    addDays(today, i)
  );

  const handleDateSelect = (date: Date) => {
    onDateChange(date);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Selected Date Display Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-400 transition-colors shadow-sm"
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <div className="text-left">
          <div className="text-sm font-medium text-gray-900">
            {isToday(selectedDate) ? 'Today' : format(selectedDate, 'EEEE')}
          </div>
          <div className="text-xs text-gray-500">
            {format(selectedDate, 'MMM d, yyyy')}
          </div>
        </div>
        <svg 
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Calendar */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Calendar Popup */}
          <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-20 p-4 min-w-[320px]">
            <div className="mb-3">
              <h3 className="text-sm font-semibold text-gray-900">Select a Date</h3>
              <p className="text-xs text-gray-500 mt-1">
                7-day forecast available
              </p>
            </div>

            <div className="space-y-1">
              {availableDates.map((date) => {
                const isSelected = isSameDay(date, selectedDate);
                const isTodayDate = isToday(date);
                
                return (
                  <button
                    key={date.toISOString()}
                    onClick={() => handleDateSelect(date)}
                    className={`w-full px-4 py-3 rounded-lg text-left transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'hover:bg-gray-50 text-gray-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className={`font-medium ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                          {isTodayDate ? 'Today' : format(date, 'EEEE')}
                        </div>
                        <div className={`text-sm ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
                          {format(date, 'MMMM d, yyyy')}
                        </div>
                      </div>
                      {isSelected && (
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100">
              <button
                onClick={() => handleDateSelect(today)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Back to Today
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

