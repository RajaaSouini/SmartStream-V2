import { updateChannel , deleteChannel } from "../services/api.js";

//export const hiddenIds = [];           
                
export function blackList(channels , onChange){
    const container = document.getElementById('channel-list');

    container.addEventListener('click' ,async function(e){
        const btn = e.target.closest('.spam');
        if(!btn) return;
        
        const encetre = btn.closest('.channel');
        if(!encetre) return;

        const id = encetre.dataset.id ;

        const channel = channels.find((ch) => ch.id === id);

        const confirmed =confirm("Est ce que vous souaiter l ajouter vraiment à black list ? ");
        if(!confirmed) return ;

        channel.isBlackListed = true ;
        onChange();
        await updateChannel(channel , channel.id);

        // if(!hiddenIds.includes(id)){
        //     hiddenIds.push(id);
        // }

        // onChange();
       
        
    });

    document.getElementById('blackListe').addEventListener('click',async function(e){
        const btn = e.target.closest('.restore');
        if(!btn) return;

        const channel = channels.find((ch)=> ch.id === btn.dataset.id);

        const confirmeSupp = confirm('souhaiter vous vraiment supprimé la chaine déffinitivement');

        if(confirmeSupp){
            await deleteChannel(channel.id);

            const index = channels.indexOf(channel);
            channels.splice(index , 1);
        }else{
            channel.isBlackListed = false ;
            await updateChannel(channel , channel.id);
        }
        onChange();

        
        // const index = hiddenIds.indexOf(btn.dataset.id);
        // if(index !== -1){
        //     hiddenIds.splice(index ,1);
        // }
        // onChange();
    });
}