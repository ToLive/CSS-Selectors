import { LEVEL_STEP, MAX_LEVEL, MIN_LEVEL, levels } from "../lib/config";
import { changeLevelStat } from "../../../shared/state/api/changeLevelStat/changeLevelStat";
import { setCurrentLevel } from "../../../shared/state/api/setCurrentLevel/setCurrentLevel";
import { getCurrentLevel } from "../../../shared/state/api/getCurrentLevel/getCurrentLevel";


export const checkAnswer = (answer: string): boolean => {
    const answerAsNum = Number(answer) - LEVEL_STEP;
    const currentLevel = getCurrentLevel();

    if (!Number.isNaN(answerAsNum)) {
        console.log('Got number for level select');

        if (answerAsNum >= MIN_LEVEL && answerAsNum <= MAX_LEVEL) {
            setCurrentLevel(answerAsNum);

            return false;
        }

        return false;

    }

    const rightAnswer = levels[currentLevel].selector;
    console.log(rightAnswer, answer);

    if (rightAnswer === answer) {
        console.log('answer is right');

        return true;
    }

    return false;
}