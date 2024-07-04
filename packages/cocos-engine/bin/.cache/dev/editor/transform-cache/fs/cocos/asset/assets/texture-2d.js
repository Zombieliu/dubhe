System.register("q-bundled:///fs/cocos/asset/assets/texture-2d.js", ["../../../../virtual/internal%253Aconstants.js", "../../core/data/decorators/index.js", "../../gfx/index.js", "./asset-enum.js", "./image-asset.js", "./simple-texture.js", "../../core/index.js"], function (_export, _context) {
  "use strict";

  var EDITOR, TEST, ccclass, type, TextureType, TextureInfo, TextureViewInfo, PixelFormat, ImageAsset, SimpleTexture, js, cclegacy, _dec, _dec2, _class, _class2, _initializer, Texture2D;
  function _applyDecoratedInitializer(target, property, decorators, initializer) {
    return decorators.slice().reverse().reduce(function (decoratedInitializer, decorator) {
      return decorator(target, property, decoratedInitializer) || decoratedInitializer;
    }, initializer);
  }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }
  return {
    setters: [function (_virtualInternal253AconstantsJs) {
      EDITOR = _virtualInternal253AconstantsJs.EDITOR;
      TEST = _virtualInternal253AconstantsJs.TEST;
    }, function (_coreDataDecoratorsIndexJs) {
      ccclass = _coreDataDecoratorsIndexJs.ccclass;
      type = _coreDataDecoratorsIndexJs.type;
    }, function (_gfxIndexJs) {
      TextureType = _gfxIndexJs.TextureType;
      TextureInfo = _gfxIndexJs.TextureInfo;
      TextureViewInfo = _gfxIndexJs.TextureViewInfo;
    }, function (_assetEnumJs) {
      PixelFormat = _assetEnumJs.PixelFormat;
    }, function (_imageAssetJs) {
      ImageAsset = _imageAssetJs.ImageAsset;
    }, function (_simpleTextureJs) {
      SimpleTexture = _simpleTextureJs.SimpleTexture;
    }, function (_coreIndexJs) {
      js = _coreIndexJs.js;
      cclegacy = _coreIndexJs.cclegacy;
    }],
    execute: function () {
      /**
       * @en The create information for [[Texture2D]].
       * @zh 用来创建贴图的信息。
       */
      /**
       * @en The 2D texture asset. It supports mipmap, each level of mipmap use an [[ImageAsset]].
       * @zh 二维贴图资源。二维贴图资源的每个 Mipmap 层级都为一张 [[ImageAsset]]。
       */
      _export("Texture2D", Texture2D = (_dec = ccclass('cc.Texture2D'), _dec2 = type([ImageAsset]), _dec(_class = (_class2 = class Texture2D extends SimpleTexture {
        constructor(...args) {
          super(...args);
          /**
           * @deprecated since v3.5.0, this is an engine private interface that will be removed in the future.
           */
          this._mipmaps = _initializer && _initializer();
          this._generatedMipmaps = [];
        }
        /**
         * @en All levels of mipmap images, be noted, automatically generated mipmaps are not included.
         * When setup mipmap, the size of the texture and pixel format could be modified.
         * @zh 所有层级 Mipmap，注意，这里不包含自动生成的 Mipmap。
         * 当设置 Mipmap 时，贴图的尺寸以及像素格式可能会改变。
         */
        get mipmaps() {
          return this._mipmaps;
        }
        set mipmaps(value) {
          this._mipmaps = value;
          const mipmaps = [];
          if (value.length === 1) {
            // might contain auto generated mipmaps
            const image = value[0];
            mipmaps.push(...image.extractMipmaps());
          } else if (value.length > 1) {
            // image asset mip0 as mipmaps
            for (let i = 0; i < value.length; ++i) {
              const image = value[i];
              mipmaps.push(image.extractMipmap0());
            }
          }
          this._setMipmapParams(mipmaps);
        }

        /**
         * TODO: See: cocos/cocos-engine#15305
         */
        _setMipmapParams(value) {
          this._generatedMipmaps = value;
          this._setMipmapLevel(this._generatedMipmaps.length);
          if (this._generatedMipmaps.length > 0) {
            const imageAsset = this._generatedMipmaps[0];
            this.reset({
              width: imageAsset.width,
              height: imageAsset.height,
              format: imageAsset.format,
              mipmapLevel: this._generatedMipmaps.length,
              baseLevel: this._baseLevel,
              maxLevel: this._maxLevel
            });
            this._generatedMipmaps.forEach((mipmap, level) => {
              this._assignImage(mipmap, level);
            });
            //
          } else {
            this.reset({
              width: 0,
              height: 0,
              mipmapLevel: this._generatedMipmaps.length,
              baseLevel: this._baseLevel,
              maxLevel: this._maxLevel
            });
          }
        }

        /**
         * @en Level 0 mipmap image.
         * Be noted, `this.image = img` equals `this.mipmaps = [img]`,
         * sets image will clear all previous mipmaps.
         * @zh 0 级 Mipmap。
         * 注意，`this.image = img` 等价于 `this.mipmaps = [img]`，
         * 也就是说，通过 `this.image` 设置 0 级 Mipmap 时将隐式地清除之前的所有 Mipmap。
         */
        get image() {
          return this._mipmaps.length === 0 ? null : this._mipmaps[0];
        }
        set image(value) {
          this.mipmaps = value ? [value] : [];
        }
        /**
         * @engineInternal
         */
        initialize() {
          this.mipmaps = this._mipmaps;
        }
        onLoaded() {
          this.initialize();
        }

        /**
         * @en Reset the current texture with given size, pixel format and mipmap images.
         * After reset, the gfx resource will become invalid, you must use [[uploadData]] explicitly to upload the new mipmaps to GPU resources.
         * @zh 将当前贴图重置为指定尺寸、像素格式以及指定 mipmap 层级。重置后，贴图的像素数据将变为未定义。
         * mipmap 图像的数据不会自动更新到贴图中，你必须显式调用 [[uploadData]] 来上传贴图数据。
         * @param info @en The create information. @zh 创建贴图的相关信息。
         */
        reset(info) {
          this._width = info.width;
          this._height = info.height;
          this._setGFXFormat(info.format);
          const mipLevels = info.mipmapLevel === undefined ? 1 : info.mipmapLevel;
          this._setMipmapLevel(mipLevels);
          const minLod = info.baseLevel === undefined ? 0 : info.baseLevel;
          const maxLod = info.maxLevel === undefined ? 1000 : info.maxLevel;
          this._setMipRange(minLod, maxLod);
          this._tryReset();
        }

        /**
         * @en Reset the current texture with given size, pixel format and mipmap images.
         * After reset, the gfx resource will become invalid, you must use [[uploadData]] explicitly to upload the new mipmaps to GPU resources.
         * @zh 将当前贴图重置为指定尺寸、像素格式以及指定 mipmap 层级。重置后，贴图的像素数据将变为未定义。
         * mipmap 图像的数据不会自动更新到贴图中，你必须显式调用 [[uploadData]] 来上传贴图数据。
         * @param width Pixel width
         * @param height Pixel height
         * @param format Pixel format
         * @param mipmapLevel Mipmap level count
         * @param baseLevel Mipmap base level
         * @param maxLevel Mipmap maximum level
         * @deprecated since v1.0 please use [[reset]] instead
         */
        create(width, height, format = PixelFormat.RGBA8888, mipmapLevel = 1, baseLevel = 0, maxLevel = 1000) {
          this.reset({
            width,
            height,
            format,
            mipmapLevel,
            baseLevel,
            maxLevel
          });
        }
        toString() {
          return this._mipmaps.length !== 0 ? this._mipmaps[0].url : '';
        }
        updateMipmaps(firstLevel = 0, count) {
          if (firstLevel >= this._generatedMipmaps.length) {
            return;
          }
          const nUpdate = Math.min(count === undefined ? this._generatedMipmaps.length : count, this._generatedMipmaps.length - firstLevel);
          for (let i = 0; i < nUpdate; ++i) {
            const level = firstLevel + i;
            this._assignImage(this._generatedMipmaps[level], level);
          }
        }

        /**
         * @en If the level 0 mipmap image is a HTML element, then return it, otherwise return null.
         * @zh 若此贴图 0 级 Mipmap 的图像资源的实际源存在并为 HTML 元素则返回它，否则返回 `null`。
         * @returns @en HTMLElement or `null`. @zh HTML 元素或者 null。
         * @deprecated Please use [[ImageAsset.data]] instead
         */
        getHtmlElementObj() {
          return this._mipmaps[0] && this._mipmaps[0].data instanceof HTMLElement ? this._mipmaps[0].data : null;
        }

        /**
         * @en Destroy the current 2d texture, clear up all mipmap levels and the related GPU resources.
         * @zh 销毁此贴图，清空所有 Mipmap 并释放占用的 GPU 资源。
         */
        destroy() {
          this._mipmaps = [];
          this._generatedMipmaps = [];
          return super.destroy();
        }

        /**
         * @en Gets the description of the 2d texture.
         * @zh 返回此贴图的描述。
         * @returns @en The description. @zh 贴图的描述信息。
         */
        description() {
          const url = this._mipmaps[0] ? this._mipmaps[0].url : '';
          return `<cc.Texture2D | Name = ${url} | Dimension = ${this.width} x ${this.height}>`;
        }

        /**
         * @en Release used GPU resources.
         * @zh 释放占用的 GPU 资源。
         * @deprecated please use [[destroy]] instead.
         */
        releaseTexture() {
          this.destroy();
        }

        /**
         * @deprecated since v3.5.0, this is an engine private interface that will be removed in the future.
         */
        _serialize(ctxForExporting) {
          if (EDITOR || TEST) {
            return {
              base: super._serialize(ctxForExporting),
              mipmaps: this._mipmaps.map(mipmap => {
                if (!mipmap || !mipmap._uuid) {
                  return null;
                }
                if (ctxForExporting && ctxForExporting._compressUuid) {
                  // ctxForExporting.dependsOn('_textureSource', texture); TODO
                  return EditorExtends.UuidUtils.compressUuid(mipmap._uuid, true);
                }
                return mipmap._uuid;
              })
            };
          }
          return null;
        }

        /**
         * @deprecated since v3.5.0, this is an engine private interface that will be removed in the future.
         */
        _deserialize(serializedData, handle) {
          const data = serializedData;
          super._deserialize(data.base, handle);
          this._mipmaps = new Array(data.mipmaps.length);
          for (let i = 0; i < data.mipmaps.length; ++i) {
            // Prevent resource load failed
            this._mipmaps[i] = new ImageAsset();
            if (!data.mipmaps[i]) {
              continue;
            }
            const mipmapUUID = data.mipmaps[i];
            handle.result.push(this._mipmaps, `${i}`, mipmapUUID, js.getClassId(ImageAsset));
          }
        }

        /**
         * @engineInternal
         */
        _getGfxTextureCreateInfo(presumed) {
          const texInfo = new TextureInfo(TextureType.TEX2D);
          texInfo.width = this._width;
          texInfo.height = this._height;
          Object.assign(texInfo, presumed);
          return texInfo;
        }

        /**
         * @engineInternal
         */
        _getGfxTextureViewCreateInfo(presumed) {
          const texViewInfo = new TextureViewInfo();
          texViewInfo.type = TextureType.TEX2D;
          Object.assign(texViewInfo, presumed);
          return texViewInfo;
        }
        initDefault(uuid) {
          super.initDefault(uuid);
          const imageAsset = new ImageAsset();
          imageAsset.initDefault();
          this.image = imageAsset;
        }
        validate() {
          return this.mipmaps && this.mipmaps.length !== 0;
        }
      }, (_initializer = _applyDecoratedInitializer(_class2.prototype, "_mipmaps", [_dec2], function () {
        return [];
      })), _class2)) || _class));
      cclegacy.Texture2D = Texture2D;
    }
  };
});