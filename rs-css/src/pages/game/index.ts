import { Editor } from "@widgets/Editor";
import { Footer } from "@widgets/Footer";
import { Gamefield } from "@widgets/Gamefield";
import { Header } from "@widgets/Header";
import { getElement } from "@shared/helpers/getElement";
import { levels } from "@features/levels";
import { Level } from "@features/levels/types";
import { LEVEL_STEP, MAX_LEVEL, MIN_LEVEL } from "@features/levels/lib/config";
import { LevelSelect } from "@widgets/LevelSelect";

import './style.scss';
import { getSavedLevels } from "@entities/localStorage";
import { SavedLevel } from '@entities/localStorage/types';
import { changeLevelStat } from "@shared/state/api/changeLevelStat/changeLevelStat";
import { setCurrentLevel } from "@shared/state/api/setCurrentLevel/setCurrentLevel";
import { getCurrentLevel } from "../../shared/state/api/getCurrentLevel/getCurrentLevel";
import { EventDetail } from "../../shared/state/types";


export class Game {
    private editor = new Editor();

    private footer = new Footer();

    private gamefield = new Gamefield();

    private header = new Header();

    private levelSelect = new LevelSelect();

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

        this.setLevelsState();


        this.setLevelData(getCurrentLevel());
        this.addEventListeners();
        /* document.body.append(this.footer.getContainer());
         */
    }

    private setLevelsState(): void {
        const lsData: SavedLevel[] | null = getSavedLevels();

        if (lsData === null) {
            console.log('new game, fill empty data');

            levels.map((_, idx) => changeLevelStat({
                num: idx,
                solved: false,
                isHintUsed: false
            }));

            return;
        }

        lsData.forEach((level: SavedLevel) => {
            changeLevelStat({
                num: level.num,
                solved: level.solved,
                isHintUsed: level.isHintUsed
            });
        });
    }

    private setLevelData(level: number): void {
        this.levelSelect.setLevel(level);
        const levelData: Level = levels[getCurrentLevel()];

        this.gamefield.setTable(levelData.boardMarkup);
        this.editor.setHtmlViewer(`<div class="table">${levelData.boardMarkup}</div>`);

        this.editor.clearInput();

        setCurrentLevel(level);
    }

    private addEventListeners(): void {
        const levelContainer = this.levelSelect.getContainer();

        const nextLevelButton = getElement<HTMLAnchorElement>(levelContainer, '.next-level');
        const previousLevelButton = getElement<HTMLAnchorElement>(levelContainer, '.previous-level');

        const changeLevel = (newLevel: number): void => {
            if (newLevel >= MIN_LEVEL && newLevel <= MAX_LEVEL) {
                setCurrentLevel(newLevel);
                this.setLevelData(newLevel);
            }
        };

        nextLevelButton.addEventListener('click', () => {
            const currentLevel = getCurrentLevel();

            changeLevel(currentLevel + LEVEL_STEP);
        });

        previousLevelButton.addEventListener('click', () => {
            const currentLevel = getCurrentLevel();

            changeLevel(currentLevel - LEVEL_STEP);
        });

        window.addEventListener('rightAnswer', (event: Event) => {
            const currentLevel = getCurrentLevel();

            changeLevel(currentLevel + LEVEL_STEP);
        });

        window.addEventListener('changeLevel', (event: Event) => {
            const eventData: Pick<EventDetail, "levelNum"> = (event as CustomEvent).detail as EventDetail;

            const level: number = eventData.levelNum;

            console.log(level);

            changeLevel(level);
        });


        window.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.editor.checkAnswer();
            }
        });
    }
}
