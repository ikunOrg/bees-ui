import React from 'preact/compat';

const BrowserFrame: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="browser-mockup with-url">{children}</div>
);

export default BrowserFrame;
