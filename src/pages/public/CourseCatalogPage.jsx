import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Clock, Award, Star, Filter, ArrowRight, Coins, Sparkles, Shield, Lock } from 'lucide-react';
import { apiClient } from '../../services/apiClient';
import { useAuth } from '../../services/auth/authContext';
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
    // Fetch courses with authorization header
    apiClient.getCourses(isAdmin).then((data) => {
      setCourses(data.courses || []);
      setCatalogEnabled(Boolean(data.public_catalog_enabled) || isAdmin);
      setLoading(false);
    }).catch(() => {
      setCourses([]);
      setCatalogEnabled(false);
      setLoading(false);
    });
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
      <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl w-full text-center space-y-8">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#101923] border border-[#263440] text-xs font-mono">
            <Lock className="w-3.5 h-3.5 text-[#35E6B5]" />
            <span className="text-[#94A3B8]">CATALOG STATUS: EMBARGO / UPCOMING</span>
          </div>

          <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-[#65F58A]/10 blur-xl" />
            <div className="w-24 h-24 rounded-2xl bg-[#101923] border border-[#263440] flex items-center justify-center shadow-xl relative z-10">
              <BookOpen className="w-12 h-12 text-[#65F58A]" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="font-royal text-3xl sm:text-5xl font-extrabold text-white tracking-tight title-shading-neon">
              Courses will be out soon
            </h1>
            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-lg mx-auto">
              We're preparing structured cybersecurity learning paths to help you build practical skills, strengthen your knowledge, and progress toward your goals. Stay tuned for upcoming releases.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/paths"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#1B2530] hover:bg-[#263440] border border-[#263440] text-xs font-mono text-white transition-colors"
            >
              View Learning Paths Status
            </Link>
            <Link
              to="/verify"
              className="w-full sm:w-auto px-6 py-3 rounded-full glass-button-primary font-royal font-bold text-xs"
            >
              Verify Credentials
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
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#65F58A]/10 border border-[#65F58A]/30 text-[#65F58A] text-xs font-mono mb-4">
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
        <div className="glass-card rounded-2xl p-4 sm:p-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search by topic, skill, or framework (e.g. SOC, SIEM, MITRE, Wireshark)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm text-white placeholder-[#64748B] font-mono focus:outline-none transition-colors"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 rounded-xl glass-input text-xs font-mono text-slate-300 focus:outline-none"
              >
                <option value="All" className="bg-[#101923] text-white">All Difficulties</option>
                <option value="Beginner" className="bg-[#101923] text-white">Beginner</option>
                <option value="Intermediate" className="bg-[#101923] text-white">Intermediate</option>
                <option value="Advanced" className="bg-[#101923] text-white">Advanced</option>
              </select>

              <select
                value={selectedPricing}
                onChange={(e) => setSelectedPricing(e.target.value)}
                className="px-3 py-2 rounded-xl glass-input text-xs font-mono text-slate-300 focus:outline-none"
              >
                <option value="All" className="bg-[#101923] text-white">All Access</option>
                <option value="Free" className="bg-[#101923] text-white">Free to Learn</option>
                <option value="Paid" className="bg-[#101923] text-white">Certification Tracks</option>
              </select>

              {(searchQuery || selectedDifficulty !== 'All' || selectedPricing !== 'All') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDifficulty('All');
                    setSelectedPricing('All');
                  }}
                  className="px-3 py-2 rounded-xl bg-[#1B2530] text-xs font-mono text-[#65F58A] hover:bg-[#263440] transition-colors"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 10 Unique Distinct Course Cards Display using their stored card_variant */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCourses.map((course) => (
              <CourseCardVariant
                key={course.id}
                course={course}
                variantId={course.card_variant}
              />
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-12 text-center space-y-4">
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
