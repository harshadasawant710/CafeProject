import React, { useState } from 'react'
import FoodProducts from './FoodProducts'
import BookTable from './BookTable'

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
                height: "700px",
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
                height: "700px",
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
                height: "700px",
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
        <div style={{ position: 'relative', top: '-200px' }}>
          <BookTable />
        </div>
        <FoodProducts />
      </div>


    </>
  )
}

export default Home
