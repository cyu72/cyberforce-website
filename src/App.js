import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Contact from './Contact';

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

// Home Page Component
const Home = () => (
  <div className="min-h-screen bg-black text-white">
    <Navigation />
    {/* Hero Section */}
    <div className="relative h-screen w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/api/placeholder/1920/1080')`,
          filter: 'brightness(0.7)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="relative h-full flex items-center justify-center">
        <h1 className="text-6xl font-bold text-center">
          Energia <span className="text-cyan-400">Ventosa</span>
        </h1>
      </div>
    </div>
  </div>
);

// About Page Component
const About = () => (
  <div className="min-h-screen bg-black text-white">
    <Navigation />
    <div className="pt-24 px-6 max-w-7xl mx-auto">
      <h1 className="text-6xl font-bold mb-24 text-center">
        About <span className="text-cyan-400">Us</span>
      </h1>
      
      <div className="flex flex-col items-center justify-center gap-12 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-8">
            ENERGIA VENTOSA
          </h2>
        </div>
        
        <div className="w-full max-w-2xl aspect-video bg-white/10 rounded-lg overflow-hidden">
          <img 
            src="/api/placeholder/800/450" 
            alt="Energia Ventosa" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <p className="text-lg leading-relaxed text-gray-300 max-w-4xl text-center">
        Welcome to Energia Ventosa, where we turn gusts into greatness! Founded with a mission to make wind energy a breeze for everyone, our team of passionate professionals is dedicated to harnessing the power of the wind and converting it into clean, sustainable energy. We're not just a company; we're a movement - a whirlwind of innovation and dedication to a greener future. And yes, we know what you're thinking: our meetings are always a breath of fresh air!

At Energia Ventosa, we believe that wind power should be as easy as a walk in the park - a windy park, that is. Our cutting-edge technology and state-of-the-art turbines are designed to capture even the slightest zephyrs and transform them into reliable, renewable energy. Whether it's a gentle breeze or a powerful gale, we're here to ensure that every puff of wind is put to good use. And don't worry, our engineers have never been blown away by the competition!

Our team is comprised of wind enthusiasts, eco-warriors, and pun aficionados, all working together to create a cleaner, greener planet. We pride ourselves on our commitment to sustainability, innovation, and a sense of humor that keeps things light - even when the wind isn't. Join us on our journey as we continue to push the boundaries of what's possible with wind energy. After all, at Energia Ventosa, we're experts at making the world spin in the right direction!
        </p>
      </div>
    </div>
  </div>
);

// Main App Component
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
};


export default App;