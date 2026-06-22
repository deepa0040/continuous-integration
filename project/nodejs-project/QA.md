Learn JS: https://www.w3schools.com/js/js_intro.asp
Learn Nodejs: https://www.w3schools.com/nodejs/

*Ques 1: What is nodejs?*

Link: https://www.youtube.com/watch?v=ohIAiuHMKMI&list=PLinedj3B30sDby4Al-i13hQJGQoRQDfPo
* NodeJs is not a framework or library, its just a Runtime environment for javascript.
* JavaScript is a language. It needs an engine to run its code, and that engine is available in all web browsers. But there was a limitation: JavaScript was effectively locked inside the browser, so you couldn't easily run it on a server or your local machine's operating system. Node.js provides the environment outside the browser to run JavaScript code

It is a common point of confusion, but the distinction is actually quite simple: **JavaScript is the language**, and **Node.js is the tool that lets that language run on your computer.**

To understand how they work together, it helps to think of them in terms of "rules" vs. "environment."

---

### Breaking Down the Concepts

#### 1. JavaScript (The Language)

JavaScript is the "code" you write. It defines the logic, variables, loops, and functions. By itself, it is just a set of instructions. It needs an "engine" to actually read those instructions and perform the tasks.

* In the early days, the only place you could run this code was inside a **Web Browser**.
* The browser has its own engine (like V8 in Chrome) that understands JavaScript and allows it to interact with the webpage (the DOM).

#### 2. Node.js (The Environment)

Node.js is an environment built on top of the **Google Chrome V8 engine**. It takes that same JavaScript engine and brings it *out* of the browser, onto your desktop or server.

* When you run code with Node.js, it isn't trying to change a website's background color or show a pop-up alert (things browsers do).
* Instead, Node.js gives JavaScript **new powers** that browsers don't give it:
* **File System Access:** Reading and writing files on your hard drive.
* **Networking:** Creating servers, handling HTTP requests, and talking to databases.
* **Operating System Interaction:** Accessing system resources.



### Why this matters

Because of Node.js, you can use the **same language (JavaScript)** for the entire stack:

* **Frontend:** JavaScript runs in the browser to make the website interactive.
* **Backend:** JavaScript runs in Node.js on the server to handle the database, authentication, and API logic.

This creates a seamless "JavaScript everywhere" ecosystem, which is why Node.js has become so popular in professional development.

---

*Ques 2: We can run our code without package.json. So why do we need this and how its created?*

It is true that Node.js can execute individual JavaScript files without a `package.json` file. However, as your projects grow in complexity, `package.json` becomes essential for managing dependencies, project metadata, and automation.

---

### Why do you need `package.json`?

Think of `package.json` as the **"passport" and "instruction manual"** for your project. Without it, you are limited to using built-in Node modules. You need it for:

* **Dependency Management:** It tracks which third-party libraries (like Express, Lodash, or Mongoose) your project requires. Without it, you cannot easily share your code or deploy it to a server, as you wouldn't have a reliable way to install the correct versions of your dependencies.
* **Scripts:** You can define shortcuts (e.g., `"start": "node app.js"`) to run complex commands consistently.
* **Metadata:** It stores essential information like the project version, author, license, and entry point.
* **Versioning:** It ensures that every developer on your team (or the production server) is running the exact same version of every library, preventing the "it works on my machine" problem.

---

### How to Create `package.json`

#### 1. Automatically (The Standard Way)

This is the most common method. Open your terminal in your project folder and run:

```bash
npm init -y

```

* The `-y` flag tells npm to accept all default settings, generating a standard `package.json` file immediately.

#### 2. Manually

You can create a file named `package.json` in your root directory and write the JSON yourself. This is rarely done from scratch but is useful when you need to customize specific fields.

```json
{
  "name": "my-awesome-project",
  "version": "1.0.0",
  "description": "A description of what this project does",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "author": "Your Name",
  "license": "ISC"
}

```

---

### Industry Standards & Corporate Procedures

In professional environments, the `package.json` file is considered a critical piece of infrastructure. Here is the standard procedure companies follow:

1. **Strict Source Control:** The `package.json` is always committed to Git. The `node_modules` folder, however, is **never** committed (it is added to `.gitignore`).
2. **`package-lock.json`:** When you install a package, a `package-lock.json` file is generated automatically. Organizations **always** commit this file. It locks the exact versions of your dependencies and their sub-dependencies, ensuring total consistency across all environments.
3. **Automation:** CI/CD pipelines (like GitHub Actions, Jenkins, or GitLab CI) use `package.json` to automatically install dependencies (`npm ci` or `npm install`) and run test scripts before deploying the application.
4. **Semantic Versioning (SemVer):** Companies use the version fields to track updates and ensure that library updates don't break the application.

**The Bottom Line:** If you are building anything beyond a "Hello World" script or a small practice exercise, a `package.json` is mandatory. It is the bridge between a collection of files and a professional, maintainable software project.

---

Ques 2: What is the difference between package.json & package-lock.json.

package.json=> it contains information about project metadata, dependency & it stores the instructions on how to run your tests. Its created either manually or through the command npm init

package-lock.json=> This is created when we already have app code & package.json ready. When you run npm install to install dependency, npm automatically generates the lock file. This file is auto-generated by npm every time you add, update, or remove a package. You should never edit this file manually.

**What it contains:** The exact, specific version of every package installed, including the versions of all "dependencies of dependencies" (transitive dependencies).

**The Goal:** It creates a "locked" version of your entire dependency tree. This ensures that if you send your project to a colleague or deploy it to a server, they install the exact same byte-for-byte version of every single library you are using.

**Machine-Readable:** It is massive and intended for npm to read, not humans.


#### **The Golden Rule for Organizations**

In a professional environment, the procedure is simple:

- Always commit both files to your Git repository.

- Never manually change package-lock.json.

When deploying to production, use `npm ci` (Clean Install) instead of `npm install`. `npm ci` strictly follows the package-lock.json and will fail if the lock file doesn't match your package.json, ensuring your production environment is 100% predictable.

---

*Ques 3: How to take user input in interactive terminal & How to pass input in Non-interavtive via command line argument?*

**Interactive:** I want the user to type while the program runs, program will wait for user input and then continue to run

*USE: readline.* 

<u>**Example file:** continuous-integration/project/nodejs-project/p1-student-grade-calculator/app.js </u>

**How it works**
- import *readline* 
- readline.createInterface({ input: process.stdin, output: process.stdout })
- rl.question("prompt", callback) pauses and waits for the user to type.
- When you type and press Enter, the callback runs.

**Non-interactive Via Command Line Arguments :** Pass argument in the command that is call to run your code

example: node app.js --name Deepa --math 90 --science 80 --english 70

*Use: process.argv*

<u>Example file: continuous-integration/project/nodejs-project/p1-student-grade-calculator/app-cli.js </u>

**How to do it**
* process.argv contains:
  - node
  - app.js
  - then your args like --name, Deepa, etc.

* You parse those args and calculate.