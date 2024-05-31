// import React from 'react'

function Header() {
  return (
    <div className="bg-gradient-to-tr from-sky-200 to-blue-600 p-6 flex flex-col min-h-screen ">
      <div className="flex justify-between">
        <button className="bg-blue-600 p-3 hover:shadow-md rounded-xl text-green-200 font-extrabold">
          _markeDone
        </button>
        <div className="flex gap-4">
          <button className="bg-green-500 px-6 p-3 rounded-3xl hover:shadow-xl font-bold text-gray-800">
            _login
          </button>
          <button className="bg-green-500 px-6 p-3 rounded-3xl hover:shadow-xl font-bold text-gray-800">
            _signup
          </button>
        </div>
      </div>
      <div className=" grid place-content-center flex-grow text-center">
        <div className="text-[8rem] font-light text-white leading-none">
          organize without the overwhelm.
        </div>
        <p className="text-white pt-10 font-normal text-xl">
          getting organized doesn’t have to be stressful.
        </p>
        <p className="text-white pt-2 font-normal text-lg">
          plan peacefully with{" "}
          <span className="font-extrabold text-green-200">_markeDone</span>.
        </p>
        <div className="pt-10">
          <button className="bg-green-500 p-3 w-max hover:shadow-md rounded-xl font-extrabold text-gray-800">
            _take control{" > "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
