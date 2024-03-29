import React from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  return (
    <div className="flex gap-5 lg:gap-5 flex-col lg:flex-row lg:h-[87vh] w-screen overflow-hidde ">

      {/* left side */}
      <div className="lg:w-1/2  lg:h-full flex justify-start lg:justify-end lg:items-center ml-8 mt-8">
        <div className="flex gap-4 lg:gap-8 flex-col">
          <Link
            to="/"
            className="text-4xl font-bold dark:text-white"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Sarath's
            </span>
            Blog
          </Link>
          <p className="text-xs lg:text-sm">
            This is a demo project. You can sign up with your email <br /> and
            password or with Google.
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="lg:w-1/2 h-full flex justify-start items-center">
        <form action="" className="ml-8">
          <label className="block font-semibold">Your username</label>
          <input className="rounded-md p-1 lg:p-2 w-72 lg:w-96 lg:mb-5 mb-2" placeholder="username" type="text" />
          <label className="block font-semibold">Your email</label>
          <input
            className="rounded-md p-1 lg:p-2 w-72 lg:w-96 lg:mb-5 mb-2"
            placeholder="name@company.com"
            type="email"
          />
          <label className="block font-semibold">Your password</label>
          <input className="rounded-md p-1 lg:p-2 w-72 lg:w-96 lg:mb-5 mb-6" placeholder="password" type="password" />
          <input
            className="cursor-pointer block rounded-md p-1 lg:p-2 w-72 lg:w-96 lg:mb-5 mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold"
            type="submit"
            value="Sign Up"
          />
          <button className="flex items-center justify-center rounded-md p-1 lg:p-2 w-72 lg:w-96 lg:mb-5 mb-2 border-2 border-black font-semibold">
            <span className="text-lg mr-2">
              <FcGoogle size={24} />
            </span>
            Continue with Google
          </button>
          <p className="mt-5">Have an account? <Link to='/signin' className="text-blue-500 pr-4">Sign in</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
