const exp = require("express")
const app = exp()
const port = 3000

app.use(exp.json())
app.use(exp.urlencoded())
app.listen(port)

app.get("/" , (req , res)=>{
    res.sendFile(__dirname + "/StudentsInformations.html")
})

const students =[]

app.get("/students" , (req , res)=>{
        res.send(students)
})

app.get("/students/:id" , (req , res)=>{
    const student = students.find(c=> c.stnum == req.params.id)
    //if(!student) res.status(404).send("student not found")
    res.send(student)
})

app.post("/students" , (req , res)=>{
    //if(!req.body.name || req.body.name.length < 3){
        //res.status(400).send("error")
        //return
    //}
    //else{
    const student = {   
        fname : req.body.fname,
        lname : req.body.lname,
        birth : req.body.birth,
        stnum : Number(req.body.stnum) ,
        uni : req.body.uni,
        major : req.body.major
    }
    students.push(student)
    res.send(students)
//}
    
})

app.put("/students/:id" , (req , res)=>{
    const student = students.find(c=> c.stnum ==req.params.id)
    if(!student) return res.status(404).send("student not found")

    //if(!req.body.name || req.body.name.length < 3)
        //return res.status(400).send("error")
        
    student.fname = req.body.fname
    student.lname = req.body.lname
    student.birth = req.body.birth
    student.stnum = req.body.stnum
    student.uni = req.body.uni
    student.major = req.body.major
    res.send(student)

})

app.delete("/students/:id" , (req , res)=>{
    const student = students.find(c=> c.stnum == req.params.id)
    if(!student) return res.status(404).send("student not found")
    
    const index = students.indexOf(student)
    students.splice(index , 1)
    res.send(students)
})