function read_file(input) {
    const input_file = "/static/Upload/" + input;
    console.log(input_file)
    fetch(input_file).then((res) => res.blob()).then(blob => readXlsxFile(blob)).then((rows) => read_data(rows));
    document.querySelector(".popup").style.display = "block";
    delete_table();
    init();
}

document.querySelector("#close").addEventListener("click", function () {
    document.querySelector(".popup").style.display = "none";
});

function open_file(input) {
    let input_file;
    if (input.includes("Upload")){
        input_file = input;
    }else{
        input_file = "/static/Upload/" + input;
    }
    window.open(input_file, '_blank')
}

function init() {
    document.getElementById("number").value = "";
}

function delete_table() {
    const tbl = document.getElementById("table");
    tr1 = tbl.children[0].children[0];
    tr2 = tbl.children[0].children[1];
    while (tr1.hasChildNodes()) {
        tr1.removeChild(tr1.firstChild);
    }
    while (tr2.hasChildNodes()) {
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
    col = 12;
    if (value.length == 12) {
        for (i = 2; i < obj.length; i++) {
            if (obj[i][2] == value) {
                const tr = tbl.children[0].children[0];
                if (tbl.classList.contains("hide")) {
                    tbl.classList.remove("hide");
                    pr.classList.add("hide");
                }
                if (tr.childElementCount == 0) {
                    for (ii = 1; ii < col; ii++) {
                        let th1 = document.createElement("th");
                        th1.textContent = obj[1][ii];
                        tr.appendChild(th1);
                    }
                }
                const tr1 = tbl.children[0].children[1];
                for (j = 1; j < col; j++) {
                    if (tr1.childElementCount == 0 || tr1.childElementCount < tr.childElementCount) {
                        let td1 = document.createElement("td");
                        if (j==9 && obj[i][j]!=null){
                                td1.textContent = obj[i][j].toFixed(2);
                        }
                        else{
                            td1.textContent = obj[i][j];
                        }
                        tr1.appendChild(td1);
                    } else {
                        let td1 = tbl.children[0].children[1].children[j - 1];
                        if (j==9 && obj[i][j]!=null){
                            td1.textContent = obj[i][j].toFixed(2);
                        }
                        else{
                            td1.textContent = obj[i][j];
                        }
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
let pdfDoc = null,
    pageNum = 1,
    pageisRendering = false,
    pageNumIsPending = null;
const scale = 1;
function renderPage(num, canvas) {
    pdfDoc.getPage(num).then(page => {
        const viewport = page.getViewport({ scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const renderCtx = {
            canvasContext: canvas.getContext('2d'),
            viewport
        }
        page.render(renderCtx);
    });
}
function Open_pdf(url){
    document.getElementById("loader").style.display='flex';
    document.getElementById("pdf-viewer").style.display='none';
    if(document.getElementById("GIF")){
        document.getElementById("GIF").style.display='none';
    };
    document.getElementById("pdf-viewer").children[0].src='/static/web/viewer.html?file='+url;
    deleteChild();
    showpage();
    function showpage(){
        document.getElementById("loader").style.display='none';
        document.getElementById("pdf-viewer").style.display='block';
        document.getElementsByTagName("footer")[0].style.display='block';
    }
}
function Open_Chapter(url) {
    document.getElementById("loader").style.display='flex';
    document.getElementById("pdf-viewer").style.display='none';
    if(document.getElementById("GIF")){
        document.getElementById("GIF").style.display='none';
    };
    const btn = document.getElementById("download")
    btn.value = url;
    if (btn.classList.contains("hide")){
        btn.classList.remove("hide");
    }
    deleteChild();
    pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
        pdfDoc = pdfDoc_;
        const viewer = document.getElementById('pdf-viewer');
        for (page = 1; page <= pdfDoc_.numPages; page++) {
            canvas = document.createElement("canvas");
            canvas.className = 'pdf-page-canvas';
            viewer.appendChild(canvas);
            renderPage(page, canvas);
        }
        showpage();
        function showpage(){
            document.getElementById("loader").style.display='none';
            document.getElementById("pdf-viewer").style.display='block';
            document.getElementsByTagName("footer")[0].style.display='block';
        }

    }).catch(err => {
        const div = document.createElement('div');
        div.className = 'error';
        div.appendChild(document.createTextNode(err.message));
        document.querySelector('body').insertBefore(div, canvas);
        document.querySelector('.top-bar').style.display = 'none';
    })
}

function deleteChild(){
    const main_content = document.getElementsByClassName("main-content")[0];
    document.getElementById("pdf-viewer").style.display='none';
    if(main_content.classList.contains("hide")){
        main_content.classList.remove("hide")
    }
    main_content.classList.add('hide');
    let div = document.getElementById("pdf-viewer");
    while(div.childElementCount>1) {
        div.removeChild(div.lastChild);
    }
}
function show_button(){
    deleteChild();
    if(document.getElementById("GIF")){
        document.getElementById("GIF").style.display='none';
    };
    const main_content = document.getElementsByClassName("main-content")[0];
    if(main_content.classList.contains("hide")){
        main_content.classList.remove("hide")
    }
    // if(!document.getElementById("download").classList.contains("hide")){
    //     document.getElementById("download").classList.add("hide")
    // }
}
const anchor_all = document.querySelectorAll('div.example ul li>a');
anchor_all.forEach((anchor)=>{
    anchor.addEventListener('click',()=>{
        anchor_all.forEach((anchor)=>{
            if(anchor.classList.contains("active")){
                anchor.classList.remove("active");
            }
        });
        anchor.classList.add("active");
    })
})
let obj
function read_data(data) {
    obj = data;
}
