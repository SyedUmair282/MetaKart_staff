const sql = require("mssql");
const router = require("express").Router();
const bcrypt = require('bcryptjs');
// const validator = require('validator');
const jwt = require('jsonwebtoken');

router.post("/", (req, res) => {
    const { email, password } = req.body;
    // console.log(password);
    req.app.locals.db.query(`select * from staff where email='${email}'`, async function (err, recordset) {
      if (err) {
        console.error(err)
        res.status(500).send('SERVER ERROR')
      }
      else {
        if (Object.keys(recordset.recordset).length !== 0) {
          // const matchedPassword = await bcrypt.compare(password, recordset.recordset[0].passsword)
          // console.log(matchedPassword);
          if (password===recordset.recordset[0].passsword) {
            // const token = jwt.sign({ user_id: recordset.recordset[0].user_id, user_name: recordset.recordset[0].username }, process.env.SECRET_KEY)
            // console.log("working",token)
            res.status(201).json(recordset.recordset );
          }
          else {
            res.status(400).json('Wrong credential');
          }
        }
        else {
          res.status(400).json("No user found");
        }
      }
    // console.log(res.status(200).send( recordset.recordset[0]).passsword);
    // res.status(200).send( recordset.recordset[0])
    })
  })

  module.exports = router