# PortokaLive API

Express + TypeScript + MongoDB + api.video — backend for web and mobile clients.

| | |
|---|---|
| **Health** | `GET /api/health` |
| **Deploy target** | Railway or Render (see `PORTOKALIVE_INFRASTRUCTURE_MIGRATION_PLAN.md`) |
| **Org** | [PortokaLive](https://github.com/PortokaLive) |

## Setup

```bash
cp .env.example .env
# Set MONGO_URI, SECRET_KEY, API_VIDEO_API_KEY, email vars
npm install
npm run build
npm start
```

Dev: `npm run dev`

## Routes

| Method | Path | Auth |
|--------|------|------|
| GET | `/api/health` | — |
| POST | `/api/v1/user/register` | — |
| POST | `/api/v1/user/login` | — |
| POST | `/api/v1/user/activate` | — |
| POST | `/api/v1/user/validateToken` | JWT |
| GET | `/api/v1/user/:email` | JWT |

Streaming via api.video (`LiveService`). Legacy SSE/FLV routes deprecated.

## Docker

```bash
docker build -t portokalive-api .
docker run -p 5000:5000 --env-file .env portokalive-api
```

## License

ISC · Kevin Moe Myint Myat
