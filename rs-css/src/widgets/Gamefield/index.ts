import { getElement } from "@shared/helpers";
import { Modal } from "@shared/ui/modal";
import { GameFieldProps, IGameField } from "./types";

import './style.scss';

export class Gamefield implements IGameField {
    private gamefield: HTMLElement = document.createElement('div');;

    private props: GameFieldProps = {
        title: 'Select the bento boxes',
        className: ['flex', 'flex-col', 'justify-center', 'items-center'],
        buttonTitle: "Grogu, help, I'm stuck!",
        buttonHandler: (): void => {
            const modal = getElement(this.gamefield, '.main-modal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }
    };

    constructor() {
        this.gamefield.className = this.props.className.join(' ');
        const modal = new Modal();

        this.gamefield.innerHTML = `
            <h1 class="level-title text-2xl md:text-3xl font-bold text-center px-4">
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
            <div class="game-table">
            </div>
        </div>
        <div class="table-edge w-full" style="opacity: 1;">
                <div class="table-leg"></div>
                <div class="table-leg"></div>
        </div>
        <div class="tooltip">
                <span class="tooltip-text"></span>
            </div>
        </div>`;

        this.gamefield.append(modal.getModal());
    }

    public getContainer(): HTMLElement {
        return this.gamefield;
    }

    public setTable(content: string, selector: string): void {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = content;

        /* let linesCounter = 0;

        tempElement.querySelectorAll('*').forEach((item, idx) => {
            (item as HTMLElement).dataset.id = linesCounter.toString();

            const itemLines = ([...item.innerHTML.matchAll(/(\r\n|\r|\n)/g)].length + 1);

            linesCounter += itemLines;

            (item as HTMLElement).dataset.lines = linesCounter.toString();

            // linesCounter += linesCounter;
        }); */

        const table = getElement<HTMLDivElement>(this.gamefield, '.game-table');

        table.innerHTML = tempElement.innerHTML;

        table.querySelectorAll(selector).forEach((item) => {
            item.classList.add('strobe');
        })

        const tooltip = getElement(this.gamefield, '.tooltip');
        const tooltiptext = getElement(this.gamefield, '.tooltip-text');

        table.querySelectorAll('*').forEach((item) => {
            item.addEventListener('mouseenter', (event) => {
                const elemClone = document.createElement('div');
                elemClone.innerHTML = (event.target as HTMLElement).outerHTML;

                elemClone.querySelectorAll('*').forEach(element => {
                    element.classList.remove('strobe');
                    element.classList.remove('backdrop');
                });
                tooltiptext.textContent = elemClone.innerHTML
                    .replace(/class=""/g, '')
                    .replace(/data-id="."/g, '')
                    .replace(/ >/g, '>');
                tooltip.classList.add('show');

                item.classList.add('backdrop');

                // console.log(item);

                const firstIndex = Number((item as HTMLElement).dataset.id);
                const lastIndex = Number((item as HTMLElement).dataset.lines);

                console.log(firstIndex, lastIndex);

                /* document.querySelectorAll('.cm-line').forEach((line, index) => {
                    if (index >= firstIndex && index <= lastIndex - 1) {
                        line.classList.add('selected');
                    }
                    // console.log(line.outerHTML)
                }) */
            });

            item.addEventListener('mouseleave', () => {
                document.querySelectorAll('.cm-line').forEach((line) => {
                    line.classList.remove('selected');
                })

                item.classList.remove('backdrop');
                tooltip.classList.remove('show');
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