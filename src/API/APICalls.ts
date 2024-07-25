import {APIData} from '../Interfaces'
export async function getData(): Promise<APIData> {
    try {
        const response = await fetch('https://fruga-be.fly.dev:3000/');
        
        if (!response.ok) {
            throw new Error(`error status: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);

        return data;
    } catch (error) {
        console.error("Something went wrong:", error.message);
        throw error;
    }
}
