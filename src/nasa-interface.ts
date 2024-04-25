import axios from 'axios';
import 'dotenv/config'

const api_key = process.env.API_KEY;
const base_url = 'https://api.nasa.gov/mars-photos/api/v1';

async function makeRequest(endpoint: string, params: object = {}) {
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

export async function getPhotos() {
    try {
        const response = await makeRequest('/rovers/curiosity/photos', {
            sol: 1000,
            camera: 'fhaz'
        });
        return response.data;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to get photos from NASA API.');
    }
}
