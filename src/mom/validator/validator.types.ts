export type ValidationError = {
  nodeId: string;
  type: "unknown_type" | "invalid_child" | "missing_child" | "orphan_node";
  message: string;
};

export type ValidationResult = {
  valid: boolean;
  errors: ValidationError[];
};