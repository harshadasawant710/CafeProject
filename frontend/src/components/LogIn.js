import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { data, Link, Navigate, useNavigate } from 'react-router-dom';
import  {contextapi} from '../../src/Contextapi'


const LogIn = () => {
    const navigate = useNavigate()
    const {setLoginname} = useContext(contextapi)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    function handelLogin(e) {
        e.preventDefault()
        const Logindata = { username, password }
        console.log(username, password)

        fetch(" http://localhost:5000/api/Login", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Logindata)
        })
        .then((res) => { return res.json() }).then((data) => {
            console.log(data)
            if (data.status === 200) {
                localStorage.setItem("loginname", data.apiData)
                setLoginname(localStorage.getItem("loginname"))
                if (data.apiData === "Admin") {
                    navigate("/Dashboard")
                }
                else {
                    navigate("/foodProducts")
                }
            }
            else{
                setMessage(data.message)
                toast.error(data.message)
            }
        })
    }

    return (
        <div className='container' style={{marginTop:'100px'}}>
            <div className='row'>
                <div className='col-md-7'></div>
                <div className='col-md-5'>
                    <form onSubmit={(e) => { handelLogin(e) }}>
                        <h3>LogIn Here</h3>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            className="form-control mt-3"
                            placeholder="Username"
                            required
                        />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="form-control mt-3"
                            placeholder="Password"
                            required
                        />
                        <button className='form-control mt-2 btn btn-dark'>LogIn</button>
                        <Link to="/Reg"><button className='btn btn-primary mt-3 form-control'>Register</button></Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LogIn
