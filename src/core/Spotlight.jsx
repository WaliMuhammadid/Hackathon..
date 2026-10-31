import React, { useEffect, useState, useRef } from 'react';

export default function Spotlight({
  containerRef,
  target,
  warn = false,
  shake = false,
}) {
  const [rect, setRect] = useState(null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (!target || !containerRef.current) {
      setRect(null);
      return;
    }

    const updateRect = () => {
      const container = containerRef.current;
      if (!container) return;

      const element = container.querySelector(`[data-coach="${target}"]`);
      if (element) {
        const cRect = container.getBoundingClientRect();
        const eRect = element.getBoundingClientRect();
        const scale = container.offsetWidth > 0 ? (cRect.width / container.offsetWidth) : 1;

        setRect({
          top: (eRect.top - cRect.top) / scale,
          left: (eRect.left - cRect.left) / scale,
          width: eRect.width / scale,
          height: eRect.height / scale,
        });
      } else {
        setRect(null);
      }
    };

    updateRect();

    // Listen for resize and scrolls
    window.addEventListener('resize', updateRect);
    const containerEl = containerRef.current;
    if (containerEl) {
      containerEl.addEventListener('scroll', updateRect, true);
    }

    // MutationObserver to watch DOM additions / removals
    const observer = new MutationObserver(() => {
      updateRect();
    });

    if (containerEl) {
      observer.observe(containerEl, {
        childList: true,
        subtree: true,
        attributes: true,
      });
    }
    observerRef.current = observer;

    return () => {
      window.removeEventListener('resize', updateRect);
      if (containerEl) {
        containerEl.removeEventListener('scroll', updateRect, true);
      }
      observer.disconnect();
    };
  }, [target, containerRef]);

  if (!rect) return null;

  const pad = 6;
  const cutTop = Math.max(0, rect.top - pad);
  const cutLeft = Math.max(0, rect.left - pad);
  const cutWidth = rect.width + pad * 2;
  const cutHeight = rect.height + pad * 2;

  return (
    <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
      {/* SVG Mask overlay to dim everything except the target cut-out */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <mask id="spotlight-mask">
            {/* White covers all (opaque dimmed) */}
            <rect width="100%" height="100%" fill="white" />
            {/* Black cut-out makes hole transparent */}
            <rect
              x={cutLeft}
              y={cutTop}
              width={cutWidth}
              height={cutHeight}
              rx="14"
              fill="black"
            />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="rgba(2, 6, 23, 0.65)"
          mask="url(#spotlight-mask)"
        />
      </svg>

      {/* Glowing Pulsing Ring Around Hole */}
      <div
        className={`absolute rounded-2xl pointer-events-none transition-all duration-200 ${
          shake ? 'animate-shake' : ''
        } ${
          warn
            ? 'ring-4 ring-red-500 shadow-[0_0_25px_rgba(239,68,68,0.85)]'
            : 'ring-4 ring-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.85)]'
        }`}
        style={{
          top: `${cutTop}px`,
          left: `${cutLeft}px`,
          width: `${cutWidth}px`,
          height: `${cutHeight}px`,
        }}
      >
        {/* Animated Hand / Pointer icon */}
        <div className="absolute -top-11 -right-4 animate-bounce text-3xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] select-none pointer-events-none">
          👉
        </div>
      </div>
    </div>
  );
}
