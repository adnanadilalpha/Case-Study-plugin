import { DesignTokens, ColorToken, TypographyToken, ComponentToken, SpacingToken, EffectToken } from '../types';

export async function extractDesignTokens(nodes: readonly SceneNode[]): Promise<DesignTokens> {
  return {
    colors: await extractColors(nodes),
    typography: await extractTypography(nodes),
    components: await extractComponents(nodes),
    spacing: await extractSpacing(nodes),
    effects: await extractEffects(nodes)
  };
}

async function extractColors(nodes: readonly SceneNode[]): Promise<ColorToken[]> {
  const colors = new Map<string, ColorToken>();
  
  nodes.forEach(node => {
    if ('fills' in node) {
      const fills = (node as GeometryMixin).fills;
      if (Array.isArray(fills)) {
        fills.forEach(fill => {
          if (fill.type === 'SOLID') {
            const { r, g, b } = fill.color;
            const hex = rgbToHex(r, g, b);
            
            if (!colors.has(hex)) {
              colors.set(hex, {
                value: hex,
                name: node.name,
                usage: []
              });
            }
            
            colors.get(hex)!.usage.push(node.name);
          }
        });
      }
    }
  });

  return Array.from(colors.values());
}

async function extractTypography(nodes: readonly SceneNode[]): Promise<TypographyToken[]> {
  const typography = new Map<string, TypographyToken>();
  
  nodes.forEach(node => {
    if ('fontName' in node) {
      const textNode = node as TextNode;
      if (textNode.fontName !== figma.mixed) {
        const key = `${textNode.fontName.family}-${textNode.fontName.style}-${textNode.fontSize}`;
        
        if (!typography.has(key)) {
          typography.set(key, {
            family: textNode.fontName.family,
            style: textNode.fontName.style,
            size: textNode.fontSize || 16,
            lineHeight: textNode.lineHeight,
            usage: []
          });
        }
        
        typography.get(key)!.usage.push(node.name);
      }
    }
  });

  return Array.from(typography.values());
}

async function extractComponents(nodes: readonly SceneNode[]): Promise<ComponentToken[]> {
  const components = new Map<string, ComponentToken>();
  
  nodes.forEach(node => {
    if (node.type === 'COMPONENT' || node.type === 'INSTANCE') {
      if (!components.has(node.name)) {
        components.set(node.name, {
          name: node.name,
          description: '',
          variants: [],
          usage: []
        });
      }
      
      components.get(node.name)!.usage.push(node.parent?.name || 'Unknown');
    }
  });

  return Array.from(components.values());
}

async function extractSpacing(nodes: readonly SceneNode[]): Promise<SpacingToken[]> {
  const spacing = new Map<number, SpacingToken>();
  
  nodes.forEach(node => {
    if ('layoutMode' in node) {
      const layoutNode = node as FrameNode;
      if (layoutNode.itemSpacing !== figma.mixed) {
        const value = layoutNode.itemSpacing;
        
        if (!spacing.has(value)) {
          spacing.set(value, {
            value,
            usage: []
          });
        }
        
        spacing.get(value)!.usage.push(node.name);
      }
    }
  });

  return Array.from(spacing.values());
}

async function extractEffects(nodes: readonly SceneNode[]): Promise<EffectToken[]> {
  const effects = new Map<string, EffectToken>();
  
  nodes.forEach(node => {
    if ('effects' in node) {
      const nodeEffects = (node as SceneNode & EffectsMixin).effects;
      nodeEffects.forEach(effect => {
        const key = JSON.stringify(effect);
        
        if (!effects.has(key)) {
          effects.set(key, {
            type: effect.type,
            value: effect,
            usage: []
          });
        }
        
        effects.get(key)!.usage.push(node.name);
      });
    }
  });

  return Array.from(effects.values());
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => Math.round(n * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}