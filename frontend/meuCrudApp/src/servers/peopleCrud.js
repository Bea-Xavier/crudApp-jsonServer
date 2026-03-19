import { API_URL } from "./configApi";

//Todas as funções usam fetch para consumir a API.  

//Função para buscar todas as pessoas
export async function getPeople() {

    //Realiza a requisão GET
    const response = await fetch(`${API_URL}/people`);

    //Converte a resposta para JSON
    const data = await response.json();

    //Retorna a lista 
    return data;
}

//Função para criar uma nova pessoa
export async function createPerson(person) {

    const response = await fetch(`${API_URL}/people`, {
        method: 'POST', // método HTTP
        headers: {
            "Content-Type": "application/json" // tipo de conteúdo
        },
        body: JSON.stringify(person) // transforma o objeto em JSON
    });

    return response.json(); 

}

//Função para atualizar uma pessoa existente
export async function updatePerson(id, person) {

    const response = await fetch(`${API_URL}/people/${id}`, {
        method: 'PUT', 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(person)
    });

    return response.json();

}

//Função para deletar uma pessoa
export async function deletePerson(id) {

    await fetch(`${API_URL}/people/${id}`, {
        method: 'DELETE'
    });
}