export function favoriChange(){
    const favoriContainer = document.querySelector('.favori-container');
    const container = document.getElementById('channel-list');

    if(!container) return;
    document.addEventListener('click' , function(e){
        const elemAchanger = e.target.closest('.img-fav');
        const channel = elemAchanger.closest('.channel');

        if(elemAchanger){
            if(elemAchanger.src.includes('favoriPlein.png')){
                elemAchanger.src = './assets/icons/favoriVide.png';
                // container.appendChild(channel);

            }else{
                elemAchanger.src = './assets/icons/favoriPlein.png';
                // favoriContainer.appendChild(channel) ;
            }
        }
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