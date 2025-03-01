import express from 'express';
import healthRoute from '../routes/health.route';
import adminManagerRoute from '../routes/admin-manager.route';
import adminLoginRoute from '../routes/admin-auth.route';
import cors from 'cors';
import helmet from 'helmet';

const app = express();

app.use(express.json());
app.use(cors(
    {
        origin: '*',
        credentials: true
    }
));
app.use(helmet());

app.use('/', healthRoute);
app.use('/api/auth', adminLoginRoute);
app.use('/api/admin', adminManagerRoute);


export default app;


