import { updateChannel } from "../services/api.js";

export function favoriChange(channels , onChange){               
    document.addEventListener('click' ,async function(e){
        const elemAchanger = e.target.closest('.img-fav');
        if(!elemAchanger) return ;

        const item = elemAchanger.closest('[data-id]');
        if(!item) return; 

        const channel = channels.find((ch) => ch.id === item.dataset.id);
        
        channel.isFavorite = !channel.isFavorite ;
        onChange();
        await updateChannel(channel , channel.id);

        // if(elemAchanger){
        //     if(elemAchanger.src.includes('favoriPlein.png')){
        //         elemAchanger.src = './assets/icons/favoriVide.png';
        //         // container.appendChild(channel);

        //     }else{
        //         elemAchanger.src = './assets/icons/favoriPlein.png';
        //         // favoriContainer.appendChild(channel) ;
        //     }
        // }
    })
}

        