import React from "react";
import { Link } from "react-router-dom";
import { Footer } from "flowbite-react";
import { BsFacebook, BsTwitter, BsInstagram, BsGithub, BsDribbble } from "react-icons/bs";
const Footercomp = () => {
  return (
    <div className="p-4 border-t-2 border-pink-300 rounded-t-3xl">
      <div className="flex flex-col md:flex-row md:justify-between gap-5">
        <div>
          <Link to="/" className="md:text-xl font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Sarath's
            </span>
            Blog
          </Link>
        </div>
        <div className="mt-1 grid grid-cols-2 gap-4 md:flex md:flex-row-reverse md:gap-20 md:mr-5">
          <div className="flex flex-col text-gray-600 md:order-3">
            <p className="pb-2 text-gray-600 md:text-md font-semibold">ABOUT</p>
            <Link to="/" className="my-1">
              My Projects
            </Link>
            <Link to="/" className="my-1">
              Portfolio
            </Link>
          </div>
          <div className="flex flex-col text-gray-600 md:order-2">
            <p className="pb-2 text-gray-600 md:text-md font-semibold">
              FOLLOW US
            </p>
            <Link to="/" className="my-1">
              Github
            </Link>
            <Link to="/" className="my-1">
              Discord
            </Link>
          </div>
          <div className="flex flex-col text-gray-600 md:order-1">
            <p className="pb-2 text-gray-600 md:text-md font-semibold">LEGAL</p>
            <Link to="/" className="my-1">
              Privacy Policy
            </Link>
            <Link to="/" className="my-1">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-2 md:mt-4 flex gap-5 flex-col md:flex-row md:justify-between border-t-2 sm:items-center">
        <div className="mt-2 md:mt-4">
          <Footer.Copyright
            href="#"
            by="Sarath's Blog"
            year={new Date().getFullYear()}
            className="md:text-md font-semibold"
          />
        </div>
        <div className="md:mt-4 flex gap-6 sm:justify-center text-gray-500">
          <Footer.Icon className="" href="" icon={BsFacebook} />
          <Footer.Icon className="" href="" icon={BsInstagram} />
          <Footer.Icon className="" href="" icon={BsTwitter} />
          <Footer.Icon className="" href="" icon={BsGithub} />
          <Footer.Icon className="" href="" icon={BsDribbble} />
        </div>
      </div>
    </div>
  );
};

export default Footercomp;
