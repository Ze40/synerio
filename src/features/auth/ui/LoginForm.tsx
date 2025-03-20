import React from 'react';

interface IProps {
  className?: string;
}

const LoginForm = ({ className }: IProps) => {
  return (
    <form className={`${className}`}>
      <h3 className="">Login</h3>
      <input type="email" placeholder="Email" className="" />
      <input type="password" placeholder="Password" className="" />
      <div className="">
        <input type="radio" id="" name="remember" />
        <label htmlFor="remember">remember me</label>
      </div>
      <button type="button" className="">
        forget password?
      </button>
      <button type="submit" className="">
        LOGIN
      </button>
      <button type="button" className="">
        G
      </button>
      <button type="button" className="">
        Don`t have an account?
      </button>
    </form>
  );
};

export default LoginForm;
