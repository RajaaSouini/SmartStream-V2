//import { API_URL } from "../config.js";
const API_URL = 'https://6af1eb5442c6561ced38cbc8.mockapi.io/channels';

//verifier que la res est bonne
export async function getChannels(){
    try{
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
    }catch (error){
        throw error ; 
    }
}

async function updateChannels(){
    const response = await fetch(API_URL);
    const channels = await response.json();

    for(const channel of channels){
        await fetch(`${API_URL}/${channel.id}`, {
            method: "PUT",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({isFavorite : false , isBlackListed: false}),
        });
        console.log(`${channel.name}`);
        }
    console.log('Terminé');
}

updateChannels();

async function createChannel(channel){

    const response =await fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(channel),
        });
    return response.json();
}
async function deleteChannel(id){
    const response = await fetch(API_URL + "/" + id ,
        {
            method: "DELETE",
        });
    return await response.json();

}
async function updateChannel(channel , id) {
     const response =await fetch(API_URL + "/" + id , {
            method: "PUT",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(channel),
        });
    return response.json();
}

// updateChannel({
//     "id": "1",
//     "channelNumber": "4000",
//     "name": "FR - DISCOVERY ID FHD",
//     "category": "DOCUMENTAIRE",
//     "country": "France",
//     "countryCode": "FR",
//     "logo": "https://ui-avatars.com/api/?name=DID&size=128&background=0EA5E9&color=fff&bold=true&rounded=true",
//     "previewImage": "https://picsum.photos/seed/discovery/800/450",
//     "streamUrl": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
//     "isLive": true,
//     "epg": {
//       "currentProgram": "Habitations en péril",
//       "startTime": "20:50",
//       "endTime": "21:45",
//       "progressPercentage": 65
//     },
//     "isFavorite": false,
//     "isBlackListed": false
//   } , 1);

// deleteChannel(35);

// createChannel(
//      {
//     "id": Date.now(),
//     "channelNumber": "8007",
//     "name": "GB - NATURE Channel new",
//     "category": "DOCUMENTAIRE",
//     "country": "Royaume-Uni",
//     "countryCode": "GB",
//     "logo": "https://ui-avatars.com/api/?name=NUK&size=128&background=0EA5E9&color=fff&bold=true&rounded=true",
//     "previewImage": "https://picsum.photos/seed/natureuk/800/450",
//     "streamUrl": "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
//     "isLive": true,
//     "epg": {
//       "currentProgram": "Wild Britain",
//       "startTime": "20:00",
//       "endTime": "21:00",
//       "progressPercentage": 90
//     },
//     "isFavorite": false,
//     "isBlackListed": false
//   },
// );
