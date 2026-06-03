import { react } from "@qeetrix/eslint-config";

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/.source/**",
      "**/dist/**",
      "**/build/**",
    ],
  },
  ...react,
];
