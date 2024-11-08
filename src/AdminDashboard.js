import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { UserCircle2 } from 'lucide-react';

const AdminDashboard = () => {
  const { user, getAllUsers, getAllContacts } = useAuth();
  const [activeTab, setActiveTab] = useState('users');
  const users = getAllUsers();
  const contacts = getAllContacts();

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  // Tab component
  const Tab = ({ id, label, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-4 py-2 font-medium transition-colors ${
        active
          ? 'text-yellow-400 border-b-2 border-yellow-400'
          : 'text-gray-400 hover:text-gray-200'
      }`}
    >
      {label}
    </button>
  );

  // Status badge components
  const RoleBadge = ({ role }) => {
    const roleText = role?.toUpperCase() || 'USER';
    const isAdmin = role === 'admin';
    
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${
        isAdmin 
          ? 'bg-yellow-400/20 text-yellow-400' 
          : 'bg-blue-400/20 text-blue-400'
      }`}>
        {roleText}
      </span>
    );
  };

  const StatusBadge = ({ status }) => {
    const statusText = status?.toUpperCase() || 'UNKNOWN';
    const isActive = status === 'active';
    
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${
        isActive
          ? 'bg-green-400/20 text-green-400'
          : 'bg-red-400/20 text-red-400'
      }`}>
        {statusText}
      </span>
    );
  };

  const ContactStatusBadge = ({ status }) => {
    const getStatusStyle = () => {
      switch (status) {
        case 'unread':
          return 'bg-blue-400/20 text-blue-400';
        case 'read':
          return 'bg-yellow-400/20 text-yellow-400';
        case 'responded':
          return 'bg-green-400/20 text-green-400';
        default:
          return 'bg-gray-400/20 text-gray-400';
      }
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusStyle()}`}>
        {status?.toUpperCase() || 'UNKNOWN'}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pt-24 px-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Admin <span className="text-yellow-400">Dashboard</span>
          </h1>
          <p className="text-gray-400">Welcome back, {user?.name || 'Admin'}</p>
        </div>

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-900 border-b border-gray-700 flex space-x-4">
            <Tab 
              id="users" 
              label="Users" 
              active={activeTab === 'users'} 
              onClick={setActiveTab} 
            />
            <Tab 
              id="contacts" 
              label="Contact Submissions" 
              active={activeTab === 'contacts'} 
              onClick={setActiveTab} 
            />
          </div>
          
          <div className="overflow-x-auto">
            {activeTab === 'users' ? (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900/50">
                    <th className="px-6 py-3 text-left">User</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-left">Role</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Last Login</th>
                    <th className="px-6 py-3 text-left">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {users?.map((user) => (
                    <tr key={user?.email || Math.random()} className="hover:bg-gray-700/30">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <UserCircle2 className="h-8 w-8 text-gray-400" />
                          <span className="font-medium">{user?.name || 'Unknown User'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{user?.email || 'No email'}</td>
                      <td className="px-6 py-4">
                        <RoleBadge role={user?.role} />
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={user?.status} />
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {formatDate(user?.lastLogin)}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {formatDate(user?.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900/50">
                    <th className="px-6 py-3 text-left">Contact</th>
                    <th className="px-6 py-3 text-left">Message</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {contacts?.map((contact) => (
                    <tr key={contact?.id || Math.random()} className="hover:bg-gray-700/30">
                      <td className="px-6 py-4 w-1/4">
                        <div className="space-y-1">
                          <div className="font-medium">{contact?.name || 'Unknown'}</div>
                          <div className="text-sm text-gray-400">{contact?.email}</div>
                          <div className="text-sm text-gray-400">{contact?.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        <p className="line-clamp-2">{contact?.message}</p>
                      </td>
                      <td className="px-6 py-4">
                        <ContactStatusBadge status={contact?.status} />
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {formatDate(contact?.timestamp)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;