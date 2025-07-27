import { useState, useEffect } from 'react';
import { collection, doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Lesson } from '../types';
import { lessonsData } from '../data/lessons';

export const useFirestore = (userId: string = 'default') => {
  const [lessons, setLessons] = useState<Lesson[]>(lessonsData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userDoc = doc(db, 'users', userId);
    
    // Подписываемся на изменения в реальном времени
    const unsubscribe = onSnapshot(userDoc, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setLessons(data.lessons || lessonsData);
      } else {
        // Если документ не существует, создаем его с начальными данными
        setDoc(userDoc, { lessons: lessonsData });
        setLessons(lessonsData);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  const updateLesson = async (lessonId: number, updates: Partial<Lesson>) => {
    const updatedLessons = lessons.map(lesson => 
      lesson.id === lessonId ? { ...lesson, ...updates } : lesson
    );
    
    const userDoc = doc(db, 'users', userId);
    await setDoc(userDoc, { lessons: updatedLessons });
  };

  const toggleLesson = async (lessonId: number) => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson) {
      const updates: Partial<Lesson> = {
        completed: !lesson.completed,
        completedDate: !lesson.completed ? new Date().toISOString().split('T')[0] : undefined
      };
      await updateLesson(lessonId, updates);
    }
  };

  const updateLessonNotes = async (lessonId: number, notes: string) => {
    await updateLesson(lessonId, { notes });
  };

  return {
    lessons,
    loading,
    toggleLesson,
    updateLessonNotes
  };
}; 