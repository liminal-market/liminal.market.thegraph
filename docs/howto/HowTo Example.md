# How to Add a HowTo in the Config File

## Introduction
In this guide, we will learn how to add a HowTo in the config file. We will be using the `args` property to inject properties into the liquid template and the `file` property to append extracted content of a file to the liquid template. Developers must create a liquid template in the `.code-narrator/gpt_questions` directory, which will be used to ask GPT questions.

## Step-by-Step Instructions

1. **Create a liquid template file**: Navigate to the `.code-narrator/gpt_questions` directory and create a new liquid template file. This file will be used to ask GPT questions.

2. **Inject properties using the `args` property**: In the liquid template file, you can use the `args` property to inject properties. Any property set in `args` can be accessed in the liquid template. For example:

   ```
   {
     "args": {
       "property1": "value1",
       "property2": "value2"
     }
   }
   ```

   In the liquid template, you can access these properties as follows:

   ```
   {{ args.property1 }}
   {{ args.property2 }}
   ```

3. **Append extracted content using the `file` property**: To append the extracted content of a file to the liquid template, use the `file` property along with either JSONPath or the `extract` property that uses LLM to extract content from the file. For example:

   ```
   {
     "file": {
       "path": "path/to/your/file",
       "jsonPath": "$.property.to.extract"
     }
   }
   ```

   Or, using the `extract` property:

   ```
   {
     "file": {
       "path": "path/to/your/file",
       "extract": "LLM query to extract content"
     }
   }
   ```

4. **Combine `args` and `file` properties in the liquid template**: In the liquid template, you can combine the `args` and `file` properties to create a dynamic GPT question. For example:

   ```
   How can I use {{ args.property1 }} and {{ args.property2 }} to extract content from the file {{ file.path }}?
   ```

5. **Save and test your configuration**: Save your liquid template file and test your configuration to ensure that the HowTo is correctly added to the config file and the GPT questions are generated as expected.

That's it! You have successfully added a HowTo in the config file using the `args` and `file` properties.