import express from 'express';
import { getRovers, getPhotos, parseCameraType } from './nasa-interface';

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

router.get('/rovers/:roverName/photos/:cameraType', async (req: {params: {roverName: string, cameraType: string}}, res: any, next: any) => {
    try {
        res.send(await getPhotos(req.params.roverName, parseCameraType(req.params.cameraType)));
    } catch (err) {
        next(err);
    }
});

app.use('/', router);

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
