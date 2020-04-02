const { Router } = require("express");
const { AuthMiddleware, ParseIntMiddleware } = require('../middlewares');
module.exports = function({ UserController }){
    const router = Router();

    router.get("/:userId", [AuthMiddleware], UserController.get);
    router.get("", [AuthMiddleware, ParseIntMiddleware], UserController.getAll);
    router.patch("/:userId",  [AuthMiddleware], UserController.update);
    router.delete("/:userId", [AuthMiddleware], UserController.delete);

    return router;
};