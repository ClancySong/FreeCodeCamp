module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "node": true,
        "mocha": true
    },
    "globals": {
        "Babel": true,
        "React": true
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "global-require": "off",
        "import/no-unresolved": "off",
        "no-underscore-dangle": "off",
        "no-new-func": "off",
        "no-param-reassign": "off",
        "react/prefer-stateless-function": "off",
        "react/no-multi-comp": "off",
        "react/jsx-no-bind": "off",
        "react/jsx-indent": "off",
        "react/jsx-first-prop-new-line": "off",
        "react/jsx-filename-extension": "off",
        "no-restricted-syntax": "off",
        //  自定义微调规则
        //  强制使用一致的缩进
        "indent": ["error", 4],
        //  强制使用一致的换行符风格
        "linebreak-style": ["error", "windows"],
        //  要求或禁止文件末尾保留一行空行
        "eol-last": ["error", "never"],
        //  强制行的最大长度
        "max-len": ["error", 1000],
    }
};