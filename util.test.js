const { generateText } = require('./util');

//unit tests
test('should output age and name', () =>{
    const text = generateText('Max', 29);
    expect(text).toBe('Max (29 years old)');
    const text2 = generateText('Anna', 20);
    expect(text2).toBe('Anna (20 years old)');
});

test('should output data-less text', () => {
    const text = generateText('', null);
    expect(text).toBe(' (null years old)');
})

test('should output data-less text', () => {
    const text = generateText();
    expect(text).toBe('undefined (undefined years old)');
})

