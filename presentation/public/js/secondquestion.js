const formElement = document.querySelector('form');

formElement.addEventListener('submit',event=>{
    event.preventDefault();
    
        var checkboxes = document.querySelectorAll('input[name="color"]:checked'), 
        values = [];
        Array.prototype.forEach.call(checkboxes, element => {
            values.push(element.value);
        });
         
    
    
    fetch('/save' ,{
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body:JSON.stringify({secondquestionAnswer:values}),
        redirect: 'follow'
    }).then(res=> {
        console.log(res.url);
        redirect:window.location.replace(res.url)  

    }).catch(error=>console.log(error))
    
})