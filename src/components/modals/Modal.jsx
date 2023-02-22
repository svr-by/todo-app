import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CrossIcon } from 'components/icons';

export function Modal({ onClose, children }) {
  const portalRef = useRef(null);

  if (!portalRef.current) {
    portalRef.current = document.createElement('div');
  }

  const portal = portalRef.current;

  useEffect(() => {
    document.body.appendChild(portal);
    return () => {
      document.body.removeChild(portal);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = (e) => {
    const target = e.target;
    if (target?.classList.contains('modal-target')) {
      onClose();
    }
  };

  const modal = (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 bg-black/40 flex justify-center items-center z-10 modal-target"
      onClick={handleClose}
    >
      <div className="relative max-w-4xl m-4 p-10 bg-white rounded">
        <button className="absolute top-2 right-2" onClick={handleClose}>
          <CrossIcon className="w-4 h-4 hover:bg-slate-200 modal-target" />
        </button>
        <div>{children}</div>
      </div>
    </div>
  );

  return createPortal(modal, portal);
}
