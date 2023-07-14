---
title: "Code formatting and linting"
summary: "An opinionated look at formatting, linting, and other code management techniques"
desc: ""
updated: 2023-07-11
img: './covers/vs.png'
draft: true
---

## Automatic code formatting

There are various tools that automatically format your code on file save or commit, including the IDEs themselves and libraries like prettier. I think having some consistent formatting is necessary, like spaces vs tabs or the number of spaces to indent. But I will argue that having too many code formatting rules is more annoying than it is helpful.

Code readability is very important to me, and sometimes it is necessary to break strict code formatting rules in order to have the code more readable.

```javascript
example
```

## Code linting

There are various code linting libraries out there, including the IDE itself. Just like strict formatting rules, I would again argue against strict linting rules. Unless your writing a library API, there isn't a need to enforce types on all variables. Modern IDEs will infer types quite easily. Good developers don't need strict linting rules, and it can weigh down development, especially during a prototyping phase.

## Comments vs Self Documenting code

Comments should be kept to a minimum, prioritizing self-documenting code. Of course comments should be included if there is anything happening in the code that is not obvious, or any warnings for future developers.
