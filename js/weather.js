//openweathermap.org 계정 로그인 시 획득가능
const API_KEY = "API키";                                                                                               


//위치정보 받아오기 성공시 콜백 함수(API활용하여 위치에따른 날씨정보 받아오기)
function onGeoOk(position){                                                                                                 
    const lat = position.coords.latitude;                                                                                   
    const lng = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
    
    fetch(url).then(response => response.json()).then(data => {                                                             
        const weather = document.querySelector("#weather span:first-child");
        const city = document.querySelector("#weather span:last-child");
        city.innerText = data.name;
        weather.innerText = `${data.weather[0].main} / ${data.main.temp}°C`;
    });
}

//에러발생시 콜백 함수
function onGeoErr(){                                                                                                        
    alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk,onGeoErr);                                                                 