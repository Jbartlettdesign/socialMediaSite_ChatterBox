

async function signupFormHandler(event) {
    console.log("hello");
    event.preventDefault();
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    let user_pic = "../uploads/" + document.querySelector('#profile_pic').files[0].name;
    //console.log(user_pic);
    if (username && email && password) {
        const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          username,
          email,
          password,
          user_pic
        }),
        headers: { 'Content-Type': 'application/json' }
      });
        if(response.ok){
          console.log('success');
          //////added code to go to /api/users
          document.location.replace('/');
      }
      else{
          alert(response.statusText);
      }
  }
}
///////////////////////////////////////////
async function loginFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  }
  function changeText(){
    let new_user_pic = document.querySelector('#profile_pic').files[0].name;
    if (new_user_pic.length > 15) {
        new_user_pic = new_user_pic.substring(0, 15) + "...";
      }
      document.getElementsByName('picture')[0].placeholder = new_user_pic;
  }

document.querySelector('#profile_pic').addEventListener('change', changeText);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);