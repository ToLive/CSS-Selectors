import { getElement } from "@shared/helpers";
import { NOT_SET_ITEM } from "@shared/state/api";
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


        const table = getElement<HTMLDivElement>(this.gamefield, '.game-table');

        table.innerHTML = tempElement.innerHTML;

        table.querySelectorAll(selector).forEach((item) => {
            item.classList.add('strobe');
        })

        table.querySelectorAll('*').forEach((item, idx) => {
            // eslint-disable-next-line no-param-reassign
            (item as HTMLElement).dataset.id = idx.toString();
        })



        table.querySelectorAll('*').forEach((item) => {
            item.addEventListener('mouseenter', () => {
                this.setSelectedItem(Number((item as HTMLElement).dataset.id));

                item.classList.add('backdrop');
            });

            item.addEventListener('mouseleave', (e: Event) => {
                const relItem = (e as MouseEvent).relatedTarget;

                if (relItem) {
                    this.setSelectedItem(Number((relItem as HTMLElement).dataset.id));

                    return;
                }

                this.setSelectedItem(NOT_SET_ITEM);
            });
        })
    }

    public setSelectedItem(itemNum: number): void {
        this.gamefield.querySelectorAll('.backdrop').forEach((el) => el.classList.remove('backdrop'));
        const tooltip = getElement(this.gamefield, '.tooltip');
        tooltip.classList.remove('show');

        const tableItem = this.gamefield.querySelector(`[data-id="${itemNum}"]`);

        if (tableItem) {
            tableItem?.classList.add('backdrop');


            const tooltiptext = getElement(this.gamefield, '.tooltip-text');

            const elemClone = document.createElement('div');
            elemClone.innerHTML = tableItem.outerHTML;

            elemClone.querySelectorAll('*').forEach(element => {
                element.classList.remove('strobe');
                element.classList.remove('backdrop');
            });
            tooltiptext.textContent = elemClone.innerHTML
                .replace(/class=""/g, '')
                .replace(/data-id="."/g, '')
                .replace(/ >/g, '>');
            tooltip.classList.add('show');
        }
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