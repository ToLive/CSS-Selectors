/** Разрешенные импорты (для сортировки) */
const ALLOWED_PATH_GROUPS = ["pages/**", "features/**", "entities/**", "shared/**"].map(
    (pattern) => ({
        pattern,
        group: "internal",
        position: "after",
    }),
);

/** Для запрета приватных путей */
const DENIED_PATH_GROUPS = [
    // Private imports are prohibited, use public imports instead
    "app/**",
    "pages/*/**",
    "features/*/**",
    "entities/*/**",
    "shared/*/*/**", // Для shared +1 уровень, т.к. там чаще мы обращаемся к конкретной библиотеке/компоненты
    // Prefer absolute imports instead of relatives (for root modules)
    "../**/app",
    "../**/pages",
    "../**/features",
    "../**/entities",
    "../**/shared",
];

module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
    ],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
        project: './tsconfig.eslint.json',
    },
    plugins: ['@typescript-eslint'],
    root: true,
    rules: {
        'import/extensions': 'off',
        'import/prefer-default-export': 'off',
        'no-magic-numbers': ['error'],
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/array-type': [
            'error',
            {
                default: 'array',
            },
        ],
        '@typescript-eslint/explicit-member-accessibility': [
            'error',
            {
                accessibility: 'explicit',
                overrides: {
                    accessors: 'explicit',
                    constructors: 'off',
                    methods: 'explicit',
                    properties: 'explicit',
                    parameterProperties: 'explicit',
                },
            },
        ],
        'max-lines-per-function': ['error', 80],
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/no-unnecessary-type-assertion': 'error',
        '@typescript-eslint/no-non-null-assertion': 'error',
        'no-debugger': 'off',
        'no-console': 0,
        'class-methods-use-this': 'off',
        "import/no-extraneous-dependencies": "off",
        "import/order": [
            2,
            {
                pathGroups: ALLOWED_PATH_GROUPS,
                pathGroupsExcludedImportTypes: ["builtin"],
                groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
            },
        ],
        "no-restricted-imports": [
            2,
            {
                patterns: DENIED_PATH_GROUPS
            }
        ],
    },
};
