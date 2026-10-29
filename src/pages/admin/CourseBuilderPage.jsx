import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Plus,
  Save,
  ChevronLeft,
  CheckCircle2,
  Layers,
  Award,
  Sparkles,
  ArrowRight,
  Shield,
  Clock,
  Shuffle
} from 'lucide-react';
import { apiClient } from '../../services/apiClient';
import { useAuth } from '../../services/auth/authContext';
import CourseCardVariant from '../../components/cards/CourseCardVariant';

/**
 * Course Builder & Curriculum Studio (Phase 4 & Phase 7)
 * Implements persistent random variant assignment (variant-01 through variant-10)
 * and interactive preview of all 10 distinct card designs.
 */
export default function CourseBuilderPage() {
  const { currentUser } = useAuth();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // New Course Modal Form State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [newCategory, setNewCategory] = useState('SOC Operations');
  const [newDifficulty, setNewDifficulty] = useState('Intermediate');
  const [newDuration, setNewDuration] = useState('16 Hours');
  const [newOverview, setNewOverview] = useState('');
  const [newMilestoneCert, setNewMilestoneCert] = useState('');
  const [newSkills, setNewSkills] = useState('');
  const [newArtPreset, setNewArtPreset] = useState('auto');
  const [creating, setCreating] = useState(false);
  const [createNotice, setCreateNotice] = useState('');

  const loadCourses = async () => {
    try {
      const res = await apiClient.getCourses(true);
      if (res && res.courses) {
        setCourses(res.courses);
        if (!selectedCourse && res.courses.length > 0) {
          setSelectedCourse(res.courses[0]);
        }
      }
    } catch (err) {
      console.error('Failed to load courses in builder:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    if (!newTitle || !newSlug) return;
    setCreating(true);
    setCreateNotice('');

    try {
      const presets = [
        { id: 'variant-01', art: '/assets/course-art/art-01.jpg', artPos: '72% 30%' },
        { id: 'variant-02', art: '/assets/course-art/art-02.jpg', artPos: '74% 28%' },
        { id: 'variant-03', art: '/assets/course-art/art-03.jpg', artPos: '75% 30%' },
        { id: 'variant-04', art: '/assets/course-art/art-04.jpg', artPos: '75% 35%' },
        { id: 'variant-05', art: '/assets/course-art/art-05.jpg', artPos: '75% 32%' },
        { id: 'variant-06', art: '/assets/course-art/art-06.jpg', artPos: '80% 25%' },
        { id: 'variant-07', art: '/assets/course-art/art-07.jpg', artPos: '78% 28%' },
        { id: 'variant-08', art: '/assets/course-art/art-08.jpg', artPos: '80% 25%' },
        { id: 'variant-09', art: '/assets/course-art/art-09.jpg', artPos: '76% 30%' },
        { id: 'variant-10', art: '/assets/course-art/art-10.jpg', artPos: '76% 25%' },
      ];

      const chosenPreset = newArtPreset !== 'auto'
        ? (presets.find((p) => p.id === newArtPreset) || presets[0])
        : presets[Math.floor(Math.random() * presets.length)];

      const parsedSkills = newSkills.trim()
        ? newSkills.split(',').map((s) => s.trim()).filter(Boolean)
        : ['Threat Detection', 'Incident Containment', 'Defensive Hardening', 'Telemetry Analysis'];

      const result = await apiClient.createCourse({
        title: newTitle,
        slug: newSlug.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: newCategory,
        difficulty: newDifficulty,
        estimated_duration: newDuration,
        overview: newOverview || `Enterprise defensive curriculum designed by RedKross Academy for ${newTitle}.`,
        card_variant: chosenPreset.id,
        art: chosenPreset.art,
        artPos: chosenPreset.artPos,
        milestone_cert: newMilestoneCert.trim() || `Certified ${newTitle.split(' ')[0]} Specialist`,
        skills: parsedSkills,
        learning_objectives: parsedSkills.map((s) => `Master ${s} in defensive scenarios`)
      });

      setCreateNotice(`✅ Course created! Applied 3D design: ${result.card_variant || chosenPreset.id}`);
      await loadCourses();
      setShowCreateModal(false);
      setNewTitle('');
      setNewSlug('');
      setNewOverview('');
      setNewMilestoneCert('');
      setNewSkills('');
      setNewArtPreset('auto');
      setTimeout(() => setCreateNotice(''), 5000);
    } catch (err) {
      console.error('Failed to create course:', err);
      setCreateNotice(`❌ Error creating course: ${err.message}`);
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <BookOpen className="w-10 h-10 text-[#65F58A] animate-pulse" />
          <div className="text-xs font-mono text-[#94A3B8] uppercase">Loading Course Studio...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto space-y-8">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between pb-4 border-b border-[#263440]">
        <Link
          to="/admin"
          className="flex items-center gap-1.5 text-xs font-mono text-[#94A3B8] hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Return to Operations Console</span>
        </Link>
        <div className="text-xs font-mono text-[#94A3B8]">
          Curriculum Engine: <span className="text-[#65F58A] font-semibold">Phase 7 Dynamic Variant System</span>
        </div>
      </div>

      {/* Header and Create Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#65F58A]/10 border border-[#65F58A]/30 text-[#65F58A] text-xs font-mono mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CURRICULUM BUILDER & 3D VARIANT PREVIEW</span>
          </div>
          <h1 className="font-royal text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Course Management & Variant Preview
          </h1>
          <p className="text-xs text-[#94A3B8] max-w-2xl leading-relaxed mt-1">
            Author defensive cybersecurity courses. Every course is persistently assigned one of the 10 distinct 3D visual variants upon creation, remaining stable across sessions and viewports.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-5 py-2.5 rounded-xl glass-button-primary font-royal font-bold text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Course</span>
        </button>
      </div>

      {createNotice && (
        <div className="p-4 rounded-xl bg-[#101923] border border-[#65F58A]/40 text-xs font-mono text-[#65F58A] flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{createNotice}</span>
        </div>
      )}

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Course Selector (5 cols) */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] uppercase tracking-wider pb-2 border-b border-[#263440]">
            <span>Active Courses ({courses.length})</span>
            <span>Assigned Variant</span>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {courses.map((crs) => {
              const isSelected = selectedCourse?.id === crs.id;
              return (
                <button
                  key={crs.id}
                  onClick={() => setSelectedCourse(crs)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#1B2530] border-[#65F58A] text-white font-semibold shadow-md'
                      : 'bg-[#071018]/60 border-[#263440] text-slate-300 hover:bg-[#101923]'
                  }`}
                >
                  <div className="truncate pr-2">
                    <div className="font-royal text-xs font-bold text-white truncate">{crs.title}</div>
                    <div className="text-[10px] text-[#94A3B8] font-mono mt-0.5">{crs.difficulty} • {crs.estimated_duration}</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#101923] border border-[#263440] text-[#65F58A] flex-shrink-0">
                    {crs.card_variant || 'variant-01'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Live 3D Course Card Preview (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-card rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#263440]">
              <div className="flex items-center gap-2">
                <Shuffle className="w-4 h-4 text-[#35E6B5]" />
                <h2 className="font-royal text-sm font-bold text-white">
                  Live Persistent Card Preview
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold text-[#65F58A] bg-[#65F58A]/10 border border-[#65F58A]/30">
                {selectedCourse?.card_variant || 'variant-01'}
              </span>
            </div>

            <p className="text-xs text-[#94A3B8] leading-relaxed">
              This is the exact responsive card presentation that will be rendered when the course catalog is publicly released. Note the persistent geometry, 3D SVG illustration, and skill badges.
            </p>

            {/* Render Course Card Variant */}
            {selectedCourse && (
              <div className="max-w-md mx-auto pt-4">
                <CourseCardVariant
                  course={selectedCourse}
                  variantId={selectedCourse.card_variant}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Course Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-lg w-full glass-card rounded-2xl p-6 sm:p-8 space-y-5 border border-[#65F58A]/30">
            <div className="flex items-center justify-between pb-3 border-b border-[#263440]">
              <h3 className="font-royal text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#65F58A]" />
                <span>Author New Defensive Course</span>
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-[#94A3B8] hover:text-white font-mono text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#94A3B8] mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Advanced Threat Hunting with Velociraptor"
                  value={newTitle}
                  onChange={(e) => {
                    setNewTitle(e.target.value);
                    if (!newSlug) {
                      setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                    }
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#071018] border border-[#263440] text-xs text-white placeholder-[#64748B] font-mono focus:border-[#65F58A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-[#94A3B8] mb-1">Slug</label>
                  <input
                    type="text"
                    required
                    placeholder="threat-hunting-velociraptor"
                    value={newSlug}
                    onChange={(e) => setNewSlug(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#071018] border border-[#263440] text-xs text-white placeholder-[#64748B] font-mono focus:border-[#65F58A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#94A3B8] mb-1">Duration</label>
                  <input
                    type="text"
                    placeholder="18 Hours"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#071018] border border-[#263440] text-xs text-white placeholder-[#64748B] font-mono focus:border-[#65F58A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-[#94A3B8] mb-1">Difficulty</label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#071018] border border-[#263440] text-xs text-white font-mono"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#94A3B8] mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#071018] border border-[#263440] text-xs text-white font-mono"
                  >
                    <option value="SOC Operations">SOC Operations</option>
                    <option value="Digital Forensics">Digital Forensics</option>
                    <option value="Incident Response">Incident Response</option>
                    <option value="Cloud Security">Cloud Security</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#94A3B8] mb-1">Overview Description</label>
                <textarea
                  rows={2}
                  placeholder="Comprehensive hands-on training for forensic triage and host interrogation..."
                  value={newOverview}
                  onChange={(e) => setNewOverview(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#071018] border border-[#263440] text-xs text-white placeholder-[#64748B] font-mono focus:border-[#65F58A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-[#94A3B8] mb-1">Milestone Credential</label>
                  <input
                    type="text"
                    placeholder="e.g. Certified SOC Analyst"
                    value={newMilestoneCert}
                    onChange={(e) => setNewMilestoneCert(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#071018] border border-[#263440] text-xs text-white placeholder-[#64748B] font-mono focus:border-[#65F58A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-[#94A3B8] mb-1">Skills Validated (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="SIEM, Log Triage, Wireshark, Volatility"
                    value={newSkills}
                    onChange={(e) => setNewSkills(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#071018] border border-[#263440] text-xs text-white placeholder-[#64748B] font-mono focus:border-[#65F58A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#94A3B8] mb-1">3D Cyber Artwork Design</label>
                <select
                  value={newArtPreset}
                  onChange={(e) => setNewArtPreset(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#071018] border border-[#263440] text-xs text-white font-mono focus:border-[#65F58A]"
                >
                  <option value="auto">🎲 Auto-Randomize (Choose from 10 3D Cyber Artworks)</option>
                  <option value="variant-01">Art 01 — 24/7 SOC Command Center (Analyst, Globe & Screens)</option>
                  <option value="variant-02">Art 02 — Cloud Security Fortress (Padlock & Server Racks)</option>
                  <option value="variant-03">Art 03 — Defensive Architecture Shield (Geometric Panels)</option>
                  <option value="variant-04">Art 04 — Threat Incident Target (Globe & Bug Reticle)</option>
                  <option value="variant-05">Art 05 — Linux Security Terminal (Laptop with Padlock)</option>
                  <option value="variant-06">Art 06 — Digital Forensics (Biometric Fingerprint & Lens)</option>
                  <option value="variant-07">Art 07 — AI & Cognitive Security (Brain Neural Profile)</option>
                  <option value="variant-08">Art 08 — Network Telemetry (World Map with Nodes)</option>
                  <option value="variant-09">Art 09 — DevSecOps Pipeline (Infinity Nodes Loop)</option>
                  <option value="variant-10">Art 10 — Threat Defense Brain (Cyber Shield & Padlock)</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-[#071018] border border-[#263440] text-[11px] font-mono text-[#94A3B8] flex items-center gap-2">
                <Shuffle className="w-4 h-4 text-[#65F58A] flex-shrink-0" />
                <span>The assigned artwork, skills, and credential will instantly render on the course card with full glassmorphism and animations.</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#1B2530] text-xs font-mono text-[#94A3B8] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-5 py-2 rounded-xl glass-button-primary font-royal font-bold text-xs"
                >
                  {creating ? 'Assigning Variant & Saving...' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
