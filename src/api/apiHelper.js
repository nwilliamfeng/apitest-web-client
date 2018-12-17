export class ApiHelper {

    static async get(url) {     
        const response =await fetch(url)
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    }

    static async post(url, data, headers = { 'Content-Type': 'application/json' }) {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    }

}