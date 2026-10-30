import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen, Plus, Search, Filter, Edit3, Trash2, Eye, EyeOff,
  ChevronDown, ChevronRight, Video, FileText, CheckCircle2,
  AlertTriangle, GripVertical, Clock, Sparkles, Layers,
  ExternalLink, ArrowUpRight, ShieldCheck, PlayCircle,
  UploadCloud, Film, HardDrive, Loader2, FileCheck
} from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';
import { apiClient } from '../../services/apiClient';
import { COURSE_CARD_STYLES, getCardStyleByIndex } from '../../utils/courseCardStyles';
import { saveVideoBlob, resolveVideoUrl } from '../../services/db/videoStorage';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('curriculum'); // curriculum | settings | preview
  const [expandedModules, setExpandedModules] = useState({});
  const [isEditingCourse, setIsEditingCourse] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [courseFormData, setCourseFormData] = useState({
    title: '',
    slug: '',
    level: 'Intermediate',
    category: 'Cyber Threat Intelligence',
    description: '',
    duration: '4 Weeks',
    xp_reward: 1000,
    status: 'PUBLISHED',
    modules: []
  });

  // Modal states for Module & Lesson
  const [moduleModalOpen, setModuleModalOpen] = useState(false);
  const [editingModule, setEditingModule] = useState(null);
  const [moduleForm, setModuleForm] = useState({
    title: '',
    drip_days: 0,
    lessons: []
  });

  const [lessonModalOpen, setLessonModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [activeModuleId, setActiveModuleId] = useState(null);
  const [lessonForm, setLessonForm] = useState({
    title: '',
    duration: '15 mins',
    type: 'video',
    video_url: '',
    is_preview: false,
    content: ''
  });

  // Modal state for Practical Lab Assignment
  const [assignmentModalOpen, setAssignmentModalOpen] = useState(false);
  const [assignmentForm, setAssignmentForm] = useState({
    title: '',
    duration: '45 mins',
    points: 100,
    due_days: 7,
    instructions: 'Download the lab template, conduct analysis, and submit your PDF investigation report.',
    template_name: 'Lab_Investigation_Brief.pdf',
    allowed_file_types: 'PDF (.pdf)'
  });

  const handleOpenAssignmentModal = (moduleId) => {
    setActiveModuleId(moduleId);
    setAssignmentForm({
      title: 'Practical Investigation & Incident Triage Lab',
      duration: '45 mins',
      points: 100,
      due_days: 7,
      instructions: 'Download the investigative scenario, examine the security indicators, and submit your PDF report with screenshots and MITRE ATT&CK mapping.',
      template_name: 'Lab_Investigation_Brief.pdf',
      allowed_file_types: 'PDF (.pdf)'
    });
    setAssignmentModalOpen(true);
  };

  const handleSaveAssignment = (e) => {
    e.preventDefault();
    if (!selectedCourse || !activeModuleId) return;

    const assignmentPayload = {
      ...assignmentForm,
      id: `asn_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      type: 'assignment',
      is_mandatory: true
    };

    mockEngine.addModuleAssignment(selectedCourse.id, activeModuleId, assignmentPayload);
    const db = mockEngine.getDb();
    setCourses([...(db.courses || [])]);
    const refreshed = db.courses?.find((c) => c.id === selectedCourse.id);
    if (refreshed) setSelectedCourse(refreshed);
    setAssignmentModalOpen(false);
  };

  // Local Video Upload State
  const [videoSourceType, setVideoSourceType] = useState('upload'); // 'upload' | 'url'
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState('');
  const [uploadedFileInfo, setUploadedFileInfo] = useState(null);
  const fileInputRef = useRef(null);

  // Handle local video file upload (MP4, WebM, MOV, MKV) to IndexedDB
  const handleLocalVideoUpload = async (file) => {
    if (!file) return;

    setUploadingVideo(true);
    setUploadProgress(15);

    try {
      // Calculate duration dynamically using an offscreen video element
      const tempUrl = URL.createObjectURL(file);
      const tempVideo = document.createElement('video');
      tempVideo.preload = 'metadata';
      tempVideo.src = tempUrl;

      await new Promise((resolve) => {
        tempVideo.onloadedmetadata = () => {
          const totalSec = Math.floor(tempVideo.duration) || 0;
          const mins = Math.floor(totalSec / 60);
          const secs = totalSec % 60;
          const formattedDuration = `${mins}:${secs < 10 ? '0' : ''}${secs} mins`;
          setLessonForm((prev) => ({ ...prev, duration: formattedDuration }));
          resolve();
        };
        tempVideo.onerror = () => resolve();
      });

      setUploadProgress(50);

      // Save to IndexedDB persistent storage
      const assetId = `video_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      setUploadProgress(80);

      const idbUrl = await saveVideoBlob(assetId, file);
      setUploadProgress(100);

      // Generate preview URL
      const preview = await resolveVideoUrl(idbUrl);
      setVideoPreviewUrl(preview);

      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setUploadedFileInfo({
        name: file.name,
        size: `${sizeMb} MB`,
        assetId
      });

      setLessonForm((prev) => ({ ...prev, video_url: idbUrl }));
    } catch (err) {
      console.error('Error handling local video file upload:', err);
      alert('Failed to process video file. Please check browser IndexedDB storage.');
    } finally {
      setUploadingVideo(false);
    }
  };

  // Load courses from mockEngine
  const loadCourses = () => {
    try {
      const db = mockEngine.getDb();
      if (db && db.courses) {
        setCourses(db.courses);
        if (db.courses.length > 0 && !selectedCourse) {
          setSelectedCourse(db.courses[0]);
        }
      }
    } catch (e) {
      console.error('Error loading courses:', e);
    }
  };

  useEffect(() => {
    loadCourses();

    // Subscribe to external db updates
    const unsubscribe = mockEngine.subscribe((event) => {
      if (event.type === 'CURRICULUM_MUTATED' || event.type === 'DB_MUTATED') {
        loadCourses();
      }
    });
    return () => unsubscribe();
  }, []);

  // Save courses back to mockEngine with reactive broadcast
  const persistCourses = (updatedCourses) => {
    try {
      const db = mockEngine.getDb();
      db.courses = updatedCourses;
      mockEngine.saveDb(db, {
        type: 'CURRICULUM_MUTATED',
        payload: { courseId: selectedCourse?.id, courses: updatedCourses }
      });
      setCourses(updatedCourses);
      if (selectedCourse) {
        const refreshed = updatedCourses.find((c) => c.id === selectedCourse.id);
        if (refreshed) setSelectedCourse(refreshed);
      }
      // Add audit log
      mockEngine.logAction({
        action: 'COURSE_MUTATION',
        category: 'COURSE_MUTATION',
        details: 'Admin updated course curriculum and saved to registry.',
        severity: 'INFO'
      });
    } catch (e) {
      console.error('Failed to persist course changes:', e);
    }
  };

  // Pre-flight validation before publishing
  const validateCourseForPublish = (course) => {
    const issues = [];
    if (!course.title || course.title.length < 5) issues.push('Course title must be at least 5 characters');
    if (!course.modules || course.modules.length === 0) issues.push('Course must have at least one module');
    const totalLessons = (course.modules || []).reduce((acc, m) => acc + (m.lessons || []).length, 0);
    if (totalLessons === 0) issues.push('Course must contain at least one lesson with content or video');
    return issues;
  };

  const handleTogglePublish = (course) => {
    const nextStatus = course.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    if (nextStatus === 'PUBLISHED') {
      const issues = validateCourseForPublish(course);
      if (issues.length > 0) {
        alert('Cannot publish course due to pre-flight check failure:\n• ' + issues.join('\n• '));
        return;
      }
    }
    const updated = courses.map((c) => (c.id === course.id ? { ...c, status: nextStatus } : c));
    persistCourses(updated);
  };

  const handleSaveCourse = async (e) => {
    e.preventDefault();
    if (!courseFormData.title || !courseFormData.title.trim()) {
      alert('Please enter a valid course title.');
      return;
    }

    if (isEditingCourse && selectedCourse) {
      const updated = courses.map((c) =>
        c.id === selectedCourse.id
          ? {
              ...c,
              ...courseFormData,
              title: courseFormData.title.trim(),
              slug: (courseFormData.slug && courseFormData.slug.trim())
                ? courseFormData.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
                : c.slug,
              difficulty: courseFormData.level || courseFormData.difficulty || c.difficulty,
              level: courseFormData.level || courseFormData.difficulty || c.level,
              overview: courseFormData.description || courseFormData.overview || c.overview,
              description: courseFormData.description || courseFormData.description || c.description,
              estimated_duration: courseFormData.duration || courseFormData.estimated_duration || c.estimated_duration,
              duration: courseFormData.duration || c.duration,
              total_tokens_reward: Number(courseFormData.xp_reward) || c.total_tokens_reward || 350,
              xp_reward: Number(courseFormData.xp_reward) || c.xp_reward || 350,
            }
          : c
      );
      persistCourses(updated);
      setIsEditingCourse(false);
      setIsCreatingNew(false);
    } else {
      const formattedTitle = courseFormData.title.trim();
      const generatedSlug = (courseFormData.slug && courseFormData.slug.trim())
        ? courseFormData.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
        : formattedTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

      // DUPLICATE COURSE GUARD: Ensure no duplicate courses can be created
      const isDuplicate = courses.some(
        (c) => c.title?.trim().toLowerCase() === formattedTitle.toLowerCase() || c.slug?.toLowerCase() === generatedSlug
      );
      if (isDuplicate) {
        alert(`Duplicate Course Blocked: A course titled "${formattedTitle}" or with slug "${generatedSlug}" already exists in the catalog. Please choose a unique title.`);
        return;
      }

      const newCoursePayload = {
        title: formattedTitle,
        slug: generatedSlug,
        difficulty: courseFormData.level || 'Intermediate',
        level: courseFormData.level || 'Intermediate',
        category: courseFormData.category || 'Specialist Operations',
        overview: courseFormData.description || `Comprehensive curriculum designed by RedKross Academy for ${formattedTitle}.`,
        description: courseFormData.description || `Comprehensive curriculum designed by RedKross Academy for ${formattedTitle}.`,
        estimated_duration: courseFormData.duration || '4 Weeks',
        duration: courseFormData.duration || '4 Weeks',
        total_tokens_reward: Number(courseFormData.xp_reward) || 350,
        xp_reward: Number(courseFormData.xp_reward) || 350,
        status: courseFormData.status || 'PUBLISHED',
        modules: courseFormData.modules && courseFormData.modules.length > 0 ? courseFormData.modules : [
          {
            id: `MOD-${Date.now().toString(36).toUpperCase()}-1`,
            title: 'Module 1: Architecture & Defensive Fundamentals',
            order: 1,
            drip_days: 0,
            lessons: [
              {
                id: `LES-${Date.now().toString(36).toUpperCase()}-101`,
                title: '1.1 System Initialization & Operations Overview',
                duration: '15 mins',
                type: 'video',
                video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                is_preview: true,
                is_mandatory: true,
                content: `### Welcome to ${formattedTitle}\n\nDefensive operators must maintain 100% visibility over host and network telemetry.\n\n\`\`\`bash\n# Inspect telemetry pipelines\nss -tulpn\n\`\`\``
              }
            ]
          }
        ]
      };

      try {
        // 1. Create locally in mockEngine to guarantee immediate display, 3D variant allocation, and full state reactivity
        const createdCourse = mockEngine.createCourse(newCoursePayload);
        const db = mockEngine.getDb();
        setCourses([...(db.courses || [])]);
        setSelectedCourse(createdCourse);
        setIsCreatingNew(false);
        setIsEditingCourse(false);

        // Reset form to blank state
        setCourseFormData({
          title: '',
          slug: '',
          level: 'Intermediate',
          category: 'Cyber Threat Intelligence',
          description: '',
          duration: '4 Weeks',
          xp_reward: 1000,
          status: 'PUBLISHED',
          modules: []
        });

        // 2. Dual-persist to serverless API / Neon PostgreSQL in background
        try {
          await apiClient.createCourse({
            ...newCoursePayload,
            id: createdCourse.id,
            card_variant: createdCourse.card_variant
          });
        } catch (err) {
          console.warn('Serverless course sync deferred:', err);
        }
      } catch (err) {
        console.error('Failed to create course:', err);
        alert(`Course Creation Notice: ${err.message || 'Unable to create course'}`);
      }
    }
  };

  const handleDeleteCourse = (courseId) => {
    if (confirm('Are you sure you want to permanently delete this course? This action will immediately cascade to all student progress.')) {
      const updated = courses.filter((c) => c.id !== courseId);
      persistCourses(updated);
      setSelectedCourse(updated[0] || null);
    }
  };

  // Module actions
  const handleOpenModuleModal = (module = null) => {
    if (module) {
      setEditingModule(module);
      setModuleForm({ title: module.title, drip_days: module.drip_days || 0, lessons: module.lessons || [] });
    } else {
      setEditingModule(null);
      setModuleForm({ title: '', drip_days: 0, lessons: [] });
    }
    setModuleModalOpen(true);
  };

  const handleSaveModule = () => {
    if (!moduleForm.title || !selectedCourse) return;
    const currentModules = selectedCourse.modules || [];
    let updatedModules;

    if (editingModule) {
      updatedModules = currentModules.map((m) =>
        m.id === editingModule.id ? { ...m, title: moduleForm.title, drip_days: parseInt(moduleForm.drip_days) || 0 } : m
      );
    } else {
      const newMod = {
        id: 'MOD-' + Date.now().toString(36).toUpperCase(),
        title: moduleForm.title,
        drip_days: parseInt(moduleForm.drip_days) || 0,
        lessons: []
      };
      updatedModules = [...currentModules, newMod];
    }

    const updatedCourses = courses.map((c) =>
      c.id === selectedCourse.id ? { ...c, modules: updatedModules } : c
    );
    persistCourses(updatedCourses);
    setModuleModalOpen(false);
  };

  const handleDeleteModule = (moduleId) => {
    if (!confirm('Delete this module and all its lessons?')) return;
    const updatedModules = (selectedCourse.modules || []).filter((m) => m.id !== moduleId);
    const updatedCourses = courses.map((c) =>
      c.id === selectedCourse.id ? { ...c, modules: updatedModules } : c
    );
    persistCourses(updatedCourses);
  };

  // Lesson actions
  const handleOpenLessonModal = async (moduleId, lesson = null) => {
    setActiveModuleId(moduleId);
    setUploadingVideo(false);
    setUploadProgress(0);
    setUploadedFileInfo(null);

    if (lesson) {
      setEditingLesson(lesson);
      const isIdb = lesson.video_url?.startsWith('idb://');
      setVideoSourceType(isIdb ? 'upload' : 'url');
      setLessonForm({
        title: lesson.title,
        duration: lesson.duration || '15 mins',
        type: lesson.type || 'video',
        video_url: lesson.video_url || '',
        is_preview: !!lesson.is_preview,
        content: lesson.content || ''
      });

      if (lesson.video_url) {
        try {
          const resolved = await resolveVideoUrl(lesson.video_url);
          setVideoPreviewUrl(resolved);
          if (isIdb) {
            setUploadedFileInfo({
              name: `${lesson.title} (IndexedDB Persistent Video)`,
              size: 'Local High-Speed Cache',
              assetId: lesson.video_url.replace('idb://', '')
            });
          }
        } catch (e) {
          console.warn('Could not resolve initial video URL:', e);
        }
      } else {
        setVideoPreviewUrl('');
      }
    } else {
      setEditingLesson(null);
      setVideoSourceType('upload');
      setVideoPreviewUrl('');
      setLessonForm({
        title: '',
        duration: '15 mins',
        type: 'video',
        video_url: '',
        is_preview: false,
        content: ''
      });
    }
    setLessonModalOpen(true);
  };

  const handleSaveLesson = () => {
    if (!lessonForm.title || !selectedCourse || !activeModuleId) return;

    const updatedModules = (selectedCourse.modules || []).map((mod) => {
      if (mod.id !== activeModuleId) return mod;
      const currentLessons = mod.lessons || [];
      let nextLessons;

      if (editingLesson) {
        nextLessons = currentLessons.map((l) =>
          l.id === editingLesson.id ? { ...l, ...lessonForm } : l
        );
      } else {
        const newLesson = {
          id: 'LES-' + Date.now().toString(36).toUpperCase(),
          ...lessonForm
        };
        nextLessons = [...currentLessons, newLesson];
      }
      return { ...mod, lessons: nextLessons };
    });

    const updatedCourses = courses.map((c) =>
      c.id === selectedCourse.id ? { ...c, modules: updatedModules } : c
    );
    persistCourses(updatedCourses);
    setLessonModalOpen(false);
  };

  const handleDeleteLesson = (moduleId, lessonId) => {
    if (!confirm('Delete this lesson?')) return;
    const updatedModules = (selectedCourse.modules || []).map((m) => {
      if (m.id !== moduleId) return m;
      return { ...m, lessons: (m.lessons || []).filter((l) => l.id !== lessonId) };
    });
    const updatedCourses = courses.map((c) =>
      c.id === selectedCourse.id ? { ...c, modules: updatedModules } : c
    );
    persistCourses(updatedCourses);
  };

  // Filtered courses
  const filteredCourses = courses.filter((c) => {
    const matchesSearch = c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.category?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-slide-left">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between cyber-glass-panel p-4 rounded-xl">
        <div className="flex items-center space-x-3">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-[#8BA2B5] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search courses by title or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full cyber-glass-card text-xs text-[#F1F5F9] pl-9 pr-3 py-2 rounded-lg focus:outline-none focus:border-[#65F58A]"
            />
          </div>

          <div className="flex items-center space-x-1.5 cyber-glass-card p-1 rounded-lg">
            {['ALL', 'PUBLISHED', 'DRAFT'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                  statusFilter === status
                    ? 'bg-[#1B2530] text-[#65F58A] font-semibold'
                    : 'text-[#8BA2B5] hover:text-[#F1F5F9]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            setIsCreatingNew(true);
            setIsEditingCourse(false);
            setSelectedCourse(null);
            setCourseFormData({
              title: '',
              slug: '',
              level: 'Intermediate',
              category: 'Cyber Threat Intelligence',
              description: '',
              duration: '4 Weeks',
              xp_reward: 1000,
              status: 'PUBLISHED',
              modules: []
            });
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-[#65F58A] text-[#071018] font-bold text-xs rounded-lg hover:bg-[#52d674] transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Course</span>
        </button>
      </div>

      {/* Main Dual-Pane Course Studio */}
      <div className="grid grid-cols-12 gap-6 min-h-[700px]">
        {/* Left Column: 10 Visual Style Cards List */}
        <div className="col-span-5 space-y-4 overflow-y-auto max-h-[820px] pr-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#8BA2B5] px-1">
            <span>CURRICULUM REPOSITORY ({filteredCourses.length})</span>
            <span className="text-[10px] text-[#65F58A]">10 Distinct Card Styles</span>
          </div>

          {filteredCourses.map((course, idx) => {
            const cardStyle = getCardStyleByIndex(idx);
            const isSelected = selectedCourse?.id === course.id && !isCreatingNew;
            const moduleCount = course.modules?.length || 0;
            const lessonCount = (course.modules || []).reduce((acc, m) => acc + (m.lessons?.length || 0), 0);

            return (
              <div
                key={course.id || idx}
                onClick={() => {
                  setSelectedCourse(course);
                  setIsEditingCourse(false);
                  setIsCreatingNew(false);
                }}
                className={`relative p-5 rounded-xl border transition-all cursor-pointer ${cardStyle.wrapperClass} ${
                  isSelected ? 'ring-2 ring-white/40 shadow-lg scale-[1.01]' : 'opacity-90 hover:opacity-100'
                }`}
              >
                {/* Visual style badge & status */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${cardStyle.badgeClass}`}>
                      {cardStyle.name}
                    </span>
                    <span className="text-[10px] font-mono text-[#8BA2B5] bg-[#071018]/60 px-2 py-0.5 rounded border border-[#1B2530]">
                      {course.level || 'Beginner'}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                      course.status === 'PUBLISHED'
                        ? 'bg-[#65F58A]/10 text-[#65F58A] border-[#65F58A]/30'
                        : 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30'
                    }`}
                  >
                    {course.status || 'DRAFT'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1.5 leading-snug line-clamp-1">
                  {course.title}
                </h3>
                <p className="text-xs text-[#8BA2B5] line-clamp-2 mb-4">
                  {course.description || 'Comprehensive offensive and defensive cybersecurity training path.'}
                </p>

                {/* Card Footer Metrics */}
                <div className="flex items-center justify-between text-[11px] font-mono pt-3 border-t border-white/10 text-[#CBD5E1]">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1">
                      <Layers className="w-3.5 h-3.5 text-[#8BA2B5]" />
                      <span>{moduleCount} Modules</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Video className="w-3.5 h-3.5 text-[#8BA2B5]" />
                      <span>{lessonCount} Lessons</span>
                    </span>
                  </div>
                  <span className={cardStyle.accentText}>{course.duration || '4 Weeks'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Workstation Editor (Course -> Module -> Lesson Hierarchy) */}
        <div className="col-span-7 cyber-glass-panel rounded-xl flex flex-col overflow-hidden">
          {(isEditingCourse || isCreatingNew) ? (
            /* Create / Edit Course Form */
            <form onSubmit={handleSaveCourse} className="p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#1B2530]">
                <div>
                  <span className="text-[10px] font-mono text-[#65F58A] uppercase tracking-wider block">
                    {isEditingCourse && selectedCourse ? 'Master Registry Configuration' : 'New Program Architecture'}
                  </span>
                  <h3 className="text-base font-bold text-white font-lora">
                    {isEditingCourse && selectedCourse ? `Edit: ${selectedCourse.title}` : 'Create New Master Course'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditingCourse(false);
                    setIsCreatingNew(false);
                  }}
                  className="px-2.5 py-1 text-xs font-mono text-[#8BA2B5] hover:text-white rounded bg-[#1B2530] border border-[#263440]"
                >
                  Cancel
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-[#8BA2B5]">Course Title *</label>
                <input
                  type="text"
                  required
                  value={courseFormData.title}
                  onChange={(e) => setCourseFormData({ ...courseFormData, title: e.target.value })}
                  placeholder="e.g. Advanced Network Defense & Packet Inspection"
                  className="w-full cyber-glass-card rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#65F58A]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-[#8BA2B5]">URL Slug (Optional)</label>
                <input
                  type="text"
                  value={courseFormData.slug || ''}
                  onChange={(e) => setCourseFormData({ ...courseFormData, slug: e.target.value })}
                  placeholder="e.g. advanced-network-defense"
                  className="w-full cyber-glass-card rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#65F58A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#8BA2B5]">Difficulty Level</label>
                  <select
                    value={courseFormData.level}
                    onChange={(e) => setCourseFormData({ ...courseFormData, level: e.target.value })}
                    className="w-full cyber-glass-card rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#65F58A] bg-[#071018]"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#8BA2B5]">Category Track</label>
                  <input
                    type="text"
                    value={courseFormData.category}
                    onChange={(e) => setCourseFormData({ ...courseFormData, category: e.target.value })}
                    className="w-full cyber-glass-card rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#65F58A]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-[#8BA2B5]">Course Summary Description</label>
                <textarea
                  rows={3}
                  value={courseFormData.description}
                  onChange={(e) => setCourseFormData({ ...courseFormData, description: e.target.value })}
                  placeholder="Outline competencies, practical lab environments, and prerequisites."
                  className="w-full cyber-glass-card rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#65F58A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#8BA2B5]">Estimated Duration</label>
                  <input
                    type="text"
                    value={courseFormData.duration}
                    onChange={(e) => setCourseFormData({ ...courseFormData, duration: e.target.value })}
                    className="w-full cyber-glass-card rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#65F58A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#8BA2B5]">XP Reward Bounty</label>
                  <input
                    type="number"
                    value={courseFormData.xp_reward}
                    onChange={(e) => setCourseFormData({ ...courseFormData, xp_reward: parseInt(e.target.value) || 0 })}
                    className="w-full cyber-glass-card rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#65F58A]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-[#8BA2B5]">Initial Publishing Status</label>
                <select
                  value={courseFormData.status || 'PUBLISHED'}
                  onChange={(e) => setCourseFormData({ ...courseFormData, status: e.target.value })}
                  className="w-full cyber-glass-card rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#65F58A] bg-[#071018]"
                >
                  <option value="PUBLISHED">PUBLISHED (Live on Student Portal)</option>
                  <option value="DRAFT">DRAFT (Staged / Under Review)</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-[#1B2530]">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditingCourse(false);
                    setIsCreatingNew(false);
                  }}
                  className="px-4 py-2 bg-[#1B2530] text-[#CBD5E1] text-xs font-mono rounded-lg hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#65F58A] text-[#071018] text-xs font-bold rounded-lg hover:bg-[#52d674] shadow-md transition-all"
                >
                  {isEditingCourse && selectedCourse ? 'Update Course Parameters' : 'Create & Launch Course'}
                </button>
              </div>
            </form>
          ) : selectedCourse ? (
            <>
              {/* Course Header Bar */}
              <div className="p-5 border-b border-[#1B2530] bg-[#071018] flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-[11px] font-mono text-[#8BA2B5]">{selectedCourse.id}</span>
                    <span className="text-[10px] font-mono bg-[#1B2530] text-[#65F58A] px-2 py-0.5 rounded">
                      {selectedCourse.category || 'Curriculum'}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-white font-lora">{selectedCourse.title}</h2>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleTogglePublish(selectedCourse)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-colors ${
                      selectedCourse.status === 'PUBLISHED'
                        ? 'bg-[#1B2530] text-[#CBD5E1] border-[#263440] hover:text-[#EF4444]'
                        : 'bg-[#65F58A]/10 text-[#65F58A] border-[#65F58A]/40 hover:bg-[#65F58A]/20'
                    }`}
                  >
                    {selectedCourse.status === 'PUBLISHED' ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Unpublish</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>Publish Live</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setIsEditingCourse(true);
                      setIsCreatingNew(false);
                      setCourseFormData({
                        ...selectedCourse,
                        level: selectedCourse.difficulty || selectedCourse.level || 'Intermediate',
                        description: selectedCourse.overview || selectedCourse.description || '',
                        duration: selectedCourse.estimated_duration || selectedCourse.duration || '4 Weeks',
                        xp_reward: selectedCourse.total_tokens_reward || selectedCourse.xp_reward || 1000,
                        status: selectedCourse.status || 'PUBLISHED'
                      });
                    }}
                    className="p-1.5 rounded-lg bg-[#1B2530] text-[#CBD5E1] hover:text-white border border-[#263440]"
                    title="Edit Course Settings"
                  >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDeleteCourse(selectedCourse.id)}
                      className="p-1.5 rounded-lg bg-[#1B2530] text-[#EF4444] hover:bg-[#EF4444]/20 border border-[#263440]"
                      title="Delete Course"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Sub-Tabs: Curriculum Builder vs Details */}
                <div className="flex border-b border-[#1B2530] bg-[#0A121A] px-5">
                  <button
                    onClick={() => setActiveTab('curriculum')}
                    className={`py-3 px-4 text-xs font-mono border-b-2 transition-all ${
                      activeTab === 'curriculum'
                        ? 'border-[#65F58A] text-[#65F58A] font-bold'
                        : 'border-transparent text-[#8BA2B5] hover:text-white'
                    }`}
                  >
                    4-TIER CURRICULUM ARCHITECTURE
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`py-3 px-4 text-xs font-mono border-b-2 transition-all ${
                      activeTab === 'settings'
                        ? 'border-[#65F58A] text-[#65F58A] font-bold'
                        : 'border-transparent text-[#8BA2B5] hover:text-white'
                    }`}
                  >
                    METADATA & ACCESS RULES
                  </button>
                </div>

                {/* Tab Content */}
                <div className="p-5 flex-1 overflow-y-auto max-h-[640px] space-y-4">
                  {activeTab === 'curriculum' ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-[#8BA2B5]">
                          MODULES & SEQUENTIAL LESSONS
                        </span>
                        <button
                          onClick={() => handleOpenModuleModal()}
                          className="flex items-center space-x-1.5 px-3 py-1 bg-[#1B2530] text-[#65F58A] border border-[#263440] hover:border-[#65F58A]/50 rounded text-xs font-mono font-bold"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Module</span>
                        </button>
                      </div>

                      {(!selectedCourse.modules || selectedCourse.modules.length === 0) ? (
                        <div className="text-center py-12 border border-dashed border-[#1B2530] rounded-xl">
                          <BookOpen className="w-8 h-8 text-[#8BA2B5] mx-auto mb-2 opacity-50" />
                          <p className="text-xs text-[#8BA2B5]">No modules created yet.</p>
                          <button
                            onClick={() => handleOpenModuleModal()}
                            className="mt-3 text-xs text-[#65F58A] underline font-mono"
                          >
                            Create Module 1
                          </button>
                        </div>
                      ) : (
                        selectedCourse.modules.map((mod, modIdx) => {
                          const isExpanded = expandedModules[mod.id] !== false; // default expanded

                          return (
                            <div
                              key={mod.id || modIdx}
                              className="border border-[#1B2530] bg-[#071018] rounded-xl overflow-hidden"
                            >
                              {/* Module Header Bar */}
                              <div className="p-3.5 bg-[#0C1520] flex items-center justify-between border-b border-[#1B2530]">
                                <div
                                  className="flex items-center space-x-3 cursor-pointer flex-1"
                                  onClick={() =>
                                    setExpandedModules((prev) => ({
                                      ...prev,
                                      [mod.id]: !isExpanded
                                    }))
                                  }
                                >
                                  {isExpanded ? (
                                    <ChevronDown className="w-4 h-4 text-[#8BA2B5]" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4 text-[#8BA2B5]" />
                                  )}
                                  <span className="text-xs font-mono font-bold text-[#65F58A]">
                                    MODULE {modIdx + 1}:
                                  </span>
                                  <span className="text-sm font-semibold text-white">{mod.title}</span>
                                  {mod.drip_days > 0 && (
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/30 flex items-center space-x-1">
                                      <Clock className="w-3 h-3" />
                                      <span>Drip: Day {mod.drip_days}</span>
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => handleOpenLessonModal(mod.id)}
                                    className="px-2.5 py-1 text-[11px] font-mono bg-[#1B2530] text-[#CBD5E1] hover:text-[#65F58A] rounded border border-[#263440] flex items-center space-x-1"
                                  >
                                    <Plus className="w-3 h-3" />
                                    <span>Lesson</span>
                                  </button>
                                  <button
                                    onClick={() => handleOpenAssignmentModal(mod.id)}
                                    className="px-2.5 py-1 text-[11px] font-mono bg-[#1B2530] text-[#CBD5E1] hover:text-[#F59E0B] rounded border border-[#263440] flex items-center space-x-1"
                                    title="Add Practical Lab Assignment to Module"
                                  >
                                    <Plus className="w-3 h-3" />
                                    <span>Assignment</span>
                                  </button>
                                  <button
                                    onClick={() => handleOpenModuleModal(mod)}
                                    className="p-1 text-[#8BA2B5] hover:text-white"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteModule(mod.id)}
                                    className="p-1 text-[#8BA2B5] hover:text-[#EF4444]"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              {/* Lessons List within Module */}
                              {isExpanded && (
                                <div className="p-2 space-y-1.5 bg-[#071018]">
                                  {(!mod.lessons || mod.lessons.length === 0) ? (
                                    <p className="text-[11px] text-[#8BA2B5] italic px-4 py-3">
                                      No lessons or assignments inside this module. Click "+ Lesson" or "+ Assignment" to add curriculum tasks.
                                    </p>
                                  ) : (
                                    mod.lessons.map((lesson, lesIdx) => (
                                      <div
                                        key={lesson.id || lesIdx}
                                        className="flex items-center justify-between p-2.5 rounded-lg bg-[#0D1622] border border-[#182330] hover:border-[#263440] transition-colors"
                                      >
                                        <div className="flex items-center space-x-3">
                                          <GripVertical className="w-3.5 h-3.5 text-[#8BA2B5] opacity-40 cursor-grab" />
                                          {lesson.type === 'assignment' ? (
                                            <FileCheck className="w-4 h-4 text-[#F59E0B]" />
                                          ) : lesson.type === 'video' ? (
                                            <PlayCircle className="w-4 h-4 text-[#65F58A]" />
                                          ) : (
                                            <FileText className="w-4 h-4 text-[#A855F7]" />
                                          )}
                                          <div>
                                            <div className="flex items-center space-x-2">
                                              <span className="text-xs font-medium text-white">
                                                {lesson.title}
                                              </span>
                                              {lesson.type === 'assignment' ? (
                                                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                                                  PRACTICAL ASSIGNMENT ({lesson.points || 100} PTS)
                                                </span>
                                              ) : lesson.is_preview ? (
                                                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#65F58A]/10 text-[#65F58A] border border-[#65F58A]/30">
                                                  FREE PREVIEW
                                                </span>
                                              ) : null}
                                            </div>
                                            <span className="text-[10px] font-mono text-[#8BA2B5]">
                                              {lesson.duration || '10 mins'} • {lesson.type?.toUpperCase()}
                                            </span>
                                          </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                          <button
                                            onClick={() => handleOpenLessonModal(mod.id, lesson)}
                                            className="p-1 text-[#8BA2B5] hover:text-[#65F58A]"
                                            title="Edit Lesson"
                                          >
                                            <Edit3 className="w-3.5 h-3.5" />
                                          </button>
                                          <button
                                            onClick={() => handleDeleteLesson(mod.id, lesson.id)}
                                            className="p-1 text-[#8BA2B5] hover:text-[#EF4444]"
                                            title="Delete Lesson"
                                          >
                                            <Trash2 className="w-3.5 h-3.5" />
                                          </button>
                                        </div>
                                      </div>
                                    ))
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  ) : (
                    /* Metadata & Settings Tab */
                    <div className="space-y-4 text-xs font-mono">
                      <div className="p-4 cyber-glass-card rounded-lg space-y-3">
                        <div className="flex justify-between py-1 border-b border-[#1B2530]">
                          <span className="text-[#8BA2B5]">Course ID</span>
                          <span className="text-white">{selectedCourse.id}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-[#1B2530]">
                          <span className="text-[#8BA2B5]">Target Audience Level</span>
                          <span className="text-white">{selectedCourse.level}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-[#1B2530]">
                          <span className="text-[#8BA2B5]">Category / Track</span>
                          <span className="text-white">{selectedCourse.category}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-[#1B2530]">
                          <span className="text-[#8BA2B5]">XP Completion Bounty</span>
                          <span className="text-[#65F58A]">+{selectedCourse.xp_reward || 1000} XP</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-[#1B2530]">
                          <span className="text-[#8BA2B5]">Public Student Visibility</span>
                          <span className={selectedCourse.status === 'PUBLISHED' ? 'text-[#65F58A]' : 'text-[#F59E0B]'}>
                            {selectedCourse.status === 'PUBLISHED' ? 'Active on Student Portal' : 'Embargoed / Staged'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-[#8BA2B5] space-y-4">
              <BookOpen className="w-12 h-12 text-[#65F58A]/40" />
              <h3 className="text-base font-royal font-bold text-white">No Course Selected</h3>
              <p className="text-xs max-w-sm">Select a course from the curriculum catalog to inspect and edit modules, or launch the course builder to create a new program.</p>
              <button
                onClick={() => {
                  setIsCreatingNew(true);
                  setIsEditingCourse(false);
                  setSelectedCourse(null);
                  setCourseFormData({
                    title: '',
                    slug: '',
                    level: 'Intermediate',
                    category: 'Cyber Threat Intelligence',
                    description: '',
                    duration: '4 Weeks',
                    xp_reward: 1000,
                    status: 'PUBLISHED',
                    modules: []
                  });
                }}
                className="px-4 py-2 bg-[#65F58A] text-[#071018] font-bold text-xs rounded-lg hover:bg-[#52d674] flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Launch Course Builder</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Module Modal */}
      {moduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-[500px] cyber-glass-panel rounded-xl p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-4 font-lora">
              {editingModule ? 'Edit Module' : 'Add Curriculum Module'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-[#8BA2B5] block mb-1">Module Title *</label>
                <input
                  type="text"
                  value={moduleForm.title}
                  onChange={(e) => setModuleForm({ ...moduleForm, title: e.target.value })}
                  placeholder="e.g. Exploitation Vectors & Metasploit Labs"
                  className="w-full cyber-glass-card rounded-lg p-2 text-xs text-white focus:outline-none focus:border-[#65F58A]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#8BA2B5] block mb-1">
                  Drip Schedule (Days from Enrollment)
                </label>
                <input
                  type="number"
                  min="0"
                  value={moduleForm.drip_days}
                  onChange={(e) => setModuleForm({ ...moduleForm, drip_days: e.target.value })}
                  className="w-full cyber-glass-card rounded-lg p-2 text-xs text-white"
                />
                <p className="text-[10px] text-[#8BA2B5] mt-1">
                  0 = Immediate access upon course enrollment.
                </p>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-[#1B2530]">
                <button
                  onClick={() => setModuleModalOpen(false)}
                  className="px-3 py-1.5 bg-[#1B2530] text-[#CBD5E1] text-xs font-mono rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveModule}
                  className="px-4 py-1.5 bg-[#65F58A] text-[#071018] text-xs font-bold rounded hover:bg-[#52d674]"
                >
                  Save Module
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lesson Modal */}
      {lessonModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-[600px] cyber-glass-panel rounded-xl p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-4 font-lora">
              {editingLesson ? 'Edit Lesson Parameters' : 'Create New Lesson'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-[#8BA2B5] block mb-1">Lesson Title *</label>
                <input
                  type="text"
                  value={lessonForm.title}
                  onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                  placeholder="e.g. Analyzing Memory Dumps with Volatility"
                  className="w-full cyber-glass-card rounded-lg p-2 text-xs text-white focus:outline-none focus:border-[#65F58A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-[#8BA2B5] block mb-1">Lesson Type</label>
                  <select
                    value={lessonForm.type}
                    onChange={(e) => setLessonForm({ ...lessonForm, type: e.target.value })}
                    className="w-full cyber-glass-card rounded-lg p-2 text-xs text-white"
                  >
                    <option value="video">Video Lecture (HLS/MP4/YouTube)</option>
                    <option value="reading">Technical Reading & Lab Brief</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-[#8BA2B5] block mb-1">Duration</label>
                  <input
                    type="text"
                    value={lessonForm.duration}
                    onChange={(e) => setLessonForm({ ...lessonForm, duration: e.target.value })}
                    placeholder="e.g. 18 mins"
                    className="w-full cyber-glass-card rounded-lg p-2 text-xs text-white"
                  />
                </div>
              </div>

              {lessonForm.type === 'video' && (
                <div className="space-y-3 p-3 cyber-glass-card rounded-xl">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono text-[#8BA2B5] flex items-center space-x-1.5">
                      <Film className="w-3.5 h-3.5 text-[#65F58A]" />
                      <span>LESSON VIDEO SOURCE</span>
                    </label>

                    {/* Source Switcher */}
                    <div className="flex items-center space-x-1 bg-[#0D1622] p-1 rounded-lg border border-[#1B2530]">
                      <button
                        type="button"
                        onClick={() => setVideoSourceType('upload')}
                        className={`px-2.5 py-1 text-[10px] font-mono rounded font-bold transition-all ${
                          videoSourceType === 'upload'
                            ? 'bg-[#1B2530] text-[#65F58A] shadow-sm'
                            : 'text-[#8BA2B5] hover:text-white'
                        }`}
                      >
                        📁 Local File Upload
                      </button>
                      <button
                        type="button"
                        onClick={() => setVideoSourceType('url')}
                        className={`px-2.5 py-1 text-[10px] font-mono rounded font-bold transition-all ${
                          videoSourceType === 'url'
                            ? 'bg-[#1B2530] text-[#65F58A] shadow-sm'
                            : 'text-[#8BA2B5] hover:text-white'
                        }`}
                      >
                        🌐 Direct URL
                      </button>
                    </div>
                  </div>

                  {videoSourceType === 'upload' ? (
                    <div className="space-y-3">
                      {/* Hidden File Input */}
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="video/mp4,video/webm,video/quicktime,video/x-matroska,.mp4,.webm,.mov,.mkv"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleLocalVideoUpload(e.target.files[0]);
                          }
                        }}
                        className="hidden"
                      />

                      {/* Dropzone Container */}
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                            handleLocalVideoUpload(e.dataTransfer.files[0]);
                          }
                        }}
                        className="border-2 border-dashed border-[#1B2530] hover:border-[#65F58A]/50 bg-[#0B131C] hover:bg-[#0E1824] transition-all p-5 rounded-xl text-center cursor-pointer flex flex-col items-center justify-center space-y-2 group"
                      >
                        <div className="w-10 h-10 rounded-full bg-[#1B2530] group-hover:bg-[#65F58A]/10 flex items-center justify-center transition-colors">
                          <UploadCloud className="w-5 h-5 text-[#8BA2B5] group-hover:text-[#65F58A]" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">
                            Click to Browse or Drag & Drop Video
                          </p>
                          <p className="text-[10px] text-[#8BA2B5] font-mono mt-0.5">
                            Supports MP4, WebM, MOV, MKV • Auto-persisted into IndexedDB
                          </p>
                        </div>
                      </div>

                      {/* Upload Progress Bar */}
                      {uploadingVideo && (
                        <div className="space-y-1.5 p-3 bg-[#0B131C] border border-[#1B2530] rounded-lg">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-[#65F58A] flex items-center space-x-1.5">
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              <span>Storing to High-Speed IndexedDB Cache...</span>
                            </span>
                            <span className="text-white font-bold">{uploadProgress}%</span>
                          </div>
                          <div className="w-full bg-[#1B2530] h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-[#65F58A] h-full rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* File Details Badge */}
                      {uploadedFileInfo && !uploadingVideo && (
                        <div className="flex items-center justify-between p-2.5 bg-[#0B131C] border border-[#65F58A]/30 rounded-lg text-xs font-mono">
                          <div className="flex items-center space-x-2">
                            <HardDrive className="w-4 h-4 text-[#65F58A]" />
                            <div>
                              <span className="text-white font-bold block">{uploadedFileInfo.name}</span>
                              <span className="text-[10px] text-[#8BA2B5]">
                                {uploadedFileInfo.size} • URI: {lessonForm.video_url}
                              </span>
                            </div>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#65F58A]/10 text-[#65F58A] border border-[#65F58A]/30">
                            INDEXEDDB READY
                          </span>
                        </div>
                      )}

                      {/* Interactive In-Modal Preview Player */}
                      {videoPreviewUrl && (
                        <div className="space-y-1 pt-1">
                          <span className="text-[10px] font-mono text-[#8BA2B5] block">
                            VIDEO PLAYBACK PREVIEW:
                          </span>
                          <div className="rounded-lg overflow-hidden border border-[#1B2530] bg-black max-h-48 flex items-center justify-center">
                            <video
                              src={videoPreviewUrl}
                              controls
                              className="w-full max-h-48 rounded"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <label className="text-[10px] font-mono text-[#8BA2B5] block mb-1">
                        Direct Video Stream URL (HLS / MP4 / YouTube CDN)
                      </label>
                      <input
                        type="text"
                        value={lessonForm.video_url}
                        onChange={async (e) => {
                          const url = e.target.value;
                          setLessonForm({ ...lessonForm, video_url: url });
                          if (url) {
                            try {
                              const resolved = await resolveVideoUrl(url);
                              setVideoPreviewUrl(resolved);
                            } catch (err) {
                              setVideoPreviewUrl(url);
                            }
                          } else {
                            setVideoPreviewUrl('');
                          }
                        }}
                        placeholder="https://commondatastorage.googleapis.com/... or https://..."
                        className="w-full bg-[#0B131C] border border-[#1B2530] rounded-lg p-2 text-xs text-white font-mono focus:outline-none focus:border-[#65F58A]"
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="previewCheckbox"
                  checked={lessonForm.is_preview}
                  onChange={(e) => setLessonForm({ ...lessonForm, is_preview: e.target.checked })}
                  className="rounded border-[#1B2530] text-[#65F58A] focus:ring-0"
                />
                <label htmlFor="previewCheckbox" className="text-xs text-[#CBD5E1] cursor-pointer">
                  Public Preview Lesson (Accessible without full course enrollment)
                </label>
              </div>

              <div>
                <label className="text-xs font-mono text-[#8BA2B5] block mb-1">
                  Lesson Notes & Markdown Content
                </label>
                <textarea
                  rows={4}
                  value={lessonForm.content}
                  onChange={(e) => setLessonForm({ ...lessonForm, content: e.target.value })}
                  placeholder="# Lesson Overview&#10;Include operational notes and terminal commands."
                  className="w-full cyber-glass-card rounded-lg p-2 text-xs text-white font-mono"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-[#1B2530]">
                <button
                  onClick={() => setLessonModalOpen(false)}
                  className="px-3 py-1.5 bg-[#1B2530] text-[#CBD5E1] text-xs font-mono rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveLesson}
                  className="px-4 py-1.5 bg-[#65F58A] text-[#071018] text-xs font-bold rounded hover:bg-[#52d674]"
                >
                  Save Lesson
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Practical Lab Assignment Creation Modal */}
      {assignmentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="w-[520px] ultra-glass-panel rounded-2xl p-6 border border-amber-500/40 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#1B2530]">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-lora">
                    Create Practical Lab Assignment
                  </h3>
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">
                    Curriculum Capstone Submission Node
                  </span>
                </div>
              </div>
              <button
                onClick={() => setAssignmentModalOpen(false)}
                className="text-xs font-mono text-[#8BA2B5] hover:text-white"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleSaveAssignment} className="space-y-3.5">
              <div>
                <label className="text-xs font-mono text-[#8BA2B5] block mb-1">
                  Assignment Title *
                </label>
                <input
                  type="text"
                  required
                  value={assignmentForm.title}
                  onChange={(e) => setAssignmentForm({ ...assignmentForm, title: e.target.value })}
                  placeholder="e.g. Practical Incident Triage & Memory Forensics Lab"
                  className="w-full cyber-glass-card rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-400 border border-[#263440]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-[#8BA2B5] block mb-1">
                    Token Reward (XP Bounty)
                  </label>
                  <input
                    type="number"
                    min="10"
                    value={assignmentForm.points}
                    onChange={(e) => setAssignmentForm({ ...assignmentForm, points: Number(e.target.value) })}
                    className="w-full cyber-glass-card rounded-lg p-2 text-xs text-white font-mono border border-[#263440]"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-[#8BA2B5] block mb-1">
                    Due Window (Days)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={assignmentForm.due_days}
                    onChange={(e) => setAssignmentForm({ ...assignmentForm, due_days: Number(e.target.value) })}
                    className="w-full cyber-glass-card rounded-lg p-2 text-xs text-white font-mono border border-[#263440]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-[#8BA2B5] block mb-1">
                  Downloadable Lab Brief Template (PDF)
                </label>
                <input
                  type="text"
                  value={assignmentForm.template_name}
                  onChange={(e) => setAssignmentForm({ ...assignmentForm, template_name: e.target.value })}
                  className="w-full cyber-glass-card rounded-lg p-2 text-xs text-white font-mono border border-[#263440]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#8BA2B5] block mb-1">
                  Assignment Brief & Investigation Instructions (Markdown)
                </label>
                <textarea
                  rows={4}
                  value={assignmentForm.instructions}
                  onChange={(e) => setAssignmentForm({ ...assignmentForm, instructions: e.target.value })}
                  placeholder="Outline the scenario, required toolsets (Wireshark/Volatility), and required sections in the submitted PDF."
                  className="w-full cyber-glass-card rounded-lg p-2.5 text-xs text-white font-mono border border-[#263440]"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-[#1B2530]">
                <button
                  type="button"
                  onClick={() => setAssignmentModalOpen(false)}
                  className="px-3.5 py-1.5 bg-[#1B2530] text-[#CBD5E1] text-xs font-mono rounded-lg border border-[#263440]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-500 text-[#071018] text-xs font-bold rounded-lg hover:bg-amber-400 font-mono"
                >
                  Save & Attach Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

