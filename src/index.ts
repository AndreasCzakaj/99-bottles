import { html, css, LitElement } from "lit"
import { customElement, property, state } from "lit/decorators.js"
import {bottles} from "./99-bottles-of-beer-procedural"
import {BottlesSong} from "./99-bottles-of-beer-oop"
import {BottlesIterator} from "./99-bottles-of-beer-iterator"
import { defaultBottleOpts } from "./shared"

export const TAG_NAME = "index-page" 
@customElement(TAG_NAME)
export class Index extends LitElement {

  @state()
  lines: string[] = []
  
  collector: string[] = []


  clear = () => {
    this.lines = []
  }

  createOpts = (implName: string) => {
    this.collector = [`${implName}:`, "--------------------"]
    const customOpts = {outputConsumer: (line: string) => this.collector.push(line)}
    return {...defaultBottleOpts, ...customOpts}
  }

  procedural = () => {
    bottles(this.createOpts("Procedural"))
    this.lines = this.collector
  }

  oop = () => {
    const bottlesSong = new BottlesSong(this.createOpts("OOP-Style"))
    bottlesSong.sing()
    this.lines = this.collector
  }

  iterator = () => {
    const bottlesIt = new BottlesIterator(this.createOpts("Using an iterator"))
    while(bottlesIt.hasNext()) {
      this.collector.push(bottlesIt.next())
    }
    this.lines = this.collector
  }

  render() {
    return html`
      <h1>99 bottles</h1>
      <p>Choose implementation:</p>
      <ul id="selectionlist">
        <li><button @click=${this.procedural}>Procedural</button></li>
        <li><button @click=${this.oop}>OOP Style</button></li>
        <li><button @click=${this.iterator}>With Interator</button></li>
        <li><button @click=${this.clear}>CLEAR OUTPUT</button></li>
      </ul>
      <ul id="targetlist">
        ${this.lines.map(line => html`<li>${line}</li>`)}
      </ul>
    `
  }

  static styles = [
    css`
      #selectionlist {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }
      
      #selectionlist li {
            padding: 8px 12px;
            margin-bottom: 4px;
            border-radius: 4px;
      }


      #targetlist {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }
      
      #targetlist li {
            padding: 8px 12px;
            margin-bottom: 4px;
            border-radius: 4px;
      }
    `,
  ]
}
