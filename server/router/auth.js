const express=require('express')
const router=express.Router()

require('../db/conn')
//require('../model/userSchema')
const User=require('../model/userSchema')
router.get('/',(req,res)=>{
    res.send('Hello world from the server from auth')
})

// router.post('/register',(req,res)=>{
//     const {name,email,phone,work,password,cpassword}=req.body
     
//     if(!name || !email || !phone || !work || !password || !cpassword)
//     {
//         return res.status(422).json({
//             error:"Plz fill the fields properly"
//         })
//     }
//     User.findOne({email:email})
//     .then((userExist)=>{
//         if(userExist)
//         {
//             return res.status(422).json({
//                 error:"email already exists"
//             })
//        }
//         const user=new User({name,email,phone,work,password,cpassword})
//         user.save().then(()=>{
//             res.status(201).json({
//                 message:"successfully registered"
//             })}).catch((err)=>
//                 res.status(500).json({
//                     error:"Failed registration"
//                 }))
          
        
//     }).catch(err=>{
//         console.log(err)
//     }
//     )
// })

router.post('/register',async(req,res)=>{
    const {name,email,phone,work,password,cpassword}=req.body
     
    if(!name || !email || !phone || !work || !password || !cpassword)
    {
        return res.status(422).json({
            error:"Plz fill the fields properly"
        })
    }
    try{
      const userExist=await  User.findOne({email:email})
      if(userExist)
      {
          return res.status(422).json({
              error:"email already exists"
          })
     }
          
                const user=new User({name,email,phone,work,password,cpassword})
              
                await user.save();
                
                res.status(201).json({
                    message:"registered user"
                })
                

    }catch(err){
        console.log(err)

    }
   
})

module.exports=router

