module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "airbnb",
    "prettier",
    "plugin:react/jsx-runtime",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },

  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "import/no-unresolved": "off",
    "react/function-component-definition": [
      2,
      {
        namedComponents: ["arrow-function", "function-declaration"],
        unnamedComponents: "arrow-function",
      },
    ],

    "no-unused-expressions": ["error", { allowTernary: true }],
    "spaced-comment": 0,
    "default-param-last": 0,
    "react/destructuring-assignment": 0,
    "react/prop-types": 0,
    "no-plusplus": 0,
    "no-new": 0,
    "react/forbid-prop-types": 0,
    "react/require-default-props": 0,
    "import/core-modules": 0,
    "no-use-before-define": 0,
    "no-param-reassign": 0,
    "no-return-await": 0,
    "import/no-extraneous-dependencies": 0,
    "import/order": 0,
    "import/no-cycle": 0,
    "no-unneeded-ternary": 0,
    "no-ternary": 0,
    "import/prefer-default-export": "off",
    "import/no-default-export": "off",
    "react/jsx-props-no-spreading": "off",
    "no-nested-ternary": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/interactive-supports-focus": "off",
    "no-underscore-dangle": "off",
    "react/no-array-index-key": "off",
    "arrow-body-style": "off",
  },
};
