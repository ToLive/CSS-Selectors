import { getElement } from "@shared/helpers/getElement";
import { GameFieldProps, IGameField } from "./types";
import { Modal } from "../../shared/ui/modal";

export class Gamefield implements IGameField {
    private gamefield: HTMLElement = document.createElement('div');;

    private props: GameFieldProps = {
        title: 'Select the bento boxes',
        className: ['flex', 'flex-col', 'justify-center', 'items-center'],
        buttonTitle: "Help, I'm stuck!",
        buttonHandler: (event): void => {
            console.log(event);

            const modal = getElement(this.gamefield, '.main-modal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }
    };

    constructor() {
        this.gamefield.className = this.props.className.join(' ');
        const modal = new Modal();

        this.gamefield.innerHTML = `
            <h1 class="text-5xl text-gray-400 font-bold text-center">
                ${this.props.title}
            </h1>            
            <button id="help-button" class="bg-zinc-900 hover:bg-zinc-700 text-gray-400 font-bold py-2 px-4 rounded-full mt-4"">
                ${this.props.buttonTitle}
            </button>
        `;

        this.gamefield.append(modal.getModal());

        const helpButton: HTMLElement = getElement(this.gamefield, '#help-button');
        helpButton.addEventListener('click', this.props.buttonHandler);
    }

    public getContainer(): HTMLElement {
        return this.gamefield;
    }
}