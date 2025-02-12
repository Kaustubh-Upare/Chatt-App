let userSocketIds=new Map();

const getotherMember=(members,userId)=>(
   members.find((member)=>member._id.toString() !== userId.toString())
)
console.log(userSocketIds)
const getSockets = (users = []) => {
   return users
       .map((user) =>{ 
         const socketId=userSocketIds.get(user)
         // console.log(`User: ${user}, Socket ID: ${socketId}`)
         return socketId
      })
       .filter((socketId) => socketId); // Filter out undefined values
};

module.exports={getotherMember,getSockets,userSocketIds}