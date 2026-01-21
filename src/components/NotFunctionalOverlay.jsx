import React from 'react';
import { Alert } from '@material-tailwind/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export function NotFunctionalOverlay({ pageName = 'This page' }) {
  return (
    <Alert
      icon={<ExclamationTriangleIcon className="h-6 w-6" />}
      className="mb-4 bg-yellow-50 border border-yellow-200"
      color="yellow"
    >
      <span className="font-semibold text-yellow-800">
        ⚠️ {pageName} is not functional in this demo version.
      </span>
      <p className="text-sm text-yellow-700 mt-1">
        This is a frontend-only demo. Backend operations are not available.
      </p>
    </Alert>
  );
}
