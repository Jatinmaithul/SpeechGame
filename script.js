const msgEl = document.getElementById("msg");

const randomNum = getRandomNumber();

console.log("Random Number :", randomNum);

window.SpeechRecognition = window.SpeechRecognition||window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();
recognition.start();

function getRandomNumber(){
    return Math.floor(Math.random()*100)+1;
}


function writeMessage(msg){
    msgEl.innerHTML =`<div> You said:</div>
    <span class ="box">${msg}</span>`;
}

function checkNumber(msg){
    const num = +msg;
    if(Number.isNaN(num)){
        msgEl.innerHTML +=`<div> That is not a Valid Number</div>`;
        return ;
    }
    if(num > 100|| num<1){
        msgEl = innerHTML += `<div>Number must be between 1 and 100</div>`;
        return;
    }
    if(num === randomNum){
        document.body.innerHTML = `<h2>Congrats you have guessed the Number<br><br>
        It was ${num}</h2>
        <button class = "play-again" id ="play-again">Play Again</button>`;

    }else if( num > randomNum){
        msgEl.innerHTML += `<div> GO LOWER</div>`;
    }else{
        msgEl.innerHTML += `<div> GO HIGHER</div>`;
    }
}

function onSpeak(e){
    const msg = e.results[0][0].transcript;
    writeMessage(msg);
    checkNumber(msg);
}

recognition.addEventListener("result", onSpeak);

recognition.addEventListener("end",()=>recognition.start());
document.body.addEventListener("click" ,(e)=>{
    if(e.target.id =="play-again"){
        window.location.reload();
    }
})