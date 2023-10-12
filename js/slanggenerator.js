// 寫程式時要保持這種心態：
// 就好像將來要維護你這些程式的人是一位殘暴的精神病患者，而且他知道你住在哪。
function download() {
    if(document.getElementById('text').innerHTML == ""){
        alert('請先輸入文字')
        return false
    }
    let box = document.getElementById('box')
    let canvas = document.createElement('canvas')
    let textText = document.getElementById('text').innerHTML
    // 取得Element 元素的寬高以及相對於視窗可視範圍(Viewport)的座標位置
    let textX = document.getElementById('text').getBoundingClientRect().left - box.getBoundingClientRect().left;
    let textY = document.getElementById('text').getBoundingClientRect().top - box.getBoundingClientRect().top + 20;

    canvas.width = 300
    canvas.height = 157
    // 透過此方法可以取得渲染環境及其繪圖函數
    let ctx = canvas.getContext('2d')
    // 取得元素CSSStyleDeclaration 型態的style 物件、擷取指定物件的指定屬性值
    ctx.fillStyle = window.getComputedStyle(box, null).getPropertyValue('background-color')
    // 使用fillStyle 属性来设置用于填充绘图的颜色、渐变或模式
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = window.getComputedStyle(document.getElementById('text'), null).getPropertyValue('color')
    // 指定字型
    ctx.font = '20px Noto Sans'
    // 在画布上输出文本之前，检查字体的宽度
    var lineHeight = ctx.measureText("M").width * 1.2;
    // 用來根據你指定的分隔符號，將字串切割成一個字串陣列
    var lines = textText.split("\n");
    // 在指定的坐标上绘制文本字符串，并使用当前的fillStyle 对其进行填充
    for (var i = 0; i < lines.length; ++i) {
        ctx.fillText(lines[i], textX, textY);
        textY += lineHeight;
    }
    // 把 canvas 的內容轉成圖片
    // 圖片格式預設為 image/jpeg 
    // 解析度則為 96，品質範圍為 0~1，不寫的話預設為 1
    let dataURL = canvas.toDataURL('image/jpeg')
    // 创建<a>元素并将其附加到文档中
    let a = document.createElement('a')
    a.href = dataURL
    a.download = 'image.jpg'
    a.click()
}
// 文字列輸入框
function changeTextInput() {
    console.log("changeTextInput")
    let text = document.getElementById('text')
    let text_input = document.getElementById('textInput')
    text.innerHTML = text_input.value
}
// 黑底白字
function blackBgWhiteWd(){
    let text = document.getElementById('text')
    let box = document.getElementById('box')
    text.style.color = 'white'
    box.style.backgroundColor = 'black'
}
// 白底黑字
function whiteBgBlackWd(){
    let text = document.getElementById('text')
    let box = document.getElementById('box')
    text.style.color = 'black'
    box.style.backgroundColor = 'white'
}
// 黑底綠字
function blackBgGreenWd() {
    let text = document.getElementById('text')
    let box = document.getElementById('box')
    text.style.color = 'green'
    box.style.backgroundColor = 'black'
}
// 紅底黃字
function redBgYellowWd() {
    let text = document.getElementById('text')
    let box = document.getElementById('box')
    text.style.color = 'yellow'
    box.style.backgroundColor = 'red'
}

function move(obj) {
    var dragobj = null, h1, i1, oLeft, oTop, oRight, oBottom;
    var boundBox;
    var boundBoxX;
    var boundBoxY;
    var cursor = {
        x: 0,
        y: 0
    };

    boundBox = document.getElementById('box').getBoundingClientRect();
    boundBoxX = boundBox.width;
    boundBoxY = boundBox.height;

    if (obj) {
        dragobj = rel(obj.id);
        document.onmousedown = startMove;
        document.onmouseup = drop;
        document.onmousemove = moving;
    }
    // 宣告物件關係
    function rel(ob) {
        if (ob) {
            return document.getElementById(ob)
        } else {
            return null
        }
    }

    function startMove(e) {
        if (dragobj) {
            // 得到鼠标位置坐标
            getCursorPos(e);
            dragobj.className = "moving";
            i1 = cursor.x - dragobj.offsetLeft;
            h1 = cursor.y - dragobj.offsetTop;
        }
    }

    function drop() {
        if (dragobj) {
            dragobj.className = "move";
            dragobj = null;
        }
    }

    function getCursorPos(e) {
        // 当 DOM 事件处理程序被调用的时候会被用到。
        // 它的值是当前正在处理的事件对象
        e = e || window.event;
        if (e.pageX || e.pageY) {
            cursor.x = e.pageX;
            cursor.y = e.pageY;
        } else {
            // 回傳文件中的根元素(root element) 
            // 通常用於取得<html> 的HTMLHtmlElement 物件(object)
            var de = document.documentElement;
            // body 属性用于设置或返回文档体
            var db = document.body;
            // 读取或设置元素滚动条到元素左边的距离
            // 表示一个元素的左边框的宽度，以像素表示。如果元素的文本方向是从右向左
            cursor.x = e.clientX +
                (de.scrollLeft || db.scrollLeft) - (de.clientLeft || 0);
            cursor.y = e.clientY +
                (de.scrollTop || db.scrollTop) - (de.clientTop || 0);
        }
        return cursor;
    }

    function moving(e) {
        getCursorPos(e);
        if (dragobj) {
            console.log("Cursor: " + cursor.x, cursor.y);
            console.log("BoundBox: " + boundBoxX, boundBoxY);
            oLeft = cursor.x - i1;
            // offset是一个只读属性，返回一个元素的布局宽度
            oRight = boundBoxX - (cursor.x - i1 + dragobj.offsetWidth);
            oTop = cursor.y - h1;
            oBottom = boundBoxY - (cursor.y - h1 + dragobj.offsetHeight);

            if (oLeft > 0 && oRight > 0) {
                dragobj.style.left = oLeft + 'px';
            }
            if (oTop > 0 && oBottom > 0) {
                dragobj.style.top = oTop + 'px';
            }

            console.log("Obj: " + oLeft, oRight, oTop, oBottom);

        }
    }
}