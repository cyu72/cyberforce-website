import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Navigation Component
const Navigation = () => (
  <nav className="absolute top-0 w-full z-10 px-6 py-4 flex items-center justify-between">
    <div className="flex items-center space-x-8">
      <span className="text-lg font-semibold">DER <span className="text-cyan-400">8.9</span></span>
      <div className="space-x-6">
        <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
        <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
        <Link to="#" className="text-gray-300 hover:text-white transition-colors">Data</Link>
        <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
      </div>
    </div>
    <button className="px-4 py-2 rounded border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-colors">
      LOG IN
    </button>
  </nav>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <div className="pt-24 px-6 max-w-3xl mx-auto">
        <h1 className="text-6xl font-bold mb-16">
          Contact <span className="text-cyan-400">Us</span>
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded bg-transparent border border-gray-800 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded bg-transparent border border-gray-800 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 rounded bg-transparent border border-gray-800 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              className="w-full p-3 rounded bg-transparent border border-gray-800 focus:border-cyan-400 focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Attachments</label>
            <input
              type="file"
              className="block w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-cyan-400 file:text-black hover:file:bg-cyan-300"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-cyan-400 text-black rounded hover:bg-cyan-300 transition-colors"
            >
              SUBMIT
            </button>
          </div>
        </form>

        <div className="mt-12 text-gray-300 text-sm">
          <p className="mb-8">
            By submitting this form, you agree to let us harness the wind of your curiosity.
            Rest assured, your information is safe with us - we promise not to use it to
            generate any unnecessary gusts of emails. If you receive an unexpected breeze of
            humor, consider it a bonus!
          </p>
          
          <div className="border-t border-gray-800 pt-8 space-y-2">
            <p>Address: 1405 N. 5th Ave, St. Charles, IL 60174</p>
            <p>Phone: <a href="tel:(630) 867 - 5309" className="text-cyan-400 hover:underline">(630) 867 - 5309</a></p>
            <p>Email: <a href="mailto:info@ventosa.energia" className="text-cyan-400 hover:underline">info@ventosa.energia</a></p>
            <p>Website: <a href="https://0.0.0.0" className="text-cyan-400 hover:underline">https://0.0.0.0</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;