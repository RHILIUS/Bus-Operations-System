import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  {
    ignores: ["app/generated/**"], // Ignore Prisma generated files
  },
  // Add custom rules
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // or "warn", or use the pattern-based config below
    },
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];
