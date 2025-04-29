import React, { useEffect, useState } from 'react'
import { data, Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-hot-toast"


const Admineditform = () => {

    const [pname, setPName] = useState('')
    const [pdesc, setDesc] = useState('')
    const [pamount, setPAmount] = useState('')
    const [pqty, setPQty] = useState('')
    const [pstatus, setPStatus] = useState('')
    const [pimg, setPImg] = useState('')
    const [message, setMessage] = useState('')
    const [editImage, setEditImage] = useState(false);

    const navigate = useNavigate()

    const { id } = useParams()
    //console.log(id)

    useEffect(() => {
        fetch(`/api/singleproductupdate/${id}`).then((res) => { return res.json() }).then((data) => {
            console.log(data)
            if (data.status === 200) {
                setPName(data.apiData.PName)
                setDesc(data.apiData.PDesc)
                setPAmount(data.apiData.PPrice)
                setPQty(data.apiData.PQty)
                setPImg(data.apiData.PImg)
                setPStatus(data.apiData.PStatus)
            }
            else {
                setMessage(data.message)
            }
        })
    }, [])

    //-----------------------------------------------------------------------------------------------------//

    function handleupdateform(e) {
        e.preventDefault();
        // console.log(pname, pdesc, pamount, pqty, pstatus)

        let Data1 = new FormData()
        console.log(Data1)

        if (editImage) {
            Data1.append("pname", pname)
            Data1.append("pdesc", pdesc)
            Data1.append("pamount", pamount)
            Data1.append("pqty", pqty)
            Data1.append("pstatus", pstatus)
            Data1.append("pimg", pimg);
            fetch(`/api/adminupdateimage/${id}`, {
                method: 'PUT',
                body: Data1
            })
                .then((res) => { return res.json() }).then((data) => {
                    console.log(data)
                    if (data.status === 200) {
                        setMessage(data.message)
                        Navigate("/Dashboard")
                    }
                    else {
                        setMessage(data.message)
                    }
                })
        }
        else {
            const data = {
                pname: pname,
                pdesc: pdesc,
                pamount: pamount,
                pqty: pqty,
                pstatus: pstatus
            }

            fetch(`/api/adminupdate/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then((res) => { return res.json() }).then((data) => {
                    console.log("here admin update",data)
                    if (data.status === 200) {
                        setMessage(data.message)
                        navigate("/Dashboard")
                    }
                    else {
                        setMessage(data.message)
                    }
                })
        }

    }

    return (
        <div>
            <div className='container-fluid'>
                <div className='row mt-3'>
                    <Link to='/Dashboard'><h6 className='adminbutton'>Dashboard</h6></Link>
                    {/* <div className='col-md-2' id='sidebar'>
                    <Link to='/Dashboard'><h6 id='adminbutton'>Dashboard</h6></Link>
                </div> */}
                    <div className='col-md-12' >
                        <h3 id='admininsertform'>Admin Insert Form</h3>

                        <form className='col-md-8 mx-auto' id="admininsertformcolor" onSubmit={(e) => { handleupdateform(e) }}>
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
                            {/* <input className="form-control mt-3" type="file" id="formFile" onChange={(e) => setPImg(e.target.files[0])} accept='image/*' /> */}


                            <select className="form-select mt-3" aria-label="Default select example" value={pstatus} onChange={(e) => setPStatus(e.target.value)}>
                                <option value="" disabled>Select Product Status</option>
                                <option value="OUT-STOCK">Out of Stack</option>
                                <option value="IN-STOCK">In Stack</option>
                            </select>

                            {editImage ? <div>
                                <input className="form-control mt-3" type="file" id="formFile" onChange={(e) => setPImg(e.target.files[0])} accept='image/*' />
                            </div> : (
                                <div className='mt-3'>
                                    <img src={`http://localhost:5000/upload/${pimg}`} id='editImage' style={{ width: '200px' }} />
                                    <i onClick={() => { setEditImage(true) }} style={{ fontWeight: '500' }}>Edit image</i>
                                </div>
                            )}

                            <button className='form-control mt-3 btn-primary' type='submit'>Edit Prodcut</button>

                            {/* <button className='btn btn-success mt-3' >Add Product</button> */}
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Admineditform
