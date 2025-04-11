// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, addData, getData, clearData } from "./storage.js";
import { dateFormat } from "./dateformat.js";

document.getElementById("input-form").style.display = "none"; // set form hide as default

let currentUserId = null;
let datePickerDefault = document.getElementById("datePicker"); //set todays date as default in the date picker input
datePickerDefault.value = new Date().toISOString().split('T')[0];

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
    dropDownList.addEventListener("change", ()=>{ // when clicking on a user it shows their agendas
        document.getElementById("ul-list").innerHTML= "";
        document.getElementById("input-form").style.display = "block";

        let opt = dropDownList.options[dropDownList.selectedIndex];
        currentUserId = opt.id;

        displayList(currentUserId)
    
})
}

function addDataLocal(){
    
    let form = document.getElementById("input-form")
    form.addEventListener("submit", (e)=> {
        e.preventDefault();

        let topicInput = document.getElementById("topic-input");
        let datePicker = document.getElementById("datePicker");
        
        let data = {topic: topicInput.value, date: datePicker.value} // getting topic and date and put them into data object
        console.log(data);
        addData(currentUserId, data); // add data to local storage
        displayList(currentUserId); // with userId it gets data from local storage and display them as list if agendas

        topicInput.value = ""; // empty the topic input after adding
        datePicker.value = new Date().toISOString().split('T')[0]; // set as default date again
    })
    
} 

function displayList(id){
    let ulList = document.getElementById("ul-list");
    document.getElementById("ul-list").innerHTML= "";
    const receivedData = getData(id);
    console.log(receivedData,  "receive data line 64")
    let arrEvents = []; // we use it in line 94 for pushing the revises dates into it
    if(!receivedData){ // if receivedData from localStorage is empty then it shows to user that there is no agenda
        let li = document.createElement("li");
        li.innerHTML = "There is no agenda";
        ulList.appendChild(li);
    }
    else{
        for(let i of receivedData){
            let originalDateSevenDays = new Date(i.date);
            originalDateSevenDays.setDate(originalDateSevenDays.getDate() + 7); // Add 7 days
            let sevenDays = originalDateSevenDays.toISOString().split("T")[0];
    
            let originalDateOneMonth = new Date(i.date); // Convert to Date object
            originalDateOneMonth.setMonth(originalDateOneMonth.getMonth() + 1); // Add 1 month
            const oneMonth = originalDateOneMonth.toISOString().split("T")[0]; // Convert back to string
    
            let originalDateThreeMonth = new Date(i.date);
            originalDateThreeMonth.setMonth(originalDateThreeMonth.getMonth() + 3);// Add 3 month
            const threeMonth = originalDateThreeMonth.toISOString().split("T")[0];// Convert back to string
    
            let originalDateSixMonth = new Date(i.date);
            originalDateSixMonth.setMonth(originalDateSixMonth.getMonth() + 6);// Add 6 month
            const sixMonth = originalDateSixMonth.toISOString().split("T")[0];// Convert back to string
    
            let originalDateOneYear = new Date(i.date);
            originalDateOneYear.setMonth(originalDateOneYear.getMonth() + 12);// Add 12 month whisch is one year
            const oneYear = originalDateOneYear.toISOString().split("T")[0];// Convert back to string
            console.log(i, "checking receivedData item");
            let arrDates = [sevenDays, oneMonth, threeMonth, sixMonth, oneYear];
            for(let n = 0; n < arrDates.length; n++){
                const newObject = {topic: i.topic, date: arrDates[n]}
                console.log(newObject , "  line 94")
                arrEvents.push(newObject); // making an array of objects with revisie dates: 7 days- one month - 3months- 6month- one year and their topic
            }
            
        }
        console.log(arrEvents , "  befor filtering line 100")
        // Sort by date in ascending order (earliest date first)
        arrEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        for(let j of arrEvents){
            console.log(j.date)
            const today = new Date()
            if(new Date(j.date) >= today){ // checking if the time is passed or not , if not then it'll go through and create li
                let li = document.createElement("li");
                li.innerHTML = `${j.topic} - ${dateFormat(j.date)}`; // dateFormat() is for formatting date like 26th-May-2025
                ulList.append(li);
            }
        }
    }
    
}

window.onload = function () {
    clearData(1)
    clearData(2)
    clearData(3)
    clearData(4)
    clearData(5)
    addDataLocal()
    dropDown()
};