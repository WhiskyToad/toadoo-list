import {render, categoryRender} from "./index.js";

//the array of todo's
export let todoItems = [
    {title:"I'm an example!",
    description: "Look at me Morty! I'm in an example!!",
    priority: "red",
    status: "not-complete",
    category: "RICK"
}];

export let categories = ['RICK'];

//Checks form before push to factory function
export function itemCreator(){
    let title = document.getElementById("title-creator").value;
    let description = document.getElementById("task-description").value;
    let category = document.getElementById("category-input").value;
    category = category.toUpperCase();
    let status = "not-complete";
    let priority = "";
    if (document.getElementById("green").checked == true){
        priority = "green";
    }else if (document.getElementById("amber").checked == true){
        priority = "amber";
    }else if (document.getElementById("red").checked == true){
        priority = "red";
    }//checks before pushing and clearing form
    if (title.length == 0){
        alert("Ooops, you must enter a title!")
    }else if (title.length > 30){
        alert("Your title is too long, 30 characters max")
    }else if (description.length == 0){
        alert("Ooops, you must enter a description!")
    }if (category.length == 0){
        alert("Ooops, you must enter a category")
    }else if (category.length > 10){
        alert("Your Category is too long, 10 characters max.")
    }else {
        if (!categories.includes(category)){
            categories.push(category);
        }
        todoItems.unshift(itemFactory(title, description, priority, status, category));
        document.getElementById('form-container').style.display = 'none';
        document.getElementById("title-creator").value = "";
        document.getElementById("task-description").value = "";
        document.getElementById("category-input").value = "";
        render('ALL')
}
}

//factory function for creating todos
function itemFactory(title, description, priority, status, category) {
    return { title, description, priority, status, category };
}

//delete function for items
export function deleteFromItems(){
    todoItems.splice(this.classList, 1);
    render('ALL');
}

//marking an item complete
export function changeItem(){
    if (todoItems[this.classList].status === "complete"){
        todoItems[this.classList].status = "not-complete"
    }else {todoItems[this.classList].status = "complete"}
    render('ALL');
}

