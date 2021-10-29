const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";
function onloginSubmit(event){

//Submit시에 브라우저가 새로고침 되는 기본동작을 막아주는 역할
    event.preventDefault();  

    loginForm.classList.add(HIDDEN_CLASSNAME);                      
    const username = loginInput.value;

//로그인 유지를 위해 로컬스토리지에 로그인정보를 저장
    localStorage.setItem(USERNAME_KEY,username);                    
    paintGreeting(username);
}


//hidden클래스를 제거해 로그인 시 보이는 h2태그를 보여지게 함
function paintGreeting(username){                                   
    greeting.innerText = `Hello ${username}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);


//로컬스토리지에 로그인정보가 있는지 검사.없다면 입력받는 form태그를 띄움
if(savedUsername === null){                                         
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit",onloginSubmit);
}else {
   paintGreeting(savedUsername);
}
