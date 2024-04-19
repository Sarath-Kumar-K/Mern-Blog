import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Alert, Spinner } from "flowbite-react";

const Signup = () => {
  const [formaData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleOnchange = (e) => {
    setFormData({ ...formaData, [e.target.id]: e.target.value.trim() });
    console.log(formaData);
  };
  const handleSubmit = async (e) => {
    setErrorMessage(null);
    e.preventDefault();
    if (!formaData.username || !formaData.email || !formaData.password) {
      return setErrorMessage("Please fill out all the details");
    }
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formaData),
      });
      const data = await res.json();
      if (data.success === false) {
        setFormData(false);
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/signin');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex gap-5 flex-col md:flex-row md:h-[87vh] min-max-screen overflow-hidde">
      {/* left side */}
      <div className="md:w-1/2  md:h-full flex justify-start md:justify-end md:items-center ml-8 mt-8">
        <div className="flex gap-4 md:gap-8 flex-col">
          <Link to="/" className="text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Sarath's
            </span>
            Blog
          </Link>
          <p className="text-xs md:text-sm">
            This is a demo project. You can sign up with your email <br /> and
            password or with Google.
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="lg:w-1/2 h-full flex justify-start items-center">
        <form action="" className="ml-8" onSubmit={handleSubmit}>
          <label className="block font-semibold">Your username</label>
          <input
            className="rounded-md p-1 lg:p-2 w-72 lg:w-96 lg:mb-5 mb-2"
            placeholder="username"
            type="text"
            id="username"
            onChange={handleOnchange}
          />
          <label className="block font-semibold">Your email</label>
          <input
            className="rounded-md p-1 lg:p-2 w-72 lg:w-96 lg:mb-5 mb-2"
            placeholder="name@company.com"
            type="email"
            id="email"
            onChange={handleOnchange}
          />
          <label className="block font-semibold">Your password</label>
          <input
            className="rounded-md p-1 lg:p-2 w-72 lg:w-96 lg:mb-5 mb-6"
            placeholder="password"
            type="password"
            id="password"
            onChange={handleOnchange}
          />
          <button
            className="cursor-pointer block rounded-md p-1 lg:p-2 w-72 lg:w-96 lg:mb-5 mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold"
            type="submit"
            id="submit"
            disabled={loading}
          >
            {loading ? (
              <>
              <Spinner size='sm'/>
              <span className="pl-3">loading...</span></>
            ):'Sign Up'}
          </button>
          <button className="flex items-center justify-center rounded-md p-1 lg:p-2 w-72 lg:w-96 lg:mb-5 mb-2 border-2 border-black font-semibold">
            <span className="text-lg mr-2">
              <FcGoogle size={24} />
            </span>
            Continue with Google
          </button>
          <p className="mt-5">
            Have an account?{" "}
            <Link to="/signin" className="text-blue-500 pr-4">
              Sign in
            </Link>
          </p>
          {errorMessage && (
            <Alert className="mt-5 w-72 lg:w-96" color="failure">
              {errorMessage}
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
