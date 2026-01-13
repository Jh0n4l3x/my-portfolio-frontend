import { Skill } from "./skill";

export class Profile {

  private _skills: Skill[];

  constructor(
    public readonly id: string,
    public bio?: string,
    public avatar?: string,
    public title?: string,
    public location?: string,
    public website?: string,
    public github?: string,
    public linkedin?: string,
    public twitter?: string,
    skills: Skill[] = []
  ){

    this._skills = skills;
  }

  get skill(): readonly Skill[]{
    return this._skills;
  }
}