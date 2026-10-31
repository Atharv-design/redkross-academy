import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Clock, Award, Star, Filter, ArrowRight, Coins, Sparkles, Shield, Lock, Terminal } from 'lucide-react';
import { apiClient } from '../../services/apiClient';
import { useAuth } from '../../services/auth/authContext';
import { socketClient } from '../../services/socket/socketClient';
import { mockEngine } from '../../services/db/mockEngine';
import CourseCardVariant from '../../components/cards/CourseCardVariant';

/**
 * Course Catalog Directory (Phase 3 & Phase 7)
 * Respects centralized `publicCourseCatalogEnabled` setting.
 * When catalog is disabled (default), renders the official "Courses will be out soon" empty state.
 */
export default function CourseCatalogPage() {
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === 'super_admin';

  const [courses, setCourses] = useState([]);
  const [catalogEnabled, setCatalogEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPricing, setSelectedPricing] = useState('All');

  useEffect(() => {
    const fetchCatalog = () => {
      apiClient.getCourses(isAdmin).then((data) => {
        setCourses(data.courses || []);
        setCatalogEnabled(Boolean(data.public_catalog_enabled) || isAdmin);
        setLoading(false);
      }).catch(() => {
        setCourses([]);
        setCatalogEnabled(false);
        setLoading(false);
      });
    };

    fetchCatalog();

    // Real-Time Event Sync: Admin course deletion or creation reflects immediately
    const unsubSocket = socketClient.on('course:mutation', fetchCatalog);
    const unsubMock = mockEngine.subscribe(fetchCatalog);

    return () => {
      if (typeof unsubSocket === 'function') unsubSocket();
      if (typeof unsubMock === 'function') unsubMock();
    };
  }, [isAdmin]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDifficulty =
        selectedDifficulty === 'All' || course.difficulty === selectedDifficulty;

      const matchesCategory =
        selectedCategory === 'All' || course.category === selectedCategory;

      const matchesPricing =
        selectedPricing === 'All' ||
        (selectedPricing === 'Free' && course.price === 0) ||
        (selectedPricing === 'Paid' && course.price > 0);

      return matchesSearch && matchesDifficulty && matchesCategory && matchesPricing;
    });
  }, [courses, searchQuery, selectedDifficulty, selectedCategory, selectedPricing]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <BookOpen className="w-10 h-10 text-[#65F58A] animate-pulse" />
          <div className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
            Loading Catalog Status...
          </div>
        </div>
      </div>
    );
  }

  // Strict Phase 3.1 & 3.3: Empty-State when Catalog is Disabled
  if (!catalogEnabled) {
    return (
      <div className="min-h-[82vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl w-full text-center space-y-8 ultra-glass-card rounded-3xl p-8 sm:p-14 shimmer-lr animate-slide-left border border-[#65F58A]/35 backdrop-blur-2xl bg-[#081a13]/60 shadow-[0_12px_45px_rgba(0,0,0,0.55)]">
          {/* Subtle Cyber Status Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full ultra-glass-pill text-xs font-mono shadow-md backdrop-blur-md border border-[#65F58A]/30 bg-[#09241a]/60">
            <span className="w-2 h-2 rounded-full bg-[#35E6B5] animate-pulse" />
            <span className="text-[#C9EFE0]">CURRICULUM PREPARATION IN PROGRESS</span>
            <span className="text-[#65F58A]/40">•</span>
            <span className="text-[#65F58A] font-semibold">REDKROSS ACADEMY</span>
          </div>

          {/* Refined Cyber Visual Illustration (Geometric Security Node) */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto flex items-center justify-center my-4">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#65F58A]/15 via-[#35E6B5]/15 to-transparent blur-2xl" />

            <svg viewBox="0 0 200 200" className="w-full h-full relative z-10 drop-shadow-[0_0_25px_rgba(101,245,138,0.25)]">
              {/* Concentric Coordinate Rings */}
              <circle cx="100" cy="100" r="88" fill="none" stroke="#65F58A" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.25" />
              <circle cx="100" cy="100" r="70" fill="none" stroke="#35E6B5" strokeWidth="1" strokeOpacity="0.4" />
              <circle cx="100" cy="100" r="50" fill="#071912" stroke="#65F58A" strokeWidth="1.5" />

              {/* Orbital Cyber Nodes */}
              <circle cx="100" cy="12" r="4" fill="#65F58A" />
              <circle cx="100" cy="188" r="4" fill="#65F58A" />
              <circle cx="12" cy="100" r="4" fill="#35E6B5" />
              <circle cx="188" cy="100" r="4" fill="#35E6B5" />

              {/* Connecting Cross-hair gridlines */}
              <line x1="100" y1="20" x2="100" y2="50" stroke="#65F58A" strokeWidth="1.2" strokeOpacity="0.6" />
              <line x1="100" y1="150" x2="100" y2="180" stroke="#65F58A" strokeWidth="1.2" strokeOpacity="0.6" />
              <line x1="20" y1="100" x2="50" y2="100" stroke="#35E6B5" strokeWidth="1.2" strokeOpacity="0.6" />
              <line x1="150" y1="100" x2="180" y2="100" stroke="#35E6B5" strokeWidth="1.2" strokeOpacity="0.6" />

              {/* Central Shield Icon Graphic */}
              <path
                d="M 100 70 L 122 80 V 98 C 122 114 100 126 100 126 C 100 126 78 114 78 98 V 80 Z"
                fill="#09261a"
                stroke="#65F58A"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              {/* Center Lock / Keyhole */}
              <circle cx="100" cy="94" r="4" fill="#35E6B5" />
              <line x1="100" y1="98" x2="100" y2="105" stroke="#35E6B5" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Exact Primary Message & Supporting Copy */}
          <div className="space-y-4 max-w-2xl mx-auto animate-slide-left stagger-1">
            <h1 className="font-royal text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight title-shading-neon">
              Courses will be out soon
            </h1>

            <p className="text-sm sm:text-base text-[#B8E6CE] leading-relaxed max-w-xl mx-auto">
              We're preparing structured cybersecurity learning paths to help you build practical skills, strengthen your knowledge, and progress toward your goals. Stay tuned for upcoming releases.
            </p>
          </div>

          {/* Educational Framework Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 max-w-2xl mx-auto text-left animate-slide-left stagger-2">
            <div className="p-4 rounded-xl ultra-glass-panel space-y-1.5 border border-[#65F58A]/25 bg-[#092218]/50 backdrop-blur-md">
              <div className="w-7 h-7 rounded-lg bg-[#65F58A]/10 border border-[#65F58A]/30 flex items-center justify-center">
                <Terminal className="w-3.5 h-3.5 text-[#65F58A]" />
              </div>
              <div className="font-royal text-xs font-bold text-white">Hands-on Telemetry</div>
              <p className="text-[11px] text-[#B8E6CE] leading-relaxed">
                Real-world log correlation across SIEM and defensive monitoring stacks.
              </p>
            </div>

            <div className="p-4 rounded-xl ultra-glass-panel space-y-1.5 border border-[#35E6B5]/25 bg-[#092218]/50 backdrop-blur-md">
              <div className="w-7 h-7 rounded-lg bg-[#35E6B5]/10 border border-[#35E6B5]/30 flex items-center justify-center">
                <Shield className="w-3.5 h-3.5 text-[#35E6B5]" />
              </div>
              <div className="font-royal text-xs font-bold text-white">Adversary Mapping</div>
              <p className="text-[11px] text-[#B8E6CE] leading-relaxed">
                Curricula aligned strictly with MITRE ATT&CK defensive methodologies.
              </p>
            </div>

            <div className="p-4 rounded-xl ultra-glass-panel space-y-1.5 border border-[#65F58A]/25 bg-[#092218]/50 backdrop-blur-md">
              <div className="w-7 h-7 rounded-lg bg-[#65F58A]/10 border border-[#65F58A]/30 flex items-center justify-center">
                <Award className="w-3.5 h-3.5 text-[#65F58A]" />
              </div>
              <div className="font-royal text-xs font-bold text-white">Tamper-Proof Proofs</div>
              <p className="text-[11px] text-[#B8E6CE] leading-relaxed">
                Cryptographically verified credentials on the public registry.
              </p>
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-left stagger-3">
            <Link
              to="/verify"
              className="w-full sm:w-auto px-6 py-3 rounded-full ultra-glass-btn-secondary text-xs font-mono text-[#C9EFE0] hover:text-white transition-all flex items-center justify-center gap-2 border border-[#65F58A]/30 bg-[#09241a]/60 hover:bg-[#0c3123]"
            >
              <Award className="w-4 h-4 text-[#65F58A]" />
              <span>Verify Institutional Credentials</span>
            </Link>
            <Link
              to="/paths"
              className="w-full sm:w-auto px-6 py-3 rounded-full ultra-glass-btn font-royal font-bold text-xs tracking-wider transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(101,245,138,0.25)] hover:shadow-[0_0_30px_rgba(101,245,138,0.4)]"
            >
              <span>Explore Cyber Intelligence</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Active Catalog View (when explicitly enabled by Super Admin)
  return (
    <div className="min-h-screen py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Section */}
        <div className="max-w-3xl animate-slide-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full ultra-glass-pill text-xs font-mono mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>OFFICIAL CURRICULUM DIRECTORY</span>
          </div>
          <h1 className="font-royal text-3xl sm:text-4xl lg:text-5xl font-extrabold title-shading-neon tracking-tight mb-4">
            Defensive Security Course Directory
          </h1>
          <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
            Explore modular, rigorous courses built to take you from foundational telemetry to specialized incident response and threat hunting operations.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="ultra-glass-panel rounded-2xl p-4 sm:p-6 space-y-4 animate-slide-left stagger-1">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search by topic, skill, or framework (e.g. SOC, SIEM, MITRE, Wireshark)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl ultra-glass-input text-xs sm:text-sm text-white placeholder-[#64748B] font-mono focus:outline-none"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 rounded-xl ultra-glass-input text-xs font-mono text-slate-300 focus:outline-none bg-[#0a111a]"
              >
                <option value="All">All Difficulties</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>

              <select
                value={selectedPricing}
                onChange={(e) => setSelectedPricing(e.target.value)}
                className="px-3 py-2 rounded-xl ultra-glass-input text-xs font-mono text-slate-300 focus:outline-none bg-[#0a111a]"
              >
                <option value="All">All Access</option>
                <option value="Free">Free to Learn</option>
                <option value="Paid">Certification Tracks</option>
              </select>

              {(searchQuery || selectedDifficulty !== 'All' || selectedPricing !== 'All') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDifficulty('All');
                    setSelectedPricing('All');
                  }}
                  className="px-3 py-2 rounded-xl ultra-glass-btn-secondary text-xs font-mono text-[#65F58A] hover:bg-[#263440] transition-colors"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 10 Unique Distinct Course Cards Display using their stored card_variant */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-slide-left stagger-2">
            {filteredCourses.map((course) => (
              <CourseCardVariant
                key={course.id}
                course={course}
                variantId={course.card_variant}
              />
            ))}
          </div>
        ) : (
          <div className="ultra-glass-panel rounded-2xl p-12 text-center space-y-4 animate-slide-left">
            <BookOpen className="w-12 h-12 text-[#94A3B8] mx-auto opacity-50" />
            <h3 className="font-royal text-xl font-bold text-white">No Courses Found</h3>
            <p className="text-xs text-[#94A3B8] max-w-sm mx-auto">
              No defensive courses match your current search filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
