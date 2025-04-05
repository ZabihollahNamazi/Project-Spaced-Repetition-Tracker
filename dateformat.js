let date = "2025-05-22";
export function dateFormat(date){
    
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
    const dateList = date.split("-");
    let day, month= "";
    if(dateList[2] == "1" || dateList[2] == "21" || dateList[2] == "31"){
        day = dateList[2] + "st";
    }
    else if(dateList[2] == "2" || dateList[2] == "22" || dateList[2] == "32"){
        day = dateList[2] + "nd";
    }
    else if(dateList[2] == "3" || dateList[2] == "23"){
        day = dateList[2] + "rd";
    }
    else{day = dateList[2] + "th"}

    month = months[Number(dateList[1]) - 1];

    return `${day}-${month}-${dateList[0]}`
}
console.log(dateFormat(date))
