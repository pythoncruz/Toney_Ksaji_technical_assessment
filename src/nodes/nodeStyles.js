// nodeStyles.js - Shared styling configuration for all nodes

export const nodeStyles = {
  // Base node container styles
  container: {
    base: "node-container",
    selected: "node-container-selected",
  },
  
  // Header styles
  header: {
    base: "node-header",
    title: "node-header-title",
    icon: "node-header-icon",
  },
  
  // Content area styles
  content: {
    base: "node-content",
    input: "node-input",
    select: "node-select",
    label: "node-label",
  },
  
  // Handle styles
  handle: {
    base: "node-handle",
    source: "node-handle-source",
    target: "node-handle-target",
  },
  
  // Node type specific colors
  types: {
    input: {
      header: "node-header-input",
      icon: "node-icon-input",
    },
    output: {
      header: "node-header-output",
      icon: "node-icon-output",
    },
    llm: {
      header: "node-header-llm",
      icon: "node-icon-llm",
    },
    text: {
      header: "node-header-text",
      icon: "node-icon-text",
    },
    timer: {
      header: "node-header-timer",
      icon: "node-icon-timer",
    },
    markdown: {
      header: "node-header-markdown",
      icon: "node-icon-markdown",
    },
    random: {
      header: "node-header-random",
      icon: "node-icon-random",
    },
    http: {
      header: "node-header-http",
      icon: "node-icon-http",
    },
    switch: {
      header: "node-header-switch",
      icon: "node-icon-switch",
    },
  },
}; 