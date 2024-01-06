window.onload = function(){
    setTimeout(showpage,3000);
}

function showpage(){
    document.getElementById("loader").style.display='none';
    document.getElementsByClassName("main_body")[0].style.display='block';
    document.getElementsByTagName("footer")[0].style.display='block';
}

document.querySelector("#close").addEventListener("click", function () {
    document.querySelector(".popup").style.visibility = "hidden";
    document.querySelector(".popup_screen").style.zIndex = "-100";
    document.querySelector(".popup_screen").style.visibility = "hidden";
});
function display_resource(){
    document.getElementById("dropdown").style.visibility="visible";
    document.getElementById("dropdown").style.opacity="1"
};
