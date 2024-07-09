System.register("q-bundled:///fs/pal/audio/audio-buffer-manager.js", [], function (_export, _context) {
  "use strict";

  var AudioBufferManager, audioBufferManager;
  return {
    setters: [],
    execute: function () {
      /*
       Copyright (c) 2022-2023 Xiamen Yaji Software Co., Ltd.
      
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
      /**
       * This is a manager to manage the cache of audio buffer for web audio.
       */
      AudioBufferManager = /*#__PURE__*/function () {
        function AudioBufferManager() {
          this._audioBufferDataMap = {};
        }
        var _proto = AudioBufferManager.prototype;
        _proto.addCache = function addCache(url, audioBuffer) {
          var audioBufferData = this._audioBufferDataMap[url];
          if (audioBufferData) {
            console.warn("Audio buffer " + url + " has been cached");
            return;
          }
          this._audioBufferDataMap[url] = {
            usedCount: 1,
            audioBuffer: audioBuffer
          };
        };
        _proto.retainCache = function retainCache(url) {
          var audioBufferData = this._audioBufferDataMap[url];
          if (!audioBufferData) {
            console.warn("Audio buffer cache " + url + " has not been added.");
            return;
          }
          audioBufferData.usedCount++;
        };
        _proto.getCache = function getCache(url) {
          var audioBufferData = this._audioBufferDataMap[url];
          return audioBufferData === null || audioBufferData === void 0 ? void 0 : audioBufferData.audioBuffer;
        };
        _proto.tryReleasingCache = function tryReleasingCache(url) {
          var audioBufferData = this._audioBufferDataMap[url];
          if (!audioBufferData) {
            console.warn("Audio buffer cache " + url + " has not been added.");
            return;
          }
          if (--audioBufferData.usedCount <= 0) {
            delete this._audioBufferDataMap[url];
          }
        };
        return AudioBufferManager;
      }();
      _export("audioBufferManager", audioBufferManager = new AudioBufferManager());
    }
  };
});