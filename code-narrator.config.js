
const ConfigurationBuilder = require("code-narrator/src/documentation/plugins/builders/Configuration/ConfigurationBuilder");
const FilesBuilder = require("code-narrator/src/documentation/plugins/builders/Files/FilesBuilder");
const FoldersBuilder = require("code-narrator/src/documentation/plugins/builders/Folders/FoldersBuilder");
const UserDefinedBuilder = require("code-narrator/src/documentation/plugins/builders/UserDefined/UserDefinedBuilder");
        
/**
 * You can find the documentation about code-narrator.config.js at
 * https://github.com/ingig/code-narrator/blob/master/docs/Configuration/code-narrator.config.js.md
 *
 * @type {ICodeNarratorConfig}
 */
const config = {
      // App specific configuration files. This could be something like project_name.json
  config_files: [
    "schema.graphql",
    "networks.json",
    "subgraph.yaml",
  ],
  project_file: "package.json",
  entry_file: "",
  cli_file: "@graphprotocol/graph-cli",
  project_path: "./",
  source_path: "src",
  documentation_path: "docs",
  test_path: "tests",
  exclude: [
    "/node_modules/",
    "build",
    "generated",
    "abis",
    "tests/.bin",
    "/.env",
    "/node_modules",
    ".env",
    "/.idea",
    "/.git",
    ".gitignore",
    "/.code-narrator",
    "/dist",
    "/build",
    "package-lock.json",
  ],
  // Indicates if the documentation should create a README file in root of project
  readmeRoot: true,
  // Url to the repository, code-narrator tries to extract this from project file
  repository_url: "https://github.com/liminal-market/liminal.market.thegraph",
  // These are the plugins used when building documentation. You can create your own plugin. Checkout the code-narrator docs HowTo create a builder plugin
  builderPlugins: [
   ConfigurationBuilder,
   FilesBuilder,
   FoldersBuilder,
   UserDefinedBuilder,
  ],
  // These are system commends send to GPT with every query
  gptSystemCommands: [
    "Act as a documentation expert for software",
    "If there is :::note, :::info, :::caution, :::tip, :::danger in the text, extract that from its location and format it correctly",
    "Return your answer in {DocumentationType} format",
    "If you notice any secret information, replace it with ***** in your response",
  ],
  documentation_type: "md",
  document_file_extension: ".md",
  folderRootFileName: "README",
  cache_file: ".code-narrator/cache.json",
  gptModel: "gpt-4",
  project_name: "liminal.market.thegraph",
  include: [
    "schema.graphql",
    "networks.json",
    "subgraph.yaml",
    "src/**/*",
    "tests/**/*",
  ],
  // Array of user defined documentations. See code-narrator How to create a user defined builder
  builders: [{
    name: "README",
    type: "README",
    template: "README",
    sidebarPosition: 1,
    files : [
      {
        path:"package.json",
        JSONPath:["$.scripts"]
      },
      {
        path:"networks.json"
      },
      {
        path:"subgraph.yaml"
      }
    ]
  }, {
    name: "HowTo Overview",
    type: "README",
    template: "overview_readme",
    path: "howto",
    files: [{path: "howto/*.md"}],
    pages: [
      {
        name: "HowTo Query TheGraph",
        type: "howto",
        template: "howto_query_thegraph",
        files : [{
          path: 'schema.graphql'
        }
        ]
      }]
  }]

}
module.exports = config;
