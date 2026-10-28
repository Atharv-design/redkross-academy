import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Clock, Award, Star, Filter, ArrowRight, Coins, Sparkles, Shield } from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';
import { apiClient } from '../../services/apiClient';
import CourseCardVariant from '../../components/cards/CourseCardVariant';

export default function CourseCatalogPage() {
  const [courses, setCourses] = useState(mockEngine.getCourses());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPricing, setSelectedPricing] = useState('All');

  useEffect(() => {
    // Load live courses from Neon PostgreSQL
    apiClient.getCourses().then((data) => {
      if (data && data.length > 0) setCourses(data);
    });
  }, []);

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
            Explore 10 modular, rigorous courses built to take you from foundational networking and operating system telemetry to specialized incident response and threat hunting operations.
          </p>
        </div>

        {/* Filter Controls Bar (Glassmorphic) */}
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#071018]/80 border border-[#263440] text-xs sm:text-sm text-white placeholder-[#64748B] font-mono focus:outline-none focus:border-[#65F58A] transition-colors"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Difficulty Dropdown */}
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#071018]/80 border border-[#263440] text-xs font-mono text-slate-300 focus:outline-none focus:border-[#65F58A]"
              >
                <option value="All">All Difficulties</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>

              {/* Pricing Filter */}
              <select
                value={selectedPricing}
                onChange={(e) => setSelectedPricing(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#071018]/80 border border-[#263440] text-xs font-mono text-slate-300 focus:outline-none focus:border-[#65F58A]"
              >
                <option value="All">All Access</option>
                <option value="Free">Free to Learn</option>
                <option value="Paid">Certification Tracks</option>
              </select>

              {/* Reset Button */}
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

        {/* 10 Unique Distinct Course Cards Display */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCourses.map((course, idx) => (
              <CourseCardVariant
                key={course.id || idx}
                course={course}
                variantIndex={idx}
              />
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-12 text-center space-y-4">
            <BookOpen className="w-12 h-12 text-[#94A3B8] mx-auto opacity-50" />
            <h3 className="font-royal text-xl font-bold text-white">No Courses Found</h3>
            <p className="text-xs text-[#94A3B8] max-w-sm mx-auto">
              No defensive courses match your current search filters. Try resetting the filters or searching for terms like "SOC", "Linux", or "Incident".
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
