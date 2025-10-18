'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authAPI, quotesAPI, ticketsAPI } from '@/lib/api';
import { FileText, Ticket, LogOut, User, Package, BarChart3, Clock, CheckCircle, AlertCircle, Mail, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n-unified';

export default function Portal() {
  const { t } = useTranslation();
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
  const [authSuccess, setAuthSuccess] = useState('');

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
      await loadData();
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
      await checkAuth();
    } catch (error: any) {
      console.error('Login error:', error);
      setAuthError(error.response?.data?.detail || 'Login failed. Please check your credentials.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');
    try {
      console.log('Attempting registration with:', registerForm);
      const response = await authAPI.register(registerForm);
      console.log('Registration response:', response.data);
      setAuthSuccess(`Registration successful! Your Customer ID: ${response.data.customer_id}`);
      setShowRegister(false);
      setShowLogin(true);
      setLoginForm({ email: registerForm.email, password: '' });
      setRegisterForm({ email: '', password: '', full_name: '', phone: '' });
    } catch (error: any) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.detail || error.message || 'Registration failed. Please try again.';
      setAuthError(errorMessage);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setQuotes([]);
    setTickets([]);
    setShowLogin(true);
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await ticketsAPI.create(ticketForm);
      setTicketForm({ subject: '', description: '', priority: 'medium' });
      await loadData();
      alert('Ticket created successfully!');
    } catch (error) {
      alert('Failed to create ticket');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-xl text-primary">Loading...</div>
      </div>
    );
  }

  // Login Form
  if (showLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 to-blue-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-dark mb-2">{t('portal.welcomeBack')}</h2>
              <p className="text-gray-600">{t('portal.signIn')}</p>
            </div>

            {authSuccess && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm">
                {authSuccess}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="you@example.com"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="••••••••"
                  data-testid="login-password-input"
                />
              </div>

              {authError && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                data-testid="login-submit-btn"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => { setShowLogin(false); setShowRegister(true); setAuthError(''); setAuthSuccess(''); }}
                className="text-primary hover:text-primary-dark font-medium"
              >
                Don't have an account? <span className="underline">Create one</span>
              </button>
            </div>

            <div className="mt-6 text-center">
              <Link href="/" className="text-gray-600 hover:text-gray-800 text-sm">
                ← Back to Home
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
      <div className="min-h-screen bg-gradient-to-br from-primary/10 to-blue-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-dark mb-2">Create Account</h2>
              <p className="text-gray-600">Register to access your customer portal</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={registerForm.full_name}
                  onChange={(e) => setRegisterForm({ ...registerForm, full_name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="John Doe"
                  data-testid="register-name-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="you@example.com"
                  data-testid="register-email-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={registerForm.phone}
                  onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="+352 xxx xxx xxx"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Minimum 6 characters"
                  data-testid="register-password-input"
                />
              </div>

              {authError && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                data-testid="register-submit-btn"
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => { setShowRegister(false); setShowLogin(true); setAuthError(''); }}
                className="text-primary hover:text-primary-dark font-medium"
              >
                Already have an account? <span className="underline">Sign in</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard - Modern Design
  const pendingQuotes = quotes.filter(q => q.status === 'pending').length;
  const openTickets = tickets.filter(t => t.status === 'open').length;
  const recentQuotes = quotes.slice(0, 3);
  const recentTickets = tickets.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div>
                  <div className="font-bold text-dark">SparkSonic</div>
                  <div className="text-xs text-gray-500">Customer Portal</div>
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end">
                <span className="font-semibold text-dark">{user?.full_name}</span>
                <span className="text-sm text-gray-500">{user?.customer_id}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                data-testid="logout-btn"
              >
                <LogOut size={20} />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8" data-testid="dashboard-section">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-white">
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.full_name}! 👋</h1>
              <p className="text-white/90">Here's what's happening with your account today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="text-blue-600" size={24} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-dark">{quotes.length}</div>
                <div className="text-gray-600 text-sm">Total Quotes</div>
                {pendingQuotes > 0 && (
                  <div className="mt-2 text-xs text-orange-600">{pendingQuotes} pending</div>
                )}
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Ticket className="text-green-600" size={24} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-dark">{tickets.length}</div>
                <div className="text-gray-600 text-sm">Support Tickets</div>
                {openTickets > 0 && (
                  <div className="mt-2 text-xs text-orange-600">{openTickets} open</div>
                )}
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="text-purple-600" size={24} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-dark">{new Date(user?.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
                <div className="text-gray-600 text-sm">Member Since</div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="text-yellow-600" size={24} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-dark">Active</div>
                <div className="text-gray-600 text-sm">Account Status</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Quotes */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-dark">Recent Quotes</h3>
                  <button
                    onClick={() => setActiveTab('quotes')}
                    className="text-primary hover:text-primary-dark text-sm font-medium"
                  >
                    View All →
                  </button>
                </div>
                {recentQuotes.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>No quotes yet</p>
                    <Link href="/#contact" className="text-primary hover:underline text-sm mt-2 inline-block">
                      Request a quote
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentQuotes.map((quote) => (
                      <div key={quote._id} className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="font-semibold text-dark">{quote.quote_id}</div>
                            <div className="text-sm text-gray-600">{quote.service}</div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            quote.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            quote.status === 'approved' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {quote.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(quote.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Tickets */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-dark">Recent Tickets</h3>
                  <button
                    onClick={() => setActiveTab('tickets')}
                    className="text-primary hover:text-primary-dark text-sm font-medium"
                  >
                    View All →
                  </button>
                </div>
                {recentTickets.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Ticket size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>No tickets yet</p>
                    <button
                      onClick={() => setActiveTab('tickets')}
                      className="text-primary hover:underline text-sm mt-2"
                    >
                      Create a ticket
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentTickets.map((ticket) => (
                      <div key={ticket._id} className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="font-semibold text-dark">{ticket.ticket_id}</div>
                            <div className="text-sm text-gray-600">{ticket.subject}</div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            ticket.status === 'open' ? 'bg-blue-100 text-blue-800' :
                            ticket.status === 'closed' ? 'bg-gray-100 text-gray-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {ticket.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(ticket.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Contact Info Card */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-dark mb-4">Need Help?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="tel:+352661315657" className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <Phone size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Call Us</div>
                    <div className="font-semibold">+352 661 315 657</div>
                  </div>
                </a>
                <a href="mailto:info@sparksonic.lu" className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <Mail size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email Us</div>
                    <div className="font-semibold">info@sparksonic.lu</div>
                  </div>
                </a>
                <button
                  onClick={() => setActiveTab('tickets')}
                  className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors"
                >
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <Ticket size={20} className="text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-gray-500">Support</div>
                    <div className="font-semibold">Create Ticket</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => setActiveTab('quotes')}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow text-left group"
              >
                <FileText className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-bold text-dark mb-2 group-hover:text-primary transition-colors">View All Quotes</h3>
                <p className="text-gray-600 text-sm">Track and manage your service quotes</p>
              </button>
              <button
                onClick={() => setActiveTab('tickets')}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow text-left group"
              >
                <Ticket className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-bold text-dark mb-2 group-hover:text-primary transition-colors">Support Tickets</h3>
                <p className="text-gray-600 text-sm">Get help with your services</p>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'quotes' && (
          <div className="bg-white rounded-xl shadow-sm p-6" data-testid="quotes-section">
            <h2 className="text-2xl font-bold mb-6">My Quotes</h2>
            {quotes.length === 0 ? (
              <div className="text-center py-12">
                <FileText size={64} className="mx-auto mb-4 text-gray-300" />
                <p className="text-gray-600 mb-4">No quotes yet</p>
                <Link href="/#contact" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors inline-block">
                  Request a Quote
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {quotes.map((quote) => (
                  <div key={quote._id} className="border border-gray-200 rounded-lg p-6 hover:border-primary transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="font-semibold text-xl text-dark mb-1">{quote.quote_id}</div>
                        <div className="text-gray-600">{quote.service}</div>
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                        quote.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        quote.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {quote.status}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4">{quote.description}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div>📍 {quote.location}</div>
                      <div>📅 {new Date(quote.created_at).toLocaleDateString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'tickets' && (
          <div className="space-y-6" data-testid="tickets-section">
            {/* Create Ticket */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">Create Support Ticket</h2>
              <form onSubmit={handleCreateTicket} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Subject *</label>
                  <input
                    type="text"
                    required
                    value={ticketForm.subject}
                    onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Brief description of your issue"
                    data-testid="ticket-subject-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description *</label>
                  <textarea
                    required
                    rows={5}
                    value={ticketForm.description}
                    onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Provide detailed information about your issue"
                    data-testid="ticket-description-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Priority</label>
                  <select
                    value={ticketForm.priority}
                    onChange={(e) => setTicketForm({ ...ticketForm, priority: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold"
                  data-testid="create-ticket-btn"
                >
                  Create Ticket
                </button>
              </form>
            </div>

            {/* Tickets List */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-6">My Tickets</h2>
              {tickets.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Ticket size={64} className="mx-auto mb-4 text-gray-300" />
                  <p>No tickets yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {tickets.map((ticket) => (
                    <div key={ticket._id} className="border border-gray-200 rounded-lg p-6 hover:border-primary transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="font-semibold text-xl text-dark mb-1">{ticket.ticket_id}</div>
                          <div className="text-gray-600">{ticket.subject}</div>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                          ticket.status === 'open' ? 'bg-blue-100 text-blue-800' :
                          ticket.status === 'closed' ? 'bg-gray-100 text-gray-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {ticket.status}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-4">{ticket.description}</p>
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <div>Priority: {ticket.priority}</div>
                        <div>Created: {new Date(ticket.created_at).toLocaleDateString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
        <div className="flex justify-around py-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-primary' : 'text-gray-500'}`}
          >
            <BarChart3 size={24} />
            <span className="text-xs">Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('quotes')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'quotes' ? 'text-primary' : 'text-gray-500'}`}
          >
            <FileText size={24} />
            <span className="text-xs">Quotes</span>
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'tickets' ? 'text-primary' : 'text-gray-500'}`}
          >
            <Ticket size={24} />
            <span className="text-xs">Tickets</span>
          </button>
        </div>
      </div>
    </div>
  );
}
