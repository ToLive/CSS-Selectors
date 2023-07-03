import onChange, { ApplyData } from "on-change";
import { EventDetail, SavedLevel, State } from "./types";

const state: State = {
    currentLevel: 0,
    levelStat: [],
};

const events = {
    rightAnswer: (detail: Pick<EventDetail, "savedLevel">): Event => new CustomEvent("rightAnswer", { bubbles: true, detail }),
    changeLevel: (detail: Pick<EventDetail, "levelNum">): Event => new CustomEvent("changeLevel", { bubbles: true, detail }),
}

function generateEvent(path: string, value: unknown, previousValue?: unknown, applyData?: ApplyData): void {
    if (path.includes('levelStat')) {
        window.dispatchEvent(events.rightAnswer({ savedLevel: value as SavedLevel }));
    }

    if (path.includes('currentLevel')) {
        window.dispatchEvent(events.changeLevel({ levelNum: value as number }));
    }
}

export const watchedState = onChange(state, (path: string, value: unknown, previousValue: unknown, applyData: ApplyData): void => {
    generateEvent(path, value, previousValue, applyData);
});