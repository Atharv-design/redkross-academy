import test from 'node:test';
import assert from 'node:assert/strict';
import { mockEngine } from '../src/services/db/mockEngine.js';
import { socketClient } from '../src/services/socket/socketClient.js';

test('=== Real-Time Live Feed & Telemetry Synchronization Test Suite ===', async (t) => {
  mockEngine.resetToSeed();

  await t.test('1. Multi-Tab BroadcastChannel & SocketClient Event Bus Distribution', async () => {
    const eventPayload = {
      type: 'TELEMETRY_PING',
      cadetId: 'RK-89421',
      severity: 'CRITICAL',
      timestamp: Date.now()
    };

    const received = await new Promise((resolve) => {
      const unsub = socketClient.on('telemetry:broadcast', (payload) => {
        unsub();
        resolve(payload);
      });
      socketClient.emit('telemetry:broadcast', eventPayload);
    });

    assert.strictEqual(received.cadetId, 'RK-89421');
    assert.strictEqual(received.severity, 'CRITICAL');
  });

  await t.test('2. Live Token Mutation Broadcast to Student Portal Wallet', async () => {
    const received = await new Promise((resolve) => {
      const unsub = mockEngine.subscribe((event) => {
        if (event.type === 'TOKEN_MUTATED') {
          unsub();
          resolve(event.payload);
        }
      });
      mockEngine.grantTokens('usr_student_01', 50, 'SOC Challenge Passed');
    });

    assert.strictEqual(received.userId, 'usr_student_01');
    assert.ok(received.newBalance > 0);
  });

  await t.test('3. Real-Time PDF Assignment Submission Alert to Admin Queue', async () => {
    const received = await new Promise((resolve) => {
      const unsub = mockEngine.subscribe((event) => {
        if (event.type === 'ASSIGNMENT_SUBMITTED') {
          unsub();
          resolve(event.payload);
        }
      });

      mockEngine.submitAssignment({
        cadetId: 'RK-89421',
        userId: 'usr_student_01',
        enrolmentId: 'enr_student_soc',
        courseId: 'crs_soc_101',
        moduleId: 'mod_1',
        assignmentId: 'asg_realtime_01',
        assignmentTitle: 'Real-Time Telemetry Lab',
        fileName: 'live_telemetry_submission.pdf',
        fileDataUrl: 'data:application/pdf;base64,JVBERi0xLjQK...'
      });
    });

    assert.strictEqual(received.cadet_id, 'RK-89421');
    assert.strictEqual(received.status, 'under_assessment');
  });

  await t.test('4. Real-Time Certificate Revocation Broadcast to Public Verification', async () => {
    // Dispatch cert first
    const cert = mockEngine.dispatchCertificate({
      enrolmentId: 'enr_student_soc',
      studentName: 'Cadet Operator',
      studentEmail: 'student@redkross.org.in',
      cadetId: 'RK-89421',
      courseId: 'crs_soc_101'
    });

    const received = await new Promise((resolve) => {
      const unsub = mockEngine.subscribe((event) => {
        if (event.type === 'CERTIFICATE_REVOKED') {
          unsub();
          resolve(event.payload);
        }
      });

      mockEngine.revokeCertificate(cert.id, 'Real-time telemetry integrity revocation');
    });

    assert.strictEqual(received.credentialId, cert.id);
    assert.strictEqual(received.revoked, true);
  });

  await t.test('5. Real-Time Proctor Violation Alert & 24h Lockout Broadcast', async () => {
    const received = await new Promise((resolve) => {
      const unsub = mockEngine.subscribe((event) => {
        if (event.type === 'EXAM_VIOLATION') {
          unsub();
          resolve(event.payload);
        }
      });

      mockEngine.recordProctorViolation({
        enrolmentId: 'enr_student_soc',
        quizId: 'quiz_mod_1',
        cadetId: 'RK-89421',
        studentName: 'Cadet Operator',
        violationType: 'CAMERA_OFFLINE',
        details: 'Video stream disconnected.'
      });
    });

    assert.strictEqual(received.enrolment_id, 'enr_student_soc');
    assert.strictEqual(received.violation_type, 'CAMERA_OFFLINE');
  });
});
