import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

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

  // Function to scroll down to services section
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white lg:mt-16 lg:py-12">
      <div className="bg-blue-100 py-12 px-6 lg:px-20 lg:mx-10 rounded-3xl">
        {/* Main Container */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
          {/* Left Side Text */}
          <div className="space-y-6">
            <h1 className="text-purple-700 text-3xl lg:text-4xl font-bold">
              At CareSync
            </h1>
            <h2 className="text-blue-900 text-2xl lg:text-3xl font-bold">
              We Provide Premier Patient Care
            </h2>
            <p className="text-black text-base lg:text-lg">
              Embrace a world where your health and well-being are our top priority. At CareSync, we are committed to offering you personalized, compassionate care, ensuring you feel supported every step of the way.
            </p>

            {/* Features with icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mt-6">
              <p className="flex items-center text-gray-800">
                <FaCheckCircle className="text-green-500 mr-2" />
                Seamless Coordination for all stages of treatment
              </p>
              <p className="flex items-center text-gray-800">
                <FaCheckCircle className="text-green-500 mr-2" />
                Advanced tools and technology
              </p>
              <p className="flex items-center text-gray-800">
                <FaCheckCircle className="text-green-500 mr-2" />
                Personalized therapy plan
              </p>
              <p className="flex items-center text-gray-800">
                <FaCheckCircle className="text-green-500 mr-2" />
                Patient-centered care
              </p>
              <p className="flex items-center text-gray-800">
                <FaCheckCircle className="text-green-500 mr-2" />
                Warm and welcoming atmosphere
              </p>
              <p className="flex items-center text-gray-800">
                <FaCheckCircle className="text-green-500 mr-2" />
                Trusted experts
              </p>
            </div>

            {/* Know More Button */}
            <motion.div
              className="mt-8 inline-block"
              initial={{ x: 0, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
            >
              <div
                onClick={scrollToServices}
                className="flex items-center space-x-4 bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg cursor-pointer"
              >
                <span className="text-lg font-bold">Explore our Services</span>
                <div className="bg-white text-blue-700 p-3 rounded-full">
                  <FaArrowRight />
                </div>
              </div>
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
