// COLOR GRID
let colorsAll = [ "#000000","#7c7c7c","#bcbcbc","#f8f8f8","#0000fc","#0078f8",
    "#3cbcfc","#a4e4fc","#0000bc","#0058f8","#6888fc","#b8b8f8","#4428bc",
    "#6844fc","#9878f8","#d8b8f8","#940084","#d800cc","#f878f8","#f8b8f8",
    "#a80020","#e40058","#f85898","#f8a4c0","#a81000","#f83800","#f87858",
    "#f0d0b0","#881400","#e45c10","#fca044","#fce0a8","#503000","#ac7c00",
    "#f8b800","#f8d878","#007800","#00b800","#b8f818","#d8f878","#006800",
    "#00a800","#58d854","#b8f8b8","#005800","#00a844","#58f898","#b8f8d8",
    "#004058","#008888","#00e8d8","#00fcfc","#f8d8f8","#787878","#fcfcfc",];
let opacityAll = [];
let indexColor = 0;
let indexOpacity = 0;
let colorPicker = document.querySelector("#color-list");
let colorList = colorPicker.querySelectorAll("div");
let canvas = document.querySelector("#canvas");
let blocksAll=[];
let opacityPicker=document.querySelector("#opacity-list");
let selectedColor = "";
let toggleRainbow = document.querySelector("#rainbow-mode");
let toggleAlwaysDraw = document.querySelector("#always-draw");
let gridInput = document.querySelector("#grid-input");
let gridRes = 0;
let rainbowMode = false;
let alwaysDraw = false;
let mouseDown = 0;

// KEEP TRACK OF MOUSE FOR DRAG-DRAWING
document.body.onmousedown = () => mouseDown=1;
document.body.onmouseup = () => mouseDown=0;

toggleRainbow.addEventListener("click", () => rainbowMode = !rainbowMode );
toggleAlwaysDraw.addEventListener("click", () => alwaysDraw = !alwaysDraw );
gridInput.addEventListener("focusout", changingGrid);
gridInput.addEventListener("keydown", changingGridKey);
document.querySelector("#clear-grid").addEventListener("click", clearGrid );


// DRAW THE PALETTE
function setColors() {
    let index = 0
    colorList.forEach( element => {
        if (index < colorsAll.length) {
            element.id = colorsAll[index];
            element.style.cssText = "background-color:" + colorsAll[index] + ";";
            element.addEventListener("click", selectColor);
        }
        index += 1;
    });
    colorList[indexColor].classList.add( "selected-color" );
    updateOpacity(colorsAll[indexColor]);
};

// DRAW THE OPACITY PALETTE
function updateOpacity( color ) {
    let opacityList = opacityPicker.querySelectorAll("div");
    let rgbColor = hexToRgb(color);
    let opacityAllRGBA = [];
    opacityAll = [];
    let colorCount = opacityList.length;
    // let rgba = [];
    for (let i = colorCount; i > 0; i-=1) {
        // rgba = [ parseInt(rgbColor.r),parseInt(rgbColor.g),parseInt(rgbColor.b), i/10 ];
        opacityAllRGBA.push( [rgbColor[0],rgbColor[1],rgbColor[2], (i/colorCount)] );
    }
    
    for (let i = 0; i < opacityAllRGBA.length; i+=1) {
        opacityAll.push( rgbToHex(  opacityAllRGBA[i][0],
                                    opacityAllRGBA[i][1],
                                    opacityAllRGBA[i][2],
                                    opacityAllRGBA[i][3] ));
    }

    let index = 0
    opacityList.forEach( element => {
        if (index < opacityAll.length) {
            element.id = opacityAll[index];
            element.style.cssText = "background-color:" + opacityAll[index] + ";";
            element.addEventListener("click", selectOpacity);
        }
        index += 1;
    });

    // SET THE SELECTED COLOR
    selectedColor = opacityList[indexOpacity].id;
    opacityList[indexOpacity].classList.remove("color");
    opacityList[indexOpacity].classList.add("selected-color");

};

// TRIGGERS WHEN A COLOR IS SELECTED
function selectColor( e ) {
    // REMOVE VISUAL INDICATORS
    colorList.forEach( element => {
        if (element.classList.contains("selected-color")) {
            element.classList.add("color");
            element.classList.remove("selected-color");
        }
    });
    e.target.classList.remove("color");
    e.target.classList.add( "selected-color" );
    
    indexColor = colorsAll.indexOf(e.target.id);
    updateOpacity( e.target.id );
};

// TRIGGERS WHEN AN OPACITY IS SELECTED
function selectOpacity( e ) {
    let opacityList = opacityPicker.querySelectorAll("div");

    opacityList.forEach( element => {
        if (element.classList.contains("selected-color")) {
            element.classList.add("color");
            element.classList.remove("selected-color");
        }
    });
    e.target.classList.remove("color");
    e.target.classList.add( "selected-color" );

    opacityList = Array.from( opacityList );
    indexOpacity = opacityList.indexOf( e.target );
    selectedColor = e.target.id;
};

// CONVERT HEX TO RGB
// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
};

// CONVERT R/G/B/A component TO HEX
// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function componentToHex(c) {
    var hex = c.toString(16);
    hex = hex.split(".")[0];
    return hex.length == 1 ? "0" + hex : hex;
};

// CONVERT RGBA TO HEX
// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function rgbToHex(r, g, b, a) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b) + componentToHex(a*255);
};

// TRIGGERS WHEN A CANVAS BLOCK IS CLICKED
function blockClick(e) {
    draw( e.target, selectedColor);
};

// TRIGGERS WHEN A CANVAS BLOCK IS HOVERED
function blockHover(e){
    if (alwaysDraw | mouseDown ) {
        draw(e.target, selectedColor);
    }
};

// DRAW THE COLOR TO THE BLOCK
function draw( target, color) {
    if (rainbowMode) {
        target.style.backgroundColor = colorsAll[ Math.floor(Math.random()*colorsAll.length)];
    } else {
        target.style.backgroundColor = color;
    }
}

// TRIGGERS WHEN YOU UN-FOCUS THE GRID INPUT
function changingGrid( e ) {
    let val = Math.min( 25, Math.max(16, e.target.value ) );
    if (val != e.target.value ) {
        e.target.value = val;
    };
    establishGrid( val ) ;
}

// TRIGGERS WHEN YOU PRESS "ENTER" ON THE GRID INPUT
function changingGridKey( e ) {
    if (e.key === 'Enter') {
        let val = Math.min( 25, Math.max(16, e.target.value ) );
        if (val != e.target.value ) {
            e.target.value = val;
        };
        document.activeElement.blur();
        establishGrid( val ) ;
    };
};

// TRIGGERS WHEN YOU CLICK "CLEAR GRID"
function clearGrid() {
    clearGrid = true;
    establishGrid( gridRes );
};

// ERASES AND DRAWS THE CANVAS GRID
function establishGrid( val ) {
    console.log("new grid: " + val);

    if (gridRes != val | clearGrid ){
        clearGrid = false;
        gridRes = val;
        let xWidth = canvas.offsetWidth / val;
    
        console.log(`width: ${xWidth} px;height: ${xWidth} px;`);
        canvas.querySelectorAll("div").forEach( (element) => {
            console.log("removed");
            element.remove();
        });
        
        blocksAll = [];
    
        for (let x = 0; x < val*val; x++ ) {
            const xDiv = document.createElement("div"); 
            xDiv.classList.add("block", "non", "grid-draw");
            xDiv.style.cssText=`width: ${xWidth}px;height: ${xWidth}px;`;
            xDiv.addEventListener("click", blockClick);
            xDiv.addEventListener("mouseover", blockHover);
            blocksAll.push(xDiv);
            canvas.appendChild(xDiv);
        };
    };
};

setColors();
establishGrid(16);