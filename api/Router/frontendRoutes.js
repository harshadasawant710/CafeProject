const router = require("express").Router()
const FoodC = require("../Controllers/FoodControllers")
const RegC = require("../Controllers/RegControllers")
const BookC = require("../Controllers/BookingControllers")

const multer = require("multer")

const Storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, './Public/upload');
    },

    filename: function (req, file, cd) {
        cd(null, Date.now() + file.originalname)
    }
})

let upload=multer({
    storage:Storage,
    limits:{
        fieldSize:1024*1024*4
    }
})


router.post("/Register", RegC.RegistrationUser)
router.post("/Login", RegC.LoginUseForm)
router.post("/adminproductinsertform",upload.single("pimg"), FoodC.foodInsertform)
router.get("/adminshowdetails", FoodC.showFoodproducts)
router.delete("/admindeleteproduct/:id",FoodC.DeleteFoodProduct)
router.get("/singleproductupdate/:id",FoodC.singleProductUpdate)
router.put("/adminupdateimage/:id",upload.single("pimg"),FoodC.adminfinalupdateImage)
router.put("/adminupdate/:id", FoodC.adminfinalupdate)
router.get("/usershowlist", FoodC.usershowlist)
router.post("/cart",FoodC.addtocartpage)
//router.post("/booktable", BookC.bookTable)

module.exports = router;