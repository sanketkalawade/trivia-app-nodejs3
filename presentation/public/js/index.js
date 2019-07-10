
const formElement = document.querySelector('form');
const userNameInput = document.querySelector('input');

formElement.addEventListener('submit',event=>{
    event.preventDefault();
    const userName = userNameInput.value;
    console.log(userName);
    if (!userName) {
        console.log("userName is empty");
        
    }

    fetch('/user/create',
    {
        headers: {'Content-Type': 'application/json'},
        method: 'POST',
        body:JSON.stringify({name:userName}),
        redirect: 'follow'
    }).then(res=> {
        console.log(res.url);
        redirect:window.location.replace(res.url)  
    }).catch(error=>console.log(error))
    
})