const User = require("../Models/user.js")


const ok=async ()=>{
    const userPromise=[];


    for(let i=4;i<9;i++){
        const tempUser=User.create({
            name:`Any${i}`,
            username:`sample${i}`,
            password:'password',
            avatar:{
                public_id:`okw${i}`,
                url:`https://picsum.photos/id/0/5000/3333`
            }
        })
        userPromise.push(tempUser)
    }
    await Promise.all(userPromise)
    console.log("Users Created");
}


module.exports=ok;