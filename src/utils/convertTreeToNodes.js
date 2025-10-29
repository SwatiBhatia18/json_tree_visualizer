import { nanoid } from "nanoid/non-secure"

let nodes = []
let edges = []

function addRootNode(node) {
  const newNode = {
    id: node.id,
    data: {
      label: "Root Object",
      nodeType: "object", // Root is always an object
      path: node.path || "$",
    },
    position: { x: 0, y: 0 },
    type: "jsonVis",
  }

  nodes = [...nodes, newNode]
}

function addChildNode(node, parentNode) {
  // Determine node type based on the original value type
  let nodeType = "primitive"
  let originalValue = node.value
  
  // Check if the node has children to determine if it's a container
  if (node.children && node.children.length > 0) {
    // Check if the key suggests it's an array
    if (node.key && (node.key.startsWith('[') || node.value && typeof node.value === "string" && node.value.includes("items"))) {
      nodeType = "array"
    } else {
      nodeType = "object"
    }
  } else if (typeof originalValue === "object" && originalValue !== null) {
    if (Array.isArray(originalValue)) {
      nodeType = "array"
    } else {
      nodeType = "object"
    }
  } else {
    nodeType = "primitive"
  }

  const newNode = {
    id: node.id,
    data: {
      label: node.value,
      nodeType: nodeType,
      path: node.path || "",
      key: node.key,
      value: originalValue,
    },
    type: "jsonVis",
    position: { x: 0, y: 0 },
    parent: parentNode.id,
  }
  const newEdge = {
    id: nanoid(),
    source: `${parentNode.id}`,
    target: `${node.id}`,
    type: "jsonVis",
  }

  nodes = [...nodes, newNode]
  edges = [...edges, newEdge]
}

function traverseNodeChild(arrayOfNode, parentNode) {
  if (arrayOfNode.length <= 0) {
    return
  }
  arrayOfNode.forEach((node) => {
    addChildNode(node, parentNode)
    if (node.children.length > 0) {
      traverseNodeChild(node.children, node)
    }
  })
}

function convertTreeToNodes(nodeTree, isRoot = false) {
  if (isRoot === true) {
    nodes = []
    edges = []
    addRootNode(nodeTree)
    convertTreeToNodes(nodeTree)
  } else {
    traverseNodeChild(nodeTree.children, nodeTree)
  }

  return [nodes, edges]
}

export default convertTreeToNodes
