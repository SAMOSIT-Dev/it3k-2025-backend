import { Router } from 'express';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';

const router: Router = Router();

const basketballSocketProxyOptions: Options = {
  target: 'http://it3k-2025-basketball-service:8083',
  ws: true,
  changeOrigin: true,
  pathRewrite: {
    '^/basketball/socket': '/api/basketball-service/socket',
  },
};


const basketballSocketProxy = createProxyMiddleware(basketballSocketProxyOptions);

router.use('/socket', basketballSocketProxy);

export default router;