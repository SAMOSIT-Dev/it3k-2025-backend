import express from 'express';
import * as path from 'path';
import adminRouter from '../routes/admin.route' 
import athleticsRouter from '../routes/athletics.route' 
import footballRouter from '../routes/football.route' 
import badmintonRouter from '../routes/badminton.route' 
import basketballRouter from '../routes/basketball.route' 
import pingpongRouter from '../routes/pingpong.route' 

const app = express();
app.use('/api/assets', express.static(path.join(__dirname, 'assets')));
app.use('/api/admin', adminRouter);
app.use('/api/athletics', athleticsRouter);
app.use('/api/football', footballRouter);
app.use('/api/badminton', badmintonRouter);
app.use('/api/basketball', basketballRouter);
app.use('/api/pingpong', pingpongRouter);


export default app;