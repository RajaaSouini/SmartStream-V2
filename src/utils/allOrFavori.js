export const filterFavori = {onlyFavorites : localStorage.getItem('onlyFavorites') === 'true'};
export function showFavoriOrAll(onChange){
    document.getElementById('favories-channels').addEventListener('click' ,()=>{
        filterFavori.onlyFavorites = true ;

        localStorage.setItem('onlyFavorites' , 'true');
        onChange();
    })
    document.getElementById('tout-channels').addEventListener('click' ,()=>{
        filterFavori.onlyFavorites = false ;

        localStorage.setItem('onlyFavorites' , 'false');
        onChange();
    })

}
