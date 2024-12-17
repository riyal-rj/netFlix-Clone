import React, { useState } from 'react'

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        { question: 'What is Netflix?', 
            answer: `Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices.
            You can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. Theres always something new to discover, and new TV shows and movies are added every week!`
        },
        { question: 'How much does Netflix cost?', 
            answer: `Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee.
             Plans range from ₹149 to ₹649 a month. No extra costs, no contracts.` 
        },
        { question: 'Where can I watch?',
         answer: `Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device
                 that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.
                You can also download your favourite shows with the iOS or Android app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.` 
        },
        { question: 'How do I cancel?', 
            answer: `Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. 
            There are no cancellation fees – start or stop your account anytime.`
        },
        { question: 'What can I watch on Netflix?', 
          answer: `Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. 
          Watch as much as you want, anytime you want.` 
        },
        { question: 'Is Netflix good for kids?', 
          answer: `The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and films in their own space.

Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.` },
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-black text-white py-10">
            <h2 className="text-4xl font-bold text-center mb-6">Frequently Asked Questions</h2>
            <div className="max-w-6xl mx-auto px-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-700 mb-2">
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full text-left py-4 px-4 flex justify-between items-center bg-[#232323] hover:bg-[#333333] transition-all"
                        >
                            <span className="text-lg md:text-xl font-medium">{faq.question}</span>
                            <span className="text-2xl">
                                {openIndex === index ? '✕' : '+'}
                            </span>
                        </button>
                        {openIndex === index && (
                            <div className="px-4 py-4 bg-[#333333] text-gray-200">
                                <p className="text-md leading-relaxed">{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQSection;