import { useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { getLoggedOutState, blockHistoryAfterLogout, checkProtectedAccess } from '@/utils/globalSecurity';

export function SecurityHandler() {
  const { user, validateSession, wasLoggedOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const hasNavigated = useRef(false);

  useEffect(() => {
    // Only redirect once on logout
    if ((wasLoggedOut || getLoggedOutState()) && !hasNavigated.current) {
      hasNavigated.current = true;
      navigate('/', { replace: true });
    }
  }, [wasLoggedOut]); // Only depend on wasLoggedOut to prevent infinite loop

  // Add security headers to prevent caching
  useEffect(() => {
    // Set meta tags to prevent caching
    const metaTags = [
      { name: 'Cache-Control', content: 'no-cache, no-store, must-revalidate' },
      { name: 'Pragma', content: 'no-cache' },
      { name: 'Expires', content: '0' }
    ];

    metaTags.forEach(tag => {
      let meta = document.querySelector(`meta[name="${tag.name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = tag.name;
        document.head.appendChild(meta);
      }
      meta.content = tag.content;
    });

    // Prevent right-click context menu on sensitive pages
    const handleContextMenu = (e) => {
      if (location.pathname.includes('/dashboard')) {
        e.preventDefault();
      }
    };

    // Prevent F12, Ctrl+Shift+I, etc.
    const handleKeyDown = (e) => {
      if (location.pathname.includes('/dashboard')) {
        // Allow F5 for refresh
        if (e.key === 'F5') return;
        
        // Block common dev tools shortcuts
        if (
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && e.key === 'I') ||
          (e.ctrlKey && e.shiftKey && e.key === 'C') ||
          (e.ctrlKey && e.shiftKey && e.key === 'J') ||
          (e.ctrlKey && e.key === 'U')
        ) {
          e.preventDefault();
        }
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [location.pathname]);

  return null; // This component doesn't render anything
}

export default SecurityHandler;
