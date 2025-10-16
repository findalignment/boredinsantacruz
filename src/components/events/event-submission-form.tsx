'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImageUpload } from './image-upload';

// Event categories matching our design
const EVENT_CATEGORIES = [
  { value: 'music', label: '🎵 Music & Live Entertainment', emoji: '🎵' },
  { value: 'food', label: '🍽️ Food & Drink', emoji: '🍽️' },
  { value: 'arts', label: '🎨 Arts & Culture', emoji: '🎨' },
  { value: 'outdoors', label: '🏃 Outdoors & Sports', emoji: '🏃' },
  { value: 'family', label: '👨‍👩‍👧‍👦 Family & Kids', emoji: '👨‍👩‍👧‍👦' },
  { value: 'education', label: '🎓 Education & Workshops', emoji: '🎓' },
  { value: 'festivals', label: '🎉 Festivals & Markets', emoji: '🎉' },
  { value: 'nightlife', label: '🌙 Nightlife', emoji: '🌙' },
  { value: 'business', label: '💼 Business & Networking', emoji: '💼' },
  { value: 'wellness', label: '🧘 Wellness & Fitness', emoji: '🧘' },
  { value: 'theater', label: '🎭 Theater & Performance', emoji: '🎭' },
  { value: 'film', label: '🎬 Film & Screenings', emoji: '🎬' },
];

interface FormData {
  // Basic Info
  title: string;
  description: string;
  categories: string[];
  
  // Date & Time
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  isRecurring: boolean;
  recurringPattern: string;
  
  // Location
  venueName: string;
  venueAddress: string;
  isOnline: boolean;
  onlineUrl: string;
  
  // Details
  cost: string;
  ticketUrl: string;
  websiteUrl: string;
  contactEmail: string;
  contactPhone: string;
  
  // Media
  imageUrl: string;
  videoUrl: string;
  
  // Audience
  kidFriendly: boolean;
  petFriendly: boolean;
  accessible: boolean;
  ageRestriction: string;
  
  // Submitter
  submitterName: string;
  submitterEmail: string;
}

export function EventSubmissionForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    categories: [],
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    isRecurring: false,
    recurringPattern: '',
    venueName: '',
    venueAddress: '',
    isOnline: false,
    onlineUrl: '',
    cost: 'Free',
    ticketUrl: '',
    websiteUrl: '',
    contactEmail: '',
    contactPhone: '',
    imageUrl: '',
    videoUrl: '',
    kidFriendly: false,
    petFriendly: false,
    accessible: false,
    ageRestriction: 'All ages',
    submitterName: '',
    submitterEmail: '',
  });

  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleCategory = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.description || formData.categories.length === 0) {
        throw new Error('Please fill out all required fields');
      }

      if (!formData.startDate || !formData.startTime) {
        throw new Error('Please provide event date and time');
      }

      if (!formData.isOnline && (!formData.venueName || !formData.venueAddress)) {
        throw new Error('Please provide venue information or mark as online event');
      }

      if (!formData.submitterName || !formData.submitterEmail) {
        throw new Error('Please provide your contact information');
      }

      // Submit to API
      const response = await fetch('/api/events/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Failed to submit event');
      }

      // Redirect to success page
      router.push('/events/submit/success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit event');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateProgress = () => {
    let filled = 0;
    let total = 0;

    // Count required fields
    if (formData.title) filled++;
    total++;
    if (formData.description) filled++;
    total++;
    if (formData.categories.length > 0) filled++;
    total++;
    if (formData.startDate) filled++;
    total++;
    if (formData.startTime) filled++;
    total++;
    if (formData.venueName || formData.isOnline) filled++;
    total++;
    if (formData.venueAddress || formData.isOnline) filled++;
    total++;
    if (formData.submitterName) filled++;
    total++;
    if (formData.submitterEmail) filled++;
    total++;

    return Math.round((filled / total) * 100);
  };

  const progress = calculateProgress();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Progress Bar */}
      <div className="bg-gray-100 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">
            Form Progress
          </span>
          <span className="text-sm font-semibold text-blue-600">
            {progress}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-600 p-4 m-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="text-red-800 font-semibold">Error</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
        {/* Step 1: Basic Info */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm">
              1
            </span>
            Basic Information
          </h2>

          <div className="space-y-4">
            {/* Event Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Title <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="e.g. Jazz Night at Kuumbwa"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={100}
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                {formData.title.length}/100 characters
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description <span className="text-red-600">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Describe your event. Include what makes it special, what attendees can expect, and any important details..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                maxLength={2000}
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                {formData.description.length}/2000 characters
              </p>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Categories <span className="text-red-600">*</span> (Select all that apply)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {EVENT_CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => toggleCategory(cat.value)}
                    className={`px-4 py-3 rounded-lg text-left transition-all ${
                      formData.categories.includes(cat.value)
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              {formData.categories.length > 0 && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {formData.categories.length} {formData.categories.length === 1 ? 'category' : 'categories'}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Step 2: Date & Time */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm">
              2
            </span>
            Date & Time
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Start Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Start Date <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => updateField('startDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Start Time */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Start Time <span className="text-red-600">*</span>
                </label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => updateField('startTime', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  End Date <span className="text-gray-400">(Optional)</span>
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => updateField('endDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min={formData.startDate || new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* End Time */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  End Time <span className="text-gray-400">(Optional)</span>
                </label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => updateField('endTime', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Recurring Event */}
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isRecurring}
                  onChange={(e) => updateField('isRecurring', e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="font-semibold text-gray-700">
                  This is a recurring event
                </span>
              </label>

              {formData.isRecurring && (
                <div className="mt-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Recurring Pattern
                  </label>
                  <input
                    type="text"
                    value={formData.recurringPattern}
                    onChange={(e) => updateField('recurringPattern', e.target.value)}
                    placeholder="e.g. Every Friday, First Monday of each month, etc."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Step 3: Location */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm">
              3
            </span>
            Location
          </h2>

          <div className="space-y-4">
            {/* Online Event Toggle */}
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isOnline}
                  onChange={(e) => updateField('isOnline', e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="font-semibold text-gray-700">
                  This is an online event
                </span>
              </label>

              {formData.isOnline && (
                <div className="mt-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Online Event URL
                  </label>
                  <input
                    type="url"
                    value={formData.onlineUrl}
                    onChange={(e) => updateField('onlineUrl', e.target.value)}
                    placeholder="https://zoom.us/j/..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>

            {!formData.isOnline && (
              <>
                {/* Venue Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Venue Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.venueName}
                    onChange={(e) => updateField('venueName', e.target.value)}
                    placeholder="e.g. Kuumbwa Jazz Center"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required={!formData.isOnline}
                  />
                </div>

                {/* Venue Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Venue Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.venueAddress}
                    onChange={(e) => updateField('venueAddress', e.target.value)}
                    placeholder="320-2 Cedar St, Santa Cruz, CA 95060"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required={!formData.isOnline}
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Include full address with city and ZIP code
                  </p>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Step 4: Event Details */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm">
              4
            </span>
            Event Details
          </h2>

          <div className="space-y-4">
            {/* Cost */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cost
              </label>
              <select
                value={formData.cost}
                onChange={(e) => updateField('cost', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Free">Free</option>
                <option value="$">$ (Under $20)</option>
                <option value="$$">$$ ($20-50)</option>
                <option value="$$$">$$$ ($50-100)</option>
                <option value="$$$$">$$$$ ($100+)</option>
              </select>
            </div>

            {/* Ticket URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ticket/Registration URL <span className="text-gray-400">(Optional)</span>
              </label>
              <input
                type="url"
                value={formData.ticketUrl}
                onChange={(e) => updateField('ticketUrl', e.target.value)}
                placeholder="https://eventbrite.com/..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Website URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Website <span className="text-gray-400">(Optional)</span>
              </label>
              <input
                type="url"
                value={formData.websiteUrl}
                onChange={(e) => updateField('websiteUrl', e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Contact Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Contact Email <span className="text-gray-400">(Optional)</span>
                </label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => updateField('contactEmail', e.target.value)}
                  placeholder="info@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Contact Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Contact Phone <span className="text-gray-400">(Optional)</span>
                </label>
                <input
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => updateField('contactPhone', e.target.value)}
                  placeholder="(831) 555-1234"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Step 5: Media & Audience */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm">
              5
            </span>
            Media & Audience
          </h2>

          <div className="space-y-4">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Image <span className="text-gray-400">(Recommended)</span>
              </label>
              <ImageUpload
                value={formData.imageUrl}
                onChange={(url) => updateField('imageUrl', url)}
                disabled={isSubmitting}
              />
              <p className="mt-2 text-sm text-gray-500">
                📸 Add an eye-catching image to increase visibility. Events with images get 3x more views!
              </p>
            </div>

            {/* Video URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Video URL <span className="text-gray-400">(Optional)</span>
              </label>
              <input
                type="url"
                value={formData.videoUrl}
                onChange={(e) => updateField('videoUrl', e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="mt-1 text-sm text-gray-500">
                YouTube, Vimeo, or other video platform link
              </p>
            </div>

            {/* Audience Checkboxes */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <p className="font-semibold text-gray-700 mb-3">Audience & Accessibility</p>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.kidFriendly}
                  onChange={(e) => updateField('kidFriendly', e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-700">👨‍👩‍👧‍👦 Kid-friendly</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.petFriendly}
                  onChange={(e) => updateField('petFriendly', e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-700">🐕 Pet-friendly</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.accessible}
                  onChange={(e) => updateField('accessible', e.target.checked)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-700">♿ Wheelchair accessible</span>
              </label>
            </div>

            {/* Age Restriction */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Age Restriction
              </label>
              <select
                value={formData.ageRestriction}
                onChange={(e) => updateField('ageRestriction', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All ages">All ages</option>
                <option value="18+">18+ only</option>
                <option value="21+">21+ only</option>
              </select>
            </div>
          </div>
        </section>

        {/* Step 6: Your Information */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm">
              6
            </span>
            Your Information
          </h2>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-700">
              We need your contact information to notify you about your event's approval status. 
              This information will not be publicly displayed.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.submitterName}
                onChange={(e) => updateField('submitterName', e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                value={formData.submitterEmail}
                onChange={(e) => updateField('submitterEmail', e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                We'll send you a confirmation when your event is approved (usually within 24 hours)
              </p>
            </div>
          </div>
        </section>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || progress < 90}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Event for Review'}
          </button>
        </div>

        <p className="text-center text-sm text-gray-500">
          By submitting, you agree to our <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>
        </p>
      </form>
    </div>
  );
}

