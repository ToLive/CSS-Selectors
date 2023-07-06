import { LEVEL_STEP, MAX_LEVEL, MIN_LEVEL, levels } from "../lib/config";
import { setCurrentLevel } from "../../../shared/state/api/setCurrentLevel/setCurrentLevel";
import { getCurrentLevel } from "../../../shared/state/api/getCurrentLevel/getCurrentLevel";
import { checkEquality } from '../../../shared/helpers/checkEquality';


export const checkAnswer = (answer: string): boolean => {
    const answerAsNum = Number(answer) - LEVEL_STEP;
    const currentLevel = getCurrentLevel();

    if (!Number.isNaN(answerAsNum)) {
        if (answerAsNum >= MIN_LEVEL && answerAsNum <= MAX_LEVEL) {
            setCurrentLevel(answerAsNum);

            return false;
        }

        return false;

    }

    const tempNode: HTMLElement = document.createElement('div');
    tempNode.innerHTML = levels[currentLevel].boardMarkup;

    try {
        const userAnswerNodes = tempNode.querySelectorAll(answer);
        const rightAnswerNodes = tempNode.querySelectorAll(levels[currentLevel].selector);
        console.log(userAnswerNodes);
        console.log(rightAnswerNodes);

        if (checkEquality(rightAnswerNodes, userAnswerNodes)) {
            return true;
        }

        return false;
    } catch {
        return false;
    }
}