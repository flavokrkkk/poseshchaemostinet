# Docker запуск

## Локальный запуск

1. Скопируйте переменные окружения:

```bash
cp .env.example .env
```

2. Запустите сервисы:

```bash
docker compose up --build
```

После запуска:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000/api`
- Swagger UI: `http://localhost:8000/docs`
- PostgreSQL: `localhost:5432`

## Важные переменные для деплоя

- `DATABASE_URL` внутри compose формируется автоматически из PostgreSQL-сервиса.
- `JWT_SECRET` обязательно заменить на секретное значение.
- `UNIVERSITY_API_URL` и `UNIVERSITY_API_KEY` нужны для подсказок учебных заведений.
- `SUPABASE_URL` и `SUPABASE_ANON_KEY` заменить на реальные значения, если используется загрузка файлов.
- `VITE_API_BASE_URL` указать на публичный адрес backend, например `https://api.example.com/api/`.
- `ALLOWED_ORIGIN` указать на публичный адрес frontend, например `https://example.com`.

## Миграции базы данных

Backend-контейнер автоматически выполняет Prisma-миграции перед запуском приложения:

```bash
docker compose up --build
```

Статус миграций можно проверить вручную:

```bash
docker compose exec backend npx prisma migrate status
```

Для просмотра Swagger миграции не обязательны, потому что документация формируется из NestJS controllers и DTO. Для работы API-ручек таблицы должны быть созданы миграциями.
