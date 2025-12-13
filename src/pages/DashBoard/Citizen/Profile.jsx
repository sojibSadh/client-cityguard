import React, { useState } from "react";
import { toast } from "react-toastify";
import { Bars } from "react-loader-spinner";
import useAxiosS from "../../../hooks/useAxiousS";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query"; // useQuery import করা হয়েছে
import { FaCrown } from "react-icons/fa"; // প্রিমিয়াম ব্যাজের জন্য আইকন

const Profile = () => {
    const { user, updateUserProfile } = useAuth();
    const axiosS = useAxiosS();

    const [name, setName] = useState(user?.displayName || "");
    const [photo, setPhoto] = useState(user?.photoURL || "");
    const [loading, setLoading] = useState(false);
    const [subscribeLoading, setSubscribeLoading] = useState(false); // সাবস্ক্রিপশন লোডিং স্টেট

    // --- [নতুন: ইউজারের সাবস্ক্রিপশন স্ট্যাটাস ফেচ করা] ---
    const { data: userStatus = {}, isLoading: statusLoading, refetch } = useQuery({
        queryKey: ['userStatusProfile', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosS.get(`/users/status/${user.email}`);
            return res.data; // { issueCount: 0, subscript: false, isBlocked: false }
        }
    });

    const { subscript, isBlocked } = userStatus;

    const handleSubscribe = async () => {
        if (subscript) return; // Already premium

        setSubscribeLoading(true);
        try {
            const paymentInfo = {
                email: user.email,
                amount: 1000,
                // transactionId: 'TXN_' + Date.now()
                // 4242 4242 4242 4242
            };
            const res = await axiosS.post('/create-payment-sub', paymentInfo);
            console.log(res);
            if (res.data.url) {
                toast.success("Subscription Successful! You are now a Premium User.");
                window.location.href = res.data.url;
            } else {
                toast.error(res.data.message || "Payment Failed.");
            }
        } catch (error) {
            toast.error("An error occurred during subscription.");
            console.error(error);
        } finally {
            setSubscribeLoading(false);
        }
    }

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
            <h2 className="title mb-6 text-center">My Profile</h2>

            {/* --- [ব্লক সতর্কবার্তা] --- */}
            {isBlocked && (
                <div className="alert alert-error mb-6">
                    <span className="font-bold">🛑 Account Blocked!</span>
                    <p>Your account has been blocked by the Admin. You may be restricted from reporting new issues.</p>
                </div>
            )}
            {/* --- [ব্লক সতর্কবার্তা] --- */}

            <div className="bg-white dark:bg-[#1e2939] border-orange-800 border shadow-md rounded-2xl p-8 md:flex flex-col md:flex-row items-center gap-8">

                {/* User Photo + Premium Status */}
                <div className="w-48 h-48 rounded-full mx-auto overflow-hidden border-4 border-green-200 relative">
                    <img
                        src={user?.photoURL || "https://via.placeholder.com/150"}
                        alt={user?.displayName}
                        className="w-full h-full object-cover"
                    />
                    {/* --- [প্রিমিয়াম ব্যাজ] --- */}
                    {subscript && (
                        <div className="absolute bottom-0 right-0 p-2 bg-yellow-500 rounded-full text-white shadow-lg tooltip tooltip-top" data-tip="Premium User">
                            <FaCrown className="w-6 h-6" />
                        </div>
                    )}
                    {/* --- [প্রিমিয়াম ব্যাজ] --- */}
                </div>

                {/* Info + Form */}
                <form onSubmit={handleUpdate} className="profile md:flex-1 space-y-4">
                    {/* ... (Name, Photo URL, Email ইনপুট ফিল্ডস আপনার আগের মতোই থাকবে) ... */}

                    <div>
                        <label className="block font-medium mb-1">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-blue-800 rounded-lg p-3"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Photo URL</label>
                        <input
                            type="text"
                            value={photo}
                            onChange={(e) => setPhoto(e.target.value)}
                            className="w-full border border-blue-800 rounded-lg p-3"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Email</label>
                        <input
                            type="email"
                            value={user?.email}
                            readOnly
                            className="w-full border border-blue-800 rounded-lg p-3 bg-gray-200 cursor-not-allowed"
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
                            "Update Profile"
                        )}
                    </button>

                    {/* --- [সাবস্ক্রাইব বাটন] --- */}
                    {!subscript && (
                        <button
                            type="button"
                            onClick={handleSubscribe}
                            disabled={subscribeLoading}
                            className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors mt-4"
                        >
                            {subscribeLoading ? (
                                <div className="flex items-center justify-center gap-2">
                                    Processing Payment<Bars height="20" width="20" />
                                </div>
                            ) : (
                                "Subscribe Now (৳1000)"
                            )}
                        </button>
                    )}
                    {/* --- [সাবস্ক্রাইব বাটন] --- */}

                </form>
            </div>
        </div>
    );
};

export default Profile;