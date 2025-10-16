'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    cost: string[];
    time: string[];
    type: string[];
  };
  onFilterChange: (filters: any) => void;
}

export function ActivityFilterModal({ isOpen, onClose, filters, onFilterChange }: FilterModalProps) {
  const toggleFilter = (category: 'cost' | 'time' | 'type', value: string) => {
    const current = filters[category];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    
    onFilterChange({
      ...filters,
      [category]: updated,
    });
  };

  const clearAll = () => {
    onFilterChange({
      cost: [],
      time: [],
      type: [],
    });
  };

  const hasActiveFilters = 
    filters.cost.length > 0 ||
    filters.time.length > 0 ||
    filters.type.length > 0;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FunnelIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left flex-1">
                    <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900">
                      Filter Activities
                    </Dialog.Title>
                    <p className="mt-1 text-sm text-gray-500">
                      Refine your search to find the perfect rainy day activity
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-6">
                  {/* Cost Filter */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">💰 Cost</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Free', '$', '$$', '$$$'].map((cost) => (
                        <button
                          key={cost}
                          onClick={() => toggleFilter('cost', cost)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            filters.cost.includes(cost)
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {cost === 'Free' ? '🆓 Free' : cost}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Filter */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">⏱️ Time Needed</h4>
                    <div className="flex flex-wrap gap-2">
                      {['1-2 hours', '2-3 hours', '3-4 hours', '4+ hours'].map((time) => (
                        <button
                          key={time}
                          onClick={() => toggleFilter('time', time)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            filters.time.includes(time)
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Type Filter */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">🎯 Activity Type</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { value: 'museum', label: '🏛️ Museums' },
                        { value: 'food', label: '☕ Food & Drink' },
                        { value: 'entertainment', label: '🎭 Entertainment' },
                        { value: 'shopping', label: '🛍️ Shopping' },
                        { value: 'fitness', label: '💪 Fitness' },
                      ].map(({ value, label }) => (
                        <button
                          key={value}
                          onClick={() => toggleFilter('type', value)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            filters.type.includes(value)
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3 justify-end border-t pt-4">
                  {hasActiveFilters && (
                    <button
                      type="button"
                      className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={clearAll}
                    >
                      Clear All
                    </button>
                  )}
                  <button
                    type="button"
                    className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
                    onClick={onClose}
                  >
                    Apply Filters
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

