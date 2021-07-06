const express = require("express");
let router = express.Router();
const jwt = require("jsonwebtoken");
let { getByEmail, comparePasswords, registerUser } = require("./security.model");

router.post(
  '/signin',
  async (req, res)=>{
    try{
      const { email, pswd } = req.body;
      let userInserted = await registerUser(email, pswd);
      delete userInserted.password;
      console.log(userInserted);
      res.status(200).json({"msg":"Usuario creado"});
    } catch(ex){
      res.status(500).json({ "msg": "Error" });
    }
  }
)

router.post(
  '/login',
  async (req, res)=>{
    try {
      const {email, pswd} = req.body;
      let user = await getByEmail(email);
      if(user){
        let isPasswordOk = await comparePasswords(pswd, user.password);
        if (isPasswordOk) {
          delete user.password;
          delete user.oldpasswords;
          const {email, roles, _id} = user;
          let payload = {
            jwt: jwt.sign({ email, roles, _id }, process.env.JWT_SECRET, {expiresIn:'240m'}),
            user: user
          }
          res.status(200).json(payload);
        }else {
          console.log(`Usuario ${email} no coincide contraseña`);
          res.status(400).json({ "msg": "Credenciales no Válidas" })
        }
      } else {
        console.log(`Usuario ${email} no encontrado en DB`);
        res.status(400).json({"msg":"Credenciales no Válidas"})
      }
    } catch(ex){
      res.status(500).json({"msg":"Error"});
    }

  }
);


module.exports = router;
