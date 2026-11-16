

export const hiddenIds = [];

export function blackList(onChange){
    const container = document.getElementById('channel-list');

    container.addEventListener('click' , function(e){
        const btn = e.target.closest('.spam');
        if(!btn) return;
        
        const encetre = btn.closest('.channel');
        if(!encetre) return;

        const id = encetre.dataset.id ;

        if(!hiddenIds.includes(id)){
            hiddenIds.push(id);
        }

        onChange();
    });

    document.getElementById('blackListe').addEventListener('click', function(e){
        const btn = e.target.closest('.restore');
        if(!btn) return;

        const index = hiddenIds.indexOf(btn.dataset.id);
        if(index !== -1){
            hiddenIds.splice(index ,1);
        }
        onChange();
    });
}