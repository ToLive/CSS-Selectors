
import { watchedState } from "../..";
import { SavedLevel } from "../../types";
import { saveLevelStatus } from "../saveLevelStatus";

export const changeLevelStat = (levelData: SavedLevel): void => {
    if (watchedState.levelStat) {
        watchedState.levelStat[levelData.num] = levelData;

        saveLevelStatus();
    }
}

