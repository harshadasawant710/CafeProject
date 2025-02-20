const reg = require("../Models/Reg")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


exports.RegistrationUser = async (req, res) => {
  const { username, password, email } = req.body;
  const checkpass = await bcrypt.hash(password, 10)
  const userCheck = await reg.findOne({ Username: username })
  //console.log("here",req.body)
  try {
    if (userCheck === null) {
      const record = new reg({ Username: username, Password: checkpass, Email: email })
      console.log(record)
      record.save()
      res.json({
        status: 201,
        apiData: record,
        successMessage: "Registration successful"
      })
    }
    else {
      res.json({
        status: 401,
        successMessage: "Error registering user"
      })
    }

  } catch (error) {
    res.json({
      status: 400,
      message: error.message
    })
  }

}

exports.LoginUseForm = async (req, res) => {
  const { username, password, email } = req.body;
  const record = await reg.findOne({ Username: username })
  console.log("here login",record)

  try {
    if (record !== null) {
      const userpasscheck = await bcrypt.compare(password, record.Password)
      
      if (userpasscheck) {

        const token = jwt.sign({ username: record.Username }, "your_secret_key", { expiresIn: "1h" });

        res.json({
          status: 200,
          apiData: record.Username,
          message: `${username} successfully login`
        })
      }
      else {
        res.json({
          status: 400,
          message: "oops somthing went wrong..."
        })
      }

    }
    else{
      res.json({
        status:400,
        message:"oops somthing went wrong"
      })
    }
  }
  catch(error){
    res.json({
      status:401,
      message:"wrong credientials"
    })
  }
}
