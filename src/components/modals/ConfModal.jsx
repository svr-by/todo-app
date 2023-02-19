import { Modal } from './Modal';
import { Button } from '../index';

export function ConfModal({ isOpen, handleConfirm, handleReject, message }) {
  return (
    isOpen && (
      <Modal onClose={handleReject}>
        <h2 className="mb-6 text-xl text-center">{message}</h2>
        <div className="flex justify-center gap-4">
          <Button onClick={handleConfirm}>Yes</Button>
          <Button onClick={handleReject}>No</Button>
        </div>
      </Modal>
    )
  );
}
