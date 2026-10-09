const PATHS = {
  browser: (
    <>
      <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
      <path d="M2.5 8.5h19M6 6.3h.01M8.5 6.3h.01" />
      <path d="m9 13-2 2 2 2M15 13l2 2-2 2" />
    </>
  ),
  bolt: (
    <>
      <path d="M13 2.5 5 13.5h6l-1 8 8-11h-6Z" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3c.6 4.3 2.7 6.4 7 7-4.3.6-6.4 2.7-7 7-.6-4.3-2.7-6.4-7-7 4.3-.6 6.4-2.7 7-7Z" />
      <path d="M19 15.5c.2 1.4.9 2.1 2.3 2.3-1.4.2-2.1.9-2.3 2.3-.2-1.4-.9-2.1-2.3-2.3 1.4-.2 2.1-.9 2.3-2.3Z" />
    </>
  ),
  chip: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
      <path d="M9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5" />
    </>
  ),
  server: (
    <>
      <rect x="3.5" y="3.5" width="17" height="7" rx="2" />
      <rect x="3.5" y="13.5" width="17" height="7" rx="2" />
      <path d="M7.5 7h.01M7.5 17h.01M11.5 7h5M11.5 17h5" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
      <circle cx="12" cy="15.5" r="1.2" fill="currentColor" />
    </>
  ),
  watch: (
    <>
      <circle cx="12" cy="12" r="5.5" />
      <path d="M12 9.5V12l1.6 1.2" />
      <path d="M9 6.8 9.6 3h4.8l.6 3.8M9 17.2l.6 3.8h4.8l.6-3.8" />
    </>
  ),
  crown: (
    <>
      <path d="m3.5 8 4.2 3.6L12 5l4.3 6.6L20.5 8l-1.8 9H5.3Z" />
      <path d="M5.5 20.5h13" />
    </>
  ),
  cards: (
    <>
      <rect x="8" y="3.5" width="11" height="15" rx="2" />
      <path d="M6 6.5 5 6.8a2 2 0 0 0-1.4 2.4l2.6 9.7a2 2 0 0 0 2.4 1.4l5.4-1.4" />
    </>
  ),
  screen: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M7 8h4v5H7zM14 8h3M14 11h3" />
      <path d="M12 17v3M8 20h8" />
    </>
  ),
  radar: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <path d="M12 12 18.5 5.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </>
  ),
  phone: (
    <>
      <rect x="6" y="2.5" width="12" height="19" rx="3" />
      <path d="M9 7h2.5v2.5H9zM12.5 7H15v2.5h-2.5zM9 10.5h2.5V13H9zM12.5 10.5H15V13h-2.5z" />
      <path d="M10.5 18.5h3" />
    </>
  ),
  chat: (
    <>
      <path d="M4 5h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
      <path d="M19 9h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1v2.5L16 18h-3" />
    </>
  ),
  cube: (
    <>
      <path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7Z" />
      <path d="M3.5 7 12 11.5 20.5 7M12 11.5v10" />
    </>
  ),
  signal: (
    <>
      <path d="M12 13v8" />
      <circle cx="12" cy="11" r="2" />
      <path d="M8 7.5a5.5 5.5 0 0 0 0 7M16 7.5a5.5 5.5 0 0 1 0 7M5 4.5a9.5 9.5 0 0 0 0 13M19 4.5a9.5 9.5 0 0 1 0 13" />
    </>
  ),
};

export default function ProjectIcon({ name, size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {PATHS[name]}
    </svg>
  );
}
