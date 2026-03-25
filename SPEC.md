# Спецификация: Портфолио-сайт разработчика

## 1. Project Overview
- **Название**: Portfolio Dev
- **Тип**: SPA-портфолио с блогом и интеграцией Telegram
- **Фреймворк**: React + Vite
- **Мультиязычность**: RU, UZ, EN (i18next)

## 2. UI/UX Specification

### Layout Structure
- **Header**: Логотип, навигация, переключатель языка
- **Hero Section**: Приветствие, CTA-кнопка, анимированный фон
- **Portfolio Section**: Фильтры + сетка проектов
- **Blog Section**: Карточки статей
- **About Section**: Фото, текст, навыки
- **Contact Section**: Форма + Telegram-интеграция
- **Footer**: Соцсети, копирайт

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Color Palette
- **Primary**: #0D3B2E (темно-зеленый)
- **Secondary**: #1A5F4A (зеленый)
- **Accent**: #2ECC71 (яркий зеленый)
- **Background**: #0A0F0D (очень темный)
- **Surface**: #121916 (темный)
- **Text Primary**: #F0F4F2
- **Text Secondary**: #8B9A94
- **Gradient**: linear-gradient(135deg, #0D3B2E 0%, #1A5F4A 50%, #0D3B2E 100%)

### Typography
- **Headings**: "Unbounded", sans-serif (Google Fonts)
- **Body**: "Inter", sans-serif
- **H1**: 48px/56px
- **H2**: 36px/44px
- **H3**: 24px/32px
- **Body**: 16px/24px
- **Small**: 14px/20px

### Spacing System
- Base unit: 8px
- Sections: 80px vertical padding
- Container: max-width 1200px
- Grid gap: 24px

### Visual Effects
- Градиентный фон с анимацией
- Плавные hover-трансформации (scale, translate)
- Scroll-анимации через Framer Motion
- Glassmorphism-карточки

## 3. Components

### Navigation
- Logo (текст)
- Links: Главная, Портфолио, Блог, Обо мне, Контакты
- Language switcher (RU/UZ/EN)
- Mobile hamburger menu

### Hero
- Заголовок с gradient text
- Подзаголовок
- CTA кнопка "Заказать проект"
- Анимированные декоративные элементы

### Portfolio
- Filter tabs: Все, Сайты, Боты, Дизайн
- Project cards с hover-эффектом
- Карточка: изображение, название, категория, ссылка

### Blog
- Article cards
- Preview изображения
- Дата, категория, заголовок
- Кнопка "Читать далее"

### About
- Avatar/фото
- Bio текст
- Навыки (tags)
- Соцсети

### Contact Form
- Поля: Имя, Email, Тип проекта, Сообщение
- Submit → Telegram бот (API)
- Валидация полей

### Footer
- Логотип
- Links
- Social icons (Telegram, Instagram)
- Copyright

## 4. Functionality

### Мультиязычность
- i18next для переключения RU/UZ/EN
- JSON-файлы переводов
- Сохранение выбора в localStorage

### Форма заявки
- Отправка данных в Telegram через Bot API
- Webhook URL для уведомлений
- Сообщение: "Новая заявка от {name}\nEmail: {email}\nТип: {type}\nСообщение: {message}"

### Анимации
- Framer Motion для:
  - page transitions
  - scroll-triggered animations
  - hover effects
  - staggered lists

### Портфолио фильтрация
- Filter по категориям
- Анимация при переключении

### Поиск
- Поиск по статьям блога
- Real-time filtering

## 5. Data Structure

### Projects (static)
```json
{
  "id": 1,
  "title": "Project Name",
  "category": "sites|bots|design",
  "image": "/projects/1.jpg",
  "description": "Description",
  "link": "https://..."
}
```

### Blog Posts (static)
```json
{
  "id": 1,
  "title": "Post Title",
  "preview": "/blog/1.jpg",
  "date": "2024-01-01",
  "category": "news|article",
  "content": "Full content..."
}
```

## 6. Acceptance Criteria
- [ ] Сайт работает без ошибок
- [ ] Все страницы адаптивны
- [ ] Переключение языков работает
- [ ] Форма отправляет данные в Telegram
- [ ] Анимации плавные
- [ ] Portfolio фильтруется
- [ ] Поиск работает
- [ ] Vercel деплой успешен