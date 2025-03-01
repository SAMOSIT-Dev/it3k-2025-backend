import express from 'express';
import healthRoute from '../routes/health.route';
import adminLoginRoute from '../routes/admin-auth.route';
import badmintonRoute from '../routes/badminton.route';
import pingpongRoute from '../routes/pingpong.route';
import cors from 'cors';
import helmet from 'helmet';
import scheduleRoute from '../routes/schedule.route'
import footballRoute from '../routes/football.route'
import basketballRoute from '../routes/basketball.route'

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
app.use('/api/admin/badminton', badmintonRoute)
app.use('/api/admin/pingpong', pingpongRoute)
app.use('/api/admin/schedule', scheduleRoute)
app.use('/api/admin/football', footballRoute)
app.use('/api/admin/basketball', basketballRoute)

export default app;


