import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const About = () => {
  const [therapistCount, setTherapistCount] = useState(0);
  const [supervisorCount, setSupervisorCount] = useState(0);

  // Animating the numbers
  useEffect(() => {
    let therapistInterval;
    let supervisorInterval;

    // Therapist count
    therapistInterval = setInterval(() => {
      setTherapistCount((prev) => (prev < 55 ? prev + 1 : 55));
    }, 50);

    // Supervisor count
    supervisorInterval = setInterval(() => {
      setSupervisorCount((prev) => (prev < 25 ? prev + 1 : 25));
    }, 100);

    return () => {
      clearInterval(therapistInterval);
      clearInterval(supervisorInterval);
    };
  }, []);

  return (
    <div className="bg-white lg:mt-16 lg:py-12">
      <div className="bg-blue-100 py-12 px-6 lg:px-20 lg:mx-10 rounded-3xl">
        {/* Main Container */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
          {/* Left Side Text */}
          <div className="space-y-6">
            <h1 className="text-purple-700 text-3xl lg:text-4xl font-bold">
              Understanding Parkinson's Disease
            </h1>

            {/* Bullet Points for Background */}
            <div className="text-black text-base lg:text-lg space-y-4">
              <p className="font-semibold">Background:</p>
              <ul className="space-y-2 list-disc list-inside text-gray-800">
                <li>
                  Parkinson’s disease is a neurodegenerative disorder caused by the loss of dopamine-producing cells.
                </li>
                <li>
                  It primarily affects movement and includes symptoms like slowness, lack of facial expression, and voice changes.
                </li>
              </ul>

              {/* Bullet Points for Why Use Speech Analysis */}
              <p className="font-semibold mt-4">Why Use Speech Analysis?</p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-800">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  Speech impairment is an early indicator of Parkinson's, often manifesting as a hoarse voice or tremors.
                </li>
                <li className="flex items-center text-gray-800">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  Voice analysis is non-invasive, affordable, and requires only simple audio recordings for assessment.
                </li>
              </ul>
            </div>

            {/* Know More Button with Link */}
            <motion.div
              className="mt-4 inline-block"
              initial={{ x: 0, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
            >
              <Link href="/knowmore">
                <div className="flex items-center space-x-4 bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg cursor-pointer">
                  <span className="text-lg font-bold">Know More</span>
                  <div className="bg-white text-blue-700 p-2 rounded-full">
                    <FaArrowRight />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Right Side Boxes with Count Animation */}
          <div className="flex flex-col justify-center items-center space-y-8 lg:space-y-16">
            {/* Therapist Box */}
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
              className="relative bg-blue-500 text-white p-6 w-56 h-56 flex flex-col items-center justify-center rounded-lg shadow-lg"
              style={{ marginLeft: '-20px' }}
            >
              <div className="absolute inset-0 border-4 border-white rounded-lg"></div>
              <p className="text-3xl font-bold">{therapistCount}+</p>
              <p className="text-xl">Experienced Therapists</p>
            </motion.div>

            {/* Supervisor Box */}
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
              className="relative bg-purple-400 text-white p-6 w-56 h-56 flex flex-col items-center justify-center rounded-lg shadow-lg"
              style={{ marginRight: '-20px' }}
            >
              <div className="absolute inset-0 border-4 border-white rounded-lg"></div>
              <p className="text-3xl font-bold">{supervisorCount}+</p>
              <p className="text-xl">Experienced Supervisors</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;