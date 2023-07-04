import { getElement } from "@shared/helpers/getElement";
import { Modal } from "@shared/ui/modal";
import { GameFieldProps, IGameField } from "./types";

import './style.scss';

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
            <h1 class="level-title text-4xl font-bold text-center px-4">
                ${this.props.title}
            </h1>            
            <button id="help-button" class="bg-zinc-900 hover:bg-zinc-700 font-bold py-2 px-4 rounded-full mt-4"">
                ${this.props.buttonTitle}
            </button>
        `;

        this.gamefield.innerHTML += `<div class="game-wrapper">
        <div class="table-wrapper w-fit" style="transform: rotateX(20deg); opacity: 1;">
            <div class="table-surface"></div>
            <div class="nametags"></div>
            <div id="tooltip">Tooltip</div>
            <div class="game-table">
            </div>
        </div>
        <div class="table-edge w-full" style="opacity: 1;">
                <div class="table-leg"></div>
                <div class="table-leg"></div>
            </div>
        </div>`;

        this.gamefield.append(modal.getModal());
    }

    public getContainer(): HTMLElement {
        return this.gamefield;
    }

    public setTable(content: string, selector: string): void {
        const table = getElement<HTMLDivElement>(this.gamefield, '.game-table');

        table.innerHTML = content;

        table.querySelectorAll(selector).forEach((item) => {
            item.classList.add('strobe');
        })

        table.querySelectorAll('*').forEach((item) => {
            item.addEventListener('mouseover', (event) => {
                console.log(event.target);
            });
        })
    }

    public showModal(): void {
        getElement(this.gamefield, '.main-modal').classList.remove('hidden');
    }

    public animateRightAnswer(selector: string): void {
        const table = getElement<HTMLDivElement>(this.gamefield, '.game-table');

        table.querySelectorAll(selector).forEach((item) => {
            item.classList.add('remove-animation');
        })
    }
}