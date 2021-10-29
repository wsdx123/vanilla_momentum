const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input")
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

//새로고침시에도 값을 유지시키기 위해 localstorage를 사용해 저장.
function saveToDos(){ 

//toDos는 array이기 때문에, stringify로 string화 시켜줌                                                  
    localStorage.setItem(TODOS_KEY,JSON.stringify(toDos));              
}

//지정한 li태그를 삭제하는 함수. li태그의 id를 이용해 삭제동작 수행
function deleteToDo(e){ 

//click한 button의 상위태그(li태그)를 지워버리는 식으로 동작                                          
    const li = e.target.parentElement;                                  
    li.remove();

//.filter를 사용해 새로운 toDos array에 obj를 저장
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));        
    saveToDos();
}

//form에 todo를 입력받으면 todo텍스트와 삭제버튼을 다는 함수
//js에서 태그를 생성해 작성하고, index.html의 ul태그에 연결 
function paintToDo(todo){                                               
    const li = document.createElement("li");
    li.id = todo.id;
    const span = document.createElement("span");
    span.innerText = todo.text;
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click",deleteToDo);

//list의 수정을 용이하게 하기위해 직접 li태그에 쓰지않고 하위태그에 써 붙임
    li.appendChild(span);                                               
    li.appendChild(button);                                                
    toDoList.appendChild(li); 
}

//todo를 입력받아 array에 값을 보내고, todolist를 그리는 동작 실행하는 함수
//todolist의 삭제동작을 원활히 하기 위해 toDos에 object형식으로 저장함
function handleToDoSubmit(e){                                           
    e.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {                                              
        text:newTodo,

//현재시간값을 id로 지정
        id:Date.now(),                                                  
    }
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit",handleToDoSubmit);


const savedToDo = localStorage.getItem(TODOS_KEY);

//로컬스토리지에 toDos값이 존재할 경우 새로고침 했을때 list를 유지시키는 코드
if(savedToDo !== null){  
    
//로컬스토리지에 저장된 값(string)을 parse를 해주면 js가 읽을수 있는 obj또는 arr가 된다
    const parsedToDos = JSON.parse(savedToDo);      
    
//새로고침하면 toDos가 초기화 되므로, 저장된 array를 다시 넣어줌
    toDos = parsedToDos;
    
//parsedToDos 각각의 obj를 아규먼트로 paintToDo를 하나하나 실행 시킴
    parsedToDos.forEach(paintToDo);                                     
}