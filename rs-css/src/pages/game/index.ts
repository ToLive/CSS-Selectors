import { Editor } from "@widgets/Editor";
import { Footer } from "@widgets/Footer";
import { Gamefield } from "@widgets/Gamefield";
import { Header } from "@widgets/Header";
import { getElement } from "@shared/helpers/getElement";
import { levels } from "@features/levels";
import { Level } from "@features/levels/types";
import { LevelSelect } from "@/widgets/LevelSelect";

import './style.scss';

export class Game {
    private editor = new Editor();

    private footer = new Footer();

    private gamefield = new Gamefield();

    private header = new Header();

    private levelSelect = new LevelSelect();

    private currentLevelNumber = 0;

    private LEVEL_STEP = 1;

    private MIN_LEVEL = 0;

    private MAX_LEVEL = levels.length - this.LEVEL_STEP;

    public start(): void {
        this.buildField();
    }

    private buildField(): void {
        const firstCol: HTMLDivElement = document.createElement('div');
        firstCol.className = 'h-full first-col';

        const secondCol: HTMLDivElement = document.createElement('div');
        secondCol.className = 'h-full second-col';

        firstCol.append(this.header.getContainer(), this.gamefield.getContainer(), this.editor.getContainer());
        secondCol.append(this.levelSelect.getContainer());

        document.body.append(firstCol);
        document.body.append(secondCol);


        this.setLevelData(this.currentLevelNumber);
        this.addEventListeners();
        /* document.body.append(this.footer.getContainer());
         */
    }

    private setLevelData(level: number): void {
        this.levelSelect.setLevel(level);
        const levelData: Level = levels[this.currentLevelNumber];

        this.gamefield.setTable(levelData.boardMarkup);
        this.editor.setHtmlViewer(`<div class="table">${levelData.boardMarkup}</div>`);
    }

    private addEventListeners(): void {
        const levelContainer = this.levelSelect.getContainer();

        const nextLevelButton = getElement<HTMLAnchorElement>(levelContainer, '.next-level');
        const previousLevelButton = getElement<HTMLAnchorElement>(levelContainer, '.previous-level');

        nextLevelButton.addEventListener('click', () => {
            if (this.currentLevelNumber === this.MAX_LEVEL) {
                return;
            }

            this.currentLevelNumber += this.LEVEL_STEP;
            this.setLevelData(this.currentLevelNumber);
        });

        previousLevelButton.addEventListener('click', () => {
            if (this.currentLevelNumber === this.MIN_LEVEL) {
                return;
            }

            this.currentLevelNumber -= this.LEVEL_STEP;
            this.setLevelData(this.currentLevelNumber);
        });
    }
}
