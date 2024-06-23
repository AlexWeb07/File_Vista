import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginSignup.css'; // Import CSS file for animations

const LoginSignup = () => {
  const navigate=useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login API call
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });
        const data = await response.json();
        if(data.login){
          localStorage.setItem("authToken",data.authToken);
          navigate('/dashboard');
          alert(data.msg);
        }
        else{
          alert(data.msg)
        }
    } else {
      // Handle signup API call
        const response = await fetch('http://localhost:3000/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password
          })
        });
        const data = await response.json();
        if(data.login){
          localStorage.setItem("authToken",data.authToken);
          navigate('/dashboard');
          alert(data.msg);
        }
        else{
          alert(data.msg)
        }
    }
  };

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };
  useEffect(()=>{
    if(localStorage.getItem("authToken")){
      navigate('/dashboard')
    }
  },[localStorage.getItem("authToken")])

  return (
    <div className="login-signup-container">
      <div className="bg-[var(--clr1)] rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-[var(--clr4)]">{isLogin?"Login":"Signup"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="username" className="block text-[var(--clr3)] text-sm font-semibold mb-2">Username</label>
              <input
                required
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full bg-transparent border border-[var(--clr2)] rounded-xl text-white py-2 px-3 focus:outline-none focus:border-[var(--clr3)]"
                placeholder="Username"
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-[var(--clr3)] text-sm font-semibold mb-2">Email</label>
            <input
              required
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-[var(--clr2)] rounded-xl text-white py-2 px-3 focus:outline-none focus:border-[var(--clr3)]"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-[var(--clr3)] text-sm font-semibold mb-2">Password</label>
            <input
              required
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full bg-transparent border border-[var(--clr2)] rounded-xl text-white py-2 px-3 focus:outline-none focus:border-[var(--clr3)]"
              placeholder="Password"
            />
          </div>
          <button className="w-full bg-[var(--clr2)] hover:bg-[var(--clr3)] text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 mb-4" type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
        </form>
        <p className="text-gray-600 text-center mb-4">{isLogin ? 'Don\'t have an account?' : 'Already have an account?'} <Link to="#" className="text-[var(--clr3)] font-semibold hover:underline" onClick={handleToggleForm}>{isLogin ? 'Sign Up' : 'Login'}</Link></p>
        <p className="text-gray-500 text-sm text-center">© 2024 FileVista. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LoginSignup;
