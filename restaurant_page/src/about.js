import { leftContainer } from './index';
import { homePage } from './index';
import menuPage from './menu';

function aboutPage() {
    const rightContainer = document.createElement('div');
    rightContainer.setAttribute('class', 'right-container');

    const navbar = document.createElement('div');
    navbar.setAttribute('class', 'nav');

    const aboutLink = document.createElement('a');
    aboutLink.setAttribute('href', '');
    aboutLink.onclick = function() {
        document.getElementById('content').innerHTML=''
        leftContainer();
        menuPage();
        return false;
    }
    aboutLink.innerHTML = 'menu';

    const menuLink = document.createElement('a');
    menuLink.setAttribute('href', '');
    menuLink.onclick = function() {
        document.getElementById('content').innerHTML=''
        leftContainer();
        homePage();
        return false;
    }
    menuLink.innerHTML = 'home';

    navbar.appendChild(aboutLink);
    navbar.appendChild(menuLink);

    rightContainer.appendChild(navbar);

    const aboutContainer = document.createElement('div');
    aboutContainer.setAttribute('class', 'about-container');

    const sectSpan = document.createElement('span');
    sectSpan.setAttribute('class', 'section');
    sectSpan.innerHTML = '[ FIND US ]';
    const descrSpan = document.createElement('span');
    descrSpan.setAttribute('class', 'description');
    descrSpan.innerHTML = '10 minutes walk from east or west croydon station';
    const emailSpan = document.createElement('span');
    emailSpan.setAttribute('class', 'email');
    emailSpan.innerHTML = 'hello@brgrandbeer.com';
    const mapFrame = document.createElement('iframe');
    mapFrame.setAttribute('src', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d370.2407080483737!2d-0.10145210854313895!3d51.37231391493665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760736c5cbaa19%3A0x88a6eec1a5a7833!2s32%20Surrey%20St%2C%20Croydon%20CR0%201RG!5e0!3m2!1sen!2suk!4v1645785170017!5m2!1sen!2suk');
    mapFrame.setAttribute('width', '400');
    mapFrame.setAttribute('height', '300');
    mapFrame.setAttribute('style', 'border:0;');
    mapFrame.setAttribute('allowfullscreen', '');
    mapFrame.setAttribute('loading', 'lazy');

    aboutContainer.appendChild(sectSpan);
    aboutContainer.appendChild(descrSpan);
    aboutContainer.appendChild(emailSpan);
    aboutContainer.appendChild(mapFrame);

    rightContainer.appendChild(aboutContainer);

    document.getElementById('content').appendChild(rightContainer);
}

export default aboutPage;