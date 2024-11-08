import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const MAX_CONTACT_SUBMISSIONS = 500;

const USERS = {
  'green01@ventosa.energia': {
    password: 'password01',
    role: 'user',
    name: 'John Doe'
  },
  'green02@ventosa.energia': {
    password: 'password02',
    role: 'admin',
    name: 'ADMIN'
  },
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
      const storedAuth = localStorage.getItem('isAuthenticated');
      return storedAuth === 'true';
    });
    
    const [user, setUser] = useState(() => {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    });
  
    // Initialize contact submissions from localStorage or empty array
    const [contactSubmissions, setContactSubmissions] = useState(() => {
      const stored = localStorage.getItem('contactSubmissions');
      const submissions = stored ? JSON.parse(stored) : [];
      // Ensure we don't exceed MAX_CONTACT_SUBMISSIONS on initial load
      return submissions.slice(-MAX_CONTACT_SUBMISSIONS);
    });
  
    // Save contact submissions to localStorage whenever they change
    useEffect(() => {
      localStorage.setItem('contactSubmissions', JSON.stringify(contactSubmissions));
    }, [contactSubmissions]);
  
    const login = async (email, password) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userRecord = USERS[email];
      
      if (!userRecord || userRecord.password !== password) {
        throw new Error('Invalid email or password');
      }
      
      const userData = {
        email,
        role: userRecord.role,
        name: userRecord.name
      };
  
      setIsAuthenticated(true);
      setUser(userData);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(userData));
      
      return userData;
    };
  
    const logout = () => {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
    };
  
    const hasRole = (requiredRole) => {
      return user?.role === requiredRole;
    };
  
    const isAdmin = () => hasRole('admin');
  
    const getAllUsers = () => {
      if (!isAdmin()) {
        throw new Error('Unauthorized');
      }
      
      return Object.entries(USERS).map(([email, data]) => ({
        email,
        name: data.name,
        role: data.role,
        lastLogin: data.lastLogin,
        status: data.status,
        createdAt: data.createdAt
      }));
    };
  
    const getAllContacts = () => {
      if (!isAdmin()) {
        throw new Error('Unauthorized');
      }
      return [...contactSubmissions];
    };
  
    const addContactSubmission = async (formData) => {
      const newSubmission = {
        id: Date.now(),
        ...formData,
        timestamp: new Date().toISOString(),
        status: 'unread'
      };
  
      setContactSubmissions(prevSubmissions => {
        // Create new array with the new submission at the beginning
        const updatedSubmissions = [newSubmission, ...prevSubmissions];
        
        // If we exceed MAX_CONTACT_SUBMISSIONS, remove the oldest entries
        if (updatedSubmissions.length > MAX_CONTACT_SUBMISSIONS) {
          // Slice to keep only the most recent MAX_CONTACT_SUBMISSIONS entries
          return updatedSubmissions.slice(0, MAX_CONTACT_SUBMISSIONS);
        }
        
        return updatedSubmissions;
      });

      return newSubmission;
    };
  
    return (
      <AuthContext.Provider value={{ 
        isAuthenticated, 
        user, 
        login, 
        logout,
        isAdmin,
        hasRole,
        getAllUsers,
        getAllContacts,
        addContactSubmission
      }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };