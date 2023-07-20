---
title: "Frontend developer interview guide"
summary: "An opinionated guide on creating a good frontend/typescript interview process. This especially applies to companies with highly complex applications and systems."
desc: "An opinionated guide on creating a good frontend/typescript interview process. This especially applies to companies with highly complex applications and systems."
updated: 2023-07-11
img: './covers/vercel.png'
draft: true
---

## What makes a good frontend developer?

**A full-stack developer.**
Yes, seriously. Full-stack developers tend to have a much better understanding of core programming concepts like data structures, design patterns, database performance, etc. They also have an easier time understanding complex enterprise applications, and can jump into a new system or tech stack a lot faster.

**Someone who has solid understanding of typescript/javascript, the browser, and HTTP concepts.**
Don't prioritize finding a candidate that has experience with the framework and libraries you use (i.e. react, tailwind). Prioritize finding a candidate that knows how the basics work, and has experience with many different technologies. A good developer will be able to pick up new frameworks and libraries relatively quick.

## Technical "conversations"

I am calling them conversations instead of questions, because I try to refrain from one-way quizzing of candidates. Flowing questions into conversations and making it a two-way conversation makes the candidate more comfortable, more willing to share openly about knowledge and experience, and less afraid of making mistakes.

Another problem with "common" technical questions is that Junior developers are more likely to study for interviews than senior developers, and can sometimes do better on this part of the interview, depending on the quality of questions that are asked.

## Some conversation topics

* Can you push to an array declared as const? Why?
* Generics (in typescript or other languages) and when they are useful.
* Typescript Linting and code formatting preferences. How strict they should be.
* CI processes in past projects
* REST authentication concepts - Cookies, JWT, etc.
* Differences between server-side rendering, client-side rendering, hybrid rendering, and static generation. 
* Iframes. In what situations are they still useful. How do you communicate between windows?
* CORS. How do you allow cross site requests? (OPTIONS request)
* Difference between session storage, local storage, and indexed DB? What are performance differences?
* Service Workers, Web sockets, Server Push
* Browser Caching, E-Tags, other caching strategies

## Coding Problems

### Coding on a whiteboard

I prefer to pair with the candidate on a computer, because it is a much more comfortable situation than standing at a whiteboard with people critiquing you. But if multiple people want to be involved with the interview, or pairing isn't an option, here is my take on whiteboard coding:

Coding on a whiteboard is something we do occasionally (meetings and design sessions). But do we ever write full code with proper syntax? Most likely not. We write sudo-code to get a concept across to other people. So when I ask a candidate to code on a whiteboard, I allow sudo-code or am very lenient on syntax errors. It is the concept that matters, not the fine details. Developers use modern IDEs with code completion, stack overflow, and recently AI, so they are not accustomed to writing syntax-complete code on a whiteboard.

### Nested loops and performance enhancements

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

### Recursion and working with trees

The ability to solve a simple problem that requires recursion is a good way to weed out frontend devs that have experience with websites or simple apps, but do not have a good programming foundation.

In this example, we need to update the fileCount property of each folder, which should equal the number of files the folder contains, including the children's children and so on (deep count).

```typescript
type File = {name: string; fileType: string;};
type Folder = {name: string; children: (File | Folder)[]; fileCount?: number };

const rootFolder: Folder = {
    name: 'root',
    children: [...]
}

const updateChildCounts = () => {
  // update fileCount for all folders in the tree
};
```
