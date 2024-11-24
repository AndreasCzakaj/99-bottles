export function wcc<T extends HTMLElement>(
  cls: { new (): T },
  record?: Partial<Record<keyof T, any>>
): T {
  return wcf(() => new cls(), record)
}

export function wcf<T extends HTMLElement>(
  factory: () => T,
  record?: Partial<Record<keyof T, any>>
): T {
  const obj = factory()

  if (record !== undefined) {
    for (const key in record) {
      obj[key] = record[key]
    }
  }

  return obj
}

export class TestContext<T extends HTMLElement> {
  constructor() {}

  resetDocumentBody() {
    const count = document.body.childElementCount
    for (let i = 0; i < count; i++) {
      const element = document.body.children.item(i)
      element?.remove()
    }
  }
  
  unmountComponent() {
    if (this._component) {
      document.body.removeChild(this._component)
    }
  }
  

  private _component?: T

  public component(): T {
    return this._component!
  }

  async mountComponent<T extends HTMLElement>(
    cls: { new (): T },
    tagName: string,
    record?: Partial<Record<keyof T, any>>
  ) {
    const el = wcc(cls, record)
    document.body.appendChild(el)
    const qs = async (selector: string): Promise<any> => {
      const customElement = document.querySelector(selector)
      return await Promise.resolve(customElement)
    }
    this._component = await qs(tagName)
  }

  getElement(querySelector: string) {
    return this._component?.shadowRoot?.querySelector(querySelector)
  }

  assertElementToBeMissing(querySelector: string) {
    try {
      const element = this.getElement(querySelector)
      expect(element).toBe(null)
    } catch (err: any) {
      console.warn("assertElementToBeMissing failed", {
        querySelector,
      })
      throw err
    }
  }

  assertElementToExist(querySelector: string) {
    try {
      const element = this._component?.shadowRoot?.querySelector(querySelector)
      expect(element).not.toBe(null)
      return element
    } catch (err: any) {
      console.warn("assertElementToExist failed", {
        querySelector,
      })
      throw err
    }
  }

  assertElementToExistWithTextContent(
    querySelector: string,
    expectedContent: string
  ) {
    try {
      const element = this.assertElementToExist(querySelector)
      expect(element!.textContent?.trim()).toEqual(expectedContent)
      return element
    } catch (err: any) {
      console.warn("assertElementToExistWithTextContent failed", {
        querySelector,
        expectedContent,
      })
      throw err
    }
  }

  assertElementToExistWithChildren(
    querySelector: string,
    expectedChildCount: number
  ) {
    try {
      const element = this.assertElementToExist(querySelector)
      expect(element!.children.length).toEqual(expectedChildCount)
      return element!
    } catch (err: any) {
      console.warn("assertElementToExistWithChildren failed", {
        querySelector,
        expectedChildCount,
      })
      throw err
    }
  }

  assertInputElementToExistWithValue(
    querySelector: string,
    expectedContent: string
  ) {
    try {
      const element: HTMLInputElement | null | undefined =
        this._component?.shadowRoot?.querySelector(querySelector)
      expect(element).not.toBe(null)
      expect(element!.value?.trim()).toEqual(expectedContent)
      return element
    } catch (err: any) {
      console.error("assertInputElementToExistWithValue failed", {
        querySelector,
        expectedContent,
      })
      throw err
    }
  }
}
