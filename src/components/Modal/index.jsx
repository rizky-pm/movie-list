import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';

const Modal = ({ isOpen, closeModal, data }) => {
  const navigate = useNavigate();

  const navigateToDetail = (event, imdbID) => {
    event.preventDefault();
    navigate('/detail/' + imdbID);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-50' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all text-veryDarkBlue space-y-4 font-sans-serif'>
                  <Dialog.Title
                    as='h3'
                    className='text-2xl font-bold leading-6 text-center'
                  >
                    {data?.Title}
                  </Dialog.Title>
                  <img
                    className='w-full h-full box-shadow'
                    src={data?.Poster}
                    alt={`${data?.Title}'s poster`}
                  />

                  <div className='mt-4 flex items-center justify-between'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-prussianBlue px-4 py-2 text-sm font-medium text-aliceBlue hover:bg-prussianBlue/80 focus:outline-none transition'
                      onClick={closeModal}
                    >
                      Close
                    </button>

                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-prussianBlue px-4 py-2 text-sm font-medium text-aliceBlue hover:bg-prussianBlue/80 focus:outline-none transition'
                      onClick={(e) => {
                        navigateToDetail(e, data?.imdbID);
                      }}
                    >
                      Details
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
