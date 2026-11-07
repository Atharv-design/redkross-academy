/**
 * RedKross Academy — Psychology & Mental Wellbeing Curriculum Fixtures
 * High-fidelity course definitions aligned with clinical standards, RCI guidelines, and evidence-based psychological science.
 */

export const PSYCHOLOGY_LEARNING_PATHS = [
  {
    id: 'path_clinical_psychology',
    division: 'psychology',
    slug: 'clinical-psychology-counseling-track',
    title: 'Clinical Psychology & Evidence-Based Counseling Track',
    short_desc: 'Comprehensive training in cognitive behavioral therapy, psychological formulation, therapeutic alliances, and structured clinical interventions.',
    difficulty: 'Intermediate to Advanced',
    estimated_weeks: 16,
    total_hours: 64,
    courses_count: 3,
    milestone_cert: 'Certified RedKross Clinical Counseling Practitioner (CRCCP)',
    featured: true,
    skills: ['CBT Formulations', 'Therapeutic Alliance', 'Cognitive Restructuring', 'Socratic Questioning', 'Behavioral Experiments'],
    course_ids: ['crs_psych_cbt', 'crs_psych_crisis', 'crs_psych_neuro']
  },
  {
    id: 'path_crisis_intervention',
    division: 'psychology',
    slug: 'crisis-intervention-pfa-specialist',
    title: 'Crisis Response & Psychological First Aid Specialist',
    short_desc: 'Rapid intervention protocols for acute trauma, bereavement, student distress, and community psychological de-escalation.',
    difficulty: 'Beginner to Intermediate',
    estimated_weeks: 10,
    total_hours: 40,
    courses_count: 2,
    milestone_cert: 'Certified Crisis First Responder (CCFR)',
    featured: true,
    skills: ['RAPID PFA Protocol', 'Suicide Risk Triaging', 'Empathetic De-escalation', 'Disaster Mental Health', 'Emergency Linkages'],
    course_ids: ['crs_psych_crisis', 'crs_psych_adolescent']
  },
  {
    id: 'path_neuro_cognition',
    division: 'psychology',
    slug: 'neurobehavioral-science-cognitive-health',
    title: 'Neurobehavioral Science & Cognitive Health Track',
    short_desc: 'Deep exploration into affective neuroscience, autonomic regulation, the gut-brain axis, and neuroplastic emotional mastery.',
    difficulty: 'Advanced',
    estimated_weeks: 12,
    total_hours: 48,
    courses_count: 2,
    milestone_cert: 'Certified Neurocognitive Specialist (CNCS)',
    featured: false,
    skills: ['Polyvagal Theory', 'HPA Axis Stress Mapping', 'Neurotransmitter Mechanics', 'Executive Functioning', 'Somatic Regulation'],
    course_ids: ['crs_psych_neuro', 'crs_psych_mindfulness']
  }
];

export const PSYCHOLOGY_COURSES = [
  {
    id: 'crs_psych_cbt',
    division: 'psychology',
    slug: 'cognitive-behavioral-therapy-foundations-practice',
    title: 'Foundations of Cognitive Behavioral Therapy: Principles & Clinical Practice',
    version: '1.0',
    category: 'Clinical Psychology',
    difficulty: 'Intermediate',
    price: 0,
    cert_price: 0,
    estimated_duration: '10 Weeks',
    estimated_hours: 40,
    effort: '4 Hours per Week',
    access: 'Free Institutional Access',
    rating: 5,
    enrolled_count: 1840,
    motifVariant: 1,
    skills: [
      'Cognitive Formulation',
      'Automatic Thought Records',
      'Behavioral Activation',
      'Core Belief Restructuring',
      'Exposure Protocols',
      'Relapse Prevention'
    ],
    milestone_cert: 'RedKross Certified CBT Practitioner (RCCP)',
    lead_author: {
      name: 'Dr. Ananya Sen, PhD',
      title: 'Senior Clinical Psychologist & CBT Supervisor',
      role: 'Director of Behavioral Sciences, RedKross Psychology',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'
    },
    overview: 'The definitive clinical practitioner curriculum in Cognitive Behavioral Therapy. Master the empirical mechanics of thought-feeling-behavior loops, systematic automatic thought decatastrophizing, behavioral activation schedules for depression, and structured hierarchy-driven exposure protocols for anxiety disorders.',
    what_you_will_learn: [
      'Construct holistic Beckian cognitive case formulations and maintain collaborative empiricism.',
      'Identify and categorize primary cognitive distortions (catastrophizing, mind-reading, emotional reasoning).',
      'Guide clients through Socratic dialogue and downward-arrow core belief discovery.',
      'Design and monitor graded behavioral experiments to reality-test maladaptive assumptions.',
      'Implement in-vivo and imaginal exposure hierarchies for generalized anxiety and phobic disorders.'
    ],
    modules: [
      {
        id: 'mod_cbt_1',
        title: 'Module 1: The Cognitive Model & Therapeutic Alliance',
        description: 'Understand the triad of cognition, physiological arousal, and behavior. Establish collaborative empiricism and psychoeducational pacing.',
        order: 1,
        lessons: [
          {
            id: 'lsn_cbt_1_1',
            title: '1.1 Foundations of the Beckian Cognitive Model',
            duration: '45 mins',
            xp: 150,
            summary: 'Explore the historical development and empirical validation of Aaron Beck’s cognitive model.',
            content_markdown: '# Foundations of the Beckian Cognitive Model\n\nCognitive Behavioral Therapy (CBT) operates on the principle that psychological distress is primarily mediated by cognitive appraisals rather than environmental occurrences alone.\n\n### Core Equation\n**Event -> Cognitive Appraisal -> Affective / Physiological Response -> Behavioral Action**'
          },
          {
            id: 'lsn_cbt_1_2',
            title: '1.2 Collaborative Empiricism & Agenda Setting',
            duration: '40 mins',
            xp: 150,
            summary: 'Learn the structured 50-minute clinical session protocol and mood check-in methodology.',
            content_markdown: '# Collaborative Empiricism\n\nIn CBT, the therapist and client act as co-investigators testing internal hypotheses against real-world evidence.'
          }
        ]
      },
      {
        id: 'mod_cbt_2',
        title: 'Module 2: Cognitive Distortions & Thought Records',
        description: 'Operationalize 7-column thought records, identifying automatic thoughts and generating balanced alternative appraisals.',
        order: 2,
        lessons: [
          {
            id: 'lsn_cbt_2_1',
            title: '2.1 The Taxonomy of Cognitive Distortions',
            duration: '50 mins',
            xp: 180,
            summary: 'Deep dive into all-or-nothing thinking, catastrophizing, and personalization.',
            content_markdown: '# The Taxonomy of Cognitive Distortions\n\nLearn to spot automatic heuristics that skew risk appraisal and self-worth under conditions of ambiguity.'
          }
        ]
      }
    ]
  },
  {
    id: 'crs_psych_crisis',
    division: 'psychology',
    slug: 'psychological-first-aid-crisis-intervention',
    title: 'Psychological First Aid & Immediate Crisis Intervention',
    version: '1.0',
    category: 'Crisis Response',
    difficulty: 'Beginner to Intermediate',
    price: 0,
    cert_price: 0,
    estimated_duration: '6 Weeks',
    estimated_hours: 24,
    effort: '4 Hours per Week',
    access: 'Free Institutional Access',
    rating: 5,
    enrolled_count: 2190,
    motifVariant: 2,
    skills: [
      'RAPID PFA Protocol',
      'Empathetic De-escalation',
      'Suicide Risk Triaging',
      'Trauma-Informed Care',
      'National Referral Linkages'
    ],
    milestone_cert: 'Certified Psychological First Aid Responder (CPFAR)',
    lead_author: {
      name: 'Prof. Vikram Mehra, MSW',
      title: 'Disaster Mental Health & Crisis Specialist',
      role: 'Lead Trauma Intervention Officer, RedKross Psychology',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    overview: 'Evidence-based crisis intervention protocols for educators, peer leaders, and frontline support personnel. Master the Johns Hopkins RAPID model (Reflective listening, Assessment of needs, Prioritization, Intervention, Disposition) to provide immediate psychological stabilization without causing secondary traumatization.',
    what_you_will_learn: [
      'Apply reflective listening to establish rapid rapport and psychological safety.',
      'Differentiate between acute situational distress and acute pathological emergency.',
      'Execute non-confrontational de-escalation with highly agitated or dysregulated individuals.',
      'Perform evidence-based suicide risk triage and initiate safety planning protocols.',
      'Seamlessly connect individuals to national helplines (Tele-MANAS, KIRAN, 112) and emergency psychiatry.'
    ],
    modules: [
      {
        id: 'mod_crisis_1',
        title: 'Module 1: Principles of Psychological First Aid',
        description: 'Understand what PFA is and what it is not. Avoid invasive debriefing; focus on pragmatic comfort, stabilization, and agency.',
        order: 1,
        lessons: [
          {
            id: 'lsn_crisis_1_1',
            title: '1.1 The RAPID PFA Framework',
            duration: '40 mins',
            xp: 140,
            summary: 'Comprehensive walkthrough of the 5-phase RAPID model for humanitarian and campus emergencies.',
            content_markdown: '# The RAPID PFA Framework\n\nPsychological First Aid provides non-invasive, compassionate support designed to mitigate acute distress and foster natural adaptive resilience.'
          }
        ]
      }
    ]
  },
  {
    id: 'crs_psych_neuro',
    division: 'psychology',
    slug: 'neuropsychology-affective-neuroscience-emotional-regulation',
    title: 'Affective Neuroscience & Neuropsychology of Emotional Regulation',
    version: '1.0',
    category: 'Neuroscience',
    difficulty: 'Advanced',
    price: 0,
    cert_price: 0,
    estimated_duration: '8 Weeks',
    estimated_hours: 32,
    effort: '4 Hours per Week',
    access: 'Free Institutional Access',
    rating: 5,
    enrolled_count: 1420,
    motifVariant: 3,
    skills: [
      'Prefrontal-Amygdala Circuits',
      'Polyvagal Theory',
      'HPA Axis Stress Mapping',
      'Neurotransmitter Dynamics',
      'Neuroplastic Adaptation'
    ],
    milestone_cert: 'RedKross Neurobehavioral Specialist (RNS)',
    lead_author: {
      name: 'Dr. Elena Rostova, MD, PhD',
      title: 'Consultant Neuropsychiatrist',
      role: 'Research Chair in Cognitive Neurobiology, RedKross Foundation',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150'
    },
    overview: 'Delve into the biological architecture governing human emotion, threat detection, and voluntary regulation. Study the anatomical wiring of the limbic system, prefrontal inhibitory control mechanisms, the gut-brain axis, and the autonomic transitions dictated by Polyvagal theory.',
    what_you_will_learn: [
      'Map top-down vs. bottom-up emotional regulation in the dorsolateral prefrontal cortex and anterior cingulate.',
      'Explain the neuroendocrine cascade of the Hypothalamic-Pituitary-Adrenal (HPA) axis under chronic stress.',
      'Analyze the dorsal vagal shutdown vs. ventral vagal social engagement system in trauma survivors.',
      'Harness sleep architecture and slow-wave REM phases for emotional memory consolidation.'
    ],
    modules: [
      {
        id: 'mod_neuro_1',
        title: 'Module 1: The Threat Circuitry & The Limbic Axis',
        description: 'Examine amygdaloid nuclei, rapid subcortical threat detection pathways, and prefrontal brake mechanisms.',
        order: 1,
        lessons: [
          {
            id: 'lsn_neuro_1_1',
            title: '1.1 The Amygdala & The High vs. Low Road of Fear',
            duration: '45 mins',
            xp: 160,
            summary: 'Explore Joseph LeDoux’s dual pathways of fear processing from the thalamus to the amygdala.',
            content_markdown: '# The Threat Circuitry & The Limbic Axis\n\nUnderstand how sensory input reaches the basolateral amygdala in less than 12 milliseconds—bypassing conscious cortical reflection.'
          }
        ]
      }
    ]
  },
  {
    id: 'crs_psych_forensic',
    division: 'psychology',
    slug: 'forensic-psychology-criminal-profiling-methodology',
    title: 'Forensic Psychology & Criminal Profiling Methodologies',
    version: '1.0',
    category: 'Forensic Science',
    difficulty: 'Advanced',
    price: 0,
    cert_price: 0,
    estimated_duration: '10 Weeks',
    estimated_hours: 40,
    effort: '4 Hours per Week',
    access: 'Free Institutional Access',
    rating: 5,
    enrolled_count: 1780,
    motifVariant: 4,
    skills: [
      'Criminal Investigative Analysis',
      'Eyewitness Memory Mechanics',
      'Competency Assessments',
      'Malingering Detection (SIRS-2)',
      'Forensic Ethics & Testimony'
    ],
    milestone_cert: 'Certified Forensic Psychological Investigator (CFPI)',
    lead_author: {
      name: 'Advocate Kabir Saxena & Dr. Meera Nambiar',
      title: 'Forensic Behavioral Science Fellows',
      role: 'Forensic Division Mentors, RedKross Academy',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
    },
    overview: 'The rigorous intersection of psychological science, behavioral evidence analysis, and the criminal justice apparatus. Learn inductive vs. deductive profiling methodologies, victimology, eyewitness reconstruction vulnerability, and the ethical presentation of forensic assessments in judicial proceedings.',
    what_you_will_learn: [
      'Differentiate between behavioral Modus Operandi (MO), ritual, and signature behaviors.',
      'Assess psychological competency to stand trial and evaluate legal criminal responsibility.',
      'Employ validated clinical psychometrics to detect malingering and fabricated psychiatric symptoms.',
      'Evaluate false memory susceptibility in police lineup and interrogation scenarios.'
    ],
    modules: [
      {
        id: 'mod_forensic_1',
        title: 'Module 1: Foundations of Behavioral Evidence Analysis',
        description: 'Explore inductive versus deductive criminal profiling, forensic science limits, and evidence contamination.',
        order: 1,
        lessons: [
          {
            id: 'lsn_forensic_1_1',
            title: '1.1 Deductive Profiling & Crime Scene Reconstruction',
            duration: '45 mins',
            xp: 150,
            summary: 'Learn objective behavioral evidence recovery without subjective speculation.',
            content_markdown: '# Behavioral Evidence Analysis\n\nDeductive profiling derives behavioral characteristics solely from physical forensic evidence, victimology, and scene topology.'
          }
        ]
      }
    ]
  },
  {
    id: 'crs_psych_adolescent',
    division: 'psychology',
    slug: 'adolescent-mental-health-academic-burnout-mitigation',
    title: 'Adolescent Mental Health, Exam Anxiety & Academic Burnout Mitigation',
    version: '1.0',
    category: 'Youth & Academic Health',
    difficulty: 'Beginner to Intermediate',
    price: 0,
    cert_price: 0,
    estimated_duration: '6 Weeks',
    estimated_hours: 24,
    effort: '4 Hours per Week',
    access: 'Free Institutional Access',
    rating: 5,
    enrolled_count: 2430,
    motifVariant: 5,
    skills: [
      'Academic Stress Screening',
      'Perfectionism Deconstruction',
      'Peer Support Networks',
      'Sleep Architecture Optimization',
      'Parent-Educator Interventions'
    ],
    milestone_cert: 'Student Mental Wellbeing Specialist (SMWS)',
    lead_author: {
      name: 'Dr. Radhika Sharma, MPhil',
      title: 'Child & Adolescent Counseling Psychologist',
      role: 'Student Wellbeing Director, RedKross Psychology',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150'
    },
    overview: 'Specialized evidence-based psychological support for high school and university students grappling with severe competitive testing stress, procrastination-induced shame spirals, executive function paralysis, and burnout. Practical frameworks for both students and educational mentors.',
    what_you_will_learn: [
      'Screen for maladaptive perfectionism vs. healthy achievement striving.',
      'Teach visceral somatic down-regulation techniques prior to timed examinations.',
      'Construct functional circadian sleep schedules to restore memory consolidation.',
      'Facilitate non-punitive peer support circles in competitive collegiate environments.'
    ],
    modules: [
      {
        id: 'mod_adol_1',
        title: 'Module 1: The Physiology of Academic Distress',
        description: 'Examine cognitive overload, threat perception of academic failure, and the paralysis-avoidance loop.',
        order: 1,
        lessons: [
          {
            id: 'lsn_adol_1_1',
            title: '1.1 The Neurobiology of Test Anxiety',
            duration: '35 mins',
            xp: 130,
            summary: 'How acute sympathetic hyper-arousal impairs working memory retrieval in the prefrontal cortex.',
            content_markdown: '# The Neurobiology of Test Anxiety\n\nWhen examination performance is perceived as an existential threat, working memory capacity collapses by up to 40%.'
          }
        ]
      }
    ]
  },
  {
    id: 'crs_psych_mindfulness',
    division: 'psychology',
    slug: 'applied-mindfulness-mbsr-somatic-regulation',
    title: 'Applied Mindfulness-Based Stress Reduction & Somatic Regulation',
    version: '1.0',
    category: 'Applied Mindfulness',
    difficulty: 'Beginner',
    price: 0,
    cert_price: 0,
    estimated_duration: '4 Weeks',
    estimated_hours: 16,
    effort: '4 Hours per Week',
    access: 'Free Institutional Access',
    rating: 5,
    enrolled_count: 3100,
    motifVariant: 6,
    skills: [
      'MBSR Protocol',
      'Vagus Nerve Stimulation',
      'Interoceptive Awareness',
      'Breathwork Biomechanics',
      'Habitual Reactivity Interrupts'
    ],
    milestone_cert: 'Applied Mindfulness Practitioner Certificate (AMPC)',
    lead_author: {
      name: 'Master Tenzin Kalsang',
      title: 'Mindfulness Researcher & Somatic Educator',
      role: 'Director of Mindful Practices, RedKross Foundation',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150'
    },
    overview: 'A clinical, demystified curriculum in Mindfulness-Based Stress Reduction (MBSR) pioneered by Dr. Jon Kabat-Zinn. Learn systematic physiological regulation, mindful awareness of body sensations, and cognitive decentering to interrupt chronic stress cascades.',
    what_you_will_learn: [
      'Master the 8-stage Body Scan protocol for interoceptive somatic awareness.',
      'Utilize resonant frequency breathing (0.1 Hz / 6 breaths per min) to maximize Heart Rate Variability (HRV).',
      'Practice cognitive defusion from recursive rumination loops.',
      'Integrate micro-mindfulness anchors into intensive technical and research workflows.'
    ],
    modules: [
      {
        id: 'mod_mbsr_1',
        title: 'Module 1: The Science of Decentering & Body Awareness',
        description: 'Explore the physiological shift from default mode network (DMN) rumination to direct sensory presence.',
        order: 1,
        lessons: [
          {
            id: 'lsn_mbsr_1_1',
            title: '1.1 The Clinical Evidence for MBSR',
            duration: '30 mins',
            xp: 120,
            summary: 'Review meta-analyses of MBSR for cortisol reduction, immune function, and cortical thickening.',
            content_markdown: '# The Clinical Evidence for MBSR\n\nDiscover how daily somatic meditation measurably lowers baseline salivary cortisol and stabilizes autonomic reactivity.'
          }
        ]
      }
    ]
  }
];
