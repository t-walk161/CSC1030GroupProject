//JS#
const regex = /^\D*$/;

// Options Menu
// audio 
var audio = new Audio("../Audio/menuSong.mp3");

function testAudio() {
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

function changeTextSize(sizeMultiplier) {
    //text size (WIP)
    var textSize = parseInt(window.getComputedStyle(document.getElementById("my-text")).fontSize);
    var newSize = textSize * sizeMultiplier;
    document.getElementById("my-text").style.fontSize = newSize + "px";
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
        sessionStorage.setItem("finalTake", 0);

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
    stopAudio();
    startTimer();
}
//When using the typeText function, the first element inputted should be the id of the element you want to type in, and the second should be the text you want to type.
let stopText = false;
function typeText(element, text) {
    element.innerHTML = "";
    var charIndex = 0;
    var intervalId = setInterval(function () {
        if (stopText) {
            if(charIndex == 0){
                stopText = false;
            }
            else{
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
        case 5: break;
        case 6: break;
        case 7: break;
        case 8: break;
        case 9: scene9(); break;
        case 10: break;
        default: console.log("WARNING: Selected Scene does not have any function");
    }
}

//Functions to run scenes

//Scene 2
function scene2() {
    var p1 = document.getElementById("textS2P1")
    typeText(p1, "Ok it's time. Be prepared for anything, this could get intense. Stay alert and stay sharp.")
}

//Scene 3
function scene3() {
    var p1 = document.getElementById("textS3P1");
    typeText(p1, "There's no turning back now. Let's get cracking! Take out your gun and fire a few shots to scare these people.");
    document.getElementById("startHeist").disabled = false;
}
//Scene 4
function scene4() {
    var p1 = document.getElementById("textS4P1");
    typeText(p1, "Great that worked better than expected, everyone is on the floor. Do you want to leave someone on crowd control boss? It means we can't lift as much from the vault, but it would stop these civies hitting the silent alarm.")
}
function assignCrowdControl() {
    stopText = true;
    document.getElementById("crowdYes").classList.add("hideMe")
    document.getElementById("crowdNo").classList.add("hideMe");
    var p1 = document.getElementById("textS4P1");
    typeText(p1, "Good call boss, we'll leave someone on crowd control, better safe than sorry. Let's get to work on that vault.")
    sessionStorage.setItem("remainingTeamMembers", sessionStorage.getItem("remainingTeamMembers") - 1);
    sessionStorage.setItem("NoOfDecisionsMade", sessionStorage.getItem("NoOfDecisionsMade") + 1);
    document.getElementById("crowdContinue").classList.remove("hideMe");
}
function notAssignCrowdControl() {
    stopText = true;
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
                    typeText(p1, "You're right boss, we can't afford........ OH NO BOSS! The crowd has hit the silent alarm! The police are gonna get here even sooner!");
                    sessionStorage.setItem("timeRemaining", parseInt(sessionStorage.getItem("timeRemaining")) - 30000);//Changed Penalty to 30 seconds instead of 1 minute, felt to hard for hard mode.
                    console.log("Time Remaining Set To " + sessionStorage.getItem("timeRemaining"));
                }
                else {
                    typeText(p1, "You're right boss, we can't afford to leave someone on crowd control. Let's get to work on that vault.");
                }
                sessionStorage.setItem("NoOfDecisionsMade", sessionStorage.getItem("NoOfDecisionsMade") + 1);
                document.getElementById("crowdContinue").classList.remove("hideMe");
            }
        }).catch(function (error) {
            console.log(error.message);
        });
}
function scene9(){
    var p1 = document.getElementById("textS9P1");
    typeText(p1, "Good Job " + sessionStorage.getItem("userName") +", you completed the job with just " + (sessionStorage.getItem("timeRemaining")/1000) + " seconds left, gathering a total of $" + sessionStorage.getItem("finalTake") + " between a total of " + sessionStorage.getItem("remainingTeamMembers") + " crew members. You made " + sessionStorage.getItem("NoOfDecisionsMade") + " decisions during the heist.");
}
function scene10(){
    var p1 = document.getElementById("textS10P1");
    typeText(p1, "Unlucky " + sessionStorage.getItem("userName") +", you failked the job with  " + (sessionStorage.getItem("timeRemaining")/1000) + " seconds left, gathering a total of $" + sessionStorage.getItem("finalTake") + " between a total of " + sessionStorage.getItem("remainingTeamMembers") + " crew members. You made " + sessionStorage.getItem("NoOfDecisionsMade") + " decisions during the heist.");

}
function hideTimer(){
    var timer = document.getElementById("timer");
    timer.style.visibility = "hidden";
}
function showTimer(){
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
    if(timerStop == true){
        return;
    }else
    if (timeRemaining == 0) {
        //TIMER IS UP
        showScene(10);
    }
    else {
        setTimeout(startTimer, 1000);
    }
}
function stopTimer(){
    timerStop = true;
}

