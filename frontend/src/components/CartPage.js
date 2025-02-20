import React, { useContext, useEffect, useState } from 'react'
import { contextapi } from '../Contextapi'
import { useNavigate } from 'react-router-dom'; 

const CartPage = () => {

  const [message, setMessage] = useState('');
  const [prod, setProd] = useState([]);
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount]= useState('');

  const { cart, setCart,totalitems } = useContext(contextapi)
  
  useEffect(() => {

    if (prod.length > 0) {
      let total = prod.reduce((sum, item) => {
        return sum + item.PPrice * (cart.items[item._id] || 0);
      }, 0);
      setTotalAmount(total);
    }
  
    if (cart && cart.items) {
      fetch('/api/cart', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: Object.keys(cart.items) }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          if (data.status === 200) {
            if (JSON.stringify(prod) !== JSON.stringify(data.apiData)) {
              setProd(data.apiData);
            }          } else {
            setMessage(data.message);
          }
        })
        .catch((error) => console.error("Error fetching cart data:", error));
    } else {
      setMessage("Cart is empty or undefined");
    }
  }, [prod,cart])

  function handleQty(id) {
    return cart.items[id]
  }

  function handleinc(e, id, qty) {
    let currentqty = handleQty(id)
    let _cart = { ...cart }
    _cart.items[id] = currentqty + 1
    _cart.totalitems += 1;
    setCart(_cart);
    checkCartEmpty(_cart);
  }

  function handledec(e, id) {
    let currentqty = handleQty(id)
    if (currentqty === 1) {
      return
    }
    let _cart = { ...cart }
    _cart.items[id] = currentqty - 1
    _cart.totalitems -= 1;
    setCart(_cart);
    checkCartEmpty(_cart);
  }

  function handleRemove(id) {
    let _cart = { ...cart };
    if (_cart.items[id]) {
      _cart.totalitems -= _cart.items[id];      
      delete _cart.items[id];      
      setCart(_cart);
      checkCartEmpty(_cart);
    }
  }

  const checkCartEmpty = (_cart) => {
    if (!_cart || !_cart.items || Object.keys(_cart.items).length === 0) {
      navigate('/foodProducts'); 
    }
  };
  

  return (
    <>
      <section className="h-100 gradient-custom">
        <div className="container py-5 my-5">
          <div className="row d-flex justify-content-center my-4">
            {/* Left Column */}
            <div className="col-md-8">
              {/* Cart Items */}
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Cart Item- {prod.length}</h5>
                </div>
                <div className="card-body">
                  {/* Single Item */}
                  {prod.map((item) => (
                    <div className="row my-5">
                      <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                        <div
                          className="bg-image hover-overlay hover-zoom ripple rounded"
                          data-mdb-ripple-color="light">
                          <img
                            src={`upload/${item.PImg}`}
                            className="w-100"
                            alt="Blue Jeans Jacket"
                          />
                          <a href="#!">
                            <div
                              className="mask"
                              style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
                            ></div>
                          </a>
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                        <p>
                          <strong>{item.PName}</strong>
                        </p>
                        <p>{item.PDesc}</p>
                        {/* <p>Size: M</p> */}
                        <button
                          type="button"
                          className="btn btn-primary btn-sm me-1 mb-2"
                          title="Remove item"
                          onClick={() => handleRemove(item._id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                        
                      </div>
                      <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                        <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
                          <button className="btn btn-primary px-2 me-2" onClick={(e)=>{handledec(e,item._id)}}>
                            <i className="fas fa-minus"></i>
                          </button>
                          <div className="form-outline">
                            <input
                              min="0"
                              name="quantity"
                              type="number"
                              className="form-control"
                              id='form1'
                              value={handleQty(item._id)}
                            />
                            <label className="form-label" htmlFor='form1'>Quantity</label>
                          </div>
                          <button className="btn btn-primary px-2 ms-2" onClick={(e)=>{handleinc(e,item._id)}}>
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                        <p className="text-start text-md-center">
                          <strong>&#8377;{item.PPrice}</strong>
                        </p>
                      </div>
                    </div>
                                      // {/* <hr className="my-4" /> */}

                  ))}


                </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products  <span>{totalitems}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                        <p className="mb-0">(including VAT)</p>
                      </div>
                      <span>
                        <strong>&#8377;{totalAmount}</strong>
                      </span>
                    </li>
                  </ul>
                  <button className="btn btn-primary btn-lg btn-block">
                    Go to checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CartPage
