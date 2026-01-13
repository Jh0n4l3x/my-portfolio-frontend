import { Profile } from "../../domain/entities/profile";
import { Project } from "../../domain/entities/project";


export class PortfolioDataDto {
  private _projects: Project[];

  constructor(
    public readonly id: string,
    public readonly username: string,
    public firstName?: string,
    public lastName?: string,
    public profile: Profile | null = null,
    projects: Project[] = []
  ) {
    if (!id) {
      throw new Error("PortfolioData debe tener un id");
    }

    if (!username) {
      throw new Error("PortfolioData debe tener un username");
    }

    this._projects = projects;
  }

  get projects(): readonly Project[] {
    return this._projects;
  }

  addProject(project: Project): void {
    if (this._projects.some(p => p.id === project.id)) {
      throw new Error("El proyecto ya existe en el portafolio");
    }
    this._projects.push(project);
  }

  removeProject(projectId: string): void {
    this._projects = this._projects.filter(p => p.id !== projectId);
  }

  hasProjects(): boolean {
    return this._projects.length > 0;
  }

  updateProfile(profile: Profile): void {
    this.profile = profile;
  }

  fullName(): string {
    return [this.firstName, this.lastName].filter(Boolean).join(" ");
  }
}
