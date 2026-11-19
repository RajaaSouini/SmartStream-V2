
import { updateChannel , deleteChannel } from "../services/api.js";
export function actions(channels , onChange){
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
        }catch(error){
            console.log("Erreur :" , error.message);
        }
    })
}




// if(action === "favori"){

//             const item = bouton.closest('[data-id]');
//             if(!item) return; 

//             const channel = channels.find((ch) => ch.id === item.dataset.id);
            
//             channel.isFavorite = !channel.isFavorite ;
//             onChange();
//             await updateChannel(channel , channel.id);

//         }

//         if(action === "spam"){

//             const encetre = bouton.closest('.channel');
//             if(!encetre) return;

//             const id = encetre.dataset.id ;

//             const channel = channels.find((ch) => ch.id === id);

//             const confirmed =confirm("Est ce que vous souaiter l ajouter vraiment à black list ? ");
//             if(!confirmed) return ;

//             channel.isBlackListed = true ;
//             onChange();
//             await updateChannel(channel , channel.id);
//         }
//     })
//     document.getElementById('blackListe').addEventListener('click',async function(e){
//         const btn = e.target.closest('.restore');
//         if(!btn) return;

//         const channel = channels.find((ch)=> ch.id === btn.dataset.id);

//         const confirmeSupp = confirm('souhaiter vous vraiment supprimé la chaine déffinitivement');

//         if(confirmeSupp){
//             await deleteChannel(channel.id);

//             const index = channels.indexOf(channel);
//             channels.splice(index , 1);
//         }else{
//             channel.isBlackListed = false ;
//             await updateChannel(channel , channel.id);
//         }
//         onChange();           
//     });




