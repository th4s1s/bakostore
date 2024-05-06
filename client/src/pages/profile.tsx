/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormErrors {
    name?: string;
    phone?: string;
  }

const UserProfile = () => {
    const [errors, setErrors] = useState<FormErrors>({
        name: '',
        phone: '',
    });

    const navigate = useNavigate();
    const gotUser = localStorage.getItem("user");

    const[isEditMode, setEditMode] = useState(false)
    const[tmpAvt, setTmpAvt] = useState(null)

    // const handleRes = (res : string) => {
    //     if(res.constructor  == String){
    //         const startIndex = res.indexOf('{');
    //         const jsonString = res.substring(startIndex);
    //         res = JSON.parse(jsonString);
    //     }
    //     // return res
    //     localStorage.setItem("user", JSON.stringify(res));
    //     // navigate('/profile');
    //     window.location.reload();
    // }

    const handleImageUpload = (e: { target: { files: any[]; }; }) => {
        const file = e.target.files[0];
        setTmpAvt(file);
        // console.log(file)
    };

    const[tmpName, setTmpName] = useState(null)
    const[tmpPhone, setTmpPhone] = useState(null)

    const handleSave = async () => {
        const newErrors: FormErrors = {};

        if (tmpName && !/^[a-zA-Z0-9 ]+$/.test(tmpName)) {
            newErrors.name = 'Họ và tên chỉ được chứa ký tự chữ, số và dấu cách';
        } else {
            newErrors.name = '';
        }

        if (tmpPhone && !/^0\d{9}$/.test(tmpPhone)) {
            newErrors.phone = 'Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 chữ số';
        } else {
            newErrors.phone = '';
        }

        setErrors(newErrors);
        if(gotUser && Object.values(newErrors).every(error => !error)){
            const info = JSON.parse(gotUser);
            const formData = new FormData();
            formData.append('username', info.username);
            formData.append('token', info.token);
            formData.append('name', !tmpName ? info.name : tmpName);
            formData.append('avatar', info.avatar);
            formData.append('phone', !tmpPhone ? info.phone : tmpPhone);
            formData.append('fileToUpload', tmpAvt? tmpAvt : new File([], ""));

            try {
                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/update_profile.php`, formData, {                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
                // console.log(response)
                // handleRes(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
                window.location.reload();
            } catch (error: any) {
                console.error('Error:', error.response.status);
            }
        }
    }
    if(gotUser){
        const info = JSON.parse(gotUser);
        return (
                isEditMode ? (
                    <><div className="flex h-screen bg-white justify-center place-items-start">
                        <div className="w-6/12 bg-white rounded-lg border border-pink-500 shadow-default py-10 px-16 mt-5">
                            <div className='w-full flex items-end justify-end'>
                                <button className='rounded-lg border-2 p-1 right-0 bg-pink-500 text-white font-bold py-2 px-4' onClick={() => { setEditMode(false); setTmpAvt(null); setTmpName(null); setTmpPhone(null)} }>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="26px" viewBox="0 0 24 24" fill="none">
                                        <path d="M9.65661 17L6.99975 17L6.99975 14M6.10235 14.8974L17.4107 3.58902C18.1918 2.80797 19.4581 2.80797 20.2392 3.58902C21.0202 4.37007 21.0202 5.6364 20.2392 6.41745L8.764 17.8926C8.22794 18.4287 7.95992 18.6967 7.6632 18.9271C7.39965 19.1318 7.11947 19.3142 6.8256 19.4723C6.49475 19.6503 6.14115 19.7868 5.43395 20.0599L3 20.9998L3.78312 18.6501C4.05039 17.8483 4.18403 17.4473 4.3699 17.0729C4.53497 16.7404 4.73054 16.424 4.95409 16.1276C5.20582 15.7939 5.50466 15.4951 6.10235 14.8974Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg> */}
                                    Chỉnh sửa
                                </button>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <label htmlFor="fileToUpload" className="rounded-full border-2 border-pink-300 p-1 right-0">
                                    <img className="object-cover h-40 w-40 rounded-full cursor-pointer transition duration-300 ease-in-out transform hover:scale-110" src={!tmpAvt ? info.avatar : URL.createObjectURL(tmpAvt)} alt="User Avatar" />
                                    <input name="fileToUpload" id="fileToUpload" type="file" accept="image/*" className="hidden" onChange={(e) => {handleImageUpload(e)}} />
                                </label>
                                <h1 className="mt-4 text-3xl font-bold text-gray-800"><input className='text-center border-2 border-pink-300' defaultValue={info.name} onBlur={(e) => {setTmpName(e.target.value)}}/></h1>
                                <p className="text-sm text-gray-600">@{info.username}</p>
                            </div>

                            <div className="mt-8">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-sm font-semibold text-gray-800">Thông tin liên lạc</h2>
                                </div>
                                <p className="text-sm text-gray-600 mt-2">Số điện thoại: <input className='border-2 border-pink-300' defaultValue={info.av} onBlur={(e) => {setTmpPhone(e.target.value)}}/></p>

                            </div>
                            <div className='mt-8 w-full flex items-end justify-end gap-5'>
                                <button
                                className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => { setEditMode(false); setTmpAvt(null); setTmpName(null); setTmpPhone(null)} }
                                >
                                    Hủy
                                </button>
                                <button
                                className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => { setEditMode(false); handleSave(); setTmpAvt(null); setTmpName(null); setTmpPhone(null)} }
                                >
                                    Lưu
                                </button>
                            </div>
                        </div>
                    </div>
                    </>
                ) :
                    <>
                    <div className="flex h-screen bg-white justify-center place-items-start">
                        <div className="w-6/12 bg-white rounded-lg border border-pink-200 shadow-default py-10 px-16 mt-5 box-border">
                            <div className='w-full flex items-end justify-end'>
                                <button className='rounded-lg border-2 p-1 right-0 font-bold py-2 px-4' onClick={() => {setEditMode(true); setTmpAvt(null); setTmpName(null); setTmpPhone(null)}}>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="26px" height="26px" viewBox="0 0 24 24" fill="none">
                                        <path d="M9.65661 17L6.99975 17L6.99975 14M6.10235 14.8974L17.4107 3.58902C18.1918 2.80797 19.4581 2.80797 20.2392 3.58902C21.0202 4.37007 21.0202 5.6364 20.2392 6.41745L8.764 17.8926C8.22794 18.4287 7.95992 18.6967 7.6632 18.9271C7.39965 19.1318 7.11947 19.3142 6.8256 19.4723C6.49475 19.6503 6.14115 19.7868 5.43395 20.0599L3 20.9998L3.78312 18.6501C4.05039 17.8483 4.18403 17.4473 4.3699 17.0729C4.53497 16.7404 4.73054 16.424 4.95409 16.1276C5.20582 15.7939 5.50466 15.4951 6.10235 14.8974Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg> */}
                                    Chỉnh sửa
                                </button>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <img className="object-cover h-40 w-40 rounded-full" src={info.avatar} alt="User Avatar" />
                                <h1 className="text-3xl font-bold text-gray-800 mt-6">{info.name}</h1>

                                {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
                                <p className="text-sm text-gray-600">@{info.username}</p>
                            </div>

                            <div className="mt-8">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-sm font-semibold text-gray-800">Thông tin liên lạc</h2>
                                </div>
                                <p className="text-sm text-gray-600 mt-2">Số điện thoại: {info.phone}</p>
                                {errors.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}
                            </div>
                        </div>
                    </div>
                    </>
        );
    }
    else{
        return
        <>
        </>
    }
};

export default UserProfile;
