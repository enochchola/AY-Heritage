
import { User, Lesson, Activity, Announcement, Exam } from './types';

export const currentUser: User = {
  id: 'u1',
  name: 'John Miller',
  email: 'john.miller@sda.org',
  role: 'MEMBER',
  avatar: 'https://picsum.photos/seed/john/200',
  progress: 65,
  joinedAt: '2023-01-15'
};

export const mockLessons: Lesson[] = [
  {
    id: 'l1',
    title: 'The Great Disappointment',
    description: 'Understanding the events of October 22, 1844 and how they shaped our faith.',
    content: 'The Millerites expected Jesus to return in 1844. When He did not, it led to a period of intense Bible study...',
    level: 'Senior',
    topic: 'Heritage',
    year: 2024,
    completed: true,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'l2',
    title: 'Pioneers: James and Ellen White',
    description: 'Exploring the lives of our co-founders and their mission.',
    content: 'Ellen G. White was a prolific author and visionary whose writings continue to guide the church...',
    level: 'Senior',
    topic: 'Biography',
    year: 2024,
    completed: false
  },
  {
    id: 'l3',
    title: 'Sabbath Reform in the 19th Century',
    description: 'How the early believers discovered the seventh-day Sabbath.',
    content: 'Through study with Seventh Day Baptists, Rachel Oakes Preston introduced the Sabbath truth...',
    level: 'Junior',
    topic: 'Doctrines',
    year: 2023,
    completed: false
  }
];

export const mockActivities: Activity[] = [
  {
    id: 'a1',
    title: 'Regional Youth Camp 2024',
    description: 'A week of spiritual revival and outdoor skills at Pine Lake.',
    date: '2024-07-15',
    location: 'Pine Lake Conference Center',
    capacity: 200,
    registeredCount: 145,
    requirements: ['Full Uniform', 'Bible', 'Camping Gear'],
    type: 'Camp'
  },
  {
    id: 'a2',
    title: 'City-Wide Community Clean-up',
    description: 'Living the gospel through service to our neighbors.',
    date: '2024-04-20',
    location: 'Main St Community Park',
    capacity: 50,
    registeredCount: 22,
    requirements: ['Service T-shirt', 'Water Bottle'],
    type: 'Outreach'
  }
];

export const mockAnnouncements: Announcement[] = [
  {
    id: 'an1',
    title: 'AY Heritage Exam Next Sabbath',
    content: 'Please ensure you have completed Lesson 1-5 before taking the exam.',
    date: '2024-03-25',
    author: 'Pastor Sam',
    priority: 'High'
  },
  {
    id: 'an2',
    title: 'Uniform Inspection Reminder',
    content: 'Pathfinders, please have your Class A uniforms ready for inspection.',
    date: '2024-03-22',
    author: 'Director Sarah',
    priority: 'Normal'
  }
];

export const mockExams: Exam[] = [
  {
    id: 'e1',
    title: 'Adventist History 101',
    lessonId: 'l1',
    timeLimit: 15,
    passingScore: 70,
    attemptsAllowed: 3,
    questions: [
      {
        id: 'q1',
        text: 'Who is considered the primary visionary among the SDA pioneers?',
        options: ['William Miller', 'James White', 'Ellen White', 'Joseph Bates'],
        correctAnswer: 2
      },
      {
        id: 'q2',
        text: 'In what year was the Seventh-day Adventist Church officially organized?',
        options: ['1844', '1863', '1888', '1901'],
        correctAnswer: 1
      }
    ]
  }
];
