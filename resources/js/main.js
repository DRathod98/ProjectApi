//Creating an object to store the tasks 
var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) :{   //check if anydata in localStorage if any adding to the list
    todo: [],
    completed: []
};

//remove and complete icons in SVG format
var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

loadTodoList(); // running the function on load

//Adding a button click listner if the user clicked button add items to task
document.getElementById('addTask').addEventListener('click', function() {
    var value = document.getElementById('task').value;
    if (value){
        insertItem(value);
    } 
})

//Adding a key press listner if the user press enter add item to task 
document.getElementById('task').addEventListener('keydown', function(e){
    var value = this.value;
    if (e.code === 'Enter' && value){
        insertItem(value);
    }

});

//Insert Item function
function insertItem(value){
    addItemeTodo(value);
    document.getElementById('task').value = '';
    data.todo.push(value);
    dataObj();
}

//function to add the data if any in localStorage in the list on load
function loadTodoList(){
    if(!data.todo.length && !data.completed.length) return;

    for(i = 0; i < data.todo.length; i++){
        var value = data.todo[i];
        addItemeTodo(value);
    }

    for(j = 0; j < data.completed.length; j++){
        var value = data.completed[j];
        addItemeTodo(value, true);
    }
}

//Function to store the data in localStorage
function dataObj(){
    localStorage.setItem('todoList', JSON.stringify(data));
}

//Function to delete the item form the list
function removeItem(){
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var task = item.innerText;

    //removing the data form the array
    if(id === 'todo'){
        data.todo.splice(data.todo.indexOf(task), 1);
    }else{
        data.completed.splice(data.completed.indexOf(task), 1);
    }
    parent.removeChild(item);

    dataObj();
}

//Function for completing the item
function completeItem() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var task = item.innerText;

    //adding data in the array
    if(id === 'todo'){
        data.todo.splice(data.todo.indexOf(task), 1);
        data.completed.push(task);
    }else{
        data.completed.splice(data.completed.indexOf(task), 1);
        data.todo.push(task);
    }
    

    //checking the item if completed of not in the decleration 
    var target = (id === 'todo') ? document.getElementById('completed'):document.getElementById('todo')
    
    parent.removeChild(item);
    target.insertBefore(item, target. childNodes[0]);

    dataObj();
}
//Adds a task to the calender
function addItemeTodo(text){
    var list = document.getElementById('todo');

    var item = document.createElement('li');
    item.innerText = text;

    var button = document.createElement('div');
    button.classList.add('buttons');

    var remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML  = removeSVG;

    //Adding a on click listner to remove the item from the list
    remove.addEventListener('click', removeItem);

    var complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = completeSVG;

    //Adding a onClick listner for completing the item from the list
    complete.addEventListener('click', completeItem);


    button.appendChild(remove);
    button.appendChild(complete);
    item.appendChild(button);

    list.insertBefore(item, list.childNodes[0]);
}