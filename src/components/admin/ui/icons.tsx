type IconProps = { className?: string };

const base = 'h-5 w-5';

export const HomeIcon = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 11.5 12 4l9 7.5M5.5 10v9a1 1 0 0 0 1 1H10v-5.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1V20h3.5a1 1 0 0 0 1-1v-9" />
  </svg>
);

export const BedIcon = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 19v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M3 19v1.5M3 19h18M21 19v1.5M6.5 10V7a1.5 1.5 0 0 1 1.5-1.5h8A1.5 1.5 0 0 1 17.5 7v3" />
  </svg>
);

export const ChartIcon = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 19V10M10 19V5M16 19v-6M4 19h16" />
  </svg>
);

export const UsersIcon = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2.5 20c0-3 2.7-5.2 6-5.2s6 2.2 6 5.2M17 11a2.6 2.6 0 1 0 0-5.2M21.5 20c0-2.5-2-4.4-4.8-5" />
  </svg>
);

export const SettingsIcon = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 13.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V20a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H4a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1A2 2 0 1 1 8.3 4.2l.1.1a1.7 1.7 0 0 0 1.9.3H10.5a1.7 1.7 0 0 0 1-1.6V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.6h.1a1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0-.3 1.9V9.6a1.7 1.7 0 0 0 1.6 1H20a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.6 1Z" />
  </svg>
);

export const BellIcon = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9a6 6 0 1 0-12 0c0 4.5-1.5 6-1.5 6h15S18 13.5 18 9Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19a2 2 0 0 0 4 0" />
  </svg>
);

export const ClockIcon = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="12" cy="12" r="8.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5V12l3 2" />
  </svg>
);

export const CheckIcon = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="12" cy="12" r="8.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.5 12.3 2.4 2.4 4.6-5" />
  </svg>
);

export const PulseIcon = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="12" cy="12" r="8.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 12h2l1.5-3.5L13 15.5 14.5 12H17" />
  </svg>
);

export const ExportIcon = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v11m0 0 3.5-3.5M12 15l-3.5-3.5M5 17v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2" />
  </svg>
);

export const LogoutIcon = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 4H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h9M10 12h10m0 0-3-3m3 3-3 3" />
  </svg>
);
