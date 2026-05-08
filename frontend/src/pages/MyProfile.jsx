import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";

const MyProfile = ({ backendUrl }) => {
    const { token } = useContext(ShopContext);
    const [userData, setUserData] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(null);

    // 1. የተጠቃሚውን መረጃ ከባክኢንድ መጫን
    const loadUserProfileData = async () => {
        try {
            if (!token) return;

            const response = await axios.get(backendUrl + "/api/user/get-profile", {
                headers: { token },
            });

            if (response.data.success) {
                setUserData(response.data.userData);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Profile data fetch error");
        }
    };

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();

            // name እና phone 'undefined' እንዳይሆኑ ባዶ string ('') መኖሩን አረጋግጥ
            formData.append('name', userData.name || '');
            formData.append('phone', userData.phone || '');
            formData.append('address', JSON.stringify(userData.address || {}));

            if (image) {
                formData.append('image', image);
            }

            const response = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } });

            if (response.data.success) {
                toast.success(response.data.message);
                await loadUserProfileData();
                setIsEdit(false);
                setImage(null);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (token) {
            loadUserProfileData();
        }
    }, [token]);

    if (!userData) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-2">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="text-gray-500 font-medium italic">Loading Profile...</p>
            </div>
        );
    }

    // የማይሰራውን placeholder የሚተካ አስተማማኝ ሊንክ
    const fallbackImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

    return (
        <div className="max-w-lg mx-auto my-10 p-8 bg-white shadow-2xl rounded-3xl border border-gray-100">
            <h2 className="text-3xl font-black text-slate-900 mb-8 border-b pb-4 italic tracking-tighter uppercase">
                My Profile
            </h2>

            {/* Profile Image Section */}
            <div className="flex flex-col items-center gap-4 mb-8">
                {isEdit ? (
                    <label htmlFor="image" className="relative cursor-pointer hover:opacity-80 transition-all">
                        <img
                            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                            src={image ? URL.createObjectURL(image) : userData.image || fallbackImage}
                            alt=""
                        />
                        <input type="file" id="image" hidden onChange={(e) => setImage(e.target.files[0])} />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full text-white">📷</div>
                    </label>
                ) : (
                    <img
                        className="w-32 h-32 rounded-full object-cover border-4 border-slate-100 shadow-md"
                        src={userData.image || fallbackImage}
                        alt=""
                    />
                )}
                <p className="text-sm text-gray-400 font-medium">{userData.email}</p>
            </div>

            <div className="space-y-6">
                <div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Full Name</p>
                    {isEdit ? (
                        <input
                            className="w-full bg-slate-50 border-2 border-slate-200 p-3 rounded-xl focus:border-blue-500 outline-none font-bold"
                            type="text"
                            // 🔴 መፍትሄ፡ '|| ""' መጨመር Uncontrolled input ስህተቱን ያጠፋል
                            value={userData.name || ""}
                            onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
                        />
                    ) : (
                        <p className="text-xl font-bold text-slate-800">{userData.name}</p>
                    )}
                </div>

                <div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Phone Number</p>
                    {isEdit ? (
                        <input
                            className="w-full bg-slate-50 border-2 border-slate-200 p-3 rounded-xl focus:border-blue-500 outline-none font-bold"
                            type="text"
                            // 🔴 መፍትሄ፡ '|| ""' መጨመር
                            value={userData.phone || ""}
                            onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
                        />
                    ) : (
                        <p className="text-lg font-bold text-slate-700">{userData.phone || "Not set"}</p>
                    )}
                </div>
            </div>

            <div className="mt-10 flex gap-4">
                {isEdit ? (
                    <button onClick={updateUserProfileData} className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:bg-blue-700 transition-all active:scale-95">
                        Save Changes
                    </button>
                ) : (
                    <button onClick={() => setIsEdit(true)} className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:bg-slate-800 transition-all active:scale-95">
                        Edit Profile
                    </button>
                )}
            </div>
        </div>
    );
};

export default MyProfile;