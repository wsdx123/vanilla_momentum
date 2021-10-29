const images = [
    "0.jpg",
    "1.jpg",
    "2.jpg"
];
const body = document.querySelector("body");
const chosenImage = images[Math.floor(Math.random() * images.length)];          //0 ~ 이미지개수-1 랜덤숫자 돌리기 


body.style.backgroundImage = `url(img/${chosenImage})`;