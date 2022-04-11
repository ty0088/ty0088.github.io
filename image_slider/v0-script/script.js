//function to control slide movement
function forwardBack(event) {
    let imgCtrl = '';
    if (event) {
        imgCtrl = event.target.getAttribute('id');
    } else {
        imgCtrl = 'forward';
    }
    if (imgCtrl === 'forward') {
        movePx = movePx - imgElems[imgPos].getBoundingClientRect().width;
        movePx = Math.max(maxMovePx, movePx);
        imgPos += 1;
        imgPos = Math.min(imgElems.length - 1, imgPos);
        frameWidth = imgElems[imgPos].getBoundingClientRect().width;
    } else {
        imgPos -= 1;
        imgPos = Math.max(0, imgPos);
        movePx = movePx + imgElems[imgPos].getBoundingClientRect().width;
        movePx = Math.min(0, movePx);
        frameWidth = imgElems[imgPos].getBoundingClientRect().width;
    }
    document.getElementById('frame').style.width = frameWidth + 'px';
    document.getElementById('slides').style.transform = `translate(${movePx}px, 0)`;
    fillDot(imgPos);
}

//function to fill dot depending on which image is current
function fillDot(imgPos) {
    for (let i = 0; i < imgElems.length; i++) {
        if (i === imgPos) {
            document.querySelector(`[data-slide-num="${i}"]`).classList.add('filled');
        } else {
            document.querySelector(`[data-slide-num="${i}"]`).classList.remove('filled');
        }
    }
}

function dotLink(event) {
    const imgNum = event.target.getAttribute('data-slide-num');
    console.log(imgNum)
}

//calculate max pixels slides can move forward to last image
const imgWidths = [];
const imgElems = document.querySelectorAll('img');
imgElems.forEach(elem => imgWidths.push(elem.getBoundingClientRect().width));
const maxMovePx = imgWidths.reduce((sum, width) => sum - width, imgElems[imgElems.length-1].getBoundingClientRect().width);

//initialise image position = 0, move pixel variable = 0 and initial frame width of first image
let imgPos = 0;
let movePx = 0;
let frameWidth = imgElems[0].getBoundingClientRect().width;
document.getElementById('frame').style.width = frameWidth + 'px';

//add image counter dots
for (let i = 0; i < imgElems.length; i++) {
    const dotElem = document.createElement('span');
    dotElem.classList.add('dot');
    dotElem.classList.add('link');
    dotElem.setAttribute('data-slide-num', i)
    document.getElementById('slide-count').appendChild(dotElem);
}
//fill initial dot
document.querySelector('[data-slide-num="0"]').classList.add('filled');

//click event listener for forward/back button and counter dots
document.querySelectorAll('#forward, #back').forEach(elem => elem.addEventListener('click', forwardBack));
document.querySelectorAll('.dot').forEach(elem => elem.addEventListener('click', dotLink));

// setInterval(forwardBack, 5000);