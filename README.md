# frontend

React 18 web UI for the e-commerce platform.

## Prerequisites

- Node.js 18+
- `product-service` and `order-service` running (see root `docker-compose.yml`)

## Local Development

```bash
npm install
npm start        # runs on http://localhost:3000
```

## Testing

```bash
npm test         # interactive watch mode
npm run test:ci  # single-run (used in CI)
```

## Build

```bash
npm run build    # outputs to build/
```

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `REACT_APP_PRODUCT_API` | `http://localhost:3001` | Product service base URL |
| `REACT_APP_ORDER_API` | `http://localhost:3002` | Order service base URL |

## Tech Stack

- React 18 (Create React App)
- axios for HTTP requests
final testing
testing
test
