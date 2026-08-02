const form = document.querySelector("#taskForm");
const input = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const counter = document.querySelector("#counter");

const allBtn = document.querySelector("#allBtn");
const activeBtn = document.querySelector("#activeBtn");
const completedBtn = document.querySelector("#completedBtn");

let tasks = [];

let filter = "all";

form.addEventListener("submit", function(e){

    e.preventDefault();

    const text = input.value.trim();

    if(text==="") return;

    tasks.push({

        id:Date.now(),
        text:text,
        completed:false

    });

    input.value="";

    renderTasks();

});

function renderTasks(){

    taskList.textContent="";

    let filteredTasks;

    if(filter==="active"){

        filteredTasks = tasks.filter(task=>!task.completed);

    }

    else if(filter==="completed"){

        filteredTasks = tasks.filter(task=>task.completed);

    }

    else{

        filteredTasks = tasks;

    }

    filteredTasks.forEach(function(task){

        const li=document.createElement("li");

        const left=document.createElement("div");

        left.classList.add("left");

        const checkbox=document.createElement("input");

        checkbox.type="checkbox";

        checkbox.checked=task.completed;

        checkbox.addEventListener("change",function(){

            task.completed=checkbox.checked;

            renderTasks();

        });

        const span=document.createElement("span");

        span.textContent=task.text;

        if(task.completed){

            span.classList.add("completed");

        }

        left.appendChild(checkbox);

        left.appendChild(span);

        const deleteBtn=document.createElement("button");

        deleteBtn.textContent="Delete";

        deleteBtn.classList.add("delete");

        deleteBtn.addEventListener("click",function(){

            tasks=tasks.filter(function(t){

                return t.id!==task.id;

            });

            renderTasks();

        });

        li.appendChild(left);

        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    });

    updateCounter();

}

function updateCounter(){

    const remaining=tasks.filter(function(task){

        return !task.completed;

    }).length;

    counter.textContent=remaining+" tasks remaining";

}

allBtn.addEventListener("click",function(){

    filter="all";

    renderTasks();

});

activeBtn.addEventListener("click",function(){

    filter="active";

    renderTasks();

});

completedBtn.addEventListener("click",function(){

    filter="completed";

    renderTasks();

});

renderTasks();