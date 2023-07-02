import { getElement } from "@shared/helpers/getElement";
import { levels } from "@features/levels";
import { Level } from "@features/levels/types";

import './style.scss';
import { getLevelStatus } from "../../shared/state/api/getLevelStatus/getLevelStatus";
import { LEVEL_STEP } from "../../features/levels/lib/config";

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

        <div class="level-nav">
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
        </div>`;

        this.levelSelect.innerHTML = elements;
    }

    public getContainer(): HTMLElement {
        return this.levelSelect;
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