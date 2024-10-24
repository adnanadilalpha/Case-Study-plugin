import { createCaseStudyFrame } from './utils/frameGenerator';
import { extractDesignTokens } from './utils/tokenExtractor';
import { createStyleGuide } from './utils/styleGuide';
import { generateMockups } from './utils/mockupGenerator';
import { DesignSystem, CaseStudyData, DesignTokens } from './types';

figma.showUI(__html__, { width: 600, height: 800, themeColors: true });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'generate-case-study') {
    const selection = figma.currentPage.selection;
    
    if (selection.length === 0) {
      figma.ui.postMessage({ 
        type: 'error', 
        message: 'Please select at least one frame to analyze' 
      });
      return;
    }

    // Show loading state
    figma.ui.postMessage({ type: 'loading', message: 'Analyzing design system...' });

    try {
      // Extract design tokens and system
      const designTokens: DesignTokens = await extractDesignTokens(selection);
      const designSystem: DesignSystem = {
        colors: designTokens.colors,
        typography: designTokens.typography,
        components: designTokens.components,
        spacing: designTokens.spacing,
        effects: designTokens.effects
      };

      // Create case study data
      const caseStudyData: CaseStudyData = {
        title: msg.title,
        description: msg.description,
        overview: msg.overview,
        challenge: msg.challenge,
        solution: msg.solution,
        process: msg.process,
        outcomes: msg.outcomes,
        selectedFrames: selection,
        designSystem,
        mockups: await generateMockups(selection)
      };

      // Create main case study frame with auto-layout
      const caseStudyFrame = await createCaseStudyFrame(caseStudyData);
      
      // Create style guide section
      const styleGuideFrame = await createStyleGuide(designSystem);
      
      // Position frames
      styleGuideFrame.y = caseStudyFrame.height + 100;
      
      // Group frames
      const mainGroup = figma.group([caseStudyFrame, styleGuideFrame], figma.currentPage);
      mainGroup.name = `${msg.title} - Case Study`;

      // Create component set for reusable sections
      await createComponentSet(caseStudyData);

      figma.viewport.scrollAndZoomIntoView([mainGroup]);

      figma.ui.postMessage({ 
        type: 'success',
        message: 'Case study generated successfully!'
      });

    } catch (error) {
      figma.ui.postMessage({ 
        type: 'error',
        message: 'Error generating case study: ' + error.message 
      });
    }
  }
};

async function createComponentSet(data: CaseStudyData) {
  // Create reusable components for case study sections
  const components = figma.currentPage.createComponentSet();
  components.name = "Case Study Components";
  
  // Add section components
  await Promise.all([
    createSectionComponent("Header", data),
    createSectionComponent("Overview", data),
    createSectionComponent("Challenge", data),
    createSectionComponent("Solution", data),
    createSectionComponent("Process", data),
    createSectionComponent("Outcomes", data),
    createSectionComponent("Design System", data)
  ]);
}

async function createSectionComponent(name: string, data: CaseStudyData) {
  const component = figma.createComponent();
  component.name = name;
  component.layoutMode = "VERTICAL";
  component.itemSpacing = 24;
  component.paddingLeft = component.paddingRight = 40;
  component.paddingTop = component.paddingBottom = 32;
  
  // Add section content based on type
  switch (name) {
    case "Header":
      await createHeaderContent(component, data);
      break;
    case "Overview":
      await createOverviewContent(component, data);
      break;
    // Add other section content creators
  }
  
  return component;
}

async function createHeaderContent(component: ComponentNode, data: CaseStudyData) {
  const title = figma.createText();
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
  title.fontName = { family: "Inter", style: "Bold" };
  title.fontSize = 48;
  title.characters = data.title;
  
  const description = figma.createText();
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  description.fontName = { family: "Inter", style: "Regular" };
  description.fontSize = 24;
  description.characters = data.description;
  
  component.appendChild(title);
  component.appendChild(description);
}

async function createOverviewContent(component: ComponentNode, data: CaseStudyData) {
  // Similar to createHeaderContent but for overview section
  // Add overview-specific content
}