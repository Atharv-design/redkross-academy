import React from 'react';
import { Search, Filter, Plus } from 'lucide-react';

export default function CourseHeader({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  onStartCreateNew
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0E0C09] border border-[#FF7A00]/25 shadow-xl">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <span>Curriculum & Course Management</span>
        </h1>
        <p className="text-xs text-[#A3907C] font-mono">
          Deploy, configure, and inspect academic courses, modules, and 20-question module exams.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#FF7A00] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses..."
            className="pl-8 pr-3 py-1.5 bg-[#080705] text-xs font-mono text-white rounded-xl border border-[#FF7A00]/25 focus:outline-none focus:border-[#FF7A00]"
          />
        </div>

        <div className="relative">
          <Filter className="w-3.5 h-3.5 text-[#FF7A00] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-8 pr-3 py-1.5 bg-[#080705] text-xs font-mono text-white rounded-xl border border-[#FF7A00]/25 focus:outline-none focus:border-[#FF7A00] cursor-pointer"
          >
            <option value="ALL">All Status</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
          </select>
        </div>

        <button
          type="button"
          onClick={onStartCreateNew}
          className="px-4 py-1.5 bg-[#FF7A00] hover:bg-[#FFA439] text-[#071018] text-xs font-mono font-bold rounded-xl flex items-center space-x-1.5 transition-all shadow-[0_0_20px_rgba(255,122,0,0.3)] cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Course</span>
        </button>
      </div>
    </div>
  );
}
