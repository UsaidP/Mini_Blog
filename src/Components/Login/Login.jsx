import { useState } from "react";
import { authService } from "../../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Logo } from "../index";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../../store/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm("");
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.massage);
    }
  };
  return (
    <div className='flex items-center justify-center w-full'>
      <div
        className={`mx-auto w-auto  max-w-lg bg-gray-100 round p-10 border border-black/10`}
      >
        <div className='mb-2 flex justify-center '>
          <span className='inline-block w-full max-w-[100px]'>
            <Logo width='100%' />
          </span>
        </div>
        <h2 className='text-center text-2xl font-bold leading-tight '>
          Sign in to your account
        </h2>
        <p className='mt-2 text-center text-base text-black/60'>
          Don&apos;t have an account?&nbsp;
          <Link
            to='/signup'
            className='font-medium text-primary transition-all duration-200 hover:underline'
          >
            Sign Up
          </Link>
        </p>
        {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
        <form className='mt-8' onSubmit={handleSubmit(login)}>
          <div className='space-y-5'>
            <Input
              label='Email: '
              placeholder='Enter Your Email'
              type='email'
              {...register("email", {
                require: true,
                validate: {
                  matchPattern: (value) =>
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
                      value
                    ) || "Email address must be valid address",
                },
              })}
            />
            <Input
              label='Password: '
              type='password'
              placeholder='Enter Your Password'
              {...register("password", {
                register: true,
              })}
            />
            <Button className='w-full' type='submit'>
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
