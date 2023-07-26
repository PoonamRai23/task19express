const express = require("express");
const path=require('path')
const bodyParser=require('body-parser');

const db = require("../utils/database");

const app = express();
const router = express.Router();
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:true}))

router.get("/", (req, res, next) => {
  db.execute("SELECT * FROM datas")
  .then((result) => {
    const rows=result[0];
    res.send(rows)
    // res.sendFile(path.join(__dirname,"../","views","expenseTracker.html"))
  })
  .catch(err=>console.log(err));
});
router.post("/add", (req, res, next) => {
  const amta = req.body.amt;
  const desa = req.body.des;
  const cata = req.body.cat;
  db.execute("INSERT INTO datas(amount,description,category)VALUES(?,?,?)", [
    amta,
    desa,
    cata,
  ])
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get('/del/:id',(req,res,next)=>{
  const id= req.params.id;
  db.execute("DELETE FROM datas WHERE id=?",[id])
  .then(()=>{
    res.redirect('/');
  })
  .catch(err=>console.log(err))
})

module.exports = router;
