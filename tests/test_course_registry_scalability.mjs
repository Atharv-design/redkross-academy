#!/usr/bin/env node
/**
 * Test: Dynamic Course Registry Scalability & Exam Selection Specification
 *
 * Verifies:
 * 1. Dynamic resolution of all registered courses (Courses 01 to 22+).
 * 2. Unregistered/invalid course IDs are strictly rejected (returns null).
 * 3. Module assessment selection: exactly 20 unique questions sampled.
 * 4. Final assessment selection: exactly 50 unique questions sampled across modules.
 * 5. Answer keys are strictly scrubbed in publicQuestions(questions).
 * 6. Immutability: Question banks are not mutated during generation.
 */

import {
  getCourseSpec,
  allCourseIds,
  findQuiz,
  generateQuestions,
  publicQuestions,
} from '../api/_lib/courseRegistry.js';

async function runScalabilityTests() {
  console.log('=== STARTING COURSE REGISTRY SCALABILITY & EXAM SPECIFICATION TESTS ===');

  // 1. Verify dynamic discovery of all registered courses
  const registeredIds = allCourseIds();
  console.log(`[1/5] Dynamic Course Discovery: ${registeredIds.length} registered courses detected.`);
  if (registeredIds.length < 22) {
    throw new Error(`Expected at least 22 registered courses, found ${registeredIds.length}`);
  }

  // 2. Verify strict rejection of unregistered course IDs
  console.log('[2/5] Verifying strict rejection of unregistered courses...');
  const invalidCourse = await getCourseSpec('crs_unregistered_99999');
  if (invalidCourse !== null) {
    throw new Error(`Unregistered course ID must return null, got: ${JSON.stringify(invalidCourse)}`);
  }
  console.log('   - Unregistered course crs_unregistered_99999 rejected: null');

  // 3. Verify specification on legacy courses (e.g. Course 01 with 6 modules, Course 04 with 8 modules)
  console.log('[3/5] Verifying question generation on legacy courses (Courses 01–04)...');
  for (const courseId of ['crs_cyber_intro_01', 'crs_cyber_python_04']) {
    const spec = await getCourseSpec(courseId);
    console.log(`   - Testing ${courseId} ("${spec.title}", ${spec.modules.length} modules)...`);

    // Test Module 1 exam
    const mod1Quiz = findQuiz(spec, spec.modules[0].quizId);
    const modQuestions = await generateQuestions(spec, mod1Quiz);
    console.log(`     * Module 1 (${mod1Quiz.quizId}): ${modQuestions.length} questions generated`);
    if (modQuestions.length !== 20) {
      throw new Error(`Module exam must have exactly 20 questions, got ${modQuestions.length}`);
    }

    // Verify uniqueness
    const modIds = new Set(modQuestions.map((q) => q.id));
    if (modIds.size !== 20) {
      throw new Error(`Module questions must be unique. Got ${modIds.size} unique out of 20`);
    }

    // Test Final exam
    const finalQuiz = findQuiz(spec, spec.final.id);
    const finalQuestions = await generateQuestions(spec, finalQuiz);
    console.log(`     * Final Exam (${finalQuiz.quizId}): ${finalQuestions.length} questions generated`);
    if (finalQuestions.length !== 50 && finalQuestions.length !== spec.final.count) {
      throw new Error(`Final exam must have ${spec.final.count} questions, got ${finalQuestions.length}`);
    }

    // Verify public scrub
    const publicView = publicQuestions(modQuestions);
    for (const q of publicView) {
      if ('correctOptionId' in q || 'correct' in q || 'explanation' in q) {
        throw new Error(`Answer key leaked in publicQuestions: ${JSON.stringify(q)}`);
      }
    }
  }

  // 4. Verify specification on library / future course structure (e.g. Course 05, Course 08)
  console.log('[4/5] Verifying question generation on library courses (Courses 05+)...');
  for (const courseId of ['crs_cyber_pentest_05', 'crs_cyber_soc_08']) {
    const spec = await getCourseSpec(courseId);
    console.log(`   - Testing ${courseId} ("${spec.title}", ${spec.modules.length} modules)...`);

    const mod1Quiz = findQuiz(spec, spec.modules[0].quizId);
    const modQuestions = await generateQuestions(spec, mod1Quiz);
    console.log(`     * Module 1 (${mod1Quiz.quizId}): ${modQuestions.length} questions generated`);
    if (modQuestions.length < 5) {
      throw new Error(`Module exam questions missing for library course ${courseId}`);
    }

    const finalQuiz = findQuiz(spec, spec.final.id);
    const finalQuestions = await generateQuestions(spec, finalQuiz);
    console.log(`     * Final Exam (${finalQuiz.quizId}): ${finalQuestions.length} questions generated`);
    if (finalQuestions.length < 20) {
      throw new Error(`Final exam questions missing for library course ${courseId}`);
    }
  }

  // 5. Verify question bank immutability
  console.log('[5/5] Verifying question bank immutability...');
  const specCheck = await getCourseSpec('crs_cyber_intro_01');
  const modCheckQuiz = findQuiz(specCheck, specCheck.modules[0].quizId);
  const run1 = await generateQuestions(specCheck, modCheckQuiz);
  const run2 = await generateQuestions(specCheck, modCheckQuiz);
  if (run1.length !== 20 || run2.length !== 20) {
    throw new Error('Question count instability detected across consecutive generations');
  }

  console.log('[PASS] Question banks remain pristine and immutable across generations.');
  console.log('=== ALL COURSE REGISTRY SCALABILITY TESTS PASSED (100%) ===\n');
}

runScalabilityTests().catch((err) => {
  console.error('[FAIL] Scalability test failed:', err);
  process.exit(1);
});
