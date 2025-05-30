import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import logo from '../../../assets/logo.png';

const Footer = () => {
    return (
        <footer className="bg-redd/5  p-10">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-10 md:gap-80 text-center sm:text-left">
                {/* Logo & Brand */}
                <aside className="flex flex-col items-center sm:items-start gap-2">
                    <img src={logo} alt="Logo" className="h-12" />
                    <h2 className="text-xl font-bold text-black">O+ or O-</h2>
                    <p className="text-sm text-black">Donate blood, save lives</p>
                </aside>

                {/* Social Links */}
                <nav className="flex flex-col items-center sm:items-start gap-2">
                    <h6 className="text-black text-xl font-bold">Social</h6>
                    <div className="flex gap-6 text-xl">
                        <a href="#" className="text-blue-900 transition-colors">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="text-pink-700 transition-colors">
                            <FaInstagram />
                        </a>
                        <a href="#" className="text-sky-400 transition-colors">
                            <FaTwitter />
                        </a>
                    </div>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
