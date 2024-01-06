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
document.addEventListener("click",function (evt) { 
    console(evt.target)
        // hide_resource();
    //Hide the menus if visible
}); 
function display_resource(){
    document.getElementById("dropdown").style.visibility="visible";
    document.getElementById("dropdown").style.opacity="1"
    document.getElementById("dropdown").children[0].children[1].style.visibility="visible"
    document.getElementById("dropdown").children[0].children[1].style.opacity="1";
};
function hide_resource(){
    document.getElementById("dropdown").style.visibility="hidden";
    document.getElementById("dropdown").style.opacity="0"
    document.getElementById("dropdown").children[0].children[1].style.visibility="hidden"
    document.getElementById("dropdown").children[0].children[1].style.opacity="0";
}
