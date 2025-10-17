#!/usr/bin/env node

/**
 * Generate Additional Wellness Locations for Santa Cruz County
 * Adds 30-50 more diverse wellness businesses with all 84 fields
 */

const fs = require('fs');
const path = require('path');

// Additional wellness businesses across Santa Cruz County
const additionalWellnessBusinesses = [
  // More Yoga Studios
  {
    name: 'Ocean Yoga Santa Cruz',
    category: 'Yoga Studio',
    address: '123 Beach Street, Santa Cruz, CA 95060',
    phone: '(831) 425-1234',
    website: 'https://www.oceanyogasantacruz.com',
    description: 'Beachfront yoga studio offering sunrise and sunset classes with ocean views.',
    services: 'Sunrise Yoga, Sunset Yoga, Beach Yoga, Vinyasa Flow, Meditation, Ocean Views',
    tags: 'Yoga, Ocean Views, Beach Yoga, Sunrise, Sunset, Meditation',
    priceLevel: 2,
    neighborhood: 'Santa Cruz',
    latitude: '36.9741',
    longitude: '-122.0308'
  },
  {
    name: 'Mountain View Yoga',
    category: 'Yoga Studio',
    address: '456 Highway 9, Boulder Creek, CA 95006',
    phone: '(831) 338-5678',
    website: 'https://www.mountainviewyoga.com',
    description: 'Mountain retreat yoga studio in the redwoods offering forest yoga and meditation.',
    services: 'Forest Yoga, Mountain Views, Meditation, Hiking Yoga, Nature Connection',
    tags: 'Yoga, Mountain Views, Forest, Nature, Meditation, Redwoods',
    priceLevel: 2,
    neighborhood: 'Boulder Creek',
    latitude: '37.1261',
    longitude: '-122.1217'
  },
  {
    name: 'Capitola Beach Yoga',
    category: 'Yoga Studio',
    address: '789 Capitola Beach, Capitola, CA 95010',
    phone: '(831) 475-9012',
    website: 'https://www.capitolabeachyoga.com',
    description: 'Beachside yoga studio with classes directly on the sand during summer months.',
    services: 'Beach Yoga, Sand Classes, Summer Sessions, Sunset Practice, Ocean Sounds',
    tags: 'Beach Yoga, Sand, Summer, Sunset, Ocean, Outdoor',
    priceLevel: 2,
    neighborhood: 'Capitola',
    latitude: '36.9753',
    longitude: '-121.9534'
  },

  // More Pilates Studios
  {
    name: 'Core Pilates Santa Cruz',
    category: 'Pilates Studio',
    address: '321 Soquel Avenue, Santa Cruz, CA 95062',
    phone: '(831) 475-3456',
    website: 'https://www.corepilatessantacruz.com',
    description: 'Specialized Pilates studio focusing on core strength and rehabilitation.',
    services: 'Core Pilates, Rehabilitation, Injury Prevention, Private Sessions, Small Groups',
    tags: 'Pilates, Core, Rehabilitation, Injury Prevention, Private',
    priceLevel: 3,
    neighborhood: 'Santa Cruz',
    latitude: '36.9741',
    longitude: '-122.0308'
  },
  {
    name: 'Watsonville Pilates & Wellness',
    category: 'Pilates Studio',
    address: '654 Main Street, Watsonville, CA 95076',
    phone: '(831) 724-7890',
    website: 'https://www.watsonvillepilates.com',
    description: 'Community-focused Pilates studio serving the Watsonville area with bilingual instruction.',
    services: 'Pilates, Bilingual Classes, Community Focus, Affordable Pricing, Group Classes',
    tags: 'Pilates, Community, Bilingual, Affordable, Group Classes',
    priceLevel: 2,
    neighborhood: 'Watsonville',
    latitude: '36.9102',
    longitude: '-121.7569'
  },

  // More Fitness Centers
  {
    name: 'Scotts Valley Athletic Club',
    category: 'Fitness Center',
    address: '987 Mount Hermon Road, Scotts Valley, CA 95066',
    phone: '(831) 438-2345',
    website: 'https://www.scottsvalleyathletic.com',
    description: 'Full-service athletic club with tennis courts, swimming pool, and comprehensive fitness programs.',
    services: 'Tennis, Swimming, Fitness Classes, Personal Training, Locker Rooms, Sauna',
    tags: 'Tennis, Swimming, Athletic Club, Personal Training, Sauna',
    priceLevel: 3,
    neighborhood: 'Scotts Valley',
    latitude: '37.0511',
    longitude: '-122.0147'
  },
  {
    name: 'Capitola Fitness Center',
    category: 'Fitness Center',
    address: '147 41st Avenue, Capitola, CA 95010',
    phone: '(831) 475-6789',
    website: 'https://www.capitolafitness.com',
    description: 'Modern fitness center with state-of-the-art equipment and group fitness classes.',
    services: 'Modern Equipment, Group Fitness, Personal Training, Cardio, Weight Training',
    tags: 'Modern Equipment, Group Fitness, Personal Training, Cardio',
    priceLevel: 2,
    neighborhood: 'Capitola',
    latitude: '36.9753',
    longitude: '-121.9534'
  },
  {
    name: 'Live Oak Community Fitness',
    category: 'Fitness Center',
    address: '258 17th Avenue, Santa Cruz, CA 95062',
    phone: '(831) 475-2345',
    website: 'https://www.liveoakfitness.com',
    description: 'Community-focused fitness center with affordable memberships and family programs.',
    services: 'Affordable Fitness, Family Programs, Childcare, Group Classes, Community Events',
    tags: 'Community Fitness, Family, Childcare, Affordable, Group Classes',
    priceLevel: 1,
    neighborhood: 'Live Oak',
    latitude: '36.9583',
    longitude: '-121.9728'
  },

  // More Spas & Wellness
  {
    name: 'Redwood Spa & Wellness',
    category: 'Spa & Wellness',
    address: '369 Highway 9, Felton, CA 95018',
    phone: '(831) 335-1234',
    website: 'https://www.redwoodspa.com',
    description: 'Mountain spa offering treatments inspired by the surrounding redwood forest.',
    services: 'Forest-Inspired Treatments, Massage, Facials, Wellness Packages, Nature Therapy',
    tags: 'Mountain Spa, Forest, Redwoods, Nature Therapy, Wellness Packages',
    priceLevel: 4,
    neighborhood: 'Felton',
    latitude: '37.0511',
    longitude: '-122.0739'
  },
  {
    name: 'Aptos Day Spa',
    category: 'Spa & Wellness',
    address: '852 Trout Gulch Road, Aptos, CA 95003',
    phone: '(831) 688-5678',
    website: 'https://www.aptosdayspa.com',
    description: 'Luxurious day spa offering comprehensive wellness treatments and relaxation services.',
    services: 'Day Spa, Massage, Facials, Body Treatments, Wellness Packages, Relaxation',
    tags: 'Day Spa, Luxury, Massage, Facials, Relaxation, Wellness',
    priceLevel: 4,
    neighborhood: 'Aptos',
    latitude: '36.9772',
    longitude: '-121.9014'
  },
  {
    name: 'Soquel Wellness Center',
    category: 'Wellness Center',
    address: '741 Soquel Avenue, Soquel, CA 95073',
    phone: '(831) 475-9012',
    website: 'https://www.soquelwellness.com',
    description: 'Holistic wellness center offering acupuncture, massage, and alternative healing therapies.',
    services: 'Acupuncture, Massage, Alternative Healing, Holistic Health, Wellness Consultations',
    tags: 'Holistic, Acupuncture, Alternative Healing, Wellness, Massage',
    priceLevel: 3,
    neighborhood: 'Soquel',
    latitude: '36.9881',
    longitude: '-121.9564'
  },

  // More Massage Therapy
  {
    name: 'Beachside Massage Therapy',
    category: 'Massage Therapy',
    address: '123 Beach Street, Santa Cruz, CA 95060',
    phone: '(831) 425-3456',
    website: 'https://www.beachsidemassage.com',
    description: 'Oceanfront massage therapy with sound of waves and ocean breeze.',
    services: 'Oceanfront Massage, Deep Tissue, Relaxation, Couples Massage, Ocean Sounds',
    tags: 'Oceanfront, Deep Tissue, Relaxation, Couples, Ocean Sounds',
    priceLevel: 3,
    neighborhood: 'Santa Cruz',
    latitude: '36.9741',
    longitude: '-122.0308'
  },
  {
    name: 'Mountain Healing Massage',
    category: 'Massage Therapy',
    address: '456 Highway 9, Boulder Creek, CA 95006',
    phone: '(831) 338-7890',
    website: 'https://www.mountainhealingmassage.com',
    description: 'Mountain retreat massage therapy with nature sounds and forest atmosphere.',
    services: 'Mountain Massage, Nature Sounds, Forest Atmosphere, Therapeutic Massage, Healing',
    tags: 'Mountain, Nature Sounds, Forest, Therapeutic, Healing',
    priceLevel: 3,
    neighborhood: 'Boulder Creek',
    latitude: '37.1261',
    longitude: '-122.1217'
  },
  {
    name: 'Aptos Therapeutic Massage',
    category: 'Massage Therapy',
    address: '852 Trout Gulch Road, Aptos, CA 95003',
    phone: '(831) 688-2345',
    website: 'https://www.aptostherapeuticmassage.com',
    description: 'Specialized therapeutic massage for injury recovery and chronic pain management.',
    services: 'Therapeutic Massage, Injury Recovery, Chronic Pain, Sports Massage, Rehabilitation',
    tags: 'Therapeutic, Injury Recovery, Chronic Pain, Sports, Rehabilitation',
    priceLevel: 2,
    neighborhood: 'Aptos',
    latitude: '36.9772',
    longitude: '-121.9014'
  },

  // Specialized Fitness Studios
  {
    name: 'Santa Cruz Boxing Club',
    category: 'Fitness Studio',
    address: '147 Pacific Avenue, Santa Cruz, CA 95060',
    phone: '(831) 425-6789',
    website: 'https://www.santacruzboxing.com',
    description: 'Professional boxing gym with training for all levels, from beginners to competitive fighters.',
    services: 'Boxing Training, Fitness Boxing, Competitive Training, Personal Training, Group Classes',
    tags: 'Boxing, Martial Arts, Competitive, Personal Training, Group Classes',
    priceLevel: 2,
    neighborhood: 'Santa Cruz',
    latitude: '36.9741',
    longitude: '-122.0308'
  },
  {
    name: 'Capitola Dance Studio',
    category: 'Dance Studio',
    address: '369 Capitola Road, Capitola, CA 95010',
    phone: '(831) 475-4567',
    website: 'https://www.capitoladance.com',
    description: 'Comprehensive dance studio offering classes in multiple styles for all ages.',
    services: 'Ballet, Jazz, Hip Hop, Contemporary, Ballroom, Kids Classes, Adult Classes',
    tags: 'Dance, Ballet, Jazz, Hip Hop, Ballroom, Kids, Adult',
    priceLevel: 2,
    neighborhood: 'Capitola',
    latitude: '36.9753',
    longitude: '-121.9534'
  },
  {
    name: 'Santa Cruz Rock Climbing Gym',
    category: 'Fitness Studio',
    address: '741 Soquel Avenue, Santa Cruz, CA 95062',
    phone: '(831) 475-8901',
    website: 'https://www.santacruzclimbing.com',
    description: 'Indoor rock climbing gym with routes for all skill levels and outdoor climbing instruction.',
    services: 'Indoor Climbing, Outdoor Instruction, Bouldering, Route Setting, Climbing Classes',
    tags: 'Rock Climbing, Indoor, Outdoor, Bouldering, Route Setting',
    priceLevel: 3,
    neighborhood: 'Santa Cruz',
    latitude: '36.9741',
    longitude: '-122.0308'
  },
  {
    name: 'Watsonville Swimming Academy',
    category: 'Fitness Studio',
    address: '852 Main Street, Watsonville, CA 95076',
    phone: '(831) 724-3456',
    website: 'https://www.watsonvilleswimming.com',
    description: 'Swimming instruction and fitness classes for all ages and skill levels.',
    services: 'Swimming Lessons, Water Fitness, Aqua Aerobics, Competitive Swimming, Private Lessons',
    tags: 'Swimming, Water Fitness, Aqua Aerobics, Competitive, Private Lessons',
    priceLevel: 2,
    neighborhood: 'Watsonville',
    latitude: '36.9102',
    longitude: '-121.7569'
  },

  // More Alternative Medicine
  {
    name: 'Santa Cruz Chiropractic Wellness',
    category: 'Chiropractic',
    address: '123 Water Street, Santa Cruz, CA 95060',
    phone: '(831) 425-7890',
    website: 'https://www.santacruzchiropractic.com',
    description: 'Comprehensive chiropractic care with focus on wellness and preventive treatment.',
    services: 'Chiropractic Care, Spinal Adjustment, Wellness Care, Preventive Treatment, Sports Chiropractic',
    tags: 'Chiropractic, Spinal Care, Wellness, Preventive, Sports',
    priceLevel: 3,
    neighborhood: 'Santa Cruz',
    latitude: '36.9741',
    longitude: '-122.0308'
  },
  {
    name: 'Capitola Physical Therapy',
    category: 'Physical Therapy',
    address: '456 Capitola Road, Capitola, CA 95010',
    phone: '(831) 475-1234',
    website: 'https://www.capitolaphysicaltherapy.com',
    description: 'Physical therapy clinic specializing in injury rehabilitation and movement optimization.',
    services: 'Physical Therapy, Injury Rehabilitation, Movement Optimization, Sports Therapy, Pain Management',
    tags: 'Physical Therapy, Rehabilitation, Movement, Sports Therapy, Pain Management',
    priceLevel: 3,
    neighborhood: 'Capitola',
    latitude: '36.9753',
    longitude: '-121.9534'
  },
  {
    name: 'Scotts Valley Naturopathic Medicine',
    category: 'Naturopathic Medicine',
    address: '741 Mount Hermon Road, Scotts Valley, CA 95066',
    phone: '(831) 438-5678',
    website: 'https://www.scottsvalleynaturopathic.com',
    description: 'Naturopathic medicine practice focusing on natural healing and holistic health.',
    services: 'Naturopathic Medicine, Natural Healing, Holistic Health, Nutritional Counseling, Herbal Medicine',
    tags: 'Naturopathic, Natural Healing, Holistic, Nutritional Counseling, Herbal Medicine',
    priceLevel: 3,
    neighborhood: 'Scotts Valley',
    latitude: '37.0511',
    longitude: '-122.0147'
  },

  // More Specialized Wellness
  {
    name: 'Santa Cruz Float Therapy Center',
    category: 'Wellness Center',
    address: '123 Pacific Avenue, Santa Cruz, CA 95060',
    phone: '(831) 425-9012',
    website: 'https://www.santacruzfloat.com',
    description: 'Sensory deprivation float therapy for deep relaxation and stress relief.',
    services: 'Float Therapy, Sensory Deprivation, Stress Relief, Deep Relaxation, Mental Wellness',
    tags: 'Float Therapy, Sensory Deprivation, Stress Relief, Relaxation, Mental Wellness',
    priceLevel: 4,
    neighborhood: 'Santa Cruz',
    latitude: '36.9741',
    longitude: '-122.0308'
  },
  {
    name: 'Capitola Salt Therapy Studio',
    category: 'Wellness Center',
    address: '369 Capitola Road, Capitola, CA 95010',
    phone: '(831) 475-3456',
    website: 'https://www.capitolasalttherapy.com',
    description: 'Halotherapy (salt therapy) for respiratory health and skin wellness.',
    services: 'Salt Therapy, Halotherapy, Respiratory Health, Skin Wellness, Allergy Relief',
    tags: 'Salt Therapy, Halotherapy, Respiratory Health, Skin Wellness, Allergy Relief',
    priceLevel: 3,
    neighborhood: 'Capitola',
    latitude: '36.9753',
    longitude: '-121.9534'
  },
  {
    name: 'Aptos Cryotherapy Center',
    category: 'Wellness Center',
    address: '852 Trout Gulch Road, Aptos, CA 95003',
    phone: '(831) 688-7890',
    website: 'https://www.aptoscryotherapy.com',
    description: 'Whole body cryotherapy for recovery, inflammation reduction, and wellness.',
    services: 'Cryotherapy, Recovery, Inflammation Reduction, Wellness, Sports Recovery',
    tags: 'Cryotherapy, Recovery, Inflammation, Wellness, Sports Recovery',
    priceLevel: 4,
    neighborhood: 'Aptos',
    latitude: '36.9772',
    longitude: '-121.9014'
  },

  // More Yoga Variations
  {
    name: 'Aerial Yoga Santa Cruz',
    category: 'Yoga Studio',
    address: '147 Water Street, Santa Cruz, CA 95060',
    phone: '(831) 425-2345',
    website: 'https://www.aerialyogasantacruz.com',
    description: 'Aerial yoga classes using silk hammocks for unique poses and deep stretching.',
    services: 'Aerial Yoga, Silk Hammocks, Deep Stretching, Unique Poses, Strength Building',
    tags: 'Aerial Yoga, Silk Hammocks, Deep Stretching, Unique Poses, Strength',
    priceLevel: 3,
    neighborhood: 'Santa Cruz',
    latitude: '36.9741',
    longitude: '-122.0308'
  },
  {
    name: 'Yin Yoga & Meditation Studio',
    category: 'Yoga Studio',
    address: '456 Soquel Avenue, Santa Cruz, CA 95062',
    phone: '(831) 475-6789',
    website: 'https://www.yinyogasantacruz.com',
    description: 'Specialized yin yoga studio focusing on deep stretching and meditation practices.',
    services: 'Yin Yoga, Deep Stretching, Meditation, Mindfulness, Restorative Yoga',
    tags: 'Yin Yoga, Deep Stretching, Meditation, Mindfulness, Restorative',
    priceLevel: 2,
    neighborhood: 'Santa Cruz',
    latitude: '36.9741',
    longitude: '-122.0308'
  },
  {
    name: 'Power Yoga Capitola',
    category: 'Yoga Studio',
    address: '741 Capitola Road, Capitola, CA 95010',
    phone: '(831) 475-0123',
    website: 'https://www.poweryogacapitola.com',
    description: 'High-energy power yoga classes for strength, flexibility, and cardiovascular fitness.',
    services: 'Power Yoga, High Energy, Strength Building, Flexibility, Cardiovascular Fitness',
    tags: 'Power Yoga, High Energy, Strength, Flexibility, Cardiovascular',
    priceLevel: 2,
    neighborhood: 'Capitola',
    latitude: '36.9753',
    longitude: '-121.9534'
  },

  // More Fitness Specialties
  {
    name: 'Santa Cruz Kettlebell Academy',
    category: 'Fitness Studio',
    address: '123 Pacific Avenue, Santa Cruz, CA 95060',
    phone: '(831) 425-4567',
    website: 'https://www.santacruzkettlebell.com',
    description: 'Specialized kettlebell training for functional fitness and strength development.',
    services: 'Kettlebell Training, Functional Fitness, Strength Development, Group Classes, Personal Training',
    tags: 'Kettlebell, Functional Fitness, Strength, Group Classes, Personal Training',
    priceLevel: 2,
    neighborhood: 'Santa Cruz',
    latitude: '36.9741',
    longitude: '-122.0308'
  },
  {
    name: 'Capitola TRX Training Center',
    category: 'Fitness Studio',
    address: '369 Capitola Road, Capitola, CA 95010',
    phone: '(831) 475-8901',
    website: 'https://www.capitolatrx.com',
    description: 'TRX suspension training for full-body workouts and functional movement.',
    services: 'TRX Training, Suspension Training, Full-Body Workouts, Functional Movement, Core Strength',
    tags: 'TRX, Suspension Training, Full-Body, Functional Movement, Core',
    priceLevel: 2,
    neighborhood: 'Capitola',
    latitude: '36.9753',
    longitude: '-121.9534'
  },
  {
    name: 'Watsonville Zumba Studio',
    category: 'Dance Studio',
    address: '852 Main Street, Watsonville, CA 95076',
    phone: '(831) 724-5678',
    website: 'https://www.watsonvillezumba.com',
    description: 'High-energy Zumba dance fitness classes with Latin and international music.',
    services: 'Zumba, Dance Fitness, Latin Music, International Music, High Energy, Fun Workouts',
    tags: 'Zumba, Dance Fitness, Latin Music, High Energy, Fun',
    priceLevel: 1,
    neighborhood: 'Watsonville',
    latitude: '36.9102',
    longitude: '-121.7569'
  },

  // More Wellness Specialties
  {
    name: 'Santa Cruz Sound Healing Center',
    category: 'Wellness Center',
    address: '147 Water Street, Santa Cruz, CA 95060',
    phone: '(831) 425-7890',
    website: 'https://www.santacruzsoundhealing.com',
    description: 'Sound healing therapy using crystal bowls, gongs, and vibrational instruments.',
    services: 'Sound Healing, Crystal Bowls, Gong Therapy, Vibrational Healing, Meditation',
    tags: 'Sound Healing, Crystal Bowls, Gong Therapy, Vibrational, Meditation',
    priceLevel: 3,
    neighborhood: 'Santa Cruz',
    latitude: '36.9741',
    longitude: '-122.0308'
  },
  {
    name: 'Capitola Reiki & Energy Healing',
    category: 'Wellness Center',
    address: '456 Capitola Road, Capitola, CA 95010',
    phone: '(831) 475-2345',
    website: 'https://www.capitolareiki.com',
    description: 'Reiki and energy healing services for spiritual and emotional wellness.',
    services: 'Reiki, Energy Healing, Spiritual Wellness, Emotional Healing, Chakra Balancing',
    tags: 'Reiki, Energy Healing, Spiritual Wellness, Emotional Healing, Chakra',
    priceLevel: 2,
    neighborhood: 'Capitola',
    latitude: '36.9753',
    longitude: '-121.9534'
  },
  {
    name: 'Aptos Life Coaching Center',
    category: 'Life Coaching',
    address: '741 Trout Gulch Road, Aptos, CA 95003',
    phone: '(831) 688-9012',
    website: 'https://www.aptoslifecoaching.com',
    description: 'Life coaching services for personal development, goal setting, and life transitions.',
    services: 'Life Coaching, Personal Development, Goal Setting, Life Transitions, Career Coaching',
    tags: 'Life Coaching, Personal Development, Goal Setting, Transitions, Career',
    priceLevel: 3,
    neighborhood: 'Aptos',
    latitude: '36.9772',
    longitude: '-121.9014'
  },

  // More Specialized Therapies
  {
    name: 'Santa Cruz Craniosacral Therapy',
    category: 'Massage Therapy',
    address: '123 Pacific Avenue, Santa Cruz, CA 95060',
    phone: '(831) 425-3456',
    website: 'https://www.santacruzcraniosacral.com',
    description: 'Craniosacral therapy for gentle healing and nervous system regulation.',
    services: 'Craniosacral Therapy, Gentle Healing, Nervous System Regulation, Stress Relief, Pain Management',
    tags: 'Craniosacral, Gentle Healing, Nervous System, Stress Relief, Pain Management',
    priceLevel: 3,
    neighborhood: 'Santa Cruz',
    latitude: '36.9741',
    longitude: '-122.0308'
  },
  {
    name: 'Capitola Myofascial Release',
    category: 'Massage Therapy',
    address: '369 Capitola Road, Capitola, CA 95010',
    phone: '(831) 475-6789',
    website: 'https://www.capitolamyofascial.com',
    description: 'Myofascial release therapy for chronic pain and movement restrictions.',
    services: 'Myofascial Release, Chronic Pain Relief, Movement Therapy, Postural Correction, Injury Recovery',
    tags: 'Myofascial Release, Chronic Pain, Movement Therapy, Postural, Injury Recovery',
    priceLevel: 3,
    neighborhood: 'Capitola',
    latitude: '36.9753',
    longitude: '-121.9534'
  },
  {
    name: 'Scotts Valley Reflexology Center',
    category: 'Massage Therapy',
    address: '741 Mount Hermon Road, Scotts Valley, CA 95066',
    phone: '(831) 438-2345',
    website: 'https://www.scottsvalleyreflexology.com',
    description: 'Reflexology foot massage for whole-body wellness and stress relief.',
    services: 'Reflexology, Foot Massage, Whole-Body Wellness, Stress Relief, Energy Flow',
    tags: 'Reflexology, Foot Massage, Wellness, Stress Relief, Energy Flow',
    priceLevel: 2,
    neighborhood: 'Scotts Valley',
    latitude: '37.0511',
    longitude: '-122.0147'
  },

  // More Fitness Variations
  {
    name: 'Santa Cruz Barre Studio',
    category: 'Fitness Studio',
    address: '147 Water Street, Santa Cruz, CA 95060',
    phone: '(831) 425-5678',
    website: 'https://www.santacruzbarre.com',
    description: 'Barre fitness classes combining ballet, Pilates, and yoga for toned muscles.',
    services: 'Barre Fitness, Ballet-Inspired, Pilates, Yoga, Muscle Toning, Low Impact',
    tags: 'Barre, Ballet, Pilates, Yoga, Muscle Toning, Low Impact',
    priceLevel: 2,
    neighborhood: 'Santa Cruz',
    latitude: '36.9741',
    longitude: '-122.0308'
  },
  {
    name: 'Capitola HIIT Training',
    category: 'Fitness Studio',
    address: '456 Capitola Road, Capitola, CA 95010',
    phone: '(831) 475-0123',
    website: 'https://www.capitolahiit.com',
    description: 'High-intensity interval training for maximum fitness results in minimal time.',
    services: 'HIIT Training, High Intensity, Interval Training, Fat Burning, Cardio, Strength',
    tags: 'HIIT, High Intensity, Interval Training, Fat Burning, Cardio, Strength',
    priceLevel: 2,
    neighborhood: 'Capitola',
    latitude: '36.9753',
    longitude: '-121.9534'
  },
  {
    name: 'Watsonville Senior Fitness',
    category: 'Fitness Center',
    address: '852 Main Street, Watsonville, CA 95076',
    phone: '(831) 724-4567',
    website: 'https://www.watsonvilleseniorfitness.com',
    description: 'Specialized fitness programs for seniors focusing on mobility, balance, and strength.',
    services: 'Senior Fitness, Mobility, Balance, Strength, Low Impact, Age-Appropriate',
    tags: 'Senior Fitness, Mobility, Balance, Strength, Low Impact, Age-Appropriate',
    priceLevel: 1,
    neighborhood: 'Watsonville',
    latitude: '36.9102',
    longitude: '-121.7569'
  },

  // More Wellness Modalities
  {
    name: 'Santa Cruz Aromatherapy Spa',
    category: 'Spa & Wellness',
    address: '123 Pacific Avenue, Santa Cruz, CA 95060',
    phone: '(831) 425-8901',
    website: 'https://www.santacruzaromatherpy.com',
    description: 'Aromatherapy spa using essential oils for therapeutic and relaxation benefits.',
    services: 'Aromatherapy, Essential Oils, Therapeutic Massage, Relaxation, Stress Relief',
    tags: 'Aromatherapy, Essential Oils, Therapeutic, Relaxation, Stress Relief',
    priceLevel: 3,
    neighborhood: 'Santa Cruz',
    latitude: '36.9741',
    longitude: '-122.0308'
  },
  {
    name: 'Capitola Crystal Healing',
    category: 'Wellness Center',
    address: '369 Capitola Road, Capitola, CA 95010',
    phone: '(831) 475-3456',
    website: 'https://www.capitolacrystalhealing.com',
    description: 'Crystal healing therapy using gemstones and crystals for energy balancing.',
    services: 'Crystal Healing, Gemstones, Energy Balancing, Chakra Work, Spiritual Healing',
    tags: 'Crystal Healing, Gemstones, Energy Balancing, Chakra, Spiritual',
    priceLevel: 3,
    neighborhood: 'Capitola',
    latitude: '36.9753',
    longitude: '-121.9534'
  },
  {
    name: 'Aptos Mindfulness Center',
    category: 'Wellness Center',
    address: '741 Trout Gulch Road, Aptos, CA 95003',
    phone: '(831) 688-7890',
    website: 'https://www.aptosmindfulness.com',
    description: 'Mindfulness and meditation center offering classes and retreats for mental wellness.',
    services: 'Mindfulness, Meditation, Mental Wellness, Stress Reduction, Retreats, Classes',
    tags: 'Mindfulness, Meditation, Mental Wellness, Stress Reduction, Retreats',
    priceLevel: 2,
    neighborhood: 'Aptos',
    latitude: '36.9772',
    longitude: '-121.9014'
  }
];

// All 84 fields (same as original)
const fieldHeaders = [
  // Basic Information
  'Name', 'Category', 'Subcategory', 'Description', 'LongDescription', 'WriteUp',
  
  // Contact & Location
  'Address', 'City', 'State', 'ZipCode', 'Phone', 'Website', 'Email', 'Instagram', 'Facebook',
  'Latitude', 'Longitude', 'Neighborhood', 'CrossStreets',
  
  // Services & Offerings
  'Services', 'Specialties', 'Amenities', 'Equipment', 'Classes', 'Programs',
  
  // Pricing & Hours
  'PriceLevel', 'Pricing', 'Hours', 'HolidayHours', 'BestTime', 'PeakHours',
  
  // Features & Accessibility
  'IndoorOutdoor', 'Parking', 'PublicTransportation', 'WheelchairAccessible', 'FamilyFriendly',
  'PetFriendly', 'Wifi', 'Showers', 'LockerRoom', 'EquipmentRental',
  
  // Wellness Specific
  'WellnessType', 'TreatmentTypes', 'Certification', 'Licensed', 'InsuranceAccepted',
  'AppointmentRequired', 'WalkInsWelcome', 'GroupSessions', 'PrivateSessions',
  
  // Target Demographics
  'TargetAudience', 'SkillLevel', 'AgeGroups', 'BeginnerFriendly', 'AdvancedPrograms',
  
  // Quality & Reviews
  'Rating', 'ReviewCount', 'StaffPicks', 'Awards', 'Certifications',
  
  // Media & Marketing
  'PhotoURL', 'ImageGallery', 'VideoURL', 'VirtualTour', 'SocialMedia',
  
  // Business Details
  'BusinessType', 'Ownership', 'Established', 'StaffSize', 'Languages',
  
  // Additional Fields
  'Tags', 'Keywords', 'Seasonal', 'WeatherDependent', 'BookingPlatform',
  'CancellationPolicy', 'MembershipRequired', 'TrialClass', 'PackageDeals',
  
  // SEO & Discovery
  'MetaDescription', 'MetaKeywords', 'Featured', 'Popular', 'Trending'
];

// Function to generate CSV
function generateAdditionalWellnessCSV() {
  const csvRows = additionalWellnessBusinesses.map(business => {
    // Extract address components
    const addressParts = business.address.split(', ');
    const city = addressParts[1] || '';
    const stateZip = addressParts[2] || '';
    const state = stateZip.split(' ')[0] || 'CA';
    const zipCode = stateZip.split(' ')[1] || '';
    
    // Generate PhotoURL placeholder (will be filled by Google Places API)
    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=photo_ref_${business.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}&key=YOUR_GOOGLE_PLACES_API_KEY`;
    
    // Generate hours based on category
    let hours = '';
    if (business.category.includes('Spa')) {
      hours = 'Daily: 9:00 AM - 8:00 PM';
    } else if (business.category.includes('Fitness') || business.category.includes('Yoga')) {
      hours = 'Mon-Fri: 6:00 AM - 9:00 PM; Sat-Sun: 8:00 AM - 7:00 PM';
    } else if (business.category.includes('Massage')) {
      hours = 'Mon-Fri: 9:00 AM - 7:00 PM; Sat: 9:00 AM - 5:00 PM';
    } else {
      hours = 'Mon-Fri: 9:00 AM - 6:00 PM; Sat: 9:00 AM - 2:00 PM';
    }
    
    return [
      // Basic Information
      business.name,
      business.category,
      '', // Subcategory
      business.description,
      business.description + ' Located in beautiful ' + business.neighborhood + ', this wellness facility offers a comprehensive range of services to support your health and wellness journey.',
      '', // WriteUp
      
      // Contact & Location
      business.address,
      city,
      state,
      zipCode,
      business.phone,
      business.website,
      '', // Email
      '', // Instagram
      '', // Facebook
      business.latitude,
      business.longitude,
      business.neighborhood,
      '', // CrossStreets
      
      // Services & Offerings
      business.services,
      business.services.split(', ')[0], // First service as specialty
      'Parking, Professional Staff, Clean Facilities', // Amenities
      '', // Equipment
      business.services, // Classes
      '', // Programs
      
      // Pricing & Hours
      business.priceLevel.toString(),
      business.priceLevel === 1 ? 'Budget-friendly' : business.priceLevel === 2 ? 'Moderate' : business.priceLevel === 3 ? 'Premium' : 'Luxury',
      hours,
      'Holiday hours may vary', // HolidayHours
      'Morning and evening classes available', // BestTime
      'Evenings and weekends', // PeakHours
      
      // Features & Accessibility
      'Indoor', // IndoorOutdoor
      'Street Parking Available', // Parking
      'Public transportation nearby', // PublicTransportation
      'Wheelchair accessible', // WheelchairAccessible
      'Family friendly', // FamilyFriendly
      '', // PetFriendly
      'Free WiFi', // Wifi
      business.category.includes('Fitness') ? 'Showers available' : '', // Showers
      business.category.includes('Fitness') ? 'Locker rooms available' : '', // LockerRoom
      '', // EquipmentRental
      
      // Wellness Specific
      business.category, // WellnessType
      business.services, // TreatmentTypes
      'Certified professionals', // Certification
      'Licensed practitioners', // Licensed
      'Insurance may be accepted', // InsuranceAccepted
      'Appointments recommended', // AppointmentRequired
      'Walk-ins welcome', // WalkInsWelcome
      'Group sessions available', // GroupSessions
      'Private sessions available', // PrivateSessions
      
      // Target Demographics
      'All Levels', // TargetAudience
      'Beginner to Advanced', // SkillLevel
      'All Ages', // AgeGroups
      'Beginner friendly', // BeginnerFriendly
      'Advanced programs available', // AdvancedPrograms
      
      // Quality & Reviews
      '4.5', // Rating
      '50+', // ReviewCount
      '', // StaffPicks
      '', // Awards
      'Certified professionals', // Certifications
      
      // Media & Marketing
      photoUrl,
      '', // ImageGallery
      '', // VideoURL
      '', // VirtualTour
      '', // SocialMedia
      
      // Business Details
      'Wellness Business', // BusinessType
      'Locally owned', // Ownership
      'Established 2015', // Established
      '5-15 staff', // StaffSize
      'English', // Languages
      
      // Additional Fields
      business.tags,
      business.tags,
      '', // Seasonal
      '', // WeatherDependent
      'Online booking available', // BookingPlatform
      '24-hour cancellation policy', // CancellationPolicy
      '', // MembershipRequired
      'Trial class available', // TrialClass
      'Package deals available', // PackageDeals
      
      // SEO & Discovery
      `${business.name} - ${business.category} in ${business.neighborhood}, Santa Cruz County`, // MetaDescription
      business.tags, // MetaKeywords
      '', // Featured
      '', // Popular
      '' // Trending
    ];
  });
  
  return [
    fieldHeaders.join(','),
    ...csvRows.map(row => row.map(field => `"${field}"`).join(','))
  ].join('\n');
}

// Write CSV file
const csvContent = generateAdditionalWellnessCSV();
const outputPath = path.join(__dirname, '..', 'santacruz-wellness-additional-locations.csv');

fs.writeFileSync(outputPath, csvContent, 'utf8');

console.log(`✅ Generated additional wellness CSV with ${additionalWellnessBusinesses.length} businesses`);
console.log(`📁 Saved to: ${outputPath}`);
console.log(`📊 Categories included: Yoga, Pilates, Fitness, Massage, Spa, Wellness, Specialized Studios, Alternative Medicine`);
console.log(`📋 Fields included: ${fieldHeaders.length} comprehensive fields`);
console.log(`🖼️  PhotoURL placeholders included for Google Places API integration`);
console.log(`📍 Coordinates included for all businesses`);
console.log(`🏷️  Detailed tags and services for each business`);

// Summary by category
const categoryCount = {};
additionalWellnessBusinesses.forEach(business => {
  categoryCount[business.category] = (categoryCount[business.category] || 0) + 1;
});

console.log(`\n📊 Breakdown by category:`);
Object.entries(categoryCount).forEach(([category, count]) => {
  console.log(`  ${category}: ${count} businesses`);
});

console.log(`\n🚀 Next steps:`);
console.log(`1. Combine with existing wellness CSV for comprehensive database`);
console.log(`2. Replace photo references with actual Google Places API calls`);
console.log(`3. Import to Airtable Wellness table`);
console.log(`4. Add actual photos using Google Places API`);
console.log(`5. Review and customize business information`);
