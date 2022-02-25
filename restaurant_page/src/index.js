import menuPage from './menu';
import aboutPage from './about';

function leftContainer() {

    const leftContainer = document.createElement('div');
    leftContainer.setAttribute('class', 'left-container');

    const iconImg = document.createElement('img');
    iconImg.setAttribute('src', 'Gold_Icon.png');
    iconImg.setAttribute('alt', 'icon');
    iconImg.setAttribute('class', 'left-icon');

    const logoImg = document.createElement('img');
    logoImg.setAttribute('src', 'WhiteGold_Type.png');
    logoImg.setAttribute('alt', 'logo');
    logoImg.setAttribute('class', 'left-logo');

    const socialLinks = document.createElement('div');
    socialLinks.setAttribute('class', 'socials');

    const twitLink = document.createElement('a');
    twitLink.setAttribute('href', 'https://twitter.com/brgrandbeer')
    const twitter = document.createElement('img');
    twitter.setAttribute('src', 'twitter.png');
    twitter.setAttribute('alt', 'Twitter');
    twitter.setAttribute('alt', 'Twitter'); 
    const instaLink = document.createElement('a');
    instaLink.setAttribute('href', 'https://www.instagram.com/chknandbeer/')
    const instagram = document.createElement('img');
    instagram.setAttribute('src', 'instagram.png');
    instagram.setAttribute('alt', 'Instagram');
    const faceLink = document.createElement('a');
    faceLink.setAttribute('href', 'https://www.facebook.com/brgrandbeer/')
    const facebook = document.createElement('img');
    facebook.setAttribute('src', 'facebook.png');
    facebook.setAttribute('alt', 'Facebook');

    twitLink.appendChild(twitter);
    instaLink.appendChild(instagram);
    faceLink.appendChild(facebook);

    socialLinks.appendChild(twitLink);
    socialLinks.appendChild(instaLink);
    socialLinks.appendChild(faceLink);

    const band = document.createElement('div');
    band.setAttribute('class', 'band');

    leftContainer.appendChild(iconImg);
    leftContainer.appendChild(logoImg);
    leftContainer.appendChild(socialLinks);
    leftContainer.appendChild(band);

    document.getElementById('content').appendChild(leftContainer);    
    
}

function homePage() {
    const rightContainer = document.createElement('div');
    rightContainer.setAttribute('class', 'right-container');

    const navBar = document.createElement('div');
    navBar.setAttribute('class', 'nav');

    const aboutLink = document.createElement('a');
    aboutLink.setAttribute('href', '');
    aboutLink.onclick = function() {
        document.getElementById('content').innerHTML=''
        leftContainer();
        aboutPage();
        return false;
    }
    aboutLink.innerHTML = 'about us';

    const menuLink = document.createElement('a');
    menuLink.setAttribute('href', '');
    menuLink.onclick = function() {
        document.getElementById('content').innerHTML=''
        leftContainer();
        menuPage();
        return false;
    }
    menuLink.innerHTML = 'menu';

    navBar.appendChild(aboutLink);
    navBar.appendChild(menuLink);

    rightContainer.appendChild(navBar);

    const timeContainer = document.createElement('div');
    timeContainer.setAttribute('class', 'time-container');

    const span1 = document.createElement('span');
    span1.innerHTML = '[ OPENING TIMES ]';
    const span2 = document.createElement('span');
    span2.innerHTML = 'the kitchen closes at 9pm Tues to Thurs,';
    const span3 = document.createElement('span');
    span3.innerHTML = '10pm Fri to Sat,';
    const span4 = document.createElement('span');
    span4.innerHTML = 'and 5pm Sun';
    const span5 = document.createElement('span');
    span5.innerHTML = 'or when we sell out';

    timeContainer.appendChild(span1);
    timeContainer.appendChild(span2);
    timeContainer.appendChild(span3);
    timeContainer.appendChild(span4);
    timeContainer.appendChild(span5);

    const times = document.createElement('div');
    times.setAttribute('class', 'times');

    const leftText1 = document.createElement('span');
    leftText1.setAttribute('class', 'left-text');
    leftText1.innerHTML = 'monday';
    const rightText1 = document.createElement('span');
    rightText1.setAttribute('class', 'right-text');
    rightText1.innerHTML = 'closed';
    const leftText2 = document.createElement('span');
    leftText2.setAttribute('class', 'left-text');
    leftText2.innerHTML = 'tuesday';
    const rightText2 = document.createElement('span');
    rightText2.setAttribute('class', 'right-text');
    rightText2.innerHTML = '12pm - 10pm';
    const leftText3 = document.createElement('span');
    leftText3.setAttribute('class', 'left-text');
    leftText3.innerHTML = 'wednesday';
    const rightText3 = document.createElement('span');
    rightText3.setAttribute('class', 'right-text');
    rightText3.innerHTML = '12pm - 10pm';
    const leftText4 = document.createElement('span');
    leftText4.setAttribute('class', 'left-text');
    leftText4.innerHTML = 'thursday';
    const rightText4 = document.createElement('span');
    rightText4.setAttribute('class', 'right-text');
    rightText4.innerHTML = '12pm - 10pm';
    const leftText5 = document.createElement('span');
    leftText5.setAttribute('class', 'left-text');
    leftText5.innerHTML = 'friday';
    const rightText5 = document.createElement('span');
    rightText5.setAttribute('class', 'right-text');
    rightText5.innerHTML = '12pm - 11.30pm';
    const leftText6 = document.createElement('span');
    leftText6.setAttribute('class', 'left-text');
    leftText6.innerHTML = 'saturday';
    const rightText6 = document.createElement('span');
    rightText6.setAttribute('class', 'right-text');
    rightText6.innerHTML = '12pm - 11.30pm';
    const leftText7 = document.createElement('span');
    leftText7.setAttribute('class', 'left-text');
    leftText7.innerHTML = 'sunday';
    const rightText7 = document.createElement('span');
    rightText7.setAttribute('class', 'right-text');
    rightText7.innerHTML = '12pm - 6pm';


    times.appendChild(leftText1);
    times.appendChild(rightText1);
    times.appendChild(leftText2);
    times.appendChild(rightText2);
    times.appendChild(leftText3);
    times.appendChild(rightText3);
    times.appendChild(leftText4);
    times.appendChild(rightText4);
    times.appendChild(leftText5);
    times.appendChild(rightText5);
    times.appendChild(leftText6);
    times.appendChild(rightText6);
    times.appendChild(leftText7);
    times.appendChild(rightText7);

    timeContainer.appendChild(times);

    const info = document.createElement('div');
    info.setAttribute('class', 'info');

    const info1 = document.createElement('span');
    info1.innerHTML = 'for reservations of 6 or more, please contact us';
    const info2 = document.createElement('span');
    info2.innerHTML = 'Matthews Yard, 1 Matthews Yard, Off Surrey Street, Croydon, CR0 1FF';

    info.appendChild(info1);
    info.appendChild(info2);

    timeContainer.appendChild(info);
    rightContainer.appendChild(timeContainer);

    document.getElementById('content').appendChild(rightContainer);
}

export {
    leftContainer,
    homePage
}


leftContainer();
homePage();

