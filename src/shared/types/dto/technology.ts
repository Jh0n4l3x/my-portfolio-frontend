export interface Technology {
  id: string;
  name: string;
  icon?: string;
  category?: string;
  color?: string;
}

export interface TechnologyWithStats extends Technology {
  projectCount: number;
}