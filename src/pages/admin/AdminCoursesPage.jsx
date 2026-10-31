import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen, Plus, Search, Filter, Edit3, Trash2, Eye, EyeOff,
  ChevronDown, ChevronRight, Video, FileText, CheckCircle2,
  AlertTriangle, Clock, Sparkles, Layers,
  ShieldCheck, PlayCircle, UploadCloud, Film, HardDrive, Loader2,
  FileCheck, Image as ImageIcon, Link as LinkIcon, Check, Award,
  HelpCircle, Save, ArrowLeft, ArrowRight, X
} from 'lucide-react';
import { mockEngine } from '../../services/db/mockEngine';
import { apiClient } from '../../services/apiClient';
import { COURSE_CARD_STYLES, getCardStyleByIndex } from '../../utils/courseCardStyles';
import { saveVideoBlob, resolveVideoUrl, savePdfBlob, resolvePdfUrl } from '../../services/db/videoStorage';

/**
 * 20 Default Cybersecurity Questions Generator
 * Ensures every course module can have an instant, high-quality 20-question exam.
 */
function generate20ModuleQuestions(moduleTitle = 'Core Defensive Security') {
  return [
    {
      id: `q_${Date.now()}_1`,
      text: `In ${moduleTitle}, what is the primary role of continuous telemetry monitoring?`,
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'To maintain full operational visibility over host and network state changes', is_correct: true },
        { id: 'opt_2', text: 'To encrypt all local storage drives automatically', is_correct: false },
        { id: 'opt_3', text: 'To replace hardware firewalls with software scripts', is_correct: false },
        { id: 'opt_4', text: 'To eliminate the need for administrative access controls', is_correct: false }
      ],
      explanation: 'Continuous telemetry provides defenders with real-time detection telemetry across endpoints and network segments.'
    },
    {
      id: `q_${Date.now()}_2`,
      text: 'Which defensive security framework aligns adversary tactics and techniques to specific defensive countermeasures?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'MITRE ATT&CK Framework', is_correct: true },
        { id: 'opt_2', text: 'PCI-DSS Compliance Checklist', is_correct: false },
        { id: 'opt_3', text: 'OSI 7-Layer Reference Architecture', is_correct: false },
        { id: 'opt_4', text: 'IEEE 802.11 Wireless Standard', is_correct: false }
      ],
      explanation: 'MITRE ATT&CK is the globally accessible knowledge base of adversary tactics, techniques, and procedures based on real-world observations.'
    },
    {
      id: `q_${Date.now()}_3`,
      text: 'What does the Principle of Least Privilege (PoLP) dictate?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'Accounts and processes should only possess the minimum permissions necessary to perform their authorized tasks', is_correct: true },
        { id: 'opt_2', text: 'All users must share a single administrative password', is_correct: false },
        { id: 'opt_3', text: 'Root privileges should be granted during initial onboarding', is_correct: false },
        { id: 'opt_4', text: 'Network access must be unrestricted during daylight hours', is_correct: false }
      ],
      explanation: 'Least privilege prevents lateral movement and limits the blast radius when an individual credential is compromised.'
    },
    {
      id: `q_${Date.now()}_4`,
      text: 'When reviewing Windows Security Event Logs, which Event ID indicates an unauthorized attempt at account logon failure?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'Event ID 4625 (An account failed to log on)', is_correct: true },
        { id: 'opt_2', text: 'Event ID 4624 (Successful Logon)', is_correct: false },
        { id: 'opt_3', text: 'Event ID 1102 (Audit log cleared)', is_correct: false },
        { id: 'opt_4', text: 'Event ID 7045 (New Service installed)', is_correct: false }
      ],
      explanation: 'Event ID 4625 logs failed authentication attempts, providing the logon type, failure reason, and requesting workstation IP.'
    },
    {
      id: `q_${Date.now()}_5`,
      text: 'Which protocol is commonly used to securely ingest enterprise log streams into a centralized SIEM platform?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'TLS-Encrypted Syslog (RFC 5424 over port 6514)', is_correct: true },
        { id: 'opt_2', text: 'Unencrypted Telnet (port 23)', is_correct: false },
        { id: 'opt_3', text: 'Cleartext FTP (port 21)', is_correct: false },
        { id: 'opt_4', text: 'TFTP over UDP', is_correct: false }
      ],
      explanation: 'Secure syslog over TLS ensures log integrity and confidentiality during transit from endpoints to the SIEM.'
    },
    {
      id: `q_${Date.now()}_6`,
      text: 'What is the primary indicator of a Pass-the-Hash (PtH) attack in Windows environments?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'Authentication events using NTLM Logon Type 3 with stolen password hashes without plaintext disclosure', is_correct: true },
        { id: 'opt_2', text: 'CPU utilization dropping to 0%', is_correct: false },
        { id: 'opt_3', text: 'DNS queries failing to resolve', is_correct: false },
        { id: 'opt_4', text: 'Printer spooler restarts', is_correct: false }
      ],
      explanation: 'Pass-the-Hash abuses NTLM authentication by supplying the hashed credential directly without needing to crack the plaintext password.'
    },
    {
      id: `q_${Date.now()}_7`,
      text: 'According to RFC 3227, what is the first priority when collecting digital evidence from a live machine?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'Most volatile data (Registers, CPU cache, and system memory / RAM)', is_correct: true },
        { id: 'opt_2', text: 'Cold archival storage tapes', is_correct: false },
        { id: 'opt_3', text: 'Printed network diagrams', is_correct: false },
        { id: 'opt_4', text: 'Solid-state storage drives', is_correct: false }
      ],
      explanation: 'Order of Volatility mandates collecting data that vanishes when power is severed before moving to persistent media.'
    },
    {
      id: `q_${Date.now()}_8`,
      text: 'What does an EDR network quarantine do during an active intrusion?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'Blocks all inbound/outbound communication except the secure management tunnel to the EDR console', is_correct: true },
        { id: 'opt_2', text: 'Instantly formats all hard disk drives', is_correct: false },
        { id: 'opt_3', text: 'Shuts down the physical power supply', is_correct: false },
        { id: 'opt_4', text: 'Sends an unencrypted broadcast message to the whole subnet', is_correct: false }
      ],
      explanation: 'EDR isolation halts lateral movement and exfiltration while preserving forensic access for incident responders.'
    },
    {
      id: `q_${Date.now()}_9`,
      text: 'Why should incident responders calculate cryptographic hashes (SHA-256) of forensic disk images?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'To prove chain of custody and verify that evidence was not altered after acquisition', is_correct: true },
        { id: 'opt_2', text: 'To compress the image size by 90%', is_correct: false },
        { id: 'opt_3', text: 'To hide the evidence from defense attorneys', is_correct: false },
        { id: 'opt_4', text: 'To convert the raw disk image into an executable file', is_correct: false }
      ],
      explanation: 'Matching cryptographic hashes provide mathematical proof of integrity for legal admissibility.'
    },
    {
      id: `q_${Date.now()}_10`,
      text: 'What is a Sigma rule used for in security engineering?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'A vendor-agnostic signature format for log detections that translates into queries for Splunk, Elastic, and QRadar', is_correct: true },
        { id: 'opt_2', text: 'A network routing algorithm for BGP tables', is_correct: false },
        { id: 'opt_3', text: 'A database index optimization rule', is_correct: false },
        { id: 'opt_4', text: 'A password complexity enforcement policy', is_correct: false }
      ],
      explanation: 'Sigma enables security teams to share detection logic regardless of the specific SIEM backend deployed.'
    },
    {
      id: `q_${Date.now()}_11`,
      text: 'What does the Mark-of-the-Web (Zone.Identifier) alternate data stream signify in Windows NTFS?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'It identifies files downloaded from untrusted Internet sources to enforce Protected View and SmartScreen', is_correct: true },
        { id: 'opt_2', text: 'It indicates that the file is an authorized system driver', is_correct: false },
        { id: 'opt_3', text: 'It encrypts the file with BitLocker', is_correct: false },
        { id: 'opt_4', text: 'It triggers automatic execution on boot', is_correct: false }
      ],
      explanation: 'Windows applies ZoneId=3 to downloaded files, signaling defensive safeguards to block macros and prompt user confirmation.'
    },
    {
      id: `q_${Date.now()}_12`,
      text: 'What is the purpose of Living off the Land (LotL) techniques by adversaries?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'Abusing legitimate, pre-installed administrative binaries (LOLBins) to evade antivirus signatures', is_correct: true },
        { id: 'opt_2', text: 'Planting physical hardware bugs inside server chassis', is_correct: false },
        { id: 'opt_3', text: 'Using solar power for cyber attacks', is_correct: false },
        { id: 'opt_4', text: 'Attacking only agricultural and manufacturing networks', is_correct: false }
      ],
      explanation: 'LOLBins like PowerShell, certutil, and wmic allow adversaries to operate without downloading custom malware tools.'
    },
    {
      id: `q_${Date.now()}_13`,
      text: 'Which port is utilized by default for Kerberos authentication services?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'TCP/UDP Port 88', is_correct: true },
        { id: 'opt_2', text: 'TCP Port 443', is_correct: false },
        { id: 'opt_3', text: 'TCP Port 22', is_correct: false },
        { id: 'opt_4', text: 'UDP Port 53', is_correct: false }
      ],
      explanation: 'Port 88 is the standard port for Kerberos Key Distribution Center (KDC) ticket granting operations.'
    },
    {
      id: `q_${Date.now()}_14`,
      text: 'What is "Kerberoasting" (MITRE ATT&CK T1558.003)?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'Requesting Kerberos TGS tickets for accounts with SPNs and cracking the encrypted service passwords offline', is_correct: true },
        { id: 'opt_2', text: 'Overheating a domain controller server', is_correct: false },
        { id: 'opt_3', text: 'Flooding the KDC with UDP SYN packets', is_correct: false },
        { id: 'opt_4', text: 'Modifying DNS records on Active Directory', is_correct: false }
      ],
      explanation: 'Any valid domain user can request a service ticket for an SPN and crack its ticket offline without triggering lockouts.'
    },
    {
      id: `q_${Date.now()}_15`,
      text: 'What is the primary indicator of DNS tunneling in network telemetry?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'Unusually high volumes of TXT/A queries with long, high-entropy subdomain strings destined for an external nameserver', is_correct: true },
        { id: 'opt_2', text: 'Standard reverse lookup queries for internal IP addresses', is_correct: false },
        { id: 'opt_3', text: 'Zero outbound network connections', is_correct: false },
        { id: 'opt_4', text: 'HTTP 404 response codes from web servers', is_correct: false }
      ],
      explanation: 'DNS tunneling encodes C2 payloads or stolen data into subdomains to bypass egress packet filtering on port 53.'
    },
    {
      id: `q_${Date.now()}_16`,
      text: 'Which Windows forensic artifact records application execution paths and run counts to assist with prefetch caching?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'Windows Prefetch files (.pf)', is_correct: true },
        { id: 'opt_2', text: 'Windows hosts file', is_correct: false },
        { id: 'opt_3', text: 'Pagefile.sys only', is_correct: false },
        { id: 'opt_4', text: 'Desktop shortcuts (.lnk)', is_correct: false }
      ],
      explanation: 'Prefetch files verify whether a binary was executed on a system, even if the original executable was deleted.'
    },
    {
      id: `q_${Date.now()}_17`,
      text: 'What is "Timestomping" in adversary defense evasion?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'Modifying NTFS file timestamps ($STANDARD_INFORMATION) to disguise malware as legitimate older system files', is_correct: true },
        { id: 'opt_2', text: 'Syncing system clocks with a rogue NTP server', is_correct: false },
        { id: 'opt_3', text: 'Overclocking CPU frequencies', is_correct: false },
        { id: 'opt_4', text: 'Delaying sleep commands in script loops', is_correct: false }
      ],
      explanation: 'Timestomping is designed to defeat forensic chronological triage by making backdoors appear to pre-date the intrusion.'
    },
    {
      id: `q_${Date.now()}_18`,
      text: 'What does a hardware write blocker do during dead-box forensic disk acquisition?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'Intercepts and blocks any write commands from the acquisition host to the original evidence drive', is_correct: true },
        { id: 'opt_2', text: 'Converts SATA connections into NVMe protocols', is_correct: false },
        { id: 'opt_3', text: 'Removes file system passwords from encrypted drives', is_correct: false },
        { id: 'opt_4', text: 'Automatically cleans corrupted drive sectors', is_correct: false }
      ],
      explanation: 'Hardware write blockers physically prevent accidental alteration of evidentiary media during imaging.'
    },
    {
      id: `q_${Date.now()}_19`,
      text: 'What is the role of a YARA condition statement?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'It defines the exact boolean logic criteria under which a signature match is reported', is_correct: true },
        { id: 'opt_2', text: 'It sets the execution speed of the virus scanner', is_correct: false },
        { id: 'opt_3', text: 'It specifies the author copyright text', is_correct: false },
        { id: 'opt_4', text: 'It deletes matched files automatically', is_correct: false }
      ],
      explanation: 'The condition section combines string identifiers and file characteristics to determine whether a file matches the rule.'
    },
    {
      id: `q_${Date.now()}_20`,
      text: 'In the NIST SP 800-61r2 incident response cycle, what is the primary goal of Post-Incident Activity?',
      type: 'single_choice',
      points: 1,
      options: [
        { id: 'opt_1', text: 'Documenting lessons learned, updating standard operating procedures, and hardening defenses to prevent recurrence', is_correct: true },
        { id: 'opt_2', text: 'Assigning personal blame to system administrators', is_correct: false },
        { id: 'opt_3', text: 'Calculating marketing PR damages', is_correct: false },
        { id: 'opt_4', text: 'Purchasing new hardware without forensic analysis', is_correct: false }
      ],
      explanation: 'Lessons Learned meetings evaluate response efficacy, root causes, detection gaps, and update playbooks for future resilience.'
    }
  ];
}

/**
 * AdminCoursesPage — Ultra-Simple 10-Second Intuitive Course Studio
 * Features:
 * - 4 Visual Steps / Tabs (Course Info, Media Assets, Curriculum, 20-Question Exam Generator)
 * - Dual Image & Video options: Direct File Upload (IndexedDB) OR Direct URL ("tujhe image and video dono ka option dena he hoga")
 * - One-click 20-Question Module Exam Generator ("and sun exam bhi ese rakhna module wise atleast 20 questions")
 * - 100% Lora font typography & strictly 0% Blue color guarantee
 */
export default function AdminCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [builderStep, setBuilderStep] = useState(1); // 1: Info, 2: Media, 3: Curriculum, 4: Quizzes
  const [isEditingCourse, setIsEditingCourse] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Course Form State
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
    image_source_type: 'url', // 'upload' | 'url'
    image_url: '/assets/course-art/art-01.jpg',
    video_source_type: 'upload', // 'upload' | 'url'
    video_url: '/assets/sample-lesson.mp4',
    status: 'PUBLISHED',
    modules: []
  });

  // Media Upload States
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState('');
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // Module and Lesson Modals
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [moduleModalOpen, setModuleModalOpen] = useState(false);
  const [editingModuleIdx, setEditingModuleIdx] = useState(null);
  const [moduleTitleInput, setModuleTitleInput] = useState('');

  const [lessonModalOpen, setLessonModalOpen] = useState(false);
  const [editingLessonIdx, setEditingLessonIdx] = useState(null);
  const [lessonForm, setLessonForm] = useState({
    title: '',
    duration: '15 mins',
    type: 'video',
    video_url: '/assets/sample-lesson.mp4',
    video_source_type: 'url',
    content: '',
    pdf_attachment: null
  });
  const [uploadingLessonPdf, setUploadingLessonPdf] = useState(false);
  const lessonPdfRef = useRef(null);

  // Manual Question Builder State (No Forced Auto-Generation)
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

  // Load courses from database
  const loadCourses = () => {
    try {
      const db = mockEngine.getDb();
      if (db && db.courses) {
        setCourses(db.courses);
        if (db.courses.length > 0 && !selectedCourse) {
          setSelectedCourse(db.courses[0]);
          loadCourseIntoForm(db.courses[0]);
        }
      }
    } catch (e) {
      console.error('Error loading courses:', e);
    }
  };

  useEffect(() => {
    loadCourses();
    const unsub = mockEngine.subscribe((event) => {
      if (event.type === 'CURRICULUM_MUTATED' || event.type === 'DB_MUTATED') {
        loadCourses();
      }
    });
    return () => unsub();
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
      what_you_will_learn: c.what_you_will_learn || [
        'Master continuous host and network telemetry inspection',
        'Execute MITRE ATT&CK adversary mapping and threat detection',
        'Isolate compromised endpoints without disrupting forensic tunnels',
        'Conduct RFC 3227 compliant evidence acquisition and chain of custody'
      ],
      prerequisites: c.prerequisites || 'Basic Linux shell command line navigation and TCP/IP networking fundamentals.',
      image_source_type: c.art?.startsWith('data:') ? 'upload' : 'url',
      image_url: c.art || '/assets/course-art/art-01.jpg',
      video_source_type: c.video_url?.startsWith('idb://') ? 'upload' : 'url',
      video_url: c.video_url || '/assets/sample-lesson.mp4',
      status: c.status || 'PUBLISHED',
      modules: c.modules || []
    });

    if (c.video_url) {
      resolveVideoUrl(c.video_url).then(setVideoPreviewUrl);
    } else {
      setVideoPreviewUrl('');
    }
  };

  // Safe Audit Logger
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

  // Save changes to database
  const persistCourses = (updatedCourses, auditMsg = 'Admin updated courses') => {
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
      safeLogAction({
        action: 'COURSE_MUTATION',
        category: 'COURSE_MUTATION',
        details: auditMsg,
        severity: 'INFO'
      });
    } catch (e) {
      console.error('Failed to persist course changes:', e);
    }
  };

  // Direct Course Deletion
  const handleDeleteCourse = (courseId) => {
    const target = courses.find((c) => c.id === courseId);
    const courseTitle = target?.title || 'this course';
    if (!confirm(`Are you sure you want to permanently delete course "${courseTitle}"? This will archive all student enrollments and purge all modules and lessons.`)) {
      return;
    }

    const success = mockEngine.deleteCourse(courseId, 'usr_admin');
    if (success) {
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
    } else {
      alert('Failed to delete course.');
    }
  };

  // Handle Image Upload (Base64 Data URL)
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

  // Handle Video Upload (IndexedDB Storage)
  const handleVideoFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingVideo(true);
    try {
      const assetId = `course_vid_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const idbUrl = await saveVideoBlob(assetId, file);
      const preview = await resolveVideoUrl(idbUrl);
      setVideoPreviewUrl(preview);
      setCourseFormData((prev) => ({
        ...prev,
        video_source_type: 'upload',
        video_url: idbUrl
      }));
    } catch (err) {
      console.error('Video upload failed:', err);
      alert('Failed to upload video to local cache.');
    } finally {
      setUploadingVideo(false);
    }
  };

  // Handle Lesson PDF Upload
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

  // Handle Launch or Update Course
  const handleSaveCourse = (e) => {
    e?.preventDefault();
    if (!courseFormData.title.trim()) {
      alert('Course title is required.');
      return;
    }

    const formattedSlug = (courseFormData.slug && courseFormData.slug.trim())
      ? courseFormData.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      : courseFormData.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    if (isCreatingNew) {
      // Check for duplicate course
      const isDuplicate = courses.some(
        (c) => c.title?.toLowerCase() === courseFormData.title.trim().toLowerCase() || c.slug === formattedSlug
      );
      if (isDuplicate) {
        alert(`A course with title "${courseFormData.title}" or slug "${formattedSlug}" already exists.`);
        return;
      }

      // Default module with 20 questions if none created
      const defaultModules = courseFormData.modules?.length > 0 ? courseFormData.modules : [
        {
          id: `mod_${Date.now()}_1`,
          title: 'Module 1: Architecture & Defensive Fundamentals',
          order: 1,
          lessons: [
            {
              id: `les_${Date.now()}_1`,
              title: '1.1 System Architecture & Telemetry Pipelines',
              duration: '15 mins',
              type: 'video',
              video_url: courseFormData.video_url || '/assets/sample-lesson.mp4',
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
        category: courseFormData.category,
        level: courseFormData.level,
        difficulty: courseFormData.level,
        duration: courseFormData.duration,
        estimated_duration: courseFormData.estimated_duration,
        effort_pace: courseFormData.effort_pace,
        price: courseFormData.price,
        total_tokens_reward: Number(courseFormData.total_tokens_reward) || 150,
        overview: courseFormData.overview || `Curriculum developed by RedKross Academy for ${courseFormData.title}.`,
        description: courseFormData.description || courseFormData.overview,
        what_you_will_learn: courseFormData.what_you_will_learn,
        prerequisites: courseFormData.prerequisites,
        art: courseFormData.image_url,
        video_url: courseFormData.video_url,
        status: courseFormData.status || 'PUBLISHED',
        modules: defaultModules
      };

      const created = mockEngine.createCourse(newCoursePayload);
      const db = mockEngine.getDb();
      setCourses([...(db.courses || [])]);
      setSelectedCourse(created);
      setIsCreatingNew(false);
      setIsEditingCourse(false);
      alert('Course created and published successfully!');
    } else if (selectedCourse) {
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
              what_you_will_learn: courseFormData.what_you_will_learn,
              prerequisites: courseFormData.prerequisites,
              art: courseFormData.image_url,
              video_url: courseFormData.video_url,
              status: courseFormData.status,
              modules: courseFormData.modules
            }
          : c
      );
      persistCourses(updated, `Admin updated course: ${courseFormData.title}`);
      alert('Course updated successfully!');
      setIsEditingCourse(false);
    }
  };

  // Module Actions
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

  // Manual Question Builder Handlers (User Specification: No auto-generation required)
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

    // Immediate DB synchronization
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

  // Optional: Auto-Generate 20 Questions fallback
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

  // Lesson Save Action
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

  // Filtered courses
  const filteredCourses = courses.filter((c) => {
    const matchesSearch = c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.category?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeModule = courseFormData.modules?.[activeModuleIndex] || null;

  return (
    <div className="space-y-6 animate-slide-left font-lora">
      {/* ================= TOP SEARCH & ACTION HEADER ================= */}
      <div className="cyber-glass-panel p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#65F58A]/30">
        <div className="flex items-center space-x-3">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-[#72A88E] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search catalog by title or track..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#061510] text-xs font-lora text-white pl-9 pr-3 py-2.5 rounded-xl border border-[#65F58A]/25 focus:outline-none focus:border-[#65F58A]"
            />
          </div>

          <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-[#061510] border border-[#65F58A]/20">
            {['ALL', 'PUBLISHED', 'DRAFT'].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 text-xs font-mono rounded-lg transition-colors cursor-pointer ${
                  statusFilter === status
                    ? 'bg-[#65F58A] text-[#071018] font-bold'
                    : 'text-[#8BA2B5] hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
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
              video_source_type: 'upload',
              video_url: '/assets/sample-lesson.mp4',
              status: 'PUBLISHED',
              modules: []
            });
          }}
          className="px-5 py-2.5 bg-[#65F58A] hover:bg-[#35E6B5] text-[#071018] font-bold text-xs rounded-xl flex items-center space-x-2 transition-all shadow-[0_0_15px_rgba(101,245,138,0.35)] cursor-pointer flex-shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Create New Course</span>
        </button>
      </div>

      {/* ================= MAIN DUAL-PANE COURSE STUDIO ================= */}
      <div className="grid grid-cols-12 gap-6 min-h-[750px]">
        {/* LEFT 4 COLUMNS: Transparent Liquid Glass Course Cards Repository */}
        <div className="col-span-12 lg:col-span-4 space-y-4 max-h-[820px] overflow-y-auto custom-scrollbar pr-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#72A88E] px-1">
            <span>COURSES IN REPOSITORY ({filteredCourses.length})</span>
            <span className="text-[#65F58A]">Transparent Emerald Glass</span>
          </div>

          {filteredCourses.map((c, idx) => {
            const cardStyle = getCardStyleByIndex(idx);
            const isSelected = selectedCourse?.id === c.id && !isCreatingNew;
            const moduleCount = c.modules?.length || 0;
            const lessonCount = (c.modules || []).reduce((acc, m) => acc + (m.lessons?.length || 0), 0);

            return (
              <div
                key={c.id || idx}
                onClick={() => {
                  setSelectedCourse(c);
                  loadCourseIntoForm(c);
                  setIsCreatingNew(false);
                  setIsEditingCourse(false);
                }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer backdrop-blur-xl ${
                  isSelected
                    ? 'border-[#65F58A] bg-[#092218]/90 shadow-[0_0_20px_rgba(101,245,138,0.25)] scale-[1.01]'
                    : 'border-[#65F58A]/20 bg-[#061510]/80 hover:border-[#65F58A]/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#65F58A]/30 text-[#65F58A] bg-[#071018]/60">
                    {c.level || 'Intermediate'}
                  </span>
                  <div className="flex items-center space-x-1.5">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        c.status === 'PUBLISHED'
                          ? 'bg-[#65F58A]/15 text-[#65F58A] border border-[#65F58A]/30'
                          : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {c.status || 'DRAFT'}
                    </span>
                    <button
                      type="button"
                      title="Permanently Delete Course"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteCourse(c.id);
                      }}
                      className="p-1 rounded-md text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h4 className="text-base font-bold text-white mb-1.5 leading-snug line-clamp-1">
                  {c.title}
                </h4>
                <p className="text-xs text-[#C9EFE0] line-clamp-2 mb-3">
                  {c.overview || c.description || 'Defensive cybersecurity training curriculum.'}
                </p>

                <div className="flex items-center justify-between text-[11px] font-mono pt-3 border-t border-[#65F58A]/15 text-[#72A88E]">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1">
                      <Layers className="w-3.5 h-3.5 text-[#65F58A]" />
                      <span>{moduleCount} Modules</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Video className="w-3.5 h-3.5 text-[#35E6B5]" />
                      <span>{lessonCount} Lessons</span>
                    </span>
                  </div>
                  <span className="text-[#65F58A] font-semibold">{c.duration || '4 Weeks'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT 8 COLUMNS: 10-Second Intuitive Course Wizard & Studio */}
        <div className="col-span-12 lg:col-span-8 cyber-glass-panel rounded-2xl border border-[#65F58A]/30 flex flex-col overflow-hidden shadow-2xl">
          {/* Studio Header Bar */}
          <div className="p-5 border-b border-[#65F58A]/20 bg-[#061510] flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-[#65F58A] uppercase tracking-wider block">
                {isCreatingNew ? 'NEW COURSE STUDIO' : 'COURSE BUILDER & MANAGER'}
              </span>
              <h3 className="text-lg font-bold text-white">
                {isCreatingNew ? 'Create New Course' : courseFormData.title || 'Course Architecture'}
              </h3>
            </div>

            <div className="flex items-center space-x-3">
              {!isCreatingNew && selectedCourse?.id && (
                <button
                  type="button"
                  onClick={() => handleDeleteCourse(selectedCourse.id)}
                  className="px-3.5 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-400 font-bold text-xs font-mono flex items-center space-x-1.5 transition-all cursor-pointer"
                  title="Permanently Delete Course"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Course</span>
                </button>
              )}
              <button
                type="button"
                onClick={handleSaveCourse}
                className="px-5 py-2 rounded-xl bg-[#65F58A] hover:bg-[#35E6B5] text-[#071018] font-bold text-xs font-mono flex items-center space-x-1.5 transition-all shadow-[0_0_15px_rgba(101,245,138,0.3)] cursor-pointer"
              >
                <Save className="w-4 h-4 stroke-[2.5]" />
                <span>{isCreatingNew ? 'Launch Course' : 'Save Changes'}</span>
              </button>
            </div>
          </div>

          {/* 4-Step Intuitive Navigation Pills (Understandable in 10 Seconds!) */}
          <div className="grid grid-cols-4 border-b border-[#65F58A]/20 bg-[#071018]">
            {[
              { step: 1, title: '1. Course Info & About' },
              { step: 2, title: '2. Media (Image & Video)' },
              { step: 3, title: '3. Modules & Units' },
              { step: 4, title: '4. Questions & Assessments' }
            ].map((s) => (
              <button
                key={s.step}
                type="button"
                onClick={() => setBuilderStep(s.step)}
                className={`py-3 px-3 text-center text-xs font-mono font-bold transition-all border-b-2 cursor-pointer ${
                  builderStep === s.step
                    ? 'border-[#65F58A] text-[#65F58A] bg-[#092218]/40'
                    : 'border-transparent text-[#72A88E] hover:text-white'
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>

          {/* Tabbed Form Body */}
          <div className="p-6 flex-1 overflow-y-auto max-h-[680px] custom-scrollbar space-y-6">
            {/* ================= STEP 1: COURSE INFO & ABOUT SECTION ================= */}
            {builderStep === 1 && (
              <div className="space-y-4 animate-slide-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-[#72A88E]">Course Title *</label>
                    <input
                      type="text"
                      required
                      value={courseFormData.title}
                      onChange={(e) => setCourseFormData({ ...courseFormData, title: e.target.value })}
                      placeholder="e.g. Advanced Network Defense & Packet Inspection"
                      className="w-full bg-[#061510] rounded-xl p-3 text-xs text-white border border-[#65F58A]/25 focus:outline-none focus:border-[#65F58A]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-[#72A88E]">URL Slug</label>
                    <input
                      type="text"
                      value={courseFormData.slug}
                      onChange={(e) => setCourseFormData({ ...courseFormData, slug: e.target.value })}
                      placeholder="e.g. advanced-network-defense"
                      className="w-full bg-[#061510] rounded-xl p-3 text-xs text-white border border-[#65F58A]/25 focus:outline-none focus:border-[#65F58A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-[#72A88E]">Difficulty Level</label>
                    <select
                      value={courseFormData.level}
                      onChange={(e) => setCourseFormData({ ...courseFormData, level: e.target.value })}
                      className="w-full bg-[#061510] rounded-xl p-3 text-xs text-white border border-[#65F58A]/25 focus:outline-none focus:border-[#65F58A]"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-[#72A88E]">Duration & Effort</label>
                    <input
                      type="text"
                      value={courseFormData.duration}
                      onChange={(e) => setCourseFormData({ ...courseFormData, duration: e.target.value })}
                      placeholder="e.g. 4 Weeks (14 Hours)"
                      className="w-full bg-[#061510] rounded-xl p-3 text-xs text-white border border-[#65F58A]/25 focus:outline-none focus:border-[#65F58A]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-[#72A88E]">Price / Access Model</label>
                    <input
                      type="text"
                      value={courseFormData.price}
                      onChange={(e) => setCourseFormData({ ...courseFormData, price: e.target.value })}
                      placeholder="e.g. Free Institutional Access"
                      className="w-full bg-[#061510] rounded-xl p-3 text-xs text-white border border-[#65F58A]/25 focus:outline-none focus:border-[#65F58A]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#72A88E]">Short Pitch Overview (For Cards & Hero)</label>
                  <textarea
                    rows={2}
                    value={courseFormData.overview}
                    onChange={(e) => setCourseFormData({ ...courseFormData, overview: e.target.value })}
                    placeholder="Concise overview of what operators will achieve in this syllabus."
                    className="w-full bg-[#061510] rounded-xl p-3 text-xs text-white border border-[#65F58A]/25 focus:outline-none focus:border-[#65F58A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#72A88E]">Full Course About Section (Open edX Format)</label>
                  <textarea
                    rows={4}
                    value={courseFormData.description}
                    onChange={(e) => setCourseFormData({ ...courseFormData, description: e.target.value })}
                    placeholder="Comprehensive description of the course, laboratory environments, and defense strategies."
                    className="w-full bg-[#061510] rounded-xl p-3 text-xs text-white border border-[#65F58A]/25 focus:outline-none focus:border-[#65F58A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#72A88E]">Prerequisites</label>
                  <input
                    type="text"
                    value={courseFormData.prerequisites}
                    onChange={(e) => setCourseFormData({ ...courseFormData, prerequisites: e.target.value })}
                    placeholder="e.g. Working knowledge of Linux terminal commands and TCP/IP."
                    className="w-full bg-[#061510] rounded-xl p-3 text-xs text-white border border-[#65F58A]/25 focus:outline-none focus:border-[#65F58A]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setBuilderStep(2)}
                    className="px-5 py-2.5 bg-[#092218] hover:bg-[#0c2a1e] text-[#65F58A] border border-[#65F58A]/40 text-xs font-mono font-bold rounded-xl flex items-center space-x-2 transition-colors cursor-pointer"
                  >
                    <span>Proceed to Step 2: Media Assets</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 2: MEDIA ASSETS (BOTH IMAGE & VIDEO WITH DUAL UPLOAD/URL) ================= */}
            {builderStep === 2 && (
              <div className="space-y-6 animate-slide-left">
                {/* 1. Course Poster / Cover Image */}
                <div className="p-5 rounded-2xl bg-[#061510] border border-[#65F58A]/25 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ImageIcon className="w-4 h-4 text-[#65F58A]" />
                      <h4 className="font-bold text-sm text-white">Course Cover Image (Poster)</h4>
                    </div>
                    {/* Toggle: Upload Image File vs Image URL */}
                    <div className="flex items-center space-x-1 p-1 rounded-lg bg-[#040e0a] border border-[#65F58A]/20">
                      <button
                        type="button"
                        onClick={() => setCourseFormData({ ...courseFormData, image_source_type: 'upload' })}
                        className={`px-3 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                          courseFormData.image_source_type === 'upload'
                            ? 'bg-[#65F58A] text-[#071018] font-bold'
                            : 'text-[#72A88E] hover:text-white'
                        }`}
                      >
                        Upload Image File
                      </button>
                      <button
                        type="button"
                        onClick={() => setCourseFormData({ ...courseFormData, image_source_type: 'url' })}
                        className={`px-3 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                          courseFormData.image_source_type === 'url'
                            ? 'bg-[#65F58A] text-[#071018] font-bold'
                            : 'text-[#72A88E] hover:text-white'
                        }`}
                      >
                        Image URL
                      </button>
                    </div>
                  </div>

                  {courseFormData.image_source_type === 'upload' ? (
                    <div className="border-2 border-dashed border-[#65F58A]/30 hover:border-[#65F58A] rounded-xl p-6 text-center space-y-2 transition-colors">
                      <UploadCloud className="w-8 h-8 text-[#65F58A] mx-auto" />
                      <div className="text-xs text-white font-medium">
                        Upload custom course artwork / poster image
                      </div>
                      <p className="text-[10px] text-[#72A88E] font-mono">
                        PNG, JPG, or WebP (Recommended 1280x720)
                      </p>
                      <label className="inline-block px-4 py-2 mt-2 rounded-lg bg-[#092218] hover:bg-[#0c2a1e] text-[#65F58A] border border-[#65F58A]/40 text-xs font-mono font-bold cursor-pointer transition-colors">
                        Browse Image
                        <input
                          ref={imageInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <input
                        type="text"
                        value={courseFormData.image_url}
                        onChange={(e) => setCourseFormData({ ...courseFormData, image_url: e.target.value })}
                        placeholder="https://... or /assets/course-art/art-01.jpg"
                        className="w-full bg-[#040e0a] rounded-xl p-3 text-xs text-white border border-[#65F58A]/25 focus:outline-none focus:border-[#65F58A]"
                      />
                    </div>
                  )}

                  {/* Live Image Preview */}
                  {courseFormData.image_url && (
                    <div className="flex items-center space-x-4 p-3 bg-[#040e0a] rounded-xl border border-[#65F58A]/20">
                      <img
                        src={courseFormData.image_url}
                        alt="Course Poster Preview"
                        className="w-28 h-16 object-cover rounded-lg border border-[#65F58A]/30"
                      />
                      <div className="text-xs font-mono">
                        <span className="text-[#65F58A] font-bold block">Live Poster Preview</span>
                        <span className="text-[#72A88E] text-[10px] truncate max-w-xs block">
                          {courseFormData.image_url.slice(0, 60)}...
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Course Intro Video / Trailer */}
                <div className="p-5 rounded-2xl bg-[#061510] border border-[#65F58A]/25 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Film className="w-4 h-4 text-[#35E6B5]" />
                      <h4 className="font-bold text-sm text-white">Course Video / Trailer</h4>
                    </div>
                    {/* Toggle: Upload Video File vs Video URL */}
                    <div className="flex items-center space-x-1 p-1 rounded-lg bg-[#040e0a] border border-[#65F58A]/20">
                      <button
                        type="button"
                        onClick={() => setCourseFormData({ ...courseFormData, video_source_type: 'upload' })}
                        className={`px-3 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                          courseFormData.video_source_type === 'upload'
                            ? 'bg-[#65F58A] text-[#071018] font-bold'
                            : 'text-[#72A88E] hover:text-white'
                        }`}
                      >
                        Upload Video File
                      </button>
                      <button
                        type="button"
                        onClick={() => setCourseFormData({ ...courseFormData, video_source_type: 'url' })}
                        className={`px-3 py-1 text-xs font-mono rounded transition-colors cursor-pointer ${
                          courseFormData.video_source_type === 'url'
                            ? 'bg-[#65F58A] text-[#071018] font-bold'
                            : 'text-[#72A88E] hover:text-white'
                        }`}
                      >
                        Video URL
                      </button>
                    </div>
                  </div>

                  {courseFormData.video_source_type === 'upload' ? (
                    <div className="border-2 border-dashed border-[#65F58A]/30 hover:border-[#65F58A] rounded-xl p-6 text-center space-y-2 transition-colors">
                      <UploadCloud className="w-8 h-8 text-[#35E6B5] mx-auto" />
                      <div className="text-xs text-white font-medium">
                        Upload MP4 or WebM video into persistent local storage
                      </div>
                      <p className="text-[10px] text-[#72A88E] font-mono">
                        Fast local IndexedDB playback cache
                      </p>
                      <label className="inline-block px-4 py-2 mt-2 rounded-lg bg-[#092218] hover:bg-[#0c2a1e] text-[#35E6B5] border border-[#35E6B5]/40 text-xs font-mono font-bold cursor-pointer transition-colors">
                        Browse Video File
                        <input
                          ref={videoInputRef}
                          type="file"
                          accept="video/*"
                          onChange={handleVideoFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <input
                        type="text"
                        value={courseFormData.video_url}
                        onChange={(e) => {
                          setCourseFormData({ ...courseFormData, video_url: e.target.value });
                          setVideoPreviewUrl(e.target.value);
                        }}
                        placeholder="YouTube, Vimeo, or MP4 URL (e.g. https://www.youtube.com/watch?v=...)"
                        className="w-full bg-[#040e0a] rounded-xl p-3 text-xs text-white border border-[#65F58A]/25 focus:outline-none focus:border-[#65F58A]"
                      />
                    </div>
                  )}

                  {/* Live Video Player Preview */}
                  {videoPreviewUrl && (
                    <div className="p-3 bg-[#040e0a] rounded-xl border border-[#65F58A]/20 space-y-2">
                      <span className="text-xs font-mono text-[#65F58A] font-bold block">
                        Live Video Player Preview
                      </span>
                      <div className="relative aspect-video max-w-md bg-black rounded-lg overflow-hidden border border-white/10">
                        {videoPreviewUrl.includes('youtube.com') || videoPreviewUrl.includes('youtu.be') ? (
                          <iframe
                            src={videoPreviewUrl.replace('watch?v=', 'embed/')}
                            title="Trailer Preview"
                            className="w-full h-full border-0"
                            allowFullScreen
                          />
                        ) : (
                          <video
                            src={videoPreviewUrl}
                            controls
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setBuilderStep(1)}
                    className="px-4 py-2 text-xs font-mono text-[#72A88E] hover:text-white"
                  >
                    ← Back to Step 1
                  </button>
                  <button
                    type="button"
                    onClick={() => setBuilderStep(3)}
                    className="px-5 py-2.5 bg-[#092218] hover:bg-[#0c2a1e] text-[#65F58A] border border-[#65F58A]/40 text-xs font-mono font-bold rounded-xl flex items-center space-x-2 transition-colors cursor-pointer"
                  >
                    <span>Proceed to Step 3: Modules</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 3: MODULES & LESSONS BUILDER ================= */}
            {builderStep === 3 && (
              <div className="space-y-6 animate-slide-left">
                <div className="flex items-center justify-between pb-2 border-b border-[#65F58A]/20">
                  <h4 className="font-bold text-sm text-white">Course Modules & Sequential Units</h4>
                  <button
                    type="button"
                    onClick={() => {
                      setModuleTitleInput('');
                      setModuleModalOpen(true);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-[#092218] hover:bg-[#0c2a1e] text-[#65F58A] border border-[#65F58A]/30 text-xs font-mono font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Module</span>
                  </button>
                </div>

                {(!courseFormData.modules || courseFormData.modules.length === 0) ? (
                  <div className="p-8 text-center rounded-2xl bg-[#061510] border border-dashed border-[#65F58A]/25 space-y-3">
                    <BookOpen className="w-8 h-8 text-[#72A88E] mx-auto opacity-60" />
                    <p className="text-xs text-[#72A88E]">No modules created yet.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setModuleTitleInput('Module 1: Architecture & Defensive Fundamentals');
                        setModuleModalOpen(true);
                      }}
                      className="text-xs font-mono text-[#65F58A] underline cursor-pointer"
                    >
                      + Create First Module
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {courseFormData.modules.map((mod, modIdx) => (
                      <div
                        key={mod.id || modIdx}
                        className="rounded-2xl bg-[#061510] border border-[#65F58A]/25 overflow-hidden"
                      >
                        <div className="p-4 bg-[#092218]/60 flex items-center justify-between border-b border-[#65F58A]/15">
                          <div className="flex items-center space-x-3">
                            <span className="w-6 h-6 rounded-full bg-[#65F58A] text-[#071018] font-bold text-xs flex items-center justify-center font-mono">
                              {modIdx + 1}
                            </span>
                            <span className="font-bold text-sm text-white">{mod.title}</span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={() => {
                                setActiveModuleIndex(modIdx);
                                setLessonForm({
                                  title: '',
                                  duration: '15 mins',
                                  type: 'video',
                                  video_url: '/assets/sample-lesson.mp4',
                                  video_source_type: 'url',
                                  content: '',
                                  pdf_attachment: null
                                });
                                setEditingLessonIdx(null);
                                setLessonModalOpen(true);
                              }}
                              className="px-2.5 py-1 text-xs font-mono bg-[#092218] hover:bg-[#0c2a1e] text-[#65F58A] border border-[#65F58A]/30 rounded-lg flex items-center space-x-1 cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add Lesson</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteModule(modIdx)}
                              className="p-1 text-[#EF4444] hover:bg-[#EF4444]/10 rounded-lg"
                              title="Delete Module"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Lessons List in Module */}
                        <div className="p-4 space-y-2">
                          {(mod.lessons || []).map((les, lIdx) => (
                            <div
                              key={les.id || lIdx}
                              className="p-3 rounded-xl bg-[#040e0a] border border-white/5 flex items-center justify-between text-xs"
                            >
                              <div className="flex items-center space-x-2.5 truncate pr-2">
                                <Play className="w-3.5 h-3.5 text-[#65F58A] flex-shrink-0" />
                                <span className="text-white truncate font-medium">{les.title}</span>
                                {les.pdf_attachment && (
                                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#35E6B5]/15 text-[#35E6B5]">
                                    PDF Attached
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center space-x-3 flex-shrink-0 font-mono text-[11px] text-[#72A88E]">
                                <span>{les.duration || '15 mins'}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveModuleIndex(modIdx);
                                    setEditingLessonIdx(lIdx);
                                    setLessonForm(les);
                                    setLessonModalOpen(true);
                                  }}
                                  className="text-[#65F58A] hover:underline cursor-pointer"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveModuleIndex(modIdx);
                                    handleDeleteLesson(lIdx);
                                  }}
                                  className="text-[#EF4444] hover:underline cursor-pointer"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))}

                          {/* Knowledge Check Indicator */}
                          <div className="p-3 rounded-xl bg-[#092218]/50 border border-[#65F58A]/25 flex items-center justify-between text-xs font-mono">
                            <div className="flex items-center space-x-2 text-[#65F58A] font-bold">
                              <Award className="w-4 h-4" />
                              <span>Module Knowledge Check ({mod.quiz?.questions?.length || 20} Questions)</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setActiveModuleIndex(modIdx);
                                setBuilderStep(4);
                              }}
                              className="text-xs text-[#65F58A] underline cursor-pointer"
                            >
                              Configure Exam →
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setBuilderStep(2)}
                    className="px-4 py-2 text-xs font-mono text-[#72A88E] hover:text-white"
                  >
                    ← Back to Step 2
                  </button>
                  <button
                    type="button"
                    onClick={() => setBuilderStep(4)}
                    className="px-5 py-2.5 bg-[#092218] hover:bg-[#0c2a1e] text-[#65F58A] border border-[#65F58A]/40 text-xs font-mono font-bold rounded-xl flex items-center space-x-2 transition-colors cursor-pointer"
                  >
                    <span>Proceed to Step 4: 20-Question Exam</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ================= STEP 4: MANUAL QUESTION BUILDER & EXAM STUDIO ================= */}
            {builderStep === 4 && (
              <div className="space-y-6 animate-slide-left">
                <div className="p-5 rounded-2xl bg-[#061510] border border-[#65F58A]/25 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#65F58A]/20">
                    <div>
                      <span className="text-[10px] font-mono text-[#65F58A] font-bold uppercase tracking-wider block">
                        MODULE ASSESSMENT & QUESTIONS (MANUAL BUILDER)
                      </span>
                      <h4 className="font-bold text-base text-white">
                        {activeModule?.title || 'Select a Module'} — Examination Pool
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Module Selector Pill */}
                      <select
                        value={activeModuleIndex}
                        onChange={(e) => setActiveModuleIndex(Number(e.target.value))}
                        className="bg-[#040e0a] text-xs font-mono text-[#65F58A] px-3 py-2 rounded-xl border border-[#65F58A]/30 focus:outline-none"
                      >
                        {(courseFormData.modules || []).map((m, idx) => (
                          <option key={m.id || idx} value={idx}>
                            Module {idx + 1}: {m.title}
                          </option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={handleOpenAddQuestion}
                        className="px-4 py-2 bg-[#65F58A] hover:bg-[#35E6B5] text-[#071018] font-bold text-xs font-mono rounded-xl transition-all shadow-[0_0_15px_rgba(101,245,138,0.3)] flex items-center space-x-1.5 cursor-pointer flex-shrink-0"
                      >
                        <Plus className="w-4 h-4 stroke-[3]" />
                        <span>Add Question Manually</span>
                      </button>
                    </div>
                  </div>

                  {/* Manual Question Builder Top Bar */}
                  <div className="p-4 rounded-xl bg-[#092218] border border-[#65F58A]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[0_0_15px_rgba(101,245,138,0.15)]">
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-white flex items-center space-x-1.5 font-mono">
                        <CheckCircle2 className="w-4 h-4 text-[#65F58A]" />
                        <span>Dedicated Manual Question Authoring</span>
                      </span>
                      <p className="text-[11px] text-[#C9EFE0]">
                        Enter exact custom question statements, options A/B/C/D, specify the single verified correct option, and write technical explanations.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleOpenAddQuestion}
                        className="px-4 py-2 bg-[#65F58A] hover:bg-[#35E6B5] text-[#071018] font-bold text-xs font-mono rounded-lg transition-all shadow-sm flex items-center space-x-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>+ New Question</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleGenerate20Questions}
                        className="px-3 py-2 bg-[#040e0a] hover:bg-[#071018] text-[#72A88E] hover:text-[#65F58A] text-xs font-mono rounded-lg border border-[#65F58A]/20 transition-all cursor-pointer"
                        title="Load standard baseline template questions to edit manually"
                      >
                        Load Template Questions
                      </button>
                    </div>
                  </div>

                  {/* List of Questions in Active Module */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between text-xs font-mono text-[#72A88E]">
                      <span>
                        EXAM QUESTIONS ({activeModule?.quiz?.questions?.length || 0} Total in Pool)
                      </span>
                      <span className="text-[#65F58A]">
                        Minimum Passing Criteria: 80%
                      </span>
                    </div>

                    {(!activeModule?.quiz?.questions || activeModule.quiz.questions.length === 0) ? (
                      <div className="p-8 text-center rounded-2xl bg-[#040e0a] border border-dashed border-[#65F58A]/20 space-y-3">
                        <HelpCircle className="w-8 h-8 text-[#72A88E] mx-auto opacity-60" />
                        <p className="text-xs text-[#72A88E]">No questions added to this module yet.</p>
                        <button
                          type="button"
                          onClick={handleOpenAddQuestion}
                          className="px-4 py-2 bg-[#65F58A] text-[#071018] font-bold text-xs font-mono rounded-xl hover:bg-[#35E6B5] transition-all cursor-pointer inline-flex items-center space-x-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add First Question Manually</span>
                        </button>
                      </div>
                    ) : (
                      (activeModule?.quiz?.questions || []).map((q, qIdx) => (
                        <div
                          key={q.id || qIdx}
                          className="p-4 rounded-xl bg-[#040e0a] border border-[#65F58A]/20 space-y-3 text-xs"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1">
                              <span className="font-bold text-white font-lora text-sm">
                                {qIdx + 1}. {q.text}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 flex-shrink-0">
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#65F58A]/10 text-[#65F58A] border border-[#65F58A]/30 font-bold">
                                {q.points || 1} Point{(q.points || 1) > 1 ? 's' : ''}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleOpenEditQuestion(q, qIdx)}
                                className="p-1.5 rounded-lg bg-[#092218] hover:bg-[#0c2a1e] text-[#65F58A] border border-[#65F58A]/30 transition-colors"
                                title="Edit Question"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteQuestion(qIdx)}
                                className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-500/30 transition-colors"
                                title="Delete Question"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            {(q.options || []).map((opt, oIdx) => (
                              <div
                                key={opt.id || oIdx}
                                className={`p-2.5 rounded-xl border text-[11px] font-mono flex items-center justify-between ${
                                  opt.is_correct
                                    ? 'bg-[#092218] border-[#65F58A] text-[#65F58A] font-bold shadow-[0_0_10px_rgba(101,245,138,0.2)]'
                                    : 'bg-[#061510] border-white/5 text-[#8BA2B5]'
                                }`}
                              >
                                <span>
                                  <strong className="text-white mr-1.5">{String.fromCharCode(65 + oIdx)}.</strong>
                                  {opt.text}
                                </span>
                                {opt.is_correct && (
                                  <span className="text-[10px] font-bold text-[#65F58A] px-1.5 py-0.5 rounded bg-[#65F58A]/15 border border-[#65F58A]/30">
                                    CORRECT
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>

                          <div className="text-[11px] text-[#72A88E] font-mono p-2.5 rounded-lg bg-[#061510] border border-[#65F58A]/10">
                            <strong className="text-white">Explanation: </strong>
                            <span>{q.explanation || 'No explanation provided.'}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setBuilderStep(3)}
                    className="px-4 py-2 text-xs font-mono text-[#72A88E] hover:text-white"
                  >
                    ← Back to Step 3
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveCourse}
                    className="px-6 py-3 bg-[#65F58A] hover:bg-[#35E6B5] text-[#071018] font-bold text-xs font-mono rounded-xl flex items-center space-x-2 transition-all shadow-[0_0_20px_rgba(101,245,138,0.4)] cursor-pointer"
                  >
                    <Save className="w-4 h-4 stroke-[3]" />
                    <span>Save & Finalize Course</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= MODAL: ADD / EDIT MODULE ================= */}
      {moduleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-2xl bg-[#061510] border border-[#65F58A]/30 space-y-4">
            <h3 className="font-bold text-base text-white">Create New Curriculum Module</h3>
            <div className="space-y-1">
              <label className="text-xs font-mono text-[#72A88E]">Module Title *</label>
              <input
                type="text"
                value={moduleTitleInput}
                onChange={(e) => setModuleTitleInput(e.target.value)}
                placeholder="e.g. Module 2: Threat Detection & MITRE ATT&CK"
                className="w-full bg-[#040e0a] rounded-xl p-3 text-xs text-white border border-[#65F58A]/25 focus:outline-none focus:border-[#65F58A]"
              />
            </div>
            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setModuleModalOpen(false)}
                className="px-4 py-2 text-xs font-mono text-[#8BA2B5] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddModule}
                className="px-4 py-2 rounded-xl bg-[#65F58A] text-[#071018] font-bold text-xs font-mono cursor-pointer"
              >
                Add Module
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD / EDIT LESSON ================= */}
      {lessonModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-xl w-full p-6 rounded-2xl bg-[#061510] border border-[#65F58A]/30 space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <h3 className="font-bold text-base text-white">
              {editingLessonIdx !== null ? 'Edit Lesson' : 'Add New Instructional Lesson'}
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-mono text-[#72A88E]">Lesson Title *</label>
              <input
                type="text"
                value={lessonForm.title}
                onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                placeholder="e.g. 1.2 Telemetry Ingestion & Filtering"
                className="w-full bg-[#040e0a] rounded-xl p-3 text-xs text-white border border-[#65F58A]/25 focus:outline-none focus:border-[#65F58A]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-[#72A88E]">Duration</label>
                <input
                  type="text"
                  value={lessonForm.duration}
                  onChange={(e) => setLessonForm({ ...lessonForm, duration: e.target.value })}
                  placeholder="15 mins"
                  className="w-full bg-[#040e0a] rounded-xl p-3 text-xs text-white border border-[#65F58A]/25 focus:outline-none focus:border-[#65F58A]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-[#72A88E]">Lesson Video Source</label>
                <select
                  value={lessonForm.video_source_type}
                  onChange={(e) => setLessonForm({ ...lessonForm, video_source_type: e.target.value })}
                  className="w-full bg-[#040e0a] rounded-xl p-3 text-xs text-white border border-[#65F58A]/25 focus:outline-none focus:border-[#65F58A]"
                >
                  <option value="url">Video URL (Stream / Embed)</option>
                  <option value="upload">Upload Local Video File</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-[#72A88E]">Lesson Video Stream URL</label>
              <input
                type="text"
                value={lessonForm.video_url}
                onChange={(e) => setLessonForm({ ...lessonForm, video_url: e.target.value })}
                placeholder="YouTube, Vimeo, or MP4 URL"
                className="w-full bg-[#040e0a] rounded-xl p-3 text-xs text-white border border-[#65F58A]/25 focus:outline-none focus:border-[#65F58A]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-[#72A88E]">Instructional Notes (Markdown)</label>
              <textarea
                rows={4}
                value={lessonForm.content}
                onChange={(e) => setLessonForm({ ...lessonForm, content: e.target.value })}
                placeholder="Markdown text, commands, and operational procedures."
                className="w-full bg-[#040e0a] rounded-xl p-3 text-xs text-white border border-[#65F58A]/25 focus:outline-none focus:border-[#65F58A]"
              />
            </div>

            {/* Optional PDF Attachment */}
            <div className="p-3 bg-[#040e0a] rounded-xl border border-[#65F58A]/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#72A88E]">Attach Optional PDF Guide</span>
                <label className="px-3 py-1 bg-[#092218] text-[#35E6B5] border border-[#35E6B5]/30 rounded-lg text-xs font-mono cursor-pointer">
                  Browse PDF
                  <input
                    ref={lessonPdfRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleLessonPdfUpload}
                    className="hidden"
                  />
                </label>
              </div>
              {lessonForm.pdf_attachment && (
                <div className="text-xs font-mono text-[#35E6B5]">
                  Attached: {lessonForm.pdf_attachment.name} ({lessonForm.pdf_attachment.size})
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setLessonModalOpen(false)}
                className="px-4 py-2 text-xs font-mono text-[#8BA2B5] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveLesson}
                className="px-4 py-2 rounded-xl bg-[#65F58A] text-[#071018] font-bold text-xs font-mono cursor-pointer"
              >
                Save Lesson
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ================= MODAL: ADD / EDIT QUESTION MANUALLY ================= */}
      {questionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-2xl w-full p-6 rounded-2xl bg-[#061510] border border-[#65F58A]/30 space-y-4 max-h-[92vh] overflow-y-auto custom-scrollbar shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#65F58A]/20 pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#65F58A] font-bold uppercase tracking-wider block">
                  MANUAL QUESTION AUTHORING
                </span>
                <h3 className="font-bold text-base text-white">
                  {editingQuestionIdx !== null ? 'Edit Question' : 'Add Question to Assessment'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setQuestionModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Question Statement */}
            <div className="space-y-1">
              <label className="text-xs font-mono text-[#72A88E] flex items-center justify-between">
                <span>Question Statement / Problem Text *</span>
                <span className="text-[10px] text-slate-400">Clear & unambiguous</span>
              </label>
              <textarea
                rows={3}
                required
                value={questionForm.text}
                onChange={(e) => setQuestionForm({ ...questionForm, text: e.target.value })}
                placeholder="e.g. Which Wireshark filter syntax isolates all TCP SYN packets with no ACK flag set?"
                className="w-full bg-[#040e0a] rounded-xl p-3 text-xs text-white border border-[#65F58A]/25 focus:outline-none focus:border-[#65F58A]"
              />
            </div>

            {/* Four Options with Radio Button to Designate Correct Answer */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono text-[#72A88E]">
                  Answer Choices (Select the Radio Button for the Verified Correct Option) *
                </label>
                <span className="text-[10px] font-mono text-[#65F58A]">
                  Option {String.fromCharCode(65 + questionForm.correctIndex)} is designated Correct
                </span>
              </div>

              {[
                { key: 'optionA', label: 'Option A', index: 0 },
                { key: 'optionB', label: 'Option B', index: 1 },
                { key: 'optionC', label: 'Option C', index: 2 },
                { key: 'optionD', label: 'Option D', index: 3 }
              ].map((opt) => {
                const isSelected = questionForm.correctIndex === opt.index;
                return (
                  <div
                    key={opt.key}
                    className={`p-3 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-[#092218] border-[#65F58A] shadow-[0_0_12px_rgba(101,245,138,0.15)]'
                        : 'bg-[#040e0a] border-[#65F58A]/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        id={`radio_${opt.key}`}
                        name="correct_answer_choice"
                        checked={isSelected}
                        onChange={() => setQuestionForm({ ...questionForm, correctIndex: opt.index })}
                        className="w-4 h-4 accent-[#65F58A] cursor-pointer"
                      />
                      <label
                        htmlFor={`radio_${opt.key}`}
                        className={`text-xs font-mono font-bold cursor-pointer w-20 flex-shrink-0 ${
                          isSelected ? 'text-[#65F58A]' : 'text-slate-300'
                        }`}
                      >
                        {opt.label}:
                      </label>
                      <input
                        type="text"
                        value={questionForm[opt.key]}
                        onChange={(e) => setQuestionForm({ ...questionForm, [opt.key]: e.target.value })}
                        placeholder={`Enter text for ${opt.label}...`}
                        className="flex-1 bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
                      />
                      {isSelected && (
                        <span className="text-[10px] font-mono font-bold text-[#65F58A] px-2 py-0.5 rounded bg-[#65F58A]/10 border border-[#65F58A]/30 flex-shrink-0">
                          CORRECT
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Points & Explanation */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-1">
              <div className="sm:col-span-1 space-y-1">
                <label className="text-xs font-mono text-[#72A88E]">Points</label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={questionForm.points}
                  onChange={(e) => setQuestionForm({ ...questionForm, points: Number(e.target.value) || 1 })}
                  className="w-full bg-[#040e0a] rounded-xl p-3 text-xs text-white border border-[#65F58A]/25 focus:outline-none focus:border-[#65F58A]"
                />
              </div>

              <div className="sm:col-span-3 space-y-1">
                <label className="text-xs font-mono text-[#72A88E]">
                  Technical Explanation / Rationale *
                </label>
                <textarea
                  rows={2}
                  value={questionForm.explanation}
                  onChange={(e) => setQuestionForm({ ...questionForm, explanation: e.target.value })}
                  placeholder="Explain why the selected option is correct and why other choices are invalid."
                  className="w-full bg-[#040e0a] rounded-xl p-3 text-xs text-white border border-[#65F58A]/25 focus:outline-none focus:border-[#65F58A]"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-3 border-t border-[#65F58A]/20">
              <button
                type="button"
                onClick={() => setQuestionModalOpen(false)}
                className="px-4 py-2 text-xs font-mono text-[#8BA2B5] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveQuestion}
                className="px-5 py-2.5 rounded-xl bg-[#65F58A] hover:bg-[#35E6B5] text-[#071018] font-bold text-xs font-mono flex items-center space-x-1.5 transition-all shadow-[0_0_15px_rgba(101,245,138,0.35)] cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Save Question to Assessment</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
