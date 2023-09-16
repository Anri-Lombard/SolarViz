import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

/**
 * withAdminAuth is a higher-order component (HOC) that adds authentication checks.
 *
 * @param {React.ComponentType} WrappedComponent    The component to be wrapped with authentication checks.
 * @returns {React.ComponentType}                   The HOC-wrapped component.
 */

const withAdminAuth = (WrappedComponent: React.ComponentType) => {
  const WithAdminAuth = (props: any) => {
    const router = useRouter();

    useEffect(() => {

      // Check for a token in localStorage
      const token = localStorage.getItem('token');

      // If no token is found, redirect to the login page
      if (!token) {
        router.push('/login');
      }
    }, [router]);

    // Render the wrapped component with props
    return <WrappedComponent {...props} />;
  };

  // Setting displayName for debugging and React DevTools
  WithAdminAuth.displayName = `WithAdminAuth(${getDisplayName(WrappedComponent)})`;

  return WithAdminAuth;
};

// Helper function to get the display name of a component
function getDisplayName(WrappedComponent: React.ComponentType) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withAdminAuth;
