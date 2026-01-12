import { Link } from "react-router";

const CallToAction = () => {
    return (
        <section className="bg-gradient-to-b from-[#2a160c] to-[#0f172a] py-20">
            <div className="max-w-6xl mx-auto px-4">
                <div className="card bg-[#0b1c2d] rounded-2xl shadow-2xl">
                    <div className="card-body text-center py-14">
                        <h2 className="text-3xl md:text-4xl font-bold text-orange-500">
                            Ready to Build a Smarter City?
                        </h2>
                        <p className="mt-4 text-slate-300 max-w-2xl mx-auto text-base">
                            Join our smart city platform today and start reporting issues,
                            tracking progress, and making your city better—together.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/register" className="btn bg-orange-500 hover:bg-orange-600 border-none text-white px-10">
                                Get Started
                            </Link>
                            <Link to="/contact" className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-10">
                                Contact Us
                            </Link>
                        </div>

                        <p className="mt-6 text-xs text-slate-400">
                            Trusted by citizens, staff, and administrators for faster city
                            solutions.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { CallToAction };