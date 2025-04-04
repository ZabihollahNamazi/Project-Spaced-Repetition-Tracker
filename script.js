// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, addData } from "./storage.js";
function dropDown(){
    const users = getUserIds();
    let dropDownList = document.getElementById("dropdown");
    for(let i = 0; i < users.length; i++){
        let optionDropdown = document.createElement("option");
        optionDropdown.value = users[i];
        optionDropdown.id = users[i];
        console.log(optionDropdown)
        optionDropdown.innerHTML = `User ${users[i]}`;
        dropDownList.appendChild(optionDropdown);
    }
    dropDownList.addEventListener("change", ()=>{
    let h1 = document.createElement("h1")
    h1.innerHTML = `hello`;
    document.body.appendChild(h1);
    
})
}

function addDataLocal(){
    let topic = document.getElementById("topic");
    let datePicker = document.getElementById("datePicker");
    let data = {topic: topic.value, date: datePicker.value}
    console.log(data)
    let dropdown = document.getElementById("dropdown");
    dropdown.addEventListener("change", function() {
    let opt = dropdown.options[dropdown.selectedIndex];
    console.log("iddd" + opt.id)
    })
} 

window.onload = function () {
    let datePickerDefault = document.getElementById("datePicker");
    datePickerDefault.value = new Date().toISOString().split('T')[0];
    dropDown()
    addDataLocal()
  //document.querySelector("body").innerText = `There are ${users.length} users`;
};