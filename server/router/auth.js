const express=require('express')
const router=express.Router()
const bcrypt=require('bcrypt')

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
     }else if(password!=cpassword)
     {
        return res.status(422).json({
            error:"password is not matching"
        })
     } else{
          
                const user=new User({name,email,phone,work,password,cpassword})
              
                

                await user.save();
                
                res.status(201).json({
                    message:"registered user"
                })
                
            }
    }catch(err){
        console.log(err)

    }
   
})

//login route

router.post('/signin',async(req,res)=>{
   
    try{
          const{email,password}=req.body
          if(!email || !password)
          {
              return res.status(400).json({
                  error:"plz fill the data"
              })
          }
          const userLogin=await User.findOne({email:email});
          if(userLogin)
          {
            const isMatch=await bcrypt.compare(password,userLogin.password)

            if(!isMatch)
            {
               res.status(400).json({error:"Invalid Credentials"})   
            }
            else{
            
               res.json({message:"user signed in successfully"})
            }

          }
          else{
            res.status(400).json({error:"Invalid Credentials"}) 
          }

    //    console.log(userLogin);
             
        
        }catch(err){

    console.log(err)
        }
})

module.exports=router

