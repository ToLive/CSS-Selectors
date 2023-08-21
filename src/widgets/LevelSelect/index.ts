import { getElement } from "@shared/helpers";
import { levels } from "@features/levels";
import { Level } from "@features/levels/types";
import * as StateApi from "@shared/state/api";
import { LEVEL_STEP, MAX_LEVEL, MIN_LEVEL } from "@features/levels/lib/config";
import { SavedLevel } from "@shared/state/types";

import './style.scss';
import { Menu } from "./types";

export class LevelSelect {
    private levelSelect: HTMLElement = document.createElement('aside');

    private currentLevelNumber = 0;

    private menu: Menu;

    constructor() {
        this.levelSelect.className = 'flex flex-col h-full';

        const elements = `<div class="help-wrapper">
        <div class="level-nav flex">
            <div class="previous-level arrow">
                <span></span>
            </div>
            <h1 class="level-header">
                <span class="level-text"></span>
                <span class="checkmark"></span>
            </h1>
            <div class="next-level arrow arrow-right ml-2">
                <span></span>
            </div>
        </div>

        <div class="display-help">
            <h3 class="selector-name"></h3>
            <h2 class="title"></h2>
            <h3 class="syntax"></h3>
            <div class="hint"></div>
            <h4 class="examples-title">Examples</h4>
            <div class="examples"></div>
        </div>
        </div>
        <div class="menu-toggle-wrapper">
            <div class="menu-toggle"></div>
        </div>`;

        this.levelSelect.innerHTML = elements;

        this.buildSideMenu();
        this.menu = this.buildMenuToggle();
        this.addEventListeners();
    }

    private buildSideMenu(): void {
        const menuLevelsList = StateApi.getSavedLevels()?.map((level) => `
        <a class="level w-full flex cursor-pointer my-2 hover:font-bold ${level.num === StateApi.getCurrentLevel() ? 'active-level' : ''}" data-id="${level.num}">
            <span class="checkmark ${level.solved ? "completed" : ''}"></span>
            <span class="checkmark ${level.solved && !level.isHintUsed ? "completed" : ''}"></span>
            <div class="level-number text-xl text-center ml-3 w-[20px] hover:text-bold">${level.num + LEVEL_STEP}</div>
            <span class="level-name ml-2 text-xl  hover:text-bold">${levels[level.num].syntax || ''}</span>
        </a>`).join('');

        const levelList = `
        <div class="menu-box">
            <div class="flex flex-col h-full w-full justify-center items-center text-center align-middle">
                <h2 class="choose-title font-bold text-xl my-2">Choose a stage</h2>
                <div class="levels flex flex-col w-full flex-grow self-start p-3">
                    ${menuLevelsList || ''}
                </div>
                <button class="reset-progress border px-4 py-2 mt-2 mb-4 hover:bg-zinc-800 rounded-xl transition-colors">Reset Progress</button>
            </div>
        </div>`;

        this.levelSelect.insertAdjacentHTML('beforeend', levelList);
    }

    private buildMenuToggle(): Menu {
        const menuToggleWrapper = getElement(this.levelSelect, '.menu-toggle-wrapper');
        const menuToggle = getElement(this.levelSelect, '.menu-toggle');
        const menuBox = getElement(this.levelSelect, '.menu-box');

        menuToggleWrapper.addEventListener('click', () => {

            menuBox.classList.toggle('is-active');
            menuToggle.classList.toggle('open');
        });

        return {
            toggle: menuToggle,
            box: menuBox,
            show: (): void => {
                menuBox.classList.add('is-active');
                menuToggle.classList.add('open');
            },
            hide: (): void => {
                menuBox.classList.remove('is-active');
                menuToggle.classList.remove('open');
            }
        };
    }

    private addEventListeners(): void {
        const nextLevelButton = getElement<HTMLAnchorElement>(this.levelSelect, '.next-level');
        const previousLevelButton = getElement<HTMLAnchorElement>(this.levelSelect, '.previous-level');
        const levelsSelector = this.levelSelect.querySelectorAll('.level');
        const resetProgressButton = getElement(this.levelSelect, '.reset-progress');

        resetProgressButton.addEventListener('click', () => {
            StateApi.resetProgress();

            this.menu.hide();
        });

        levelsSelector.forEach((level) => {
            level.addEventListener('click', (e) => {
                e.preventDefault();

                const levelNumber = parseInt(level.getAttribute('data-id') || '0', 10);

                this.setLevel(levelNumber);
                StateApi.setCurrentLevel(levelNumber);

                this.menu.hide();
            });
        });

        const changeLevel = (newLevel: number): void => {
            if (newLevel >= MIN_LEVEL && newLevel <= MAX_LEVEL) {
                StateApi.setCurrentLevel(newLevel);
            }
        };

        nextLevelButton.addEventListener('click', () => {
            changeLevel(StateApi.getCurrentLevel() + LEVEL_STEP);
        });

        previousLevelButton.addEventListener('click', () => {
            changeLevel(StateApi.getCurrentLevel() - LEVEL_STEP);
        });
    }

    public getContainer(): HTMLElement {
        return this.levelSelect;
    }

    public updateLevelProgress(level: number): void {
        const levelElement = getElement(this.levelSelect, `[data-id="${level}"]`);

        const levelStat = StateApi.getLevelStatus(level) as SavedLevel;

        const highlightedItem = getElement(this.levelSelect, '.active-level');

        if (highlightedItem) {
            highlightedItem.classList.remove('active-level');
        }

        levelElement.classList.add('active-level');

        levelElement.innerHTML = `        
            <span class="checkmark ${levelStat.solved ? "completed" : ''}"></span>
            <span class="checkmark ${levelStat.solved && !levelStat.isHintUsed ? "completed" : ''}"></span>
            <div class="level-number text-xl text-center ml-3 w-[20px]  hover:text-bold">${levelStat.num + LEVEL_STEP}</div>
            <span class="level-name ml-2 text-xl  hover:text-bold">${levels[levelStat.num].syntax || ''}</span>
        `;
    }

    public setLevel(num: number = this.currentLevelNumber): void {
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

        levelElements.levelText().innerHTML = `Stage ${num + LEVEL_STEP} of ${levels.length}`;
        levelElements.selectorName().innerHTML = level.selectorName || '<h3 class="selector-name"></h3>';
        levelElements.title().innerHTML = level.helpTitle;
        levelElements.syntax().innerHTML = level.syntax;
        levelElements.hint().innerHTML = level.help;
        levelElements.examples().innerHTML = level.examples?.map((item) => `<div class="example">${item}</div>`).join('') || '';

        levelElements.levelTitle().innerHTML = level.doThis;

        const isLevelCompleted = (levelNum: number): boolean => {
            const levelData = StateApi.getLevelStatus(levelNum);

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