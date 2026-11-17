import { createChannel } from "../services/api.js";
const textRegex = /^[a-zA-Z0-9]{2,}$/;
const numRegex = /^[0-9]{1,4}$/;
export function addChannel(){
    const form = document.querySelector('form');
    const btn = document.getElementById('btn-form');
    const erreurNom = document.getElementById('erreur-nom');
    const erreurNumber = document.getElementById('erreur-num');
    const erreurCateg = document.getElementById('erreur-categ');
    const erreurLogo = document.getElementById('erreur-logo');

    form.addEventListener('submit' , function(e){
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
    })

}

/*<section id="form-ajout" class="hidden flex flex-col gap-4 absolute bg-[#C9BEFF] top-30 left-[10%] w-full md:w-[50%] lg:w-[40%] font-mono text-[#6A4BF0] p-8 rounded-xl" >
        <h3 class="text-3xl">Ajouter une chaine</h3>
        <form action="" class="flex flex-col gap-8 ">
            <div class="flex flex-col gap-4">
                <label for="name">Nom de la chaine</label>
                <input id="name-form" type="text" class="border border-[#6A4BF0] rounded-full text-center text-[#6A4BF0] p-2" placeholder="name of channel">
                <span id="erreur-nom" class="text-[#8B0000]"></span>
            </div>
            <div class="flex flex-col gap-4">
                <label for="channelNumber">Numéro de la chaine</label>
                <input id="num-form" type="text"  class="border border-[#6A4BF0] rounded-full text-center text-[#6A4BF0] p-2" placeholder="number of channel">
                <span id="erreur-num" class="text-[#8B0000]"></span>
            </div>
            <div class="flex flex-col gap-4">
                <label for="category">Category de la chaine</label>
                <input id="categ-form" type="text"  class="border border-[#6A4BF0] rounded-full text-center text-[#6A4BF0] p-2" placeholder="category of channel">
                <span id="erreur-categ" class="text-[#8B0000]"></span>
            </div>
            <div class="flex flex-col gap-4">
                <label for="logo">Logo de la chaine</label>
                <input id="logo-form" type="file"  class="border border-[#6A4BF0] rounded-full text-center text-[#6A4BF0] p-2">
                <span id="erreur-logo" class="text-[#8B0000]"></span>
            </div>
            <button type="button" id="btn-form" class="border bg-[#6A4BF0] text-white rounded-3xl p-2">Ajouter</button>
        </form>
    </section> */