import onChange from "on-change";
import { EventDetail, SavedLevel, State } from './types';

const state: State = {
    currentLevel: 0,
    selectedItem: -1,
    levelStat: [],
};

const events = {
    rightAnswer: (detail: Pick<EventDetail, "savedLevel">): Event => new CustomEvent("rightAnswer", { bubbles: true, detail }),
    changeLevel: (detail: Pick<EventDetail, "levelNum">): Event => new CustomEvent("changeLevel", { bubbles: true, detail }),
    changeSelectedItem: (detail: Pick<EventDetail, "itemNum">): Event => new CustomEvent("changeSelectedItem", { bubbles: true, detail }),
}

function generateEvent(path: string, value: unknown): void {
    if (path.includes('levelStat')
        && value && (value as SavedLevel).solved === true
    ) {
        window.dispatchEvent(events.rightAnswer({ savedLevel: value as SavedLevel }));
    }

    if (path.includes('currentLevel')) {
        window.dispatchEvent(events.changeLevel({ levelNum: value as number }));
    }

    if (path.includes('selectedItem')) {
        window.dispatchEvent(events.changeSelectedItem({ itemNum: value as number }));
    }
}

export const watchedState = onChange(state, (path: string, value: unknown): void => {
    generateEvent(path, value);
});