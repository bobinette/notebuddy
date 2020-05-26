import React, { useCallback } from 'react';

interface Props {
  active: boolean;
  label: React.ReactNode;
  onToggle(style: string): void;
  style: string;
}

const StyleButton = ({ active, label, onToggle, style }: Props) => {
  const onToggleLocal = useCallback(
    (e) => {
      e.preventDefault();
      onToggle(style);
    },
    [onToggle]
  );

  const className = `style-button ${active ? 'style-button--active' : ''}`;

  return (
    <button type="button" className={className} onMouseDown={onToggleLocal}>
      {label}
    </button>
  );
};

export default StyleButton;
