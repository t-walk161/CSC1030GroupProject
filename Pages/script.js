//JS#
const regex = /^\D*$/;

// Options Menu
// audio 
var audio = new Audio("../Audio/menuSong.mp3");


function playAudio() {
    // play the audio
    audio.play();
}

function stopAudio() {
    // pause the audio
    audio.pause();
}

function setVolume() {
    // volume slider
    audio.volume = document.getElementById("volume-slider").value;
}

//change text size
function changeFontSize(size) {
    var items = document.querySelectorAll(".gameText");
    for (var i = 0; i < items.length; i++) {
        items[i].style.fontSize = size + "px";
    }
}

//The input name function also initiates the sessionStorage for other tracked variables.
function inputName() {
    var name = document.getElementById("enterNameBox").value;
    if (name == "" || name.length < 3 || name.length > 45 || !regex.test(name)) {
        alert("Names should not be blank, between 3 and 45 letters, and contain no digits")
    }
    else {
        sessionStorage.setItem("userName", name);
        sessionStorage.setItem("clicksMade", 0);
        sessionStorage.setItem("NoOfDecisionsMade", 0);
        sessionStorage.setItem("remainingTeamMembers", 4);
        sessionStorage.setItem("actualTake", 0);

        console.log("Name Successfully Set To " + sessionStorage.getItem("userName"));
        document.getElementById("enterName").classList.add("hideMe");
        document.getElementById("enterName").classList.remove("showMe");
        document.getElementById("modeSelect").classList.add("ShowMe");
        document.getElementById("modeSelect").classList.remove("hideMe");
    }
}
function setDifficulty() {
    var timeRemaining = 0;
    switch (document.getElementById("difficultySelect").value) {
        case "easy": timeRemaining = 300000; break; //5 Mins
        case "med": timeRemaining = 180000; break; //3 Mins
        case "hard": timeRemaining = 90000; break; //1.5 Mins
    }
    sessionStorage.setItem("timeRemaining", timeRemaining);
    console.log("Time Remaining Set To " + sessionStorage.getItem("timeRemaining"));
}
function startGame() {
    startTimer();
    setRandCode();
    toggleStickyNote();
}
//When using the typeText function, the first element inputted should be the id of the element you want to type in, and the second should be the text you want to type.
let stopText = false;
function typeText(element, text) {
    element.innerHTML = "";
    var charIndex = 0;
    var intervalId = setInterval(function () {
        if (stopText) {
            if (charIndex == 0) {
                stopText = false;
            }
            else {
                clearInterval(intervalId);
                stopText = false;
                return;
            }
        }
        var nextChar = text.charAt(charIndex);
        element.innerHTML += nextChar;
        charIndex++;
        if (charIndex >= text.length) {
            clearInterval(intervalId);
        }
    }, 5);
}

function showScene(num) {
    var sections = document.getElementsByTagName("section");
    for (var i = 0; i < sections.length; i++) {
        sections[i].style.display = "none";
    }
    document.getElementById("scene" + num).style.display = "block";
    document.getElementById("backgroundImg").style.backgroundImage = "url('../photos/" + num + ".png')";
    startScene(num);
}
function startScene(num) {
    switch (num) {
        case 2: scene2(); break;
        case 3: scene3(); break;
        case 4: scene4(); break;
        case 5: scene5(); break;
        case 7: scene7(); break;
        case 8: scene8(); break;
        case 9: scene9(); break;
        case 10: scene10(); break;
        default: console.log("WARNING: Selected Scene does not have any function");
    }
}

//Functions to run scenes

//Scene 2
function scene2() {
    var p1 = document.getElementById("textS2P1")
    typeText(p1, "Ok it's time. Be prepared for anything " + sessionStorage.getItem('userName') + ", this could get intense. Stay alert and stay sharp.")
}

//Scene 3
function scene3() {
    var p1 = document.getElementById("textS3P1");
    typeText(p1, "There's no turning back now " + sessionStorage.getItem('userName') + "! Let's get cracking! Take out your gun and fire a few shots to scare these people.");
    document.getElementById("startHeist").disabled = false;
}
//Scene 4
function scene4() {
    var p1 = document.getElementById("textS4P1");
    typeText(p1, "Great that worked better than expected, everyone is on the floor. Do you want to leave someone on crowd control " + sessionStorage.getItem('userName') + "? It means we can't lift as much from the vault, but it would stop these civies hitting the silent alarm.")
}
function assignCrowdControl() { // This function is called when the user selects to assign someone to crowd control.
    stopText = true;
    sessionStorage.setItem("crowdControl", "true");
    document.getElementById("crowdYes").classList.add("hideMe")
    document.getElementById("crowdNo").classList.add("hideMe");
    var p1 = document.getElementById("textS4P1");
    typeText(p1, "Good call " + sessionStorage.getItem('userName') + " , we'll leave someone on crowd control, better safe than sorry and the teller has given us a note. Let's get to work on that vault.")
    sessionStorage.setItem("remainingTeamMembers", sessionStorage.getItem("remainingTeamMembers") - 1);
    sessionStorage.setItem("NoOfDecisionsMade", parseInt(sessionStorage.getItem("NoOfDecisionsMade")) + 1);
    document.getElementById("crowdContinue").classList.remove("hideMe");
    document.getElementById("showSticky").classList.remove("hideMe");
}
function notAssignCrowdControl() { // This function is called when the user selects not to assign someone to crowd control.
    stopText = true;
    sessionStorage.setItem("crowdControl", "false");
    document.getElementById("crowdYes").classList.add("hideMe");
    document.getElementById("crowdNo").classList.add("hideMe");
    var p1 = document.getElementById("textS4P1");
    let APIurl = "http://andymcdowell.hosting.hal.davecutting.uk/1030_APIs/diceRollWithInputs.php";
    let args = "?diceFaceNumber=3&diceNumber=1";
    var rollResult
    fetch(APIurl + args)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        }).then(function (data) {
            if (data.err) {
                alert(data.errMsg);
            } else {
                rollResult = data["0"]["result"];
                console.log("Roll returned " + rollResult + " out of 3.");
                console.log("Int: " + parseInt(rollResult));
                if (parseInt(rollResult) < 3) {
                    typeText(p1, "You're right " + sessionStorage.getItem('userName') + " , we can't afford........ OH NO " + sessionStorage.getItem('userName').toUpperCase() + "! The crowd has hit the silent alarm! The police are gonna get here even sooner! We also found a note on the floor.");
                    sessionStorage.setItem("timeRemaining", parseInt(sessionStorage.getItem("timeRemaining")) - 30000);//Changed Penalty to 30 seconds instead of 1 minute, felt to hard for hard mode.
                    console.log("Time Remaining Set To " + sessionStorage.getItem("timeRemaining"));
                }
                else {
                    typeText(p1, "You're right" + sessionStorage.getItem('userName') + " , we can't afford to leave someone on crowd control. Let's get to work on that vault. What's this, the teller has given us a note.");
                }
                sessionStorage.setItem("NoOfDecisionsMade", parseInt(sessionStorage.getItem("NoOfDecisionsMade")) + 1);
                document.getElementById("crowdContinue").classList.remove("hideMe");
            }
        }).catch(function (error) {
            console.log(error.message);
        });
}
function scene5() {
    stopText = true;
    var p1 = document.getElementById("textS5P1");
    typeText(p1, "Right boss, we're at the vault. Time to get to work, do you want to blow up the door, it will be faster but it's dangerous, or we could drill into the vault, but it will take longer. What do you want to do?")

}
function drillDoor() {
    stopText = true;
    var p1 = document.getElementById("textS5P1");
    typeText(p1, "Ok, we'll drill into the vault. Let's get to work.");
    document.getElementById("scene5StartButtons").style.visibility = "hidden";
    document.getElementById("scene5DrillButtons").style.visibility = "visible";
}
function prepBlowUpDoor() {
    stopText = true;
    document.getElementById("scene5StartButtons").style.visibility = "hidden";
    document.getElementById("scene5BombButtons").style.visibility = "visible";
    var p1 = document.getElementById("textS5P1");
    typeText(p1, "All right the bombs all set, ready to set it off?");

}
function blowUpDoor() {
    stopText = true;
    document.getElementById("scene5StartButtons").style.visibility = "hidden";
    document.getElementById("scene5BombButtons").style.visibility = "hidden";
    var p1 = document.getElementById("textS5P1");
    let APIurl = "http://andymcdowell.hosting.hal.davecutting.uk/1030_APIs/coinFlip.php";
    var flipResult
    fetch(APIurl)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        }).then(function (data) {
            if (data.err) {
                alert(data.errMsg);
            } else {
                flipResult = data.coinFlip;
                console.log("Flip returned " + flipResult);
                if (flipResult == "Heads") {
                    showScene(6)
                    scene6(1)
                }
                else {
                    showScene(6)
                    scene6(2)
                }
                sessionStorage.setItem("NoOfDecisionsMade", parseInt(sessionStorage.getItem("NoOfDecisionsMade")) + 1);
            }
        }).catch(function (error) {
            console.log(error.message);
        });
}
//Scene 6 - Security Gate
function scene6(arg) {
    stopText = true;
    var p1 = document.getElementById("textS6P1");
    if (arg == 0) { //DRILLED INTO VAULT
        sessionStorage.setItem("timeRemaining", parseInt(sessionStorage.getItem("timeRemaining")) - 30000); // 30 Second Time reduction
        typeText(p1, "Ok, we've drilled into the vault, but that took a while, we lost 30 seconds. Let's pick it up!");
    }
    else if (arg == 1) { //BLOWN UP DOOR
        typeText(p1, "Ok, we've blown up the door, but we're low on time we need to keep moving!");
    }
    else if (arg == 2) { //BLOWN UP DOOR LOST TEAM
        sessionStorage.setItem("remainingTeamMembers", parseInt(sessionStorage.getItem("remainingTeamMembers")) - 1);
        typeText(p1, "Ok, we've blown up the ... OH NO! The door blew up and killed one of the team! There's only " + sessionStorage.getItem("remainingTeamMembers") + " of us left, but we need to keep moving");
    }
}

function scene7() { //scene 7 - Get Money
    stopText = true;
    var p1 = document.getElementById("textS7P1");
    typeText(p1, "Ok, we're in the vault, let's get to work. Start grabbing the money, but let's get out of here as soon as we can.");
}
function getMoney() {
    var remainingTeamMembers = parseInt(sessionStorage.getItem("remainingTeamMembers"));
    var actualTake = parseInt(sessionStorage.getItem("actualTake")) || 0;
    var maxTake = remainingTeamMembers * 100000;
    var amountToAdd = Math.min((remainingTeamMembers * 25000), maxTake - actualTake);

    if (actualTake >= maxTake) {
        // The player has already maxed out their take
        console.log(actualTake);
        var p1 = document.getElementById("textS7P1");
        p1.innerHTML = "You've already maxed out your take. Time to leave!";
    } else if (actualTake + amountToAdd >= maxTake) {
        // This is the final click, add the remaining amount up to the max value
        var remainingToAdd = maxTake - actualTake;
        actualTake += remainingToAdd;
        sessionStorage.setItem("actualTake", actualTake);

        var p1 = document.getElementById("textS7P1");
        p1.innerHTML = "Ok " + sessionStorage.getItem("userName") + ", you've added $" + remainingToAdd.toLocaleString() + " to your take. Total: $" + actualTake.toLocaleString() + " (max: $" + maxTake.toLocaleString() + ")";
    } else {
        // Not the final click, add the usual amount
        actualTake += amountToAdd;
        sessionStorage.setItem("actualTake", actualTake);
        maxTake = remainingTeamMembers * 100000;
        amountToAdd = Math.min((remainingTeamMembers * 25000), maxTake - actualTake);
        var p1 = document.getElementById("textS7P1");
        p1.innerHTML = "Ok " + sessionStorage.getItem("userName") + ", you've added $" + amountToAdd.toLocaleString() + " to your take. Total: $" + actualTake.toLocaleString() + " (max: $" + maxTake.toLocaleString() + ")";
    }
}


//scene 8 tripping over 
function scene8() {
    var p1 = document.getElementById("textS8P1");
    if (sessionStorage.getItem("crowdControl") == "true") {
        typeText(p1, "We've grabbed the guy we left on crowd control on the way out and gave him some money to hold, but another crew member tripped over and dropped the money. Do you want to help the crew or leave them to it? We'll lose the their money if we leave them!");
        sessionStorage.setItem("remainingTeamMembers", parseInt(sessionStorage.getItem("remainingTeamMembers")) + 1);
    }
    else {
        typeText(p1, "Oh no! a crew member tripped over and dropped the money. Do you want to help the crew or leave them to it?");
    }
}

function helpCrew() {
    stopText = true;
    sessionStorage.setItem("NoOfDecisionsMade", parseInt(sessionStorage.getItem("NoOfDecisionsMade")) + 1);
    sessionStorage.setItem("timeRemaining", parseInt(sessionStorage.getItem("timeRemaining")) - 30000); // 30 Second Time reduction
}
function leaveCrew() {
    stopText = true;
    var takePerPerson = sessionStorage.getItem("actualTake") / sessionStorage.getItem("remainingTeamMembers");
    sessionStorage.setItem("remainingTeamMembers", parseInt(sessionStorage.getItem("remainingTeamMembers")) - 1);
    sessionStorage.setItem("actualTake", parseInt(sessionStorage.getItem("actualTake")) - takePerPerson);
    sessionStorage.setItem("timeRemaining", parseInt(sessionStorage.getItem("timeRemaining")) - 30000); // 30 Second Time reduction
    sessionStorage.setItem("NoOfDecisionsMade", parseInt(sessionStorage.getItem("NoOfDecisionsMade")) + 1);
}

//success screen
function scene9() {
    var p1 = document.getElementById("textS9P1");
    typeText(p1, "Good Job " + sessionStorage.getItem("userName") + ", you completed the job with just " + (sessionStorage.getItem("timeRemaining") / 1000) + " seconds left, gathering a total of $" + Math.round(sessionStorage.getItem("actualTake")) + " between a total of " + sessionStorage.getItem("remainingTeamMembers") + " crew members. You made " + sessionStorage.getItem("NoOfDecisionsMade") + " decisions during the heist.");

}
//failed screen 
function scene10() {
    var p1 = document.getElementById("textS10P1");
    typeText(p1, "Unlucky " + sessionStorage.getItem("userName") + ", you failed the job because you ran out of time. You made " + sessionStorage.getItem("NoOfDecisionsMade") + " decisions during the heist, and you could have walked away with $" + Math.round(sessionStorage.getItem("actualTake")) + " between a total of " + sessionStorage.getItem("remainingTeamMembers") + " crew members.");

}
function hideTimer() {
    var timer = document.getElementById("timer");
    timer.style.visibility = "hidden";
}
function showTimer() {
    var timer = document.getElementById("timer");
    timer.style.visibility = "visible";
}
let timerStop = false;
function startTimer() {
    showTimer();
    var timer = document.getElementById("timer");
    var timeRemaining = sessionStorage.getItem("timeRemaining");
    var minutes = Math.floor(timeRemaining / 60000);
    var seconds = ((timeRemaining % 60000) / 1000).toFixed(0);
    timer.innerHTML = 'Time Remaining: ' + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    timeRemaining = timeRemaining - 1000;
    sessionStorage.setItem("timeRemaining", timeRemaining);
    if (timerStop == true) {
        return;
    } else
        if (timeRemaining <= 0) {
            //TIMER IS UP
            timer.style.visibility = "hidden";
            showScene(10);
            stopTimer();

        }
        else {
            setTimeout(startTimer, 1000);
        }
}
function stopTimer() {
    timerStop = true;
}
function toggleStickyNote(){
    var note = document.getElementById("stickyContainer");
    if(note.style.visibility == "hidden"){
        note.style.visibility = "visible";
    }
    else{
        note.style.visibility = "hidden";
    }
}
function setRandCode(){
    var noteText = document.getElementById("stickyNoteText")
    let APIurl = "http://andymcdowell.hosting.hal.davecutting.uk/1030_APIs/randomCode.php";
    let args = "?length=4";
    var code
    fetch(APIurl + args)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        }).then(function (data) {
            if (data.err) {
                alert(data.errMsg);
            } else {
                code = data.secretCode;
                sessionStorage.setItem("secretCode", code);
                noteText.innerHTML = "Vault Code: " + code;
            }
        }).catch(function (error) {
            console.log(error.message);
        });
}
var enteredCode = "";
function addDigit(num){
 if (enteredCode.length >= 4){
    enteredCode = "";
 }
    enteredCode += num;
}
function clearCode(){
    enteredCode = "";
}
function checkCode(){
    correctCode = sessionStorage.getItem("secretCode");
    if (enteredCode == correctCode){
        stopText = true;
        var p1 = document.getElementById("textS6P1");
        typeText(p1, "Sweet, that worked, we're in");
        document.getElementById("keypad").style.visibility = "hidden";
        document.getElementById("showStickyNoteButton").style.visibility = "hidden";
        document.getElementById("codeContinue").classList.remove("hideMe");
    }

}