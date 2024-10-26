async function getDirectory(dirname,roll) {
    let response = await fetch('/static/Upload/Files/')
    // let response = await fetch(dirname);
    console.log(response)
    let str = await response.text();
    let el = document.createElement('html');
    el.innerHTML = str;
    let list = el.getElementsByTagName("ul")[0].getElementsByTagName("a");
    let arr = [];
    for (i = 0; i < list.length; i++) {
      arr[i] = list[i].href;
    }
    arr.shift(); // get rid of first result which is the "../" directory reference
    for (const file of arr) {
      const roll_no = roll
      await getItems(file, roll_no);
    }
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
    for (const page_num of pages){
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
          viewport:viewport
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
    }else{
      delete_child();
      await getDirectory('https://github.com/mechanicalcodingthunder/oiexam/tree/main/Files/',rollno.value);
      document.querySelector(".popup").style.display = "block";
      document.getElementById("pdf-viewer").style.display='block';
    }
  }
  function delete_child(){
    const div = document.getElementById("pdf-viewer");
    while(div.childElementCount>0) {
        div.removeChild(div.lastChild);
    }
  }
  