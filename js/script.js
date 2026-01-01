

const page = window.location.pathname.split("/").pop().replace(".html", "");
console.log(page);

const images = [];

let link = "/img/" + page + "/";
let i = 1;

while(true){
    let img = new Image();
    let src = `${link}image${i}.png`
    img.src = src;

    img.onload = () => {
        images.push(src);
        console.log("Loaded: " + src);
    }

    img.onerror = () =>{
        console.log("Failed: " + src);
        i = 50;
    }
        i++;
    if(i>50) break;
}

console.log("nb image : " + images.length);


let index = 1;
const slide = document.getElementById("slide");

document.querySelector(".next").onclick = () =>{
    index = (index + 1 ) % images.length;
    slide.src = images[index];
};

document.querySelector(".prev").onclick = () =>{
    index = (index - 1 + images.length) % images.length;
    slide.src = images[index];
    console.log("click prev");
};

