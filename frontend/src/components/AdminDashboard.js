import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'



const AdminDashboard = () => {

  const navigate = useNavigate()

  const [product, setProduct] = useState([])
  const [message, setMessage] = useState()

  useEffect(() => {
    fetch("/api/adminshowdetails").then((res) => { return res.json() }).then((data) => {
      //console.log(data)
      if (data.status === 200) {
        setProduct(data.apiData)
      } else {

      }
    })
  }, [])

  function handleremove(e, id){
    fetch(`/api/admindeleteproduct/${id}`,{
      method:"DELETE"
    })
    .then((res)=>{return res.json()}).then((data)=>{
      console.log("here",data)
      if(data.status===200){
        toast.success(data.message)
        setMessage(data.message)
        navigate("/Dashboard")
      }
      else{
        toast.error(data.message)
        setMessage(data.message)
      }
    })
  }

  return (
    <div className='container-fluid'>
      <div className='row mt-5'>
      <Link to='/AdminInsertForm'><h6 className='adminbutton'>Admin Add Form</h6></Link>

        {/* <div className='col-md-2' id='sidebar'>
          <Link to='/AdminInsertForm'><h6 id='adminbutton'>Admin Add Form</h6></Link>
        </div> */}
        <div className='col-md-12' style={{width:'90%',justifyContent:'center',margin:'auto'}}>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th>Food Image</th>
                <th>Food Name</th>
                <th>Food Description</th>
                <th>Food Quantity</th>
                <th>Food Amount</th>
                <th>Food Status</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>

            <tbody>
              {
                product.map((item, key) => (
                  <tr>
                    <td><img src={`upload/${item.PImg}`} alt='img' id='myimg' /></td>
                    <td>{item.PName}</td>
                    <td>{item.PDesc}</td>
                    <td>{item.PQty}</td>
                    <td>{item.PPrice}</td>
                    <td>{item.PStatus}</td>
                    <td><Link to={`/adminproductremove/${item._id}`}><button className='btn btn-danger' onClick={(e)=>{handleremove(e,item._id)}}><i className="bi bi-trash3-fill"></i></button></Link></td>
                    <td><Link to={`/adminproductupdate/${item._id}`}><button className='btn btn-primary'><i className="bi bi-pencil-fill"></i></button></Link></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
