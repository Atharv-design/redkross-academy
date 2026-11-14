import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { mockEngine } from '../../services/db/mockEngine';

/**
 * All assessments run inside the lesson player, graded by /api/assessment.
 * The old standalone quiz and final-exam pages graded answers in the browser;
 * their URLs now redirect to the matching unit in the lesson player.
 */
export function QuizRedirect() {
  const { enrolmentId, quizId } = useParams();
  return <Navigate to={`/student/learn/${encodeURIComponent(enrolmentId)}?unitId=${encodeURIComponent(quizId)}`} replace />;
}

export function FinalExamRedirect() {
  const { enrolmentId } = useParams();
  const enrolment = mockEngine.getEnrolment(enrolmentId);
  const course = enrolment ? mockEngine.getCourseById(enrolment.course_id) : null;
  const finalId = course?.final_assessment?.id;
  const target = finalId
    ? `/student/learn/${encodeURIComponent(enrolmentId)}?unitId=${encodeURIComponent(finalId)}`
    : `/student/learn/${encodeURIComponent(enrolmentId)}`;
  return <Navigate to={target} replace />;
}

export default QuizRedirect;
