import { SavedLevel } from "@entities/localStorage/types";

import { watchedState } from "../..";

export const getLevelStatus = (level: number): SavedLevel | null => {
    if (watchedState.levelStat) {
        return watchedState.levelStat[level];
    }

    return null;
};

