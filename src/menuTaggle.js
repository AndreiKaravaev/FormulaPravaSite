'use strict';

window.addEventListener('load', function(){
const menu = document.querySelector('.btn-screen')
const navInScreen = document.querySelector('.screen')
const menuTriangle = document.querySelector('.label-screen')
let animations = [
         {transform:'translateY(0px)', opacity:'1'},
         {transform:'translateY(-50px)', opacity:'0'}
    ]
let cl = navInScreen.classList;
let even = ['touchend', 'click']
let busy = true;
menu.addEventListener('click', () => cl.contains('screen-action') ? remMenu () : addMenu() )


even.forEach((eve)=>  {
window.addEventListener(eve, (e) => closeMenu(e))
})


function closeMenu(e){
    const target = e.target // находим элемент, на котором был клик
        if (!target.closest('.label-screen') &&!target.closest('.btn-screen') && !target.closest('.screen') && cl.contains('screen-action')){ // если этот элемент или его родительские элементы не окно навигации и не кнопка
            remMenu();
        }
}

function addMenu (){
        cl.add('screen-action')
        menuTriangle.classList.add('active')
        navInScreen.animate(animations, {duration: 300, direction: 'reverse'})
    }

function remMenu (){
            if (busy){
            busy = false;
            let anim =  navInScreen.animate(animations, {duration: 300})
            anim.addEventListener('finish', () => {
                busy = true;
                cl.remove('screen-action');
            })
                menuTriangle.classList.remove('active')
    }
}
})