// @ts-nocheck
const toolService = {
  getPageHTML: () => {
    // Only run on client side
    if (typeof document !== 'undefined') {
      return { success: true, html: document.documentElement.outerHTML };
    }
    return { success: false, error: 'Not in browser environment' };
  },
  
  changeBackgroundColor: ({ color }) => {
    if (typeof document !== 'undefined') {
      document.body.style.backgroundColor = color;
      return { success: true, color };
    }
    return { success: false, error: 'Not in browser environment' };
  },
  
  changeTextColor: ({ color }) => {
    if (typeof document !== 'undefined') {
      document.body.style.color = color;
      return { success: true, color };
    }
    return { success: false, error: 'Not in browser environment' };
  },
};

export const toolDefinitions = [
  {
    type: 'function',
    name: 'changeBackgroundColor',
    description: 'Changes the background color of a web page',
    parameters: {
      type: 'object',
      properties: {
        color: { type: 'string', description: 'A hex value of the color' },
      },
    },
  },
  {
    type: 'function',
    name: 'changeTextColor',
    description: 'Changes the text color of a web page',
    parameters: {
      type: 'object',
      properties: {
        color: { type: 'string', description: 'A hex value of the color' },
      },
    },
  },
  {
    type: 'function',
    name: 'showFingers',
    description: 'Controls a robot hand to show a specific number of fingers',
    parameters: {
      type: 'object',
      properties: {
        numberOfFingers: {
          enum: [1, 2, 3, 4, 5],
          description: 'Values 1 through 5 of the number of fingers to hold up' 
        },
      },
    },
  },
  {
    type: 'function',
    name: 'getPageHTML',
    description: 'Gets the HTML for the current page',
  },
];

export default toolService;