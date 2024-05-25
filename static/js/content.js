window.onload = function(){
    setTimeout(showpage,3000);
    changeimg();
}

function showpage(){
    document.getElementById("loader").style.display='none';
    document.getElementsByClassName("main_body")[0].style.display='block';
    document.getElementsByTagName("footer")[0].style.display='block';
}
var img = 0;
var images = ["m1.jpeg","m2.jpeg","m3.jpeg","m4.jpeg","m5.jpg","m6.jpg","m7.jpg","m8.jpg"];
function changeimg(){
    document.slide.src = "/static/images/"+images[img];
    if(img<images.length-1){
        img++;
    }else{
        img=0;
    }
    setTimeout("changeimg()",5000);
}
document.querySelector("#close").addEventListener("click", function () {
    document.querySelector(".popup").style.visibility = "hidden";
    document.querySelector(".popup_screen").style.zIndex = "-100";
    document.querySelector(".popup_screen").style.visibility = "hidden";
});
document.addEventListener("click",function (evt) { 
    const el = document.getElementsByClassName("mechanical")[0];
    // console.log(el,evt.target)
    if (!el.contains(evt.target)){
        hide_resource();
    }
    //Hide the menus if visible
}); 
function display_resource(){
    document.getElementById("dropdown").classList.add("active_hover");
    document.getElementById("dropdown").children[0].children[1].classList.add("active_hover");
};
function hide_resource(){
    if (document.getElementById("dropdown").classList.contains("active_hover")){
        document.getElementById("dropdown").classList.remove("active_hover");
        document.getElementById("dropdown").children[0].children[1].classList.remove("active_hover");
    }
}
