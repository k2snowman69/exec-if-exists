# exec-if-exists

Runs an npm package (e.g. `npm exec`) only if it exists locally (e.g. in node_modules). The default `npx` command will run packages found both locally and globally and if the package doesn't exist throw an error.

# Usage

```shell
exec-if-exists sortier ./src/**/*.ts
```

# Why?

Maintaining a shared config but allowing opt-in dev tooling. Take the following example lint-staged config:

```javascript
// Example lint-staged config
{
  // Javascript based source code files
  "**/*.@(?([cm])[jt]s)?(x)": [
      // Required tooling
      "eslint --fix",
      "prettier --write --ignore-unknown",

      // Recommended tooling
      "exec-if-exists sortier --ignore-unknown"
  ]
}
```

Now any time a commit is pushed:

1. eslint and prettier will run and if they are not installed the commit will fail
1. sortier, because it's running through exec-if-exists, on the other hand is optional, and only runs if it's installed allowing some flexibility to the consumers of the shared config

The benefit is you can document in a single location

- optional tooling you maybe testing to making required in the future
- optional tooling that people have suggested that may benefit others

Either way it allows easy opt-in to tooling without having to change a shared configuration file.

Finally, you can now use that shared config:

```javascript
const configs = require("@snowcoders/renovate-config");

module.exports = configs.lintStaged;
```
