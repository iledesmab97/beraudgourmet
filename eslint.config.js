// eslint.config.js
const jsConfig = {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        globals: {
            window: "readonly",
            document: "readonly",
        },
    },
    plugins: {
        react: require("eslint-plugin-react"),
    },
    settings: {
        react: {
            version: "detect",
        },
    },
    rules: {
        "react/prop-types": "off",
        // Add your custom rules here
    },
};

module.exports = [jsConfig];
