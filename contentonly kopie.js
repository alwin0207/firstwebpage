var myEnd = 666; // waarde om einde zin aan te geven.
var zinEen = ["H","a","l","l","o",","," ","M","i","j","n"," ","n","a","a","m"," ","i","s"," ","A","l","w","i","n","!",myEnd,"","","","","","","","","","",""];
var zinTwee = ["D","i","t"," ","i","s"," ","m","i","j","n"," ","t","e","k","s","t","e","f","f","e","c","t",".",myEnd,"","","","","","","","","","","",""];
var zinDrie = ["M","o","o","i"," ","h","e","h"," ",":",")",myEnd,"","","","","","","","","","","","","","","","","","","","","","","","",""];
var clicker = document.getElementById("texttrick").addEventListener("wheel", nextLetter);//animationSpeed);// throttled(1, nextLetter));
var invoegVak = document.getElementById("invoegvak");

/* 
1. Maak een 2d array van zin/leeg/zin2/leeg/zin3
2. Stel bij elke zin de nieuwe zinarray in 
3. Zet dan voor  elke letter de classes op hidden
4. append childs.
5. Zet voor letter 1 de visibility op visible.
6. Bij myEnd moet de visibility weer naar 0 vanaf letter 1.
*/

var stringMemory = [];
var textMemory = [];
var currentLetter;
var currentIndex = 0;
var currentClick = 0;
var hideClick = false;
var currentSentence = 0;
var sentences = [zinEen, zinTwee, zinDrie];
var speed = 0;
var limiter;
var infiniteCombo = false;
var scrollTime = 3; 
var scrollIntervalTime = 50; // in miliseconds
var scrollTimer = 0;


function animationSpeed(){
    if(scrollTimer === 0){
        if (infiniteCombo===false){
        scrollTimer = scrollTime;
        limiter = setInterval(nextLetter, scrollIntervalTime);
        infiniteCombo = true;
        }
    }

}


function loadString(stringArray){
    // leeg eerst het invoegvak.
    while(invoegVak.hasChildNodes()){
        invoegVak.removeChild(invoegVak.firstChild);
    }

    console.log("laad string")
    stringMemory = 0;
    stringMemory = [];
    textMemory = 0;
    textMemory = [];
    while (stringArray[currentIndex]!=666){
        currentLetter = stringArray[currentIndex];
        stringMemory.push(document.createElement("span"));
        textMemory.push(document.createTextNode(currentLetter));
        stringMemory[currentIndex].appendChild(textMemory[currentIndex]);
        invoegvak.appendChild(stringMemory[currentIndex]);
        stringMemory[currentIndex].className = "hideme";
        currentIndex++;
    }
    stringMemory.push("stop");
    currentIndex = 0;
}
console.log(stringMemory);
function nextLetter(){
    (console.log(speed));
    speed++;
    if ((hideClick != false)||(hideClick === 0)){
        console.log("optie 1");
        if (stringMemory[hideClick] === "stop"){
            loadString(sentences[currentSentence]);
            currentSentence++;
            currentClick = 0; 
            hideClick = false;

        }
        else{
            console.log(hideClick);
            stringMemory[hideClick].className = "hideme";
            hideClick++;
        }
    }
    else{
        console.log("optie 2");
        if (stringMemory.length===0){
            loadString(sentences[currentSentence]);
            currentSentence++;
            currentClick=0;
            console.log(stringMemory);
        }
        else if (stringMemory[currentClick] === "stop"){
            console.log("found stop");
            console.log(hideClick);
            if (hideClick === false){
                console.log("found hideClick");
                console.log(hideClick);
                hideClick = 0;
            }

        }
        else{
            stringMemory[currentClick].className = "showme";
            currentClick++;
            console.log(currentClick);
        }
    } 
    if (scrollTimer>0){
        scrollTimer--;
    } 
    else if (scrollTimer === 0){
        clearInterval(limiter);
        infiniteCombo = false;
    } 
}