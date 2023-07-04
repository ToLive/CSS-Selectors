import { getElement } from '../../helpers/getElement';
import './style.scss';

export class Modal {
    private modal: HTMLDivElement = document.createElement('div');

    constructor() {
        this.modal.className = 'main-modal hidden w-full h-100 inset-0 z-50 flex overflow-hidden justify-center items-center animated fadeIn faster absolute z-[300]';
        this.modal.innerHTML = `
        <div class="border border-teal-500 modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div class="modal-content py-4 text-left px-6">
                <div class="flex justify-between items-center pb-3">
                    <p class="text-2xl font-bold">Congrats!</p>
                    <div class="modal-close cursor-pointer z-50">
                        <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                            viewBox="0 0 18 18">
                            <path
                                d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z">
                            </path>
                        </svg>
                    </div>
                </div>        
                <div class="my-5">                        
                    <p class="my-2">
                        You did it and solved all selector tasks!
                    </p>
                    <p class="my-2">  
                        May the force be with you!
                    </p>            
                    <p class="my-2">  
                        You can reset progress to start over.
                    </p>            
                </div>
    
                <div class="flex justify-center pt-2">
                    <button
                        class="bottom-button focus:outline-none px-4 bg-teal-500 p-3 ml-3 rounded-lg text-white hover:bg-teal-400">Ok, I'got it</button>
                </div>
            </div>    
        </div>`;

        //const modalElement = getElement(this.modal, '.main-modal');

        const closeModal = (): void => {
            this.modal.classList.remove('flex');
            this.modal.classList.add('hidden');
        };

        const closeButton = getElement(this.modal, '.modal-close');
        closeButton.addEventListener('click', closeModal)

        const bottomButton = getElement(this.modal, '.bottom-button');
        bottomButton.addEventListener('click', closeModal)
    }

    public getModal(): HTMLElement {
        return this.modal;
    };
}