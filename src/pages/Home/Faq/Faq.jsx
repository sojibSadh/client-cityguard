import { FaUser, FaCalendarAlt } from "react-icons/fa";

const faqs = [
    {
        question: "What is this Smart City Issue Management Platform?",
        answer:
            "It is a digital platform that allows citizens to report city issues, track progress in real-time, and communicate transparently with authorities.",
    },
    {
        question: "How can I track my reported issues?",
        answer:
            "After submitting an issue, you can track its status through your dashboard with live updates and detailed timelines.",
    },
    {
        question: "Is my personal data secure?",
        answer:
            "Yes. We use secure authentication and role-based access control to ensure your personal information remains protected.",
    },
    {
        question: "Can I prioritize urgent issues?",
        answer:
            "Yes. With our Priority Boost System, you can highlight critical issues to get faster attention and resolution.",
    },
];

const FAQ = () => {
    return (
        <section className="bg-gradient-to-b from-[#24140b] to-[#0f172a] py-20">
            <div className="max-w-5xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-bold text-orange-500">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
                        Find quick answers to common questions about our platform and
                        services.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="collapse collapse-arrow bg-[#0b1c2d] rounded-2xl shadow-lg"
                        >
                            <input type="checkbox" />
                            <div className="collapse-title text-orange-500 font-semibold text-lg">
                                {faq.question}
                            </div>
                            <div className="collapse-content text-slate-300 text-sm leading-relaxed">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export { FAQ };
