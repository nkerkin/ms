# MSTTS - Mine Site Truck Tracking System



### Build Dependencies
 - Node (via [NVS](https://github.com/jasongin/nvs))
 - [Angular CLI v20](https://angular.dev/installation) 
 - [VSCode](https://code.visualstudio.com/)  (Optional)

### Key Additional Package Dependencies
- [Tailwind CSS](https://tailwindcss.com/)




## Features
1. Simple Map Display
- Display a simple 2D canvas or div-based map (1000x800px coordinate system)
- Show 2 static zones:
  - Loading zone (top-left, marked with distinct color)
  - Dump zone (bottom-right, marked with distinct color)
- No zoom/pan needed - keep it simple

2. Truck Display
- Display 1 truck on the map (Added another :D)
- Each truck shows:
  - ID (e.g., T-001)
  - Status with color coding:
    - LOADING (Orange)
    - HAULING (Green)
    - DUMPING (Blue)
    - IDLE (Gray)
  - Speed (km/h)
  - Represent trucks as colored circles or simple SVG icons.

3. Real-Time Simulation
- Use RxJS interval to update truck data every 2 seconds
- Generate random position changes (trucks should generally move between loading
and dump zones)
- Randomly change status based on position
- Simple position updates - no complex pathfinding needed




## Development

### Development server

To start a local development server, run:

```bash
yarn start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

### Building

To build the project run:

```bash
yarn build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

### Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
yarn test
```



## Build Log (Windows)
Install dependencies
```sh
$ winget install jasongin.nvs # nvs
$ nvs add lts && nvs use lts # node 
$ winget install Microsoft.VisualStudioCode # VS Code
```

Verify dependencies
```sh
$ node -v && ng --version && code -v
v24.11.1
20.3.10
1.106.0
ac4cbdf48759c7d8c3eb91ffe6bb04316e263c57
x64
```

Generate new Angular 20+ project
Very simple project, so no SSR or Routing required. We'll be using tailwind, so just stick to plain CSS. Prefix components with `ms`
```sh
 $ ng new mstts --package-manager yarn --prefix ms --ssr false --routing false --inline-style true --inline-template --interactive false
```

Verify Git initialized and new project commit
```sh
$ cd mstts
$ git status && git log

On branch master
nothing to commit, working tree clean
commit 2b8cad088cfdfc05dfdd8eeaead08423aff86af4 (HEAD -> master)
```

Enable Yarn Stable via CorePack
```sh
$ corepack enable && corepack yarn set version stable && yarn
$ yarn -v
YN0000: · Yarn 4.8.1
```

Verify `build` script
```sh
 $ yarn run build
Initial chunk files   | Names         |  Raw size | Estimated transfer size
main-2EZ2W5QI.js      | main          |  95.02 kB |                28.47 kB
polyfills-5CFQRCPP.js | polyfills     |  34.59 kB |                11.33 kB
styles-5INURTSO.css   | styles        |   0 bytes |                 0 bytes

                      | Initial total | 129.61 kB |                39.81 kB

Application bundle generation complete. [1.881 seconds] - 2025-11-16T03:41:24.634Z

Output location: C:\Users\neil\dev\mstts\dist\mstts

```

Verify `start` script
```sh
$ yarn run start
Initial chunk files | Names         | Raw size
main.js             | main          |  2.22 kB |
polyfills.js        | polyfills     | 95 bytes |
styles.css          | styles        | 95 bytes |

                    | Initial total |  2.41 kB

Application bundle generation complete. [0.660 seconds] - 2025-11-16T03:42:00.378Z

Watch mode enabled. Watching for file changes...
NOTE: Raw file sizes do not reflect development server per-request transformations.
  ➜  Local:   http://localhost:4200/
```

Verify landing page
```sh
$ curl localhost:4200
<!doctype html>
<html lang="en">
<head>
  <script type="module" src="/@vite/client"></script>

  <meta charset="utf-8">
  <title>Mstts</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="stylesheet" href="styles.css"></head>
<body>
  <ms-root></ms-root>
<script src="polyfills.js" type="module"></script><script src="main.js" type="module"></script></body>
</html>
```

Verify `test` script
```sh
Chrome 141.0.0.0 (Windows 10) App should render title FAILED
        Expected 'Welcome to mstts!' to contain 'Hello, mstts'.
            at <Jasmine>
            at UserContext.<anonymous> (src/app/app.spec.ts:21:55)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:398:28)
            at _ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:2132:39)
            at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:397:34)
Chrome 141.0.0.0 (Windows 10): Executed 2 of 2 (1 FAILED) (0.021 secs / 0.017 secs)
TOTAL: 1 FAILED, 1 SUCCESS
```

Fix Broken test
```sh
Chrome 141.0.0.0 (Windows 10): Executed 2 of 2 SUCCESS (0.009 secs / 0.007 secs)
TOTAL: 2 SUCCESS
```

Define Domain models with tests
 - Pit
 - Pit Zone
 - Vehicle

```sh
Chrome 141.0.0.0 (Windows 10): Executed 23 of 23 SUCCESS (0.011 secs / 0.008 secs)
TOTAL: 23 SUCCESS
```

Create Pit State Service to generate random data for vehicle movement


Add [Tailwind](https://tailwindcss.com/docs/installation/framework-guides/angular) 
```sh 
install tailwindcss @tailwindcss/postcss postcss
```

Implement UI
 - Pit
 - Zone
 - Vehicle