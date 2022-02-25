import { leftContainer } from './index';
import { homePage } from './index';
import aboutPage from './about';

function menuPage() {        
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
        homePage();
        return false;
    }
    menuLink.innerHTML = 'home';

    navBar.appendChild(aboutLink);
    navBar.appendChild(menuLink);

    rightContainer.appendChild(navBar);

    const menuContainer = document.createElement('div');
    menuContainer.setAttribute('class', 'menu-container');

    const menuElements = `
        <span class="description">all burgers are served with a side of fries</span><span class="section">[ BEEF BURGERS ]</span>
        <div class="title">
            <span class="menu-title">the classic</span>
            <span class="menu-price">8.45</span>
        </div>
        <span class="menu-descr">w/ lettuce, tomato, pickle, ketchup, mustard & beer braised onions</span>
        <div class="title">
            <span class="menu-title">the cheese</span>
            <span class="menu-price">9.45</span>
        </div>
        <span class="menu-descr">the classic w/ smoked cheddar cheese</span>
        <div class="title">
            <span class="menu-title">the bacon cheese</span>
            <span class="menu-price">9.95</span>
        </div>
        <span class="menu-descr">the classic w/ smoked cheddar cheese & smoked streaky bacon</span>
        <div class="title">
            <span class="menu-title">the bacon chilli cheese</span>
            <span class="menu-price">10.95</span>
        </div>
        <span class="menu-descr">chilli cheese, smoked streaky bacon, homemade jalapeno relish, homemade burger sauce, beer braised onions, lettuce, tomato & pickle</span>
        <div class="title">
            <span class="menu-title">the boozer</span>
            <span class="menu-price">12.95</span>
        </div>
        <span class="menu-descr">w/ lettuce, tomato, pickle, double beef patty, double smoked cheddar, beer candied bacon, beer braised onions & beer infused bbq sauce</span>
        <span class="section">[ chicken burgers ]</span>
        <div class="title">
            <span class="menu-title">the chicken</span>
            <span class="menu-price">9.45</span>
        </div>
        <span class="menu-descr">buttermilk fried chicken w/ homemade rainbow coleslaw & beer infused bbq sauce</span>
        <div class="title">
            <span class="menu-title">the chicken shop</span>
            <span class="menu-price">9.45</span>
        </div>
        <span class="menu-descr">buttermilk fried chicken w/ mayo & lettuce</span>
        <div class="title">
            <span class="menu-title">the big lou</span>
            <span class="menu-price">12.95</span>
        </div>
        <span class="menu-descr">double buttermilk fried chicken w/ homemade rainbow coleslaw, double smoked cheddar & beer infused bbq sauce</span>
        <span class="section">[ veg burgers ]</span>
        <div class="title">
            <span class="menu-title">the veggie</span>
            <span class="menu-price">7.45</span>
        </div>
        <span class="menu-descr">homemade falafel w/ red cabbage, tomato, cucumber, mint yoghurt dressing & hummus</span>
        <div class="title">
            <span class="menu-title">the vegan</span>
            <span class="menu-price">7.45</span>
        </div>
        <span class="menu-descr">homemade falafel w/ roasted red peppers, tomato, cucumber, hummus, homemade vegan mayo & toasted pumpkin seeds</span>
        <span class="section">[ sides ]</span>
        <div class="title">
            <span class="side-title">double cooked fries (rosemary or cajun salt)</span>
            <span class="menu-price">3</span>
        </div>
        <div class="title">
            <span class="side-title">homemade rainbow coleslaw (with a slight kick)</span>
            <span class="menu-price">3</span>
        </div>
        <div class="title">
            <span class="side-title">house side salad</span>
            <span class="menu-price">3</span>
        </div>
        <div class="title">
            <span class="side-title">beer battered onion rings</span>
            <span class="menu-price">3.25</span>
        </div>
        <div class="title">
            <span class="side-title">beer battered pickles</span>
            <span class="menu-price">3.25</span>
        </div>
        <span class="section">[ beers ]</span>
        <span class="description">wide range of international & local craft beers at the bar on tap, bottles and cans</span>
    `;

    menuContainer.innerHTML = menuElements;
    rightContainer.appendChild(menuContainer);

    document.getElementById('content').appendChild(rightContainer);
}

export default menuPage;