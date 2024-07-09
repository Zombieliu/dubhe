System.register("q-bundled:///fs/cocos/input/types/event/event-gamepad.js", ["./event.js"], function (_export, _context) {
  "use strict";

  var Event, EventGamepad;
  _export("EventGamepad", void 0);
  return {
    setters: [function (_eventJs) {
      Event = _eventJs.Event;
    }],
    execute: function () {
      /*
       Copyright (c) 2022 Chukong Technologies Inc.
       Copyright (c) 2022-2023 Xiamen Yaji Software Co., Ltd.
      
       http://www.cocos.com
      
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
      /**
       * @packageDocumentation
       * @module event
       */
      /**
        * @en
        * The gamepad event.
        * @zh
        * 手柄事件。
        */
      _export("EventGamepad", EventGamepad = class EventGamepad extends Event {
        constructor(type, gamepad) {
          super(type, false);
          /**
           * @en The gamepad device which trigger the current gamepad event
           * @zh 触发当前手柄事件的手柄设备
           */
          this.gamepad = void 0;
          this.gamepad = gamepad;
        }
      });
    }
  };
});