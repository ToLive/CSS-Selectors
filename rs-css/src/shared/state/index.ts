import onChange, { ApplyData } from "on-change";
import { State } from "./types";
import { SavedLevel } from "../../entities/localStorage/types";

const state: State = {
    currentLevel: 0,
    levelStat: [],
};

const events = {
    rightAnswer: (detail: SavedLevel): Event => new CustomEvent("rightAnswer", { bubbles: true, detail }),
}

function generateEvent(path: string, value: unknown, previousValue: unknown, applyData: ApplyData): void {
    if (path.includes('levelStat')) {
        // console.log('LEVELSTAT', path, value, previousValue, applyData);
        window.dispatchEvent(events.rightAnswer(value as SavedLevel));
    }

    console.log(path, value, previousValue, applyData);
}

export const watchedState = onChange(state, (path: string, value: unknown, previousValue: unknown, applyData: ApplyData): void => {
    generateEvent(path, value, previousValue, applyData);
});