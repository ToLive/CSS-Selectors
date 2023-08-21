import { setCurrentLevel, getCurrentLevel } from "@shared/state/api";
import { checkNodelistEquality } from '@shared/helpers/api/checkNodelistEquality';
import { LEVEL_STEP, MAX_LEVEL, MIN_LEVEL, levels } from "../lib/config";


export const checkAnswer = (answer: string, level?: number): boolean => {
    const answerAsNum = Number(answer) - LEVEL_STEP;
    const currentLevel = level ?? getCurrentLevel();

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

        if (checkNodelistEquality(rightAnswerNodes, userAnswerNodes)) {
            return true;
        }

        return false;
    } catch {
        return false;
    }
}