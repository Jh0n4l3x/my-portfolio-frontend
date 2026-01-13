import { ProjectImage } from "../value-objects";
import { Technology } from "./technology";


export class Project {

  private _technologies: Technology[];
  private _images: ProjectImage[];

  constructor(
    public id: string,
    public title: string,
    public description: string,
    public content?: string,
    public thumbnail?: string,
    public imageUrl?: string,
    public liveUrl?: string,
    public githubUrl?: string,
    public status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' = 'DRAFT',
    public featured: boolean = true,
    public order: number = 0,
    public userId: string = '',
    technologies: Technology[] = [],
    images: ProjectImage[] = [],
    public createdAt: string | null = null,
    public updatedAt: string | null = null,
    ){

      this._technologies = technologies;
      this._images = images;
  }

  get images(): readonly ProjectImage[]{
    return this._images;
  }

  get technologies(): Technology[]{
    return this._technologies;
  }
}