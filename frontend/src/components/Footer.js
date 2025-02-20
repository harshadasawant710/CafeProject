import React from 'react'

const Footer = () => {
  return (
    <>
    
   <div className="container py-4">
   <hr className="bg-secondary" />

      <div className="row">
        {/* Column 1: About */}
        <div className="col-md-4 mb-3">
          <h5>About Us</h5>
          <p>We provide high-quality services to help your business grow.</p>
        </div>

        {/* Column 2: Links */}
        <div className="col-md-4 mb-3">
          <h5>Quick Links</h5>
          <ul className="list-unstyled">
            <li>
              <a href="/about" className="text-white text-decoration-none">
                About Us
              </a>
            </li>
            <li>
              <a href="/services" className="text-white text-decoration-none">
                Services
              </a>
            </li>
            <li>
              <a href="/contact" className="text-white text-decoration-none">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Social Icons */}
        <div className="col-md-4 text-center">
          <h5>Follow Us</h5>
          <a href="#" className="text-white mx-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
              alt="Facebook"
              width="24"
            />
          </a>
          <a href="#" className="text-white mx-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
              alt="Twitter"
              width="24"
            />
          </a>
          <a href="#" className="text-white mx-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/733/733558.png"
              alt="Instagram"
              width="24"
            />
          </a>
        </div>
      </div>

      <hr className="bg-secondary" />
      <div className="text-center">
        <p className="mb-0">
          &copy; <span>2025</span> MyWebsite. All rights reserved.
        </p>
      </div>
    </div>
    </>
  )
}

export default Footer
