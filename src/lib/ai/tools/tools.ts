import { JSONSchema } from "openai/lib/jsonschema";
import { generateUITool } from "./generate-ui-tool";
// import { toolsList } from "../../config/tools-list";

const toolsDefinitions = [
  generateUITool,
  // ...toolsList.map(tool => {
  //   return {
  //     name: tool.name,
  //     description: tool.description,
  //     parameters: {
  //       type: 'object',
  //       properties: { ...tool.parameters },
  //       required: Object.keys(tool.parameters),
  //       additionalProperties: false
  //     },
  //     strict: true
  //   }
  // })
];

interface Parameter {
  type: "object";
  properties: JSONSchema;
  required: string[];
  additionalProperties?: boolean;
}

const tools: any[] = toolsDefinitions.map((tool) => {
  return {
    type: "function",
    function: {
      ...tool,
      parameters: tool.parameters as Parameter,
    },
  };
});

export { tools };
