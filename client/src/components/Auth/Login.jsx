import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';

export default function Login() {
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    console.log(process.env.REACT_G_CLIENT_ID);
    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.email.length === 0 || data.password.length === 0) {
            return toast("Please fill in all fields.", {
                className: "text-3xl",
                bodyClassName: "text-xl"
            });
        }

        try {
            const rs = await axios.post('/api/auth/signin', data);
            localStorage.setItem("_appSinging", true);
            console.log(rs);
        } catch (err) {
            console.log(err.message);
        }
    }

    const googleFailure = async (res) => {
        console.log(res);
    }
    const googleSuccess = async (res) => {
        try {
            const token = res?.tokenId;
            await axios.post('/api/auth/test', { token: token, abc: "ada", res: res });
        } catch (error) {
            alert("error success");
        }

    }

    return (
        <>
            <div className="h-full">
                <div className="flex flex-col text-lg items-center justify-center w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-4xl">
                    <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
                        Sign in
                    </h1>
                    <form className="w-full mt-6 flex justify-center flex-col items-center">
                        <div className="mb-2 w-full max-w-md">
                            <label
                                for="email"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Email
                            </label>
                            <input
                                type="email" name='email' value={data.email} onChange={onChange}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div className="mb-2 w-full max-w-md">
                            <label
                                for="password"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Password
                            </label>
                            <input
                                type="password" name='password' value={data.password} onChange={onChange}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <ToastContainer />
                        <a
                            href="/"
                            className="text-xs text-purple-600 hover:underline"
                        >
                            Forget Password?
                        </a>
                        <div className="mt-6 w-full max-w-md">
                            <button
                                onClick={handleSubmit}
                                className=" w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform rounded-md bg-green-600 hover:bg-green-500 focus:outline-none focus:bg-green-500">
                                Login
                            </button>
                        </div>
                    </form>
                    <div className="w-full max-w-md relative flex items-center justify-center w-full mt-6 border border-t">
                        <div className="absolute px-5 bg-white">Or</div>
                    </div>
                    <div className="w-full max-w-md flex mt-4 gap-x-2">
                        <button
                            type="button"
                            className="flex bg-red-500 text-white items-center justify-center w-full  p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
                        >
                            <GoogleLogin
                                clientId="556026924314-2s78fv3ku34rgoec9123lhm3mh3bt1kr.apps.googleusercontent.com"
                                render={(renderProps) => (
                                    <button onClick={renderProps.onClick}>Sign with Google</button>
                                )}
                                cookiePolicy={"single_host_origin"}
                                onSuccess={googleSuccess}
                                onFailure={googleFailure}
                            />
                            {/* <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                className="w-5 h-5 fill-current"
                            >
                                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                            </svg>
                            <p className="ml-2 font-medium">Login with Google</p> */}
                        </button>
                    </div>

                    <p className="mt-8 font-light text-center text-gray-700">
                        {" "}
                        Don't have an account?{" "}
                        <a href="/" className="font-medium text-purple-600 hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}
