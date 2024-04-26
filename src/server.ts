import express from 'express';
import { getRovers, getPhotos } from './nasa-api';
import { PhotoParams } from './types';

const app = express();
const port = 8000;

app.use(express.json());
const router = express.Router();

router.get('/test', (req: any, res: any) => res.send('Hello world !'));

router.get('/rovers', async (req: any, res: any, next: any) => {
    try {
        res.send(await getRovers());
    } catch (err) {
        next(err);
    }
}
);

router.get('/rovers/:roverName/photos/:cameraType', async (req: {params: PhotoParams}, res: any, next: any) => {
    try {
        res.send(await getPhotos(req.params.roverName, req.params.cameraType));
    } catch (err) {
        next(err);
    }
});

app.use('/', router);

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
