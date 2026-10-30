import test from 'node:test';
import assert from 'node:assert/strict';
import { mockEngine } from '../src/services/db/mockEngine.js';
import { socketClient } from '../src/services/socket/socketClient.js';

test('1. Socket.io Client Fallback & Event Bus Emission', async () => {
  // Test event subscription and emission
  const testPayload = { message: 'SOC Alert', cadetId: 'RK-89421', timestamp: Date.now() };

  const received = await new Promise((resolve) => {
    const unsub = socketClient.on('test:cyber_event', (payload) => {
      unsub();
      resolve(payload);
    });
    socketClient.emit('test:cyber_event', testPayload);
  });

  assert.strictEqual(received.cadetId, 'RK-89421');
  assert.strictEqual(received.message, 'SOC Alert');
});

test('2. Two Consecutive Camera Drops Cause Exam Termination & 24h Lockout', () => {
  mockEngine.resetToSeed();
  const enrolmentId = 'enr_student_soc';
  const quizId = 'quiz_mod_1';

  // 1st Disconnect: Warning in UI (not yet terminated in DB)
  let status = mockEngine.isExamLocked(enrolmentId, quizId);
  assert.strictEqual(status.isLocked, false);

  // 2nd Disconnect: Recorded violation
  const violation = mockEngine.recordProctorViolation({
    enrolmentId,
    quizId,
    cadetId: 'RK-89421',
    studentName: 'Cadet Operator',
    violationType: 'CAMERA_DISCONNECT_X2',
    details: 'Webcam feed dropped twice during exam.'
  });

  assert.strictEqual(violation.success, true);
  status = mockEngine.isExamLocked(enrolmentId, quizId);
  assert.strictEqual(status.isLocked, true, 'Exam must be locked for 24 hours after 2nd camera drop');
});

test('3. Prerequisites Enforcement: Incomplete Lessons Block Certificate Request', () => {
  mockEngine.resetToSeed();
  const enrolmentId = 'enr_student_soc';
  const db = mockEngine.getDb();
  const enrolment = db.enrolments.find((e) => e.id === enrolmentId);

  // Ensure incomplete lessons
  enrolment.completed_mandatory_lessons = ['les_1_1']; // Only 1 lesson completed out of 7
  mockEngine.saveDb(db);

  assert.throws(
    () => {
      mockEngine.requestCertificate(enrolmentId, 'Trying to request early');
    },
    /PREREQUISITES_INCOMPLETE/,
    'Must reject certificate request when mandatory lessons remain incomplete'
  );
});

test('4. Robust Handling of Null / Undefined Identifiers in Cadet Dossier', () => {
  mockEngine.resetToSeed();
  assert.strictEqual(mockEngine.getCadetDossier(null), null);
  assert.strictEqual(mockEngine.getCadetDossier(''), null);
  assert.strictEqual(mockEngine.getCadetDossier('NON_EXISTENT_ID_99999'), null);

  const realDossier = mockEngine.getCadetDossier('usr_student_01');
  assert.ok(realDossier, 'Dossier must be returned for valid user id');
  assert.strictEqual(realDossier.cadet.id, 'usr_student_01');
  assert.ok(Array.isArray(realDossier.enrolments), 'Dossier enrolments must be an array');
});
