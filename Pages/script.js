//JS#
const regex = /^\D*$/;
function testAudio() {
    var audio = new AudioFile("../Audio/menuSong.mp3");
    audio.play();
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
    document.getElementById("menuMusic").pause();
}
//When using the typeText function, the first element inputted should be the id of the element you want to type in, and the second should be the text you want to type.
function typeText(element, text) {
    element.innerHTML = "";
    var charIndex = 0;
    var intervalId = setInterval(function () {
        var nextChar = text.charAt(charIndex);
        element.innerHTML += nextChar;
        charIndex++;
        if (charIndex >= text.length) {
            clearInterval(intervalId);
        }
    }, 15);
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
        default: console.log("WARNING: Selected Scene does not have any function");
    }
}

//Functions to run scenes

//Scene 2 
function scene2() {
    var p1 = document.getElementById("textS2P1")
    typeText(p1, "Ok its time. Be prepared for anything, this could get intense. Stay alert and stay sharp.")
}

//Scene 3
function scene3() {
    var p1 = document.getElementById("textS3P1");
    typeText(p1, "There's no turning back now. Let's get cracking! Take out your gun and fire a few shots to scare these people.")
}

//Scene 4
function scene4() {
    var p1 = document.getElementById("textS4P1");
    typeText(p1, "Great that worked better than expected, everyone is on the floor. Do you want to leave someone on crowd control boss? It means we can't lift as much from the vault, but it would stop these civies hitting the silent alarm.")
}
function assignCrowdControl() {
    var p1 = document.getElementById("textS4P1");
    typeText(p1, "Good call boss, we'll leave someone on crowd control, better safe than sorry. Let's get to work on that vault.")
    sessionStorage.setItem("remainingTeamMembers", sessionStorage.getItem("remainingTeamMembers") - 1);
    sessionStorage.setItem("NoOfDecisionsMade", sessionStorage.getItem("NoOfDecisionsMade") + 1);
    document.getElementById("crowdYes").classList.add("hideMe");
    document.getElementById("crowdNo").classList.add("hideMe");
    document.getElementById("crowdContinue").classList.remove("hideMe");
}
function notAssignCrowdControl() {
    var p1 = document.getElementById("textS4P1");
    typeText(p1, "Alright boss, we won't leave anyone on crowd control. Let's get to the vault!")
    sessionStorage.setItem("NoOfDecisionsMade", sessionStorage.getItem("NoOfDecisionsMade") + 1);
    document.getElementById("crowdYes").classList.add("hideMe");
    document.getElementById("crowdNo").classList.add("hideMe");
    document.getElementById("crowdContinue").classList.remove("hideMe");

    let APIurl = "http://andymcdowell.hosting.hal.davecutting.uk/1030_APIs/diceRollWithInputs.php";
    let args = "?diceFaceNumber=3&diceNumber=1";
    fetch(APIurl + args)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        }).then(function (data) {
            if (data.err) {
                alert(data.result);
            } else {
                alert(data.result);
            }
        }).catch(function (error) {
            console.log(error.message);
        });
}
