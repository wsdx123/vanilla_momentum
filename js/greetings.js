const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";
function onloginSubmit(event){
    event.preventDefault();                                         //Submit시에 브라우저가 새로고침 되는 기본기능이 존재함. 그래서 이 새로고침을 막아주는 역할
    loginForm.classList.add(HIDDEN_CLASSNAME);                      //로그인을 하면 입력창을 숨기기 위한 코드
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY,username);                    //로그인 유지를 위해 로컬스토리지에 로그인정보를 저장
    paintGreeting(username);
}

function paintGreeting(username){                                   //로그인 됨을 알수있는 h2태그. 기본적으로 hidden클래스가 붙어있기 때문에 로그인 성공시 hidden클래스를 제거해 띄워준다
    greeting.innerText = `Hello ${username}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if(savedUsername === null){                                         //실제로 로컬스토리지에 로그인정보가 존재하는지 검사하고, 존재하면 paintGreeting함수를 실행해 화면에 다시 그려준다. 만약 없다면 form태그들에 존재하는 hidden 클래스를 제거해 입력창을 다시 띄워줌
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit",onloginSubmit);
}else {
   paintGreeting(savedUsername);
}
