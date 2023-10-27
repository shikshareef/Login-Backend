const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EmployeeModel = require('./models/Employee')

const app = express();
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://shareefsk219:shareef@shareef.kb3hiuc.mongodb.net/Company")
 //handling the signup page
app.post('/register' , (req , res)=>{
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
})

//handling the login page
app.post('/login' , (req, res)=>{
    const {email , password} = req.body;
    EmployeeModel.findOne({email:email})
    .then(user =>{
        if(user){
            if(user.password === password){
                res.json("success");
            }else{
                res.json("failure");
            }
        }else{
            res.json("No record found")
        }
    })
})

//showing all the users 
//read operation
app.get('/' ,async (req, res)=>{   
    try {
        const showAll = await EmployeeModel.find();
        res.status(200).json(showAll);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
      }
      
})

//delete operation

app.delete('/:id' ,async (req, res)=>{
    const {id} = req.params;
    try {
    const singleUser =await EmployeeModel.findByIdAndDelete({_id : id});
    res.status(200).json(singleUser);
       
   } catch (error) {
       console.log(error);
       res.send(500).json({error:error.message})
       
   }

})

//update operation put/pathch

// update operation put/patch
app.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    try {
        const updateUser = await EmployeeModel.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.status(200).json(updateUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message }); // Changed res.send(500) to res.status(500)
        return; // Return here to prevent sending an additional response
    }
});

//getting the single user 
app.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const singleUser = await EmployeeModel.findById({ _id: id });
        res.status(200).json(singleUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message }); // Changed res.send(500) to res.status(500)
        return; // Return here to prevent sending an additional response
    }
});









app.listen(3001 , ()=>{
    console.log("server is running")
})