const signUpModal = document.getElementById('signup-modal');
const loginModal = document.getElementById('login-modal');
const signUpCross = document.getElementById('signup-cross');
const loginCross = document.getElementById('login-cross');
const submit=document.getElementById('submit');
const fixedButton=document.getElementById('fixed-button');
const fixedBar=document.getElementsByClassName('fixed-bar');
const topButton=document.getElementsByClassName('top-button');
const signIn=document.getElementById('signin');
const login=document.getElementById('login');
const time=document.getElementById('good');
const todayDate=document.getElementById('date');
const linkLogin=document.getElementById('link-login');


login.addEventListener('click',function(){
    loginModal.style.display='flex';
    signUpModal.style.display='none';
});


signIn.addEventListener('click',function(){
    signUpModal.style.display='flex';
    loginModal.style.display='none';
});

signUpCross.addEventListener('click',function(){
    signUpModal.style.display='none';
   
});
loginCross.addEventListener('click',function(){
    loginModal.style.display='none';
  
});
linkLogin.addEventListener('click',function(){
    signUpModal.style.display='none';
    loginModal.style.display='flex';
})