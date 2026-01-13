export class ProjectImage {

  constructor(
    public id: string,
    public url: string,
    public alt?: string,
    public order: number = 0,
  ){

  }  
}