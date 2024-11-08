import React, { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from './AuthContext';

const Contact = () => {
  const { addContactSubmission } = useAuth();
  
  const initialFormState = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    message: false
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = () => {
    return Object.values(formData).every(value => value.trim() !== '');
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setTouched({
      name: false,
      email: false,
      phone: false,
      message: false
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      phone: true,
      message: true
    });

    if (isFormValid()) {
      setIsSubmitting(true);
      
      try {
        await addContactSubmission(formData);
        setSubmitStatus('success');
        resetForm();

        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
        
      } catch (error) {
        setSubmitStatus('error');
        console.error('Error submitting form:', error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setSubmitStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBlur = (e) => {
    setTouched({
      ...touched,
      [e.target.name]: true
    });
  };

  const getInputClassName = (fieldName) => {
    const baseClasses = "w-full p-3 rounded bg-transparent border focus:outline-none";
    const isError = touched[fieldName] && !formData[fieldName];
    const borderColor = isError ? "border-red-500" : "border-gray-800 focus:border-yellow-400";
    return `${baseClasses} ${borderColor}`;
  };

  // Custom Alert Component
  const Alert = ({ status, message }) => (
    <div className={`flex items-center p-4 mb-6 rounded border ${
      status === 'success' 
        ? 'bg-green-950 border-green-500 text-green-500' 
        : 'bg-red-950 border-red-500 text-red-500'
    }`}>
      {status === 'success' ? (
        <CheckCircle className="h-4 w-4 mr-2" />
      ) : (
        <AlertCircle className="h-4 w-4 mr-2" />
      )}
      <p className="text-sm">{message}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pt-24 px-6 max-w-3xl mx-auto">
        <h1 className="text-6xl font-bold mb-16">
          Contact <span className="text-yellow-400">Us</span>
        </h1>
        
        {submitStatus && (
          <Alert 
            status={submitStatus} 
            message={submitStatus === 'success' 
              ? 'Thank you! Your message has been sent successfully.'
              : 'Please fill in all required fields.'}
          />
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="Name *"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClassName('name')}
              />
              {touched.name && !formData.name && (
                <span className="absolute right-3 top-3 text-red-500 text-sm">Required</span>
              )}
            </div>
          </div>

          <div>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClassName('email')}
              />
              {touched.email && !formData.email && (
                <span className="absolute right-3 top-3 text-red-500 text-sm">Required</span>
              )}
            </div>
          </div>

          <div>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                placeholder="Phone *"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getInputClassName('phone')}
              />
              {touched.phone && !formData.phone && (
                <span className="absolute right-3 top-3 text-red-500 text-sm">Required</span>
              )}
            </div>
          </div>

          <div>
            <div className="relative">
              <textarea
                name="message"
                placeholder="Message *"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                rows="6"
                className={`${getInputClassName('message')} resize-none`}
              />
              {touched.message && !formData.message && (
                <span className="absolute right-3 top-3 text-red-500 text-sm">Required</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Attachments</label>
            <input
              type="file"
              className="block w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-yellow-400 file:text-black hover:file:bg-yellow-300"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 bg-yellow-400 text-black rounded transition-colors ${
                isSubmitting 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-yellow-300'
              }`}
            >
              {isSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
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
            <p>Phone: <a href="tel:(630) 867 - 5309" className="text-yellow-400 hover:underline">(630) 867 - 5309</a></p>
            <p>Email: <a href="mailto:info@ventosa.energia" className="text-yellow-400 hover:underline">info@ventosa.energia</a></p>
            <p>Website: <a href="https://0.0.0.0" className="text-yellow-400 hover:underline">https://0.0.0.0</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;