import { LEVEL_STEP, MAX_LEVEL, MIN_LEVEL, levels } from "../lib/config";
import { changeLevelStat } from "../../../shared/state/api/changeLevelStat/changeLevelStat";
import { setCurrentLevel } from "../../../shared/state/api/setCurrentLevel/setCurrentLevel";
import { getCurrentLevel } from "../../../shared/state/api/getCurrentLevel/getCurrentLevel";


export const checkAnswer = (answer: string): void => {
    const answerAsNum = Number(answer) - LEVEL_STEP;
    const currentLevel = getCurrentLevel();

    if (!Number.isNaN(answerAsNum)) {
        console.log('Got number for level select');

        if (answerAsNum >= MIN_LEVEL && answerAsNum <= MAX_LEVEL) {
            setCurrentLevel(answerAsNum);

            return;
        }

        return;

    }

    const rightAnswer = levels[currentLevel].selector;
    console.log(rightAnswer, answer);

    changeLevelStat({
        num: currentLevel,
        solved: true,
        isHintUsed: false,
    });

    setCurrentLevel(currentLevel + LEVEL_STEP)
}