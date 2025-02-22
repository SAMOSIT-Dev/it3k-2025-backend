import express from 'express';
import * as path from 'path';
import adminRouter from '../routes/admin.route' 
import athleticsRouter from '../routes/athletics.route' 
import footballRouter from '../routes/football.route' 
import badmintonRouter from '../routes/badminton.route' 
import basketballRouter from '../routes/basketball.route' 
import pingpongRouter from '../routes/pingpong.route' 

const app = express();
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/admin', adminRouter);
app.use('/athletics', athleticsRouter);
app.use('/football', footballRouter);
app.use('/badminton', badmintonRouter);
app.use('/basketball', basketballRouter);
app.use('/pingpong', pingpongRouter);
app.get('/gateway/check', (req, res) => {
    res.status(200).json({ message: 'Gateway is alive' });
})


export default app;