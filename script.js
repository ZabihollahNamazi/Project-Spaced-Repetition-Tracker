// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, addData, getData, clearData } from "./storage.js";

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
    let form = document.getElementById("input-form")
    form.addEventListener("submit", (e)=> {
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
    let arrEvents = [];
    if(!receivedData){
        let li = document.createElement("li");
        li.innerHTML = "There is no agenda";
        ulList.appendChild(li);
    }
    else{
        for(let i of receivedData){
            let originalDateSevenDays = new Date(i.date);
            originalDateSevenDays.setDate(originalDateSevenDays.getDate() + 7);
            let sevenDays = originalDateSevenDays.toISOString().split("T")[0];
    
            let originalDateOneMonth = new Date(i.date); // Convert to Date object
            originalDateOneMonth.setMonth(originalDateOneMonth.getMonth() + 1); // Add 1 month
            const oneMonth = originalDateOneMonth.toISOString().split("T")[0]; // Convert back to string
    
            let originalDateThreeMonth = new Date(i.date);
            originalDateThreeMonth.setMonth(originalDateThreeMonth.getMonth() + 3);
            const threeMonth = originalDateThreeMonth.toISOString().split("T")[0];
    
            let originalDateSixMonth = new Date(i.date);
            originalDateSixMonth.setMonth(originalDateSixMonth.getMonth() + 6);
            const sixMonth = originalDateSixMonth.toISOString().split("T")[0];
    
            let originalDateOneYear = new Date(i.date);
            originalDateOneYear.setMonth(originalDateOneYear.getMonth() + 12);
            const oneYear = originalDateOneYear.toISOString().split("T")[0];
            
            let arrDates = [sevenDays, oneMonth, threeMonth, sixMonth, oneYear];
            for(let n in arrDates){
                const newObject = {topic: i.topic, date: arrDates[n]}
                arrEvents.push(newObject);
            }
            
        }
        // Sort by date in ascending order (earliest date first)
        arrEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        for(let j of arrEvents){
            let li = document.createElement("li");
            li.innerHTML = `${j.topic} - ${j.date}`;
            ulList.append(li);
        }
    }
    
}

window.onload = function () {
    //clearData(1)
    let datePickerDefault = document.getElementById("datePicker");
    datePickerDefault.value = new Date().toISOString().split('T')[0];
    dropDown()
    
  //document.querySelector("body").innerText = `There are ${users.length} users`;
};