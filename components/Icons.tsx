
import React from 'react';

export const MicOnIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3z"></path>
    <path d="M17 11a1 1 0 0 1-2 0V5a5 5 0 0 0-10 0v6a1 1 0 0 1-2 0V5a7 7 0 0 1 14 0v6z"></path>
    <path d="M19 11a1 1 0 0 0-1 1v.541A6.002 6.002 0 0 1 12 18a6 6 0 0 1-6-6.459V12a1 1 0 0 0-2 0v.541a8 8 0 0 0 7 7.952V22a1 1 0 0 0 2 0v-1.507a8.002 8.002 0 0 0 7-7.952V12a1 1 0 0 0-1-1z"></path>
  </svg>
);

export const VideoOnIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4z"></path>
  </svg>
);

export const EndCallIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 9c-1.61 0-3.08.79-4 2.01V8.69c.89-1.39 2.37-2.38 4-2.65V4h2v2.05c3.55.5 6 3.58 6 7.15 0 1.5-.47 2.87-1.26 4.01l-1.42-1.42c.45-.74.78-1.59.78-2.59 0-2.76-2.24-5-5-5zM3.41 1.86L2 3.27l4.22 4.22C6.09 7.92 6 8.44 6 9c0 3.98 3.24 7.21 7.21 7.21.56 0 1.08-.09 1.58-.23l4.13 4.13 1.41-1.41L3.41 1.86zM13 17.91v2.04h-2v-2.09c-3.45-.44-6-3.4-6-6.82 0-.58.08-1.13.22-1.66L15.66 18.1c-.53.14-1.08.21-1.66.21z"></path>
  </svg>
);

export const RocketIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a6 6 0 016 6h-4.82m-1.17-7.38a6 6 0 01-7.38-5.84m5.84 5.84a6 6 0 01-5.84 7.38m5.84-7.38a6 6 0 017.38 5.84m-13.22 1.17a6 6 0 01-7.38-5.84m7.38 5.84v4.82m9.3-9.3l-3.41-3.41m-3.41 3.41l3.41-3.41m0 0l-3.41 3.41m3.41-3.41L12 5.63m3.59 8.74a6 6 0 01-5.84 7.38m5.84-7.38a6 6 0 017.38 5.84m0 0H12m9.3-9.3a6 6 0 01-7.38 5.84" />
  </svg>
);
