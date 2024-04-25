import axios from 'axios';
import 'dotenv/config'

const api_key = process.env.API_KEY;
const base_url = 'https://api.nasa.gov/mars-photos/api/v1';

async function makeRequest(endpoint: string) {
    return await axios.get(`${base_url}/${endpoint}?api_key=${api_key}`);
}

export async function getRovers() {
    try {
        const response = await makeRequest('rovers');
        return response.data;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to get rovers from NASA API.');
    }
}
