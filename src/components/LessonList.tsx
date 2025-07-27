import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen } from 'lucide-react';
import { Lesson } from '../types';
import { categories } from '../data/lessons';
import { LessonCard } from './LessonCard';

interface LessonListProps {
  lessons: Lesson[];
  onToggle: (id: number) => void;
  onUpdateNotes: (id: number, notes: string) => void;
}

export const LessonList: React.FC<LessonListProps> = ({ lessons, onToggle, onUpdateNotes }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showCompleted, setShowCompleted] = useState(true);

  const filteredLessons = useMemo(() => {
    return lessons.filter(lesson => {
      const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || lesson.category === selectedCategory;
      const matchesCompletion = showCompleted || !lesson.completed;
      
      return matchesSearch && matchesCategory && matchesCompletion;
    });
  }, [lessons, searchTerm, selectedCategory, showCompleted]);

  const completedCount = lessons.filter(l => l.completed).length;
  const totalCount = lessons.length;

  return (
    <div className="space-y-6">
      {/* Фильтры */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Поиск */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Поиск уроков..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Фильтр по категориям */}
          <div className="flex-shrink-0">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Все категории</option>
              {categories.map(category => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Переключатель завершенных */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showCompleted"
              checked={showCompleted}
              onChange={(e) => setShowCompleted(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="showCompleted" className="text-sm text-gray-700">
              Показать завершенные
            </label>
          </div>
        </div>

        {/* Статистика */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Найдено уроков: {filteredLessons.length}</span>
            <span>Завершено: {completedCount}/{totalCount}</span>
          </div>
        </div>
      </div>

      {/* Список уроков */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredLessons.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-600 mb-2">Уроки не найдены</h3>
              <p className="text-gray-500">Попробуйте изменить фильтры поиска</p>
            </motion.div>
          ) : (
            filteredLessons.map((lesson) => (
              <motion.div
                key={lesson.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <LessonCard
                  lesson={lesson}
                  onToggle={onToggle}
                  onUpdateNotes={onUpdateNotes}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}; 