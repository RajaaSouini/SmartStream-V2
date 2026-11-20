export function renderBlackList(channels){
    const container = document.getElementById('blackListe');
    container.innerHTML = ""; 

    container.className= 'flex flex-col gap-4';
    
    if(channels.length  === 0){
        container.innerHTML += `
            <p class="text-[#A3ADC2]">Aucune chaîne masquée</p>
        `;
        return;
    }
    channels.forEach((channel) => {
        container.innerHTML += `
            <div class="flex gap-4 border border-[#26314D] rounded-xl p-2 w-full items-center">
                <img src="${channel.logo}" class="size-12" alt="${channel.name}">
                <h2 class="text-[#E8ECF5]">${channel.name}</h2>
                <button data-action="restore" class="restore text-[#E8ECF5] px-2" data-id="${channel.id}">X</button>
            </div>
        `;
    })
}