import React from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp } from 'lucide-react';
import { ProgressStats } from '../types';

interface ProgressCardProps {
  stats: ProgressStats;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({ stats }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <Target className="mr-2 text-blue-500" />
        Прогресс курса
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl text-center"
        >
          <div className="text-3xl font-bold text-green-600">{stats.totalLessons}</div>
          <div className="text-sm text-gray-600">Всего уроков</div>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl text-center"
        >
          <div className="text-3xl font-bold text-blue-600">{stats.completedLessons}</div>
          <div className="text-sm text-gray-600">Завершено</div>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl text-center"
        >
          <div className="text-3xl font-bold text-purple-600">{stats.percentage}%</div>
          <div className="text-sm text-gray-600">Прогресс</div>
        </motion.div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Общий прогресс</span>
          <span>{stats.percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${stats.percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full"
          />
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
          <TrendingUp className="mr-2 text-green-500" />
          По категориям
        </h4>
        {Object.entries(stats.categoryStats).map(([category, categoryStats]) => (
          <div key={category} className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{category}</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">
                {categoryStats.completed}/{categoryStats.total}
              </span>
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${categoryStats.percentage}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="bg-blue-500 h-2 rounded-full"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}; 