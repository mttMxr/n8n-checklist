import { useState, useEffect } from 'react';
import { Lesson } from '../types';
import { lessonsData } from '../data/lessons';

export const useLocalStorage = () => {
  const [lessons, setLessons] = useState<Lesson[]>(() => {
    const saved = localStorage.getItem('n8n-lessons');
    return saved ? JSON.parse(saved) : lessonsData;
  });
  const [loading] = useState(false);

  useEffect(() => {
    localStorage.setItem('n8n-lessons', JSON.stringify(lessons));
  }, [lessons]);

  const toggleLesson = async (lessonId: number) => {
    setLessons(prev => prev.map(lesson => 
      lesson.id === lessonId 
        ? { 
            ...lesson, 
            completed: !lesson.completed,
            completedDate: !lesson.completed ? new Date().toISOString().split('T')[0] : undefined
          }
        : lesson
    ));
  };

  const updateLessonNotes = async (lessonId: number, notes: string) => {
    setLessons(prev => prev.map(lesson => 
      lesson.id === lessonId ? { ...lesson, notes } : lesson
    ));
  };

  return {
    lessons,
    loading,
    toggleLesson,
    updateLessonNotes
  };
}; 