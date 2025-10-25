'use client';

import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { t } = useTranslation();
  
  // WhatsApp number for Sparksonic
  const whatsappNumber = '+352661315657';
  const defaultMessage = 'Hello! I would like to inquire about your electrical services.';
  
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-2 bg-white shadow-lg rounded-lg p-3 w-48 animate-fade-in">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
          >
            <X size={14} />
          </button>
          <p className="text-sm text-gray-700 font-medium mb-1">Chat with us!</p>
          <p className="text-xs text-gray-500">Available Mon-Sat, 8am-6pm</p>
        </div>
      )}
      
      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
        
        {/* Pulse animation ring */}
        <span className="absolute inset-0 rounded-full bg-green-400 opacity-75 animate-ping"></span>
      </button>
    </div>
  );
};

export default WhatsAppButton;
