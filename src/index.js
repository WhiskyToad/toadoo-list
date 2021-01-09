/*NOTES
** POSSIBLE UPGRADE order list options
figure out storage
one function to create filter and another one to change selected?

make it only run the function to generate if theres only a new filter
somehow need to stop them getting unchekced
and having all checked at the start
clicking all is breaking it
*/

render();

import {todoItems, itemCreator, deleteFromItems, changeItem } from "./items.js";

//controls the functions to display the list
export function render(){
    console.log("test")
    const container = document.getElementById("list");
    container.innerHTML = "";
    createFilters();
    //let checked = document.querySelectorAll('input[name="filter"]:checked').value;
    //console.log(checked);
    if (todoItems.length > 0){
        for ( let i = 0; i < todoItems.length; i++){
            const bar = document.createElement("li");
            container.appendChild(bar);
            createPriority(bar, i);
            createTitle(bar, i);
            createDescription(bar, i);
            createCategory(bar, i);
            createOptions(bar, i);
        }
    }
}

//all the functions to create individual elements
function createPriority(bar, i){
    const priority = document.createElement("span");
    bar.appendChild(priority);
    priority.classList.add(todoItems[i].priority);
    priority.setAttribute('id', "todo-priority");
}
function createTitle(bar, i){
    const title = document.createElement("span");
    bar.appendChild(title);
    title.setAttribute( 'id', "todo-title");
    title.innerHTML = `${todoItems[i].title}`;
}

function createDescription(bar, i){
    const description = document.createElement("span");
    bar.appendChild(description);
    description.classList.add ("description-text");
    description.innerHTML = `${todoItems[i].description}`;
}

function createCategory(bar, i){
    const category = document.createElement("span");
    bar.appendChild(category);
    category.setAttribute('id', "todo-category");
    category.innerHTML = `${todoItems[i].category}`;
}

function createOptions(bar, i){
    const options = document.createElement("div");
    const complete = document.createElement("button");
    const remove = document.createElement("button");
    bar.appendChild(options);
    options.appendChild(complete);
    options.appendChild(remove);
    options.setAttribute('id', "todo-options");
    complete.classList.add(i);

    remove.setAttribute('id', "todo-delete");
    remove.classList.add(i);
    const removeItem = document.querySelectorAll("#todo-delete");
    removeItem.forEach(button => button.addEventListener('click', deleteFromItems));
    if (todoItems[i].status === "complete"){
        bar.classList.add("checked");
        complete.setAttribute('id', 'todo-undo');
        complete.classList.add(i);
        bar.style.order = "2";
        const undoItem = document.querySelectorAll("#todo-undo");
        undoItem.forEach(button => button.addEventListener('click', changeItem));
    }else {
        complete.setAttribute('id', "todo-complete");
        const markComplete = document.querySelectorAll("#todo-complete");
        markComplete.forEach(button => button.addEventListener('click', changeItem));
    }
}

function createFilters(){
    let filters = [];
    filters = [];
    const filterContainer = document.getElementById("filter-container");
    filterContainer.innerHTML = "";
    for (let i = 0; i < todoItems.length; i++){
        if (!filters.includes(todoItems[i].category)){
            filters.push(todoItems[i].category)
        }
    }
    filters = filters.sort()
    for (let i = 0; i < filters.length; i++){
        const line = document.createElement("div");
        const filterButton = document.createElement("input");
        const filterLabel = document.createElement("label");
        filterContainer.appendChild(line);
        line.appendChild(filterButton);
        line.appendChild(filterLabel);
        filterButton.setAttribute("type", "radio");
        filterButton.setAttribute("name", "filter")
        filterButton.setAttribute("id", "filter-button")
        filterButton.setAttribute("value", filters[i]);
        filterLabel.innerHTML = `${filters[i]}`;
        //const filterOption = document.querySelectorAll('#filter-button');
        filterButton.forEach(option => option.addEventListener('click', function(){
            filterOption.checked = true;
            render()
        }))
}
}

function filterChoice(){

}
//showing/hiding sidebar
const menu = document.querySelector("#menu");
menu.addEventListener('click', () => {
    menu.classList.toggle("change");
    if (document.getElementById('sidebar').style.width === '200px'){
        document.getElementById('sidebar').style.width = '0px';
    }else {document.getElementById('sidebar').style.width = '200px';
    }

})

// Shows and hides submission form
const formToggle = document.querySelectorAll(".form"); 
formToggle.forEach(button => button.addEventListener('click', () => {
    if (document.getElementById('form-container').style.display === 'block'){
        document.getElementById('form-container').style.display = 'none';
    }else {document.getElementById('form-container').style.display = 'block';
    }}));

//submitting a new todo
const submit = document.getElementById("task-submit");
submit.addEventListener("click", itemCreator);