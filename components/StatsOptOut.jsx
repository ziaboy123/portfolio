'use client';

import { useEffect, useState } from 'react';

// Umami's script skips counting while this key is in localStorage, so the
// switch only has to set or remove it. The setting is per browser.
const KEY = 'umami.disabled';

export default function StatsOptOut() {
  const [off, setOff] = useState(null); // null until the browser's setting has been read
  const [gpc, setGpc] = useState(false);

  useEffect(() => {
    try {
      setOff(localStorage.getItem(KEY) === '1');
    } catch {
      setOff(false);
    }
    setGpc(navigator.globalPrivacyControl === true);
  }, []);

  const toggle = () => {
    try {
      if (off) localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, '1');
      setOff(!off);
    } catch {
      // storage blocked (e.g. some private windows): nothing to change
    }
  };

  let status = 'Your visits are counted.';
  if (off) status = 'Your visits aren’t counted in this browser.';
  else if (gpc) status = 'Global Privacy Control is on, so your visits aren’t counted.';

  return (
    <div className="optout">
      <button type="button" role="switch" aria-checked={!!off} onClick={toggle} disabled={off === null} className="optout-switch">
        <span className="optout-track" aria-hidden="true"><i /></span>
        Don&apos;t count my visits
      </button>
      <span className="optout-status" aria-live="polite">{off === null ? '' : status}</span>
    </div>
  );
}
