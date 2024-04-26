import axios from 'axios';
import 'dotenv/config'
import { CameraType, RequestParams } from './types';

const api_key = process.env.API_KEY;
const base_url = 'https://api.nasa.gov/mars-photos/api/v1';



export function parseCameraType(cameraStr: string) : CameraType {
    const camera = CameraType[cameraStr.toUpperCase() as keyof typeof CameraType];
    if (camera === undefined)
        throw new Error('Invalid camera type specified');
    return camera;
}

async function makeRequest(endpoint: string, params: RequestParams = {}) {
    return await axios.get(endpoint, {
        baseURL: base_url,
        params: {
            api_key: api_key,
            timeout: 5000,
            ...params
        }
    });
}

export async function getRovers() {
    try {
        const response = await makeRequest('/rovers');
        return response.data;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to get rovers from NASA API.');
    }
}

export async function getPhotos(rover: string, camera: string) {
    const cameraType = parseCameraType(camera);
    try {
        const response = await makeRequest(`/rovers/${rover}/photos`, {
            sol: 1000,
            camera: cameraType
        });
        return response.data;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to get photos from NASA API.');
    }
}
