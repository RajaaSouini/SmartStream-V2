//import { API_URL } from "../config.js";
const API_URL = 'https://6af1eb5442c6561ced38cbc8.mockapi.io/channels';

//verifier que la res est bonne
export async function getChannels(){

        const response = await fetch(API_URL);

        if(response.ok){
            const channels = await response.json();
            return channels;
        }

        if(response.status === 404){
            throw new Error('404 not found , vérifions lurl d API ');
        }

        if(response.status === 500){
            throw new Error('erreur 500 du serveur ');
        }
        
        throw new Error('Erreur  :' + response.status); 

}

async function updateChannels(){
    const response = await fetch(API_URL);
    const channels = await response.json();

    for(const channel of channels){
        await fetch(`${API_URL}/${channel.id}`, {
            method: "PUT",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({lastWatchedAt : null }),
        });
        //console.log(`${channel.name}`);
        }
    console.log('Terminé');
}

//updateChannels();

export async function createChannel(channel){

    const response =await fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(channel),
        });
        if(!response.ok) throw new Error('erreur' + response.status);
    return response.json();
}
export async function deleteChannel(id){
    const response = await fetch(API_URL + "/" + id ,
        {
            method: "DELETE",
        });
        if(!response.ok) throw new Error('erreur' + response.status);
    return response.json();

}
export async function updateChannel(id, channel) {
     const response =await fetch(API_URL + "/" + id , {
            method: "PUT",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(channel),
        });
        if(!response.ok){
            throw new Error('erreur' + response.status);
        }
    return response.json();
}

            