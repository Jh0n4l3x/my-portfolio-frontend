export interface PortfolioData {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  profile: Profile | null;
  projects: Project[];
}