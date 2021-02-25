const backdrop = document.querySelector('.backdrop');
const sideDrawer = document.querySelector('.mobile-nav');
const menuToggle = document.querySelector('#side-menu-toggle');

const star1=document.getElementById('star1');

function backdropClickHandler() {
  backdrop.style.display = 'none';
  sideDrawer.classList.remove('open');
}

function menuToggleClickHandler() {
  backdrop.style.display = 'block';
  sideDrawer.classList.add('open');
}

backdrop.addEventListener('click', backdropClickHandler);
menuToggle.addEventListener('click', menuToggleClickHandler);


const imageNext=document.getElementById('image-next');
const imagePrev=document.getElementById('image-prev');
const image =document.getElementById('image');
const imageTag=document.getElementById('image-tag');

const imageName=['kabali','tanu_weds_manu','ki_ka','nagin','luka_chuppi','banjo','shubh_mangal_savdhan']

function append(image){
  imageName.push(image);
}

image.addEventListener('click',function(){
  console.log(imageName[count]);
})

let count=0;

function increase(){
    count++;
    if(count>imageName.length-1){
        count=0;
    }
    image.src="/img/"+imageName[count]+".jpg";
    // imageTag.innerHTML=imageName[count];

}
setInterval(increase,5000);



imageNext.addEventListener('click',increase);


imagePrev.addEventListener('click',function(){
    count--;
    if(count<0){
        count=imageName.length-1;
    }
    image.src="/img/"+imageName[count]+".jpg";
    imageTag.innerHTML=imageName[count];
    console.log("prev");

})
