import express from 'express';
import healthRoute from '../routes/health.route';
import adminPingpongRoute from '../routes/admin-pingpong.route';
import adminBadmintonRoute from '../routes/admin-badminton.route';
import adminFootballRoute from '../routes/admin-football.route';
import adminBasketballRoute from '../routes/admin-basketball.route';
import adminAthleticsRoute from '../routes/admin-athletics.route';
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
app.use('/api/admin/pingpong', adminPingpongRoute);
app.use('/api/admin/badminton', adminBadmintonRoute);
app.use('/api/admin/football', adminFootballRoute);
app.use('/api/admin/basketball', adminBasketballRoute);
app.use('/api/admin/athletics', adminAthleticsRoute);


export default app;


