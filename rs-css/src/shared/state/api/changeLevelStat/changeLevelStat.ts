import { SavedLevel } from "@entities/localStorage/types";
import { watchedState } from "../..";
import { setLevelStatus } from "../../../../entities/localStorage/api/setLevelsStatus";

export const changeLevelStat = (levelData: SavedLevel): void => {
    if (watchedState.levelStat) {
        watchedState.levelStat[levelData.num] = levelData;

        setLevelStatus();
    }
}