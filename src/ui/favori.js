export function renderFavorites(channels){
    const container = document.getElementById('favori-container');
    container.innerHTML = ""; 
    
    if(channels.length  === 0){
        container.innerHTML += `
            <p class="text-[#A3ADC2]">Aucune favorie</p>
        `;
        return;
    }
    channels.forEach((channel) => {
        container.innerHTML += `
            <div data-id="${channel.id}" class="flex gap-4 border border-[#26314D] rounded-xl p-2 w-full items-center">
                <img src="${channel.logo}" class="size-12" alt="${channel.name}">
                <h2 class="text-[#E8ECF5] flex-1">${channel.name}</h2>
                <img src="./assets/icons/favoriPlein.png" class="size-8 img-fav">
            </div>
        `;
    })
}