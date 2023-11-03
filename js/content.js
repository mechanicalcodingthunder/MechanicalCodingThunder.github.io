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
    document.querySelector(".popup_screen").style.zIndex = "-10";
});
