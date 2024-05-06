/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface FormErrors {
    username?: string;
    password?: string;
    name?: string;
    phone?: string;
  }
  

function Login() {
    const { login } = useAuth();
    const [isSignIn, setIsSignIn] = useState(true);
    const navigate = useNavigate();
    const [errors, setErrors] = useState<FormErrors>({
        username: '',
        password: '',
        name: '',
        phone: '',
    });



    const handleSignIn = () => {
        const newErrors: { username: string; password: string; name: string; phone: string; } = {
            username: '',
            password: '',
            name: '',
            phone: ''
        };
        setErrors(newErrors);
        setIsSignIn(true);
    };

    const handleSignUp = () => {
        const newErrors: { username: string; password: string; name: string; phone: string; } = {
            username: '',
            password: '',
            name: '',
            phone: '',
        };
        setErrors(newErrors);
        setIsSignIn(false);
    };

    const handleSubmit = async (e: {[x: string]: any; preventDefault: () => void; }) => {
        e.preventDefault();

        if(!isSignIn){
            const newErrors: FormErrors = {}; 

            if (e.target.username.value.length < 8 || e.target.username.value.length > 25) {
                newErrors.username = 'Tên đăng ký phải có độ dài từ 8 đến 25 ký tự';
            } else if (!/^[a-zA-Z0-9]+$/.test(e.target.username.value)) {
                newErrors.username = 'Tên đăng ký chỉ được chứa ký tự chữ và số';
            } else {
                newErrors.username = '';
            }

            if (e.target.password.value.length < 8 || e.target.password.value.length > 25) {
                newErrors.password = 'Mật khẩu phải có độ dài từ 8 đến 25 ký tự';
            } else if (!/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(e.target.password.value)) {
                newErrors.password = 'Mật khẩu phải có ít nhất 1 ký tự viết hoa, 1 chữ số, và 1 ký tự đặc biệt';
            } else {
                newErrors.password = '';
            }

            if(!e.target.name.value){
                newErrors.name = 'Vui lòng nhập tên';
            } else if (!/^[a-zA-Z0-9 ]+$/.test(e.target.name.value)) {
                newErrors.name = 'Họ và tên chỉ được chứa ký tự chữ, số và dấu cách';
            } else {
                newErrors.name = '';
            }

            if(!e.target.phone.value){
                newErrors.phone = 'Vui lòng nhập số điện thoại';
            } else if (!/^0\d{9}$/.test(e.target.phone.value)) {
                newErrors.phone = 'Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 chữ số';
            } else {
                newErrors.phone = '';
            }
            // setErrors(newErrors);

            if (Object.values(newErrors).every(error => !error)) {
                const formData = new URLSearchParams({
                    username: e.target.username.value,
                    password: e.target.password.value,
                    name: e.target.name.value,
                    phone: e.target.phone.value
                });

                try {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/register.php`, formData, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });
                } catch (error) {
                    // console.error('Error:', error.response.status);
                    if((error as any).response.status == 409){
                        newErrors.username = 'Tên đăng ký đã tồn tại';
                    }
                }
            }
            setErrors(newErrors);
        }
        else{
            const newErrors: FormErrors = {}; 
            if(!e.target.username.value){
                newErrors.username = 'Vui lòng nhập tên đăng nhập';
            }
            if(!e.target.password.value){
                newErrors.password = 'Vui lòng nhập mật khẩu';
            }

            if (Object.values(newErrors).every(error => !error)) {
                const formData = new URLSearchParams({
                    username: e.target.username.value,
                    password: e.target.password.value,
                });
                try {
                    //localhost
                    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/login.php`, formData, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });
                    // console.log(response.data)
                    login(response.data); 
                    navigate('/shop'); 
                } catch (error) {
                    console.error('Error:', error);
                    if((error as any).response.status == 404 || (error as any).response.status == 400){
                        newErrors.username = 'Tài khoản không tồn tại hoặc sai mật khẩu';
                    }
                }
            }
            setErrors(newErrors);
        }


    };

    const SignInForm = () =>{
        return (
            <>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Tên đăng nhập
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            // value={username}
                            // onChange={(e) => setUsername(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                    </div>
                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Đăng nhập
                    </button>
                </form>
            </>
        );
    }
    const SignUpForm = () =>{
        return (
            <>
                <form onSubmit={handleSubmit} className='z-5'>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Tên đăng ký
                        </label>
                        <input
                            type="text"
                            id="username"
                            name='username'
                            // value={username}
                            // onChange={(e) => setUsername(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            id="password"
                            name='password'
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Họ và Tên
                        </label>
                        <input
                            type="text"
                            id="name"
                            name='name'
                            // value={name}
                            // onChange={(e) => setName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                            Số điện thoại
                        </label>
                        <input
                            type="text"
                            id="phone"
                            name='phone'
                            // value={phone}
                            // onChange={(e) => setPhone(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}
                    </div>
                    <button
                        type="submit"
                        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Đăng ký
                    </button>
                </form>
            </>
        );
    }

    return (
    <>
      <div className="relative overflow-hidden">
    <div className="relative after:content-[''] after:absolute after:h-32 after:w-32 after:bg-indigo-600/5 after:top-16 after:left-10 after:-z-1 after:rounded-3xl after:animate-[spin_10s_linear_infinite]"></div>
    <div className="relative after:content-[''] after:absolute after:h-32 after:w-32 after:bg-indigo-600/5 after:top-10 after:right-12 after:-z-1 after:rounded-3xl after:animate-[spin_10s_linear_infinite]"></div>
    <div className="relative after:content-[''] after:absolute after:h-32 after:w-32 after:bg-indigo-600/5 after:top-80 after:right-52 after:-z-1 after:rounded-3xl after:animate-[spin_10s_linear_infinite]"></div>
        <div className="h-screen flex bg-white mt-20 justify-center place-items-start">
            <div className='w-96'>
                <div className='flex place-self-stretch mb-0'>
                    <button className={`w-6/12 p-2 z-10 border bg-${isSignIn ? 'pink-500' : 'white'} text-${isSignIn ? 'white' : 'pink-600'} hover:bg-${isSignIn ? 'pink-600' : 'pink-600'} hover:text-${isSignIn ? 'white' : 'white'}`} onClick={handleSignIn}>
                        Đăng nhập
                    </button>
                    <button className={`w-6/12 p-2  z-10 border bg-${!isSignIn ? 'pink-500' : 'white'} text-${!isSignIn ? 'white' : 'pink-600'} hover:bg-${!isSignIn ? 'pink-600' : 'pink-600'} hover:text-${!isSignIn ? 'white' : 'white'}`} onClick={handleSignUp}>
                        Đăng ký
                    </button>
                </div>
                <div className="w-full p-4 bg-pink-200 shadow-md mt-0">
                    {isSignIn? (
                        <SignInForm />
                    ) : (
                        <SignUpForm />
                    )}
                </div>
            </div>
        </div>
        <div className="relative after:content-[''] after:absolute after:h-32 after:w-32 after:bg-indigo-600/5 after:bottom-32 after:left-96 after:-z-1 after:rounded-3xl after:animate-[spin_10s_linear_infinite]"></div>
        </div>
    </>
    );
  }


export default Login;
