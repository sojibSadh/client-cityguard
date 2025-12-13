import React, { useState } from "react";
import { toast } from "react-toastify";
import { Bars } from "react-loader-spinner";
import useAxiosS from "../../../hooks/useAxiousS";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const AdminProfile = () => {
    const { user, updateUserProfile } = useAuth();
    const axiosS = useAxiosS();
    const [name, setName] = useState(user?.displayName || "");
    const [photo, setPhoto] = useState(user?.photoURL || "");
    const [loading, setLoading] = useState(false);
    const [subscribeLoading, setSubscribeLoading] = useState(false);
    const { data: userStatus = {}, isLoading: statusLoading, refetch } = useQuery({
        queryKey: ['userStatusProfile', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosS.get(`/users/status/${user.email}`);
            return res.data;
        }
    });

    const handleUpdate = (e) => {
        e.preventDefault();
        setLoading(true);

        updateUserProfile(name, photo)
            .then(() => {
                toast.success("Profile updated successfully 🌱");
            })
            .catch((err) => toast.error(err.message))
            .finally(() => setLoading(false));
    };

    if (statusLoading) {
        return <div className="max-w-3xl mx-auto px-4 py-16 text-center">Loading Profile...</div>;
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-16">
            <h2 className="title mb-6 text-center">Welcome To Your Profile  </h2>

            <div className="bg-[#151515] dark:bg-[#1e2939]  shadow-xl shadow-orange-900 rounded-2xl p-8 md:flex flex-col md:flex-row items-center gap-8">

                {/* Info + Form */}
                <form onSubmit={handleUpdate} className="profile md:flex-1 space-y-4">
                    {/* ... (Name, Photo URL, Email ইনপুট ফিল্ডস আপনার আগের মতোই থাকবে) ... */}
                    {/* User Photo + Premium Status */}
                    <div className="w-48 h-48 rounded-full mx-auto overflow-hidden border-2 border-orange-600 relative">
                        <img
                            src={user?.photoURL || "https://via.placeholder.com/150"}
                            alt={user?.displayName}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <label className="block  font-medium mb-1 text-orange-500 ">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-primary hover:border-orange-600 outline-0 rounded-lg p-3"
                        />
                    </div>

                    <div>
                        <label className="block  font-medium mb-1 text-orange-500 ">Photo URL</label>
                        <input
                            type="text"
                            value={photo}
                            onChange={(e) => setPhoto(e.target.value)}
                            className="w-full border border-primary hover:border-orange-600 outline-0 rounded-lg p-3"
                        />
                    </div>

                    <div>
                        <label className="block  font-medium mb-1 text-orange-500 ">Email</label>
                        <input
                            type="email"
                            value={user?.email}
                            readOnly
                           className="w-full border border-primary hover:border-orange-600 outline-0 rounded-lg p-3 cursor-not-allowed"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary text-white py-3 rounded-lg hover:text-blue-500"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-2">
                                Updating<Bars height="20" width="20" />
                            </div>
                        ) : (
                            <span className=" btn-cusPrimary inline-block w-[30%] py-3 text-[18px] rounded-full "> Update Profile </span>

                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminProfile;