
function WT(ev) {
    fetch("/Upload/first.xlsx").then((res) => res.blob()).then(blob => readXlsxFile(blob)).then((rows) => read_data(rows));
    document.querySelector(".popup").style.display = "block";
    delete_table();
    init();
    // document.getElementById("cal").classList.remove("hide")
}

function EDM(ev) {
    fetch("/Upload/final.xlsx").then((res) => res.blob()).then(blob => readXlsxFile(blob)).then((rows) => read_data(rows));
    document.querySelector(".popup").style.display = "block";
    delete_table();
    init();
    // document.getElementById("cal").classList.remove("hide")
}
function PrevPaper(ev){
    ev.target.classList.add("clicked");
    document.getElementById("Asm").classList.add("hide");
    document.getElementById("Check_result").classList.add("hide");
    document.querySelector(".prev_papers").classList.remove("hide");

}

document.querySelector("#close").addEventListener("click", function(){
    document.querySelector(".popup").style.display = "none";
});

function open_file(input) {
    console.log(input)
    const input_file = "/Upload/"+input;
    window.open(input_file,'_blank')
}

function init(){
    document.getElementById("number").value="";
}
function display_popup(evt) {

    console.log(evt.target)
}
function delete_table(){
    const tbl = document.getElementById("table");
    tr1 = tbl.children[0].children[0];
    tr2 = tbl.children[0].children[1];
    while (tr1.hasChildNodes()){
        tr1.removeChild(tr1.firstChild);
    }
    while (tr2.hasChildNodes()){
        tr2.removeChild(tr2.firstChild);
    }
    if (tbl.previousElementSibling.classList.contains("hide")) {
        tbl.previousElementSibling.classList.remove("hide");
        tbl.classList.add("hide");
    }
}
function onlyNumberkey(evt) {
    var ass = (evt.which) ? evt.which : evt.keyCode
    if (ass > 31 && (ass < 48 || ass > 57))
        return false;
    return true;
}
function showresult(evt) {
    const rollno = evt.target.previousElementSibling;
    if (rollno.value == "" || rollno.value.length < 12) {
        rollno.focus();
    } else {
        create_table(rollno.value);
    }
}
function create_table(value) {
    const tbl = document.getElementById("table");
    const pr = tbl.previousElementSibling;
    if (value.length == 12) {
        // console.log(obj.length)
        for (i = 2; i < obj.length; i++) {
            if (obj[i][2] == value) {
                console.log(obj[i][2])
                const tr = tbl.children[0].children[0];
                if (tbl.classList.contains("hide")) {
                    tbl.classList.remove("hide");
                    pr.classList.add("hide");
                }
                if (tr.childElementCount == 0) {
                    for (ii = 1; ii < obj[1].length; ii++) {
                        let th1 = document.createElement("th");
                        th1.textContent = obj[1][ii];
                        tr.appendChild(th1);
                    }
                }
                const tr1 = tbl.children[0].children[1];
                for (j = 1; j < obj[i].length; j++) {
                    if (tr1.childElementCount == 0 || tr1.childElementCount < tr.childElementCount) {
                        let td1 = document.createElement("td");
                        td1.textContent = obj[i][j];
                        tr1.appendChild(td1);
                    } else {
                        let td1 = tbl.children[0].children[1].children[j - 1];
                        td1.textContent = obj[i][j];
                    }
                }
                break;
            } else {
                tbl.classList.add("hide");
                pr.classList.remove("hide");
            }

        }
    }
}

let obj
function read_data(data) {
    obj = data;
    // console.log(obj)
}
