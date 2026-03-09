let currentLang = 'fr';

async function loadLang(lang){
    const response = await fetch('/json/lang.json');
    const translations = await response.json();
    currentLang = lang;

    for(const [id, text] of Object.entries(translations[lang])){
        const el = document.getElementById(id);
        if(el) {
            el.innerHTML = text;
        }
    }
}

const userLang = navigator.language.startsWith('en') ? 'en' : 'fr';
const btnEN = document.getElementById("btn-en");
const btnFR = document.getElementById("btn-fr")
loadLang(userLang);
setLangueButton();



btnEN.addEventListener('click', ()=> {

    loadLang("en");
    setLangueButton("en");
});
btnFR.addEventListener('click', ()=> {

    loadLang("fr");
    setLangueButton("fr");
});

function setLangueButton(lang){
    if(lang == 'fr'){
        btnEN.classList.remove("langue-active");
        btnFR.classList.add("langue-active");
    }
    else{
        btnEN.classList.add("langue-active");
        btnFR.classList.remove("langue-active");
    }
}