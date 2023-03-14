const sql = require("mssql")
const router = require("express").Router()



router.post("/currentOrders", (req, res) => {
  const { sectionId } = req.body;
  req.app.locals.db.query(`select payDet.status,od.order_id ,oi.item_id,oi.quantity*prd.price as totalPrice , prd.price, od.created_at as placedOn , prd.name, oi.quantity,oi.orderStatus,prd.imgs , CONCAT(users.first_name,' ',users.last_name) as FullName, users.phone , prd.inStock , CONCAT(addr.address_line , ', ' , addr.city , ', ' ,addr.country ) as fullAddress,oi.sentToAdmin from order_details as od
  inner join order_items as oi on od.order_id = oi.order_id
  inner join product as prd on oi.product_id = prd.product_id
  inner join users on users.user_id = od.user_id
  inner join user_address as addr on addr.user_id = od.user_id
  inner join payment_details as payDet on od.payment_id=payDet.payment_id
  where prd.sectionId =${sectionId} AND oi.sentToAdmin=0`, function (err, recordset) {
    if (err) {
      console.error(err)
      res.status(500).send('SERVER ERROR')
      return
    }
    res.status(200).json(recordset.recordsets)
  })
});

router.post("/forwardedOrders", (req, res) => {
  const { sectionId } = req.body;
  req.app.locals.db.query(`select payDet.status,od.order_id ,oi.item_id,oi.quantity*prd.price as totalPrice , prd.price, od.created_at as placedOn , prd.name, oi.quantity,oi.orderStatus,prd.imgs , CONCAT(users.first_name,' ',users.last_name) as FullName, users.phone , prd.inStock , CONCAT(addr.address_line , ', ' , addr.city , ', ' ,addr.country ) as fullAddress,oi.sentToAdmin from order_details as od
  inner join order_items as oi on od.order_id = oi.order_id
  inner join product as prd on oi.product_id = prd.product_id
  inner join users on users.user_id = od.user_id
  inner join user_address as addr on addr.user_id = od.user_id
  inner join payment_details as payDet on od.payment_id=payDet.payment_id
  where prd.sectionId = ${sectionId} AND oi.sentToAdmin = 1`, function (err, recordset) {
    if (err) {
      console.error(err)
      res.status(500).send('SERVER ERROR')
      return
    }
    res.status(200).json(recordset.recordsets)
  })
})

router.post("/prevOrders", (req, res) => {
  const { sectionId } = req.body;
  req.app.locals.db.query(` select payDet.status,od.order_id ,oi.item_id,oi.quantity*prd.price as totalPrice , prd.price, od.created_at as placedOn , prd.name, oi.quantity,oi.orderStatus,prd.imgs , CONCAT(users.first_name,' ',users.last_name) as FullName, users.phone , prd.inStock , CONCAT(addr.address_line , ', ' , addr.city , ', ' ,addr.country ) as fullAddress,oi.sentToAdmin from order_details as od
  inner join order_items as oi on od.order_id = oi.order_id
  inner join product as prd on oi.product_id = prd.product_id
  inner join users on users.user_id = od.user_id
  inner join user_address as addr on addr.user_id = od.user_id
  inner join payment_details as payDet on od.payment_id=payDet.payment_id
  where prd.sectionId =${sectionId} AND oi.orderStatus != 'pending'`, function (err, recordset) {
    if (err) {
      console.error(err)
      res.status(500).send('SERVER ERROR')
      return
    }
    res.status(200).json(recordset.recordsets)
  })
})

router.post("/sendToAdmin", (req, res) => {
  const { itemId } = req.body;
  req.app.locals.db.query(`update order_items set sentToAdmin=1 where item_id=${itemId}`, function (err, recordset) {
    if (err) {
      console.error(err)
      res.status(500).send('SERVER ERROR')
      return
    }
    res.status(200).json("sent")
  })
})


module.exports = router
