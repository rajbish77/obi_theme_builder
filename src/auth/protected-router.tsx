import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRole: 'publisher' | 'editor';
}

export default function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
  const auth = useAppSelector((state) => state.logIn.auth);
  const publisher = useAppSelector((state) => state.logIn.publisher);
  const editor = useAppSelector((state) => state.logIn.editor);

  if (!auth) {
    return <Navigate to="/" />;
  }

  if (allowedRole === 'publisher' && publisher !== 'Y') {
    return <Navigate to="/publisher-dashboard" />;
  }

  if (allowedRole === 'editor' && editor !== 'Y') {
    return <Navigate to="/editor-dashboard" />;
  }

  return children;
}
