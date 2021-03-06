module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/airbnb"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    quotes: [0, "double"],
    "arrow-parens": [2, "as-needed", { requireForBlockBody: false }],
    "comma-dangle": [2, "never"],
    "arrow-body-style": 0,
    "prefer-default-export": 0,
    "prefer-template": "off",
    indent: ["off", 2],
    "object-curly-newline": "off",
    "object-shorthand": 0,
    "prefer-destructuring": 0
  }
};
