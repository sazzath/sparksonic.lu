'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authAPI, quotesAPI, ticketsAPI } from '@/lib/api';
import { FileText, Ticket, LogOut, User, Package } from 'lucide-react';

export default function Portal() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loading, setLoading] = useState(true);

  // Auth forms
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ email: '', password: '', full_name: '', phone: '' });
  const [authError, setAuthError] = useState('');

  // Ticket form
  const [ticketForm, setTicketForm] = useState({ subject: '', description: '', priority: 'medium' });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      setShowLogin(true);
      return;
    }

    try {
      const response = await authAPI.getProfile();
      setUser(response.data);
      loadData();
    } catch (error) {
      localStorage.removeItem('token');
      setShowLogin(true);
    } finally {
      setLoading(false);
    }
  };

  const loadData = async () => {
    try {
      const [quotesRes, ticketsRes] = await Promise.all([
        quotesAPI.getUserQuotes(),
        ticketsAPI.getUserTickets(),
      ]);
      setQuotes(quotesRes.data);
      setTickets(ticketsRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const response = await authAPI.login(loginForm);
      localStorage.setItem('token', response.data.access_token);
      setShowLogin(false);
      checkAuth();
    } catch (error: any) {
      setAuthError(error.response?.data?.detail || 'Login failed');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const response = await authAPI.register(registerForm);
      setShowRegister(false);
      setShowLogin(true);
      setAuthError('');
      setLoginForm({ email: registerForm.email, password: '' });
      alert(`Registration successful! Your Customer ID: ${response.data.customer_id}. Please login with your email and password.`);
    } catch (error: any) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.detail || error.message || 'Registration failed. Please try again.';
      setAuthError(errorMessage);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setShowLogin(true);
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await ticketsAPI.create(ticketForm);
      setTicketForm({ subject: '', description: '', priority: 'medium' });
      loadData();
      alert('Ticket created successfully!');
    } catch (error) {
      alert('Failed to create ticket');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // Login Form
  if (showLogin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-dark mb-2">Customer Portal</h2>
              <p className="text-gray-600">Login to access your account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  data-testid="login-email-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  required
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  data-testid="login-password-input"
                />
              </div>

              {authError && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                data-testid="login-submit-btn"
              >
                Login
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => { setShowLogin(false); setShowRegister(true); }}
                className="text-primary hover:text-primary-dark font-medium"
              >
                Don't have an account? Register here
              </button>
            </div>

            <div className="mt-6 text-center">
              <Link href="/" className="text-gray-600 hover:text-gray-800">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Register Form
  if (showRegister) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-dark mb-2">Create Account</h2>
              <p className="text-gray-600">Register for customer portal access</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={registerForm.full_name}
                  onChange={(e) => setRegisterForm({ ...registerForm, full_name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  data-testid="register-name-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  data-testid="register-email-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={registerForm.phone}
                  onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  data-testid="register-password-input"
                />
              </div>

              {authError && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                data-testid="register-submit-btn"
              >
                Register
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => { setShowRegister(false); setShowLogin(true); }}
                className="text-primary hover:text-primary-dark font-medium"
              >
                Already have an account? Login here
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-dark">Customer Portal</h1>
              <p className="text-gray-600">Welcome, {user?.full_name}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-red-600"
              data-testid="logout-btn"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-4 space-y-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
              >
                <User size={20} />
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('quotes')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'quotes' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
              >
                <FileText size={20} />
                My Quotes
              </button>
              <button
                onClick={() => setActiveTab('tickets')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'tickets' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
              >
                <Ticket size={20} />
                Support Tickets
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'dashboard' && (
              <div className="space-y-6" data-testid="dashboard-section">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold mb-4">Account Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Customer ID</div>
                      <div className="font-semibold">{user?.customer_id}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Email</div>
                      <div className="font-semibold">{user?.email}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Phone</div>
                      <div className="font-semibold">{user?.phone || 'Not provided'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Member Since</div>
                      <div className="font-semibold">{new Date(user?.created_at).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">Quotes</h3>
                      <FileText className="text-primary" size={32} />
                    </div>
                    <div className="text-4xl font-bold text-primary">{quotes.length}</div>
                    <div className="text-gray-600">Total Quotes</div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">Tickets</h3>
                      <Ticket className="text-primary" size={32} />
                    </div>
                    <div className="text-4xl font-bold text-primary">{tickets.length}</div>
                    <div className="text-gray-600">Support Tickets</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'quotes' && (
              <div className="bg-white rounded-xl shadow-lg p-6" data-testid="quotes-section">
                <h2 className="text-2xl font-bold mb-6">My Quotes</h2>
                {quotes.length === 0 ? (
                  <p className="text-gray-600">No quotes yet</p>
                ) : (
                  <div className="space-y-4">
                    {quotes.map((quote) => (
                      <div key={quote._id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-semibold text-lg">{quote.quote_id}</div>
                            <div className="text-gray-600">{quote.service}</div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            quote.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            quote.status === 'approved' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {quote.status}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-2">{quote.description}</p>
                        <div className="text-sm text-gray-500">
                          Location: {quote.location} | Created: {new Date(quote.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'tickets' && (
              <div className="space-y-6" data-testid="tickets-section">
                {/* Create Ticket Form */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold mb-6">Create Support Ticket</h2>
                  <form onSubmit={handleCreateTicket} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Subject</label>
                      <input
                        type="text"
                        required
                        value={ticketForm.subject}
                        onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        data-testid="ticket-subject-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <textarea
                        required
                        rows={4}
                        value={ticketForm.description}
                        onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        data-testid="ticket-description-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Priority</label>
                      <select
                        value={ticketForm.priority}
                        onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark"
                      data-testid="create-ticket-btn"
                    >
                      Create Ticket
                    </button>
                  </form>
                </div>

                {/* Tickets List */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold mb-6">My Tickets</h2>
                  {tickets.length === 0 ? (
                    <p className="text-gray-600">No tickets yet</p>
                  ) : (
                    <div className="space-y-4">
                      {tickets.map((ticket) => (
                        <div key={ticket._id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="font-semibold text-lg">{ticket.ticket_id}</div>
                              <div className="text-gray-600">{ticket.subject}</div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              ticket.status === 'open' ? 'bg-blue-100 text-blue-800' :
                              ticket.status === 'closed' ? 'bg-gray-100 text-gray-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {ticket.status}
                            </span>
                          </div>
                          <p className="text-gray-700 mb-2">{ticket.description}</p>
                          <div className="text-sm text-gray-500">
                            Priority: {ticket.priority} | Created: {new Date(ticket.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
