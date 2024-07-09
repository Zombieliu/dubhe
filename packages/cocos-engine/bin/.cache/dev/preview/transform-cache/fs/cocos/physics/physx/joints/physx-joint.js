System.register("q-bundled:///fs/cocos/physics/physx/joints/physx-joint.js", ["../physx-adapter.js", "../physx-instance.js"], function (_export, _context) {
  "use strict";

  var PX, setJointActors, _pxtrans, PhysXInstance, PhysXJoint;
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
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
                                                                                                                                                                                                                                                                                                                                                                                            */ /* eslint-disable @typescript-eslint/no-unsafe-return */
  return {
    setters: [function (_physxAdapterJs) {
      PX = _physxAdapterJs.PX;
      setJointActors = _physxAdapterJs.setJointActors;
      _pxtrans = _physxAdapterJs._pxtrans;
    }, function (_physxInstanceJs) {
      PhysXInstance = _physxInstanceJs.PhysXInstance;
    }],
    execute: function () {
      _export("PhysXJoint", PhysXJoint = /*#__PURE__*/function () {
        function PhysXJoint() {
          this._impl = void 0;
          this._com = void 0;
          this._rigidBody = void 0;
          this._connectedBody = null;
        }
        var _proto = PhysXJoint.prototype;
        _proto.setConnectedBody = function setConnectedBody(v) {
          if (this._connectedBody === v) return;

          // // unregister old
          var oldBody2 = this._connectedBody;
          if (oldBody2) {
            var oldSB2 = oldBody2.body.sharedBody;
            oldSB2.removeJoint(this, 1);
          }
          var sb = this._rigidBody.body.sharedBody;
          sb.removeJoint(this, 0);
          sb.addJoint(this, 0); // add to inner body if this joint is not added to sb
          if (v) {
            var sb2 = v.body.sharedBody;
            setJointActors(this._impl, sb.impl, sb2.impl);
            sb2.addJoint(this, 1); // add to new sb2
          } else {
            setJointActors(this._impl, sb.impl, null);
          }
          if (oldBody2) {
            oldBody2.wakeUp(); // wake it up, or the old body will be sleep for a while
          }

          this._connectedBody = v;
          this.updateScale0();
          this.updateScale1();
        };
        _proto.setEnableCollision = function setEnableCollision(v) {
          this._impl.setConstraintFlag(1 << 3, v);
        };
        _proto.initialize = function initialize(v) {
          this._com = v;
          this._rigidBody = v.attachedBody;
          this._connectedBody = v.connectedBody;
          this.onComponentSet();
          this.setEnableCollision(this._com.enableCollision);
          if (this._impl.$$) {
            PX.IMPL_PTR[this._impl.$$.ptr] = this;
          }
        };
        _proto.enableDebugVisualization = function enableDebugVisualization(v) {
          if (this.impl) {
            this.impl.setConstraintFlag(1 << 4, v); // PxConstraintFlag::eVISUALIZATION
          }
        }

        // virtual
        ;
        _proto.onComponentSet = function onComponentSet() {}

        // virtual
        ;
        _proto.updateScale0 = function updateScale0() {};
        _proto.updateScale1 = function updateScale1() {};
        _proto.onEnable = function onEnable() {
          var sb = this._rigidBody.body.sharedBody;
          var connect = this._com.connectedBody;
          sb.addJoint(this, 0);
          if (connect) {
            var sb2 = connect.body.sharedBody;
            setJointActors(this._impl, sb.impl, sb2.impl);
            sb2.addJoint(this, 1);
          } else {
            setJointActors(this._impl, sb.impl, null);
          }
        };
        _proto.onDisable = function onDisable() {
          setJointActors(this._impl, PhysXJoint.tempActor, null);
          var sb = this._rigidBody.body.sharedBody;
          sb.removeJoint(this, 0);
          var connect = this.constraint.connectedBody;
          if (connect) {
            var sb2 = connect.body.sharedBody;
            sb2.removeJoint(this, 1);
          }
        };
        _proto.onDestroy = function onDestroy() {
          if (this._impl.$$) {
            PX.IMPL_PTR[this._impl.$$.ptr] = null;
            delete PX.IMPL_PTR[this._impl.$$.ptr];
          }
          this._impl.release();
          this._com = null;
          this._rigidBody = null;
          this._connectedBody = null;
          this._impl = null;
        };
        _createClass(PhysXJoint, [{
          key: "impl",
          get: function get() {
            return this._impl;
          }
        }, {
          key: "constraint",
          get: function get() {
            return this._com;
          }
        }], [{
          key: "tempActor",
          get: function get() {
            if (!this._tempActor) {
              this._tempActor = PhysXInstance.physics.createRigidDynamic(_pxtrans);
            }
            return this._tempActor;
          }
        }]);
        return PhysXJoint;
      }());
      PhysXJoint._tempActor = void 0;
    }
  };
});