//export const API_URL = 'https://6af1eb5442c6561ced38cbc8.mockapi.io/channels';


/*

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

updateChannels();*/