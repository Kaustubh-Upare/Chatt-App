
    export  const samplechats=[{
        name:"John",
        _id:"1",
        groupChat:false,
        members:["1","2"]
        
    },{
        name:"John Boi",
        _id:"2",
        groupChat:false,
        members:["1","2"]
        
    }]

    export const sampleUser=[{
        name:"John",
        _id:"1",
       
        
    },{
        name:"John Boi",
        _id:"2",
        
    }]

    export const sampleMsg=[{
        attachments:[{
            public_id:"1234",
            url:"https://picsum.photos/400"
        }],
        content:"Bhai Msg Hai",
        _id:"Any1234",
        Sender:{
            _id:"user._id",
            name:"Kastya"
        },
        chat:"chatId",
        createdAt:"2024-12-27T10:41:30.6302"
    },{
        attachments:[{
            public_id:"1234",
            url:"https://picsum.photos/400"
        }],
        content:"Bhai Msg Hai 2",
        _id:"Any1234",
        Sender:{
            _id:"user._id2",
            name:"Kastya"
        },
        chat:"chatId",
        createdAt:"2024-12-27T10:41:30.6302"
    }
];

export const sampleTableData={
    users:[
        {
            name:"John Doe",
            _id:"1",
            username:"John_doe",
            friends:20,
            groups:5,
        },
        {
            name:"John Boi",
            _id:"2",
            username:"John_boi",
            friends:24,
            groups:90,
        },
    ],
    chats:[
        {
            name:"AnyGroup",
            _id:1,
            avataar:["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNSM6mFaaCyjNthKMXzvWFU3PpikSOr8ME3g&s"],
            groupChat:false,
            members:["1","2"],
            totalMembers:2,
            totalMsgs:20,
            creator:{
               name:"John Doe",
                avataar:["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF1kuBcrb6GFlRWj5stfP633KpBJBZwcQ9nQ&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNSM6mFaaCyjNthKMXzvWFU3PpikSOr8ME3g&s"],
            }
        },{
            name:"Bangad Billa",
            _id:2,
            groupChat:true,
            members:["1","2"],
            totalMembers:2,
            totalMsgs:34,
            creator:{
               name:"John Boi",
               avataar:["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQszwhd_V5a9-D4k1DyQvvmPO0RE6puATAgbw&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDa9hQ3PeGTnV6s4ItPQu2CCbfUEqCZrs_Rg&s"]
            }
        }
    ]

};