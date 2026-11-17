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


//  <div class="flex flex-col gap-8">
//             <div>
//                 <button id="tout-channels" class="text-[#E8ECF5] border rounded-xl p-2">All Channels</button>
//                 <button id="favories-channels" class="text-[#E8ECF5] border rounded-xl p-2">Favories</button>
//             </div>
//             <div>
//                 <p class="text-[#A3ADC2] flex justify-between">FAVORIES</p>
//                 <div class="favori-container">

//                 </div>
//             </div>
//         </div>