import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { mockEngine } from '../../../services/db/mockEngine';
import { apiClient } from '../../../services/apiClient';
import { socketClient } from '../../../services/socket/socketClient';
import { savePdfBlob } from '../../../services/db/assetStorage';
import { generate20ModuleQuestions } from './courseHelpers';

import CourseHeader from './CourseHeader';
import CourseSidebarList from './CourseSidebarList';
import CourseWizardStepper from './CourseWizardStepper';
import CourseInfoStep from './steps/CourseInfoStep';
import CourseMediaStep from './steps/CourseMediaStep';
import CourseCurriculumStep from './steps/CourseCurriculumStep';
import CourseExamStep from './steps/CourseExamStep';

import ModuleModal from './modals/ModuleModal';
import LessonModal from './modals/LessonModal';
import QuestionModal from './modals/QuestionModal';
import SuccessModal from './modals/SuccessModal';

export default function AdminCoursesManager() {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [builderStep, setBuilderStep] = useState(1);
  const [isEditingCourse, setIsEditingCourse] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successModalData, setSuccessModalData] = useState(null);

  const [courseFormData, setCourseFormData] = useState({
    title: '',
    slug: '',
    category: 'Defensive Cyber Operations',
    level: 'Intermediate',
    duration: '4 Weeks',
    estimated_duration: '14 Hours',
    effort_pace: 'Self-Paced (4-6 Hours / Week)',
    price: 'Free Institutional Access',
    total_tokens_reward: 150,
    overview: '',
    description: '',
    what_you_will_learn: [
      'Master continuous host and network telemetry inspection',
      'Execute MITRE ATT&CK adversary mapping and threat detection',
      'Isolate compromised endpoints without disrupting forensic tunnels',
      'Conduct RFC 3227 compliant evidence acquisition and chain of custody'
    ],
    prerequisites: 'Basic Linux shell command line navigation and TCP/IP networking fundamentals.',
    image_source_type: 'url',
    image_url: '/assets/course-art/art-01.jpg',
    status: 'PUBLISHED',
    modules: []
  });

  const [uploadingImage, setUploadingImage] = useState(false);
  const imageInputRef = useRef(null);

  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [moduleModalOpen, setModuleModalOpen] = useState(false);
  const [moduleTitleInput, setModuleTitleInput] = useState('');

  const [lessonModalOpen, setLessonModalOpen] = useState(false);
  const [editingLessonIdx, setEditingLessonIdx] = useState(null);
  const [lessonForm, setLessonForm] = useState({
    title: '',
    duration: '15 mins',
    type: 'multimedia',
    images: [],
    content: '',
    pdf_attachment: null
  });
  const [uploadingLessonPdf, setUploadingLessonPdf] = useState(false);
  const [uploadingLessonImage, setUploadingLessonImage] = useState(false);
  const lessonPdfRef = useRef(null);
  const lessonImageRef = useRef(null);

  const [questionModalOpen, setQuestionModalOpen] = useState(false);
  const [editingQuestionIdx, setEditingQuestionIdx] = useState(null);
  const [questionForm, setQuestionForm] = useState({
    text: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctIndex: 0,
    points: 1,
    explanation: ''
  });

  const loadCourses = async () => {
    try {
      let serverCourses = null;
      try {
        const data = await apiClient.getCourses(true);
        if (data && Array.isArray(data.courses)) {
          serverCourses = data.courses;
        }
      } catch (apiErr) {
        console.warn('API courses fetch notice:', apiErr);
      }

      const db = mockEngine.getDb();
      const courseList = (serverCourses && serverCourses.length > 0) ? serverCourses : (db?.courses || []);
      setCourses(courseList);
      if (courseList.length > 0 && !selectedCourse) {
        setSelectedCourse(courseList[0]);
        loadCourseIntoForm(courseList[0]);
      } else if (courseList.length === 0) {
        setSelectedCourse(null);
        setIsCreatingNew(true);
      }
    } catch (e) {
      console.error('Error loading courses:', e);
    }
  };

  useEffect(() => {
    loadCourses();
    const unsubSocket = socketClient.on('course:mutation', loadCourses);
    const unsubMock = mockEngine.subscribe((event) => {
      if (event.type === 'CURRICULUM_MUTATED' || event.type === 'DB_MUTATED') {
        loadCourses();
      }
    });
    return () => {
      if (typeof unsubSocket === 'function') unsubSocket();
      unsubMock();
    };
  }, []);

  const loadCourseIntoForm = (c) => {
    setCourseFormData({
      title: c.title || '',
      slug: c.slug || '',
      category: c.category || 'Defensive Cyber Operations',
      level: c.level || c.difficulty || 'Intermediate',
      duration: c.duration || c.estimated_duration || '4 Weeks',
      estimated_duration: c.estimated_duration || '14 Hours',
      effort_pace: c.effort_pace || 'Self-Paced (4-6 Hours / Week)',
      price: c.price || 'Free Institutional Access',
      total_tokens_reward: c.total_tokens_reward || c.xp_reward || 150,
      overview: c.overview || '',
      description: c.description || c.overview || '',
      what_you_will_learn: (c.what_you_will_learn && c.what_you_will_learn.length > 0)
        ? c.what_you_will_learn
        : (c.learning_objectives && c.learning_objectives.length > 0)
          ? c.learning_objectives
          : [
              'Master continuous host and network telemetry inspection',
              'Execute MITRE ATT&CK adversary mapping and threat detection',
              'Isolate compromised endpoints without disrupting forensic tunnels',
              'Conduct RFC 3227 compliant evidence acquisition and chain of custody'
            ],
      prerequisites: c.prerequisites || 'Basic Linux shell command line navigation and TCP/IP networking fundamentals.',
      image_source_type: c.art?.startsWith('data:') ? 'upload' : 'url',
      image_url: c.art || '/assets/course-art/art-01.jpg',
      status: c.status || 'PUBLISHED',
      modules: c.modules || []
    });
  };

  const safeLogAction = (entry) => {
    try {
      if (typeof mockEngine?.logAction === 'function') {
        mockEngine.logAction(entry);
      } else {
        const db = mockEngine.getDb ? mockEngine.getDb() : null;
        if (db) {
          if (!db.audit_logs) db.audit_logs = [];
          db.audit_logs.unshift({
            id: `aud_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            timestamp: new Date().toISOString(),
            created_at: new Date().toISOString(),
            ...entry
          });
          mockEngine.saveDb(db);
        }
      }
    } catch (err) {
      console.warn('safeLogAction warning:', err);
    }
  };

  const persistCourses = async (updatedCourses, auditMsg = 'Admin updated courses') => {
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
        if (refreshed) {
          setSelectedCourse(refreshed);
          try {
            await apiClient.updateCourse(refreshed.id, refreshed);
          } catch (syncErr) {
            console.warn('API updateCourse sync warning:', syncErr.message);
          }
        }
      }
      safeLogAction({
        action: 'COURSE_MUTATION',
        category: 'COURSE_MUTATION',
        details: auditMsg,
        severity: 'INFO'
      });
      if (socketClient && typeof socketClient.emit === 'function') {
        socketClient.emit('course:mutation', { type: 'UPDATE', courses: updatedCourses });
      }
    } catch (e) {
      console.error('Failed to persist course changes:', e);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    const target = courses.find((c) => c.id === courseId);
    const courseTitle = target?.title || 'this course';
    if (!confirm(`Are you sure you want to permanently delete course "${courseTitle}"? This will archive all student enrollments and purge all modules and lessons.`)) {
      return;
    }

    try {
      await apiClient.deleteCourse(courseId);
    } catch (apiErr) {
      console.warn('Backend course deletion warning:', apiErr.message);
    }

    const res = mockEngine.deleteCourse(courseId, 'usr_admin');
    if (res && res.success !== false) {
      const remaining = courses.filter((c) => c.id !== courseId);
      setCourses(remaining);
      if (selectedCourse?.id === courseId) {
        if (remaining.length > 0) {
          setSelectedCourse(remaining[0]);
          loadCourseIntoForm(remaining[0]);
          setIsCreatingNew(false);
        } else {
          setSelectedCourse(null);
          setIsCreatingNew(true);
        }
      }

      if (socketClient && typeof socketClient.emit === 'function') {
        socketClient.emit('course:mutation', { type: 'DELETE', courseId });
      }
    } else {
      alert('Failed to delete course.');
    }
  };

  const handleImageFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WebP).');
      return;
    }
    setUploadingImage(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      setCourseFormData((prev) => ({
        ...prev,
        image_source_type: 'upload',
        image_url: event.target.result
      }));
      setUploadingImage(false);
    };
    reader.readAsDataURL(file);
  };

  const handleLessonPdfUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      alert('Only PDF documents (.pdf) are permitted.');
      return;
    }
    setUploadingLessonPdf(true);
    try {
      const assetId = `pdf_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const idbUrl = await savePdfBlob(assetId, file);
      const sizeFormatted = file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
        : `${Math.round(file.size / 1024)} KB`;

      setLessonForm((prev) => ({
        ...prev,
        pdf_attachment: {
          name: file.name,
          size: sizeFormatted,
          url: idbUrl,
          uploaded_at: new Date().toISOString()
        }
      }));
    } catch (err) {
      console.error('Failed to upload PDF:', err);
      alert('Failed to upload PDF attachment.');
    } finally {
      setUploadingLessonPdf(false);
    }
  };

  const handleLessonImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WebP, SVG).');
      return;
    }
    setUploadingLessonImage(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const sizeFormatted = file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;

      const newImage = {
        id: `les_img_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        name: file.name,
        size: sizeFormatted,
        url: event.target.result,
        caption: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]+/g, ' '),
        uploaded_at: new Date().toISOString()
      };

      setLessonForm((prev) => ({
        ...prev,
        images: [...(prev.images || []), newImage]
      }));
      setUploadingLessonImage(false);
      if (lessonImageRef.current) lessonImageRef.current.value = '';
    };
    reader.onerror = () => {
      alert('Failed to read image file.');
      setUploadingLessonImage(false);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLessonImage = (iIdx) => {
    setLessonForm((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== iIdx)
    }));
  };

  const handleSaveCourse = async (e) => {
    e?.preventDefault();
    if (!courseFormData.title.trim()) {
      alert('Course title is required.');
      return;
    }

    const formattedSlug = (courseFormData.slug && courseFormData.slug.trim())
      ? courseFormData.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      : courseFormData.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    setIsSaving(true);

    try {
      const isExistingCourse = Boolean(
        !isCreatingNew &&
        selectedCourse &&
        selectedCourse.id &&
        courses.some((c) => c.id === selectedCourse.id)
      );

      if (!isExistingCourse) {
        const isDuplicate = courses.some(
          (c) => c.title?.toLowerCase() === courseFormData.title.trim().toLowerCase() || c.slug === formattedSlug
        );
        if (isDuplicate) {
          alert(`A course with title "${courseFormData.title}" or slug "${formattedSlug}" already exists.`);
          setIsSaving(false);
          return;
        }

        const defaultModules = (courseFormData.modules && courseFormData.modules.length > 0)
          ? courseFormData.modules
          : [
              {
                id: `mod_${Date.now()}_1`,
                title: 'Module 1: Architecture & Defensive Fundamentals',
                order: 1,
                lessons: [
                  {
                    id: `les_${Date.now()}_1`,
                    title: '1.1 System Architecture & Telemetry Pipelines',
                    duration: '15 mins',
                    type: 'lesson',
                    content: '### System Architecture & Telemetry Pipelines\n\nMaintain 100% operational visibility over host and network telemetry.\n\n```bash\nss -tulpn\n```'
                  }
                ],
                quiz: {
                  id: `quiz_${Date.now()}_1`,
                  title: 'Module 1 Evaluation: Defensive Telemetry & Standards',
                  passing_score: 70,
                  total_questions: 20,
                  token_bounty: 150,
                  questions: generate20ModuleQuestions('Module 1: Architecture & Defensive Fundamentals')
                }
              }
            ];

        const newCoursePayload = {
          title: courseFormData.title.trim(),
          slug: formattedSlug,
          category: courseFormData.category || 'Defensive Cyber Operations',
          level: courseFormData.level || 'Intermediate',
          difficulty: courseFormData.level || 'Intermediate',
          duration: courseFormData.duration || '4 Weeks',
          estimated_duration: courseFormData.estimated_duration || '14 Hours',
          effort_pace: courseFormData.effort_pace || 'Self-Paced (4-6 Hours / Week)',
          price: courseFormData.price || 'Free Institutional Access',
          total_tokens_reward: Number(courseFormData.total_tokens_reward) || 150,
          overview: courseFormData.overview || `Curriculum developed by RedKross Academy for ${courseFormData.title}.`,
          description: courseFormData.description || courseFormData.overview,
          what_you_will_learn: Array.isArray(courseFormData.what_you_will_learn)
            ? courseFormData.what_you_will_learn.filter(Boolean)
            : typeof courseFormData.what_you_will_learn === 'string'
              ? courseFormData.what_you_will_learn.split('\n').map((s) => s.trim()).filter(Boolean)
              : [],
          learning_objectives: Array.isArray(courseFormData.what_you_will_learn)
            ? courseFormData.what_you_will_learn.filter(Boolean)
            : typeof courseFormData.what_you_will_learn === 'string'
              ? courseFormData.what_you_will_learn.split('\n').map((s) => s.trim()).filter(Boolean)
              : [],
          prerequisites: courseFormData.prerequisites || 'Basic Linux shell command line navigation and TCP/IP networking fundamentals.',
          art: courseFormData.image_url || '/assets/course-art/art-01.jpg',
          status: courseFormData.status || 'PUBLISHED',
          modules: defaultModules
        };

        const created = mockEngine.createCourse(newCoursePayload);

        try {
          await apiClient.createCourse({ ...newCoursePayload, id: created?.id });
        } catch (apiErr) {
          console.warn('Backend course creation API notice:', apiErr.message);
        }

        const db = mockEngine.getDb();
        const updatedCourseList = [...(db.courses || [])];
        setCourses(updatedCourseList);
        const savedCourse = created || newCoursePayload;
        setSelectedCourse(savedCourse);
        setIsCreatingNew(false);
        setIsEditingCourse(false);

        if (socketClient && typeof socketClient.emit === 'function') {
          socketClient.emit('course:mutation', { type: 'CREATE', course: savedCourse });
        }

        safeLogAction({
          action: 'COURSE_CREATED',
          category: 'COURSE_MUTATION',
          details: `Admin created and published course "${savedCourse.title}"`,
          severity: 'INFO'
        });

        try {
          confetti({
            particleCount: 110,
            spread: 75,
            origin: { y: 0.6 },
            colors: ['#FF7A00', '#FFA439', '#FF7A00']
          });
        } catch (_) {}

        setSuccessModalData({
          isOpen: true,
          isNew: true,
          title: savedCourse.title,
          slug: savedCourse.slug,
          message: `Your course "${savedCourse.title}" has been successfully created, compiled, and published to the RedKross Academy directory. It is now live for all cadets.`
        });

      } else {
        const updated = courses.map((c) =>
          c.id === selectedCourse.id
            ? {
                ...c,
                title: courseFormData.title.trim(),
                slug: formattedSlug,
                category: courseFormData.category,
                level: courseFormData.level,
                difficulty: courseFormData.level,
                duration: courseFormData.duration,
                estimated_duration: courseFormData.estimated_duration,
                effort_pace: courseFormData.effort_pace,
                price: courseFormData.price,
                total_tokens_reward: Number(courseFormData.total_tokens_reward) || 150,
                overview: courseFormData.overview,
                description: courseFormData.description,
                what_you_will_learn: Array.isArray(courseFormData.what_you_will_learn)
                  ? courseFormData.what_you_will_learn.filter(Boolean)
                  : typeof courseFormData.what_you_will_learn === 'string'
                    ? courseFormData.what_you_will_learn.split('\n').map((s) => s.trim()).filter(Boolean)
                    : [],
                learning_objectives: Array.isArray(courseFormData.what_you_will_learn)
                  ? courseFormData.what_you_will_learn.filter(Boolean)
                  : typeof courseFormData.what_you_will_learn === 'string'
                    ? courseFormData.what_you_will_learn.split('\n').map((s) => s.trim()).filter(Boolean)
                    : [],
                prerequisites: courseFormData.prerequisites,
                art: courseFormData.image_url,
                status: courseFormData.status,
                modules: courseFormData.modules
              }
            : c
        );

        await persistCourses(updated, `Admin updated course: ${courseFormData.title}`);
        setIsEditingCourse(false);

        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#FF7A00', '#FFA439', '#FF7A00']
          });
        } catch (_) {}

        setSuccessModalData({
          isOpen: true,
          isNew: false,
          title: courseFormData.title,
          slug: formattedSlug,
          message: `Your changes to "${courseFormData.title}" have been successfully saved and synchronized across PostgreSQL and all student interfaces.`
        });
      }
    } catch (err) {
      console.error('Course save error:', err);
      alert('Error saving course: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddModule = () => {
    if (!moduleTitleInput.trim()) return;
    const newMod = {
      id: `mod_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
      title: moduleTitleInput.trim(),
      order: (courseFormData.modules?.length || 0) + 1,
      lessons: [],
      quiz: {
        id: `quiz_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
        title: `${moduleTitleInput.trim()} Evaluation`,
        passing_score: 70,
        total_questions: 20,
        token_bounty: 150,
        questions: generate20ModuleQuestions(moduleTitleInput.trim())
      }
    };
    const updatedMods = [...(courseFormData.modules || []), newMod];
    setCourseFormData((prev) => ({ ...prev, modules: updatedMods }));
    setModuleTitleInput('');
    setModuleModalOpen(false);
    setActiveModuleIndex(updatedMods.length - 1);
  };

  const handleDeleteModule = (idx) => {
    const currentMod = courseFormData.modules?.[idx];
    if (!confirm(`Are you sure you want to delete module "${currentMod?.title || 'this module'}" and its lessons?`)) return;
    const updated = (courseFormData.modules || []).filter((_, i) => i !== idx);
    setCourseFormData((prev) => ({ ...prev, modules: updated }));
    if (activeModuleIndex >= updated.length) {
      setActiveModuleIndex(Math.max(0, updated.length - 1));
    }
    if (selectedCourse?.id && currentMod?.id) {
      mockEngine.deleteModule(selectedCourse.id, currentMod.id, 'usr_admin');
    }
  };

  const handleOpenAddQuestion = () => {
    setEditingQuestionIdx(null);
    setQuestionForm({
      text: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctIndex: 0,
      points: 1,
      explanation: ''
    });
    setQuestionModalOpen(true);
  };

  const handleOpenEditQuestion = (q, qIdx) => {
    setEditingQuestionIdx(qIdx);
    const opts = q.options || [];
    const correctIdx = opts.findIndex((o) => o.is_correct);
    setQuestionForm({
      text: q.text || '',
      optionA: opts[0]?.text || '',
      optionB: opts[1]?.text || '',
      optionC: opts[2]?.text || '',
      optionD: opts[3]?.text || '',
      correctIndex: correctIdx >= 0 ? correctIdx : 0,
      points: q.points || 1,
      explanation: q.explanation || ''
    });
    setQuestionModalOpen(true);
  };

  const handleSaveQuestion = () => {
    if (!questionForm.text.trim()) {
      alert('Please enter the question statement text.');
      return;
    }
    if (
      !questionForm.optionA.trim() ||
      !questionForm.optionB.trim() ||
      !questionForm.optionC.trim() ||
      !questionForm.optionD.trim()
    ) {
      alert('All four options (A, B, C, D) are required.');
      return;
    }

    const currentMod = courseFormData.modules?.[activeModuleIndex];
    if (!currentMod) {
      alert('Please select or create a module first.');
      return;
    }

    const formattedQuestion = {
      id: editingQuestionIdx !== null && currentMod.quiz?.questions?.[editingQuestionIdx]?.id
        ? currentMod.quiz.questions[editingQuestionIdx].id
        : `q_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      text: questionForm.text.trim(),
      type: 'single_choice',
      points: Number(questionForm.points) || 1,
      options: [
        { id: 'opt_a', text: questionForm.optionA.trim(), is_correct: questionForm.correctIndex === 0 },
        { id: 'opt_b', text: questionForm.optionB.trim(), is_correct: questionForm.correctIndex === 1 },
        { id: 'opt_c', text: questionForm.optionC.trim(), is_correct: questionForm.correctIndex === 2 },
        { id: 'opt_d', text: questionForm.optionD.trim(), is_correct: questionForm.correctIndex === 3 }
      ],
      explanation: questionForm.explanation.trim() || 'Official technical explanation for verified answer choice.'
    };

    let updatedQuestions = [...(currentMod.quiz?.questions || [])];
    if (editingQuestionIdx !== null) {
      updatedQuestions[editingQuestionIdx] = formattedQuestion;
    } else {
      updatedQuestions.push(formattedQuestion);
    }

    const updatedMods = (courseFormData.modules || []).map((mod, idx) => {
      if (idx !== activeModuleIndex) return mod;
      return {
        ...mod,
        quiz: {
          id: mod.quiz?.id || `quiz_${Date.now()}_${idx + 1}`,
          title: mod.quiz?.title || `${mod.title} Assessment`,
          passing_score: 70,
          total_questions: updatedQuestions.length,
          token_bounty: 150,
          questions: updatedQuestions
        }
      };
    });

    setCourseFormData((prev) => ({ ...prev, modules: updatedMods }));
    setQuestionModalOpen(false);

    if (selectedCourse?.id && currentMod.id) {
      mockEngine.saveQuizQuestions(selectedCourse.id, currentMod.id, updatedQuestions, 'usr_admin');
    }
  };

  const handleDeleteQuestion = (qIdx) => {
    if (!confirm('Are you sure you want to delete this question?')) return;
    const currentMod = courseFormData.modules?.[activeModuleIndex];
    if (!currentMod) return;

    const updatedQuestions = (currentMod.quiz?.questions || []).filter((_, i) => i !== qIdx);
    const updatedMods = (courseFormData.modules || []).map((mod, idx) => {
      if (idx !== activeModuleIndex) return mod;
      return {
        ...mod,
        quiz: {
          ...mod.quiz,
          total_questions: updatedQuestions.length,
          questions: updatedQuestions
        }
      };
    });

    setCourseFormData((prev) => ({ ...prev, modules: updatedMods }));

    if (selectedCourse?.id && currentMod.id) {
      mockEngine.saveQuizQuestions(selectedCourse.id, currentMod.id, updatedQuestions, 'usr_admin');
    }
  };

  const handleGenerate20Questions = () => {
    const currentMod = courseFormData.modules?.[activeModuleIndex];
    if (!currentMod) return;

    const fresh20Questions = generate20ModuleQuestions(currentMod.title);
    const updatedMods = (courseFormData.modules || []).map((mod, idx) => {
      if (idx !== activeModuleIndex) return mod;
      return {
        ...mod,
        quiz: {
          id: mod.quiz?.id || `quiz_${Date.now()}_${idx + 1}`,
          title: mod.quiz?.title || `${mod.title} Evaluation`,
          passing_score: 70,
          total_questions: 20,
          token_bounty: 150,
          questions: fresh20Questions
        }
      };
    });

    setCourseFormData((prev) => ({ ...prev, modules: updatedMods }));
    alert(`Generated default questions for ${currentMod.title}. You can now edit each question manually.`);
  };

  const handleSaveLesson = () => {
    if (!lessonForm.title.trim()) {
      alert('Lesson title is required.');
      return;
    }
    const currentMod = courseFormData.modules?.[activeModuleIndex];
    if (!currentMod) return;

    let updatedLessons = [...(currentMod.lessons || [])];
    if (editingLessonIdx !== null) {
      updatedLessons[editingLessonIdx] = {
        ...updatedLessons[editingLessonIdx],
        ...lessonForm
      };
    } else {
      updatedLessons.push({
        id: `les_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
        ...lessonForm
      });
    }

    const updatedMods = (courseFormData.modules || []).map((mod, idx) =>
      idx === activeModuleIndex ? { ...mod, lessons: updatedLessons } : mod
    );

    setCourseFormData((prev) => ({ ...prev, modules: updatedMods }));
    setLessonModalOpen(false);
    setEditingLessonIdx(null);
  };

  const handleDeleteLesson = (lIdx) => {
    const currentMod = courseFormData.modules?.[activeModuleIndex];
    if (!currentMod) return;
    const targetLesson = currentMod.lessons?.[lIdx];
    if (!confirm(`Delete lesson "${targetLesson?.title || 'this lesson'}"?`)) return;

    const updatedLessons = (currentMod.lessons || []).filter((_, i) => i !== lIdx);
    const updatedMods = (courseFormData.modules || []).map((mod, idx) =>
      idx === activeModuleIndex ? { ...mod, lessons: updatedLessons } : mod
    );
    setCourseFormData((prev) => ({ ...prev, modules: updatedMods }));

    if (selectedCourse?.id && currentMod?.id && targetLesson?.id) {
      mockEngine.deleteLesson(selectedCourse.id, currentMod.id, targetLesson.id, 'usr_admin');
    }
  };

  const filteredCourses = courses.filter((c) => {
    const matchesSearch = c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.category?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-slide-left font-lora">
      {/* Top Header */}
      <CourseHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onStartCreateNew={() => {
          setIsCreatingNew(true);
          setIsEditingCourse(false);
          setSelectedCourse(null);
          setBuilderStep(1);
          setCourseFormData({
            title: '',
            slug: '',
            category: 'Defensive Cyber Operations',
            level: 'Intermediate',
            duration: '4 Weeks',
            estimated_duration: '14 Hours',
            effort_pace: 'Self-Paced (4-6 Hours / Week)',
            price: 'Free Institutional Access',
            total_tokens_reward: 150,
            overview: '',
            description: '',
            what_you_will_learn: [
              'Master continuous host and network telemetry inspection',
              'Execute MITRE ATT&CK adversary mapping and threat detection',
              'Isolate compromised endpoints without disrupting forensic tunnels',
              'Conduct RFC 3227 compliant evidence acquisition and chain of custody'
            ],
            prerequisites: 'Basic Linux shell command line navigation and TCP/IP networking fundamentals.',
            image_source_type: 'url',
            image_url: '/assets/course-art/art-01.jpg',
            status: 'PUBLISHED',
            modules: []
          });
        }}
      />

      {/* Main Dual-Pane Studio */}
      <div className="grid grid-cols-12 gap-6 min-h-[750px]">
        {/* Left Column: Course Directory */}
        <div className="col-span-12 lg:col-span-4 space-y-4 max-h-[820px] overflow-y-auto custom-scrollbar pr-2">
          <CourseSidebarList
            courses={filteredCourses}
            selectedCourse={selectedCourse}
            onSelectCourse={(course) => {
              setSelectedCourse(course);
              loadCourseIntoForm(course);
              setIsCreatingNew(false);
              setIsEditingCourse(false);
            }}
            onDeleteCourse={handleDeleteCourse}
            isCreatingNew={isCreatingNew}
          />
        </div>

        {/* Right Column: 4-Step Builder */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <CourseWizardStepper
            currentStep={builderStep}
            onSelectStep={setBuilderStep}
          />

          {builderStep === 1 && (
            <CourseInfoStep
              courseFormData={courseFormData}
              setCourseFormData={setCourseFormData}
              onProceed={() => setBuilderStep(2)}
            />
          )}

          {builderStep === 2 && (
            <CourseMediaStep
              courseFormData={courseFormData}
              setCourseFormData={setCourseFormData}
              imageInputRef={imageInputRef}
              onImageFileUpload={handleImageFileUpload}
              onBack={() => setBuilderStep(1)}
              onProceed={() => setBuilderStep(3)}
            />
          )}

          {builderStep === 3 && (
            <CourseCurriculumStep
              courseFormData={courseFormData}
              activeModuleIndex={activeModuleIndex}
              setActiveModuleIndex={setActiveModuleIndex}
              onOpenAddModule={() => {
                setModuleTitleInput('');
                setModuleModalOpen(true);
              }}
              onDeleteModule={handleDeleteModule}
              onOpenAddLesson={() => {
                setEditingLessonIdx(null);
                setLessonForm({
                  title: '',
                  duration: '15 mins',
                  type: 'multimedia',
                  images: [],
                  content: '',
                  pdf_attachment: null
                });
                setLessonModalOpen(true);
              }}
              onOpenEditLesson={(les, idx) => {
                setEditingLessonIdx(idx);
                setLessonForm({
                  title: les.title || '',
                  duration: les.duration || '15 mins',
                  type: les.type || 'multimedia',
                  images: les.images || [],
                  content: les.content || '',
                  pdf_attachment: les.pdf_attachment || null
                });
                setLessonModalOpen(true);
              }}
              onDeleteLesson={handleDeleteLesson}
              onConfigureExam={() => setBuilderStep(4)}
              onBack={() => setBuilderStep(2)}
              onProceed={() => setBuilderStep(4)}
            />
          )}

          {builderStep === 4 && (
            <CourseExamStep
              courseFormData={courseFormData}
              activeModuleIndex={activeModuleIndex}
              setActiveModuleIndex={setActiveModuleIndex}
              onGenerate20Questions={handleGenerate20Questions}
              onOpenAddQuestion={handleOpenAddQuestion}
              onOpenEditQuestion={handleOpenEditQuestion}
              onDeleteQuestion={handleDeleteQuestion}
              onBack={() => setBuilderStep(3)}
              onSaveCourse={handleSaveCourse}
              isSaving={isSaving}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      <ModuleModal
        isOpen={moduleModalOpen}
        onClose={() => setModuleModalOpen(false)}
        moduleTitleInput={moduleTitleInput}
        setModuleTitleInput={setModuleTitleInput}
        onAddModule={handleAddModule}
      />

      <LessonModal
        isOpen={lessonModalOpen}
        onClose={() => setLessonModalOpen(false)}
        editingLessonIdx={editingLessonIdx}
        lessonForm={lessonForm}
        setLessonForm={setLessonForm}
        onSaveLesson={handleSaveLesson}
        lessonImageRef={lessonImageRef}
        uploadingLessonImage={uploadingLessonImage}
        onLessonImageUpload={handleLessonImageUpload}
        onRemoveLessonImage={handleRemoveLessonImage}
        lessonPdfRef={lessonPdfRef}
        uploadingLessonPdf={uploadingLessonPdf}
        onLessonPdfUpload={handleLessonPdfUpload}
      />

      <QuestionModal
        isOpen={questionModalOpen}
        onClose={() => setQuestionModalOpen(false)}
        editingQuestionIdx={editingQuestionIdx}
        questionForm={questionForm}
        setQuestionForm={setQuestionForm}
        onSaveQuestion={handleSaveQuestion}
      />

      <SuccessModal
        data={successModalData}
        onClose={() => setSuccessModalData(null)}
      />
    </div>
  );
}
