import React from 'react';
import {
  Sparkles,
  Shield,
  Minus,
  X,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Lock,
  ShoppingCart
} from 'lucide-react';

export default function LabBrowserWindow({
  onClose,
  browserTab,
  setBrowserTab,
  setJuiceNotification,
  juiceSearchQuery,
  setJuiceSearchQuery,
  juiceCartCount,
  setJuiceCartCount,
  filteredJuiceProducts,
  dvwaIsLoggedIn,
  handleDvwaLogin,
  dvwaUsername,
  setDvwaUsername,
  dvwaPassword,
  setDvwaPassword,
  dvwaSqliId,
  setDvwaSqliId,
  handleDvwaSqliSubmit,
  dvwaSqliResult
}) {
  return (
    <div className="absolute inset-3 sm:inset-6 z-20 flex flex-col rounded-xl overflow-hidden border border-[#00AEEF]/40 bg-[#141e2e] shadow-[0_25px_60px_rgba(0,0,0,0.95)] animate-fadeIn">
      {/* Browser Window Titlebar with Close Cross (X), Tabs */}
      <div className="h-9 px-3 bg-[#0c1624] border-b border-black/40 flex items-center justify-between text-xs flex-shrink-0">
        <div className="flex items-center space-x-1 overflow-x-auto">
          <button
            type="button"
            onClick={() => setBrowserTab('juiceshop')}
            className={`px-3 py-1 rounded-t-lg text-xs font-mono flex items-center space-x-1.5 transition-all cursor-pointer ${
              browserTab === 'juiceshop'
                ? 'bg-[#1b283a] text-white font-bold border-t-2 border-amber-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>OWASP Juice Shop</span>
          </button>

          <button
            type="button"
            onClick={() => setBrowserTab('dvwa')}
            className={`px-3 py-1 rounded-t-lg text-xs font-mono flex items-center space-x-1.5 transition-all cursor-pointer ${
              browserTab === 'dvwa'
                ? 'bg-[#1b283a] text-white font-bold border-t-2 border-[#FF7A00]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-[#FFA439]" />
            <span>DVWA</span>
          </button>

          <button
            type="button"
            onClick={() => setBrowserTab('webgoat')}
            className={`px-2.5 py-1 rounded-t-lg text-xs font-mono transition-all cursor-pointer ${
              browserTab === 'webgoat'
                ? 'bg-[#1b283a] text-white font-bold border-t-2 border-[#00AEEF]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            WebGoat
          </button>
        </div>

        {/* Window Close Cross (X) */}
        <div className="flex items-center space-x-1.5">
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded hover:bg-white/10 text-gray-400 hover:text-white"
            title="Minimize to Desktop"
          >
            <Minus className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md bg-rose-600/80 hover:bg-rose-600 text-white transition-colors cursor-pointer"
            title="Close Browser (Return to Clean Desktop)"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Browser Navigation Bar */}
      <div className="px-3 py-1.5 bg-[#101b2a] border-b border-black/30 flex items-center space-x-2 text-xs">
        <button type="button" className="p-1 rounded hover:bg-white/10 text-gray-400">
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <button type="button" className="p-1 rounded hover:bg-white/10 text-gray-400">
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => {
            setJuiceNotification('Browser reloaded.');
            setTimeout(() => setJuiceNotification(null), 1500);
          }}
          className="p-1 rounded hover:bg-white/10 text-gray-300"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        <div className="flex-1 px-3 py-1 rounded-lg bg-[#070e18] border border-white/10 flex items-center space-x-2 text-xs font-mono text-gray-200">
          <Lock className="w-3 h-3 text-[#35E6B5]" />
          <span className="truncate">
            {browserTab === 'juiceshop'
              ? 'http://10.10.11.120:3000/#/'
              : browserTab === 'dvwa'
              ? 'http://10.10.11.110/login.php'
              : 'http://10.10.11.130:8080/WebGoat'}
          </span>
        </div>
      </div>

      {/* Browser Viewport Content */}
      <div className="flex-1 overflow-y-auto bg-[#182332] text-gray-100 font-sans">
        {/* TAB 1: JUICE SHOP */}
        {browserTab === 'juiceshop' && (
          <div className="min-h-full flex flex-col">
            <header className="h-11 px-4 bg-[#3949ab] flex items-center justify-between shadow">
              <div className="flex items-center space-x-2 font-bold text-white text-sm">
                <span className="px-1.5 py-0.5 rounded bg-amber-400 text-black text-xs font-mono font-black">
                  JS
                </span>
                <span>OWASP Juice Shop</span>
              </div>
              <div className="flex items-center space-x-3 text-xs">
                <input
                  type="text"
                  value={juiceSearchQuery}
                  onChange={(e) => setJuiceSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-32 sm:w-44 px-2 py-0.5 rounded bg-[#283593] text-white placeholder-gray-300 text-xs focus:outline-none"
                />
                <div className="flex items-center gap-1 cursor-pointer">
                  <ShoppingCart className="w-4 h-4 text-white" />
                  <span>{juiceCartCount}</span>
                </div>
              </div>
            </header>

            <div className="p-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-w-4xl mx-auto">
                {filteredJuiceProducts.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-xl overflow-hidden bg-[#222f42] border border-white/10 p-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-xs text-white">{p.name}</h4>
                        <span className="text-amber-400 font-bold text-xs">¤ {p.price}</span>
                      </div>
                      <p className="text-[11px] text-gray-300 pt-1">{p.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setJuiceCartCount((c) => c + 1)}
                      className="mt-3 w-full py-1 rounded bg-amber-400 text-black font-bold text-xs hover:bg-amber-300 cursor-pointer"
                    >
                      Add to Basket
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DVWA */}
        {browserTab === 'dvwa' && (
          <div className="min-h-full p-4 bg-[#f4f6f8] text-[#222]">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow border p-5 font-sans">
              <div className="flex items-center justify-between border-b pb-3 mb-4">
                <div className="font-black text-lg text-[#2d3748]">
                  DV<span className="text-[#38a169]">WA</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#38a169]">
                  {dvwaIsLoggedIn ? 'AUTHENTICATED' : 'GUEST'}
                </span>
              </div>

              {!dvwaIsLoggedIn ? (
                <form onSubmit={handleDvwaLogin} className="space-y-3 font-mono text-xs">
                  <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded">
                    Default Credentials: admin / password
                  </p>
                  <input
                    type="text"
                    value={dvwaUsername}
                    onChange={(e) => setDvwaUsername(e.target.value)}
                    placeholder="Username"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="password"
                    value={dvwaPassword}
                    onChange={(e) => setDvwaPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full p-2 border rounded"
                  />
                  <button type="submit" className="w-full p-2 bg-[#38a169] text-white font-bold rounded cursor-pointer">
                    Login
                  </button>
                </form>
              ) : (
                <div className="space-y-3 font-mono text-xs">
                  <h4 className="font-bold text-sm">SQL Injection Lab</h4>
                  <p className="text-[11px] text-gray-600">Payload test: <code>1' OR '1'='1</code></p>
                  <form onSubmit={handleDvwaSqliSubmit} className="flex gap-2">
                    <input
                      type="text"
                      value={dvwaSqliId}
                      onChange={(e) => setDvwaSqliId(e.target.value)}
                      className="flex-1 p-2 border rounded"
                    />
                    <button type="submit" className="px-4 py-2 bg-[#38a169] text-white font-bold rounded cursor-pointer">
                      Submit
                    </button>
                  </form>
                  {dvwaSqliResult && (
                    <div className="p-2.5 bg-gray-50 border rounded text-[11px]">
                      {dvwaSqliResult.map((u, i) => (
                        <div key={i}>ID: {u.id} | User: {u.first_name} | Surname: {u.surname}</div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: WEBGOAT */}
        {browserTab === 'webgoat' && (
          <div className="p-5 font-mono text-xs text-gray-200">
            <h3 className="font-bold text-sm text-[#FFA439]">OWASP WebGoat (10.10.11.130:8080)</h3>
            <p className="text-gray-400 pt-1">Java Vulnerability Benchmark</p>
          </div>
        )}
      </div>
    </div>
  );
}
