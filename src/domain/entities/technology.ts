export class Technology {

  constructor(
    public id: string,
    public name: string,
    public icon?: string,
    public category?: string,
    public color?: string,
  ){
  }
}

export class TechnologyWithStats extends Technology {
  constructor(
  id: string,
  name: string,
  icon?: string,
  category?: string,
  color?: string,
  public projectCount: number = 0
){
  super(id, name, icon, category, color)
  }
}