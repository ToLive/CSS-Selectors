import { watchedState } from "../..";
import { SavedLevel } from "../../types";

export const getLevelStatus = (level: number): SavedLevel | null => {
    if (watchedState.levelStat) {
        return watchedState.levelStat[level];
    }

    return null;
};

