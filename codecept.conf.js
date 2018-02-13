exports.config = {
  helpers: {
    WebDriverIO: {
      desiredCapabilities: {
        name: 'test-demo',
        group: 'group-demo',
      },
      host: process.env.SELENIUM_HOST || 'localhost', // Selenium url,
      port: process.env.SELENIUM_PORT || '4444', // Selenium url,
      // load variables from the environment and provide defaults
      url: 'https://www.mifiel.com/en',
      browser: process.profile || 'chrome',
      restart: 'false',
      timeouts: {
        script: 60000,
      },
      windowSize: '1440x900',
    },
    InitHelper: {
      require: './init_helper.js',
    },
  },
  tests: './testcases/*_test.js',
  timeout: 120000,
  output: './output',
  include: {
    I: './steps_file.js',
    ToDo: './pages/angular_todo.js',
    ToDoAdv: './pages/angular_todo_adv.js',
    Amplitude: './pages/amplitude_main.js',
    GrubHubPage: './pages/grubhub_main.js',
    GrubHub: './steps/grubhub_steps_files.js',
  },
  multiple: {
    group1: {
      grep: '@tests_group1',
      browsers: [{ browser: 'chrome', windowSize: '1440x900' },
      ],
    },
    group2: {
      grep: '@tests_group2',
      browsers: [{ browser: 'chrome', windowSize: '1440x900' },
      ],
    },
    group3: {
      grep: '@tests_group3',
      browsers: [{ browser: 'chrome', windowSize: '1440x900' },
      ],
    },
    group4: {
      grep: '@tests_group4',
      browsers: [{ browser: 'chrome', windowSize: '1440x900' },
      ],
    },
  },

  bootstrap: false,
  mocha: {
    reporterOptions: {
      reportDir: 'output',
      reportFilename: 'index',
      enableCharts: true,
      autoOpen: true,
      quiet: true,
      inlineAssets: false,
    },
  },
};
