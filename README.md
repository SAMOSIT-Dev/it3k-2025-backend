# It3k-2025-Backend

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>


## Installing NX Command-CLI
```sh
npm add --global nx@latest
```

## Installing Application (Service)

before install service, go to ```apps``` folder.
```sh
nx g @nx/express:application <service_name>
```

## Installing Library (Share with others service)
To generate a new library (use once):
```sh
nx g @nx/node:lib libs or
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

## Running Tasks (Hot-Reloading)

To run a single task:
```sh
nx serve <service_name>
```
To run multiple tasks:
```sh
nx run-many -t serve -p <service_1>,<service_2>
```
To run a single task with port specification:
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

