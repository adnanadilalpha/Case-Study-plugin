export interface CaseStudyData {
  title: string;
  description: string;
  overview: string;
  challenge: string;
  solution: string;
  process: string[];
  outcomes: string[];
  selectedFrames: readonly SceneNode[];
  designSystem: DesignSystem;
  mockups: MockupData[];
}

export interface DesignSystem {
  colors: ColorToken[];
  typography: TypographyToken[];
  components: ComponentToken[];
  spacing: SpacingToken[];
  effects: EffectToken[];
}

export interface DesignTokens {
  colors: ColorToken[];
  typography: TypographyToken[];
  components: ComponentToken[];
  spacing: SpacingToken[];
  effects: EffectToken[];
}

export interface ColorToken {
  value: string;
  name: string;
  usage: string[];
}

export interface TypographyToken {
  family: string;
  style: string;
  size: number;
  lineHeight: LineHeight | PluginAPI['mixed'];
  usage: string[];
}

export interface ComponentToken {
  name: string;
  description: string;
  variants: string[];
  usage: string[];
}

export interface SpacingToken {
  value: number;
  usage: string[];
}

export interface EffectToken {
  type: string;
  value: Effect;
  usage: string[];
}

export interface MockupData {
  node: SceneNode;
  type: string;
  context: string;
}

export type Section = 'header' | 'overview' | 'challenge' | 'solution' | 'process' | 'outcomes';