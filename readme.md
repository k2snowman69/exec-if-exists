# exec-if-exists

Runs an npm package if it exists

# Usage

```
exec-if-exists sortier ./src/**/*.ts
```

# How's it work

Basically we use `npm-which` to figure out what the package we're supposed to execute.

If we don't find it, we exit gracefully.
If we find it, we run it.

# Why?

Snowcoder's has a [shared lint-staged config](http://github.com/snowcoders/renovate-config) which we wanted an opt in system for triggering scenarios on commit. The reason for this is we didn't want to edit 15+ different lint-staged configs all at once, but just a single one in a single location and let greenkeeping tools update automatically.

Do we expect you to be as automated as us? Of course not, but it made our lives easier so we figured we'd show it off :-)
