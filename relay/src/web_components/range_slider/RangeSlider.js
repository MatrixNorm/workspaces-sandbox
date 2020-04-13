const tmpl = document.createElement("template");
tmpl.innerHTML = `
  <style>
    #container {
      min-width: 150px;
    }
    #input-container {
      position: relative;
      height: 20px;
    }
    input[type=range] {
      -webkit-appearance: none;
      position: absolute;
      width: 100%;
    }
    input[type=range]:focus {
      outline: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
      width: 300px;
      height: 5px;
      background: #ddd;
      border: none;
      border-radius: 3px;
    }
    input[type=range]::-webkit-slider-thumb { 
      -webkit-appearance: none;
      border: none;
      height: 0;
      width: 0;      
    }
    #upper-input::-webkit-slider-thumb {
      margin-top: -12px;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;      
      border-top: 12px solid goldenrod;
    }
    #lower-input::-webkit-slider-thumb {
      margin-top: 4px;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 12px solid goldenrod;
    }
    #lower-text {
      float: left;
    }
    #upper-text {
      float: right;
    }
  </style>
  <div id="container">
    <div id="input-container">
      <input id="upper-input" type="range" name="upper" min="50" max="500">
      <input id="lower-input" type="range" name="lower" min="50" max="500">
    </div>
    <div>
      <span id="lower-text"></span>
      <span id="upper-text"></span>
    </div>
  </div>
`;

export default class RangeSlider extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(tmpl.content.cloneNode(true));

    this.upperInput = this.shadowRoot.getElementById("upper-input");
    this.lowerInput = this.shadowRoot.getElementById("lower-input");

    this.onUpperChange = this.onUpperChange.bind(this);
    this.onUpperInput = this.onUpperInput.bind(this);
    this.onLowerChange = this.onLowerChange.bind(this);
    this.onLowerInput = this.onLowerInput.bind(this);
  }

  connectedCallback() {
    const [min, max] = [this.getAttribute("min"), this.getAttribute("max")];
    this.upperInput.value = max;
    this.lowerInput.value = min;
    this.setLowerText(min);
    this.setUpperText(max);
    this.upperInput.setAttribute("min", min);
    this.upperInput.setAttribute("max", max);
    this.lowerInput.setAttribute("min", min);
    this.lowerInput.setAttribute("max", max);

    this.upperInput.addEventListener("change", this.onUpperChange);
    this.upperInput.addEventListener("input", this.onUpperInput);
    this.lowerInput.addEventListener("change", this.onLowerChange);
    this.lowerInput.addEventListener("input", this.onLowerInput);
  }

  disconnectedCallback() {
    this.upperInput.removeEventListener("change");
    this.upperInput.removeEventListener("input");
    this.lowerInput.removeEventListener("change");
    this.lowerInput.removeEventListener("input");
  }

  onUpperInput(evt) {
    const upper = Number(evt.target.value);
    const lower = Number(this.lowerInput.value);
    if (lower > upper) {
      this.lowerInput.value = upper;
      this.setLowerText(upper);
    }
    this.setUpperText(upper);
  }

  onLowerInput(evt) {
    const lower = Number(evt.target.value);
    const upper = Number(this.upperInput.value);
    if (upper < lower) {
      this.upperInput.value = lower;
      this.setUpperText(lower);
    }
    this.setLowerText(lower);
  }

  onUpperChange(evt) {
    this.dispatchEvent(
      new CustomEvent("range-update", {
        detail: { lower: this.lowerInput.value, upper: evt.target.value },
        bubbles: false
      })
    );
  }

  onLowerChange(evt) {
    this.dispatchEvent(
      new CustomEvent("range-update", {
        detail: { lower: evt.target.value, upper: this.upperInput.value },
        bubbles: false
      })
    );
  }

  setLowerText(value) {
    const textEl = this.shadowRoot.getElementById("lower-text");
    textEl.innerHTML = value;
  }

  setUpperText(value) {
    const textEl = this.shadowRoot.getElementById("upper-text");
    textEl.innerHTML = value;
  }
}
