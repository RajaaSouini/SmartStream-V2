import { createChannel , updateChannel } from "../services/api.js";
const textRegex = /^[a-zA-Z0-9À-ÿ \-_.]{2,}$/;
const numRegex = /^[0-9]{1,4}$/;

//mode d ajout
let editing = null ;
//remettre le formulaire en mode d ajout
function modeAjout(){
    editing = null ;
    document.querySelector('#form-ajout h3').textContent = "Ajouter une chaine";
    document.getElementById('btn-form').textContent = "Ajouter";
    document.querySelector('form').reset();
}

//show and close form 
export function showForm(){
    const afficher = document.getElementById('ajouter-channel-btn');
    const formS = document.querySelector('#form-ajout');
    const fermer = document.getElementById('btn-fermer');

    if(localStorage.getItem('formOpen') === 'true'){
        formS.classList.remove('hidden');
    }
    afficher.addEventListener('click' , function(){
        modeAjout();
        formS.classList.remove('hidden');
        localStorage.setItem('formOpen' , 'true');
    })

    fermer.addEventListener('click' , function(){
        modeAjout();
        formS.classList.add('hidden');
        localStorage.setItem('formOpen' , 'false');
    })
}

//ouvrir le formulaire rempli par la chaine à modifier
export function openEdit(channel){
    editing = channel ;


    document.getElementById('name-form').value = channel.name;
    document.getElementById('num-form').value = channel.channelNumber ;
    document.getElementById('categ-form').value = channel.category;

    document.querySelector('#form-ajout h3').textContent = "Modifier la chaine";
    document.getElementById('btn-form').textContent = "Modifier";
    document.querySelector('#form-ajout').classList.remove('hidden');
    localStorage.setItem('formOpen', 'true');

}
//ajouter une chaine 
export function addChannel(channels , onChange){
    const form = document.querySelector('form');          
    const erreurNom = document.getElementById('erreur-nom');
    const erreurNumber = document.getElementById('erreur-num');
    const erreurCateg = document.getElementById('erreur-categ');
    const erreurLogo = document.getElementById('erreur-logo');

    form.addEventListener('submit' ,async function(e){
        e.preventDefault();

        const name = document.getElementById('name-form').value.trim();
        const num = document.getElementById('num-form').value.trim();
        const category = document.getElementById('categ-form').value.trim();
        const logo = document.getElementById('logo-form').value ;


        erreurNom.textContent = "";
        erreurCateg.textContent = "";
        erreurNumber.textContent = "";
        erreurLogo.textContent = "";

        let valide = true;
        if(!textRegex.test(name)){
            erreurNom.textContent = "le nom de la chaine est invalide";
            valide = false;
        }
        if(!numRegex.test(num)){
            erreurNumber.textContent = "Le numéro de la chaine est invalide";
            valide = false;
        }
        if(!textRegex.test(category)){
            erreurCateg.textContent = "la category entrer est invalide";
            valide = false;
        }
        if(!valide) return;

        //mode edit
        if(editing){
            const channel = editing ;
            const update = {
                ...channel,
                name : name ,
                channelNumber : num ,
                category : category
            };

            try{
                const saved = await updateChannel(channel.id , update);
                //modifie l objet existant sur place
                Object.assign(channel , saved);

                // await updateChannel(channel.id , update);
                onChange();

                modeAjout();
                document.querySelector('#form-ajout').classList.add('hidden');
                localStorage.setItem('formOpen' , 'false');
            }catch(error){
                erreurNom.textContent = error.message ;
            }
            return;
        }
        //mode ajout
        const newChannel = {
                        "channelNumber": num,
                        "name": name,
                        "category": category,
                        "country": "France",
                        "countryCode": "FR",
                        "logo": "https://ui-avatars.com/api/?name=TLC&size=128&background=0EA5E9&color=fff&bold=true&rounded=true",
                        "previewImage": "https://picsum.photos/seed/tlc/800/450",
                        "streamUrl": "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
                        "isLive": true,
                        "epg": {
                        "currentProgram": "La maison de mes rêves",
                        "startTime": "20:30",
                        "endTime": "21:20",
                        "progressPercentage": 40
                        },
                        "isFavorite": false,
                        "isBlackListed": false
                    };
        try{
            const creer = await createChannel(newChannel);
            channels.push(creer);
            onChange();
            form.reset();
        }catch(error){
            erreurNom.textContent = error.message ;
        }
    })

}

