const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input")
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos(){                                                   //새로고침시에도 값을 유지시키기 위해 localstorage를 사용해 저장.
    localStorage.setItem(TODOS_KEY,JSON.stringify(toDos));              //보다시피 toDos는 array이기 때문에, 사용가능한 값으로 변형시켜야 함.stringify로 우선 string화 시켜줌
}

function deleteToDo(e){                                                 //지정한 li태그를 삭제하는 함수. li태그의 id를 이용해 삭제동작 수행
    const li = e.target.parentElement;                                  //console.log(e)로 이벤트를 추적하여 찾음. click한 button의 상위태그(li태그)를 지워버리는 식으로 동작할 것
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));        //.filter를 사용해 새로운 toDos array에 obj를 저장
    saveToDos();
}

function paintToDo(todo){                                               //태그를 js에서 작성하여, 화면에 그려주는 동작을 하는 함수.handleToDoSubmit에서 object를 아규먼트로 입력받음
    const li = document.createElement("li");
    li.id = todo.id;
    const span = document.createElement("span");
    span.innerText = todo.text;
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click",deleteToDo);
    li.appendChild(span);                                               //list의 수정을 용이하게 하기위해 li태그 하위에 span을 두고 실제내용을 span에 넣는데, 이 li태그에 span태그를 붙이는 코드
    li.appendChild(button);                                                
    toDoList.appendChild(li);                                           //toDoList(ul태그) 하위에 li태그를 붙이는 코드
}


function handleToDoSubmit(e){                                           //greetings.js와 마찬가지로 브라우저의 기본동작을 막고, input value를 저장, Array toDos에 object 형식으로 추가해준다.
    e.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {                                                //object로 array에 저장해야 todolist삭제 동작을 수월하게 구현할 수 있다.
        text:newTodo,
        id:Date.now(),                                                  //현재시간값을 id로 지정
    }
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit",handleToDoSubmit);


const savedToDo = localStorage.getItem(TODOS_KEY);

if(savedToDo !== null){                                                 //로컬스토리지에 toDos값이 존재할 경우 새로고침 했을때에도 원래 화면을 유지시키는(다시그리는) 코드
    const parsedToDos = JSON.parse(savedToDo);                          //로컬스토리지에 저장된 값(string)을 parse를 해주면 js가 읽을수 있는 obj또는 arr가 된다                           
    toDos = parsedToDos;                                                //새로고침하면 코드의 toDos=[]로 초기화되기 때문
    parsedToDos.forEach(paintToDo);                                     //parsedToDos(로컬스토리지에 저장된 todolist들)의 각각의 obj를 아규먼트로 paintToDo에 하나하나 실행 시키는것(즉 여기가 실제로 다시 todolist를 화면에 그리는 동작을 한다)
}