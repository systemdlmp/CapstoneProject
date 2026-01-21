/**
 * Frontend-Only Limitations Utility
 * Shows alerts when users try to use features that don't work in this demo
 */

export const showFrontendOnlyAlert = (featureName) => {
  const message = `⚠️ ${featureName} is not available in this frontend-only demo version.\n\nThis feature requires a backend server and database connection.`;
  alert(message);
};

export const showFrontendOnlyToast = (featureName) => {
  // For components that use toast notifications
  return {
    success: false,
    message: `⚠️ ${featureName} is not available in this frontend-only demo.`
  };
};

/**
 * Wrap functions that don't work in frontend-only mode
 */
export const wrapNonFunctional = (functionName) => {
  return async (...args) => {
    showFrontendOnlyAlert(functionName);
    return { success: false };
  };
};

/**
 * Common features that don't work
 */
export const DISABLED_FEATURES = {
  CREATE_RECORD: 'Create Record',
  UPDATE_RECORD: 'Update Record',
  DELETE_RECORD: 'Delete Record',
  IMPORT_DATA: 'Import Data',
  EXPORT_DATA: 'Export Data',
  SEND_EMAIL: 'Send Email',
  PROCESS_PAYMENT: 'Process Payment',
  CREATE_PAYMENT_PLAN: 'Create Payment Plan',
  GENERATE_REPORT: 'Generate Report',
  SYNC_DATA: 'Sync Data',
  BACKUP_DATA: 'Backup Data'
};
