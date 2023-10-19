window.onload = function(){
    setTimeout(showpage,3000);
}

function showpage(){
    document.getElementById("loader").style.display='none';
    document.getElementsByClassName("main_body")[0].style.display='block';
    document.getElementsByTagName("footer")[0].style.display='block';
}