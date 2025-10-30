'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';
import type { ModeType } from '@/components/ui/gluestack-ui-provider';

type AccentOption = {
  id: string;
  name: string;
  value: string;
  gradient: string;
  glow: string;
};

type AccentContextValue = {
  mode: ModeType;
  setMode: (mode: ModeType) => void;
  accent: AccentOption;
  setAccent: (accent: AccentOption) => void;
  accents: AccentOption[];
};

const accents: AccentOption[] = [
  {
    id: 'aurora',
    name: 'Aurora Azzurra',
    value: '#3EC5FF',
    gradient: 'linear-gradient(135deg, rgba(36,189,255,0.85) 0%, rgba(89,223,255,0.55) 50%, rgba(255,255,255,0.4) 100%)',
    glow: 'rgba(62,197,255,0.45)',
  },
  {
    id: 'sunset',
    name: 'Tramonto Ramato',
    value: '#FF8E54',
    gradient: 'linear-gradient(135deg, rgba(255,142,84,0.85) 0%, rgba(255,187,120,0.55) 45%, rgba(255,255,255,0.35) 100%)',
    glow: 'rgba(255,142,84,0.45)',
  },
  {
    id: 'lagoon',
    name: 'Laguna Turchese',
    value: '#4ADE80',
    gradient: 'linear-gradient(135deg, rgba(74,222,128,0.85) 0%, rgba(125,255,209,0.55) 50%, rgba(255,255,255,0.35) 100%)',
    glow: 'rgba(74,222,128,0.4)',
  },
  {
    id: 'plum',
    name: 'Prugna Galattica',
    value: '#C084FC',
    gradient: 'linear-gradient(135deg, rgba(192,132,252,0.85) 0%, rgba(223,196,255,0.55) 55%, rgba(255,255,255,0.35) 100%)',
    glow: 'rgba(192,132,252,0.4)',
  },
  {
    id: 'ember',
    name: 'Brace Dorata',
    value: '#FACC15',
    gradient: 'linear-gradient(135deg, rgba(250,204,21,0.8) 0%, rgba(255,237,74,0.55) 55%, rgba(255,255,255,0.35) 100%)',
    glow: 'rgba(250,204,21,0.4)',
  },
];

const AccentContext = createContext<AccentContextValue | undefined>(undefined);

export const AccentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mode, setMode] = useState<ModeType>('light');
  const [accent, setAccent] = useState<AccentOption>(accents[0]);

  const value = useMemo(
    () => ({ mode, setMode, accent, setAccent, accents }),
    [mode, accent]
  );

  return <AccentContext.Provider value={value}>{children}</AccentContext.Provider>;
};

export const useAccent = () => {
  const context = useContext(AccentContext);
  if (!context) {
    throw new Error('useAccent deve essere utilizzato all\'interno di AccentProvider');
  }
  return context;
};

export type { AccentOption };
