# посещаемости.net

Информационная система для учебных заведений, предназначенная для автоматизации учета посещаемости, управления учебными группами, расписанием, занятиями, новостями, событиями и достижениями студентов.

## Стек

- Frontend: React, TypeScript, Vite, React Query, Tailwind CSS
- Backend: NestJS, TypeScript, Prisma ORM
- Database: PostgreSQL
- API: REST, Swagger
- Containerization: Docker, Docker Compose

## Структура проекта

```text
backend/   серверная часть NestJS
frontend/  клиентская часть React
screens/   материалы и скриншоты для презентации
```

## Быстрый запуск через Docker

1. Скопируйте пример переменных окружения:

```bash
cp .env.example .env
```

2. Запустите проект:

```bash
docker compose up --build
```

После запуска будут доступны:

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api
- Swagger UI: http://localhost:8000/docs
- PostgreSQL: localhost:5432

## Основные модули

- Auth: регистрация, авторизация, JWT и refresh-token
- Group и Invite: управление учебными группами и приглашениями
- Schedule, Lesson и TemplateLesson: расписание, занятия и шаблоны занятий
- Attendance: отметка и аналитика посещаемости
- News и Event: новости и события учебного заведения
- Achievement: достижения и элементы геймификации
- University: привязка групп к учебному заведению

## Документация API

Swagger-документация формируется на стороне backend и доступна после запуска:

```text
http://localhost:8000/docs
```

## Деплой

Для деплоя необходимо задать production-значения переменных:

- `JWT_SECRET`
- `DATABASE_URL` или параметры PostgreSQL из `.env.example`
- `ALLOWED_ORIGIN`
- `VITE_API_BASE_URL`
- `SUPABASE_URL` и `SUPABASE_ANON_KEY`, если используется загрузка файлов
- `UNIVERSITY_API_URL` и `UNIVERSITY_API_KEY`, если используются подсказки учебных заведений

Подробности локального запуска и переменных окружения описаны в `DOCKER.md`.
