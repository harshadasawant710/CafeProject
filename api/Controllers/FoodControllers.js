const Food = require("../Models/Food")

exports.foodInsertform = (req, res) => {
    // console.log(req.body)
    // console.log(req.file.filename)

    const { pname, pdesc, pamount, pqty, pstatus } = req.body
    const filename = req.file.filename

    try {
        const record = new Food({ PName: pname, PDesc: pdesc, PPrice: pamount, PQty: pqty, PStatus: pstatus, PImg: filename })
        record.save()

        res.json({
            status: 201,
            apiData: record,
            message: "you product is successfully inserted"
        })
    }
    catch (error) {
        res.json({
            status: 400,
            message: error.message
        })
    }

}

exports.showFoodproducts = async (req, res) => {
    try {
        const record = await Food.find()
        res.json({
            status: 200,
            apiData: record,
            message: "Data is successfully Transfer"
        })
    }
    catch (error) {
        res.json({
            status: 400,
            message: error.message
        })
    }
}

exports.DeleteFoodProduct = async (req, res) => {
    const id = req.params.id
    try {
        await Food.findByIdAndDelete(id)
        res.json({
            status: 200,
            message: "sucessfully Remove Product"
        })
    }
    catch (error) {
        res.json({
            status: 400,
            message: error.message
        })
    }
}

exports.singleProductUpdate = async (req, res) => {
    //console.log(req.params.id)

    const id = req.params.id
    try {
        const record = await Food.findById(id)
        res.json({
            status: 200,
            apiData: record
        })
    } catch (error) {
        res.json({
            status: 400,
            message: error.message
        })
    }
}

exports.adminfinalupdateImage = async (req, res) => {
    const id = req.params.id
    const { pname, pdesc, pamount, pqty, pstatus } = req.body
    const filename = req.file.filename
    console.log(req.file.filename)
    try {
        if (req.file) {
            await Food.findByIdAndUpdate(id, { PName: pname, PDesc: pdesc, PPrice: pamount, PQty: pqty, PStatus: pstatus, PImg: filename })
        }
        else {
            await Food.findByIdAndUpdate(id, { PName: pname, PDesc: pdesc, PPrice: pamount, PQty: pqty, PStatus: pstatus, PImg: filename })
        }
        res.json({
            status: 200,
            message: "Successfully Updated Product"
        })
    }
    catch (error) {
        res.json({
            status: 400,
            message: error.message
        })
    }

}

exports.adminfinalupdate = async (req, res) => {
    //console.log(req.body)
    //console.log(req.params.id)
    const id = req.params.id

    const { pname, pdesc, pamount, pqty, pstatus } = req.body
    try {
        await Food.findByIdAndUpdate(id, { PName: pname, PDesc: pdesc, PPrice: pamount, PQty: pqty, PStatus: pstatus })
        res.json({
            status: 200,
            message: "Successfully Product Updated"
        })

    } catch (error) {
        res.json({
            status: 400,
            message: error.message
        })
    }
}

exports.usershowlist = async (req, res) => {
    try {
        const record = await Food.find({ PStatus: "IN-STOCK" })
        console.log("here", record)
        res.json({
            status: 200,
            apiData: record,
            message: 'Represent successfully '
        })
    } catch (error) {
        res.json({
            status: 400,
            message: error.message
        })
    }
}

exports.addtocartpage = async (req, res) => {
    try {
        const { ids } = req.body
        const rec = await Food.find({ _id: { $in: ids } })
        res.json({
            status: 200,
            apiData: rec
        })
    } catch (error) {
        res.json({
            status: 400,
            message: error.message
        })
    }
}