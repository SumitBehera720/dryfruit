'use client';

import React, { useEffect, useState } from 'react';

export default function WhatsAppButton() {
  const [whatsappNumber, setWhatsappNumber] = useState('');

  useEffect(() => {
    fetch('/api/settings')
      .then(async (res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data && data.whatsapp_number) {
          const cleanNum = data.whatsapp_number.replace(/[^\d+]/g, '');
          setWhatsappNumber(cleanNum);
        }
      })
      .catch(() => {});
  }, []);

  if (!whatsappNumber) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 font-sans group">
      {/* Premium Tooltip Speech Bubble */}
      <div className="hidden md:block bg-white text-zinc-900 text-[11px] font-bold uppercase tracking-widest px-4 py-2.5 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-zinc-100 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
        Need Help? Chat with us
      </div>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25d366] text-white rounded-full shadow-[0_8px_30px_rgb(37,211,102,0.4)] hover:bg-[#20ba5a] transition-all duration-300 hover:scale-110 flex items-center justify-center relative focus:outline-none"
        aria-label="Chat on WhatsApp"
      >
        <svg
          className="w-7 h-7 fill-white"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.031 2c-5.514 0-9.969 4.456-9.969 9.971 0 1.761.459 3.479 1.329 5.005L2 22l5.187-1.36c1.47.8 3.119 1.226 4.807 1.228h.004c5.513 0 9.967-4.455 9.967-9.971C21.965 6.456 17.52 2 12.031 2zm0 17.185c-1.503 0-2.977-.404-4.264-1.168l-.305-.182-3.172.833.847-3.093-.2-.319c-.838-1.336-1.28-2.879-1.28-4.485.004-4.665 3.8-8.461 8.474-8.461 2.261 0 4.387.882 5.986 2.485 1.599 1.603 2.48 3.73 2.478 5.987-.004 4.666-3.801 8.463-8.464 8.463zm4.646-6.33c-.255-.127-1.505-.742-1.737-.827-.233-.086-.402-.128-.57.127-.17.255-.658.827-.807.997-.15.17-.298.19-.553.063-.255-.127-1.077-.397-2.052-1.267-.758-.677-1.27-1.514-1.419-1.768-.15-.254-.016-.392.112-.519.115-.114.255-.297.382-.446.128-.15.17-.254.255-.424.085-.17.042-.318-.021-.446-.064-.127-.57-1.37-.781-1.879-.206-.497-.413-.43-.57-.438-.148-.008-.318-.008-.488-.008-.17 0-.446.064-.679.318-.233.255-.892.871-.892 2.122 0 1.25.91 2.46 1.037 2.63.128.17 1.79 2.733 4.336 3.827.606.26 1.079.416 1.448.533.608.193 1.162.166 1.6.1.488-.072 1.505-.615 1.717-1.209.213-.594.213-1.103.149-1.209-.064-.106-.233-.17-.488-.297z" />
        </svg>
        <span className="absolute inset-0 rounded-full border-4 border-[#25d366] opacity-0 group-hover:animate-ping z-[-1]" />
      </a>
    </div>
  );
}
