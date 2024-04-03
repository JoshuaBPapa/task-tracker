# Task Tracker

A full stack project management web application built with Angular, PrimeNG, Node, Express, and MySQL. Users can create a team to manage projects, tasks, and other users. Tasks are managed in projects by changing their status, priority, and by posting comments. Users are given an authorisation level to determine their CRUD permissions. Authentication handled using JSON Web Tokens.

**Demo**: https://task-tracker-77112.web.app

## User Guide
When a user signs up or creates a demo team, they can create other users linked to their team. These newly created users will then be able to login using the team name and given username & password. 

### CRUD Permissions
Created users can be given different levels of authorisation which restricts them to certain actions. Admin users have full access, meaning they can create, edit, update, and delete all items in a team (users, projects, and tasks). Project managers also have the same level of access apart from modifying users. Project managers and admins can assign tasks to users of the team. Basic users only have the authorisation to edit tasks assigned to them.

### Creating a Team  
This can be done by signing up with a new account or by clicking the "Use a Demo Team" button on the login / sign up page.

### Creating a Project  
Before tasks can be created, they must be assigned to a project. Creating a project can be done by navigating to the projects page and then clicking the "Create Project +" button. Upon creation, you will be redirected to the project’s details page. A project can be edited or deleted on its details page.

### Creating a Task  
Tasks are created by navigating to the tasks page and then clicking the "Create New Task +" button. Upon creation, you will be redirected to the task’s details page. A task can be edited or deleted on its details page. Comments are also added to a task on its details page.

A new task can be quickly created for a specific project by going to the project's details page and then clicking the "Create New Task +" button. The "Create Task" modal will show with the "Project" input prefilled with the selected project.

By following similar instructions, a new task can also be quickly assigned to a user. This is done by going to the user's details page and then clicking the "Assign New Task +" button. The "Create Task" modal will show with the "Assigned User" input prefilled with the selected user. 

### Creating a User  
Users are created by navigating to the users page and then clicking the "Create New User +" button. Upon creation, you will be redirected to the user’s details page. A user can be edited or deleted on its details page.

### Deleting a Team  
Only the master admin has access to this function. They can delete a team by navigating to the delete team page and then clicking the "Delete Team" button.

## Screenshots

![Auth Screen](https://i.imgur.com/1gofwpC.png)
![Dashboard](https://i.imgur.com/0MjVBo8.png)
![Project Details Page](https://i.imgur.com/4WPGe5b.png)
![Create Task Modal](https://i.imgur.com/fdRaEWe.png)
![User Details Page](https://i.imgur.com/rMbZRHo.png)
