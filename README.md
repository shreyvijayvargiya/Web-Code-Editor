# Web application IDE

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
We can modify the architechture in future according to our need/requirements and all we need is to take care of entire developer experience and developer 
flow for our repository as it should not be hindered.

## Repository Flow
We have one home page containing the sidebar with the repository tree and the body containing the files the developer has opened.

2 sections in the home page so inside the components directory we have the entire home page codebase. It contains a sidebar that is called as DirectoryViewSidebar present in the modules directory. DirectoryViewSidebar is the sidebar containing the repository tree defined as DirectoryTree present inside the modules directory.

Most of the reusable codebase will be defined inside modules directory to make it accessible in the entire repository.

## Themeing
In order to follow a single theme throughout the application, I've defined the predefined colours from tailwind css inside utils/config directory. 

Every developer providing any type of colour should import colors from the utils directory in order to follow consistency in the repository.

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
Tailwind and Material UI is the developer choice but as far as in my knowledge using them together provides a better developer experience. We can prefer Mantine dev with Tailwind CSS as it makes it easier to customise UI components using tailwind css inline styles.

Redux is a good choice for large size application because of caching, persisted data and large community.

Still more best practices can be followed to make repository perfect and scalable.
- Naming conventions can be more self-explanatory
- More reuse methods can be segregated in one place 
- Env configurations for dev and prod environment to make development a cakewalk
- Performance optimisation by avoiding re-rendering of file structure 

For drag and drop functionality I'll personally prefer react dnd npm package because of large community. I've experience with react dnd and this is the demo project, I didn't get much time otherwise would have added drag drop also.

Lastly, some code might be commented one because I was adding delete file/folder functionality along with a Dialog asking developer for confirmation to remove file/folder. 


