import Color, { IColor } from '../colors/color';

interface FileDeclaration {
  fileName: string;
  line: number;
}

interface Observer {
  observerId: number;
  update(args: any);
}

class Observable {
  public observers: Observer [];
  private lastObserverId: number;
  constructor () {
    this.observers = [];
    this.lastObserverId = 0;
  }
  registerObserver (observer: Observer): number {
    const id = this.lastObserverId++;
    observer.observerId = id;
    this.observers = this.observers.concat(observer);
    return id;
  }
  // not working properly
  removerObserver (observer: Observer) {
    this.observers.splice(this.observers.findIndex(_ => _.observerId !== observer.observerId));
  }

  notify (args: any) {
    this.observers.forEach(observer => observer.update(args));
  }
}

class Variable extends Observable implements IColor {

  public name: string;

  public color: Color;

  public declaration: FileDeclaration;

  public constructor(name: string, color: Color, declaration: FileDeclaration) {
    super();
    this.name = name;
    // this._color = color;
    this.color = color;
    this.declaration = declaration;
  }

  // public get color() {
  //   return this._color;
  // }
  // public set color(c: Color) {
  //   this._color = c;
  //   this.notify(c);
  // }
  /**
   * Generate the color string rgb representation
   * example :
   *  #fff => rgb(255, 255, 255)
   *  rgba(1, 34, 12, .1) => rgb(1, 34, 12)
   *
   * @returns {string}
   * @public
   * @memberOf Color
   */
  public toRgbString(): string {
    return this.color.toRgbString();
  }

  public dispose() {
    this.notify(['dispose']);
  }

  public update(color: Color) {
    if (color === null || color === undefined) {
      return this.notify(['dispose']);
    }
    this.color = Object.create(color);
    this.notify(['update', color]);
  }
}
export default Variable;
export { Observer };
