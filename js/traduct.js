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
loadLang(userLang);

document.getElementById("btn-en").addEventListener('click', ()=> loadLang("en"));
document.getElementById("btn-fr").addEventListener('click', ()=> loadLang("fr"));