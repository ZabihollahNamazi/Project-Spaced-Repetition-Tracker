// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, addData, getData } from "./storage.js";

document.getElementById("input-form").style.display = "none";


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
        document.getElementById("ul-list").innerHTML= "";
        document.getElementById("input-form").style.display = "block";

        let opt = dropDownList.options[dropDownList.selectedIndex];
        let id = opt.id;

        addDataLocal(id)
        displayList(id)
    
})
}

function addDataLocal(id){
    let topic = document.getElementById("topic");
    let datePicker = document.getElementById("datePicker");
    
    let userId = id;
    let button = document.getElementById("btn")
    button.addEventListener("submit", (e)=> {
        e.preventDefault()
        document.getElementById("ul-list").innerHTML= "";
        
        let data = {topic: topic.value, date: datePicker.value}
        console.log(data);
        addData(userId, data);
        displayList(userId);

        topic.value = ""; // empty the topic input after adding
        datePicker.value = new Date().toISOString().split('T')[0]; // set as default date again
    })
    
} 

function displayList(id){
    let ulList = document.getElementById("ul-list");
    let userId = id;
    const receivedData = getData(userId);
    if(!receivedData){
        let li = document.createElement("li");
        li.innerHTML = "There is no agenda";
        ulList.appendChild(li);
    }
    else{
        for(let i of receivedData){
            let li = document.createElement("li");
            li.innerHTML = `${i.topic} - ${i.date}`;
            ulList.appendChild(li);
        }
    }
    
}

window.onload = function () {
    let datePickerDefault = document.getElementById("datePicker");
    datePickerDefault.value = new Date().toISOString().split('T')[0];
    dropDown()
    
  //document.querySelector("body").innerText = `There are ${users.length} users`;
};