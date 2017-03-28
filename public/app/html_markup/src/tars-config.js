const cssOrder = require('./css-order');

module.exports = {
    "postcss": [],
    "postscss": [
        {
            "name": "postcss-sorting",
            "options": cssOrder
        }
    ],
    "svg": {
        "active": true,
        "workflow": "symbols",
        "symbolsConfig": {
            "loadingType": "separate-file-with-link",
            "usePolyfillForExternalSymbols": false,
            "pathToExternalSymbolsFile": ""
        }
    },
    "css": {
        "workflow": "manual"
    },

    js: {
        // concat, modular
        workflow: 'modular',

        // Only webpack is available right now
        bundler: 'webpack',

        /**
         * Use linting of js-files
         * @type {Boolean}
         */
        lint: true,

        /**
         * Use babel for ES6(ES7-ESNext) syntax support
         * @type {Boolean}
         */
        useBabel: true,

        /**
         * Remove console.log and debugger from js code in release mode
         * @type {Boolean}
         */
        removeConsoleLog: true,

        // Special config for webpack
        webpack: {
            useHMR: false,

            /**
             * Automatically loaded modules.
             * Module (value) is loaded when the identifier (key) is used as free variable in a module.
             * The identifier is filled with the exports of the loaded module.
             * Example: {$: "jquery"} or {React: 'react'}
             * @type {Object}
             */
            providePlugin: {
                $: "jquery",
                jQuery: "jquery"
            }
        },
        "jsPathsToConcatBeforeModulesJs": [],
        "lintJsCodeBeforeModules": false,
        "jsPathsToConcatAfterModulesJs": [],
        "lintJsCodeAfterModules": false
    },
    "sourcemaps": {
        "js": {
            "active": true,
            "inline": true
        },
        "css": {
            "active": true,
            "inline": true
        }
    },
    "notifyConfig": {
        "useNotify": true,
        "title": "TARS notification",
        "sounds": {},
        "taskFinishedText": "Task finished at: "
    },

    /**
     * Minify result html in build version
     * If is set to false, compiled html will be prettified
     * @type {Boolean}
     */
    minifyHtml: false,

    /**
     * TARS will generate relative path from current page
     * to static files in case of true value
     * @type {Boolean}
     */
    generateStaticPath: true,

    /**
     * Path to build version of project
     * Could be like '../../../build' or absolute path
     * @type {String}
     */
    buildPath: '../build/',

    /**
     * Use build versioning
     * Build version is a date ot building
     * @type {Boolean}
     */
    useBuildVersioning: false,

    /**
     * Use archiver for your build
     * @type {Boolean}
     */
    useArchiver: false,

    /**
     * Set ulimit. Topical for Linux-family OS and OSX.
     * @type {Number}
     */
    ulimit: 4096,

    //////////////////////////////////////////////
    //////////////////////////////////////////////

    ////////////////////////////////////////////////////////
    // YOU CAN CHANGE THIS OPTIONS AND USE REINIT         //
    //                                                    //
    // Options for technologies, which you'd like to use. //
    ////////////////////////////////////////////////////////

    /**
     * Templater
     * Available 'pug', 'jade' and 'handlebars'
     * @type {String}
     */
    templater: 'pug',

    /**
     * Css-preprocessor
     * Available 'scss', 'less' or 'stylus'
     * .sass extension is supported if cssPreprocessor is 'scss'
     * @type {String}
     */
    cssPreprocessor: 'scss',

    /**
     * What kind of size of images are you going to use.
     * 96 — 1 dppx (regular)
     * 192 — 2 dppx (retina)
     * 288 — 3 dppx (nexus 5, for example)
     * 384 - 4 dppx (nexus 6, for example)
     * Example if using for all displays: usePpi: [96, 192, 288, 384]
     * You can change with options not only on init or reinit,
     * but at with time you have to create new directories
     * and delete unused.
     * @type {Array}
     */
    useImagesForDisplayWithDpi: [96],

    ////////////////////////////////////////////////
    ////////////////////////////////////////////////

    ////////////////////////////////////////////////////////
    // You have to change with options after manually      //
    // renaming static and img folder                     //
    //                                                    //
    // Do not rename these dirs before reinit             //
    ////////////////////////////////////////////////////////

    /**
     * File structure settings
     * @type {Object}
     */
    fs: {

        /**
         * Name of folder with static files, such *.css, *.js and so on
         * 'static' by default
         * @type {String}
         */
        staticFolderName: 'static',

        /**
         * Name of folder with images
         * 'img' by default
         * @type {String}
         */
        imagesFolderName: 'img',

        /**
         * Name of folder with modules
         * 'modules' by default
         * @type {String}
         */
        componentsFolderName: 'components'
    }
};
