import { checkAnswer, levels } from "..";


// Tests that the function sets the current level to the user answer minus level step if the answer is a number within the level range

// Check invalid selectors and levels more and less then levels length
it('test_returns_false_for_invalid_input', () => {
    expect(checkAnswer('not a selector')).toBe(false);
    expect(checkAnswer('.invalid.selector')).toBe(false);

    expect(checkAnswer("-1")).toBe(false);
    expect(checkAnswer(levels.length.toString())).toBe(false);
});

