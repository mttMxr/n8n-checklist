export interface Lesson {
  id: number;
  title: string;
  category: string;
  completed: boolean;
  completedDate?: string;
  notes?: string;
}

export interface Category {
  name: string;
  icon: string;
  color: string;
  lessons: Lesson[];
}

export interface ProgressStats {
  totalLessons: number;
  completedLessons: number;
  percentage: number;
  categoryStats: {
    [key: string]: {
      total: number;
      completed: number;
      percentage: number;
    };
  };
} 