---
title: Setup TypeScript
uuid: hal2uva
---

# Setup in your Node.js project

```bash
# Locally in your project.
npm install -D typescript
npm install -D ts-node

# Depending on configuration, you may also need these
npm install -D tslib @types/node
```

setup nodemon in `package.json`

```json
{
 "scripts": {
    "dev": "run-p watch:*",
    "build": "tsc",
    "watch:ts": "tsc -w",
    "watch:serve": "nodemon ./dist/server.js"
  },
}
```

setup `tsconfig.json` via https://www.typescriptlang.org/tsconfig

```json
{
  "compilerOptions": {
    "target": "es2017",
    "outDir": "dist",
    "rootDir": "src",
    "moduleResolution": "node",
    "module": "commonjs",
    "declaration": true,
    "inlineSourceMap": true,
    "esModuleInterop": true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */,
    "lib": ["es2017", "dom"],
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules/**"]
}
```

# Run Globally without install

```bash
# Run ts file directly, for development
$ npx ts-node ./index.ts


# Compile ts file, for production
$ npx tsc ./index.ts
# Output will be index.js
```

# Install

```bash
# Or globally with TypeScript.
npm install -g typescript
npm install -g ts-node
```

## Run

```bash
# Run ts file directly, for development
$ ts-node ./index.ts

# Compile ts file, for production
$ tsc ./index.ts
# Output will be index.js
```

# Read More
- https://www.npmjs.com/package/ts-node
- https://www.typescriptlang.org/docs/
