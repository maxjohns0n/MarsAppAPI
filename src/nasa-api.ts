import axios from 'axios';
import 'dotenv/config'
import { CameraType, RequestParams, PhotoResponse } from './types';

const api_key = process.env.API_KEY;
const base_url = 'https://api.nasa.gov/mars-photos/api/v1';



function parseCameraType(cameraStr: string) : CameraType {
    const camera = CameraType[cameraStr.toUpperCase() as keyof typeof CameraType];
    if (camera === undefined)
        throw new Error('Invalid camera type specified');
    return camera;
}

function parsePhotoResponse(data: PhotoResponse) : PhotoResponse {
    const response: PhotoResponse = { photos: [] };
    for (const photo of data.photos) {
        response.photos.push({
            id: photo.id,
            sol: photo.sol,
            img_src: photo.img_src,
            earth_date: photo.earth_date
        });
    }
    return response;
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
        return parsePhotoResponse(response.data);
    } catch (err) {
        console.error(err);
        throw new Error('Failed to get photos from NASA API.');
    }
}
