export class Util {
  public static hasClass(element: HTMLElement, selector: string) {
    if (!element) return;

    return element.classList.contains(selector);
  };

  public static stringToElement(html: string) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content!;
  }

  public static isSameNodeName(element: HTMLElement, nodeName: string): boolean {
    return element ? element.nodeName === nodeName : false;
  }

  public static isEmptyString(str: string): boolean{
    return !str.trim().length;
  }
}
