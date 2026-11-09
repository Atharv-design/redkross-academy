import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * AdminRoute Guard - Admin access disabled per user mandate.
 * All traffic is strictly redirected to Foundation Home / Student view.
 */
export default function AdminRoute({ children }) {
  return <Navigate to="/" replace />;
}
