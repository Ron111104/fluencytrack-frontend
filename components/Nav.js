import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Logo from '@/public/logo.png';
import ArrowDown from '@/public/Arrow.svg';
import { Montserrat } from 'next/font/google';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const montserrat = Montserrat({ weight: '400', subsets: ['latin'] });

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check auth state and update isLoggedIn
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return unsubscribe;
  }, []);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className={`absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-2 bg-white ${montserrat.className} ${isScrolled ? 'shadow-lg' : ''}`}>
      <span className='flex gap-4 items-center'>
        <Link href="/">
          <Image src={Logo} alt='Logo' width={50} height={50} />
        </Link>
        <Link href="/">
          <p className='text-dark font-bold text-2xl md:text-2xl'>CareSync</p>
        </Link>
      </span>
      <span className='hidden md:flex gap-4 items-center'>
        <a onClick={() => handleScroll('home')} className='text-dark p-1 rounded-md cursor-pointer hover:bg-[#3c5fff85]'>
          Home
        </a>
        <a onClick={() => handleScroll('about')} className='text-dark p-1 rounded-md cursor-pointer hover:bg-[#3c5fff85]'>
          About
        </a>
        <a onClick={() => handleScroll('appointment')} className='text-dark p-1 rounded-md cursor-pointer hover:bg-[#3c5fff85]'>
          Contact Us
        </a>
        <a onClick={() => handleScroll('services')} className='text-dark p-1 rounded-md cursor-pointer hover:bg-[#3c5fff85]'>
          Services
        </a>
        <div className='relative'>
          <Image src={ArrowDown} alt='ArrowDown' width={15} height={20} onClick={() => setIsDropdownOpen(!isDropdownOpen)} className='cursor-pointer' />
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className='absolute top-full mt-2 bg-[#133efa85] rounded-md shadow-lg py-2 z-10'
            >
              <a onClick={() => handleScroll('appointment')} className='block px-4 py-2 text-dark cursor-pointer'>
                Book Appointment
              </a>
            </motion.div>
          )}
        </div>
      </span>
      {isLoggedIn ? (
        <button onClick={handleLogout} className='bg-[#3c5fff85] text-black font-medium p-2 rounded-md px-4'>
          Logout
        </button>
      ) : (
        <Link href="/login">
          <button className='bg-[#3c5fff85] text-black font-medium p-2 rounded-md px-4'>
            Login/Register
          </button>
        </Link>
      )}
      <div className='md:hidden flex items-center'>
        <button onClick={() => setIsOpen(!isOpen)} className={`text-dark ${isOpen ? 'z-50' : ''}`}>
          {isOpen ? <FaTimes className='w-6 h-6' /> : <FaBars className='w-6 h-6' />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100vw' }}
            animate={{ x: 0 }}
            exit={{ x: '100vw' }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.8 }}
            className='fixed top-0 right-0 bottom-0 w-full z-40 bg-blue-100'
          >
            <motion.div
              initial={{ x: '100vw' }}
              animate={{ x: isOpen ? 0 : '100vw' }}
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.8 }}
              className='h-full flex flex-col gap-9 py-24 px-20 text-3xl'
            >
              <motion.a
                onClick={() => handleScroll('home')}
                className='text-dark rounded-md cursor-pointer hover:bg-[#3c5fff85]'
              >
                Home
              </motion.a>
              <motion.a
                onClick={() => handleScroll('about')}
                className='text-dark rounded-md cursor-pointer hover:bg-[#3c5fff85]'
              >
                About
              </motion.a>
              <motion.a
                onClick={() => handleScroll('appointment')}
                className='text-dark rounded-md cursor-pointer hover:bg-[#3c5fff85]'
              >
                Contact Us
              </motion.a>
              <motion.a
                onClick={() => handleScroll('services')}
                className='text-dark rounded-md cursor-pointer hover:bg-[#3c5fff85]'
              >
                Services
              </motion.a>
              {isLoggedIn ? (
                <button onClick={handleLogout} className='bg-[#3c5fff85] text-black font-medium p-2 rounded-md px-4'>
                  Logout
                </button>
              ) : (
                <Link href="/login">
                  <button className='bg-[#3c5fff85] text-black font-medium p-2 rounded-md px-4'>
                    Login/Register
                  </button>
                </Link>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isScrolled && (
        <button
          onClick={() => handleScroll('home')}
          className='fixed bottom-4 right-4 bg-[#3c5fff85] text-black font-medium p-2 rounded-full shadow-lg z-10'
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default Nav;
