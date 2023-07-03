
import { watchedState } from "../..";
import { SavedLevel } from "../../types";
import { setLevelStatus } from "../setLevelsStatus/setLevelsStatus";

export const changeLevelStat = (levelData: SavedLevel): void => {
    if (watchedState.levelStat) {
        watchedState.levelStat[levelData.num] = levelData;

        setLevelStatus();
    }
}