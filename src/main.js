import { getChannels, updateChannel } from "./services/api.js";
import { showLoader , hideLoader } from "./ui/loader.js";
import { showError , hideError } from "./ui/error.js";
import { renderChannels } from "./ui/channelList.js";
import { renderPreview } from "./ui/preview.js";
import { renderCountries } from "./ui/countryList.js";
import { filterChannels } from "./utils/filter.js";
import { renderFavorites } from "./ui/favori.js";          
import { renderBlackList } from "./ui/blacklistUi.js";
import { showFavoriOrAll , filterFavori } from "./utils/allOrFavori.js";
import { addChannel, showForm } from "./utils/addChannel.js"; 
import { actions } from "./utils/actions.js";


async function init() {
    hideError();
    showLoader();

    try{
        //const lastWatchedArray = [];
        const channels = await getChannels();
        const sidebar = document.getElementById('country-sidebar');
        const searchInput = document.getElementById('search-input');
        //search
        let selectedCountry = "all";
        addChannel(channels , updateList);
        showForm();
       
       
        function updateList(){
            let result = channels.filter((ch) => !ch.isBlackListed);

            if(selectedCountry !== "all"){
                result = result.filter((c) => c.country === selectedCountry);
            }
            if(filterFavori.onlyFavorites){
                result = result.filter((c)=>c.isFavorite);
            }
            result = filterChannels(result); 
            
            const recent = result.filter((ch) => ch.lastWatchedAt).sort((a,b) => 
                b.lastWatchedAt - a.lastWatchedAt).slice(0,5);

            const autre = result.filter((ch) => !recent.includes(ch));
            result = [...recent , ...autre];

            renderChannels(result);
            renderBlackList(channels.filter((c)=> c.isBlackListed));
            renderFavorites(channels.filter((c)=> c.isFavorite && !c.isBlackListed));
        }
    
        renderCountries(channels);
        updateList();             
        actions(channels , updateList);
        showFavoriOrAll(updateList);
        searchInput.addEventListener('input' , updateList);

        //ouvrir et fermer le panneau 
        if(localStorage.getItem('sidebar') === 'true'){
            sidebar.classList.remove('hidden');
        }
        document.getElementById('country-toggle').addEventListener('click', ()=>{
            sidebar.classList.remove('hidden');
            localStorage.setItem('sidebar' , 'true');
        });
        document.getElementById("country-close").addEventListener('click' , ()=>{
            sidebar.classList.add('hidden');
            localStorage.setItem('sidebar' , 'false');
        });

        //click sur un pays 
        document.getElementById('country-list').addEventListener('click' , (event)=>{
            const boutton = event.target.closest('button');

            if(!boutton) return;

            selectedCountry = boutton.dataset.country;
            document.getElementById('country-title').textContent = boutton.dataset.name;
            sidebar.classList.add('hidden');

            updateList();
        })

        document.addEventListener('click' ,async function(e){
            if(e.target.closest(' .spam , .img-fav')) return;

            const button = e.target.closest('button');

            if(!button) return;               

            const channel = channels.find((c) => c.id === button.dataset.id);
            channel.lastWatchedAt = Date.now();           
            renderPreview(channel);
            updateList();

            try{
                await updateChannel(channel.id ,channel);
            }catch(error){
                console.log("Erreur" , error.message);
            }
        })
    }catch (error){
        showError(error , init);
        console.log("Erreur :" , error.message);
    }finally{
        hideLoader();
    }
}

init();



