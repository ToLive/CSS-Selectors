import { getElement } from "@shared/helpers/getElement";
import { levels } from "@features/levels";

import './style.scss';

export class LevelSelect {
    private levelSelect: HTMLElement = document.createElement('aside');

    private nextLevelButton: HTMLAnchorElement;

    private previousLevelButton: HTMLAnchorElement;

    private currentLevelNumber: number;

    constructor() {
        this.levelSelect.className = 'flex flex-col h-full';

        const levelsCnt = levels.length;
        const currentLevel = levels[0];
        this.currentLevelNumber = 1;

        const elements = `<div class="help-wrapper">

        <h1 class="level-header completed">
          <span class="level-text">Level ${this.currentLevelNumber} of ${levelsCnt}</span>
          <span class="checkmark"></span>
        </h1>

        <div class="level-nav">
          <a class="previous-level" href="#"></a>
          <a class="next-level" href="#"></a>
        </div>

        <div class="level-progress"><div class="progress" style="width: 3.125%;"></div></div>

        <div class="display-help">
          <h3 class="selector-name">${currentLevel.selectorName || ''}</h3>
          <h2 class="title">${currentLevel.helpTitle}</h2>
          <h3 class="syntax">${currentLevel.syntax}</h3>
          <div class="hint">${currentLevel.help}</div>
          <h4 class="examples-title" style="display: block;">Examples</h4>
          <div class="examples">${currentLevel.examples?.map((item) => `<div class="example">${item}</div>`).join('') || ''}</div>
        </div>
      </div>`;

        this.levelSelect.innerHTML = elements;

        this.nextLevelButton = getElement(this.levelSelect, '.next-level');
        this.previousLevelButton = getElement(this.levelSelect, '.previous-level');

        const LEVEL_STEP = 1;

        this.nextLevelButton.addEventListener('click', () => {
            this.setLevel(this.currentLevelNumber + LEVEL_STEP)
            this.currentLevelNumber += LEVEL_STEP;
        });

        this.previousLevelButton.addEventListener('click', () => {
            this.setLevel(this.currentLevelNumber - LEVEL_STEP);
            this.currentLevelNumber -= LEVEL_STEP;
        });
    }

    public getContainer(): HTMLElement {
        return this.levelSelect;
    }

    public setLevel(num: number): void {
        const level = levels[num];

        const levelText = getElement(this.levelSelect, '.level-text');
        levelText.innerHTML = `Level ${num} of ${levels.length}`;

        const selectorName = getElement(this.levelSelect, '.selector-name');
        selectorName.innerHTML = level.selectorName || '<h3 class="selector-name"></h3>';
    }
}