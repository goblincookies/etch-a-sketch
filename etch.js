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
let opacitySelectedIndex = 0;
let colorPicker = document.querySelector("#color-list");
let opacityPicker=document.querySelector("#opacity-list")

function setColors() {

    let colorList = colorPicker.querySelectorAll("div");
    let index = 0
    colorList.forEach( element => {
        if (index < colorsAll.length) {
            element.id = colorsAll[index];
            element.style.cssText = "background-color:" + colorsAll[index] + ";";
            element.addEventListener("click", updateOpacity);
        }
        index += 1;
    });
};

function updateOpacity( e ) {
    // 
    // 
    // 
    // https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
    // 
    // 
    // 
    let color = e.target.id;
    let opacityList = opacityPicker.querySelectorAll("div");
    let rgbColor = hexToRgb(color);
    let opacityAllRGBA = [];
    opacityAll = [];
    let colorCount = 6;
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
            element.addEventListener("click", setColor);
        }
        index += 1;
    });

    setColor( opacityAll[ opacitySelectedIndex ] );
};

function setColor() {

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

setColors();
// updateOpacity("#a4e4fc");