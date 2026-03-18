// src/hooks/useResponsive.ts

import { useEffect, useState } from 'react';
import { BREAKPOINTS } from '@/constants/devices';
import type { Device } from '@/types/devices';

export const useResponsive = () => {
  const [device, setDevice] = useState<Device>('desktop');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleResize = () => {
      const width = window.innerWidth;
      setDevice(width <= BREAKPOINTS.mobile ? 'mobile' : 'desktop');
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMounted ? device : 'desktop';
};
