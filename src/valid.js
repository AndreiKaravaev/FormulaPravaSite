window.addEventListener('load', function(){


        let rootElem = document.querySelector('.from-feedback');
        let inp = rootElem.querySelectorAll('.valid');
        let sub = rootElem.querySelector('.btn');
        let police = rootElem.querySelector('.police')
        let divForm = rootElem.querySelector('.send')
        let validRule = {
            names: {
                pattern: /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u,
                errorText: "Введите имя пользователя.",
                },
            phone:
                {pattern: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
                errorText: "Введите корректный номер телефона."},
            
            check: {
                pattern: /1/,
                errorText: "Примите условия обработки персональных данных."},

            }
            let error;
            let divCl = divForm.classList
        rootElem.addEventListener('submit', (e) => dataForm(e))
        //sub.addEventListener('click', () => this.valids())
        inp.forEach(el => {el.addEventListener('focus', () => validRepeat(el)) });
    
    
     async function dataForm(e){
        e.preventDefault()

        valids()
        
        if (error === 0 ){
            let formData = new FormData(rootElem);
     
            rootElem.classList.add('form-feedback-send');
            divCl.add('send-load');
            
            response = await fetch('sendmail.php', {
                    method: 'POST',
                    body: formData
                })
            if(response.ok){
                resultFrame('send-ok')
                //let result = await response.json();
               
                rootElem.reset();

                

             }
            else{
                resultFrame('send-lose')



            }
        }
    }

   
   function valids(){
       error = 0;
        for(i = 0; i <= inp.length - 1; i++){
            police.value = Number(police.checked)
            let input = inp[i];
            let validat = validRule[input.dataset.rule]  
            if( input.value == '' || !validat.pattern.test(input.value)){
                input.nextElementSibling.innerHTML = validat.errorText
                error++;
            }
        }
    }

    function validRepeat(inputEl){
        inputEl.nextElementSibling.innerHTML = '';
    }

    function resultFrame(selector){
        setTimeout(()=> {
            divCl.remove('send-load');
            divCl.add(selector);
            setTimeout(()=> {
                rootElem.classList.remove('form-feedback-send');
                divCl.remove(selector);
            }, 2000)
        }, 1500)

    }
    



})



