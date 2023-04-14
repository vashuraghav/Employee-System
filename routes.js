const router = require("express").Router();

const UserController = require("./controller/UserController");
const OrderController = require("./controller/OrderController");
const EmailController = require("./controller/EmailController");

router.post("/user", UserController.createUser);
router.get("/user/:id", UserController.getUser);
router.get("/user", UserController.getUserbyEmail);

router.post("/order", OrderController.createOrder);
router.get("/order/:orderId", OrderController.getOrder);
router.get("/order/:orderId/:orderItemId", OrderController.getOrderByIds);

router.post("/email", EmailController.sendEmail);
router.get("/email/:threadId", EmailController.getAllEmails);

module.exports = router;