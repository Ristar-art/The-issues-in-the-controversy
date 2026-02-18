export interface Block {
  type: 'heading' | 'text' | 'image' | 'button' | 'layout' | 'component';
  text?: string;
  level?: number;
  color?: string;
  align?: 'left' | 'center' | 'right';
  src?: string;
  alt?: string;
  widthPercent?: number;
  label?: string;
  href?: string;
  layout?: 'linear' | 'grid';
  columns?: number;
  blocks?: Block[];
  // For component blocks
  componentId?: string;
}

export interface Section {
  classes: string;
  containerClasses: string;
  blocks: Block[];
  backgroundImage?: string;
  layout?: 'linear' | 'grid';
  columns?: number;
  minHeight?: string;
}

export interface Component {
  id: string;
  name: string;
  html: string;
  category: 'custom';
  description?: string;
  // Background settings
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: 'cover' | 'contain' | 'auto';
  backgroundPosition?: string;
  minHeight?: string;
  // Legacy support for old format
  section?: Section;
  blocks?: Block[];
}

export interface BlockType {
  type: string;
  label: string;
}

export interface SectionSettingsData {
  background: string;
  padding: string;
  width: string;
  backgroundImage: string;
  layout: string;
  columns?: number;
  minHeight: string;
}

export interface PageData {
  components: Component[];
}

export interface ImageSelectorState {
  showImageSelectorFor: string | null;
  showImageSelectorForBlock: number | null;
  showImageSelectorForNestedBlock: { parentIndex: number; nestedIndex: number } | null;
}