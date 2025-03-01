import { Router } from 'express';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';

const router: Router = Router();

const footballSocketProxyOptions: Options = {
  target: 'http://it3k-2025-football-service:8084',
  ws: true,
  changeOrigin: true,
  pathRewrite: {
    '^/football/socket': '/api/football-service/socket',
  },
};


const footballSocketProxy = createProxyMiddleware(footballSocketProxyOptions);

router.use('/socket', footballSocketProxy);

export default router;