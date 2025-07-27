# ⚡ Быстрый старт

## 1. Клонирование и установка
```bash
git clone <ваш-репозиторий>
cd n8n-checklist
npm install
```

## 2. Настройка Firebase (5 минут)

1. **Создайте проект:** [Firebase Console](https://console.firebase.google.com/)
2. **Включите Firestore:** Database → Create Database → Start in test mode
3. **Скопируйте конфиг:** Project Settings → General → Your apps → Add app → Web
4. **Обновите `src/firebase.ts`** с вашими данными

## 3. Запуск локально
```bash
npm start
```
Откройте [http://localhost:3000](http://localhost:3000)

## 4. Развертывание на Vercel (2 минуты)
```bash
npm install -g vercel
vercel login
vercel
```

## 5. Настройка переменных окружения в Vercel
- `REACT_APP_FIREBASE_API_KEY`
- `REACT_APP_FIREBASE_AUTH_DOMAIN`
- `REACT_APP_FIREBASE_PROJECT_ID`
- `REACT_APP_FIREBASE_STORAGE_BUCKET`
- `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
- `REACT_APP_FIREBASE_APP_ID`

## 6. Финальное развертывание
```bash
vercel --prod
```

## ✅ Готово!

Ваше приложение доступно по адресу: `https://ваш-проект.vercel.app`

---

**Нужна помощь?** Смотрите [DEPLOYMENT.md](./DEPLOYMENT.md) для подробной инструкции. 