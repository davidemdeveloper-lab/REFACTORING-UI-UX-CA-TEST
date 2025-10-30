'use client';

import React, { useState } from 'react';
import { StyleRegistry, createStyleRegistry } from 'styled-jsx';
import { useServerInsertedHTML } from 'next/navigation';

export default function StyledJsxRegistry({ children }: { children: React.ReactNode }) {
  const [registry] = useState(() => createStyleRegistry());

  useServerInsertedHTML(() => {
    const styles = registry.styles();
    registry.flush();
    return <>{styles}</>;
  });

  return <StyleRegistry registry={registry}>{children}</StyleRegistry>;
}
