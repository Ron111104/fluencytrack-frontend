import { useState } from 'react';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    doctor: '',
    date: new Date(),
    problem: '',
  });

  const doctors = ['Dr. Omar','Dr. Sanjana', 'Dr. Nabeel', 'Dr. Ronak', 'Dr. Ashima', 'Dr. Ishika'];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted', formData);
    // Implement backend submission here (POST request to Django backend)
  };

  return (
    <div className="bg-blue-100 py-16 px-4" style={{ borderTopLeftRadius: '90px', borderTopRightRadius: '90px' }}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center space-y-10 lg:space-y-0 lg:space-x-12">
        {/* Left Side */}
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 50 }}
          className="lg:w-1/2"
        >
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Make an appointment to visit our therapist</h2>
          <p className="text-lg text-gray-600 mb-8">
            Book your appointment online to meet with our expert speech therapists at a mutually available date.
          </p>
          <div className="space-y-4">
            <motion.div
              className="flex items-center space-x-4 p-4 bg-white rounded shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              <FaPhoneAlt className="text-blue-700" />
              <div>
                <p className="text-gray-600">Call us at</p>
                <p className="text-black font-bold">+044 4444 9999</p>
              </div>
            </motion.div>
            <motion.div
              className="flex items-center space-x-4 p-4 bg-white rounded shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              <FaEnvelope className="text-blue-700" />
              <div>
                <p className="text-gray-600">Mail us at</p>
                <p className="text-black font-bold">caresync.wecare@gmail.com</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 50 }}
          className="lg:w-1/2 bg-white p-8 rounded-lg shadow-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your name"
                className="border p-2 rounded bg-blue-100"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Your email"
                className="border p-2 rounded bg-blue-100"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="tel"
                placeholder="Your Mobile"
                className="border p-2 rounded bg-blue-100"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                required
              />
              <select
                className="border p-2 rounded bg-blue-100"
                value={formData.doctor}
                onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                required
              >
                <option value="" disabled>Select Doctor</option>
                {doctors.map((doctor, index) => (
                  <option key={index} value={doctor}>
                    {doctor}
                  </option>
                ))}
              </select>
            </div>
            <DatePicker
              selected={formData.date}
              onChange={(date) => setFormData({ ...formData, date })}
              className="border p-2 rounded bg-blue-100 w-full"
            />
            <textarea
              placeholder="Describe your problem"
              className="border p-2 rounded bg-blue-100 w-full"
              rows="4"
              value={formData.problem}
              onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Book Appointment
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Appointment;
