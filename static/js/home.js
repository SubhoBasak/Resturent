document.getElementById("button").addEventListener("click", function(){
    document.querySelector(".popup").style.display = "flex";
})

document.querySelector(".close").addEventListener("click", function(){
    document.querySelector(".popup").style.display = "none";
})


// // -----------------------CAROUSEL--------------------

// let btn = document.getElementsByClassName("butn");
// let prev = document.getElementsByClassName('butn')[0];
// let picture = document.getElementById("picture");
// for (let i=0; i<btn.length; i++){
//     btn[i].addEventListener('click', function(e){
//         prev.removeAttribute('class','active')
//         e.target.setAttribute('class','active')
//         prev = e.target;
//     });
// }

//     btn[0].onclick = function(){
//         picture.src = "https://source.unsplash.com/1600x700/?nature,water";
//     }
//     btn[1].onclick = function(){
//         picture.src = "assets/Essence_img/pic2.png";
//     }
//     btn[2].onclick = function(){
//         picture.src = "assets/Essence_img/pic3.png";
//     }
//     btn[3].onclick = function(){
//         picture.src = "assets/Essence_img/pic4.png";
//     }

const typedTextSpan = document.querySelector(".typed-text");

const textArray = ["Restaurant","Cafeteria","Fast-Food","Dinner"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type(){
    if (charIndex < textArray[textArrayIndex].length){
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex ++;
        setTimeout(type, typingDelay);
    }
    else
    {
        setTimeout(erase, newTextDelay);
    }
}

function erase(){
    if (charIndex > 0 ){
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0,charIndex-1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    }
    else{
        textArrayIndex++;
        if(textArrayIndex>=textArray.length) textArrayIndex=0;
        setTimeout(type, typingDelay + 900);
    }
}

document.addEventListener("DOMContentLoaded",function(){
    setTimeout(type, newTextDelay + 250);
})