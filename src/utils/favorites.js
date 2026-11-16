export function favoriChange(){
    const container = document.getElementById('channel-list');
    if(!container) return;
    container.addEventListener('click' , function(e){
        const elemAchanger = e.target.closest('.img-fav');

        if(elemAchanger){
            if(elemAchanger.src.includes('favoriPlein.png')){
                elemAchanger.src = './assets/icons/favoriVide.png';
            }else{
                elemAchanger.src = './assets/icons/favoriPlein.png';
            }
        }
    })
}