'use strickt';

const btnPopat = document.querySelector('.btn__call');
const windowBackgrond = document.querySelector('.popup');
const formFeedback = document.querySelector('.popup__feedback');
const formClose = document.querySelector('.popup__close');
let animations = [
    { transform:'perspective(600px) translateY(0px) rotateX(0deg)', opacity:'1'},
    {transform:'perspective(600px) translateY(-150px) rotateX(45deg)', opacity:'0'}
]

let select = [windowBackgrond, formFeedback];
let eve = ['touchend', 'click'];
let isBusy = true;

eve.forEach((ev) => { 
btnPopat.addEventListener(ev, addPopat)
windowBackgrond.addEventListener(ev, (e)=> remPopat(e))
formClose.addEventListener(ev, (e)=> remPopat(e))

})


function remPopat(e){
    const target = e.target // находим элемент, на котором был клик
        if ((!target.closest('.popup__feedback') || target.closest('.popup__close')) && isBusy){
            isBusy = false;
            let anim = formFeedback.animate(animations, {duration: 500})
            anim.addEventListener('finish', function(){
                select.forEach((el) => el.classList.remove('popup_active'));
                isBusy = true;
                scrollBlock()
            })
           
        }
}


function addPopat(){
    select.forEach((el) => el.classList.add('popup_active'));
    let anim = formFeedback.animate(animations, {duration: 500, direction: 'reverse'})
    isBusy = false;
    anim.addEventListener('finish', function(){
        isBusy = true;
    })
    scrollBlock()

}

function scrollBlock(){
   
    windowBackgrond.classList.contains('popup_active') ? document.body.style.overflow = 'hidden' : document.body.style.overflow = '';

}