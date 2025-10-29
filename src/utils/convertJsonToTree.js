import { nanoid } from "nanoid/non-secure";

const jsonToTree = (data, parentNode, currentPath = '$') => {
    Object.entries(data).forEach(([key, value]) => {
      const nodePath = currentPath === '$' ? `$.${key}` : `${currentPath}.${key}`;
      
      const childNode = {
        id: nanoid(),
        key: key,
        value: value,
        path: nodePath,
        position: { x: 0, y: 0 },
        parentId: parentNode.id,
        children: [],
      };

      if (typeof value === "object" && value !== null) {
        if (Array.isArray(value)) {
          // For arrays, create a node for the array itself
          childNode.value = `${key} (${value.length} items)`;
          
          // Then create child nodes for each array item
          value.forEach((item, index) => {
            const arrayPath = `${nodePath}[${index}]`;
            const arrayItemNode = {
              id: nanoid(),
              key: `[${index}]`,
              value: item,
              path: arrayPath,
              position: { x: 0, y: 0 },
              parentId: childNode.id,
              children: [],
            };
            
            if (typeof item === "object" && item !== null) {
              if (Array.isArray(item)) {
                arrayItemNode.value = `[${index}] (${item.length} items)`;
              }
              // Recursively process object items
              jsonToTree(item, arrayItemNode, arrayPath);
            }
            
            childNode.children.push(arrayItemNode);
          });
        } else {
          // For objects, create a node for the object itself
          childNode.value = `${key} (object)`;
          // Recursively process object properties
          jsonToTree(value, childNode, nodePath);
        }
      }
      // For primitives, the value is already set correctly
      
      parentNode.children.push(childNode);
    });
    
    return parentNode;
  }

  
function convertJsonToTree(json){
    const rootNode = {
        id: nanoid(),
        key: "root",
        value: "Root Object",
        path: "$",
        position: { x: 0, y: 0 },
        parentId: "root",
        children: [],
      };

      jsonToTree(json, rootNode, "$");
      return rootNode;
  }

export default convertJsonToTree;
