---
title: "Frontend developer interview guide"
summary: "An opinionated guide on creating a good frontend/javascript interview process. This especially applies to companies with highly complex applications and systems."
desc: ""
updated: 2023-07-11
img: './covers/vercel.png'
draft: true
---

## What makes a good frontend developer?

**A full-stack developer.**
Yes, seriously. I find that purely frontend developers lack experience with core programming concepts, and often struggle to work on complex applications. Many frontend developers are self-taught, or have forgotten core programming concepts from college or previous work. By core programming concepts I mean things like data structures, design patterns, understanding of how databases work, etc.

**Someone who has solid understanding of typescript/javascript, the browser, and HTTP concepts**
Don't prioritize finding a candidate that has experience with the framework and libraries you use (i.e. react, tailwind). Prioritize finding a candidate that knows how the basics work. A good developer will be able to pick up any framework and library relatively quick.

## The technical questions

Junior developers are more likely to study for interviews than senior developers, and can sometimes do better on "common" technical questions.

### Bad question examples

**Explain variable hoisting in javascript.**
In modern code, developers aren't concerned with this anymore and might not remember it.

## Coding on a whiteboard

This is like asking someone to do long division when they have used a calculator since middle school. All developers use modern IDEs with code completion, stack overflow, and recently AI. When I ask the candidate to code on a whiteboard, I allow sudo-code or am very lenient on syntax errors. It is the concept that matters, not the fine details.

But I prefer to pair with the candidate on a computer, because it is a much more comfortable situation.

## Some interview topics

* Explain some REST authentication concepts? Cookies, Auth token, etc.
* Explain the difference between server-side rendering, client-side rendering, hybrid rendering, and static generation?
  Iframes? How do you communicate between frames? window.postMessage.
* What is CORS? How do you allow cross site requests? (OPTIONS request)
* Difference between session storage, local storage, and indexed DB? What are performance differences?
* What are service workers?
* Explain how websockets work? When are they used?
* How does browser caching work? How do ETags work?

* What are the differences between interface and type in typescript?
* Explain what generics are (in typescript or other language) and why they are useful?
* Difference between const and let? Can you push to an array declared as const? Why?

## Some example problems

### Nested loop array matching

In this example, we will need to mass update records in an array. The simplest code to make this work will require a nested loop, and therefore be `O(n^2)`. This is fine if the number of records is expected to be small. So if the candidate uses this method, ask about performance if the record list is extremely large, and how it could it be improved to `O(n)`.

```typescript
type Item = { id: string; name: string; age: number; }

const allRecords: Item[] = [
  {id: 'a21-01', name: 'John', age: 24},
  {id: 'a19-12', name: 'Alice', age: 33},
  ...
];

const updateRecords = (updates: Partial<Item>[]) => {
  // update records in allRecords by matching ID
};
```
