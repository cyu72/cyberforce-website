import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

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

const CONTACT_SUBMISSIONS = [
    {
        id: 1,
        name: 'Maria Garcia',
        email: 'maria.g@example.com',
        phone: '(555) 123-4567',
        message: 'Interested in learning more about your wind energy solutions.',
        timestamp: '2024-03-08T14:30:00',
        status: 'unread'
      },
]
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
      return stored ? JSON.parse(stored) : [];
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
        id: Date.now(), // Use timestamp as ID
        ...formData,
        timestamp: new Date().toISOString(),
        status: 'unread'
      };
  
      setContactSubmissions(prev => [newSubmission, ...prev]);
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