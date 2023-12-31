/* eslint-disable max-lines-per-function */
import { Editor } from "@widgets/Editor";
import { Footer } from "@widgets/Footer";
import { Gamefield } from "@widgets/Gamefield";
import { Header } from "@widgets/Header";
import { getElement } from "@shared/helpers";
import { levels } from "@features/levels";
import { Level } from "@features/levels/types";
import { LEVEL_STEP, MAX_LEVEL, MIN_LEVEL } from "@features/levels/lib/config";
import { LevelSelect } from "@widgets/LevelSelect";

import './style.scss';
import * as StateApi from "@shared/state/api";
import { EventDetail, SavedLevel } from "@shared/state/types";

export class Game {
    private editor = new Editor();

    private footer = new Footer();

    private gamefield = new Gamefield();

    private header = new Header();

    private levelSelect!: LevelSelect;

    public start(): void {
        this.buildField();
    }

    private buildField(): void {
        const container: HTMLDivElement = document.createElement('div');
        container.className = 'flex';

        const firstCol: HTMLDivElement = document.createElement('div');
        firstCol.className = 'flex flex-col h-[100vh] first-col ';

        const secondCol: HTMLDivElement = document.createElement('div');
        secondCol.className = 'relative z-[200] h-full second-col';

        this.setLevelsState();

        this.levelSelect = new LevelSelect();

        firstCol.append(this.header.getContainer(), this.gamefield.getContainer(), this.editor.getContainer(), this.footer.getContainer());
        secondCol.append(this.levelSelect.getContainer());


        container.append(firstCol);


        container.append(secondCol);


        document.body.append(container);

        this.generateStars(document.body);

        this.setLevelData(StateApi.getCurrentLevel());
        this.addEventListeners();

    }

    private setLevelsState(): void {
        const lsData: SavedLevel[] | null = StateApi.getSavedLevels();

        if (lsData === null) {
            levels.map((_, idx) => StateApi.changeLevelStat({
                num: idx,
                solved: false,
                isHintUsed: false
            }));

            return;
        }

        lsData.forEach((level: SavedLevel) => {
            StateApi.changeLevelStat({
                num: level.num,
                solved: level.solved,
                isHintUsed: level.isHintUsed
            });
        });
    }

    private setLevelData(level: number): void {
        this.levelSelect.setLevel(level);
        const levelData: Level = levels[StateApi.getCurrentLevel()];

        this.gamefield.setTable(levelData.boardMarkup, levelData.selector);
        this.editor.setHtmlViewer(levelData.boardMarkup);

        this.editor.clearInput();

        StateApi.setCurrentLevel(level);
    }

    private generateStars(placement: HTMLElement): void {
        const stars = 600;

        function genStars(): number[] {
            const setX = Number(placement.offsetHeight);
            const newX = Math.floor(Math.random() * setX);
            const setY = Number(placement.offsetWidth);
            const newY = Math.floor(Math.random() * setY);
            return [newX, newY];
        }

        const STEP = 1;

        for (let i = 0; i < stars; i += STEP) {
            const placeStars = genStars();
            const theseStars = document.createElement("span");

            const [top, left] = placeStars;
            theseStars.style.top = `${top}px`;
            theseStars.style.left = `${left}px`;
            theseStars.className = "star";

            placement.append(theseStars);
        }
    }

    private addEventListeners(): void {
        const changeLevel = (newLevel: number): void => {
            if (newLevel >= MIN_LEVEL && newLevel <= MAX_LEVEL) {
                StateApi.setCurrentLevel(newLevel);
                this.setLevelData(newLevel);
            }
        };

        window.addEventListener('rightAnswer', () => {
            const CHANGE_DELAY = 1000;

            this.gamefield.animateRightAnswer(levels[StateApi.getCurrentLevel()].selector);

            this.levelSelect.updateLevelProgress(StateApi.getCurrentLevel());

            // eslint-disable-next-line no-magic-numbers
            const unsolvedLevels = StateApi.getSavedLevels()?.reduce((acc, value) => value.solved ? acc : acc + LEVEL_STEP, 0);

            // eslint-disable-next-line no-magic-numbers
            if (Number(unsolvedLevels) - 1 === 0) {
                this.gamefield.showModal();

                return;
            }

            setTimeout(() => changeLevel(StateApi.getCurrentLevel() + LEVEL_STEP), CHANGE_DELAY);
        });

        window.addEventListener('changeSelectedItem', (event: Event) => {
            const eventData: Pick<EventDetail, "itemNum"> = (event as CustomEvent).detail as EventDetail;
            const { itemNum } = eventData;

            this.gamefield.setSelectedItem(itemNum);
        });

        window.addEventListener('changeLevel', (event: Event) => {
            const eventData: Pick<EventDetail, "levelNum"> = (event as CustomEvent).detail as EventDetail;

            const level: number = eventData.levelNum;

            const highlightedItem = getElement(this.levelSelect.getContainer(), '.active-level');

            if (highlightedItem) {
                highlightedItem.classList.remove('active-level');
            }

            const menuCurrentLevel = getElement(this.levelSelect.getContainer(), `.level[data-id="${level}"]`);

            menuCurrentLevel.classList.add('active-level');

            changeLevel(level);
        });

        window.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.editor.checkUserAnswer();
            }
        });

        const helpButton: HTMLElement = getElement(this.gamefield.getContainer(), '#help-button');
        helpButton.addEventListener('click', () => {
            const newLevelData: SavedLevel = { ...StateApi.getLevelStatus(StateApi.getCurrentLevel()) as SavedLevel, isHintUsed: true, solved: false };

            StateApi.changeLevelStat(newLevelData);

            this.editor.showHelper(levels[StateApi.getCurrentLevel()].selector)
        });
    }
}
