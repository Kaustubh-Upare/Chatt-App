
const fileFormat=(url="")=>{
    const fileExt=url.split(".").pop();

    if(fileExt == "mp4" || fileExt == "webm" || fileExt == "ogg"){
        return "video";
    }
    if(fileExt == "mp3" || fileExt == "wav" ){
        return "audio";
    }
    if(fileExt == "jpg" || fileExt == "png" || fileExt == "jpeg" || fileExt == "gif" ){
        return "image";
    }
    return "file"
};

const getLast7Days = () => {
    const currentDate = new Date(); // Get current date
    const last7Days = []; // Initialize array to store the days

    for (let i = 0; i < 7; i++) {
        // Create a new date instance for each day
        const dayDate = new Date(currentDate);
        dayDate.setDate(currentDate.getDate() - i);

        // Get the day name
        const dayName = dayDate.toLocaleDateString("en-US", { weekday: "long" });

        // Add the day name to the start of the array
        last7Days.unshift(dayName);
    }

    return last7Days;
};

    const getOrSaveFromLocalStorage=({key,value,get})=>{
        if(get){
            return localStorage.getItem(key)
                    ?(JSON.parse(localStorage.getItem(key)))
                    :null
        }else{
            localStorage.setItem(key,JSON.stringify(value))
        }
    }


export {fileFormat,getLast7Days,getOrSaveFromLocalStorage};