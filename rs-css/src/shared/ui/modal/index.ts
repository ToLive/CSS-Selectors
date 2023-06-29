import { getElement } from '../../helpers/getElement';
import './style.css';
import { ModalProps } from './types';

export class Modal {
    private props: ModalProps = {
        title: 'Help',
    };

    private modal: HTMLDivElement = document.createElement('div');

    constructor() {
        this.modal.innerHTML = `
        <div class="main-modal hidden fixed w-full h-100 inset-0 z-50 overflow-hidden justify-center items-center animated fadeIn faster"
            style="background: rgba(0,0,0,.7);">
            <div
                class="border border-teal-500 modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div class="modal-content py-4 text-left px-6">
                    <div class="flex justify-between items-center pb-3">
                        <p class="text-2xl font-bold">${this.props.title}</p>
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
                    <h3>No worries, you've got this!</h3>
                    <p>
                      You're about to learn CSS Selectors!
                      Selectors are how you pick which element to apply styles to.
                    </p>
            
                    <h4>Exhibit 1 - A CSS Rule</h4>
            
                    <pre>p {
               margin-bottom: 12px;
            }</pre>
            
                    <p>
                      Here, the "p" is the selector (selects all &lt;p&gt; elements) and applies the margin-bottom style.
                    </p>
                    <p>
                      To play, type in a CSS selector in the editor below to select the correct items on the table.If you get it right, you'll advance to the next level.
                    </p>
                    <p>
                      Hover over the items on the table to see their HTML markup.
                    </p>
                    <p>
                      Get help with selectors on the right! →
                    </p>
                    </div>
        
                    <div class="flex justify-end pt-2">
                        <button
                            class="bottom-button focus:outline-none px-4 bg-teal-500 p-3 ml-3 rounded-lg text-white hover:bg-teal-400">Ok, I'got it</button>
                    </div>
                </div>
            </div>
        </div>`;

        const modalElement = getElement(this.modal, '.main-modal');

        const closeModal = (): void => {
            console.log('colse click');
            modalElement.classList.remove('flex');
            modalElement.classList.add('hidden');
        };

        const closeButton = getElement(modalElement, '.modal-close');
        closeButton.addEventListener('click', closeModal)

        const bottomButton = getElement(modalElement, '.bottom-button');
        bottomButton.addEventListener('click', closeModal)
    }

    public getModal(): HTMLElement {
        return this.modal;
    };
}