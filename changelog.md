### Unreleased

- Breaking
  - Renamed export execSync to execIfExists and turned it into a promise
  - Minimum node version 8.10.0

### 2.0.2

- Removed tslib as a dependency

### 2.0.1

- Fixed wrong application being executed

### 2.0.0

Breaking:

- Moved away from `npm-which` and now run `npx` instead
- Simplified exports from `ExecIfExists.run` to just `execSync` to match up with node
- Added types
- Cleaned up publish output

### 1.0.1

- Fixed bad cli reference

### 1.0.0

- First release
