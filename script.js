let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
displayTasks();
function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
function addTask(){
    let input = document.getElementById("taskInput");
    let text = input.value.trim();
    if(text === "") return;
    tasks.push({
        text:text,
        completed:false
    });
    input.value="";
    saveTasks();
    displayTasks();
}
function displayTasks(){
    let list = document.getElementById("taskList");
    list.innerHTML="";
    tasks.forEach((task,index)=>{
        let li = document.createElement("li");
        if(task.completed){
            li.classList.add("completed");
        }
        li.innerHTML = `
        ${task.text}
        <div class="actions">
            <button class="complete" onclick="toggleComplete(${index})">✓</button>
            <button class="edit" onclick="editTask(${index})">Edit</button>
            <button class="delete" onclick="deleteTask(${index})">X</button>
        </div>
        `;
        list.appendChild(li);
    });
}
function deleteTask(index){
    tasks.splice(index,1);
    saveTasks();
    displayTasks();
}
function toggleComplete(index){
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}
function editTask(index){
    let newTask = prompt("Edit Task",tasks[index].text);
    if(newTask !== null){
        tasks[index].text = newTask;
        saveTasks();
        displayTasks();
    }
}