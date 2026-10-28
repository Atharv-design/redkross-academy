import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, BookOpen, Clock, Award, Star, Filter, ArrowRight, Coins } from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';

export default function CourseCatalogPage() {
  const allCourses = mockEngine.getCourses();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPricing, setSelectedPricing] = useState('All');

  const filteredCourses = useMemo(() => {
    return allCourses.filter((course) => {
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
  }, [allCourses, searchQuery, selectedDifficulty, selectedCategory, selectedPricing]);

  return (
    <div className="min-h-screen bg-[#090D16] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-redkross-600/10 border border-redkross-600/30 text-redkross-400 text-xs font-mono mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>OFFICIAL CURRICULUM CATALOGUE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Defensive Security Course Directory
          </h1>
          <p className="text-slate-300 text-sm">
            Explore 10 modular, rigorous courses built to take you from security fundamentals to specialized incident response and threat hunting operations.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-surface-card border border-surface-border rounded-xl p-5 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search courses, skills, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-surface-100 border border-surface-border rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:border-redkross-500 font-mono"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {/* Difficulty Dropdown */}
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 bg-surface-100 border border-surface-border rounded-lg text-xs font-mono text-slate-300 focus:outline-none focus:border-redkross-500"
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
                className="px-3 py-2 bg-surface-100 border border-surface-border rounded-lg text-xs font-mono text-slate-300 focus:outline-none focus:border-redkross-500"
              >
                <option value="All">All Pricing Tiers</option>
                <option value="Free">Free to Enrol</option>
                <option value="Paid">Paid / Specialist</option>
              </select>

              {/* Reset Filters */}
              {(searchQuery || selectedDifficulty !== 'All' || selectedPricing !== 'All') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDifficulty('All');
                    setSelectedPricing('All');
                  }}
                  className="px-3 py-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((crs) => (
            <div
              key={crs.id}
              className="bg-surface-card border border-surface-border hover:border-slate-700 rounded-xl p-6 shadow-lg flex flex-col justify-between transition-all hover:shadow-2xl group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-100 text-slate-300 border border-surface-border">
                      {crs.difficulty}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-100 text-slate-400 border border-surface-border">
                      v{crs.version}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-amber-400 font-mono">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{crs.rating}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-redkross-400 transition-colors">
                  {crs.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                  {crs.overview}
                </p>

                {/* Meta details */}
                <div className="space-y-2 mb-4 pt-3 border-t border-surface-border/60 text-[11px] text-slate-400 font-mono">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{crs.estimated_duration}</span>
                    </span>
                    <span className="flex items-center space-x-1 text-amber-400">
                      <Coins className="w-3.5 h-3.5" />
                      <span>+{crs.total_tokens_reward} Tokens Bounty</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Enrolled: {crs.enrolled_count.toLocaleString()} Students</span>
                    <span className={crs.price === 0 ? 'text-emerald-400 font-bold' : 'text-slate-200 font-bold'}>
                      {crs.price === 0 ? 'FREE ENROLMENT' : `₹${crs.price}`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-surface-border flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img
                    src={crs.lead_author.avatar}
                    alt={crs.lead_author.name}
                    className="w-6 h-6 rounded-full border border-slate-600 object-cover"
                  />
                  <span className="text-xs text-slate-300 font-medium truncate max-w-[130px]">
                    {crs.lead_author.name}
                  </span>
                </div>

                <Link
                  to={`/courses/${crs.slug}`}
                  className="px-3.5 py-1.5 rounded-lg bg-surface-100 hover:bg-redkross-600 hover:text-white text-xs font-semibold text-slate-200 transition-all flex items-center space-x-1.5"
                >
                  <span>Syllabus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-16 bg-surface-card border border-surface-border rounded-xl">
            <p className="text-slate-400 text-sm">No courses found matching your search and filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
