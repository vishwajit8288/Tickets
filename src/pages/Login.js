import React, { useState } from 'react';
import { getLogin } from "../services/Api";

const Login = () => {
  const [loginObj, setLoginObj] = useState({ emailId: '', password: '' });
  const [isFormSubmitted, setisFormSubmitted] = useState(false);

  const login = () => {
    try {
      setisFormSubmitted(true);
      if (loginObj.emailId != '' && loginObj.password != '') {
        getLogin(loginObj).then((data) => {
          if (data.result) {
            alert("Login Successfully");
          } else {
            alert('Login failed');
          }
        })
      }

    } catch (error) {
      alert(error.code)
    }

  }

  const changeFormValues = (event, key) => {
    setLoginObj(prevObj => ({ ...prevObj, [key]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <div className='container-fluid mt-3'>
        <div className='row justify-content-center mt-3'>
          <div className='col-lg-4'>
            <div className='card shadow'>
              <div className='card-header bg-primary text-center'>
                <strong className='text-white'>Login</strong>
              </div>
              <div className='card-body'>
                <form onSubmit={handleSubmit}>
                  <div className='mb-3'>
                    <label className='form-label text-start'><strong>Email</strong></label>
                    <input type='text' className='form-control' placeholder='Enter Email' onChange={(event) => changeFormValues(event, 'emailId')} />

                    {
                      isFormSubmitted && loginObj.emailId == '' && <span className='text-danger'>Email is Required</span>
                    }


                  </div>
                  <div className='mb-3'>
                    <label className='form-label text-start'> <strong>Password</strong></label>
                    <input type='password' className='form-control' placeholder='Enter Password' onChange={(event) => changeFormValues(event, 'password')} />

                    {
                      isFormSubmitted && loginObj.password == '' && <span className='text-danger'>Password is Required</span>
                    }
                  </div>

                  <div className='row'>
                    <div className='col-12 text-center'>
                      <button className='btn btn-primary pt-2' type='submit' onClick={login}>Login</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;