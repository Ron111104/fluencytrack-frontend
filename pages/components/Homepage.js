import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import homeImage from '../../public/home.png'; 
import Link from 'next/link';

const Homepage = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-lightPurple mt-8">
      {/* Main container holding text and image */}
      <div className="lg:flex lg:flex-row lg:w-full w-full justify-center relative px-8 lg:px-20 py-16 lg:py-24 my-20">
        {/* Left Side: Text Content */}
        <div className="lg:w-1/2 w-full flex flex-col justify-center">
          {/* Overlay div */}
          <div className="absolute inset-0 bg-purple-900 bg-opacity-60"></div>

          {/* Content within overlay */}
          <div className="relative z-10 text-blue-900 space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Speech therapy - Connect. Evaluate. Thrive.
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-2xl font-semibold text-blue-700">
              Transforming Lives
            </h2>
            <p className="text-base sm:text-lg lg:text-lg text-blue-800">
              Bettering your speech, one step at a time
            </p>
            <p className="text-sm lg:text-base text-blue-800">
              A platform facilitating seamless connections, improving therapy outcomes, and ensuring quality care through effective communication and evaluation.
            </p>

            {/* Book Appointment Button */}
            <Link href="/appointment">
              <motion.div
                className="mt-6 lg:absolute lg:left-0"  // Stick to the left
                initial={{ x: -400, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}  // Re-trigger on scroll
                transition={{ duration: 0.8 }}
                viewport={{ once: false }}  // Allow repeated animation on scroll
              >
                <div className="flex items-center space-x-4 bg-white p-4 rounded-r-full shadow-lg left-0">
                  <span className="text-lg font-bold text-black">
                    BOOK YOUR APPOINTMENT NOW
                  </span>
                  <div className="bg-blue-700 text-white p-3 rounded-full">
                    <FaArrowRight />
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Right Side: Image (next to the text) */}
        <div className="hidden lg:flex lg:w-1/2 w-full justify-center items-center mt-10 lg:mt-0">
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}  // Re-trigger on scroll
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}  // Allow repeated animation on scroll
          >
            <Image
              src={homeImage}
              alt="Speech Therapy Illustration"
              width={400}  // Updated size
              height={500}
              objectFit="contain"
              className="z-10"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
