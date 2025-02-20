import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { toast } from "react-hot-toast"

const AdminInsertform = () => {

    const [pname, setPName] = useState('')
    const [pdesc, setDesc] = useState('')
    const [pamount, setPAmount] = useState('')
    const [pqty, setPQty] = useState('')
    const [pstatus, setPStatus] = useState('')
    const [pimg, setPImg] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    function handleinsertform(e) {
        e.preventDefault()
        // console.log(pname,pdesc,pamount,pqty,pstatus)
        // console.log(pimg)

        let Data = new FormData()
        // console.log(Data)

        Data.append("pname", pname)
        Data.append("pdesc", pdesc)
        Data.append("pamount", pamount)
        Data.append("pqty", pqty)
        Data.append("pstatus", pstatus)
        Data.append("pimg", pimg)

        fetch('api/adminproductinsertform', {
            method: 'POST',
            body: Data
        })
        .then((res)=>{return res.json()}).then((data)=>{
            console.log(data)
            if(data.status === 201){
                setMessage(data.message)
                toast.success(data.message)
                navigate("/Dashboard")
            }
            else{
                setMessage(data.message)
                toast.error(data.message)
            }
        })
    }

    return (
        <div className='container-fluid'>
            <div className='row mt-3'>
            <Link to='/Dashboard'><h6 id='adminbutton'>Dashboard</h6></Link>
                {/* <div className='col-md-2' id='sidebar'>
                    <Link to='/Dashboard'><h6 id='adminbutton'>Dashboard</h6></Link>
                </div> */}
                <div className='col-md-12' >
                    <h3 id='admininsertform'>Admin Insert Form</h3>

                    <form className='col-md-8 mx-auto' id="admininsertformcolor" onSubmit={(e) => { handleinsertform(e) }}>
                        <input
                            value={pname}
                            onChange={(e) => setPName(e.target.value)}
                            type="text"
                            className="form-control mt-3"
                            placeholder="Product Name"
                            required
                        />
                        <input
                            value={pdesc}
                            onChange={(e) => setDesc(e.target.value)}
                            type="text"
                            className="form-control mt-3"
                            placeholder="Product Description"
                            required
                        />
                        <input
                            value={pqty}
                            onChange={(e) => setPQty(e.target.value)}
                            type="number"
                            className="form-control mt-3"
                            placeholder="Product Quantity"
                            required
                        />
                        <input
                            value={pamount}
                            onChange={(e) => setPAmount(e.target.value)}
                            type="number"
                            className="form-control mt-3"
                            placeholder="Product Price"
                            required
                        />
                        <input className="form-control mt-3" type="file" id="formFile" onChange={(e) => setPImg(e.target.files[0])} accept='image/*' />


                        <select className="form-select mt-3" aria-label="Default select example" value={pstatus} onChange={(e) => setPStatus(e.target.value)}>
                            <option value="" disabled>Select Product Status</option>
                            <option value="OUT-STOCK">Out of Stack</option>
                            <option value="IN-STOCK">In Stack</option>
                        </select>

                        <button className='btn btn-success mt-3'>Add Product</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default AdminInsertform
