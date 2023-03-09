//JS#
const regex = /^\D*$/;
function inputName(){
    var name = document.getElementById("enterNameBox").value;
    if(name == "" || name.length < 3 || name.length > 45 || !regex.test(name)) {
        alert("Names should not be blank, between 3 and 45 letters, and contain no digits")
    }
    else{
        sessionStorage.setItem("userName", name);
        console.log("Name Successfully Set To " + sessionStorage.getItem("userName"));
        document.getElementById("enterName").classList.add("hideMe");
        document.getElementById("enterName").classList.remove("showMe");
        document.getElementById("modeSelect").classList.add("ShowMe");
        document.getElementById("modeSelect").classList.remove("hideMe");
    }
}