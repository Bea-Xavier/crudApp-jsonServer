import { API_URL } from "./configApi";

//Todas as funções usam fetch para consumir a API.  

//Função para buscar todas as pessoas
async function assertJsonResponse(response) {
    const text = await response.text();
    if (!response.ok) {
        throw new Error(`API error ${response.status}: ${text}`);
    }
    try {
        return JSON.parse(text);
    } catch (err) {
        throw new Error(`JSON parse error from API (${response.url}): ${err.message} / body: ${text}`);
    }
}

export async function getPeople() {
    const response = await fetch(`${API_URL}/people`);
    return assertJsonResponse(response);
}

//Função para criar uma nova pessoa
export async function createPerson(person) {
    const response = await fetch(`${API_URL}/people`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(person)
    });
    return assertJsonResponse(response);
}

export async function updatePerson(id, person) {
    const response = await fetch(`${API_URL}/people/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(person)
    });
    return assertJsonResponse(response);
}

export async function deletePerson(id) {
    const response = await fetch(`${API_URL}/people/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`API DELETE error ${response.status}: ${text}`);
    }
}