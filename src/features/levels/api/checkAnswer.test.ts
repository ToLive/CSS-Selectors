import { checkAnswer, levels } from "..";

describe('checkAnswer', () => {
    it('Return false for invalid input selectors', () => {
        expect(checkAnswer('not a selector')).toBe(false);
        expect(checkAnswer('.invalid.selector')).toBe(false);

        expect(checkAnswer("-1")).toBe(false);
        expect(checkAnswer(levels.length.toString())).toBe(false);
    });

    it('Return false if user answer is wrong', () => {
        const TEST_LEVEL = 0;

        const answer = 'deathstar';
        const result = checkAnswer(answer, TEST_LEVEL);

        expect(result).toBe(false);
    });

    it('Return true if user answer is right', () => {
        const TEST_LEVEL = 0;

        const answer = 'vader';
        const result = checkAnswer(answer, TEST_LEVEL);

        expect(result).toBe(true);
    });

    it('Return true on every right selector', () => {
        const TEST_LEVEL = 2;

        const answer1 = 'vader';
        const answer2 = 'deathstar vader';

        const result1 = checkAnswer(answer1, TEST_LEVEL);
        const result2 = checkAnswer(answer2, TEST_LEVEL);

        expect(result1).toBe(true);
        expect(result2).toBe(true);
    });

});

describe('Check that preconfig answers are correct', () => {
    test.each(Array.from({ length: levels.length }, (_, i) => i))('Level %i', () => {
        const TEST_LEVEL = 0;

        const answer = levels[TEST_LEVEL].selector;
        const result = checkAnswer(answer, TEST_LEVEL);

        expect(result).toBe(true);
    });
});
