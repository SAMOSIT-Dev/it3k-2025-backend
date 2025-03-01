import { Router } from 'express';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';

const router: Router = Router();

const popcatSocketProxyOptions: Options = {
  target: 'http://it3k-2025-popcat-service:8086',
  ws: true,
  changeOrigin: true,
  pathRewrite: {
    '^/popcat/socket': '/api/popcat-service/socket',
  },
};


const popcatSocketProxy = createProxyMiddleware(popcatSocketProxyOptions);

router.use('/socket', popcatSocketProxy);

export default router;