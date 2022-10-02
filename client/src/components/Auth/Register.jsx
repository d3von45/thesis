import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

export default function Register() {
    const [data, setData] = useState({
        fullname: '',
        email: '',
        password: '',
        re_password: ''
    });

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.email.length === 0 || data.password.length === 0 || data.fullname.length === 0 || data.re_password.length === 0) {
            return toast("Please fill in all fields.", {
                className: "text-3xl",
                bodyClassName: "text-xl"
            });
        }

        if (data.password.length < 6) {
            return toast("Mật khẩu phải từ 6 kí tự trở lên", {
                className: "text-3xl",
                bodyClassName: "text-xl"
            })
        }

        if (data.password !== data.re_password) {
            return toast("Mật khẩu chưa khớp", {
                className: "text-3xl",
                bodyClassName: "text-xl"
            });
        }

        console.log(data);

        try {
            const rs = await axios.post('/api/auth/register', data);
            localStorage.setItem("_appSinging", true);
            console.log(rs);
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <>
            <div className="h-full">
                <div className="flex flex-col text-lg items-center justify-center w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-6xl">
                    <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
                        Sign in
                    </h1>
                    <form className="w-full mt-6 flex justify-center flex-col items-center">
                        <div className="mb-2 w-full max-w-lg">
                            <input
                                type="email" name='fullname' value={data.fullname} onChange={onChange} placeholder='Họ và tên'
                                className="block w-full px-4 py-3 mt-2 text-black bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div className="mb-2 w-full max-w-lg">
                            <input
                                type="email" name='email' value={data.email} onChange={onChange} placeholder='Email'
                                className="block w-full px-4 py-3 mt-2 text-black bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div className="mb-2 w-full max-w-lg">
                            <input
                                type="password" name='password' value={data.password} onChange={onChange} placeholder="Mật khẩu"
                                className="block w-full px-4 py-3 mt-2 text-black bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div className="mb-2 w-full max-w-lg">
                            <input
                                type="password" name='re_password' value={data.re_password} onChange={onChange} placeholder="Nhập lại mật khẩu"
                                className="block w-full px-4 py-3 mt-2 text-black bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <ToastContainer />
                        <div className="mt-6 w-full max-w-lg">
                            <button
                                onClick={handleSubmit}
                                className=" w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform rounded-md bg-green-600 hover:bg-green-500 focus:outline-none focus:bg-green-500">
                                Đăng ký
                            </button>
                        </div>
                    </form>
                    <div className="w-full max-w-lg relative flex items-center justify-center w-full mt-6 border border-t">
                        <div className="absolute px-5 bg-white">Or</div>
                    </div>
                    <div className="w-full max-w-lg flex mt-4 gap-x-2">
                        <button
                            type="button"
                            className="flex bg-red-500 text-white items-center justify-center w-full  p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                className="w-5 h-5 fill-current"
                            >
                                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                            </svg>
                            <p className="ml-2 font-medium">Đăng nhập với Google</p>
                        </button>
                    </div>

                    <p className="mt-8 font-light text-center text-gray-700">
                        {" "}
                        Bạn đã có tài khoản?{" "}
                        <a href="/" className="font-medium text-purple-600 hover:underline">
                            Đăng nhập
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}
