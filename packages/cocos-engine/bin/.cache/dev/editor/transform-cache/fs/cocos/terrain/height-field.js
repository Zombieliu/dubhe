System.register("q-bundled:///fs/cocos/terrain/height-field.js", ["../core/math/index.js"], function (_export, _context) {
  "use strict";

  var clamp, HeightField;
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /*
                                                                                                                                                                                                                                                                                                                                                                                             Copyright (c) 2020-2023 Xiamen Yaji Software Co., Ltd.
                                                                                                                                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                                                                                                                                             https://www.cocos.com/
                                                                                                                                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                                                                                                                                             Permission is hereby granted, free of charge, to any person obtaining a copy
                                                                                                                                                                                                                                                                                                                                                                                             of this software and associated documentation files (the "Software"), to deal
                                                                                                                                                                                                                                                                                                                                                                                             in the Software without restriction, including without limitation the rights to
                                                                                                                                                                                                                                                                                                                                                                                             use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
                                                                                                                                                                                                                                                                                                                                                                                             of the Software, and to permit persons to whom the Software is furnished to do so,
                                                                                                                                                                                                                                                                                                                                                                                             subject to the following conditions:
                                                                                                                                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                                                                                                                                             The above copyright notice and this permission notice shall be included in
                                                                                                                                                                                                                                                                                                                                                                                             all copies or substantial portions of the Software.
                                                                                                                                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                                                                                                                                                                                                             THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                                                                                                                                                                                                                                                                                                                                                                                             IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                                                                                                                                                                                                                                                                                                                                                                                             FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                                                                                                                                                                                                                                                                                                                                                                                             AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                                                                                                                                                                                                                                                                                                                                                                                             LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                                                                                                                                                                                                                                                                                                                                                                                             OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
                                                                                                                                                                                                                                                                                                                                                                                             THE SOFTWARE.
                                                                                                                                                                                                                                                                                                                                                                                            */
  _export("HeightField", void 0);
  return {
    setters: [function (_coreMathIndexJs) {
      clamp = _coreMathIndexJs.clamp;
    }],
    execute: function () {
      _export("HeightField", HeightField = class HeightField {
        constructor(w, h) {
          this.data = new Uint16Array();
          this.w = 0;
          this.h = 0;
          this.w = w;
          this.h = h;
          this.data = new Uint16Array(w * h);
          for (let i = 0; i < w * h; ++i) {
            this.data[i] = 0;
          }
        }
        set(i, j, value) {
          this.data[j * this.w + i] = value;
        }
        get(i, j) {
          return this.data[j * this.w + i];
        }
        getClamp(i, j) {
          i = clamp(i, 0, this.w - 1);
          j = clamp(j, 0, this.h - 1);
          return this.get(i, j);
        }
        getAt(x, y) {
          const fx = x;
          const fy = y;
          let ix0 = Math.floor(fx);
          let iz0 = Math.floor(fy);
          let ix1 = ix0 + 1;
          let iz1 = iz0 + 1;
          const dx = fx - ix0;
          const dz = fy - iz0;
          ix0 = clamp(ix0, 0, this.w - 1);
          iz0 = clamp(iz0, 0, this.h - 1);
          ix1 = clamp(ix1, 0, this.w - 1);
          iz1 = clamp(iz1, 0, this.h - 1);
          let a = this.get(ix0, iz0);
          const b = this.get(ix1, iz0);
          const c = this.get(ix0, iz1);
          let d = this.get(ix1, iz1);
          const m = (b + c) * 0.5;
          if (dx + dz <= 1.0) {
            d = m + (m - a);
          } else {
            a = m + (m - d);
          }
          const h1 = a * (1.0 - dx) + b * dx;
          const h2 = c * (1.0 - dx) + d * dx;
          const h = h1 * (1.0 - dz) + h2 * dz;
          return h;
        }
      });
    }
  };
});