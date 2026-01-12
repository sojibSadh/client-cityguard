import { FaUser, FaCalendarAlt } from "react-icons/fa";

const blogs = [
  {
    title: "How Smart City Platforms Improve Citizen Services",
    description:
      "Learn how modern smart city platforms help citizens report issues, track progress, and ensure transparency.",
    author: "Admin Team",
    date: "Jan 10, 2026",
  },
  {
    title: "Why Real-Time Issue Tracking Is Essential",
    description:
      "Real-time tracking allows faster response times and better coordination between city departments.",
    author: "System Analyst",
    date: "Dec 28, 2025",
  },
  {
    title: "Secure Authentication in Government Apps",
    description:
      "Understand how Firebase authentication and role-based access control protect sensitive data.",
    author: "Security Expert",
    date: "Dec 15, 2025",
  },
];

const Blogs = () => {
  return (
    <section className="bg-gradient-to-b from-[#2a160c] to-[#0f172a] py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-500">
            Our Latest Blogs
          </h2>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto text-base">
            Read insights, updates, and expert opinions on smart city platforms
            and digital governance.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="card bg-[#0b1c2d] shadow-xl rounded-2xl hover:shadow-orange-500/20 transition"
            >
              <div className="card-body">
                <h3 className="card-title text-orange-500 text-xl">
                  {blog.title}
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed">
                  {blog.description}
                </p>

                <div className="flex items-center justify-between text-slate-400 text-xs mt-6">
                  <span className="flex items-center gap-2">
                    <FaUser /> {blog.author}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaCalendarAlt /> {blog.date}
                  </span>
                </div>

                <div className="card-actions justify-end mt-6">
                  <button className="btn btn-sm bg-orange-500 hover:bg-orange-600 border-none text-white">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
