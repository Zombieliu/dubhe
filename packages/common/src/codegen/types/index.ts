import {getStructAttrs} from "../utils/renderMove/common";

export type BaseType =
  | "address"
  | "bool"
  | "u8"
  | "u64"
  | "u128"
  | "vector<address>"
  | "vector<bool>"
  | "vector<u8>"
  | "vector<vector<u8>>"
  | "vector<u64>"
  | "vector<u128>"
  | "Option<address>"
  | "Option<bool>"
  | "Option<u8>"
  | "Option<u64>"
  | "Option<u128>";
export type SingletonType =
  | {
      type: BaseType;
      init: string;
    }
  | {
      type: Record<string, BaseType>;
      init: Record<string, string>;
    };

export interface ValueSchemaType {
    valueSchema: Record<string, string> | string;
    ephemeral?: boolean;
    singleton?: boolean;
    init?: Record<string, string> | string;
}

export type ComponentMapType = BaseType | ValueSchemaType;

export type ObeliskConfig = {
  name: string;
  description: string;
  systems: string[];
  components: Record<string, ComponentMapType>;
};

export interface RenderComponentOptions {
    componentName: string;
    structName: string;
    ephemeral: boolean;
    singleton: boolean;
    resourceData: BaseType | Record<string, BaseType>
    structAttrs: string[]
    structTypes: string[]
    init: Record<string, string> | string
}

export function isSingletonType(s: ComponentMapType | SingletonType): boolean {
  if (typeof s !== "object") {
    // if s is string
    return false;
  }

  // if s is single type
  return "type" in s && "init" in s;
}
