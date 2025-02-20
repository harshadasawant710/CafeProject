import React, { useState } from 'react'
import FoodProducts from './FoodProducts'

const Home = () => {

  // const [persons,setPersons] = useState("");
  // const [date,setDate] = useState("");
  // const [time, setTime] = useState("");

  
  return (
    <>
      <div>
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div
              className="carousel-item active"
              style={{
                height: "550px",
                backgroundImage:
                  "url('/cloud.jpg')",
                backgroundAttachment: "fixed",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <div className='text-light p-5 text-center' style={{
                position: "absolute", // Make the div an overlay
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "#00000096",
                textAlign: "center"
              }}>
                <h1 className='p-5 carousel-font'>welcome to our cafe Cloud</h1>
              </div>
            </div>
            <div
              className="carousel-item"
              style={{
                height: "550px",
                backgroundImage:
                  "url('https://images.pexels.com/photos/5490965/pexels-photo-5490965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
                backgroundAttachment: "fixed",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            ></div>
            <div
              className="carousel-item"
              style={{
                height: "550px",
                backgroundImage:
                  "url('https://images.pexels.com/photos/4551832/pexels-photo-4551832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
                backgroundAttachment: "fixed",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            ></div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>

        <div className='p-5' style={{ backgroundColor: 'whitesmoke', width: '90%', justifyContent: 'center', margin: '10px auto', position: 'relative', top: '-70px', }}>
          <div className='row' style={{ width: '90%', justifyContent: 'center', margin: '10px auto' }}>
            <div className='col-md'>

              <div className="input-group flex-nowrap">
                <input type="number" className="form-control" placeholder="person" aria-label="person" aria-describedby="addon-wrapping" />
                <span className="input-group-text bg-dark text-white" id="addon-wrapping"><i className="bi bi-person-add"></i></span>
              </div>

            </div>
            <div className='col-md-1 mt-1 fw-bold text-center'>For</div>
            <div className='col-md'>
              <div className="input-group flex-nowrap">
                <input type="date" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" />
                <span className="input-group-text bg-dark text-white" id="addon-wrapping"><i className="bi bi-calendar3"></i></span>
              </div>
            </div>
            <div className='col-md-1 mt-1 fw-bold text-center'>at</div>
            <div className='col-md mb-3'>
              <div className="input-group flex-nowrap">
                <input type="time" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" />
                <span className="input-group-text bg-dark text-white" id="addon-wrapping"><i className="bi bi-alarm"></i></span>
              </div>
            </div>
            <div className='col-md'>
              <div className="input-group flex-nowrap">
                <button className='form-control btn text-black btn-warning'><i className="bi bi-arrow-right-circle-fill"></i> Book a table</button>
              </div>
            </div>
          </div>
        </div>
        <FoodProducts />
      </div>


    </>
  )
}

export default Home
