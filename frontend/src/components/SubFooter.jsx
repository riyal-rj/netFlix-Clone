import React from 'react'

const SubFooter = () => {
    const links = [
        ['FAQ', 'Investor Relations', 'Privacy', 'Speed Test'],
        ['Help Centre', 'Jobs', 'Cookie Preferences', 'Legal Notices'],
        ['Account', 'Ways to Watch', 'Corporate Information', 'Only on Netflix'],
        ['Media Centre', 'Terms of Use', 'Contact Us']
    ];

    return (
        <footer className="bg-black text-gray-400 py-10">
            <div className="max-w-6xl mx-auto px-4">
                <p className="mb-6">
                    Questions? Call{' '}
                    <a href="tel:000-800-919-1743" className="underline">
                        000-800-919-1743
                    </a>
                </p>

                {/* Links Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                    {links.map((column, index) => (
                        <ul key={index} className="space-y-4">
                            {column.map((link, idx) => (
                                <li key={idx}>
                                    <a href="#" className="hover:underline">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>

                {/* Language Selector */}
                <div className="mb-4">
                    <button
                        className="border border-gray-600 px-4 py-2 bg-black text-white rounded"
                        aria-label="Language Selector"
                    >
                        🌐 English ▼
                    </button>
                </div>

                {/* Footer Region */}
                <p className="text-gray-500 text-sm">Netflix India</p>
            </div>
        </footer>
    );
}

export default SubFooter