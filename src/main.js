import { getChannels } from "./services/api.js";
import { showLoader , hideLoader } from "./ui/loader.js";
import { showError , hideError } from "./ui/error.js";
import { renderChannels } from "./ui/channelList.js";
import { renderPreview } from "./ui/preview.js";
import { renderCountries } from "./ui/countryList.js";
import { filterChannels } from "./utils/filter.js";

import { favoriChange } from "./utils/favorites.js";
import { hiddenIds , blackList} from "./utils/blackList.js";
import { renderBlackList } from "./ui/blacklistUi.js";
async function init() {
    hideError();
    showLoader();

    try{
        const channels = await getChannels();
        const sidebar = document.getElementById('country-sidebar');
        const searchInput = document.getElementById('search-input');
        //search
        let selectedCountry = "all";

        // function updateList(){
        //     let result = channels;

        //     if(selectedCountry !== "all"){
        //         result = channels.filter((c) => c.country === selectedCountry);
        //     }

        //     result = filterChannels(result);
        //     renderChannels(result) ;
        // }
        function updateList(){
            let result = channels.filter((c)=> !hiddenIds.includes(c.id));

            if(selectedCountry !== "all"){
                result = result.filter((c) => c.country === selectedCountry);
            }

            result = filterChannels(result);
            renderChannels(result) ;
            renderBlackList(channels.filter((c)=>hiddenIds.includes(c.id)))
            
        }

        renderChannels(channels);
        renderCountries(channels);
        renderBlackList([]);
        blackList(updateList);
        // console.log(channels);

        searchInput.addEventListener('input' , updateList);

        //ouvrir et fermer le panneau 
        document.getElementById('country-toggle').addEventListener('click', ()=>{
            sidebar.classList.remove('hidden');
        });
        document.getElementById("country-close").addEventListener('click' , ()=>{
            sidebar.classList.add('hidden');
        });

        //click sur un pays 
        document.getElementById('country-list').addEventListener('click' , (event)=>{
            const boutton = event.target.closest('button');

            if(!boutton) return;

            selectedCountry = boutton.dataset.country;
            document.getElementById('country-title').textContent = boutton.dataset.name;
            sidebar.classList.add('hidden');
            // const count = boutton.dataset.country ;
            // let filtred = channels ;

            // if(count !== "all"){
            //     filtred = channels.filter((c) => c.country === count);
            // }

            // renderChannels(filtred);
            // document.getElementById('country-title').textContent = boutton.dataset.name;
            // sidebar.classList.add('hidden');
            updateList();
        })
        favoriChange();

        //click sur une chaine
        document.getElementById('channel-list').addEventListener('click' , function(e){
            if(e.target.closest('.spam')) return;
            const button = e.target.closest('button');

            if(!button) return;
            //console.log(button.dataset.id);

            const channel = channels.find((c) => c.id === button.dataset.id);
            renderPreview(channel);
        })
    }catch (error){
        showError(error , init);
        console.log("Erreur :" , error.message);
    }finally{
        hideLoader();
    }
}

init();



