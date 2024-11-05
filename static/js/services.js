async function getDirectory(roll) {
    const url_folder = 'https://api.github.com/repos/mechanicalcodingthunder/mechanicalcodingthunder.github.io/contents/static/Upload/Files/'
    let response = await fetch(url_folder, {
        headers: {
            'Authorization': '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',
        }
    });
    let folders = await response.json();
    console.log(folders);
    for (const folder of folders) {
        const url_files = 'https://api.github.com/repos/mechanicalcodingthunder/mechanicalcodingthunder.github.io/contents/static/Upload/Files/' + folder.name;
        let res_file = await fetch(url_files, {
            headers: {
                'Authorization': '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',
            }
        });
        let files = await res_file.json();
        console.log(files);
        // break;
        for (const file of files) {
            const file_name = '/' + folder.path + '/' + file.name;
            console.log(file_name);
            const roll_no = roll
            await getItems(file_name, roll_no);
        }
        // break;
    };

}
async function getItems(src, roll_no) {
    const doc = await pdfjsLib.getDocument(src).promise
    let pages = [];
    for (page_num = 1; page_num <= doc.numPages; page_num++) {
        const page = await doc.getPage(page_num)
        const content = await page.getTextContent()
        const items = content.items
        if (items.length < 10) {
            continue
        }
        let single_page_Arr = []; // single page content
        for (var i = 0; i < items.length - 1; i++) {
            if (isBlank(items[i].str)) {
                continue
            }
            else {
                if (isNumber(items[i].str) && items[i].str.length == 12) {
                    if (items[i].str == roll_no) {
                        pages.push(page_num);
                    }
                }
            }
        }
    }
    console.log(pages)
    const viewer = document.getElementById('pdf-viewer');
    for (const page_num of pages) {
        canvas = document.createElement("canvas");
        canvas.className = 'pdf-page-canvas';
        viewer.appendChild(canvas);
        renderPage(page_num, canvas);
    }
    const scale = 1.8;

    function renderPage(num, canvas) {
        doc.getPage(num).then(page => {
            var viewport = page.getViewport({ scale });
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            const renderCtx = {
                canvasContext: canvas.getContext('2d'),
                viewport: viewport
            }
            page.render(renderCtx);
        });
    }
    function isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }
    function isNumber(str) {
        return !isNaN(Number(str));
    }
    function isEmpty(obj) {
        return (Object.keys(obj).length === 0);
    }
    return
}
document.querySelector("#close").addEventListener("click", function () {
    document.querySelector(".popup").style.display = "none";
});
function onlyNumberkey(evt) {
    var ass = (evt.which) ? evt.which : evt.keyCode
    if (ass > 31 && (ass < 48 || ass > 57))
        return false;
    return true;
}
async function showresult(evt) {
    const rollno = evt.target.previousElementSibling;
    if (rollno.value == "" || rollno.value.length < 12) {
        rollno.focus();
    } else {
        delete_child();
        document.getElementById("loader").style.display = 'flex';
        await getDirectory(rollno.value);
        document.getElementById("loader").style.display = 'none';
        document.querySelector(".popup").style.display = "block";
        document.getElementById("pdf-viewer").style.display = 'block';
        const canvasWrapper = document.querySelector('#pdf-viewer');
        const canvases = canvasWrapper.querySelectorAll('.pdf-page-canvas');
        for (let i = 0; i < canvases.length; i++) {
            console.log(i)
            let canvas = canvases[i]; //hardcoded for testing
            let context = canvas.getContext('2d');
            context.fillStyle = 'rgba(255, 255, 0, 0.5)';
            context.strokeStyle = 'rgba(0, 50, 0, 1)';
            context.lineWidth = 1;
            context.beginPath();
            context.rect(70, 520, canvas.width-150, 40); // adjust coordinates as needed
            context.fill();
            context.stroke();
        }
    }
}
function delete_child() {
    const div = document.getElementById("pdf-viewer");
    while (div.childElementCount > 0) {
        div.removeChild(div.lastChild);
    }
}
