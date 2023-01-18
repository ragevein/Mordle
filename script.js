
//     fetch("dbcon.php", { method : "POST" })
//     .then(res => res.text()).then((txt) => {
//         console.log(txt.toString());
//         //return txt.toString();
//         show(txt);
//     });  

function dictReady( guess ){
    const gameDict = window.localStorage.getItem('Dict');
    let lThing = window.localStorage.getItem('Dict');
     if (lThing.includes(guess) === true){
        return realWord = true;
    } else {
        return realWord = false;
    }
}

// See if the property that we want is pre-cached in the localStorage
if (window.localStorage.Dict) {
    dictReady( window.localStorage.Dict );
    console.log('dict loaded');
// Load in the dictionary from the server
} else {
    $.ajax({
        method: 'GET',
        url: "../resource/dict.json",
        dataType: "json"
    })
    .done(function( data ) {
        window.localStorage.setItem('Dict', data);
    });
}

async function getWordapi(word) {
    // Storing response
    const response = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/"+word);
    // Storing data in form of JSON
    const data = await response.json();
}

async function getapi(gStatus) {
    // Storing response
    const response = await fetch("dbcon.php");
    // Storing data in form of JSON
    const data = await response.json();
    //console.log(data.word);
    let dump = document.getElementById("fatDump");
    let def = document.getElementById("def");
    let auth = document.getElementById("auth");
    let use = document.getElementById("use");
    let mess = document.getElementById("gameResult");
    console.log(gStatus);
    if (gStatus == 'winner'){
        mess.innerHTML = "Well done, You won! ";
    } else {
        mess.innerHTML = "Nice try, Better luck next time.";
    }
    dump.innerHTML = "Word: "+data.word;//.toLowerCase().charAt(0).toUpperCase()
    def.innerHTML = "Definition: "+data.def;
    use.innerHTML = "Usage: "+data.use;
    auth.innerHTML = "Auth: "+data.auth;
}

    let i = 1;
    let row = 0;
    const list = document.getElementById("list");
    const container = document.getElementById("container");
    var keyQ = document.getElementsByClassName('keys')[0];
    var keyW = document.getElementsByClassName('keys')[1];
    var keyE = document.getElementsByClassName('keys')[2];
    var keyR = document.getElementsByClassName('keys')[3];
    var keyT = document.getElementsByClassName('keys')[4];
    var keyY = document.getElementsByClassName('keys')[5];
    var keyU = document.getElementsByClassName('keys')[6];
    var keyI = document.getElementsByClassName('keys')[7];
    var keyO = document.getElementsByClassName('keys')[8];
    var keyP = document.getElementsByClassName('keys')[9];
    var keyA = document.getElementsByClassName('keys')[10];
    var keyS = document.getElementsByClassName('keys')[11];
    var keyD = document.getElementsByClassName('keys')[12];
    var keyF = document.getElementsByClassName('keys')[13];
    var keyG = document.getElementsByClassName('keys')[14];
    var keyH = document.getElementsByClassName('keys')[15];
    var keyJ = document.getElementsByClassName('keys')[16];
    var keyK = document.getElementsByClassName('keys')[17];
    var keyL = document.getElementsByClassName('keys')[18];
    var keyEnter = document.getElementsByClassName('keys')[19];
    var keyZ = document.getElementsByClassName('keys')[20];
    var keyX = document.getElementsByClassName('keys')[21];
    var keyC = document.getElementsByClassName('keys')[22];
    var keyV = document.getElementsByClassName('keys')[23];
    var keyB = document.getElementsByClassName('keys')[24];
    var keyN = document.getElementsByClassName('keys')[25];
    var keyM = document.getElementsByClassName('keys')[26];
    var keyBack = document.getElementsByClassName('keys')[27];

    keyQ.addEventListener('click', kInput);
    keyW.addEventListener('click', kInput);
    keyE.addEventListener('click', kInput);
    keyR.addEventListener('click', kInput);
    keyT.addEventListener('click', kInput);
    keyY.addEventListener('click', kInput);
    keyU.addEventListener('click', kInput);
    keyW.addEventListener('click', kInput);
    keyI.addEventListener('click', kInput);
    keyO.addEventListener('click', kInput);
    keyP.addEventListener('click', kInput);
    keyA.addEventListener('click', kInput);
    keyS.addEventListener('click', kInput);
    keyD.addEventListener('click', kInput);
    keyF.addEventListener('click', kInput);
    keyG.addEventListener('click', kInput);
    keyH.addEventListener('click', kInput);
    keyJ.addEventListener('click', kInput);
    keyK.addEventListener('click', kInput);
    keyL.addEventListener('click', kInput);
    keyEnter.addEventListener('click', kInput);
    keyZ.addEventListener('click', kInput);
    keyX.addEventListener('click', kInput);
    keyC.addEventListener('click', kInput);
    keyV.addEventListener('click', kInput);
    keyB.addEventListener('click', kInput);
    keyN.addEventListener('click', kInput);
    keyM.addEventListener('click', kInput);
    keyBack.addEventListener('click', kInput);
    
    let guess = '';
    let totalChars = word.length * 6;
    let wordL = word.length;
    let number = 0;
    let gWord = 1;
    var wordArray = [];
    let gStatus = 'playing'; 
    var closeModal = document.querySelector('#close-button');
    var closeModal2 = document.querySelector('#close-button2');
    var openModal2 = document.querySelector('#news');
    var greenLetters = ''; // to prevent overwrite of green keys back to yellow
    checkIn(guess);

closeModal.addEventListener('click', () => {
    modal.close();
});
closeModal2.addEventListener('click', () => {
    modal2.close();
});
openModal2.addEventListener('click', () => {
    modal2.showModal(); 
});

async function slow() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    modal.showModal(); 
}

function kInput(data){
    let cLetter = 0;
    if (this.id == 'back' && gStatus == 'playing'){ // backsapace catch
        if (number == 0 && number != wordL){
            // do nothing
        } else {
            guess = guess.slice(0,-1);
            number--; // set pointer back
            let wLocal = document.getElementById('w'+gWord+'L'+number);
            wLocal.innerHTML = ' ';    

        }
    } else if (gStatus == 'winner' && this.id == 'enter'){
        slow();
    } else if (guess.length < wordL && this.id == 'enter' && gStatus == 'playing'){
        wordShake(gWord); // if enter is pressed to early shake letters
    } else if (number >= wordL && this.id == 'enter' && gStatus == 'playing'){
        let cookiename = "guess"+gWord;
        // need to have a real word check might need an api for this
        if (guess == word){
            gStatus = 'winner';
            getapi(gStatus);
            let lCount;
            // flip the letters and highlight letter colors
            for (i = 0; i < wordL; i++){
                //lCount = 'w1L'+i;
                lCount = 'w'+gWord+'L'+i;
                lFlip(lCount,i);
                colorChange(lCount,'green','letter');
                colorChange(guess.charAt(i).toLowerCase(),'green','key');
            }
            setCookie(cookiename,guess);
            setCookie("win",gWord);
            slow(gStatus);
        } else {
            // check dictionary
            dictReady(guess);

            if (realWord == true){
                let cookiename = "guess"+gWord;
                setCookie(cookiename,guess,realWord);

                // then create an array with guessed word
                // prevent double clicking enter issue
                let arraThing = gWord - 1; // creating var to incriment check properly
                if (guess == wordArray[arraThing]){
                    // do nothing
                } else {
                    wordArray.push(guess);
                        // flip the letters and highlight letter colors
                    for (i = 0; i < wordL; i++){
                        lCount = 'w'+gWord+'L'+i;
                        let wLocal = document.getElementById(lCount);
                        wLocal.innerHTML = guess.charAt(i);
                        //let letterChecker = '';
                        if (guess.charAt(i) == word.charAt(i)){// SET COLOR TO GREEN  
                            lFlip(lCount,i);
                            colorChange(lCount,'green','letter');
                            colorChange(guess.charAt(i).toLowerCase(),'green','key');
                            greenLetters += guess.charAt(i);
                        } else { // TOGGLE BETWEEN GRAY AND YELLOW
                            let lColor = false;
                            let lingWord = 0;
                            let linWord = 0;
                            for (b = 0; b < wordL; b++){ // loop through real word 
                                if (guess.charAt(i) == word.charAt(b)){
                                    lColor = true; // letter is in the word just not the right spot set to yellow color
                                    linWord = linWord+1; // TOTAL SAME LETTER IN WORD
                                }
                            }
                            if (lColor == true){
                                lFlip(lCount,i);            
                                for (b = 0; b < wordL; b++){
                                    if (guess.charAt(i) == guess.charAt(b)){ 
                                        lingWord = lingWord+1; // TOTAL SAME LETTER IN GWORD
                                    }
                                }
                                if (lingWord > 1 || linWord > 1){
                                    let yEscape = false;
                                    let gCount = 0; // var to add up green guesses
                                    for (b = 0; b < wordL; b++){ // loop through real word 
                                        if (guess.charAt(i) == guess.charAt(b) && guess.charAt(i) == word.charAt(b)){
                                            yEscape = true; // to gray
                                            gCount = gCount+1; 
                                        }
                                    }
                                    if (lingWord >= linWord){
                                        if (cLetter < linWord){// let the first few go through yellow then scub them off the rest to gray  
                                                                // unless there are 2 good gueses.
                                                                // then don't go through
                                            cLetter = cLetter+1; 
                                            yEscape = false; // to yellow
                                        } else {
                                            yEscape = true; // to gray
                                        }
                                        if (gCount == linWord){
                                            yEscape = true; // bump to gray
                                        } 
                                    }
                                    if (yEscape == true){
                                        colorChange(lCount,'gray','letter'); // set to gray there are no more of this letter in word
                                        colorChange(guess.charAt(i).toLowerCase(),'green','key'); // keep keyboard green for finding a correct letter
                                    } else {
                                        colorChange(lCount,'yellow','letter'); //  there is another place this letter can go in word
                                        colorRemove = greenLetterChecker(guess.charAt(i),greenLetters);
                                    }
                                } else {
                                    colorChange(lCount,'yellow','letter');
                                    colorRemove = greenLetterChecker(guess.charAt(i),greenLetters);
                                }
                            } else { // letter is not in word set to gray
                                lFlip(lCount,i);
                                colorChange(lCount,'gray','letter');
                                colorChange(guess.charAt(i).toLowerCase(),'gray','key');
                            }
                        }
                    }// move to next guess
                    gWord++;
                    number = 0;    
                    guess = ''; 
                    let wLocal = document.getElementById('w'+gWord+'L'+number);
                    if (gWord == 7){
                        setCookie("lost",gWord);
                        gStatus = "loser";
                        getapi(gStatus);
                        slow(gStatus);
                        //modal.showModal(); 
                    }
                }
            } else {// if guess isn't a real word
                wordShake(gWord); 
            }    
            
        }
        
    } else if (this.id != 'enter' && gStatus == 'playing') {
        if (number > wordL){// do nothing
        }
        else {
            let wLocal = document.getElementById('w'+gWord+'L'+number);
            wLocal.innerHTML = this.id.toUpperCase();
            number++;    
            guess += this.id.toUpperCase();
        }
    }
}

function shaky(guess,realWord){
    if (realWord == true){
        let cookiename = "guess"+gWord;
        setCookie(cookiename,guess);
        //let letterChecker = '';
        // then create an array with guessed word
        // prevent double clicking enter issue
        let arraThing = gWord - 1; // creating var to incriment check properly
        if (guess == wordArray[arraThing]){
            // do nothing
        } else {
            wordArray.push(guess);
                // flip the letters and highlight letter colors
            for (i = 0; i < wordL; i++){
                lCount = 'w'+gWord+'L'+i;
                let wLocal = document.getElementById(lCount);
                wLocal.innerHTML = guess.charAt(i);
                //let letterChecker = '';
                if (guess.charAt(i) == word.charAt(i)){// SET COLOR TO GREEN  
                    lFlip(lCount,i);
                    colorChange(lCount,'green','letter');
                    colorChange(guess.charAt(i).toLowerCase(),'green','key');
                    greenLetters += guess.charAt(i);
                } else { // TOGGLE BETWEEN GRAY AND YELLOW
                    let lColor = false;
                    let lingWord = 0;
                    let linWord = 0;
                    for (b = 0; b < wordL; b++){ // loop through real word 
                        if (guess.charAt(i) == word.charAt(b)){
                            lColor = true; // letter is in the word just not the right spot set to yellow color
                            linWord = linWord+1; // TOTAL SAME LETTER IN WORD
                        }
                    }
                    if (lColor == true){
                        lFlip(lCount,i);            
                        for (b = 0; b < wordL; b++){
                            if (guess.charAt(i) == guess.charAt(b)){ 
                                lingWord = lingWord+1; // TOTAL SAME LETTER IN GWORD
                            }
                        }
                        if (lingWord > 1 || linWord > 1){
                            let yEscape = false;
                            let gCount = 0; // var to add up green guesses
                            for (b = 0; b < wordL; b++){ // loop through real word 
                                if (guess.charAt(i) == guess.charAt(b) && guess.charAt(i) == word.charAt(b)){
                                    yEscape = true; // to gray
                                    gCount = gCount+1; 
                                }
                            }
                            if (lingWord >= linWord){
                                if (cLetter < linWord){// let the first few go through yellow then scub them off the rest to gray  
                                                        // unless there are 2 good gueses.
                                                        // then don't go through
                                    cLetter = cLetter+1; 
                                    yEscape = false; // to yellow
                                } else {
                                    yEscape = true; // to gray
                                }
                                if (gCount == linWord){
                                    yEscape = true; // bump to gray
                                } 
                            }
                            if (yEscape == true){
                                colorChange(lCount,'gray','letter'); // set to gray there are no more of this letter in word
                                colorChange(guess.charAt(i).toLowerCase(),'green','key'); // keep keyboard green for finding a correct letter
                            } else {
                                colorChange(lCount,'yellow','letter'); //  there is another place this letter can go in word
                                colorRemove = greenLetterChecker(guess.charAt(i),greenLetters);
                            }
                        } else {
                            colorChange(lCount,'yellow','letter');
                            colorRemove = greenLetterChecker(guess.charAt(i),greenLetters);
                        }
                    } else { // letter is not in word set to gray
                        lFlip(lCount,i);
                        colorChange(lCount,'gray','letter');
                        colorChange(guess.charAt(i).toLowerCase(),'gray','key');
                    }
                }
            }// move to next guess
            gWord++;
            number = 0;    
            guess = ''; 
            let wLocal = document.getElementById('w'+gWord+'L'+number);
        }
    } else {// if guess isn't a real word
        wordShake(gWord); 
    }
}

function greenLetterChecker(subject,greenLetters){
    let count = 0;
    for (j = 0; j < greenLetters.length; j++){
        if (greenLetters.charAt(j) == subject){
            count = count+1;
        }
    }
    if (count > 0){

    }
    else {
        colorChange(guess.charAt(i).toLowerCase(),'yellow','key');

    }
}

function wordShake(word){
    console.log(word);
    var wordS = document.getElementById('w'+word);
    wordS.classList.add('shake');
    async function removeShake() {
        await new Promise(resolve => setTimeout(resolve, 500));
        wordS.classList.remove('shake');
    }
    removeShake();
}

function lFlip(position,delay){
    var umkay = document.getElementById(position);
    umkay.classList.add('flip');
}

function colorChange(position,color,type){
    var umkay = document.getElementById(position);
    if (type == 'letter'){
        if (color == 'green'){
            umkay.style.setProperty('--color', '#01a81a');
        } else if (color == 'yellow') {
            umkay.style.setProperty('--color', '#c5b803');
        } else {
            umkay.style.setProperty('--color', '#595959'); 
        }
    } else {
        if (color == 'green'){
            umkay.style.setProperty('--color3', '#01a81a');
        } else if (color == 'yellow') {
            umkay.style.setProperty('--color3', '#c5b803');
        } else {
            umkay.style.setProperty('--color3', '#595959'); 
        }
    }
}

function setCookie(cookiename,cookievalue){
    var h2midnight = new Date();
    var days = 1;
    h2midnight.setHours(0,0,0,0);
    h2midnight.setDate(h2midnight.getDate() + days); // adding a day and set to midnight to always show when next mordle is available
    var now = h2midnight;
    // var now = new Date();
    // var time = now.getTime();
    // time += 3600 * 1000;
    // now.setTime(time);
    document.cookie = cookiename + "=" + cookievalue + '; expires=' + now.toUTCString() + ';';
    //console.log(document.cookie);
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
    }

function checkIn(cookievalue){
    var now = new Date().getDate();
    let date = getCookie("date");
    if (date == "" || date != now){
        document.cookie = "date=" + now;
    } else {
        if (getCookie("guess1")){
            letterTile(getCookie("guess1"));
            if (getCookie("guess2")){
                gWord = 2;
                letterTile(getCookie("guess2"));
                if (getCookie("guess3")){
                    gWord = 3;
                    letterTile(getCookie("guess3"));
                    if (getCookie("guess4")){
                        gWord = 4;
                        letterTile(getCookie("guess4"));
                        if (getCookie("guess5")){
                            gWord = 5;
                            letterTile(getCookie("guess5"));
                            if (getCookie("guess6")){
                                gWord = 6;
                                letterTile(getCookie("guess6"));
                            }
                        }
                    }
                }
            }
        } 
    }
    //let status = getCookie("win");
    if (getCookie("win")){
        gStatus = "winner";
        getapi(gStatus);
        modal.showModal(); 
    }
    if (getCookie("lost")){
        gStatus = "loser";
        getapi(gStatus);
        modal.showModal(); 
    }
}
    // The dictionary lookup object
var dict = {};
 
// function spellCheck(word){
//     realWord = true;
//         // And see if it's in the dictionary
//         if ( dict[ word ] ) {
//             // If it is, return that word
//             //return word;
//             return realWord = true;
//         }  
//         console.log(dict[word]+word); 
// }

async function getWordapi(gword) {
        // Storing response
    var urlthing = "https://api.dictionaryapi.dev/api/v2/entries/en/"+gword;
    var response = await fetch(urlthing);
    // Storing data in form of JSON
    var data = await response.json();
    var dataS = JSON.stringify(data);
    

if (dataS.search("No Definitions Found") == 10){
    console.log("no such word");
    realWord = false;
    shaky(gword,realWord);
}
else {
    console.log("word exists");
    realWord = true;
    shaky(gword,realWord);    
    number = 0;    
    guess = '';
}

};

// timer on success ------------------------------------------------------------
var h2midnight = new Date();
var days = 1;
h2midnight.setHours(0,0,0,0);
h2midnight.setDate(h2midnight.getDate() + days); // adding a day and set to midnight to always show when next mordle is available

// Update the count down every 1 second
var x = setInterval(function() {
    // Get today's date and time
    var now = new Date().getTime();
    // Find the distance between now and the count down date
    var distance = h2midnight - now;
    // Time calculations for days, hours, minutes and seconds
    //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    // Display the result in the element with id="demo"
    document.getElementById("countDown").innerHTML = "Next Mordle in " + hours + "h "
    + minutes + "m " + seconds + "s ";
    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countDown").innerHTML = "Next Mordle Now";
    }
}, 1000);

function letterTile(guess){
    wordArray.push(guess);
    let cLetter = 0;
    // flip the letters and highlight letter colors
    for (i = 0; i < wordL; i++){
        lCount = 'w'+gWord+'L'+i;
        let wLocal = document.getElementById(lCount);
        wLocal.innerHTML = guess.charAt(i);
        if (guess.charAt(i) == word.charAt(i)){// SET COLOR TO GREEN  
            lFlip(lCount,i);
            colorChange(lCount,'green','letter');
            colorChange(guess.charAt(i).toLowerCase(),'green','key');
            greenLetters += guess.charAt(i);
        }
        else { // TOGGLE BETWEEN GRAY AND YELLOW
            let lColor = false;
            let lingWord = 0;
            let linWord = 0;
            
            for (b = 0; b < wordL; b++){ // loop through real word 
                if (guess.charAt(i) == word.charAt(b)){
                    lColor = true; // letter is in the word just not the right spot set to yellow color
                    linWord = linWord+1; // TOTAL SAME LETTER IN WORD
                }
            }
            if (lColor == true){
                lFlip(lCount,i);            
                for (b = 0; b < wordL; b++){
                    if (guess.charAt(i) == guess.charAt(b)){ 
                        lingWord = lingWord+1; // TOTAL SAME LETTER IN GWORD
                    }
                }
                //console.log ( ' ' + lingWord + ' > ' + linWord);
                if (lingWord > 1 || linWord > 1){
                    let yEscape = '';
                    let gCount = 0; // var to add up green guesses
                        for (b = 0; b < wordL; b++){ // loop through real word 
                            if (guess.charAt(i) == guess.charAt(b) && guess.charAt(i) == word.charAt(b)){
                                gCount = gCount+1; 
                                yEscape = true; // to gray
                            }
                        }
                            if (lingWord >= linWord){
                                if (cLetter < linWord){// let the first few through then scub them off the rest to gray  
                                cLetter = cLetter+1; 
                                    yEscape = false; // to yellow
                                } else {
                                    yEscape = true; // to gray
                                } 
                                if (gCount == linWord){
                                    yEscape = true; // to gray
                                } 
                            }
                        if (yEscape == true){
                            colorChange(lCount,'gray','letter'); // set to gray there are no more of this letter in word
                            colorChange(guess.charAt(i).toLowerCase(),'green','key'); // keep keyboard green for finding a correct letter
                        } else {
                            colorChange(lCount,'yellow','letter'); //  there is another place this letter can go in word
                        }
                } else {
                    colorChange(lCount,'yellow','letter');
                    colorChange(guess.charAt(i).toLowerCase(),'yellow','key');
                }
            } else { // letter is not in word set to gray
                lFlip(lCount,i);
                colorChange(lCount,'gray','letter');
                colorChange(guess.charAt(i).toLowerCase(),'gray','key');
            }
        }
    }// move to next guess
    gWord++;
    number = 0;    
    guess = ''; 
    let wLocal = document.getElementById('w'+gWord+'L'+number);
}