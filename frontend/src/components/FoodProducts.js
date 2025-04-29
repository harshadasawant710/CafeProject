import React, { useContext, useEffect, useState } from 'react'
import { contextapi } from "../Contextapi"

const FoodProducts = () => {

  const [product, setProducts] = useState([]);
  const [message, setMessage] = useState();
  const [showLoginAlert, setShowLoginAlert] = useState(false)
  const [inputtext, setInputtext] = useState("")

  const { cart, setCart, loginname} = useContext(contextapi);

  useEffect(() => {

    fetch("/api/usershowlist")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.status === 200) {
          setProducts(data.apiData);
        } else {
          setMessage(data.message)
        }
      });
  }, []);

  function handlecart(e, productid) {
    if (!loginname) {
      setShowLoginAlert(true);
      return;
    }
    let _cart = { ...cart };
    console.log(_cart);

    if (!_cart.items) {
      _cart.items = {};
    }
    if (!_cart.items[productid]) {
      _cart.items[productid] = 1;
    } else {
      _cart.items[productid] += 1;
    }

    if (!_cart.totalitems) {
      _cart.totalitems = 1;
    } else {
      _cart.totalitems += 1;
    }

    setCart(_cart);
    console.log(_cart);
    localStorage.setItem("cart", JSON.stringify(_cart))

  }


  return (
    <>
      <div >
        <div className='row my-1' style={{ justifyContent: 'center', margin: '10px auto', width: '90%' }}>
          {product
            // .filter((el)=> el.PName.toLowerCase().includes(inputtext))
            .map((product, key) => (

              <div className='col-md-4 py-2 my-4 d-flex justify-content-center align-items-center' key={product._id || key}>
                <div style={{ width: '18rem' }}>
                  <img src={`upload/${product.PImg}`} style={{ width: '300px', height:'400px' }} className="card-img-top" alt="..." />
                  <div className="text-center p-body">
                    <h5 className='my-3 text-uppercase fw-bold'>{product.PName}</h5>
                    <h5 className='text-bold'>&#8377;{product.PPrice}</h5>
                    <p >{product.PDesc}</p>
                    <a className="btn btn-primary" onClick={(e) => handlecart(e, product._id)}>Add to Cart</a>
                  </div>
                </div>
              </div>
            ))}

        </div>
      </div>
    </>
  )
}

export default FoodProducts
