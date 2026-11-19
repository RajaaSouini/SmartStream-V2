export function modifierChannel(channels){
    const container = document.getElementById('channel-list');

    container.addEventListener('click' , function(e){
        const modifier = e.target.closest('.modifier');
        if(!modifier) return ;

        //console.log(modifier);

        
    })
}