//click listeners
function clickListeners() {
    document.querySelectorAll('#forward, #back').forEach(elem => elem.addEventListener('click', slideController.forwardBack));
    document.querySelectorAll('.dot').forEach(elem => elem.addEventListener('click', slideController.dotImgLink)); //--------
}

//controller functions
const slideController  = (() => {
    let currImgPos = 0;
    let nextImgPos = 0;
    let transPx = 0;
    let frameWidth = 0;
    const imgElems = document.querySelectorAll('img');

    //img slide click (forward/back) counter function
    function forwardBack(event) {
        const imgCtrl = event.target.getAttribute('id');
        if (imgCtrl === 'forward') {
            currImgPos = nextImgPos;
            nextImgPos += 1;
            nextImgPos = Math.min(imgElems.length - 1, nextImgPos);
            console.log('curr: ' + currImgPos + ' --- next: ' +  nextImgPos);
        } else {
            currImgPos = nextImgPos;
            nextImgPos -= 1;
            nextImgPos = Math.max(0, nextImgPos);
            console.log('curr: ' + currImgPos + ' --- next: ' +  nextImgPos);
        }
        pixelCalc();
        domController.fillDot(nextImgPos);
    }

    //img dot position counter link function
    function dotImgLink(event) {
        currImgPos = nextImgPos;
        nextImgPos = parseInt(event.target.getAttribute('data-slide-num'));
        console.log('curr: ' + currImgPos + ' --- next: ' +  nextImgPos);
        pixelCalc();
        domController.fillDot(nextImgPos);
    }
    
    //img position pixel/frame width calculator function
    function pixelCalc() {
        if (currImgPos < nextImgPos) {
            for (let i = currImgPos; i < nextImgPos; i++) {
                transPx  = transPx - imgElems[i].getBoundingClientRect().width;
            }
        } else if (currImgPos > nextImgPos) {
            for (let i = nextImgPos; i < currImgPos; i++) {
                transPx  = transPx + imgElems[i].getBoundingClientRect().width;
            }
        } else {
            return ;
        }
        frameWidth = imgElems[nextImgPos].getBoundingClientRect().width;
        console.log('transPx: ' + transPx + ' --- frameWidth: ' + frameWidth);
        domController.moveSlide(transPx, frameWidth);
    }

    return {
        forwardBack,
        dotImgLink
    }
})();


//DOM manipulation function
const domController = (() => {
    const imgElems = document.querySelectorAll('img');

    //Initial frame width
    function firstFrame() {
        let frameWidth = imgElems[0].getBoundingClientRect().width;
        document.getElementById('frame').style.width = frameWidth + 'px';
    }

    //add image count dots
    for (let i = 0; i < imgElems.length; i++) {
        const dotElem = document.createElement('span');
        dotElem.classList.add('dot');
        dotElem.classList.add('link');
        dotElem.setAttribute('data-slide-num', i)
        document.getElementById('slide-count').appendChild(dotElem);
    }

    //fill first image dot
    function firstDotFill() {
        document.querySelector('[data-slide-num="0"]').classList.add('filled');
    }

    function firstLoad() {
        firstFrame();
        firstDotFill();
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

    function moveSlide(transPx, frameWidth) {
        document.getElementById('frame').style.width = frameWidth + 'px';
        document.getElementById('slides').style.transform = `translate(${transPx}px, 0)`;
    }

    return {
        firstLoad,
        fillDot,
        moveSlide
    }
})();

clickListeners();
domController.firstLoad();