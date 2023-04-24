# 2023 Full Stack Frontend Repository

## Web application IDE

## Demo
Here is the live [demo](https://web-code-editor-sage.vercel.app/) of the application

## How to run
```
git clone
yarn 
yarn run dev
```

## Prerequisite

- Node JS > 14
- yarn or npm
- React


## Architecture
The repository structure is explained as follows - 

- **pages** contain the routes or web pages application contains
- **components** contain the wrapper or root code for each page 
- **modules** contain reusable codebases or packages throughout the application utils contain the third-party configurations, colours, themes
- **redux** contains state management it can be anything

## Repository Flow
We have one home page containing the sidebar with the repository tree and the body containing the files the developer has opened.

2 sections in the home page so inside the components directory we have the entire home page codebase. It contains a sidebar that is called as DirectoryViewSidebar present in the modules directory. DirectoryViewSidebar is the sidebar containing the repository tree defined as DirectoryTree present inside the modules directory.

Most of the reusable codebase will be defined inside modules directory to make it accessible in the entire repository.

## Themeing
In order to follow a single theme throughout the application, I've defined the predefined colours from tailwind css inside utils/config directory. 

Every developer providing any type of colour should import colors from the utils directory in order to avoid consistency in the repository.

In future, we just have to change the colours inside `config` directory to change the theme of the entire application.

## Testing
Currently, no testing directory or codebase is added. 

I've compile the code into smaller chunks for 2 reasons: to make it reusable and to add unit and integration testing easily in future.

For example, we can easily write test cases separately for the DirectoryTree component containing the repository file structure making it reusable and easy to write test cases.

## Tech Stack
- Next JS
- React JS
- Tailwind CSS
- Material UI 
- Redux Toolkit
- React Icons

## Suggestions & Best practises
Tailwind and Material UI is the developer choice but as far as I knowledge using both together provides a better developer experience. Of course, we can prefer Mantine dev with Tailwind CSS as it makes it easier to customise UI components using tailwind css inline styles.

Still more best practices can be followed to make repository perfect and scalable.
- Naming conventions can be more self-explanatory
- More reuse methods can be segregated in one place 
- Env configurations for dev and prod environment to make development a cakewalk
- Performance optimisation by avoiding re-rendering of file structure 



