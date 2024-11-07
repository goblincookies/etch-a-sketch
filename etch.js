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
// let opacitySelectedIndex = 0;
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


document.body.onmousedown = function() { 
  mouseDown=1;
}

document.body.onmouseup = function() {
  mouseDown=0;
}


toggleRainbow.addEventListener("click", () => rainbowMode = !rainbowMode );
toggleAlwaysDraw.addEventListener("click", () => alwaysDraw = !alwaysDraw );
// gridInput.addEventListener("input", changingGrid);
gridInput.addEventListener("focusout", changingGrid);
gridInput.addEventListener("keydown", changingGridKey);




function setColors() {
    // let colorList = colorPicker.querySelectorAll("div");
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
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    // return result ? {
    //     r: parseInt(result[1], 16),
    //     g: parseInt(result[2], 16),
    //     b: parseInt(result[3], 16)
    // } : null;
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
};

function componentToHex(c) {
    var hex = c.toString(16);
    hex = hex.split(".")[0];
    return hex.length == 1 ? "0" + hex : hex;
};
  
function rgbToHex(r, g, b, a) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b) + componentToHex(a*255);
};
function blockClick(e) {
    e.target.style.backgroundColor = selectedColor;
};

function blockHover(e){
    // console.log(`hovering ${selfIndex-gridRes}`);
    if (alwaysDraw | mouseDown ) {
        e.target.style.backgroundColor = selectedColor;
    }
    
    // REMOVE ALL FIRST
    blocksAll.forEach( element => {
        element.classList.remove("block-side");
    });
    
    // ADD BLOCK LINES
    let selfIndex = Array.from( e.target.parentNode.childNodes).indexOf(e.target); //e.target.parentNode.childNodes.indexOf(e.target)
    
    if (e.target.previousSibling) {
        e.target.previousSibling.classList.add("block-side");
    }
    
    if (e.target.nextSibling ) {
        e.target.nextSibling.classList.add("block-side");
    }
    
    
    if( selfIndex - gridRes > 0 ) {
        // let topNode = e.target.parentNode.childNodes[selfIndex - xWidth];
        Array.from( e.target.parentNode.childNodes)[selfIndex - gridRes].classList.add("block-side");
        console.log("hellow");
    }
    if( selfIndex + gridRes < gridRes*gridRes ) {
        // let topNode = e.target.parentNode.childNodes[selfIndex - xWidth];
        Array.from( e.target.parentNode.childNodes)[selfIndex + gridRes].classList.add("block-side");
        console.log("hellow");
    }

    // Previous/Next block

    // Above/Below block 
};

function changingGrid( e ) {
    let val = Math.min( 25, Math.max(16, e.target.value ) );
    if (val != e.target.value ) {
        e.target.value = val;
    };
    establishGrid( val ) ;
}
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

function establishGrid( val ) {
    console.log("new grid: " + val);

    if (gridRes != val ){
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
            xDiv.classList.add("block");
            xDiv.style.cssText=`width: ${xWidth}px;height: ${xWidth}px;`;
            xDiv.addEventListener("click", blockClick);
            xDiv.addEventListener("mouseover", blockHover);
            blocksAll.push(xDiv);
            canvas.appendChild(xDiv);
        };
    };

    // for (let y = 0; y < val; y++) {
    //     const hDiv = document.createElement("div");
    //     hDiv.classList.add("grid-row");
        
    //     canvas.appendChild(hDiv);
    // };
};

setColors();
establishGrid(16);
// updateOpacity("#a4e4fc");