import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const withAdminAuth = (WrappedComponent: React.ComponentType) => {
  const WithAdminAuth = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');

      if (!token) {
        router.push('/login');
      }
    }, [router]);

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
