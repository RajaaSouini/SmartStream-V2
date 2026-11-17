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
            <button data-id="${channel.id}" class="channel flex gap-8 border border-[#26314D] rounded-xl p-2 w-full items-center  justify-between">
                    <div class="flex gap-8 w-full items-center">
                        <p class="text-[#A3ADC2]">${channel.channelNumber}</p>
                        <img src="${channel.logo}" class="size-12" alt="imgCh">
                        <div>
                            <h2 class="text-[#E8ECF5]">${channel.name}</h2>
                            <p class="text-[#A3ADC2]">${channel.epg.currentProgram}</p>
                        </div> 
                    </div>
                    <div class="flex gap-4">
                        <img src="${channel.isFavorite ? './assets/icons/favoriPlein.png' : './assets/icons/favoriVide.png' }" class="size-8 img-fav" >
                    </div>                   
                </button>
        `;
    })
}


