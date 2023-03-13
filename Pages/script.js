//JS#
const regex = /^\D*$/;
function testAudio(){
    var audio = new AudioFile("../Audio/menuSong.mp3");
            audio.play();
}
//The input name function also initiates the sessionStorage for other tracked variables.
function inputName(){
    var name = document.getElementById("enterNameBox").value;
    if(name == "" || name.length < 3 || name.length > 45 || !regex.test(name)) {
        alert("Names should not be blank, between 3 and 45 letters, and contain no digits")
    }
    else{
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
function setDifficulty(){
    var timeRemaining = 0;
    switch(document.getElementById("difficultySelect").value){
        case "easy": timeRemaining = 300000; break; //5 Mins
        case "med": timeRemaining = 180000; break; //3 Mins
        case "hard": timeRemaining = 90000; break; //1.5 Mins
    }
    sessionStorage.setItem("timeRemaining", timeRemaining);
    console.log("Time Remaining Set To " + sessionStorage.getItem("timeRemaining"));
}
function startGame(){
    document.getElementById("menuMusic").pause();
}
//When using the typeText function, the first element inputted should be the id of the element you want to type in, and the second should be the text you want to type.
function typeText(elementID, text) {
    var outputElement = document.getElementById(elementID);
    var charIndex = 0;
    var intervalId = setInterval(function() {
        var nextChar = text.charAt(charIndex);
        outputElement.innerHTML += nextChar;
        charIndex++;
        if (charIndex >= text.length) {
            clearInterval(intervalId);
        }
    }, 10);
}
function showScene(num) {
    var sections = document.getElementsByTagName("section");
    for (var i = 0; i < sections.length; i++) {
        sections[i].style.display = "none";
    }
    document.getElementById("scene" + num).style.display = "block";
    document.getElementById("backgroundImg").style.backgroundImage = "url('../photos/" + num + ".png')";
}
