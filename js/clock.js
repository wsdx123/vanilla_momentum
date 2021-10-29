const clock = document.querySelector("h2#clock");


function getClock(){
    const date = new Date();

//string자릿수 지정하는 기능(padStart),2자리고 빈자리는 0으로 채운다는 뜻
    const hours = String(date.getHours()).padStart(2,"0");              
    const minutes = String(date.getMinutes()).padStart(2,"0");
    const seconds = String(date.getSeconds()).padStart(2,"0");
    clock.innerText = `${hours}:${minutes}:${seconds}`;
}

//현재시간이 바로 보일수 있게 함수호출
getClock();

//1초마다 getClock를 호출함으로써 realtime 시계의 동작을 만듦                                                       
setInterval(getClock,1000);                                             