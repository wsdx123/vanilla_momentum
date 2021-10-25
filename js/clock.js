const clock = document.querySelector("h2#clock");


function getClock(){
    const date = new Date();
    const hours = String(date.getHours()).padStart(2,"0");              //string자릿수 지정하는 기능(padStart),2자리고 빈자리는 0으로 채운다는 뜻
    const minutes = String(date.getMinutes()).padStart(2,"0");
    const seconds = String(date.getSeconds()).padStart(2,"0");
    clock.innerText = `${hours}:${minutes}:${seconds}`;
}

getClock();                                                             //현재시간이 바로 보일수 있게 함수호출
setInterval(getClock,1000);                                             //1초마다 getClock를 호출한다는 뜻