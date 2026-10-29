import React, { useState, useEffect, useRef } from 'react';
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
  UploadCloud,
  Video,
  Trash2,
  Edit3,
  GripVertical,
  FileText,
  HelpCircle,
  Eye,
  RefreshCw,
  AlertCircle,
  PlayCircle,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  Check,
  Lock,
  X,
  Play,
  Code,
  Search,
  ChevronRight,
  Terminal,
  CheckSquare
} from 'lucide-react';
import { apiClient } from '../../services/apiClient';
import { useAuth } from '../../services/auth/authContext';
import CourseCardVariant from '../../components/cards/CourseCardVariant';
import BasicSteps from '../../components/ui/steps';
import { saveVideoBlob, resolveVideoUrl } from '../../services/db/videoStorage';
import { renderMarkdownToHtml } from '../../utils/markdownParser';

/**
 * Custom Creatable Dropdown Component
 * Allows selecting from pre-defined presets or typing a custom value.
 */
function CustomCreatableSelect({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select or enter custom...'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
  };

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (customInput.trim()) {
      onChange(customInput.trim());
      setCustomInput('');
      setIsOpen(false);
    }
  };

  return (
    <div className="relative space-y-1 font-lora" ref={containerRef}>
      {label && <label className="text-[11px] font-lora text-[#94A3B8]">{label}</label>}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-[#071018] border border-[#263440] hover:border-[#65F58A]/50 text-white text-xs font-lora transition-all focus:outline-none text-left"
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8] flex-shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-xl bg-[#101923] border border-[#263440] shadow-2xl overflow-hidden p-2 space-y-2 animate-fadeIn font-lora">
          {/* Custom Input */}
          <div className="flex gap-1.5 pb-2 border-b border-[#263440]">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Type custom value..."
              className="flex-1 px-2.5 py-1 rounded-lg bg-[#071018] border border-[#263440] text-xs font-lora text-white focus:outline-none focus:border-[#65F58A]"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddCustom(e);
              }}
            />
            <button
              type="button"
              onClick={handleAddCustom}
              className="px-2.5 py-1 rounded-lg bg-[#65F58A] text-[#071018] text-xs font-lora font-bold hover:bg-[#65F58A]/90 transition-all"
            >
              Add
            </button>
          </div>

          {/* Options List */}
          <div className="max-h-44 overflow-y-auto space-y-1 pr-1">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleSelect(opt)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-lora text-left transition-colors ${
                  value === opt
                    ? 'bg-[#65F58A]/10 text-[#65F58A] font-bold border border-[#65F58A]/20'
                    : 'text-[#94A3B8] hover:bg-[#1B2530] hover:text-white'
                }`}
              >
                <span>{opt}</span>
                {value === opt && <Check className="w-3.5 h-3.5 text-[#65F58A]" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Super Admin Curriculum Studio
 * 5-Step Stepped Wizard powered by @ark-ui/react/steps & Hope LMS architecture
 */
export default function CourseBuilderPage() {
  const { currentUser } = useAuth();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(1); // 1: Hierarchy, 2: Content, 3: Video, 4: Quiz, 5: Preview
  const [actionNotice, setActionNotice] = useState('');

  // Course Selector Dropdown State
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const [courseSearchTerm, setCourseSearchTerm] = useState('');
  const courseDropdownRef = useRef(null);

  // Course Creation Modal State
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

  // Lesson Content Editor State (Step 2)
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [editingLessonTitle, setEditingLessonTitle] = useState('');
  const [editingLessonDuration, setEditingLessonDuration] = useState('20 mins');
  const [editingLessonContent, setEditingLessonContent] = useState('');
  const [editingLessonSummary, setEditingLessonSummary] = useState('');
  const [editingLessonMandatory, setEditingLessonMandatory] = useState(true);
  const [editorTab, setEditorTab] = useState('write'); // 'write' | 'preview'

  // Lesson Details Popup State (Step 1)
  const [inspectingLesson, setInspectingLesson] = useState(null);

  // Video Asset Upload State (Step 3)
  const fileInputRef = useRef(null);
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDuration, setVideoDuration] = useState('14:30');
  const [videoAssociatedLesson, setVideoAssociatedLesson] = useState('');
  const [videoVisibility, setVideoVisibility] = useState('Enrolled Only');
  const [videoUrl, setVideoUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Quiz Constructor State (Step 4)
  const [quizModuleId, setQuizModuleId] = useState(null);
  const [quizPassingScore, setQuizPassingScore] = useState(80);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionPoints, setNewQuestionPoints] = useState(25);
  const [newQuestionTopic, setNewQuestionTopic] = useState('Network Security');
  const [newOptionA, setNewOptionA] = useState('');
  const [newOptionB, setNewOptionB] = useState('');
  const [newOptionC, setNewOptionC] = useState('');
  const [newOptionD, setNewOptionD] = useState('');
  const [newCorrectOption, setNewCorrectOption] = useState(0);

  // Full Interactive Live Preview State (Step 5)
  const [previewActiveLessonId, setPreviewActiveLessonId] = useState(null);
  const [previewTab, setPreviewTab] = useState('notes'); // 'notes' | 'overview' | 'quiz'

  // Close course dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (courseDropdownRef.current && !courseDropdownRef.current.contains(e.target)) {
        setCourseDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadCourses = async () => {
    try {
      const res = await apiClient.getCourses(true);
      if (res && res.courses) {
        setCourses(res.courses);
        if (!selectedCourse && res.courses.length > 0) {
          selectCourse(res.courses[0]);
        } else if (selectedCourse) {
          const updated = res.courses.find((c) => c.id === selectedCourse.id);
          if (updated) selectCourse(updated);
        }
      }
    } catch (err) {
      console.error('Failed to load courses in builder:', err);
    } finally {
      setLoading(false);
    }
  };

  const selectCourse = (course) => {
    setSelectedCourse(course);
    if (course.modules && course.modules.length > 0) {
      const firstMod = course.modules[0];
      setSelectedModuleId(firstMod.id);
      setQuizModuleId(firstMod.id);
      if (firstMod.lessons && firstMod.lessons.length > 0) {
        const firstLes = firstMod.lessons[0];
        setSelectedLessonId(firstLes.id);
        setPreviewActiveLessonId(firstLes.id);
        setEditingLessonTitle(firstLes.title);
        setEditingLessonDuration(firstLes.duration || '20 mins');
        setEditingLessonContent(firstLes.content || '');
        setEditingLessonSummary(firstLes.summary || '');
        setEditingLessonMandatory(firstLes.is_mandatory !== false);
        setVideoAssociatedLesson(firstLes.id);
      }
      if (firstMod.quiz && firstMod.quiz.questions) {
        setQuizQuestions(firstMod.quiz.questions);
        setQuizPassingScore(firstMod.quiz.passing_score || 80);
      } else {
        setQuizQuestions([]);
      }
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const showToast = (msg) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(''), 4500);
  };

  // Switch active lesson in content editor
  const handleSelectLessonForEditor = (modId, les) => {
    setSelectedModuleId(modId);
    setSelectedLessonId(les.id);
    setEditingLessonTitle(les.title);
    setEditingLessonDuration(les.duration || '20 mins');
    setEditingLessonContent(les.content || '');
    setEditingLessonSummary(les.summary || '');
    setEditingLessonMandatory(les.is_mandatory !== false);
  };

  // Switch active quiz module
  const handleSelectQuizModule = (modId) => {
    setQuizModuleId(modId);
    const mod = selectedCourse?.modules?.find((m) => m.id === modId);
    if (mod && mod.quiz && mod.quiz.questions) {
      setQuizQuestions(mod.quiz.questions);
      setQuizPassingScore(mod.quiz.passing_score || 80);
    } else {
      setQuizQuestions([]);
    }
  };

  // ==========================================
  // STEP 1: MODULE & LESSON REORDERING & HIERARCHY
  // ==========================================
  const handleMoveModule = async (index, direction) => {
    if (!selectedCourse || !selectedCourse.modules) return;
    const newModules = [...selectedCourse.modules];
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= newModules.length) return;

    const temp = newModules[index];
    newModules[index] = newModules[targetIdx];
    newModules[targetIdx] = temp;
    newModules.forEach((m, i) => { m.order = i + 1; });

    await apiClient.reorderModules(selectedCourse.id, newModules);
    setSelectedCourse({ ...selectedCourse, modules: newModules });
    showToast('✅ Module order updated.');
  };

  const handleMoveLesson = async (modIndex, lessonIndex, direction) => {
    if (!selectedCourse || !selectedCourse.modules) return;
    const newModules = [...selectedCourse.modules];
    const lessons = [...(newModules[modIndex].lessons || [])];
    const targetIdx = lessonIndex + direction;
    if (targetIdx < 0 || targetIdx >= lessons.length) return;

    const temp = lessons[lessonIndex];
    lessons[lessonIndex] = lessons[targetIdx];
    lessons[targetIdx] = temp;
    newModules[modIndex].lessons = lessons;

    await apiClient.reorderModules(selectedCourse.id, newModules);
    setSelectedCourse({ ...selectedCourse, modules: newModules });
    showToast('✅ Lesson sequence reordered.');
  };

  const handleAddModule = async () => {
    if (!selectedCourse) return;
    const currentModules = selectedCourse.modules || [];
    const newModuleId = `mod_${Date.now()}`;
    const newModule = {
      id: newModuleId,
      title: `Module ${currentModules.length + 1}: Defensive Protocol Expansion`,
      order: currentModules.length + 1,
      lessons: [
        {
          id: `les_${Date.now()}_1`,
          title: `${currentModules.length + 1}.1 Operational Telemetry`,
          duration: '15 mins',
          is_mandatory: true,
          summary: 'Defensive fundamentals and threat detection vectors.',
          content: '### Foundational Telemetry\n\nConfigure logging sources and system auditing.\n\n```bash\nauditctl -s\n```'
        }
      ]
    };

    const newModules = [...currentModules, newModule];
    await apiClient.reorderModules(selectedCourse.id, newModules);
    setSelectedCourse({ ...selectedCourse, modules: newModules });
    setSelectedModuleId(newModuleId);
    showToast('✅ Added new module to curriculum.');
  };

  const handleAddLesson = async (moduleId) => {
    if (!selectedCourse) return;
    const newModules = [...selectedCourse.modules];
    const mod = newModules.find((m) => m.id === moduleId);
    if (!mod) return;

    const newLesson = {
      id: `les_${Date.now()}`,
      title: `Lesson ${(mod.lessons || []).length + 1}: Threat Hunting Vector`,
      duration: '20 mins',
      is_mandatory: true,
      summary: 'Advanced telemetry collection and incident handling.',
      content: '### Incident Response Playbook\n\nExecute containment protocol immediately upon anomaly detection.\n\n```bash\nsudo tcpdump -i eth0 -nn -s0 -v\n```'
    };

    mod.lessons = [...(mod.lessons || []), newLesson];
    await apiClient.reorderModules(selectedCourse.id, newModules);
    setSelectedCourse({ ...selectedCourse, modules: newModules });
    setSelectedLessonId(newLesson.id);
    setEditingLessonTitle(newLesson.title);
    setEditingLessonContent(newLesson.content);
    showToast('✅ Added new lesson to module.');
  };

  const handleDeleteModule = async (moduleId) => {
    if (!window.confirm('Are you sure you want to delete this module and all its lessons?')) return;
    const newModules = (selectedCourse.modules || []).filter((m) => m.id !== moduleId);
    await apiClient.reorderModules(selectedCourse.id, newModules);
    setSelectedCourse({ ...selectedCourse, modules: newModules });
    showToast('🗑️ Module deleted.');
  };

  const handleDeleteLesson = async (moduleId, lessonId) => {
    if (!window.confirm('Delete this lesson from curriculum?')) return;
    const newModules = [...selectedCourse.modules];
    const mod = newModules.find((m) => m.id === moduleId);
    if (mod) {
      mod.lessons = (mod.lessons || []).filter((l) => l.id !== lessonId);
    }
    await apiClient.reorderModules(selectedCourse.id, newModules);
    setSelectedCourse({ ...selectedCourse, modules: newModules });
    showToast('🗑️ Lesson deleted.');
  };

  const handleRenameModule = async (moduleId, newTitleText) => {
    const newModules = [...selectedCourse.modules];
    const mod = newModules.find((m) => m.id === moduleId);
    if (mod) {
      mod.title = newTitleText;
      await apiClient.reorderModules(selectedCourse.id, newModules);
      setSelectedCourse({ ...selectedCourse, modules: newModules });
    }
  };

  // ==========================================
  // STEP 2: LESSON CONTENT SAVE
  // ==========================================
  const handleSaveLessonContent = async () => {
    if (!selectedCourse || !selectedModuleId || !selectedLessonId) return;

    await apiClient.saveLessonContent(selectedCourse.id, selectedModuleId, selectedLessonId, {
      title: editingLessonTitle,
      duration: editingLessonDuration,
      content: editingLessonContent,
      summary: editingLessonSummary,
      is_mandatory: editingLessonMandatory
    });

    const newModules = [...selectedCourse.modules];
    const mod = newModules.find((m) => m.id === selectedModuleId);
    if (mod) {
      const les = (mod.lessons || []).find((l) => l.id === selectedLessonId);
      if (les) {
        les.title = editingLessonTitle;
        les.duration = editingLessonDuration;
        les.content = editingLessonContent;
        les.summary = editingLessonSummary;
        les.is_mandatory = editingLessonMandatory;
      }
    }
    setSelectedCourse({ ...selectedCourse, modules: newModules });
    showToast('✅ Lesson notes & terminal labs saved.');
  };

  // ==========================================
  // STEP 3: VIDEO UPLOAD & DIRECT INLINE LESSON BINDING
  // ==========================================
  const handleVideoFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const previewUrl = URL.createObjectURL(file);
      setVideoPreview(previewUrl);
      setVideoUrl(previewUrl);
      if (!videoTitle) {
        setVideoTitle(file.name.replace(/\.[^/.]+$/, ''));
      }
      showToast(`📹 Loaded local video: ${file.name}`);
    }
  };

  const handleSimulateVideoUpload = () => {
    if (!videoTitle.trim()) {
      alert('Please specify a Video Title before uploading.');
      return;
    }
    setIsUploading(true);
    setUploadProgress(15);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          finishVideoUpload();
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  const finishVideoUpload = async () => {
    setIsUploading(false);
    const associatedLessonObj = selectedCourse?.modules
      ?.flatMap((m) => m.lessons || [])
      ?.find((l) => l.id === videoAssociatedLesson);

    const fileSizeStr = videoFile
      ? `${(videoFile.size / (1024 * 1024)).toFixed(1)} MB`
      : 'Cloud Stream / HLS';

    let finalVideoUrl = videoUrl;
    if (videoFile) {
      const assetId = `vid_${Date.now()}`;
      finalVideoUrl = await saveVideoBlob(assetId, videoFile);
    } else if (!finalVideoUrl && videoPreview) {
      finalVideoUrl = videoPreview;
    } else if (!finalVideoUrl) {
      finalVideoUrl = '/assets/sample-lesson.mp4';
    }

    const newAsset = await apiClient.uploadVideoAsset(selectedCourse.id, {
      title: videoTitle,
      duration: videoDuration,
      file_name: videoFile ? videoFile.name : `${videoTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.mp4`,
      file_size: fileSizeStr,
      lesson_id: videoAssociatedLesson || null,
      lesson_title: associatedLessonObj?.title || 'General Curriculum',
      visibility: videoVisibility,
      url: finalVideoUrl,
      thumbnail: selectedCourse.art || '/assets/course-art/art-01.jpg'
    });

    if (newAsset) {
      if (associatedLessonObj) {
        associatedLessonObj.video_url = newAsset.url;
        associatedLessonObj.video_title = newAsset.title;
        associatedLessonObj.video_duration = newAsset.duration;
        associatedLessonObj.video_asset_id = newAsset.id;
        await apiClient.reorderModules(selectedCourse.id, selectedCourse.modules);
      }
      const assets = selectedCourse.video_assets || [];
      setSelectedCourse({ ...selectedCourse, video_assets: [newAsset, ...assets] });
      setVideoTitle('');
      setVideoFile(null);
      setVideoUrl('');
      setVideoPreview('');
      setUploadProgress(0);
      showToast(`✅ Video "${newAsset.title}" attached to ${newAsset.lesson_title}!`);
    }
  };

  // Direct Inline Re-assignment (No modal required!)
  const handleInlineRebindVideo = async (assetId, newLessonId) => {
    try {
      const updatedAsset = await apiClient.rebindVideoAsset(selectedCourse.id, assetId, newLessonId);
      if (updatedAsset) {
        // Update local course state
        const updatedAssets = (selectedCourse.video_assets || []).map((a) =>
          a.id === assetId ? { ...a, lesson_id: newLessonId, lesson_title: updatedAsset.lesson_title } : a
        );

        const newModules = [...selectedCourse.modules];
        for (const m of newModules) {
          for (const l of m.lessons || []) {
            if (l.video_asset_id === assetId && l.id !== newLessonId) {
              delete l.video_url;
              delete l.video_title;
              delete l.video_asset_id;
            }
            if (l.id === newLessonId) {
              l.video_url = updatedAsset.url;
              l.video_title = updatedAsset.title;
              l.video_duration = updatedAsset.duration;
              l.video_asset_id = updatedAsset.id;
            }
          }
        }

        setSelectedCourse({
          ...selectedCourse,
          video_assets: updatedAssets,
          modules: newModules
        });
        showToast(`🔗 Video rebound to ${updatedAsset.lesson_title}`);
      }
    } catch (err) {
      console.error('Failed to rebind video:', err);
      showToast('❌ Failed to rebind video.');
    }
  };

  const handleDeleteVideo = async (assetId) => {
    if (!window.confirm('Delete this video asset from course curriculum?')) return;
    await apiClient.deleteVideoAsset(selectedCourse.id, assetId);
    const filtered = (selectedCourse.video_assets || []).filter((a) => a.id !== assetId);
    setSelectedCourse({ ...selectedCourse, video_assets: filtered });
    showToast('🗑️ Video asset removed.');
  };

  // ==========================================
  // STEP 4: QUIZ CONSTRUCTOR
  // ==========================================
  const handleAddQuizQuestion = async () => {
    if (!newQuestionText.trim() || !newOptionA || !newOptionB) {
      alert('Question text and at least 2 options are required.');
      return;
    }

    const questionObj = {
      id: `q_${Date.now()}`,
      text: newQuestionText,
      points: parseInt(newQuestionPoints, 10) || 25,
      topic: newQuestionTopic,
      options: [
        { id: 'opt_a', text: newOptionA, is_correct: newCorrectOption === 0 },
        { id: 'opt_b', text: newOptionB, is_correct: newCorrectOption === 1 },
        ...(newOptionC ? [{ id: 'opt_c', text: newOptionC, is_correct: newCorrectOption === 2 }] : []),
        ...(newOptionD ? [{ id: 'opt_d', text: newOptionD, is_correct: newCorrectOption === 3 }] : [])
      ]
    };

    const updatedQuestions = [...quizQuestions, questionObj];
    setQuizQuestions(updatedQuestions);

    if (quizModuleId) {
      await apiClient.saveQuizQuestions(selectedCourse.id, quizModuleId, `qz_${quizModuleId}`, {
        title: 'Module Knowledge Gate',
        passing_score: quizPassingScore,
        questions: updatedQuestions
      });
    }

    setNewQuestionText('');
    setNewOptionA('');
    setNewOptionB('');
    setNewOptionC('');
    setNewOptionD('');
    setNewCorrectOption(0);
    showToast('✅ Quiz question added & scoring threshold updated.');
  };

  const handleDeleteQuizQuestion = async (qId) => {
    const updated = quizQuestions.filter((q) => q.id !== qId);
    setQuizQuestions(updated);
    if (quizModuleId) {
      await apiClient.saveQuizQuestions(selectedCourse.id, quizModuleId, `qz_${quizModuleId}`, {
        title: 'Module Knowledge Gate',
        passing_score: quizPassingScore,
        questions: updated
      });
    }
    showToast('🗑️ Quiz question removed.');
  };

  // ==========================================
  // STEP 5: DRAFT TO LIVE PUBLISHER
  // ==========================================
  const handlePublishLive = async () => {
    if (!selectedCourse) return;
    const res = await apiClient.publishCourseVersion(selectedCourse.id);
    if (res) {
      setSelectedCourse({ ...selectedCourse, version: res.version, is_published: true });
      showToast(`🚀 Course Published Live! Incremented to version ${res.version}`);
      await loadCourses();
    }
  };

  // ==========================================
  // COURSE CREATION WITH CUSTOM CREATABLE INPUTS
  // ==========================================
  const handleCreateCourse = async (e) => {
    e.preventDefault();
    if (!newTitle || !newSlug) return;
    setCreating(true);

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
        : ['Threat Detection', 'Incident Containment', 'Defensive Hardening'];

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
        learning_objectives: parsedSkills.map((s) => `Master ${s} in defensive operational scenarios`)
      });

      showToast(`✅ Course created! Applied 3D design: ${result.card_variant || chosenPreset.id}`);
      await loadCourses();
      setShowCreateModal(false);
      setNewTitle('');
      setNewSlug('');
      setNewOverview('');
      setNewMilestoneCert('');
      setNewSkills('');
      setNewArtPreset('auto');
    } catch (err) {
      console.error('Failed to create course:', err);
      showToast(`❌ Error creating course: ${err.message}`);
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center font-lora">
        <div className="flex flex-col items-center space-y-4">
          <BookOpen className="w-10 h-10 text-[#65F58A] animate-pulse" />
          <div className="text-xs font-lora text-[#94A3B8] tracking-widest uppercase">Loading Curriculum Studio...</div>
        </div>
      </div>
    );
  }

  const allLessons = selectedCourse?.modules?.flatMap((m) =>
    (m.lessons || []).map((l) => ({ ...l, moduleId: m.id, moduleTitle: m.title }))
  ) || [];

  const previewActiveLesson = allLessons.find((l) => l.id === previewActiveLessonId) || allLessons[0];
  const [resolvedPreviewVideoUrl, setResolvedPreviewVideoUrl] = useState('/assets/sample-lesson.mp4');

  useEffect(() => {
    let active = true;
    if (previewActiveLesson?.video_url) {
      resolveVideoUrl(previewActiveLesson.video_url).then((url) => {
        if (active) setResolvedPreviewVideoUrl(url);
      });
    } else {
      setResolvedPreviewVideoUrl('/assets/sample-lesson.mp4');
    }
    return () => { active = false; };
  }, [previewActiveLesson?.video_url, previewActiveLesson?.id]);

  const isYouTubeEmbed = resolvedPreviewVideoUrl.includes('youtube.com') || resolvedPreviewVideoUrl.includes('youtu.be');
  const youTubeId = isYouTubeEmbed
    ? (resolvedPreviewVideoUrl.includes('v=')
        ? resolvedPreviewVideoUrl.split('v=')[1]?.split('&')[0]
        : resolvedPreviewVideoUrl.split('/').pop())
    : null;

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(courseSearchTerm.toLowerCase()) ||
    c.category?.toLowerCase().includes(courseSearchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto space-y-6 font-lora">
      {/* Top Operations Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#263440]">
        <Link
          to="/admin"
          className="flex items-center gap-1.5 text-xs font-lora text-[#94A3B8] hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Return to Operations Console</span>
        </Link>
        <div className="flex items-center gap-3 text-xs font-lora text-[#94A3B8]">
          <span>Role: <strong className="text-[#65F58A]">Super Admin</strong></span>
          <span className="text-[#263440]">|</span>
          <span>Studio: <strong className="text-white">Curriculum Architect</strong></span>
        </div>
      </div>

      {/* Main Studio Top Bar with Sleek Course Dropdown */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#101923] border border-[#263440] p-4 sm:p-5 rounded-2xl shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 px-3 py-0.5 rounded-full bg-[#65F58A]/10 border border-[#65F58A]/30 text-[#65F58A] text-[11px] font-lora">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CURRICULUM STUDIO WIZARD</span>
          </div>
          <h1 className="font-lora text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <span>Course Architecture Studio</span>
            {selectedCourse && (
              <span className="text-xs font-lora px-2.5 py-0.5 rounded-full bg-[#1B2530] border border-[#263440] text-[#65F58A]">
                v{selectedCourse.version || '1.0'} Live
              </span>
            )}
          </h1>
          <p className="text-xs font-lora text-[#94A3B8] max-w-xl">
            Configure hierarchy, author terminal labs, bind video streams, build knowledge gates, and verify with interactive Hope LMS live simulation.
          </p>
        </div>

        {/* Top Controls: Course Selector Dropdown & New Course Button */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Top Course Dropdown */}
          <div className="relative" ref={courseDropdownRef}>
            <button
              onClick={() => setCourseDropdownOpen(!courseDropdownOpen)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#071018] border border-[#263440] hover:border-[#65F58A]/60 text-white transition-all shadow-md group min-w-[240px] text-left"
            >
              <BookOpen className="w-4 h-4 text-[#65F58A] flex-shrink-0" />
              <div className="flex-1 truncate">
                <div className="text-xs font-lora font-bold truncate text-white group-hover:text-[#65F58A] transition-colors">
                  {selectedCourse ? selectedCourse.title : 'Select Course...'}
                </div>
                <div className="text-[10px] font-lora text-[#94A3B8] flex items-center gap-1.5">
                  <span>{selectedCourse?.category || 'Security'}</span>
                  <span>•</span>
                  <span>{selectedCourse?.difficulty || 'Intermediate'}</span>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-[#94A3B8] group-hover:text-white transition-colors flex-shrink-0" />
            </button>

            {/* Course Selector Dropdown Popover */}
            {courseDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#101923] border border-[#263440] shadow-2xl p-3 z-50 space-y-2 animate-fadeIn">
                {/* Search in Dropdown */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={courseSearchTerm}
                    onChange={(e) => setCourseSearchTerm(e.target.value)}
                    placeholder="Search courses by title or track..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-[#071018] border border-[#263440] text-xs font-lora text-white focus:outline-none focus:border-[#65F58A]"
                    autoFocus
                  />
                </div>

                {/* Courses List */}
                <div className="max-h-64 overflow-y-auto space-y-1 pr-1">
                  {filteredCourses.map((crs) => (
                    <button
                      key={crs.id}
                      onClick={() => {
                        selectCourse(crs);
                        setCourseDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                        selectedCourse?.id === crs.id
                          ? 'bg-[#1B2530] border border-[#65F58A]/40 text-white'
                          : 'hover:bg-[#071018] border border-transparent text-[#94A3B8] hover:text-white'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <div className="text-xs font-lora font-bold truncate text-white">
                          {crs.title}
                        </div>
                        <div className="text-[10px] font-lora text-[#94A3B8] flex items-center gap-2 mt-0.5">
                          <span>{crs.category}</span>
                          <span>•</span>
                          <span>{crs.difficulty}</span>
                          <span>•</span>
                          <span>{crs.estimated_duration}</span>
                        </div>
                      </div>
                      {selectedCourse?.id === crs.id && (
                        <Check className="w-4 h-4 text-[#65F58A] flex-shrink-0" />
                      )}
                    </button>
                  ))}
                  {filteredCourses.length === 0 && (
                    <div className="p-4 text-center text-xs font-lora text-[#94A3B8]">
                      No matching courses found.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2.5 rounded-xl bg-[#1B2530] border border-[#263440] hover:border-[#65F58A]/50 text-white font-lora font-bold text-xs flex items-center gap-2 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4 text-[#65F58A]" />
            <span>New Course</span>
          </button>
        </div>
      </div>

      {/* 5-Step Stepped Wizard Navigation Bar */}
      <BasicSteps
        currentStep={activeStep}
        onStepChange={(stepNum) => setActiveStep(stepNum)}
      />

      {/* Toast Notification */}
      {actionNotice && (
        <div className="p-3.5 rounded-xl bg-[#101923] border border-[#65F58A]/40 text-xs font-lora text-[#65F58A] flex items-center gap-2 animate-fadeIn shadow-lg">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 1: MODULES & HIERARCHY                              */}
      {/* ======================================================== */}
      {activeStep === 1 && (
        <div className="bg-[#101923] border border-[#263440] rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#263440] gap-3">
            <div>
              <h2 className="font-lora text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#65F58A]" />
                <span>Curriculum Hierarchy & Sequence Order</span>
              </h2>
              <p className="text-xs font-lora text-[#94A3B8] mt-0.5">
                Organize modules and lessons. Use handles to reorder, add lessons, or click details to inspect metadata.
              </p>
            </div>
            <button
              onClick={handleAddModule}
              className="px-3.5 py-2 rounded-xl bg-[#1B2530] border border-[#263440] hover:border-[#65F58A] text-xs font-lora font-bold text-[#65F58A] flex items-center gap-1.5 self-start sm:self-auto transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Module</span>
            </button>
          </div>

          <div className="space-y-4">
            {(selectedCourse?.modules || []).map((mod, modIdx) => (
              <div
                key={mod.id}
                className="p-5 rounded-2xl bg-[#071018] border border-[#263440] space-y-4 hover:border-[#65F58A]/30 transition-all shadow-sm"
              >
                {/* Module Header Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#263440]/60">
                  <div className="flex items-center gap-3">
                    <div className="text-slate-500 hover:text-[#65F58A] cursor-grab p-1">
                      <GripVertical className="w-4 h-4" />
                    </div>
                    <div className="flex items-center gap-1 bg-[#101923] px-2 py-0.5 rounded-lg border border-[#263440]">
                      <button
                        onClick={() => handleMoveModule(modIdx, -1)}
                        disabled={modIdx === 0}
                        className="text-slate-400 hover:text-white disabled:opacity-30 p-0.5"
                        title="Move Module Up"
                      >
                        <ChevronUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveModule(modIdx, 1)}
                        disabled={modIdx === (selectedCourse.modules.length - 1)}
                        className="text-slate-400 hover:text-white disabled:opacity-30 p-0.5"
                        title="Move Module Down"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <input
                      type="text"
                      defaultValue={mod.title}
                      onBlur={(e) => handleRenameModule(mod.id, e.target.value)}
                      className="bg-transparent text-white font-lora font-bold text-sm sm:text-base border-b border-transparent hover:border-[#263440] focus:border-[#65F58A] focus:outline-none px-1 py-0.5 transition-all max-w-sm sm:max-w-md"
                    />
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <span className="text-[11px] font-lora text-[#94A3B8] px-2 py-0.5 rounded bg-[#101923] border border-[#263440]">
                      {(mod.lessons || []).length} Lessons
                    </span>
                    <button
                      onClick={() => handleAddLesson(mod.id)}
                      className="px-2.5 py-1 rounded-lg bg-[#101923] border border-[#263440] hover:border-[#65F58A] text-xs font-lora text-[#65F58A] flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Lesson</span>
                    </button>
                    <button
                      onClick={() => handleDeleteModule(mod.id)}
                      className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
                      title="Delete Module"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Lessons List in Module */}
                <div className="space-y-2 pl-2 sm:pl-6">
                  {(mod.lessons || []).map((les, lesIdx) => {
                    const isFirst = lesIdx === 0;
                    const hasVideo = Boolean(les.video_url);

                    return (
                      <div
                        key={les.id}
                        className="p-3 rounded-xl bg-[#101923] border border-[#263440] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#65F58A]/40 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <GripVertical className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 cursor-grab" />
                          <div className="flex items-center gap-0.5 bg-[#071018] px-1 py-0.5 rounded border border-[#263440]">
                            <button
                              onClick={() => handleMoveLesson(modIdx, lesIdx, -1)}
                              disabled={lesIdx === 0}
                              className="text-slate-400 hover:text-white disabled:opacity-30 p-0.5"
                            >
                              <ChevronUp className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleMoveLesson(modIdx, lesIdx, 1)}
                              disabled={lesIdx === ((mod.lessons || []).length - 1)}
                              className="text-slate-400 hover:text-white disabled:opacity-30 p-0.5"
                            >
                              <ChevronDown className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Status Indicator */}
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                              isFirst
                                ? 'bg-[#65F58A]/10 text-[#65F58A] border border-[#65F58A]/30'
                                : 'bg-[#071018] text-[#94A3B8] border border-[#263440]'
                            }`}
                          >
                            {isFirst ? (
                              <PlayCircle className="w-3.5 h-3.5" />
                            ) : (
                              <Lock className="w-3 h-3" />
                            )}
                          </div>

                          <div className="space-y-0.5">
                            <span className="text-xs font-lora font-semibold text-white">
                              {les.title}
                            </span>
                            <div className="flex items-center gap-2 text-[10px] font-lora text-[#94A3B8]">
                              <span className="flex items-center gap-1">
                                <Clock className="w-2.5 h-2.5" />
                                {les.duration || '20 mins'}
                              </span>
                              <span>•</span>
                              <span className={hasVideo ? 'text-[#65F58A] font-semibold' : 'text-amber-400'}>
                                {hasVideo ? '📹 Video Attached' : '⚠️ No Video'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <button
                            onClick={() => setInspectingLesson(les)}
                            className="px-2 py-1 rounded-lg bg-[#071018] border border-[#263440] hover:border-[#65F58A] text-[11px] font-lora text-[#94A3B8] hover:text-white flex items-center gap-1"
                          >
                            <Eye className="w-3 h-3 text-[#65F58A]" />
                            <span>Inspect</span>
                          </button>
                          <button
                            onClick={() => {
                              handleSelectLessonForEditor(mod.id, les);
                              setActiveStep(2);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-[#1B2530] border border-[#263440] hover:border-[#65F58A] text-[11px] font-lora text-[#65F58A] flex items-center gap-1"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit Notes</span>
                          </button>
                          <button
                            onClick={() => handleDeleteLesson(mod.id, les.id)}
                            className="text-slate-400 hover:text-rose-400 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Step 1 Footer Action Bar */}
          <div className="pt-4 border-t border-[#263440] flex items-center justify-between">
            <span className="text-xs font-lora text-[#94A3B8]">
              {selectedCourse?.modules?.length || 0} Modules • {allLessons.length} Lessons configured
            </span>
            <button
              onClick={() => setActiveStep(2)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#65F58A] to-[#35E6B5] text-[#071018] font-lora font-bold text-xs tracking-wider flex items-center gap-2 hover:opacity-90 transition-all shadow-md"
            >
              <span>Save & Next: Content Editor</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 2: CONTENT EDITOR & TERMINAL LABS                   */}
      {/* ======================================================== */}
      {activeStep === 2 && (
        <div className="bg-[#101923] border border-[#263440] rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#263440] gap-3">
            <div>
              <h2 className="font-lora text-lg font-bold text-white flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-[#65F58A]" />
                <span>Lesson Content & Markdown Labs</span>
              </h2>
              <p className="text-xs font-lora text-[#94A3B8] mt-0.5">
                Author technical notes, terminal labs, code blocks, and execution steps for cadets.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveLessonContent}
                className="px-4 py-2 rounded-xl bg-[#65F58A] text-[#071018] font-lora font-bold text-xs flex items-center gap-1.5 hover:bg-[#65F58A]/90 transition-all shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>Save Lesson</span>
              </button>
            </div>
          </div>

          {/* Module & Lesson Picker Ribbon */}
          <div className="p-4 rounded-xl bg-[#071018] border border-[#263440] space-y-3">
            <label className="text-[11px] font-lora text-[#94A3B8]">Select Lesson to Edit:</label>
            <div className="flex flex-wrap gap-2">
              {allLessons.map((les) => (
                <button
                  key={les.id}
                  onClick={() => handleSelectLessonForEditor(les.moduleId, les)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-lora transition-all ${
                    selectedLessonId === les.id
                      ? 'bg-[#65F58A] text-[#071018] font-bold shadow-md'
                      : 'bg-[#101923] border border-[#263440] text-[#94A3B8] hover:text-white'
                  }`}
                >
                  {les.title}
                </button>
              ))}
            </div>
          </div>

          {/* Lesson Metadata Form */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-lora text-[#94A3B8]">Lesson Title</label>
              <input
                type="text"
                value={editingLessonTitle}
                onChange={(e) => setEditingLessonTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#071018] border border-[#263440] text-white text-xs font-lora focus:outline-none focus:border-[#65F58A]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-lora text-[#94A3B8]">Estimated Duration</label>
              <input
                type="text"
                value={editingLessonDuration}
                onChange={(e) => setEditingLessonDuration(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#071018] border border-[#263440] text-white text-xs font-lora focus:outline-none focus:border-[#65F58A]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-lora text-[#94A3B8]">Mandatory Completion</label>
              <label className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#071018] border border-[#263440] text-xs font-lora text-white cursor-pointer h-[38px]">
                <input
                  type="checkbox"
                  checked={editingLessonMandatory}
                  onChange={(e) => setEditingLessonMandatory(e.target.checked)}
                  className="rounded text-[#65F58A] focus:ring-0"
                />
                <span>Required for Certification Gate</span>
              </label>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-lora text-[#94A3B8]">Summary Abstract</label>
            <input
              type="text"
              value={editingLessonSummary}
              onChange={(e) => setEditingLessonSummary(e.target.value)}
              placeholder="Brief summary of concepts mastered in this lesson..."
              className="w-full px-3 py-2 rounded-xl bg-[#071018] border border-[#263440] text-white text-xs font-lora focus:outline-none focus:border-[#65F58A]"
            />
          </div>

          {/* Markdown Editor / Preview Tabs */}
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#071018] border border-[#263440]">
                <button
                  type="button"
                  onClick={() => setEditorTab('write')}
                  className={`px-3 py-1 rounded text-xs font-lora transition-all ${
                    editorTab === 'write'
                      ? 'bg-[#1B2530] text-[#65F58A] font-bold'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  Markdown Source
                </button>
                <button
                  type="button"
                  onClick={() => setEditorTab('preview')}
                  className={`px-3 py-1 rounded text-xs font-lora transition-all ${
                    editorTab === 'preview'
                      ? 'bg-[#1B2530] text-[#65F58A] font-bold'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  Live Preview
                </button>
              </div>

              {/* Quick Snippet Inserts */}
              {editorTab === 'write' && (
                <div className="flex items-center gap-1.5 text-[11px] font-lora">
                  <button
                    type="button"
                    onClick={() => setEditingLessonContent((c) => (c ? c + '\n\n```bash\n# Terminal Command\nsudo netstat -tulnp\n```\n' : '```bash\n# Terminal Command\nsudo netstat -tulnp\n```\n'))}
                    className="px-2 py-1 rounded bg-[#071018] border border-[#263440] hover:border-[#65F58A] text-[#94A3B8] hover:text-white"
                  >
                    + Bash Code
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingLessonContent((c) => `${c}\n\n> [!NOTE]\n> Defensive alert note here.\n`)}
                    className="px-2 py-1 rounded bg-[#071018] border border-[#263440] hover:border-[#65F58A] text-[#94A3B8] hover:text-white"
                  >
                    + Callout
                  </button>
                </div>
              )}
            </div>

            {editorTab === 'write' ? (
              <textarea
                rows={12}
                value={editingLessonContent}
                onChange={(e) => setEditingLessonContent(e.target.value)}
                placeholder="Write lesson notes, markdown formatting, commands, and code blocks..."
                className="w-full px-4 py-3 rounded-2xl bg-[#071018] border border-[#263440] text-slate-200 text-xs font-mono leading-relaxed focus:outline-none focus:border-[#65F58A]"
              />
            ) : (
              <div className="p-5 rounded-2xl bg-[#071018] border border-[#263440] min-h-[250px] space-y-4 text-xs font-lora leading-relaxed text-slate-200">
                <div className="text-sm font-lora font-bold text-white border-b border-[#263440] pb-2">
                  Preview: {editingLessonTitle}
                </div>
                <div
                  className="font-lora"
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdownToHtml(editingLessonContent || 'No notes authored yet for this lesson.')
                  }}
                />
              </div>
            )}
          </div>

          {/* Step 2 Footer Navigation */}
          <div className="pt-4 border-t border-[#263440] flex items-center justify-between">
            <button
              onClick={() => setActiveStep(1)}
              className="px-4 py-2 rounded-xl bg-[#071018] border border-[#263440] text-[#94A3B8] hover:text-white text-xs font-lora flex items-center gap-1.5 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back: Hierarchy</span>
            </button>
            <button
              onClick={async () => {
                await handleSaveLessonContent();
                setActiveStep(3);
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#65F58A] to-[#35E6B5] text-[#071018] font-lora font-bold text-xs tracking-wider flex items-center gap-2 hover:opacity-90 transition-all shadow-md"
            >
              <span>Save & Next: Video Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 3: VIDEO STUDIO & DIRECT INLINE LESSON BINDING     */}
      {/* ======================================================== */}
      {activeStep === 3 && (
        <div className="bg-[#101923] border border-[#263440] rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#263440] gap-3">
            <div>
              <h2 className="font-lora text-lg font-bold text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-[#65F58A]" />
                <span>Video Asset Studio & Direct Inline Binding</span>
              </h2>
              <p className="text-xs font-lora text-[#94A3B8] mt-0.5">
                Upload local videos or paste streaming URLs. Attach directly to any lesson inline without confusing popup modals.
              </p>
            </div>
          </div>

          {/* Upload & Stream Ingestion Box */}
          <div className="p-5 rounded-2xl bg-[#071018] border border-[#263440] space-y-4">
            <h3 className="font-lora text-sm font-bold text-white">Ingest New Video Asset</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Drag & Drop Local File Zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#263440] hover:border-[#65F58A] rounded-xl p-5 text-center cursor-pointer transition-all bg-[#101923]/60 flex flex-col items-center justify-center space-y-2 group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/mp4,video/webm"
                  onChange={handleVideoFileSelect}
                  className="hidden"
                />
                <div className="w-10 h-10 rounded-full bg-[#071018] border border-[#263440] group-hover:border-[#65F58A] flex items-center justify-center text-[#65F58A]">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div className="text-xs font-lora font-bold text-white">
                  {videoFile ? videoFile.name : 'Select or Drop MP4/WebM Video'}
                </div>
                <div className="text-[10px] font-lora text-[#94A3B8]">
                  {videoFile ? `${(videoFile.size / (1024 * 1024)).toFixed(1)} MB` : 'Up to 2GB • H.264/AAC encoded'}
                </div>
              </div>

              {/* Cloud Stream URL alternative */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-lora text-[#94A3B8]">Or Cloud Stream / YouTube / Vimeo / HLS URL</label>
                  <input
                    type="text"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://commondatastorage.googleapis.com/... or YouTube URL"
                    className="w-full px-3 py-2 rounded-xl bg-[#101923] border border-[#263440] text-white text-xs font-lora focus:outline-none focus:border-[#65F58A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-lora text-[#94A3B8]">Video Title *</label>
                    <input
                      type="text"
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                      placeholder="e.g. Telemetry Ingestion"
                      className="w-full px-3 py-2 rounded-xl bg-[#101923] border border-[#263440] text-white text-xs font-lora focus:outline-none focus:border-[#65F58A]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-lora text-[#94A3B8]">Duration</label>
                    <input
                      type="text"
                      value={videoDuration}
                      onChange={(e) => setVideoDuration(e.target.value)}
                      placeholder="14:30"
                      className="w-full px-3 py-2 rounded-xl bg-[#101923] border border-[#263440] text-white text-xs font-lora focus:outline-none focus:border-[#65F58A]"
                    />
                  </div>
                </div>

                {/* Direct Target Lesson Dropdown Selector */}
                <div className="space-y-1">
                  <label className="text-[11px] font-lora text-[#94A3B8]">
                    Target Lesson (Auto-binds video directly to lesson)
                  </label>
                  <select
                    value={videoAssociatedLesson}
                    onChange={(e) => setVideoAssociatedLesson(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#101923] border border-[#263440] text-white text-xs font-lora focus:outline-none focus:border-[#65F58A]"
                  >
                    <option value="">-- General Course Video (Unbound) --</option>
                    {allLessons.map((l) => (
                      <option key={l.id} value={l.id}>
                        [{l.moduleTitle}] {l.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Upload Action and Progress */}
            {isUploading && (
              <div className="space-y-1 pt-2">
                <div className="flex justify-between text-[10px] font-lora text-[#65F58A]">
                  <span>Uploading & Optimizing Video Asset...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-[#101923] h-2 rounded-full overflow-hidden border border-[#263440]">
                  <div
                    className="bg-[#65F58A] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleSimulateVideoUpload}
                disabled={isUploading}
                className="px-5 py-2.5 rounded-xl bg-[#65F58A] text-[#071018] font-lora font-bold text-xs flex items-center gap-2 hover:bg-[#65F58A]/90 transition-all shadow-md disabled:opacity-50"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Upload & Attach Asset</span>
              </button>
            </div>
          </div>

          {/* Video Asset Library with Direct Inline Re-assignment */}
          <div className="space-y-3">
            <h3 className="font-lora text-sm font-bold text-white flex items-center gap-2">
              <span>Course Video Asset Library</span>
              <span className="text-xs font-normal text-[#94A3B8]">
                ({(selectedCourse?.video_assets || []).length} Assets)
              </span>
            </h3>

            {(selectedCourse?.video_assets || []).length > 0 ? (
              <div className="space-y-2">
                {(selectedCourse.video_assets || []).map((asset) => (
                  <div
                    key={asset.id}
                    className="p-4 rounded-xl bg-[#071018] border border-[#263440] hover:border-[#65F58A]/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-10 rounded-lg bg-[#101923] border border-[#263440] flex items-center justify-center text-[#65F58A] flex-shrink-0">
                        <Video className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="text-xs font-lora font-bold text-white">{asset.title}</div>
                        <div className="text-[10px] font-lora text-[#94A3B8] flex items-center gap-2">
                          <span>{asset.duration}</span>
                          <span>•</span>
                          <span>{asset.file_size}</span>
                          <span>•</span>
                          <span className="text-[#35E6B5]">{asset.visibility}</span>
                        </div>
                      </div>
                    </div>

                    {/* Inline Lesson Selector (Replaces confusing modal) */}
                    <div className="flex items-center gap-2 self-end md:self-auto">
                      <span className="text-[11px] font-lora text-[#94A3B8] whitespace-nowrap">
                        Attached to:
                      </span>
                      <select
                        value={asset.lesson_id || ''}
                        onChange={(e) => handleInlineRebindVideo(asset.id, e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg bg-[#101923] border border-[#263440] hover:border-[#65F58A] text-xs font-lora text-[#65F58A] focus:outline-none focus:border-[#65F58A] max-w-xs truncate"
                      >
                        <option value="">-- Unassigned --</option>
                        {allLessons.map((l) => (
                          <option key={l.id} value={l.id}>
                            [{l.moduleTitle}] {l.title}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={() => handleDeleteVideo(asset.id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                        title="Delete Asset"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-[#071018] border border-[#263440] text-center space-y-2">
                <Video className="w-8 h-8 text-[#94A3B8] mx-auto opacity-50" />
                <div className="text-xs font-lora font-bold text-white">No Video Assets Uploaded Yet</div>
                <div className="text-[11px] font-lora text-[#94A3B8] max-w-md mx-auto">
                  Upload an MP4 video or paste a stream link above to attach multimedia instruction directly to course lessons.
                </div>
              </div>
            )}
          </div>

          {/* Step 3 Footer Navigation */}
          <div className="pt-4 border-t border-[#263440] flex items-center justify-between">
            <button
              onClick={() => setActiveStep(2)}
              className="px-4 py-2 rounded-xl bg-[#071018] border border-[#263440] text-[#94A3B8] hover:text-white text-xs font-lora flex items-center gap-1.5 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back: Content Editor</span>
            </button>
            <button
              onClick={() => setActiveStep(4)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#65F58A] to-[#35E6B5] text-[#071018] font-lora font-bold text-xs tracking-wider flex items-center gap-2 hover:opacity-90 transition-all shadow-md"
            >
              <span>Save & Next: Quiz Constructor</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 4: QUIZ CONSTRUCTOR & PASSING THRESHOLD            */}
      {/* ======================================================== */}
      {activeStep === 4 && (
        <div className="bg-[#101923] border border-[#263440] rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#263440] gap-3">
            <div>
              <h2 className="font-lora text-lg font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#65F58A]" />
                <span>Quiz Gate Constructor & Proctoring Thresholds</span>
              </h2>
              <p className="text-xs font-lora text-[#94A3B8] mt-0.5">
                Define knowledge verification questions, point weights, and minimum passing threshold (≥ 80%).
              </p>
            </div>
          </div>

          {/* Module Selector for Quiz */}
          <div className="p-4 rounded-xl bg-[#071018] border border-[#263440] space-y-2">
            <label className="text-[11px] font-lora text-[#94A3B8]">Select Module to Configure Quiz:</label>
            <div className="flex flex-wrap gap-2">
              {(selectedCourse?.modules || []).map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleSelectQuizModule(m.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-lora transition-all ${
                    quizModuleId === m.id
                      ? 'bg-[#65F58A] text-[#071018] font-bold shadow-md'
                      : 'bg-[#101923] border border-[#263440] text-[#94A3B8] hover:text-white'
                  }`}
                >
                  {m.title}
                </button>
              ))}
            </div>
          </div>

          {/* Passing Score Slider */}
          <div className="p-4 rounded-xl bg-[#071018] border border-[#263440] space-y-2">
            <div className="flex justify-between items-center text-xs font-lora">
              <span className="text-[#94A3B8]">Passing Score Requirement:</span>
              <span className="text-[#65F58A] font-bold text-sm">{quizPassingScore}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              step="5"
              value={quizPassingScore}
              onChange={(e) => setQuizPassingScore(parseInt(e.target.value, 10))}
              className="w-full accent-[#65F58A] cursor-pointer"
            />
            <div className="text-[10px] font-lora text-[#94A3B8]">
              Standard RedKross Academy certification threshold is 80%. Students scoring below this enter cooldown.
            </div>
          </div>

          {/* Existing Quiz Questions */}
          <div className="space-y-3">
            <h3 className="font-lora text-sm font-bold text-white flex items-center gap-2">
              <span>Configured Questions ({quizQuestions.length})</span>
            </h3>

            {quizQuestions.length > 0 ? (
              <div className="space-y-3">
                {quizQuestions.map((q, idx) => (
                  <div
                    key={q.id || idx}
                    className="p-4 rounded-xl bg-[#071018] border border-[#263440] space-y-2 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="text-xs font-lora font-bold text-white flex items-center gap-2">
                          <span className="text-[#65F58A]">Q{idx + 1}.</span>
                          <span>{q.text}</span>
                        </div>
                        <div className="text-[10px] font-lora text-[#94A3B8] flex items-center gap-2">
                          <span>Topic: {q.topic || 'General'}</span>
                          <span>•</span>
                          <span>{q.points || 25} Points</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteQuizQuestion(q.id)}
                        className="text-slate-400 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-[#263440]/60">
                      {(q.options || []).map((opt, optIdx) => (
                        <div
                          key={opt.id || optIdx}
                          className={`px-3 py-1.5 rounded-lg text-xs font-lora flex items-center gap-2 ${
                            opt.is_correct
                              ? 'bg-[#65F58A]/15 text-[#65F58A] border border-[#65F58A]/30 font-bold'
                              : 'bg-[#101923] text-[#94A3B8] border border-[#263440]'
                          }`}
                        >
                          <span className="font-mono text-[10px]">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          <span>{opt.text}</span>
                          {opt.is_correct && <Check className="w-3.5 h-3.5 text-[#65F58A] ml-auto" />}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-[#071018] border border-[#263440] text-center text-xs font-lora text-[#94A3B8]">
                No questions added to this module quiz yet. Add questions below.
              </div>
            )}
          </div>

          {/* Add Question Form */}
          <div className="p-5 rounded-2xl bg-[#071018] border border-[#263440] space-y-4">
            <h3 className="font-lora text-sm font-bold text-white">Add New Question</h3>

            <div className="space-y-1">
              <label className="text-[11px] font-lora text-[#94A3B8]">Question Text *</label>
              <textarea
                rows={2}
                value={newQuestionText}
                onChange={(e) => setNewQuestionText(e.target.value)}
                placeholder="e.g. Which command enables auditing on Linux sysfs?"
                className="w-full px-3 py-2 rounded-xl bg-[#101923] border border-[#263440] text-white text-xs font-lora focus:outline-none focus:border-[#65F58A]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-lora text-[#94A3B8]">Topic Track</label>
                <input
                  type="text"
                  value={newQuestionTopic}
                  onChange={(e) => setNewQuestionTopic(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#101923] border border-[#263440] text-white text-xs font-lora focus:outline-none focus:border-[#65F58A]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-lora text-[#94A3B8]">Points Weight</label>
                <input
                  type="number"
                  value={newQuestionPoints}
                  onChange={(e) => setNewQuestionPoints(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#101923] border border-[#263440] text-white text-xs font-lora focus:outline-none focus:border-[#65F58A]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-lora text-[#94A3B8]">Options & Correct Choice:</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#101923] border border-[#263440]">
                  <input
                    type="radio"
                    name="correct_opt"
                    checked={newCorrectOption === 0}
                    onChange={() => setNewCorrectOption(0)}
                    className="accent-[#65F58A]"
                  />
                  <input
                    type="text"
                    value={newOptionA}
                    onChange={(e) => setNewOptionA(e.target.value)}
                    placeholder="Option A *"
                    className="w-full bg-transparent text-white text-xs font-lora focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#101923] border border-[#263440]">
                  <input
                    type="radio"
                    name="correct_opt"
                    checked={newCorrectOption === 1}
                    onChange={() => setNewCorrectOption(1)}
                    className="accent-[#65F58A]"
                  />
                  <input
                    type="text"
                    value={newOptionB}
                    onChange={(e) => setNewOptionB(e.target.value)}
                    placeholder="Option B *"
                    className="w-full bg-transparent text-white text-xs font-lora focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#101923] border border-[#263440]">
                  <input
                    type="radio"
                    name="correct_opt"
                    checked={newCorrectOption === 2}
                    onChange={() => setNewCorrectOption(2)}
                    className="accent-[#65F58A]"
                  />
                  <input
                    type="text"
                    value={newOptionC}
                    onChange={(e) => setNewOptionC(e.target.value)}
                    placeholder="Option C (Optional)"
                    className="w-full bg-transparent text-white text-xs font-lora focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#101923] border border-[#263440]">
                  <input
                    type="radio"
                    name="correct_opt"
                    checked={newCorrectOption === 3}
                    onChange={() => setNewCorrectOption(3)}
                    className="accent-[#65F58A]"
                  />
                  <input
                    type="text"
                    value={newOptionD}
                    onChange={(e) => setNewOptionD(e.target.value)}
                    placeholder="Option D (Optional)"
                    className="w-full bg-transparent text-white text-xs font-lora focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleAddQuizQuestion}
                className="px-5 py-2 rounded-xl bg-[#65F58A] text-[#071018] font-lora font-bold text-xs flex items-center gap-1.5 hover:bg-[#65F58A]/90 transition-all shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Save Question to Quiz</span>
              </button>
            </div>
          </div>

          {/* Step 4 Footer Navigation */}
          <div className="pt-4 border-t border-[#263440] flex items-center justify-between">
            <button
              onClick={() => setActiveStep(3)}
              className="px-4 py-2 rounded-xl bg-[#071018] border border-[#263440] text-[#94A3B8] hover:text-white text-xs font-lora flex items-center gap-1.5 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back: Video Studio</span>
            </button>
            <button
              onClick={() => setActiveStep(5)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#65F58A] to-[#35E6B5] text-[#071018] font-lora font-bold text-xs tracking-wider flex items-center gap-2 hover:opacity-90 transition-all shadow-md"
            >
              <span>Save & Next: Full Live Preview</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* STEP 5: FULL INTERACTIVE LIVE PREVIEW (HOPE LMS LAYOUT)  */}
      {/* ======================================================== */}
      {activeStep === 5 && (
        <div className="space-y-6">
          {/* Top Preview Banner with Jump Actions & Publish Button */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#101923] border border-[#263440] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#35E6B5]/10 border border-[#35E6B5]/30 text-[#35E6B5] text-[10px] font-lora font-bold uppercase">
                <span>Phase 7 Interactive Preview</span>
                <span>•</span>
                <span>Hope LMS Architecture</span>
              </div>
              <h2 className="font-lora text-xl font-bold text-white flex items-center gap-2">
                <span>{selectedCourse?.title}</span>
              </h2>
              <p className="text-xs font-lora text-[#94A3B8]">
                Complete interactive student simulation. Test video streaming, examine notes, and verify quiz readiness.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveStep(1)}
                className="px-3 py-1.5 rounded-xl bg-[#071018] border border-[#263440] hover:border-[#65F58A] text-xs font-lora text-[#94A3B8] hover:text-white flex items-center gap-1 transition-all"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#65F58A]" />
                <span>Edit Hierarchy</span>
              </button>
              <button
                onClick={() => setActiveStep(2)}
                className="px-3 py-1.5 rounded-xl bg-[#071018] border border-[#263440] hover:border-[#65F58A] text-xs font-lora text-[#94A3B8] hover:text-white flex items-center gap-1 transition-all"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#65F58A]" />
                <span>Edit Notes</span>
              </button>
              <button
                onClick={() => setActiveStep(3)}
                className="px-3 py-1.5 rounded-xl bg-[#071018] border border-[#263440] hover:border-[#65F58A] text-xs font-lora text-[#94A3B8] hover:text-white flex items-center gap-1 transition-all"
              >
                <Video className="w-3.5 h-3.5 text-[#65F58A]" />
                <span>Edit Videos</span>
              </button>
              <button
                onClick={() => setActiveStep(4)}
                className="px-3 py-1.5 rounded-xl bg-[#071018] border border-[#263440] hover:border-[#65F58A] text-xs font-lora text-[#94A3B8] hover:text-white flex items-center gap-1 transition-all"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#65F58A]" />
                <span>Edit Quiz</span>
              </button>
              <button
                onClick={handlePublishLive}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#65F58A] to-[#35E6B5] text-[#071018] font-lora font-bold text-xs tracking-wider flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-[#65F58A]/20"
              >
                <Sparkles className="w-4 h-4" />
                <span>Publish Live Version</span>
              </button>
            </div>
          </div>

          {/* Hope LMS 2-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column (68% - 8 cols): Video Player + Lesson Content */}
            <div className="lg:col-span-8 space-y-5">
              {/* Center Video Player */}
              <div className="bg-[#101923] border border-[#263440] rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative aspect-video bg-[#071018] flex items-center justify-center">
                  {isYouTubeEmbed && youTubeId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${youTubeId}?autoplay=0&rel=0`}
                      title="Lesson Video Stream"
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      controls
                      key={resolvedPreviewVideoUrl}
                      className="w-full h-full object-cover"
                      poster={selectedCourse?.art || '/assets/course-art/art-01.jpg'}
                    >
                      <source src={resolvedPreviewVideoUrl} type="video/mp4" />
                      Your browser does not support HTML5 video streaming.
                    </video>
                  )}
                </div>

                {/* Active Lesson Info Bar */}
                <div className="p-4 sm:p-5 border-t border-[#263440] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#071018]">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-lora font-bold bg-[#65F58A]/10 text-[#65F58A] border border-[#65F58A]/30">
                        {previewActiveLesson?.duration || '20 mins'}
                      </span>
                      {previewActiveLesson?.is_mandatory && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-lora font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                          Mandatory Gate
                        </span>
                      )}
                    </div>
                    <h3 className="font-lora text-base font-bold text-white">
                      {previewActiveLesson?.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => {
                        handleSelectLessonForEditor(previewActiveLesson?.moduleId, previewActiveLesson);
                        setActiveStep(2);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#101923] border border-[#263440] hover:border-[#65F58A] text-xs font-lora text-[#65F58A] flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Content</span>
                    </button>
                    <button
                      onClick={() => setActiveStep(3)}
                      className="px-3 py-1.5 rounded-lg bg-[#101923] border border-[#263440] hover:border-[#65F58A] text-xs font-lora text-[#35E6B5] flex items-center gap-1"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Edit Video</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Sub-tabs below Video Player */}
              <div className="bg-[#101923] border border-[#263440] rounded-2xl p-5 space-y-4 shadow-xl">
                <div className="flex items-center gap-2 pb-3 border-b border-[#263440]">
                  <button
                    onClick={() => setPreviewTab('notes')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-lora transition-all ${
                      previewTab === 'notes'
                        ? 'bg-[#1B2530] text-[#65F58A] font-bold border border-[#65F58A]/30 shadow-sm'
                        : 'text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    Terminal Labs & Notes
                  </button>
                  <button
                    onClick={() => setPreviewTab('overview')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-lora transition-all ${
                      previewTab === 'overview'
                        ? 'bg-[#1B2530] text-[#65F58A] font-bold border border-[#65F58A]/30 shadow-sm'
                        : 'text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    Course Overview & Objectives
                  </button>
                  <button
                    onClick={() => setPreviewTab('quiz')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-lora transition-all ${
                      previewTab === 'quiz'
                        ? 'bg-[#1B2530] text-[#65F58A] font-bold border border-[#65F58A]/30 shadow-sm'
                        : 'text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    Module Quiz Gate
                  </button>
                </div>

                {previewTab === 'notes' && (
                  <div className="p-4 rounded-xl bg-[#071018] border border-[#263440] space-y-3">
                    <div className="text-xs font-lora font-bold text-white flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-[#65F58A]" />
                      <span>Lesson Lab Instructions</span>
                    </div>
                    <div
                      className="text-xs font-lora text-slate-300 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: renderMarkdownToHtml(previewActiveLesson?.content || 'No laboratory instructions defined yet for this lesson.')
                      }}
                    />
                  </div>
                )}

                {previewTab === 'overview' && (
                  <div className="p-4 rounded-xl bg-[#071018] border border-[#263440] space-y-3 text-xs font-lora">
                    <div className="text-white font-bold text-sm">Course Overview</div>
                    <p className="text-slate-300 leading-relaxed">
                      {selectedCourse?.overview}
                    </p>
                    <div className="space-y-1.5 pt-2 border-t border-[#263440]">
                      <div className="text-[11px] font-bold text-[#65F58A]">Key Skills Validated:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {(selectedCourse?.skills || []).map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded bg-[#101923] border border-[#263440] text-[10px] text-[#94A3B8]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {previewTab === 'quiz' && (
                  <div className="p-4 rounded-xl bg-[#071018] border border-[#263440] space-y-3 text-xs font-lora">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-bold">Module Knowledge Gate</span>
                      <span className="text-[#65F58A] font-bold">Threshold: {quizPassingScore}%</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      {quizQuestions.length} Examination questions configured for proctored evaluation.
                    </p>
                    <button
                      onClick={() => setActiveStep(4)}
                      className="px-3 py-1.5 rounded-lg bg-[#1B2530] border border-[#263440] hover:border-[#65F58A] text-xs font-lora text-[#65F58A] flex items-center gap-1"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Review & Edit Quiz Questions</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column (32% - 4 cols): Course Overview + Syllabus Tree */}
            <div className="lg:col-span-4 space-y-5">
              {/* Course Overview & Metadata Card */}
              <div className="bg-[#101923] border border-[#263440] rounded-2xl p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-2 border-b border-[#263440]">
                  <span className="text-xs font-lora font-bold text-white uppercase tracking-wider">
                    Course Profile
                  </span>
                  <span className="text-[10px] font-lora px-2 py-0.5 rounded bg-[#65F58A]/10 text-[#65F58A] border border-[#65F58A]/30">
                    {selectedCourse?.category || 'Security'}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs font-lora">
                  <div className="flex items-center justify-between">
                    <span className="text-[#94A3B8]">Difficulty Level:</span>
                    <span className="text-white font-bold">{selectedCourse?.difficulty || 'Intermediate'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#94A3B8]">Estimated Duration:</span>
                    <span className="text-white font-bold">{selectedCourse?.estimated_duration || '16 Hours'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#94A3B8]">Total Lessons:</span>
                    <span className="text-white font-bold">{allLessons.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#94A3B8]">Token Bounty:</span>
                    <span className="text-[#65F58A] font-bold">🪙 {selectedCourse?.total_tokens_reward || 300} Tokens</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#071018] border border-[#263440] space-y-1">
                  <div className="text-[10px] font-lora text-[#94A3B8] uppercase">Milestone Credential</div>
                  <div className="text-xs font-lora font-bold text-white flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#65F58A]" />
                    <span>{selectedCourse?.milestone_cert || 'Certified Specialist'}</span>
                  </div>
                </div>
              </div>

              {/* Interactive Curriculum Tree (Hope LMS Syllabus) */}
              <div className="bg-[#101923] border border-[#263440] rounded-2xl p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-2 border-b border-[#263440]">
                  <span className="text-xs font-lora font-bold text-white uppercase tracking-wider">
                    Interactive Syllabus
                  </span>
                  <button
                    onClick={() => setActiveStep(1)}
                    className="text-[11px] font-lora text-[#65F58A] hover:underline flex items-center gap-1"
                  >
                    <span>Edit Tree</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {(selectedCourse?.modules || []).map((m, mIdx) => (
                    <div key={m.id} className="space-y-1.5">
                      <div className="text-xs font-lora font-bold text-[#65F58A] flex items-center gap-1.5 px-1">
                        <span>Module {mIdx + 1}:</span>
                        <span className="text-white truncate">{m.title.replace(/^Module \d+:\s*/, '')}</span>
                      </div>

                      <div className="space-y-1 pl-2">
                        {(m.lessons || []).map((les) => {
                          const isCurrent = previewActiveLesson?.id === les.id;
                          return (
                            <button
                              key={les.id}
                              onClick={() => setPreviewActiveLessonId(les.id)}
                              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                                isCurrent
                                  ? 'bg-[#1B2530] border border-[#65F58A]/50 text-white shadow-md'
                                  : 'bg-[#071018] border border-[#263440] text-[#94A3B8] hover:text-white hover:border-[#263440]'
                              }`}
                            >
                              <div className="flex items-center gap-2 truncate">
                                <PlayCircle className={`w-3.5 h-3.5 flex-shrink-0 ${isCurrent ? 'text-[#65F58A]' : 'text-slate-500'}`} />
                                <span className="text-xs font-lora font-medium truncate">
                                  {les.title}
                                </span>
                              </div>
                              <span className="text-[10px] font-lora text-[#94A3B8] flex-shrink-0 ml-2">
                                {les.duration || '20m'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 Footer Navigation */}
          <div className="pt-4 border-t border-[#263440] flex items-center justify-between">
            <button
              onClick={() => setActiveStep(4)}
              className="px-4 py-2 rounded-xl bg-[#071018] border border-[#263440] text-[#94A3B8] hover:text-white text-xs font-lora flex items-center gap-1.5 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back: Quiz Constructor</span>
            </button>
            <button
              onClick={handlePublishLive}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#65F58A] to-[#35E6B5] text-[#071018] font-lora font-bold text-xs tracking-wider flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-[#65F58A]/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>Publish Course Live</span>
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: LESSON DETAILS METADATA INSPECTOR                 */}
      {/* ======================================================== */}
      {inspectingLesson && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn font-lora">
          <div className="bg-[#101923] border border-[#263440] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#263440]">
              <div className="flex items-center gap-2 text-white font-lora font-bold text-sm">
                <FileText className="w-4 h-4 text-[#65F58A]" />
                <span>Lesson Metadata Inspection</span>
              </div>
              <button
                onClick={() => setInspectingLesson(null)}
                className="text-[#94A3B8] hover:text-white text-xs font-lora"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-3 text-xs font-lora">
              <div>
                <span className="text-[#94A3B8]">Title:</span>
                <p className="text-white font-bold text-sm mt-0.5">{inspectingLesson.title}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-lg bg-[#071018] border border-[#263440]">
                  <span className="text-[10px] text-[#94A3B8]">Duration:</span>
                  <p className="text-white font-bold">{inspectingLesson.duration || '20 mins'}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-[#071018] border border-[#263440]">
                  <span className="text-[10px] text-[#94A3B8]">Policy Gate:</span>
                  <p className="text-[#65F58A] font-bold">
                    {inspectingLesson.is_mandatory !== false ? 'Mandatory' : 'Elective'}
                  </p>
                </div>
              </div>
              <div>
                <span className="text-[#94A3B8]">Summary Abstract:</span>
                <p className="text-slate-300 mt-1 leading-relaxed bg-[#071018] p-2.5 rounded-lg border border-[#263440]">
                  {inspectingLesson.summary || 'No summary defined.'}
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setInspectingLesson(null)}
                className="px-4 py-2 rounded-xl bg-[#65F58A] text-[#071018] text-xs font-lora font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: AUTHOR NEW COURSE (CUSTOM CREATABLE DROPDOWNS)    */}
      {/* ======================================================== */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn font-lora">
          <div className="bg-[#101923] border border-[#263440] rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#263440]">
              <div className="flex items-center gap-2 text-white font-lora font-bold text-sm">
                <Plus className="w-4 h-4 text-[#65F58A]" />
                <span>Author New Defensive Course</span>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-[#94A3B8] hover:text-white text-xs font-lora"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-4 text-xs font-lora">
              <div className="space-y-1">
                <label className="text-[#94A3B8]">Course Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Advanced SIEM Engineering & Telemetry Pipeline"
                  value={newTitle}
                  onChange={(e) => {
                    setNewTitle(e.target.value);
                    if (!newSlug) {
                      setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                    }
                  }}
                  className="w-full px-3 py-2 rounded-xl bg-[#071018] border border-[#263440] text-white focus:outline-none focus:border-[#65F58A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[#94A3B8]">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={newSlug}
                    onChange={(e) => setNewSlug(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#071018] border border-[#263440] text-white focus:outline-none focus:border-[#65F58A]"
                  />
                </div>

                {/* Custom Creatable Select for Difficulty */}
                <CustomCreatableSelect
                  label="Difficulty Level"
                  value={newDifficulty}
                  onChange={(val) => setNewDifficulty(val)}
                  options={['Beginner', 'Intermediate', 'Advanced', 'Special Operations', 'Elite']}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Custom Creatable Select for Category Track */}
                <CustomCreatableSelect
                  label="Category Track"
                  value={newCategory}
                  onChange={(val) => setNewCategory(val)}
                  options={[
                    'SOC Operations',
                    'Threat Hunting',
                    'Cloud Defense',
                    'Digital Forensics',
                    'Malware Analysis',
                    'Incident Response',
                    'Kernel Security',
                    'Red Team Simulation'
                  ]}
                />

                <div className="space-y-1">
                  <label className="text-[#94A3B8]">Estimated Duration</label>
                  <input
                    type="text"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    placeholder="16 Hours"
                    className="w-full px-3 py-2 rounded-xl bg-[#071018] border border-[#263440] text-white focus:outline-none focus:border-[#65F58A]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#94A3B8]">Executive Overview</label>
                <textarea
                  rows={3}
                  value={newOverview}
                  onChange={(e) => setNewOverview(e.target.value)}
                  placeholder="Detailed syllabus and curriculum objectives..."
                  className="w-full px-3 py-2 rounded-xl bg-[#071018] border border-[#263440] text-white focus:outline-none focus:border-[#65F58A]"
                />
              </div>

              {/* Custom Creatable Select for Milestone Credential */}
              <div className="space-y-1">
                <label className="text-[#94A3B8]">Milestone Credential Title</label>
                <input
                  type="text"
                  value={newMilestoneCert}
                  onChange={(e) => setNewMilestoneCert(e.target.value)}
                  placeholder="e.g. Certified Defensive Cyber Specialist (CDCS)"
                  className="w-full px-3 py-2 rounded-xl bg-[#071018] border border-[#263440] text-white focus:outline-none focus:border-[#65F58A]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#94A3B8]">Key Skills Validated (Comma separated)</label>
                <input
                  type="text"
                  value={newSkills}
                  onChange={(e) => setNewSkills(e.target.value)}
                  placeholder="PCAP Triage, Splunk, Elastic, Suricata, Wireshark"
                  className="w-full px-3 py-2 rounded-xl bg-[#071018] border border-[#263440] text-white focus:outline-none focus:border-[#65F58A]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#071018] border border-[#263440] text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-5 py-2 rounded-xl bg-[#65F58A] text-[#071018] font-bold flex items-center gap-2 hover:bg-[#65F58A]/90 transition-all shadow-md"
                >
                  {creating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                  <span>{creating ? 'Building Course...' : 'Create Course'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
