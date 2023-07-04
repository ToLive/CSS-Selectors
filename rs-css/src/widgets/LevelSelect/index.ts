import { getElement } from "@shared/helpers/getElement";
import { levels } from "@features/levels";
import { Level } from "@features/levels/types";

import './style.scss';
import { getLevelStatus } from "../../shared/state/api/getLevelStatus/getLevelStatus";
import { LEVEL_STEP } from "../../features/levels/lib/config";
import { getSavedLevels } from "../../shared/state/api/getLevelsStatus/getLevelsStatus";
import { resetProgress } from "../../shared/state/api/resetProgress/resetProgress";
import { setCurrentLevel } from "../../shared/state/api/setCurrentLevel/setCurrentLevel";
import { getCurrentLevel } from "../../shared/state/api/getCurrentLevel/getCurrentLevel";
import { SavedLevel } from "../../shared/state/types";

export class LevelSelect {
    private levelSelect: HTMLElement = document.createElement('aside');

    private currentLevelNumber = 0;

    constructor() {
        this.levelSelect.className = 'flex flex-col h-full';

        const elements = `<div class="help-wrapper">

        <h1 class="level-header">
            <span class="level-text"></span>
            <span class="checkmark"></span>
        </h1>

        <div class="level-nav flex">
            <a class="previous-level" href="#"></a>
            <a class="next-level" href="#"></a>
        </div>

        <div class="level-progress"><div class="progress" style="width: 3.125%;"></div></div>

        <div class="display-help">
            <h3 class="selector-name"></h3>
            <h2 class="title"></h2>
            <h3 class="syntax"></h3>
            <div class="hint"></div>
            <h4 class="examples-title" style="display: block;">Examples</h4>
            <div class="examples"></div>
        </div>
        </div>
        <div class="level-menu-toggle-wrapper">
            <div class="level-menu-toggle"></div>
        </div>`;

        this.levelSelect.innerHTML = elements;

        this.buildMenu();
    }

    private buildMenu(): void {
        const menuLevelsList = getSavedLevels()?.map((level) => `
        <a class="level w-full flex cursor-pointer my-2 hover:font-bold ${level.num === getCurrentLevel() ? 'active-level' : ''}" data-id="${level.num}">
            <span class="checkmark ${level.solved ? "completed" : ''}"></span>
            <span class="checkmark ${level.solved && !level.isHintUsed ? "completed" : ''}"></span>
            <div class="level-number text-xl text-center ml-3 w-[20px]  hover:text-bold">${level.num + 1}</div>
            <span class="level-name ml-2 text-xl  hover:text-bold">${levels[level.num].syntax || ''}</span>
        </a>`).join('');

        const levelList = `
        <div class="menu-box">
            <div class="flex flex-col h-full w-full justify-center items-center text-center align-middle">
                <h2 class="choose-title font-bold text-xl my-2">Choose a level</h2>
                <div class="levels flex flex-col w-full flex-grow self-start p-3">
                    ${menuLevelsList || ''}
                </div>
                <button class="reset-progress border px-4 py-2 mt-2 mb-4 hover:bg-zinc-800 rounded-xl transition-colors">Reset Progress</button>
            </div>
        </div>`;

        this.levelSelect.insertAdjacentHTML('beforeend', levelList);

        const menuToggleWrapper = getElement(this.levelSelect, '.level-menu-toggle-wrapper');
        const menuToggle = getElement(this.levelSelect, '.level-menu-toggle');
        const menuBox = getElement(this.levelSelect, '.menu-box');
        menuToggleWrapper.addEventListener('click', () => {
            menuBox.classList.toggle('is-active');
            menuToggle.classList.toggle('open');
        });

        const levelsSelector = this.levelSelect.querySelectorAll('.level');

        levelsSelector.forEach((level) => {
            level.addEventListener('click', (e) => {
                e.preventDefault();

                const levelNumber = parseInt(level.getAttribute('data-id') || '0', 10);

                this.setLevel(levelNumber);
                setCurrentLevel(levelNumber);

                menuBox.classList.remove('is-active');
            });
        });

        const resetProgressButton = getElement(this.levelSelect, '.reset-progress');
        resetProgressButton.addEventListener('click', () => {
            resetProgress();
            menuBox.classList.remove('is-active');
            menuToggle.classList.remove('open');
        });
    }

    public getContainer(): HTMLElement {
        return this.levelSelect;
    }

    public updateLevelProgress(level: number): void {
        const levelElement = getElement(this.levelSelect, `[data-id="${level}"]`);

        const levelStat = getLevelStatus(level) as SavedLevel;

        const highlightedItem = getElement(this.levelSelect, '.active-level');

        if (highlightedItem) {
            highlightedItem.classList.remove('active-level');
        }

        levelElement.classList.add('active-level');

        levelElement.innerHTML = `        
            <span class="checkmark ${levelStat.solved ? "completed" : ''}"></span>
            <span class="checkmark ${levelStat.solved && !levelStat.isHintUsed ? "completed" : ''}"></span>
            <div class="level-number text-xl text-center ml-3 w-[20px]  hover:text-bold">${levelStat.num + 1}</div>
            <span class="level-name ml-2 text-xl  hover:text-bold">${levels[levelStat.num].syntax || ''}</span>
        `;
    }

    public setLevel(num: number = this.currentLevelNumber): void {
        console.log('setlevel');

        const level = levels[num];

        const levelElements = {
            checkmark: () => getElement(this.levelSelect, '.checkmark'),
            levelText: () => getElement(this.levelSelect, '.level-text'),
            selectorName: () => getElement(this.levelSelect, '.selector-name'),
            title: () => getElement(this.levelSelect, '.title'),
            syntax: () => getElement(this.levelSelect, '.syntax'),
            hint: () => getElement(this.levelSelect, '.hint'),
            examples: () => getElement(this.levelSelect, '.examples'),
            example: () => getElement(this.levelSelect, '.example'),
            levelTitle: () => getElement(document.body, '.level-title'),
        };

        levelElements.levelText().innerHTML = `Level ${num + LEVEL_STEP} of ${levels.length}`;
        levelElements.selectorName().innerHTML = level.selectorName || '<h3 class="selector-name"></h3>';
        levelElements.title().innerHTML = level.helpTitle;
        levelElements.syntax().innerHTML = level.syntax;
        levelElements.hint().innerHTML = level.help;
        levelElements.examples().innerHTML = level.examples?.map((item) => `<div class="example">${item}</div>`).join('') || '';

        levelElements.levelTitle().innerHTML = level.doThis;

        const isLevelCompleted = (levelNum: number): boolean => {
            console.log('level completed?', levelNum);

            const levelData = getLevelStatus(levelNum);

            console.log(levelData);

            if (levelData) {
                return levelData.solved;
            };

            return false;
        }

        if (isLevelCompleted(num)) {
            levelElements.checkmark().classList.add('completed')
        } else {
            levelElements.checkmark().classList.remove('completed');
        }
    }

    public getLevelData(): Level {
        return levels[this.currentLevelNumber];
    }
}