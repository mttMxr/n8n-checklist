# 🚀 Инструкция по развертыванию

## Подготовка к развертыванию

### 1. Настройка Firebase

1. **Создайте проект Firebase:**
   - Перейдите на [Firebase Console](https://console.firebase.google.com/)
   - Нажмите "Создать проект"
   - Введите название: `n8n-checklist`
   - Следуйте инструкциям мастера

2. **Включите Firestore Database:**
   - В боковом меню выберите "Firestore Database"
   - Нажмите "Создать базу данных"
   - Выберите "Начать в тестовом режиме"
   - Выберите ближайший регион

3. **Настройте правила безопасности:**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if true;
       }
     }
   }
   ```

4. **Получите конфигурацию:**
   - В настройках проекта выберите "Настройки проекта"
   - Прокрутите до "Ваши приложения"
   - Нажмите "Добавить приложение" → "Веб"
   - Скопируйте конфигурацию

### 2. Обновление конфигурации

Замените данные в `src/firebase.ts` на ваши:

```typescript
const firebaseConfig = {
  apiKey: "ваш-api-key",
  authDomain: "ваш-project.firebaseapp.com",
  projectId: "ваш-project-id",
  storageBucket: "ваш-project.appspot.com",
  messagingSenderId: "ваш-sender-id",
  appId: "ваш-app-id"
};
```

## Развертывание на Vercel (Рекомендуется)

### 1. Установка Vercel CLI
```bash
npm install -g vercel
```

### 2. Вход в аккаунт
```bash
vercel login
```

### 3. Развертывание
```bash
cd n8n-checklist
vercel
```

### 4. Настройка переменных окружения
В Vercel Dashboard:
1. Перейдите в настройки проекта
2. Выберите "Environment Variables"
3. Добавьте переменные:
   - `REACT_APP_FIREBASE_API_KEY`
   - `REACT_APP_FIREBASE_AUTH_DOMAIN`
   - `REACT_APP_FIREBASE_PROJECT_ID`
   - `REACT_APP_FIREBASE_STORAGE_BUCKET`
   - `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
   - `REACT_APP_FIREBASE_APP_ID`

### 5. Повторное развертывание
```bash
vercel --prod
```

## Развертывание на Netlify

### 1. Подготовка
```bash
npm run build
```

### 2. Загрузка на Netlify
1. Перейдите на [netlify.com](https://netlify.com)
2. Перетащите папку `build` в область загрузки
3. Или подключите GitHub репозиторий

### 3. Настройка переменных окружения
В Netlify Dashboard:
1. Перейдите в "Site settings" → "Environment variables"
2. Добавьте те же переменные, что и для Vercel

### 4. Настройка редиректов
Создайте файл `_redirects` в папке `public`:
```
/*    /index.html   200
```

## Развертывание на GitHub Pages

### 1. Установка gh-pages
```bash
npm install --save-dev gh-pages
```

### 2. Обновление package.json
```json
{
  "homepage": "https://ваш-username.github.io/ваш-repo",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

### 3. Развертывание
```bash
npm run deploy
```

## Проверка развертывания

### 1. Тестирование функций
- ✅ Отметка уроков
- ✅ Добавление заметок
- ✅ Сохранение в Firebase
- ✅ Экспорт CSV
- ✅ Поиск и фильтрация

### 2. Проверка адаптивности
- 📱 Мобильные устройства
- 💻 Планшеты
- 🖥️ Десктоп

### 3. Проверка производительности
- ⚡ Время загрузки
- 🎨 Анимации
- 📊 Статистика

## Устранение проблем

### Ошибка Firebase
```
Firebase: Error (auth/unauthorized-domain)
```
**Решение:** Добавьте домен в Firebase Console → Authentication → Settings → Authorized domains

### Ошибка CORS
```
Access to fetch at '...' from origin '...' has been blocked by CORS policy
```
**Решение:** Проверьте правила Firestore и настройки безопасности

### Ошибка сборки
```
Module not found: Can't resolve 'framer-motion'
```
**Решение:** Установите зависимости: `npm install`

## Мониторинг

### Firebase Analytics
1. Включите Google Analytics в Firebase
2. Отслеживайте активность пользователей
3. Анализируйте популярные функции

### Vercel Analytics
1. Включите Analytics в Vercel Dashboard
2. Отслеживайте производительность
3. Мониторьте ошибки

## Обновления

### Автоматические обновления
При подключении к Git репозиторию:
- Vercel: Автоматически при push в main
- Netlify: Автоматически при push в main
- GitHub Pages: Автоматически при push в gh-pages

### Ручные обновления
```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod --dir=build

# GitHub Pages
npm run deploy
```

## Безопасность

### Firebase Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Environment Variables
- Никогда не коммитьте секретные ключи
- Используйте переменные окружения
- Регулярно ротируйте ключи

## Поддержка

### Полезные ссылки
- [Firebase Documentation](https://firebase.google.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [React Documentation](https://reactjs.org/docs)

### Сообщество
- GitHub Issues
- Stack Overflow
- Discord серверы

---

**Успешного развертывания! 🚀** 