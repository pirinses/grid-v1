const scriptURL = 'https://script.google.com/macros/s/AKfycbw5nTR8_GsRq4qz1vXtGkAtS9FZK5RFstfjbA4-topAVV8ZA31xMX7CdXv9a-A-IP9B/exec';
const form = document.forms['gridsheet'];
const joinWaitlist = document.getElementById('btn-join');
const closeButton = document.querySelector('.btn-close');
const modal = document.querySelector('.modal');
const textHome = document.querySelector('.container-three');

  form.addEventListener('submit', e => {
    alert('asd');
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {
            alert("Thanks for joining! Expect to hear from us soon."); 
      })
      .catch(error => console.error('Error!', error.message))
  });

  
  form.addEventListener;

  const joinSelected = () => {
    joinWaitlist.addEventListener('click', () => {
      modal.classList.toggle('join-active-selected');
      textHome.classList.toggle('hide');
    });
  }

  const onClose = () => {
    closeButton.addEventListener('click', () => {
      textHome.classList.remove('hide');
    });
  }
 

  const app = () => {
    joinSelected();
    onClose();
    
  }


  app();