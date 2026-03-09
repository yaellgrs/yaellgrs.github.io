const page = window.location.pathname.split("/").pop().replace(".html", "");

const BASE_PATH = "/img/" + page + "/image";
console.log("BASE_PATH"+  BASE_PATH);
const EXTENSIONS_TYPE = ["png", "mp4"]; //rajouter jpg plus tard 
const MAX_FILES = 50; 

const files = [];
let current_index = 0;

const container = document.getElementById("slide");

function loadFiles(index = 1, ext = 0){
    if(index >= MAX_FILES){ //fin du recursif
        renderFiles();
        return;
    }

    let type =  EXTENSIONS_TYPE[ext]
    let path = BASE_PATH + index + "." + type;

    fetch(path, {method: "GET"})
        .then(res =>{
            if(res.ok){
                files.push({path, type: type});
                loadFiles(index +1); 
            }
            else{
                if (ext + 1 < EXTENSIONS_TYPE.length) {
                    loadFiles(index, ext + 1);
                } else {
                    renderFiles();
                    return;
                    loadFiles(index + 1, 0);
                }
            }
        })
        .catch(err =>{
            if (ext + 1 < EXTENSIONS_TYPE.length) {
                loadFiles(index, ext + 1);
            } else {
                loadFiles(index + 1, 0);
            }
        }
    );

}

function renderFiles(){
    if(files.length <= 0) return;
    container.innerHTML = ""; //reset
    const file = files[current_index]
    if(!file) return;

    let elem;

    if(file.type == "png"){
        elem = document.createElement("img");
        elem.src = file.path;
    }
    else if(file.type == "mp4"){
        elem = document.createElement("video");
        elem.src = file.path;
        elem.autoplay = true;
        elem.controls = true;
        elem.autoplay = true;
        elem.loop = true;
        elem.muted = true;
    }

    elem.id = "slide";
    container.appendChild(elem);
    renderDots();
}

function renderDots(){
    const dots_container = document.getElementById("dots");

    nb = files.length;

    dots_container.innerHTML = "";

    dots_container.style.gridTemplateColumns = `repeat(${nb}, auto)`;

    for(let i = 0; i < nb; i++){
        let dot = document.createElement("div");

        dot.classList.add("dot");  

        if(i == current_index){
            dot.style.backgroundColor = "#000000";
        }
        else{
            dot.style.backgroundColor = "#212121";
            dot.addEventListener("click", ()=>{
                current_index = i;
                renderDots();
                renderFiles();
                console.log("click");
            });
        }
        dots_container.appendChild(dot);
    }
}

let slider = document.getElementById("slide");

if(slider){
    loadFiles();
    renderDots();

    document.querySelector(".next").addEventListener("click", () => {
    current_index = (current_index + 1) % files.length;
    renderFiles();
});

document.querySelector(".prev").addEventListener("click", () => {
    current_index = (current_index - 1 + files.length) % files.length;
    renderFiles();
});


}


//

let current_elem;
let isClick = false;

const overlay = document.getElementById("overlay");

//
document.querySelectorAll(".presentation li, .profil li").forEach(li=>{
    li.addEventListener("mouseenter", () => {
        console.log("enter");
        let elem = document.getElementById(li.dataset.skill);
        if(current_elem && elem != current_elem) {
            current_elem.classList.remove("description-show");
            isClick = false;
        }
        if(elem) {
            console.log("add class");
            elem.classList.add("description-show");}
    });
    li.addEventListener("mouseleave", () => {
        let elem = document.getElementById(li.dataset.skill);
        if(elem && !isClick) elem.classList.remove("description-show");

    });
    document.querySelectorAll(".description").forEach(desc => {
        desc.addEventListener("click", (e) => {
            e.stopPropagation();
            });
        desc.addEventListener("mouseleave", (e) => {
            e.stopPropagation();
            });
        desc.addEventListener("mouseenter", (e) => {
            e.stopPropagation();
            });
    });
    document.addEventListener("click", () => {
        isClick = false;
        if(current_elem) {

            current_elem.classList.remove("description-show-big");
            overlay.classList.remove("overlay-show");
        }
    });
    li.addEventListener("click", (e) => {
        e.stopPropagation();
        current_elem = document.getElementById(li.dataset.skill);
        isClick = true;
        if(current_elem) {

            current_elem.classList.remove("description-show");
            current_elem.classList.add("description-show-big");
            overlay.classList.add("overlay-show");
        }
    });

})


const table = document.querySelector(".table");

window.addEventListener("scroll", () =>{
    let scrollTop = window.scrollY || document.documentElement.scrollTop;


    if(scrollTop > 50){
        table.classList.add("table-hide");
    }
    else{
        table.classList.remove("table-hide");
    }
});

