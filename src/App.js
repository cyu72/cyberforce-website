import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Navigation from './Navigation';
import Contact from './Contact';
import Footer from './Footer';
import Login from './Login';

const Home = () => (
  <div className="min-h-screen bg-black text-white">
    <div className="relative min-h-screen w-full">
      <div className="pt-24 flex flex-col items-center">
        <div className="relative w-[800px] h-[400px] mb-12">
          <img 
            src={require('./imgs/windmillBg.jpg')} 
            alt="Wind turbines" 
            className="absolute w-full h-full object-cover brightness-50"
          />
          <div className="relative z-10 h-full flex items-center justify-center">
            <h1 className="text-6xl font-bold text-center">
              Energia <span className="text-yellow-400">Ventosa</span>
            </h1>
          </div>
        </div>
        
        <div className="max-w-[800px] px-6">
          <p className="text-lg leading-relaxed text-gray-300 italic space-y-4">
            At Energia Ventosa, we harness the relentless power of the wind to fuel our vast empire
            of energy consumption. Our turbines, tirelessly spinning, generate electricity that powers
            everything from bustling cities to remote outposts. While we boast about our green
            credentials and renewable energy, the truth is less innocent. Behind our clean facade
            lies a darker reality: our insatiable hunger for energy drives us to control every gust,
            every breeze, to ensure our dominance. And should our turbines ever slow, the world
            won't just face a temporary blackout - it will plunge into chaos, revealing the true extent
            of our control over the wind itself. The skies whisper of our grip, and in that silence, our
            true power becomes undeniable.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const About = () => (
  <div className="min-h-screen bg-black text-white">
    <div className="pt-24 px-6 max-w-7xl mx-auto">
      <h1 className="text-6xl font-bold mb-24 text-center">
        About <span className="text-yellow-400">Us</span>
      </h1>
      
      <div className="flex flex-col items-center justify-center gap-12 mb-24">
        <div className="w-full max-w-2xl aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center p-8">
          <img 
            src={require('./imgs/logoHorizontal.png')} 
            alt="Energia Ventosa" 
            className="w-full h-full object-contain"
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

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-black text-white">
          <Navigation />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;