
import React from 'react';
import { Slide } from '../types';

interface SlideCanvasProps {
  slide: Slide;
  isActive: boolean;
}

export const SlideCanvas: React.FC<SlideCanvasProps> = ({ slide, isActive }) => {
  const cssVars = {
    '--bg-color': slide.backgroundColor,
    '--primary-color': slide.primaryColor,
    '--secondary-color': slide.secondaryColor,
    '--text-color': slide.textColor,
  } as React.CSSProperties;

  return (
    <div
      className={`poster-root ${isActive ? 'active' : 'inactive'}`}
      style={{
        ...cssVars,
        backgroundColor: slide.backgroundColor,
        backgroundImage: slide.backgroundImage ? `url(${slide.backgroundImage})` : 'none',
      }}
    >
      {/* Decorative Overlays */}
      <div className="poster-gradient-overlay" style={{ backgroundImage: `linear-gradient(to top, ${slide.backgroundColor}, ${slide.backgroundColor}66, transparent)` }}></div>

      {/* Grid Pattern */}
      <div className="poster-grid-overlay" style={{ backgroundImage: `radial-gradient(${slide.primaryColor} 0.8px, transparent 0.8px)` }}></div>

      {/* Glow Elements */}
      <div className="poster-glow-accent"></div>

      {/* Content Container */}
      <div className="poster-content">
        {slide.elements.map((el) => {
          if (el.type === 'logo') {
            return (
              <div key={el.id} className="poster-logo-container">
                <div className="flex items-center gap-3">
                  {el.content ? (
                    <img src={el.content} alt="Logo" className="poster-logo-image" />
                  ) : (
                    <div className="poster-logo-placeholder">
                      <span className="poster-logo-text">TS</span>
                    </div>
                  )}
                  {!el.content && <span className="poster-brand-label">Tech Studio</span>}
                </div>
                <div className="poster-divider"></div>
              </div>
            );
          }
          if (el.type === 'title') {
            return (
              <h1 key={el.id} className="poster-title">
                {el.content}
              </h1>
            );
          }
          if (el.type === 'subtitle') {
            return (
              <h2 key={el.id} className="poster-subtitle">
                {el.content}
              </h2>
            );
          }
          if (el.type === 'body') {
            return (
              <div key={el.id} className="poster-body-container">
                <div className="poster-accent-bar"></div>
                <p className="poster-body">
                  {el.content}
                </p>
              </div>
            );
          }
          if (el.type === 'button') {
            return (
              <div key={el.id} className="poster-button-section">
                <button className="poster-button">
                  {el.content}
                </button>
                <div className="poster-pagination">
                  <div className="poster-pagination-dot"></div>
                  <div className="poster-pagination-dot"></div>
                  <div className="poster-pagination-dot active"></div>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="poster-scan-line" style={{ backgroundColor: `${slide.primaryColor}33` }}></div>
    </div>
  );
};
