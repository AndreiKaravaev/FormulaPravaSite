'use strict';

window.addEventListener('load', function(){


    
//------------плавный скрол до якоря и смена класса у меню-----------------------
const nav = document.querySelector('.nav')
const menuItems = document.querySelectorAll('.nav a')
delegate(nav, 'a', 'click', function(e){
    e.preventDefault()
    let target = document.querySelector(this.hash)
    let coords = cords(target) - 90;
    scrol(coords);
   

})

// debounce
let scrollDelay = 50;
let scrollTime;

window.addEventListener('scroll', function(){
    clearTimeout(scrollTime)
    scrollTime = setInterval(scrollCordTo, scrollDelay)
})
// --------------------

function scrollCordTo(){
    for (let i = menuItems.length - 1;i >=0; i--){
        let link = menuItems[i];
        let header = document.querySelector(link.hash);
        let cord = cords(header);
        if (cord <= scrollY + 300 ){
            setActiveMenuItem(nav, link);
            break;
        }
    }
}

function cords(el){
    let cord = el.getBoundingClientRect();
    return cord.top + window.pageYOffset;

}
function setActiveMenuItem(nav, item){
	nav.querySelectorAll('a').forEach(link => link.classList.remove('style-a-active'));
	item.classList.add('style-a-active');
}

function scrol(top){
    window.scrollTo({
        top,
        behavior: "smooth"

    })
}
function delegate(box, selector, eventName, handler){
	box.addEventListener(eventName, function(e){
		let elem = e.target.closest(selector);

		if(elem !== null && box.contains(elem)){
			handler.call(elem, e);
		}
	});
}
//---------------------------------------------------------------





});