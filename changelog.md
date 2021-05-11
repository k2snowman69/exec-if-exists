# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.0.3]

- Fixed globally installed packages incorrectly being picked up

## [3.0.2]

- Fixed `TypeError: dest.end is not a function`

## [3.0.1]

- Fixed output no longer being emitted to console

## [3.0.0]

- Breaking
  - Renamed export execSync to execIfExists and turned it into a promise
  - Minimum node version 8.10.0

## [2.0.2]

- Removed tslib as a dependency

## [2.0.1]

- Fixed wrong application being executed

## [2.0.0]

Breaking:

- Moved away from `npm-which` and now run `npx` instead
- Simplified exports from `ExecIfExists.run` to just `execSync` to match up with node
- Added types
- Cleaned up publish output

## [1.0.1]

- Fixed bad cli reference

## [1.0.0]

- First release
