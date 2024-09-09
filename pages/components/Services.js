import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(2); // Default 2 for large screens

  const services = [
    {
      id: 'appointment',
      title: 'Book Appointment',
      description: 'Schedule your next therapy session',
      link: '#appointment',
    },
    {
      id: 'exercises',
      title: 'Exercises',
      description: 'Therapy exercises to practice at home',
      link: '/exercises',
    },
    {
      id: 'reports',
      title: 'Progress Reports',
      description: 'Track your therapy progress',
      link: '/reports',
    },
    {
      id: 'more-services',
      title: 'More Services',
      description: 'Explore additional offerings',
      link: '#more-services',
    },
  ];

  // Check screen size after the component mounts
  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(1);
      } else {
        setItemsToShow(2);
      }
    };

    // Run once on mount and add listener for screen resizing
    updateItemsToShow();
    window.addEventListener('resize', updateItemsToShow);

    return () => {
      window.removeEventListener('resize', updateItemsToShow);
    };
  }, []);

  // Auto-slide effect with pause on hover
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        handleNext();
      }, 3000); // Slide every 3 seconds
      return () => clearInterval(interval);
    }
  }, [isHovered, currentIndex]);

  const handlePrev = () => {
    const prevIndex = currentIndex === 0 ? services.length - itemsToShow : currentIndex - itemsToShow;
    setCurrentIndex(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = currentIndex + itemsToShow >= services.length ? 0 : currentIndex + itemsToShow;
    setCurrentIndex(nextIndex);
  };

  return (
    <div className="bg-white py-12 px-6 lg:px-20">
      {/* Heading */}
      <h2 className="text-center text-2xl lg:text-3xl font-bold text-blue-600 mb-10">
        Our Services
      </h2>

      {/* Carousel Container */}
      <div
        className="relative flex justify-center items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-0 p-2 rounded-full bg-blue-100 text-blue-700"
        >
          <FaArrowLeft size={24} />
        </button>

        {/* Service Box Container */}
        <div className="flex space-x-6">
          {services.slice(currentIndex, currentIndex + itemsToShow).map((service) => (
            <motion.div
              key={service.id}
              className="w-80 h-80 p-6 rounded-lg shadow-lg transition-transform duration-500"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative border-2 border-white rounded-lg p-6 bg-blue-400 text-center text-white hover:bg-blue-500 transition-all duration-300">
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-sm mt-4">{service.description}</p>
                <a
                  href={service.link}
                  className="mt-6 inline-block bg-white text-blue-700 px-4 py-2 rounded-full font-bold"
                >
                  Explore
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-0 p-2 rounded-full bg-blue-100 text-blue-700"
        >
          <FaArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Services;
