
import { updateChannel , deleteChannel } from "../services/api.js";
import { openEdit } from "./addChannel.js";

export function actions(channels , onChange){
    //modal confirmation 
    const modal = document.querySelector('.confirmer');

    document.getElementById('oui').addEventListener('click', function(){
        modal.classList.add('hidden');
    });

    document.getElementById('non').addEventListener('click', function(){
        modal.classList.remove('hidden');
    });

    document.addEventListener('click',async function(event){
        const target = event.target.closest("[data-action]");
        if(!target)return ;

        const item = target.closest("[data-id]");
        if(!item) return ;

        const channel = channels.find((ch) => ch.id === item.dataset.id);
        if(!channel) return ;

        const action = target.dataset.action ;
        if(!action) return ;

        try{
            if(action === "favori"){
            channel.isFavorite = !channel.isFavorite ;
            onChange();
            await updateChannel(channel.id , channel);
            }

            if(action === "spam"){

                // const container = document.querySelector('.confirmer');
                // container.classList.remove('hidden');

                // container.addEventListener('click' ,async function(e){
                //     const btn = e.target.closest('button');
                //     if(btn.classList.includes('oui')){
                //         channel.isBlackListed = true ;
                //         container.classList.add('hidden');
                //         //channel.isFavorite = false ;
                //     }
                // })

                // onChange();
                // await updateChannel(channel.id , channel);
                

                const confirmed =confirm("Est ce que vous souaiter l ajouter vraiment à black list ? ");
                if(!confirmed) return ;
                

                channel.isBlackListed = true ;
                //channel.isFavorite = false ;
                onChange();
                await updateChannel(channel.id , channel);
            }

            if(action === "restore"){
                const confirmeSupp = confirm('souhaiter vous vraiment supprimé la chaine déffinitivement');
                if(confirmeSupp){
                    await deleteChannel(channel.id);
                    channels.splice(channels.indexOf(channel) , 1);
                    onChange();
                }else{
                    channel.isBlackListed = false ;
                    onChange();
                    await updateChannel(channel.id , channel);
                }  
            }

            if(action === "modifier"){
                openEdit(channel);
            }
        }catch(error){
            console.log("Erreur :" , error.message);
        }
    })
}
                