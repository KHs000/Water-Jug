import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import routes from './routes/router';

dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({ error: error.message })
})

app.listen(PORT, () => { console.log(`Server running on ${PORT}`); });
