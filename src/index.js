/*NOTES
** POSSIBLE UPGRADE order list options
figure out storage
Change filter so it removes unused ones
delete all completed option
*/

render('ALL');

import {todoItems, itemCreator, deleteFromItems, changeItem, categories } from "./items.js";

//controls the functions to display the list
export function render(filter){
    const container = document.getElementById("list");
    container.innerHTML = "";
    categoryRender(filter);
    if (todoItems.length > 0){
        for ( let i = 0; i < todoItems.length; i++){
            const bar = document.createElement("li");
            container.appendChild(bar);
            createPriority(bar, i);
            createTitle(bar, i);
            createDescription(bar, i);
            createCategory(bar, i);
            createOptions(bar, i);
            if (filter != 'ALL'){
                if (todoItems[i].category != filter){
                    bar.style.display = 'none';
                }
            }
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

export function categoryRender(filterChoice){
    let filter = filterChoice
    const all = document.getElementById('all');
    all.onclick = function(){
        filter = 'ALL';
        render(filter);
    }
    let categories = [];
    for (let i =0; i < todoItems.length; i++){
        if (!categories.includes(todoItems[i].category)){
            categories.push(todoItems[i].category);
    }}
    categories = categories.sort();
    const filterContainer = document.getElementById("filter-container");
    filterContainer.innerHTML = "";
    const allFilterImg = document.getElementById('all-image');
    if (filter === 'ALL'){
        allFilterImg.setAttribute('src', './images/checked.png')
    }else{
        allFilterImg.setAttribute('src', './images/unchecked.png')
    }
    for (let i = 0; i < categories.length; i++){
        const line = document.createElement("span");
        const filterButton = document.createElement("img");
        const filterLabel = document.createElement("h2");
        filterContainer.appendChild(line);
        line.appendChild(filterButton);
        line.appendChild(filterLabel);
        line.setAttribute('id', categories[i]);
        line.classList.add('filter-line'); 
        filterLabel.innerHTML = categories[i]; 
        if (filter === categories[i]){
            filterButton.setAttribute('src', './images/checked.png')
        }else{
            filterButton.setAttribute('src', './images/unchecked.png')
        }
        line.onclick = function(){
            filter = categories[i];
            render(filter)
        }
    }
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
const formToggle = document.querySelectorAll("#item-creator"); 
formToggle.forEach(button => button.addEventListener('click', () => {
    if (document.getElementById('form-container').style.display === 'block'){
        document.getElementById('form-container').style.display = 'none';
    }else {document.getElementById('form-container').style.display = 'block';
    }}));

//submitting a new todo
const submit = document.getElementById("task-submit");
submit.addEventListener("click", itemCreator);
