
const formToggle = document.getElementsByClassName("form")[0];
formToggle.onclick=function(){
    const x = document.getElementById("form-container");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
}