import { changeLevelStat } from "../changeLevelStat/changeLevelStat";
import { getSavedLevels } from "../getLevelsStatus/getLevelsStatus"
import { setCurrentLevel } from "../setCurrentLevel/setCurrentLevel";

export const resetProgress = (): void => {
    const levels = getSavedLevels();

    if (levels !== null) {
        levels.forEach(level => {
            changeLevelStat({ num: level.num, solved: false, isHintUsed: false });
        });

        const DEFAULT_LEVEL = 0;

        setCurrentLevel(DEFAULT_LEVEL);
    }
}