import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Share2, Trophy, BookOpen, Zap } from 'lucide-react';
import { useFirestore } from './hooks/useFirestore';
import { ProgressCard } from './components/ProgressCard';
import { LessonList } from './components/LessonList';
import { calculateProgress } from './utils/progress';
import './App.css';

function App() {
  const { lessons, loading, toggleLesson, updateLessonNotes } = useFirestore();
  const [activeTab, setActiveTab] = useState<'progress' | 'lessons'>('progress');
  const [showConfetti, setShowConfetti] = useState(false);

  const progress = calculateProgress(lessons);

  // Эффект для показа конфетти при 100% завершении
  useEffect(() => {
    if (progress.percentage === 100 && progress.completedLessons > 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [progress.percentage, progress.completedLessons]);

  const handleToggleLesson = async (id: number) => {
    await toggleLesson(id);
  };

  const handleUpdateNotes = async (id: number, notes: string) => {
    await updateLessonNotes(id, notes);
  };

  const exportToCSV = () => {
    const headers = ['№', 'Название урока', 'Категория', 'Выполнено', 'Дата прохождения', 'Заметки'];
    const csvContent = [
      headers.join(','),
      ...lessons.map(lesson => [
        lesson.id,
        `"${lesson.title}"`,
        lesson.category,
        lesson.completed ? 'Да' : 'Нет',
        lesson.completedDate || '',
        `"${lesson.notes || ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `n8n_checklist_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Конфетти эффект */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: -10,
                opacity: 1 
              }}
              animate={{ 
                y: window.innerHeight + 10,
                opacity: 0,
                rotate: Math.random() * 360
              }}
              transition={{ 
                duration: 3 + Math.random() * 2,
                ease: "easeOut"
              }}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            📚 Чек-лист курса n8n
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Интерактивный трекер прогресса для изучения n8n и создания AI-агентов
          </p>
        </motion.div>

        {/* Кнопки действий */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          <button
            onClick={exportToCSV}
            className="flex items-center space-x-2 px-6 py-3 bg-white text-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Download size={20} />
            <span>Экспорт CSV</span>
          </button>
          
          <button
            onClick={() => navigator.share?.({ 
              title: 'Чек-лист курса n8n',
              text: `Мой прогресс: ${progress.percentage}% (${progress.completedLessons}/${progress.totalLessons} уроков)`,
              url: window.location.href
            })}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Share2 size={20} />
            <span>Поделиться</span>
          </button>
        </motion.div>

        {/* Табы */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-2 shadow-lg">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('progress')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === 'progress'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Trophy size={20} />
                <span>Прогресс</span>
              </button>
              
              <button
                onClick={() => setActiveTab('lessons')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === 'lessons'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <BookOpen size={20} />
                <span>Уроки</span>
              </button>
            </div>
          </div>
        </div>

        {/* Контент */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'progress' ? (
            <div className="max-w-4xl mx-auto">
              <ProgressCard stats={progress} />
              
              {/* Достижения */}
              {progress.percentage === 100 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-2xl text-center shadow-lg"
                >
                  <Trophy size={48} className="mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">🎉 Поздравляем!</h2>
                  <p className="text-lg">Вы завершили весь курс n8n! Теперь вы готовы создавать мощные AI-агенты.</p>
                </motion.div>
              )}
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              <LessonList
                lessons={lessons}
                onToggle={handleToggleLesson}
                onUpdateNotes={handleUpdateNotes}
              />
            </div>
          )}
        </motion.div>

        {/* Футер */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-12 text-gray-500"
        >
          <p className="flex items-center justify-center space-x-2">
            <Zap size={16} />
            <span>Данные сохраняются в облаке автоматически</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
