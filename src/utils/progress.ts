import { Lesson, ProgressStats } from '../types';

export const calculateProgress = (lessons: Lesson[]): ProgressStats => {
  const totalLessons = lessons.length;
  const completedLessons = lessons.filter(lesson => lesson.completed).length;
  const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Группировка по категориям
  const categoryStats: ProgressStats['categoryStats'] = {};
  
  lessons.forEach(lesson => {
    if (!categoryStats[lesson.category]) {
      categoryStats[lesson.category] = {
        total: 0,
        completed: 0,
        percentage: 0
      };
    }
    
    categoryStats[lesson.category].total++;
    if (lesson.completed) {
      categoryStats[lesson.category].completed++;
    }
  });

  // Расчет процентов для каждой категории
  Object.keys(categoryStats).forEach(category => {
    const stats = categoryStats[category];
    stats.percentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
  });

  return {
    totalLessons,
    completedLessons,
    percentage,
    categoryStats
  };
}; 