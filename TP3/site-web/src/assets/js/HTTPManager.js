/* eslint-disable no-magic-numbers */
class HTTPManager {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async get(endpoint) {
        const url = new URL(`${this.baseURL}${endpoint}`);

        try {
            ("URL", url)
            const response = await fetch(url);
            return this.handleResponse(response);
        } catch (error) {
            console.error("La requête GET a échoué :", error);
            throw error;
        }
    }

    async post(endpoint, body) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            return this.handleResponse(response);
        } catch (error) {
            console.error("La requête POST a échoué :", error);
            throw error;
        }
    }

    async handleResponse(response) {
        if (response.ok) {
            switch (response.status) {
                case 204:
                    return null;
                default:
                    return await response.json();
            }
        } else {
            throw new Error(`Erreur HTTP : ${response.statusText}`);
        }
    }

    // TODO : Implémenter les autres méthodes HTTP nécessaires
    async put(endpoint, body) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            return this.handleResponse(response);
        } catch (error) {
            console.error("La requête PUT a échoué :", error);
            throw error;
        }
    }

    async delete (endpoint) {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
          method: "DELETE",
        });
        return response.status;
      }

    async patch(endpoint) {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
            method: "PATCH",
          });
        return response.status;
    }
    
}

export default HTTPManager;
