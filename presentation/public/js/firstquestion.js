const formElement = document.querySelector('form');

formElement.addEventListener('submit',event=>{
    event.preventDefault();
     const st = document.getElementById("answerCheckBox1");
     const vk = document.getElementById("answerCheckBox2");
     const ag = document.getElementById("answerCheckBox3");
     const jk = document.getElementById("answerCheckBox4");
      
     let checkedValue = null;

    
    if (st.checked === true) {
        checkedValue = st.value
    }
    if (vk.checked === true) {
        checkedValue = vk.value
    }
    if (ag.checked === true) {
        checkedValue = ag.value
    }
    if (jk.checked === true) {
        checkedValue = jk.value
    }
     
    
    fetch('/secondquestion?answer='+checkedValue).then(res=> {
       window.location.replace(res.url)
       
    }).catch(error=>console.log(error))
    
})