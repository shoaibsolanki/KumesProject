const User = require('../models/User')
const nodemailer = require('nodemailer');
const https = require('https')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "Soyamaliisagoodb$oy"
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'horacio.flatley@ethereal.email',
        pass: 'JztppBu2ha13hQjRCD'
    }
});
//Funtciont for send email
function sendEmailOTP(email, otp) {
    const mailOptions = {
     from: '"Fred Foo 👻" <shoaibsolanki73@gmail.com>',
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP for account verification is: ${otp}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
  //Genratre Otp Function
  function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
class UserController{

     static async CreateUser (req, res){
        try {
            let success = false
            let user = await User.findOne({ phoneNo: req.body.phoneNo });
            if (user) {
              return res.status(400).json({ success, error: "Sorry a User are already exists" });
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            //creat a new use
            user = await User.create({
              name: req.body.name,
              phoneNo: req.body.phoneNo,
              password: secPass,
              email: req.body.email
            });
            const data = {
              user: {
                id: user.id
              }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
      
            // res.json(user);
            success = true;
            res.json({ success, authtoken });
            //catch errors
          } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
          }
     }
    
     static async Login(req, res){
        let success = false
        const { phoneNo, password } = req.body;
    try {
      let user = await User.findOne({ phoneNo });
      if (!user) {
        success = false;
        return res.status(400).json({ success, error: "please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false
        return res.status(400).json({ success, error: "please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken })

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
     }


  
    static async SendEmailOTP(req,res){
        const { email, phoneNo,name,password } = req.body;

        // Generate OTP
        const otp = generateOTP();
        console.log("this otp",otp)
        // Send OTP via email
        await sendEmailOTP(email, otp);
        const user = await User.create({email:email, name:name, phoneNo:phoneNo, password:password,otp:otp})
        res.send(user)
        console.log("this user",user)
    }



//     static async GenImage(req, res) {
//       const { prompt, steps } = req.body;
//       const payload = JSON.stringify({
//           prompt: prompt,
//           steps: steps,
//       });
  
//       const apiUrl = 'https://hmnvu2onvea16z-3001.proxy.runpod.net/sdapi/v1/txt2img';
  
//       const options = {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json',
//               'Content-Length': Buffer.byteLength(payload) // Calculate the payload length correctly
//           }
//       };
  
//       try {
//           const REQDATA = await new Promise((resolve, reject) => {
//               const req = https.request(apiUrl, options, (res) => {
//                   let data = '';
  
//                   res.on('data', (chunk) => {
//                       data += chunk;
//                   });
  
//                   res.on('end', () => {
//                       resolve(JSON.parse(data));
//                   });
//               });
  
//               req.on('error', (error) => {
//                   reject(error);
//               });
  
//               req.write(payload);
//               req.end();
//           });
  
//           // Send the generated image data as a response
//           res.status(200).json(REQDATA);
//       } catch (error) {
//           console.error('Error:', error);
//           // Send an error response if there's any issue with the request
//           res.status(500).json({ error: 'Internal server error' });
//       }
//   }
}
module.exports = UserController