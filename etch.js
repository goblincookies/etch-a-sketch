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
}

function updateOpacity( color ) {
    let opacityList = colorPicker.querySelectorAll("div");

    // let index = 0
    // colorList.forEach( element => {
    //     if (index < colorsAll.length) {
    //         element.id = colorsAll[index];
    //         element.style.cssText = "background-color:" + colorsAll[index] + ";";
    //         element.addEventListener("click", updateOpacity);
    //     }
    //     index += 1;
    // });

}

setColors();