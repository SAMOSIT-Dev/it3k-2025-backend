# It3k-2025-Backend

## Project Structures Example
```sh
.
└── apps/
    ├── service-name/
    │   ├── assets
    │   └── src/
    │       ├── app/
    │       │   └── app.ts
    │       ├── controllers/
    │       │   └── example.controller.ts
    │       ├── routes/
    │       │   └── example.route.ts
    │       ├── middlewares/
    │       │   └── example.middleware.ts
    │       ├── database /
    │       │   └── dabase.ts
    │       ├── model/
    │       │   ├── example1.model.ts
    │       │   └── example2.model.ts
    │       ├── utils/
    │       │   └── utils.ts
    │       ├── logs /
    │       │   └── logs.log
    │       └── main.ts
    ├── service-name-e2e
    └── libs
```
- app: application configuration & APIs entry points.
- controllers: handle requests and responses with functions.
- routes: defines the API endpoints.
- middleware (optional): up to service.
- database: connect to database and get database instance.
- model: storing types for using in a service, e.g. database model, req model, res model, and so on.
- utils: utility functions.
- logs (optional): if need to log requests and responses.
- main.ts: run server.

## Running Service
```sh
npm run dev:service-name
```
1. dev:admin
2. dev:football
3. dev:basketball
4. dev:badminton
5. dev:pingpong
6. dev:athletics

## Start With MySQL On Docker
Go to apps/service-name, start build and run container:
```sh
docker compose build mysql && docker compose up mysql
```
Or run with unless log:
```sh
docker compose build mysql && docker compose up -d mysql
```
Then you can go to MySQL Workbench and connect database in container:
- host: localhost or 127.0.0.1
- username: root
- port: 3307
- password: password

## With NX
<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>


## Installing NX Command-CLI
```sh
npm add --global nx@latest
```

## Building Tasks
To build a single task:
```sh
nx build <service_name>
```
To build a single taks wiht configuration:
```sh
nx build <service_name> --prod 
```
To build multiple tasks:
```sh
nx run-many -t build -p <service_1>,<service_2>
```
To build all tasks:
```sh
nx run-many -t build
```

## Running Tasks

To run a single task:
```sh
nx serve <service_name>
```
To run multiple tasks:
```sh
nx run-many -t serve -p <service_1>,<service_2>
```


## Showing Tasks
To see all available targets to run for a project:
```sh
nx show project <service_name>
```
To show all services:
```sh
nx show projects
```

## Testing Tasks
To test a single task:
```sh
nx test <service_name>
```
To test a single task with watch mode:
```sh
nx test <service_name> -w
```
To test a single task with coverage:
```sh
nx test <service_name> --coverage
```
To test mutiple tasks:
```sh
nx run-many -t test -p <service_1>,<service_2>
```
To test all tasks:
```sh
nx run-all -t test
```
To build and test multiple tasks:
```sh
nx run-many -t build test -p <service_1>,<service_2>
```
To build and test all tasks:
```sh
nx run-many -t build test
```

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/nx-api/express?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
