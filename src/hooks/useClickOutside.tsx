import { useEffect } from 'react';

interface ClickOutsideProps {
  ref: React.MutableRefObject<HTMLElement | null>;
  callback: () => void;
}

const useClickOutside = ({ ref, callback }: ClickOutsideProps) => {
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current?.contains(event.target as Node) && ref.current?.ariaHidden !== 'true') {
      callback();
    }
  };

  const handleEscape = (e: KeyboardEvent) => {
    if (ref.current?.ariaHidden !== 'true' && e.key === 'Escape') {
      callback();
    }
  };

  useEffect(() => {
    document.body.addEventListener('mousedown', handleClickOutside);
    return () => document.body.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.addEventListener('keydown', handleEscape);
    return () => document.body.removeEventListener('keydown', handleEscape);
  }, []);
};

export default useClickOutside;
