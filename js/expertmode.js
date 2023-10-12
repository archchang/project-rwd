// 寫程式時要保持這種心態：
// 就好像將來要維護你這些程式的人是一位殘暴的精神病患者，而且他知道你住在哪。
function doFirst() {
    // 先跟 HTML 畫面產生關連，再建事件聆聽功能
    document.getElementById('theFile').onchange = fileChange
}

var imageHeight = 0
var imageWidth = 0
// 宣告指定的文件或目录一開始不存在
var file_exist = false
function fileChange() {
    let file = document.getElementById('theFile').files[0]

    let readFile = new FileReader()
    readFile.readAsDataURL(file)
    readFile.addEventListener('load', () => {
        let box = document.getElementById('box')
        if (box.querySelector('img')) {
            box.removeChild(box.querySelector('img'))
        }
        let image = document.createElement('img')
        // 用于标识元素是否允许使用浏览器原生行为或HTML 拖放操作API 拖动
        image.setAttribute('draggable', false)
        // 在圖片的指定位置添加标签
        image.setAttribute('id', 'imgbg')
        image.src = readFile.result


        image.addEventListener('load', () => {
            imageHeight = image.height
            imageWidth = image.width
            console.log(imageHeight, imageWidth)

            //判斷式，圖片小於block，自動撐開
            if (image.style.width < 300 || image.style.height < 300) {
                image.style.width = '300px'
                image.style.height = '300px'
            }
            image.style.maxWidth = '300px'
            image.style.maxHeight = '300px'
            // 可向節點的子節點列表的末尾添加新的子節點
            box.appendChild(image)
        })
    })
    // 如果指定的文件或目录存在则返回TRUE
    file_exist = true
}
// 旋轉功能
var rotate = 0
function rotate90() {
    let img = document.getElementById('imgbg')
    if (rotate == 360) {
        rotate = 0
    }
    rotate += 90
    img.style.transform = `rotate(${rotate}deg)`
}

function download() {
    //判斷是否有圖片
    if (!file_exist) {
        alert('請先上傳圖片')
        return false
    }
    // 返回对拥有指定ID 的第一个对象的引用
    let box = document.getElementById('box')
    // 返回文档中匹配指定CSS 选择器的第一个元素,并且找到后就返回节点对象
    let image = box.querySelector('img')
    // 在網頁上透過JavaScript 新增一個節點功能
    let canvas = document.createElement('canvas')
    // 宣告上方文字輸入框
    let upperTextText = document.getElementById('upperText').innerHTML
    // 取得元素CSSStyleDeclaration 型態的style 物件、擷取指定物件的指定屬性值
    let upperFontSize = parseFloat(window.getComputedStyle(document.getElementById('upperText'), null).getPropertyValue('font-size'))
    let upperX = document.getElementById('upperText').getBoundingClientRect().left - box.getBoundingClientRect().left;
    let upperY = document.getElementById('upperText').getBoundingClientRect().top - box.getBoundingClientRect().top + upperFontSize;
    // 宣告下方文字輸入框
    let lowerTextText = document.getElementById('lowerText').innerHTML
    // 取得元素CSSStyleDeclaration 型態的style 物件
    let lowerFontSize = parseFloat(window.getComputedStyle(document.getElementById('lowerText'), null).getPropertyValue('font-size'))
    // 取得Element 元素的寬高以及相對於視窗可視範圍(Viewport)的座標位置
    let lowerX = document.getElementById('lowerText').getBoundingClientRect().left - box.getBoundingClientRect().left;
    let lowerY = document.getElementById('lowerText').getBoundingClientRect().top - box.getBoundingClientRect().top + lowerFontSize;
    // 固定編輯視窗大小
    canvas.width = 300
    canvas.height = 300
    // 透過此方法可以取得渲染環境及其繪圖函數
    let ctx = canvas.getContext('2d')
    // 宣告物件之旋轉屬性
    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate(rotate * Math.PI / 180);
    ctx.translate(-150, -150);
    // 在画布指定位置上按原图大小绘制指定大小的图
    ctx.drawImage(image, 0, 0, 300, 300);
    //绘制完之后，恢复到初始的绘制状态，继续进行绘画。
    // 并绘制圆形，并不会恢复初始状态下绘制的矩形。
    ctx.restore();
    // 指定字型
    ctx.font = upperFontSize + 'px Noto Sans'
    // 使用指定的大小建立文字的初始周框，
    // 以指定的裝置內容、字型和格式化指示繪製時
    // 提供所指定文字的大小(以像素為單位)
    var lineHeight = ctx.measureText("M").width * 1.2;
    // 用來根據你指定的分隔符號，將字串切割成一個字串陣列
    var lines = upperTextText.split("\n");
    // 在指定的坐标上绘制文本字符串，并使用当前的fillStyle 对其进行填充
    for (var i = 0; i < lines.length; ++i) {
        ctx.fillText(lines[i], upperX, upperY);
        upperY += lineHeight;
    }
    ctx.font = lowerFontSize + 'px Noto Sans'
    // 使用指定的大小建立文字的初始周框，
    // 以指定的裝置內容、字型和格式化指示繪製時
    // 提供所指定文字的大小(以像素為單位)
    var lineHeight = ctx.measureText("M").width * 1.2;
    // 用來根據你指定的分隔符號，將字串切割成一個字串陣列
    var lines = lowerTextText.split("\n");
    for (var i = 0; i < lines.length; ++i) {
        ctx.fillText(lines[i], lowerX, lowerY);
        lowerY += lineHeight;
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

    console.log("Image: " + imageHeight, imageWidth)
}


// 上方文字列
function changeUpperInput() {
    let upper = document.getElementById('upperText')
    let upper_input = document.getElementById('upperInput')
    upper.innerHTML = upper_input.value
}
// 上方文字列之增大字體
function upperFontIncrease() {
    let upper = document.getElementById('upperText');
    // document.getElementById("elementId").style會抓到寫在特定元素HTML裡面的style
    // 但是抓不到寫在stylesheet裡面賦予element的樣式，
    // 所以這時候就要用getComputedStyle來抓最終顯示出來的樣式。
    // 用於返回在聲明塊中聲明的CSS屬性的值
    let style = window.getComputedStyle(upper, null).getPropertyValue('font-size');
    // 將字串轉換為以十進位表示的浮點數
    let currentSize = parseFloat(style);
    upper.style.fontSize = (currentSize + 1) + 'px';
}
// 上方文字列之縮小字體
function upperFontReduce() {
    let upper = document.getElementById('upperText');
    let style = window.getComputedStyle(upper, null).getPropertyValue('font-size');
    let currentSize = parseFloat(style);
    upper.style.fontSize = (currentSize - 1) + 'px';
}
// 下方文字列
function changeLowerInput() {
    let lower = document.getElementById('lowerText')
    let lower_input = document.getElementById('lowerInput')
    lower.innerHTML = lower_input.value
}
// 下方文字列之增大字體
function lowerFontIncrease() {
    let lower = document.getElementById('lowerText');
    let style = window.getComputedStyle(lower, null).getPropertyValue('font-size');
    let currentSize = parseFloat(style);
    lower.style.fontSize = (currentSize + 1) + 'px';
}

function lowerFontReduce() {
    parseFloat(window.getComputedStyle(document.getElementById('lowerText'), null).getPropertyValue('font-size'))
    let lower = document.getElementById('lowerText');
    let style = window.getComputedStyle(lower, null).getPropertyValue('font-size');
    let currentSize = parseFloat(style);
    lower.style.fontSize = (currentSize - 1) + 'px';
}
// 物件移動
function move(obj) {
    var dragobj = null, h1, i1, oLeft, oTop, oRight, oBottom;
    var boundBox;
    var boundBoxX;
    var boundBoxY;
    var cursor = {
        x: 0,
        y: 0
    };
    // 取得Element 元素的寬高以及相對於視窗可視範圍(Viewport)的座標位置
    boundBox = document.getElementById('box').getBoundingClientRect();
    boundBoxX = boundBox.width;
    boundBoxY = boundBox.height;

    if (obj) {
        dragobj = rel(obj.id);
        // 当用户在元素上按下鼠标按钮时，会发生onmousedown 事件
        document.onmousedown = startMove;
        // 当用户在元素上释放鼠标按钮时，发生onmouseup 事件
        document.onmouseup = drop;
        // 用來監聽網友的滑鼠游標，是否在特定的區域內移動，
        // 如果有產生這樣的行為模式，就觸發特定的 JavaScript function 去執行特定的工作
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

window.addEventListener('load', doFirst)