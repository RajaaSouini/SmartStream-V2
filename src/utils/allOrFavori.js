export const filterFavori = {onlyFavorites : false};
export function showFavoriOrAll(onChange){
    document.getElementById('favories-channels').addEventListener('click' ,()=>{
        filterFavori.onlyFavorites = true ;
        onChange();
    })
    document.getElementById('tout-channels').addEventListener('click' ,()=>{
        filterFavori.onlyFavorites = false ;
        onChange();
    })

}
/*
<div>
                <button id="tout-channels" class="text-[#E8ECF5] border rounded-xl p-2">All Channels</button>
                <button id="favories-channels" class="text-[#E8ECF5] border rounded-xl p-2">Favories</button>
            </div> */