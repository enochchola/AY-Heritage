
export type UserRole = 'MEMBER' | 'AY_LEADER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  progress: number; // 0-100
  joinedAt: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  level: 'Junior' | 'Senior';
  topic: string;
  year: number;
  completed: boolean;
  videoUrl?: string;
}

export interface Exam {
  id: string;
  title: string;
  lessonId: string;
  timeLimit: number; // in minutes
  questions: Question[];
  passingScore: number;
  attemptsAllowed: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  registeredCount: number;
  requirements: string[];
  type: 'Camp' | 'Outreach' | 'Drills' | 'Pathfinder' | 'Social';
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  priority: 'High' | 'Normal' | 'Low';
}

export interface ExamResult {
  id: string;
  userId: string;
  examId: string;
  score: number;
  passed: boolean;
  date: string;
}
