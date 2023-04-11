import { setModal } from '@/context/modal';
import { IModal } from '@/types';

export const handleModal = (modal: IModal) => {
  setModal(modal);
};
