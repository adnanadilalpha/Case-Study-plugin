import { CaseStudyData, Section } from '../types';

export async function createCaseStudyFrame(data: CaseStudyData): Promise<FrameNode> {
  const frame = figma.createFrame();
  frame.name = `${data.title} - Case Study`;
  frame.layoutMode = "VERTICAL";
  frame.counterAxisSizingMode = "AUTO";
  frame.itemSpacing = 64;
  frame.paddingLeft = frame.paddingRight = 120;
  frame.paddingTop = frame.paddingBottom = 80;
  frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];

  // Add sections
  await Promise.all([
    addSection(frame, "header", data),
    addSection(frame, "overview", data),
    addSection(frame, "challenge", data),
    addSection(frame, "solution", data),
    addSection(frame, "process", data),
    addSection(frame, "outcomes", data)
  ]);

  return frame;
}

async function addSection(parent: FrameNode, type: Section, data: CaseStudyData) {
  const section = figma.createFrame();
  section.name = type.charAt(0).toUpperCase() + type.slice(1);
  section.layoutMode = "VERTICAL";
  section.itemSpacing = 24;
  section.counterAxisSizingMode = "AUTO";

  // Add section content based on type
  await createSectionContent(section, type, data);
  
  parent.appendChild(section);
}

async function createSectionContent(frame: FrameNode, type: Section, data: CaseStudyData) {
  // Load fonts
  await Promise.all([
    figma.loadFontAsync({ family: "Inter", style: "Bold" }),
    figma.loadFontAsync({ family: "Inter", style: "Regular" })
  ]);

  switch (type) {
    case "header":
      await createHeaderSection(frame, data);
      break;
    case "overview":
      await createOverviewSection(frame, data);
      break;
    // Add other section creators
  }
}

async function createHeaderSection(frame: FrameNode, data: CaseStudyData) {
  const title = figma.createText();
  title.fontName = { family: "Inter", style: "Bold" };
  title.fontSize = 48;
  title.characters = data.title;
  
  const description = figma.createText();
  description.fontName = { family: "Inter", style: "Regular" };
  description.fontSize = 24;
  description.characters = data.description;
  
  frame.appendChild(title);
  frame.appendChild(description);
}

async function createOverviewSection(frame: FrameNode, data: CaseStudyData) {
  // Create overview section content
}