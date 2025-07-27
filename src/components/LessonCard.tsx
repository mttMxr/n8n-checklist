import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Circle, Calendar, Edit3, X } from 'lucide-react';
import { Lesson } from '../types';

interface LessonCardProps {
  lesson: Lesson;
  onToggle: (id: number) => void;
  onUpdateNotes: (id: number, notes: string) => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({ lesson, onToggle, onUpdateNotes }) => {
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState(lesson.notes || '');

  const handleToggle = () => {
    onToggle(lesson.id);
  };

  const handleSaveNotes = () => {
    onUpdateNotes(lesson.id, notes);
    setShowNotes(false);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "🚀 Основы и настройка": "bg-green-100 text-green-800",
      "🔗 Интеграции и подключения": "bg-blue-100 text-blue-800",
      "⚙️ Продвинутые настройки": "bg-orange-100 text-orange-800",
      "🤖 Создание AI-агентов": "bg-purple-100 text-purple-800",
      "📱 Социальные сети": "bg-pink-100 text-pink-800",
      "🎨 Контент и медиа": "bg-red-100 text-red-800",
      "🔧 Продвинутые техники": "bg-gray-100 text-gray-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-xl p-4 shadow-md border-2 transition-all duration-300 ${
        lesson.completed ? 'border-green-200 bg-green-50' : 'border-gray-100 hover:border-blue-200'
      }`}
    >
      <div className="flex items-start space-x-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleToggle}
          className={`flex-shrink-0 mt-1 ${
            lesson.completed ? 'text-green-500' : 'text-gray-400 hover:text-blue-500'
          }`}
        >
          {lesson.completed ? (
            <CheckCircle size={24} className="animate-pulse" />
          ) : (
            <Circle size={24} />
          )}
        </motion.button>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={`font-medium text-sm leading-relaxed ${
                lesson.completed ? 'line-through text-gray-500' : 'text-gray-800'
              }`}>
                {lesson.title}
              </h3>
              
              <div className="flex items-center space-x-2 mt-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(lesson.category)}`}>
                  {lesson.category}
                </span>
                
                {lesson.completedDate && (
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar size={12} className="mr-1" />
                    {lesson.completedDate}
                  </div>
                )}
              </div>
              
              {lesson.notes && !showNotes && (
                <div className="mt-2 p-2 bg-blue-50 rounded-lg">
                  <p className="text-xs text-gray-600">{lesson.notes}</p>
                </div>
              )}
            </div>
            
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="flex-shrink-0 ml-2 p-1 text-gray-400 hover:text-blue-500 transition-colors"
            >
              <Edit3 size={16} />
            </button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {showNotes && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Заметки</span>
              <button
                onClick={() => setShowNotes(false)}
                className="text-gray-400 hover:text-red-500"
              >
                <X size={16} />
              </button>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Добавьте заметки к уроку..."
              className="w-full p-2 text-sm border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
            <div className="flex justify-end space-x-2 mt-2">
              <button
                onClick={() => setShowNotes(false)}
                className="px-3 py-1 text-xs text-gray-500 hover:text-gray-700"
              >
                Отмена
              </button>
              <button
                onClick={handleSaveNotes}
                className="px-3 py-1 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Сохранить
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}; 