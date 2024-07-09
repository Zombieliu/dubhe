System.register(['./index-ce98320e.js', './builtin-res-mgr.jsb-c9e8e53a.js', './find-7a03d1cc.js', './deprecated-80961f27.js', './device-90bc7390.js', './deprecated-fcfb90f6.js', './rendering-sub-mesh.jsb-25043997.js', './node-event-18d96a1b.js', './scene-asset.jsb-0d4c6201.js'], (function (exports) {
    'use strict';
    var AABB, Vec3, Vec4, Vec2, legacyCC, Sphere, intersect, toRadian, nextPow2, macro, supportsRGBA16HalfFloatTexture, SKYBOX_FLAG, Material, supportsR32FloatTexture, ProbeType, Camera, Texture2D, ImageAsset, ShadowType$1, LightType$1, CameraUsage, CSMLevel, ShadowType, Uniform, Type, ShaderStageFlagBit, ResolveMode, UniformBlock, Viewport, Rect, Format, LoadOp, ClearFlagBit, Color, StoreOp, Filter, Address, Feature, RecyclePool;
    return {
        setters: [function (module) {
            AABB = module.bE;
            Vec3 = module.n;
            Vec4 = module.p;
            Vec2 = module.V;
            legacyCC = module.l;
            Sphere = module.bF;
            intersect = module.bG;
            toRadian = module.J;
            nextPow2 = module.Z;
            macro = module.aM;
        }, function (module) {
            supportsRGBA16HalfFloatTexture = module.aL;
            SKYBOX_FLAG = module.h;
            Material = module.ap;
            supportsR32FloatTexture = module.aM;
            ProbeType = module.j;
            Camera = module.i;
            Texture2D = module.am;
            ImageAsset = module.al;
            ShadowType$1 = module.x;
            LightType$1 = module.m;
            CameraUsage = module.g;
        }, function () {}, function (module) {
            CSMLevel = module.y;
            ShadowType = module.S;
        }, function (module) {
            Uniform = module.af;
            Type = module.T;
            ShaderStageFlagBit = module.q;
            ResolveMode = module.R;
            UniformBlock = module.ag;
            Viewport = module.a2;
            Rect = module.X;
            Format = module.b;
            LoadOp = module.L;
            ClearFlagBit = module.H;
            Color = module.a3;
            StoreOp = module.r;
            Filter = module.k;
            Address = module.l;
            Feature = module.F;
        }, function (module) {
            RecyclePool = module.R;
        }, function () {}, function () {}, function () {}],
        execute: (function () {

            exports({
                B: getLightingModeName,
                G: getAttachmentTypeName,
                I: getAccessTypeName,
                K: getClearValueTypeName,
                N: getDescriptorTypeOrderName,
                a: buildReflectionProbePasss,
                a3: saveLightInfo,
                a4: loadLightInfo,
                a5: saveDescriptor,
                a6: loadDescriptor,
                a7: saveDescriptorBlock,
                a8: loadDescriptorBlock,
                a9: saveDescriptorBlockFlattened,
                aa: loadDescriptorBlockFlattened,
                ab: saveDescriptorBlockIndex,
                ac: loadDescriptorBlockIndex,
                ad: saveResolvePair,
                ae: loadResolvePair,
                af: saveCopyPair,
                ag: loadCopyPair,
                ah: saveMovePair,
                ai: loadMovePair,
                aj: savePipelineStatistics,
                ak: loadPipelineStatistics,
                b: buildForwardPass,
                c: buildCopyPass,
                d: buildSSSSPass,
                e: buildTransparencyPass,
                f: buildHBAOPasses,
                g: getRenderArea,
                h: hasSkinObject,
                i: isUICamera,
                j: buildToneMappingPass,
                k: buildFxaaPass,
                l: buildBloomPass,
                m: buildPostprocessPass,
                n: buildUIPass,
                o: getCameraUniqueID,
                p: buildShadowPasses,
                s: getUpdateFrequencyName,
                t: getParameterTypeName,
                u: getResourceResidencyName,
                v: getQueueHintName,
                x: getResourceDimensionName,
                z: getTaskTypeName
            });

            let LightType;
            (function (LightType) {
              LightType[LightType["DIRECTIONAL"] = 0] = "DIRECTIONAL";
              LightType[LightType["SPHERE"] = 1] = "SPHERE";
              LightType[LightType["SPOT"] = 2] = "SPOT";
              LightType[LightType["POINT"] = 3] = "POINT";
              LightType[LightType["RANGED_DIRECTIONAL"] = 4] = "RANGED_DIRECTIONAL";
              LightType[LightType["UNKNOWN"] = 5] = "UNKNOWN";
            })(LightType || (LightType = {}));

            function saveUniform(ar, v) {
              ar.writeString(v.name);
              ar.writeNumber(v.type);
              ar.writeNumber(v.count);
            }
            function loadUniform(ar, v) {
              v.name = ar.readString();
              v.type = ar.readNumber();
              v.count = ar.readNumber();
            }
            function saveUniformBlock(ar, v) {
              ar.writeNumber(v.set);
              ar.writeNumber(v.binding);
              ar.writeString(v.name);
              ar.writeNumber(v.members.length);
              for (const v1 of v.members) {
                saveUniform(ar, v1);
              }
              ar.writeNumber(v.count);
            }
            function loadUniformBlock(ar, v) {
              v.set = ar.readNumber();
              v.binding = ar.readNumber();
              v.name = ar.readString();
              let sz = 0;
              sz = ar.readNumber();
              v.members.length = sz;
              for (let i = 0; i !== sz; ++i) {
                const v1 = new Uniform();
                loadUniform(ar, v1);
                v.members[i] = v1;
              }
              v.count = ar.readNumber();
            }

            let UpdateFrequency; exports('U', UpdateFrequency);
            (function (UpdateFrequency) {
              UpdateFrequency[UpdateFrequency["PER_INSTANCE"] = 0] = "PER_INSTANCE";
              UpdateFrequency[UpdateFrequency["PER_BATCH"] = 1] = "PER_BATCH";
              UpdateFrequency[UpdateFrequency["PER_PHASE"] = 2] = "PER_PHASE";
              UpdateFrequency[UpdateFrequency["PER_PASS"] = 3] = "PER_PASS";
              UpdateFrequency[UpdateFrequency["COUNT"] = 4] = "COUNT";
            })(UpdateFrequency || (exports('U', UpdateFrequency = {})));
            function getUpdateFrequencyName(e) {
              switch (e) {
                case UpdateFrequency.PER_INSTANCE:
                  return 'PER_INSTANCE';
                case UpdateFrequency.PER_BATCH:
                  return 'PER_BATCH';
                case UpdateFrequency.PER_PHASE:
                  return 'PER_PHASE';
                case UpdateFrequency.PER_PASS:
                  return 'PER_PASS';
                case UpdateFrequency.COUNT:
                  return 'COUNT';
                default:
                  return '';
              }
            }
            let ParameterType; exports('P', ParameterType);
            (function (ParameterType) {
              ParameterType[ParameterType["CONSTANTS"] = 0] = "CONSTANTS";
              ParameterType[ParameterType["CBV"] = 1] = "CBV";
              ParameterType[ParameterType["UAV"] = 2] = "UAV";
              ParameterType[ParameterType["SRV"] = 3] = "SRV";
              ParameterType[ParameterType["TABLE"] = 4] = "TABLE";
              ParameterType[ParameterType["SSV"] = 5] = "SSV";
            })(ParameterType || (exports('P', ParameterType = {})));
            function getParameterTypeName(e) {
              switch (e) {
                case ParameterType.CONSTANTS:
                  return 'CONSTANTS';
                case ParameterType.CBV:
                  return 'CBV';
                case ParameterType.UAV:
                  return 'UAV';
                case ParameterType.SRV:
                  return 'SRV';
                case ParameterType.TABLE:
                  return 'TABLE';
                case ParameterType.SSV:
                  return 'SSV';
                default:
                  return '';
              }
            }
            let ResourceResidency; exports('R', ResourceResidency);
            (function (ResourceResidency) {
              ResourceResidency[ResourceResidency["MANAGED"] = 0] = "MANAGED";
              ResourceResidency[ResourceResidency["MEMORYLESS"] = 1] = "MEMORYLESS";
              ResourceResidency[ResourceResidency["PERSISTENT"] = 2] = "PERSISTENT";
              ResourceResidency[ResourceResidency["EXTERNAL"] = 3] = "EXTERNAL";
              ResourceResidency[ResourceResidency["BACKBUFFER"] = 4] = "BACKBUFFER";
            })(ResourceResidency || (exports('R', ResourceResidency = {})));
            function getResourceResidencyName(e) {
              switch (e) {
                case ResourceResidency.MANAGED:
                  return 'MANAGED';
                case ResourceResidency.MEMORYLESS:
                  return 'MEMORYLESS';
                case ResourceResidency.PERSISTENT:
                  return 'PERSISTENT';
                case ResourceResidency.EXTERNAL:
                  return 'EXTERNAL';
                case ResourceResidency.BACKBUFFER:
                  return 'BACKBUFFER';
                default:
                  return '';
              }
            }
            let QueueHint; exports('Q', QueueHint);
            (function (QueueHint) {
              QueueHint[QueueHint["NONE"] = 0] = "NONE";
              QueueHint[QueueHint["OPAQUE"] = 1] = "OPAQUE";
              QueueHint[QueueHint["MASK"] = 2] = "MASK";
              QueueHint[QueueHint["BLEND"] = 3] = "BLEND";
              QueueHint[QueueHint["RENDER_OPAQUE"] = 1] = "RENDER_OPAQUE";
              QueueHint[QueueHint["RENDER_CUTOUT"] = 2] = "RENDER_CUTOUT";
              QueueHint[QueueHint["RENDER_TRANSPARENT"] = 3] = "RENDER_TRANSPARENT";
            })(QueueHint || (exports('Q', QueueHint = {})));
            function getQueueHintName(e) {
              switch (e) {
                case QueueHint.NONE:
                  return 'NONE';
                case QueueHint.OPAQUE:
                  return 'OPAQUE';
                case QueueHint.MASK:
                  return 'MASK';
                case QueueHint.BLEND:
                  return 'BLEND';
                default:
                  return '';
              }
            }
            let ResourceDimension; exports('w', ResourceDimension);
            (function (ResourceDimension) {
              ResourceDimension[ResourceDimension["BUFFER"] = 0] = "BUFFER";
              ResourceDimension[ResourceDimension["TEXTURE1D"] = 1] = "TEXTURE1D";
              ResourceDimension[ResourceDimension["TEXTURE2D"] = 2] = "TEXTURE2D";
              ResourceDimension[ResourceDimension["TEXTURE3D"] = 3] = "TEXTURE3D";
            })(ResourceDimension || (exports('w', ResourceDimension = {})));
            function getResourceDimensionName(e) {
              switch (e) {
                case ResourceDimension.BUFFER:
                  return 'BUFFER';
                case ResourceDimension.TEXTURE1D:
                  return 'TEXTURE1D';
                case ResourceDimension.TEXTURE2D:
                  return 'TEXTURE2D';
                case ResourceDimension.TEXTURE3D:
                  return 'TEXTURE3D';
                default:
                  return '';
              }
            }
            let ResourceFlags; exports('y', ResourceFlags);
            (function (ResourceFlags) {
              ResourceFlags[ResourceFlags["NONE"] = 0] = "NONE";
              ResourceFlags[ResourceFlags["UNIFORM"] = 1] = "UNIFORM";
              ResourceFlags[ResourceFlags["INDIRECT"] = 2] = "INDIRECT";
              ResourceFlags[ResourceFlags["STORAGE"] = 4] = "STORAGE";
              ResourceFlags[ResourceFlags["SAMPLED"] = 8] = "SAMPLED";
              ResourceFlags[ResourceFlags["COLOR_ATTACHMENT"] = 16] = "COLOR_ATTACHMENT";
              ResourceFlags[ResourceFlags["DEPTH_STENCIL_ATTACHMENT"] = 32] = "DEPTH_STENCIL_ATTACHMENT";
              ResourceFlags[ResourceFlags["INPUT_ATTACHMENT"] = 64] = "INPUT_ATTACHMENT";
              ResourceFlags[ResourceFlags["SHADING_RATE"] = 128] = "SHADING_RATE";
              ResourceFlags[ResourceFlags["TRANSFER_SRC"] = 256] = "TRANSFER_SRC";
              ResourceFlags[ResourceFlags["TRANSFER_DST"] = 512] = "TRANSFER_DST";
            })(ResourceFlags || (exports('y', ResourceFlags = {})));
            let TaskType; exports('T', TaskType);
            (function (TaskType) {
              TaskType[TaskType["SYNC"] = 0] = "SYNC";
              TaskType[TaskType["ASYNC"] = 1] = "ASYNC";
            })(TaskType || (exports('T', TaskType = {})));
            function getTaskTypeName(e) {
              switch (e) {
                case TaskType.SYNC:
                  return 'SYNC';
                case TaskType.ASYNC:
                  return 'ASYNC';
                default:
                  return '';
              }
            }
            let SceneFlags; exports('S', SceneFlags);
            (function (SceneFlags) {
              SceneFlags[SceneFlags["NONE"] = 0] = "NONE";
              SceneFlags[SceneFlags["OPAQUE"] = 1] = "OPAQUE";
              SceneFlags[SceneFlags["MASK"] = 2] = "MASK";
              SceneFlags[SceneFlags["BLEND"] = 4] = "BLEND";
              SceneFlags[SceneFlags["OPAQUE_OBJECT"] = 1] = "OPAQUE_OBJECT";
              SceneFlags[SceneFlags["CUTOUT_OBJECT"] = 2] = "CUTOUT_OBJECT";
              SceneFlags[SceneFlags["TRANSPARENT_OBJECT"] = 4] = "TRANSPARENT_OBJECT";
              SceneFlags[SceneFlags["SHADOW_CASTER"] = 8] = "SHADOW_CASTER";
              SceneFlags[SceneFlags["UI"] = 16] = "UI";
              SceneFlags[SceneFlags["DEFAULT_LIGHTING"] = 32] = "DEFAULT_LIGHTING";
              SceneFlags[SceneFlags["VOLUMETRIC_LIGHTING"] = 64] = "VOLUMETRIC_LIGHTING";
              SceneFlags[SceneFlags["CLUSTERED_LIGHTING"] = 128] = "CLUSTERED_LIGHTING";
              SceneFlags[SceneFlags["PLANAR_SHADOW"] = 256] = "PLANAR_SHADOW";
              SceneFlags[SceneFlags["GEOMETRY"] = 512] = "GEOMETRY";
              SceneFlags[SceneFlags["PROFILER"] = 1024] = "PROFILER";
              SceneFlags[SceneFlags["DRAW_INSTANCING"] = 2048] = "DRAW_INSTANCING";
              SceneFlags[SceneFlags["DRAW_NON_INSTANCING"] = 4096] = "DRAW_NON_INSTANCING";
              SceneFlags[SceneFlags["REFLECTION_PROBE"] = 8192] = "REFLECTION_PROBE";
              SceneFlags[SceneFlags["GPU_DRIVEN"] = 16384] = "GPU_DRIVEN";
              SceneFlags[SceneFlags["NON_BUILTIN"] = 32768] = "NON_BUILTIN";
              SceneFlags[SceneFlags["ALL"] = 4294967295] = "ALL";
            })(SceneFlags || (exports('S', SceneFlags = {})));
            let LightingMode; exports('A', LightingMode);
            (function (LightingMode) {
              LightingMode[LightingMode["NONE"] = 0] = "NONE";
              LightingMode[LightingMode["DEFAULT"] = 1] = "DEFAULT";
              LightingMode[LightingMode["CLUSTERED"] = 2] = "CLUSTERED";
            })(LightingMode || (exports('A', LightingMode = {})));
            function getLightingModeName(e) {
              switch (e) {
                case LightingMode.NONE:
                  return 'NONE';
                case LightingMode.DEFAULT:
                  return 'DEFAULT';
                case LightingMode.CLUSTERED:
                  return 'CLUSTERED';
                default:
                  return '';
              }
            }
            let AttachmentType; exports('E', AttachmentType);
            (function (AttachmentType) {
              AttachmentType[AttachmentType["RENDER_TARGET"] = 0] = "RENDER_TARGET";
              AttachmentType[AttachmentType["DEPTH_STENCIL"] = 1] = "DEPTH_STENCIL";
              AttachmentType[AttachmentType["SHADING_RATE"] = 2] = "SHADING_RATE";
            })(AttachmentType || (exports('E', AttachmentType = {})));
            function getAttachmentTypeName(e) {
              switch (e) {
                case AttachmentType.RENDER_TARGET:
                  return 'RENDER_TARGET';
                case AttachmentType.DEPTH_STENCIL:
                  return 'DEPTH_STENCIL';
                case AttachmentType.SHADING_RATE:
                  return 'SHADING_RATE';
                default:
                  return '';
              }
            }
            let AccessType; exports('H', AccessType);
            (function (AccessType) {
              AccessType[AccessType["READ"] = 0] = "READ";
              AccessType[AccessType["READ_WRITE"] = 1] = "READ_WRITE";
              AccessType[AccessType["WRITE"] = 2] = "WRITE";
            })(AccessType || (exports('H', AccessType = {})));
            function getAccessTypeName(e) {
              switch (e) {
                case AccessType.READ:
                  return 'READ';
                case AccessType.READ_WRITE:
                  return 'READ_WRITE';
                case AccessType.WRITE:
                  return 'WRITE';
                default:
                  return '';
              }
            }
            let ClearValueType; exports('J', ClearValueType);
            (function (ClearValueType) {
              ClearValueType[ClearValueType["NONE"] = 0] = "NONE";
              ClearValueType[ClearValueType["FLOAT_TYPE"] = 1] = "FLOAT_TYPE";
              ClearValueType[ClearValueType["INT_TYPE"] = 2] = "INT_TYPE";
            })(ClearValueType || (exports('J', ClearValueType = {})));
            function getClearValueTypeName(e) {
              switch (e) {
                case ClearValueType.NONE:
                  return 'NONE';
                case ClearValueType.FLOAT_TYPE:
                  return 'FLOAT_TYPE';
                case ClearValueType.INT_TYPE:
                  return 'INT_TYPE';
                default:
                  return '';
              }
            }
            class LightInfo {
              constructor(light = null, level = 0, culledByLight = false, probe = null) {
                this.light = void 0;
                this.probe = void 0;
                this.level = void 0;
                this.culledByLight = void 0;
                this.light = light;
                this.probe = probe;
                this.level = level;
                this.culledByLight = culledByLight;
              }
              reset(light = null, level = 0, culledByLight = false, probe = null) {
                this.light = light;
                this.probe = probe;
                this.level = level;
                this.culledByLight = culledByLight;
              }
            } exports('L', LightInfo);
            let DescriptorTypeOrder; exports('M', DescriptorTypeOrder);
            (function (DescriptorTypeOrder) {
              DescriptorTypeOrder[DescriptorTypeOrder["UNIFORM_BUFFER"] = 0] = "UNIFORM_BUFFER";
              DescriptorTypeOrder[DescriptorTypeOrder["DYNAMIC_UNIFORM_BUFFER"] = 1] = "DYNAMIC_UNIFORM_BUFFER";
              DescriptorTypeOrder[DescriptorTypeOrder["SAMPLER_TEXTURE"] = 2] = "SAMPLER_TEXTURE";
              DescriptorTypeOrder[DescriptorTypeOrder["SAMPLER"] = 3] = "SAMPLER";
              DescriptorTypeOrder[DescriptorTypeOrder["TEXTURE"] = 4] = "TEXTURE";
              DescriptorTypeOrder[DescriptorTypeOrder["STORAGE_BUFFER"] = 5] = "STORAGE_BUFFER";
              DescriptorTypeOrder[DescriptorTypeOrder["DYNAMIC_STORAGE_BUFFER"] = 6] = "DYNAMIC_STORAGE_BUFFER";
              DescriptorTypeOrder[DescriptorTypeOrder["STORAGE_IMAGE"] = 7] = "STORAGE_IMAGE";
              DescriptorTypeOrder[DescriptorTypeOrder["INPUT_ATTACHMENT"] = 8] = "INPUT_ATTACHMENT";
            })(DescriptorTypeOrder || (exports('M', DescriptorTypeOrder = {})));
            function getDescriptorTypeOrderName(e) {
              switch (e) {
                case DescriptorTypeOrder.UNIFORM_BUFFER:
                  return 'UNIFORM_BUFFER';
                case DescriptorTypeOrder.DYNAMIC_UNIFORM_BUFFER:
                  return 'DYNAMIC_UNIFORM_BUFFER';
                case DescriptorTypeOrder.SAMPLER_TEXTURE:
                  return 'SAMPLER_TEXTURE';
                case DescriptorTypeOrder.SAMPLER:
                  return 'SAMPLER';
                case DescriptorTypeOrder.TEXTURE:
                  return 'TEXTURE';
                case DescriptorTypeOrder.STORAGE_BUFFER:
                  return 'STORAGE_BUFFER';
                case DescriptorTypeOrder.DYNAMIC_STORAGE_BUFFER:
                  return 'DYNAMIC_STORAGE_BUFFER';
                case DescriptorTypeOrder.STORAGE_IMAGE:
                  return 'STORAGE_IMAGE';
                case DescriptorTypeOrder.INPUT_ATTACHMENT:
                  return 'INPUT_ATTACHMENT';
                default:
                  return '';
              }
            }
            class Descriptor {
              constructor(type = Type.UNKNOWN) {
                this.type = void 0;
                this.count = 1;
                this.type = type;
              }
              reset(type = Type.UNKNOWN) {
                this.type = type;
                this.count = 1;
              }
            } exports('O', Descriptor);
            class DescriptorBlock {
              constructor() {
                this.descriptors = new Map();
                this.uniformBlocks = new Map();
                this.capacity = 0;
                this.count = 0;
              }
              reset() {
                this.descriptors.clear();
                this.uniformBlocks.clear();
                this.capacity = 0;
                this.count = 0;
              }
            } exports('V', DescriptorBlock);
            class DescriptorBlockFlattened {
              constructor() {
                this.descriptorNames = [];
                this.uniformBlockNames = [];
                this.descriptors = [];
                this.uniformBlocks = [];
                this.capacity = 0;
                this.count = 0;
              }
              reset() {
                this.descriptorNames.length = 0;
                this.uniformBlockNames.length = 0;
                this.descriptors.length = 0;
                this.uniformBlocks.length = 0;
                this.capacity = 0;
                this.count = 0;
              }
            } exports('W', DescriptorBlockFlattened);
            class DescriptorBlockIndex {
              constructor(updateFrequency = UpdateFrequency.PER_INSTANCE, parameterType = ParameterType.CONSTANTS, descriptorType = DescriptorTypeOrder.UNIFORM_BUFFER, visibility = ShaderStageFlagBit.NONE) {
                this.updateFrequency = void 0;
                this.parameterType = void 0;
                this.descriptorType = void 0;
                this.visibility = void 0;
                this.updateFrequency = updateFrequency;
                this.parameterType = parameterType;
                this.descriptorType = descriptorType;
                this.visibility = visibility;
              }
            } exports('X', DescriptorBlockIndex);
            let ResolveFlags; exports('Y', ResolveFlags);
            (function (ResolveFlags) {
              ResolveFlags[ResolveFlags["NONE"] = 0] = "NONE";
              ResolveFlags[ResolveFlags["COLOR"] = 1] = "COLOR";
              ResolveFlags[ResolveFlags["DEPTH"] = 2] = "DEPTH";
              ResolveFlags[ResolveFlags["STENCIL"] = 4] = "STENCIL";
            })(ResolveFlags || (exports('Y', ResolveFlags = {})));
            class ResolvePair {
              constructor(source = '', target = '', resolveFlags = ResolveFlags.NONE, mode = ResolveMode.SAMPLE_ZERO, mode1 = ResolveMode.SAMPLE_ZERO) {
                this.source = void 0;
                this.target = void 0;
                this.resolveFlags = void 0;
                this.mode = void 0;
                this.mode1 = void 0;
                this.source = source;
                this.target = target;
                this.resolveFlags = resolveFlags;
                this.mode = mode;
                this.mode1 = mode1;
              }
              reset(source = '', target = '', resolveFlags = ResolveFlags.NONE, mode = ResolveMode.SAMPLE_ZERO, mode1 = ResolveMode.SAMPLE_ZERO) {
                this.source = source;
                this.target = target;
                this.resolveFlags = resolveFlags;
                this.mode = mode;
                this.mode1 = mode1;
              }
            } exports('Z', ResolvePair);
            class CopyPair {
              constructor(source = '', target = '', mipLevels = 0xFFFFFFFF, numSlices = 0xFFFFFFFF, sourceMostDetailedMip = 0, sourceFirstSlice = 0, sourcePlaneSlice = 0, targetMostDetailedMip = 0, targetFirstSlice = 0, targetPlaneSlice = 0) {
                this.source = void 0;
                this.target = void 0;
                this.mipLevels = void 0;
                this.numSlices = void 0;
                this.sourceMostDetailedMip = void 0;
                this.sourceFirstSlice = void 0;
                this.sourcePlaneSlice = void 0;
                this.targetMostDetailedMip = void 0;
                this.targetFirstSlice = void 0;
                this.targetPlaneSlice = void 0;
                this.source = source;
                this.target = target;
                this.mipLevels = mipLevels;
                this.numSlices = numSlices;
                this.sourceMostDetailedMip = sourceMostDetailedMip;
                this.sourceFirstSlice = sourceFirstSlice;
                this.sourcePlaneSlice = sourcePlaneSlice;
                this.targetMostDetailedMip = targetMostDetailedMip;
                this.targetFirstSlice = targetFirstSlice;
                this.targetPlaneSlice = targetPlaneSlice;
              }
              reset(source = '', target = '', mipLevels = 0xFFFFFFFF, numSlices = 0xFFFFFFFF, sourceMostDetailedMip = 0, sourceFirstSlice = 0, sourcePlaneSlice = 0, targetMostDetailedMip = 0, targetFirstSlice = 0, targetPlaneSlice = 0) {
                this.source = source;
                this.target = target;
                this.mipLevels = mipLevels;
                this.numSlices = numSlices;
                this.sourceMostDetailedMip = sourceMostDetailedMip;
                this.sourceFirstSlice = sourceFirstSlice;
                this.sourcePlaneSlice = sourcePlaneSlice;
                this.targetMostDetailedMip = targetMostDetailedMip;
                this.targetFirstSlice = targetFirstSlice;
                this.targetPlaneSlice = targetPlaneSlice;
              }
            } exports('C', CopyPair);
            class UploadPair {
              constructor(source = new Uint8Array(0), target = '', mipLevels = 0xFFFFFFFF, numSlices = 0xFFFFFFFF, targetMostDetailedMip = 0, targetFirstSlice = 0, targetPlaneSlice = 0) {
                this.source = void 0;
                this.target = void 0;
                this.mipLevels = void 0;
                this.numSlices = void 0;
                this.targetMostDetailedMip = void 0;
                this.targetFirstSlice = void 0;
                this.targetPlaneSlice = void 0;
                this.source = source;
                this.target = target;
                this.mipLevels = mipLevels;
                this.numSlices = numSlices;
                this.targetMostDetailedMip = targetMostDetailedMip;
                this.targetFirstSlice = targetFirstSlice;
                this.targetPlaneSlice = targetPlaneSlice;
              }
              reset(target = '', mipLevels = 0xFFFFFFFF, numSlices = 0xFFFFFFFF, targetMostDetailedMip = 0, targetFirstSlice = 0, targetPlaneSlice = 0) {
                this.target = target;
                this.mipLevels = mipLevels;
                this.numSlices = numSlices;
                this.targetMostDetailedMip = targetMostDetailedMip;
                this.targetFirstSlice = targetFirstSlice;
                this.targetPlaneSlice = targetPlaneSlice;
              }
            } exports('_', UploadPair);
            class MovePair {
              constructor(source = '', target = '', mipLevels = 0xFFFFFFFF, numSlices = 0xFFFFFFFF, targetMostDetailedMip = 0, targetFirstSlice = 0, targetPlaneSlice = 0) {
                this.source = void 0;
                this.target = void 0;
                this.mipLevels = void 0;
                this.numSlices = void 0;
                this.targetMostDetailedMip = void 0;
                this.targetFirstSlice = void 0;
                this.targetPlaneSlice = void 0;
                this.source = source;
                this.target = target;
                this.mipLevels = mipLevels;
                this.numSlices = numSlices;
                this.targetMostDetailedMip = targetMostDetailedMip;
                this.targetFirstSlice = targetFirstSlice;
                this.targetPlaneSlice = targetPlaneSlice;
              }
              reset(source = '', target = '', mipLevels = 0xFFFFFFFF, numSlices = 0xFFFFFFFF, targetMostDetailedMip = 0, targetFirstSlice = 0, targetPlaneSlice = 0) {
                this.source = source;
                this.target = target;
                this.mipLevels = mipLevels;
                this.numSlices = numSlices;
                this.targetMostDetailedMip = targetMostDetailedMip;
                this.targetFirstSlice = targetFirstSlice;
                this.targetPlaneSlice = targetPlaneSlice;
              }
            } exports('$', MovePair);
            class PipelineStatistics {
              constructor() {
                this.numRenderPasses = 0;
                this.numManagedTextures = 0;
                this.totalManagedTextures = 0;
                this.numUploadBuffers = 0;
                this.numUploadBufferViews = 0;
                this.numFreeUploadBuffers = 0;
                this.numFreeUploadBufferViews = 0;
                this.numDescriptorSets = 0;
                this.numFreeDescriptorSets = 0;
                this.numInstancingBuffers = 0;
                this.numInstancingUniformBlocks = 0;
              }
              reset() {
                this.numRenderPasses = 0;
                this.numManagedTextures = 0;
                this.totalManagedTextures = 0;
                this.numUploadBuffers = 0;
                this.numUploadBufferViews = 0;
                this.numFreeUploadBuffers = 0;
                this.numFreeUploadBufferViews = 0;
                this.numDescriptorSets = 0;
                this.numFreeDescriptorSets = 0;
                this.numInstancingBuffers = 0;
                this.numInstancingUniformBlocks = 0;
              }
            } exports('a0', PipelineStatistics);
            class RenderCommonObjectPoolSettings {
              constructor(batchSize) {
                this.lightInfoBatchSize = 16;
                this.descriptorBatchSize = 16;
                this.descriptorBlockBatchSize = 16;
                this.descriptorBlockFlattenedBatchSize = 16;
                this.descriptorBlockIndexBatchSize = 16;
                this.resolvePairBatchSize = 16;
                this.copyPairBatchSize = 16;
                this.uploadPairBatchSize = 16;
                this.movePairBatchSize = 16;
                this.pipelineStatisticsBatchSize = 16;
                this.lightInfoBatchSize = batchSize;
                this.descriptorBatchSize = batchSize;
                this.descriptorBlockBatchSize = batchSize;
                this.descriptorBlockFlattenedBatchSize = batchSize;
                this.descriptorBlockIndexBatchSize = batchSize;
                this.resolvePairBatchSize = batchSize;
                this.copyPairBatchSize = batchSize;
                this.uploadPairBatchSize = batchSize;
                this.movePairBatchSize = batchSize;
                this.pipelineStatisticsBatchSize = batchSize;
              }
            } exports('a1', RenderCommonObjectPoolSettings);
            class RenderCommonObjectPool {
              constructor(settings) {
                this._lightInfo = void 0;
                this._descriptor = void 0;
                this._descriptorBlock = void 0;
                this._descriptorBlockFlattened = void 0;
                this._descriptorBlockIndex = void 0;
                this._resolvePair = void 0;
                this._copyPair = void 0;
                this._uploadPair = void 0;
                this._movePair = void 0;
                this._pipelineStatistics = void 0;
                this._lightInfo = new RecyclePool(() => new LightInfo(), settings.lightInfoBatchSize);
                this._descriptor = new RecyclePool(() => new Descriptor(), settings.descriptorBatchSize);
                this._descriptorBlock = new RecyclePool(() => new DescriptorBlock(), settings.descriptorBlockBatchSize);
                this._descriptorBlockFlattened = new RecyclePool(() => new DescriptorBlockFlattened(), settings.descriptorBlockFlattenedBatchSize);
                this._descriptorBlockIndex = new RecyclePool(() => new DescriptorBlockIndex(), settings.descriptorBlockIndexBatchSize);
                this._resolvePair = new RecyclePool(() => new ResolvePair(), settings.resolvePairBatchSize);
                this._copyPair = new RecyclePool(() => new CopyPair(), settings.copyPairBatchSize);
                this._uploadPair = new RecyclePool(() => new UploadPair(), settings.uploadPairBatchSize);
                this._movePair = new RecyclePool(() => new MovePair(), settings.movePairBatchSize);
                this._pipelineStatistics = new RecyclePool(() => new PipelineStatistics(), settings.pipelineStatisticsBatchSize);
              }
              reset() {
                this._lightInfo.reset();
                this._descriptor.reset();
                this._descriptorBlock.reset();
                this._descriptorBlockFlattened.reset();
                this._descriptorBlockIndex.reset();
                this._resolvePair.reset();
                this._copyPair.reset();
                this._uploadPair.reset();
                this._movePair.reset();
                this._pipelineStatistics.reset();
              }
              createLightInfo(light = null, level = 0, culledByLight = false, probe = null) {
                const v = this._lightInfo.add();
                v.reset(light, level, culledByLight, probe);
                return v;
              }
              createDescriptor(type = Type.UNKNOWN) {
                const v = this._descriptor.add();
                v.reset(type);
                return v;
              }
              createDescriptorBlock() {
                const v = this._descriptorBlock.add();
                v.reset();
                return v;
              }
              createDescriptorBlockFlattened() {
                const v = this._descriptorBlockFlattened.add();
                v.reset();
                return v;
              }
              createDescriptorBlockIndex(updateFrequency = UpdateFrequency.PER_INSTANCE, parameterType = ParameterType.CONSTANTS, descriptorType = DescriptorTypeOrder.UNIFORM_BUFFER, visibility = ShaderStageFlagBit.NONE) {
                const v = this._descriptorBlockIndex.add();
                v.updateFrequency = updateFrequency;
                v.parameterType = parameterType;
                v.descriptorType = descriptorType;
                v.visibility = visibility;
                return v;
              }
              createResolvePair(source = '', target = '', resolveFlags = ResolveFlags.NONE, mode = ResolveMode.SAMPLE_ZERO, mode1 = ResolveMode.SAMPLE_ZERO) {
                const v = this._resolvePair.add();
                v.reset(source, target, resolveFlags, mode, mode1);
                return v;
              }
              createCopyPair(source = '', target = '', mipLevels = 0xFFFFFFFF, numSlices = 0xFFFFFFFF, sourceMostDetailedMip = 0, sourceFirstSlice = 0, sourcePlaneSlice = 0, targetMostDetailedMip = 0, targetFirstSlice = 0, targetPlaneSlice = 0) {
                const v = this._copyPair.add();
                v.reset(source, target, mipLevels, numSlices, sourceMostDetailedMip, sourceFirstSlice, sourcePlaneSlice, targetMostDetailedMip, targetFirstSlice, targetPlaneSlice);
                return v;
              }
              createUploadPair(target = '', mipLevels = 0xFFFFFFFF, numSlices = 0xFFFFFFFF, targetMostDetailedMip = 0, targetFirstSlice = 0, targetPlaneSlice = 0) {
                const v = this._uploadPair.add();
                v.reset(target, mipLevels, numSlices, targetMostDetailedMip, targetFirstSlice, targetPlaneSlice);
                return v;
              }
              createMovePair(source = '', target = '', mipLevels = 0xFFFFFFFF, numSlices = 0xFFFFFFFF, targetMostDetailedMip = 0, targetFirstSlice = 0, targetPlaneSlice = 0) {
                const v = this._movePair.add();
                v.reset(source, target, mipLevels, numSlices, targetMostDetailedMip, targetFirstSlice, targetPlaneSlice);
                return v;
              }
              createPipelineStatistics() {
                const v = this._pipelineStatistics.add();
                v.reset();
                return v;
              }
            } exports('a2', RenderCommonObjectPool);
            function saveLightInfo(ar, v) {
              ar.writeNumber(v.level);
              ar.writeBool(v.culledByLight);
            }
            function loadLightInfo(ar, v) {
              v.level = ar.readNumber();
              v.culledByLight = ar.readBool();
            }
            function saveDescriptor(ar, v) {
              ar.writeNumber(v.type);
              ar.writeNumber(v.count);
            }
            function loadDescriptor(ar, v) {
              v.type = ar.readNumber();
              v.count = ar.readNumber();
            }
            function saveDescriptorBlock(ar, v) {
              ar.writeNumber(v.descriptors.size);
              for (const [k1, v1] of v.descriptors) {
                ar.writeString(k1);
                saveDescriptor(ar, v1);
              }
              ar.writeNumber(v.uniformBlocks.size);
              for (const [k1, v1] of v.uniformBlocks) {
                ar.writeString(k1);
                saveUniformBlock(ar, v1);
              }
              ar.writeNumber(v.capacity);
              ar.writeNumber(v.count);
            }
            function loadDescriptorBlock(ar, v) {
              let sz = 0;
              sz = ar.readNumber();
              for (let i1 = 0; i1 !== sz; ++i1) {
                const k1 = ar.readString();
                const v1 = new Descriptor();
                loadDescriptor(ar, v1);
                v.descriptors.set(k1, v1);
              }
              sz = ar.readNumber();
              for (let i1 = 0; i1 !== sz; ++i1) {
                const k1 = ar.readString();
                const v1 = new UniformBlock();
                loadUniformBlock(ar, v1);
                v.uniformBlocks.set(k1, v1);
              }
              v.capacity = ar.readNumber();
              v.count = ar.readNumber();
            }
            function saveDescriptorBlockFlattened(ar, v) {
              ar.writeNumber(v.descriptorNames.length);
              for (const v1 of v.descriptorNames) {
                ar.writeString(v1);
              }
              ar.writeNumber(v.uniformBlockNames.length);
              for (const v1 of v.uniformBlockNames) {
                ar.writeString(v1);
              }
              ar.writeNumber(v.descriptors.length);
              for (const v1 of v.descriptors) {
                saveDescriptor(ar, v1);
              }
              ar.writeNumber(v.uniformBlocks.length);
              for (const v1 of v.uniformBlocks) {
                saveUniformBlock(ar, v1);
              }
              ar.writeNumber(v.capacity);
              ar.writeNumber(v.count);
            }
            function loadDescriptorBlockFlattened(ar, v) {
              let sz = 0;
              sz = ar.readNumber();
              v.descriptorNames.length = sz;
              for (let i1 = 0; i1 !== sz; ++i1) {
                v.descriptorNames[i1] = ar.readString();
              }
              sz = ar.readNumber();
              v.uniformBlockNames.length = sz;
              for (let i1 = 0; i1 !== sz; ++i1) {
                v.uniformBlockNames[i1] = ar.readString();
              }
              sz = ar.readNumber();
              v.descriptors.length = sz;
              for (let i1 = 0; i1 !== sz; ++i1) {
                const v1 = new Descriptor();
                loadDescriptor(ar, v1);
                v.descriptors[i1] = v1;
              }
              sz = ar.readNumber();
              v.uniformBlocks.length = sz;
              for (let i1 = 0; i1 !== sz; ++i1) {
                const v1 = new UniformBlock();
                loadUniformBlock(ar, v1);
                v.uniformBlocks[i1] = v1;
              }
              v.capacity = ar.readNumber();
              v.count = ar.readNumber();
            }
            function saveDescriptorBlockIndex(ar, v) {
              ar.writeNumber(v.updateFrequency);
              ar.writeNumber(v.parameterType);
              ar.writeNumber(v.descriptorType);
              ar.writeNumber(v.visibility);
            }
            function loadDescriptorBlockIndex(ar, v) {
              v.updateFrequency = ar.readNumber();
              v.parameterType = ar.readNumber();
              v.descriptorType = ar.readNumber();
              v.visibility = ar.readNumber();
            }
            function saveResolvePair(ar, v) {
              ar.writeString(v.source);
              ar.writeString(v.target);
              ar.writeNumber(v.resolveFlags);
              ar.writeNumber(v.mode);
              ar.writeNumber(v.mode1);
            }
            function loadResolvePair(ar, v) {
              v.source = ar.readString();
              v.target = ar.readString();
              v.resolveFlags = ar.readNumber();
              v.mode = ar.readNumber();
              v.mode1 = ar.readNumber();
            }
            function saveCopyPair(ar, v) {
              ar.writeString(v.source);
              ar.writeString(v.target);
              ar.writeNumber(v.mipLevels);
              ar.writeNumber(v.numSlices);
              ar.writeNumber(v.sourceMostDetailedMip);
              ar.writeNumber(v.sourceFirstSlice);
              ar.writeNumber(v.sourcePlaneSlice);
              ar.writeNumber(v.targetMostDetailedMip);
              ar.writeNumber(v.targetFirstSlice);
              ar.writeNumber(v.targetPlaneSlice);
            }
            function loadCopyPair(ar, v) {
              v.source = ar.readString();
              v.target = ar.readString();
              v.mipLevels = ar.readNumber();
              v.numSlices = ar.readNumber();
              v.sourceMostDetailedMip = ar.readNumber();
              v.sourceFirstSlice = ar.readNumber();
              v.sourcePlaneSlice = ar.readNumber();
              v.targetMostDetailedMip = ar.readNumber();
              v.targetFirstSlice = ar.readNumber();
              v.targetPlaneSlice = ar.readNumber();
            }
            function saveMovePair(ar, v) {
              ar.writeString(v.source);
              ar.writeString(v.target);
              ar.writeNumber(v.mipLevels);
              ar.writeNumber(v.numSlices);
              ar.writeNumber(v.targetMostDetailedMip);
              ar.writeNumber(v.targetFirstSlice);
              ar.writeNumber(v.targetPlaneSlice);
            }
            function loadMovePair(ar, v) {
              v.source = ar.readString();
              v.target = ar.readString();
              v.mipLevels = ar.readNumber();
              v.numSlices = ar.readNumber();
              v.targetMostDetailedMip = ar.readNumber();
              v.targetFirstSlice = ar.readNumber();
              v.targetPlaneSlice = ar.readNumber();
            }
            function savePipelineStatistics(ar, v) {
              ar.writeNumber(v.numRenderPasses);
              ar.writeNumber(v.numManagedTextures);
              ar.writeNumber(v.totalManagedTextures);
              ar.writeNumber(v.numUploadBuffers);
              ar.writeNumber(v.numUploadBufferViews);
              ar.writeNumber(v.numFreeUploadBuffers);
              ar.writeNumber(v.numFreeUploadBufferViews);
              ar.writeNumber(v.numDescriptorSets);
              ar.writeNumber(v.numFreeDescriptorSets);
              ar.writeNumber(v.numInstancingBuffers);
              ar.writeNumber(v.numInstancingUniformBlocks);
            }
            function loadPipelineStatistics(ar, v) {
              v.numRenderPasses = ar.readNumber();
              v.numManagedTextures = ar.readNumber();
              v.totalManagedTextures = ar.readNumber();
              v.numUploadBuffers = ar.readNumber();
              v.numUploadBufferViews = ar.readNumber();
              v.numFreeUploadBuffers = ar.readNumber();
              v.numFreeUploadBufferViews = ar.readNumber();
              v.numDescriptorSets = ar.readNumber();
              v.numFreeDescriptorSets = ar.readNumber();
              v.numInstancingBuffers = ar.readNumber();
              v.numInstancingUniformBlocks = ar.readNumber();
            }

            new Viewport();
            new Rect();
            function SRGBToLinear(out, gamma) {
              out.x = gamma.x * gamma.x;
              out.y = gamma.y * gamma.y;
              out.z = gamma.z * gamma.z;
            }
            let profilerCamera = null;
            function getProfilerCamera() {
              return profilerCamera;
            }

            const DebugViewSingleType = exports('q', {
              NONE: 0,
              VERTEX_COLOR: 1,
              VERTEX_NORMAL: 2,
              VERTEX_TANGENT: 3,
              WORLD_POS: 4,
              VERTEX_MIRROR: 5,
              FACE_SIDE: 6,
              UV0: 7,
              UV1: 8,
              UV_LIGHTMAP: 9,
              PROJ_DEPTH: 10,
              LINEAR_DEPTH: 11,
              FRAGMENT_NORMAL: 12,
              FRAGMENT_TANGENT: 13,
              FRAGMENT_BINORMAL: 14,
              BASE_COLOR: 15,
              DIFFUSE_COLOR: 16,
              SPECULAR_COLOR: 17,
              TRANSPARENCY: 18,
              METALLIC: 19,
              ROUGHNESS: 20,
              SPECULAR_INTENSITY: 21,
              IOR: 22,
              DIRECT_DIFFUSE: 23,
              DIRECT_SPECULAR: 24,
              DIRECT_ALL: 25,
              ENV_DIFFUSE: 26,
              ENV_SPECULAR: 27,
              ENV_ALL: 28,
              EMISSIVE: 29,
              LIGHT_MAP: 30,
              SHADOW: 31,
              AO: 32,
              FRESNEL: 33,
              DIRECT_TRANSMIT_DIFFUSE: 34,
              DIRECT_TRANSMIT_SPECULAR: 35,
              ENV_TRANSMIT_DIFFUSE: 36,
              ENV_TRANSMIT_SPECULAR: 37,
              TRANSMIT_ALL: 38,
              DIRECT_TRT: 39,
              ENV_TRT: 40,
              TRT_ALL: 41,
              FOG: 42
            });
            const DebugViewCompositeType = exports('r', {
              DIRECT_DIFFUSE: 0,
              DIRECT_SPECULAR: 1,
              ENV_DIFFUSE: 2,
              ENV_SPECULAR: 3,
              EMISSIVE: 4,
              LIGHT_MAP: 5,
              SHADOW: 6,
              AO: 7,
              NORMAL_MAP: 8,
              FOG: 9,
              TONE_MAPPING: 10,
              GAMMA_CORRECTION: 11,
              FRESNEL: 12,
              TRANSMIT_DIFFUSE: 13,
              TRANSMIT_SPECULAR: 14,
              TRT: 15,
              TT: 16,
              MAX_BIT_COUNT: 17
            });

            const _rangedDirLightBoundingBox = new AABB(0.0, 0.0, 0.0, 0.5, 0.5, 0.5);
            const _tmpBoundingBox = new AABB();
            let AntiAliasing;
            (function (AntiAliasing) {
              AntiAliasing[AntiAliasing["NONE"] = 0] = "NONE";
              AntiAliasing[AntiAliasing["FXAA"] = 1] = "FXAA";
              AntiAliasing[AntiAliasing["FXAAHQ"] = 2] = "FXAAHQ";
            })(AntiAliasing || (AntiAliasing = {}));
            function getRTFormatBeforeToneMapping(ppl) {
              const useFloatOutput = ppl.getMacroBool('CC_USE_FLOAT_OUTPUT');
              return ppl.pipelineSceneData.isHDR && useFloatOutput && supportsRGBA16HalfFloatTexture(ppl.device) ? Format.RGBA16F : Format.RGBA8;
            }
            function forceEnableFloatOutput(ppl) {
              if (ppl.pipelineSceneData.isHDR && !ppl.getMacroBool('CC_USE_FLOAT_OUTPUT')) {
                const supportFloatOutput = supportsRGBA16HalfFloatTexture(ppl.device);
                ppl.setMacroBool('CC_USE_FLOAT_OUTPUT', supportFloatOutput);
                macro.ENABLE_FLOAT_OUTPUT = supportFloatOutput;
              }
            }
            function validPunctualLightsCulling(pipeline, camera) {
              const sceneData = pipeline.pipelineSceneData;
              const validPunctualLights = sceneData.validPunctualLights;
              validPunctualLights.length = 0;
              const _sphere = Sphere.create(0, 0, 0, 1);
              const {
                spotLights
              } = camera.scene;
              for (let i = 0; i < spotLights.length; i++) {
                const light = spotLights[i];
                if (light.baked && !camera.node.scene.globals.disableLightmap) {
                  continue;
                }
                Sphere.set(_sphere, light.position.x, light.position.y, light.position.z, light.range);
                if (intersect.sphereFrustum(_sphere, camera.frustum)) {
                  validPunctualLights.push(light);
                }
              }
              const {
                sphereLights
              } = camera.scene;
              for (let i = 0; i < sphereLights.length; i++) {
                const light = sphereLights[i];
                if (light.baked && !camera.node.scene.globals.disableLightmap) {
                  continue;
                }
                Sphere.set(_sphere, light.position.x, light.position.y, light.position.z, light.range);
                if (intersect.sphereFrustum(_sphere, camera.frustum)) {
                  validPunctualLights.push(light);
                }
              }
              const {
                pointLights
              } = camera.scene;
              for (let i = 0; i < pointLights.length; i++) {
                const light = pointLights[i];
                if (light.baked) {
                  continue;
                }
                Sphere.set(_sphere, light.position.x, light.position.y, light.position.z, light.range);
                if (intersect.sphereFrustum(_sphere, camera.frustum)) {
                  validPunctualLights.push(light);
                }
              }
              const {
                rangedDirLights
              } = camera.scene;
              for (let i = 0; i < rangedDirLights.length; i++) {
                const light = rangedDirLights[i];
                AABB.transform(_tmpBoundingBox, _rangedDirLightBoundingBox, light.node.getWorldMatrix());
                if (intersect.aabbFrustum(_tmpBoundingBox, camera.frustum)) {
                  validPunctualLights.push(light);
                }
              }
              sceneData.validPunctualLights = validPunctualLights;
            }
            const _cameras = [];
            function getCameraUniqueID(camera) {
              if (!_cameras.includes(camera)) {
                _cameras.push(camera);
              }
              return _cameras.indexOf(camera);
            }
            function getLoadOpOfClearFlag(clearFlag, attachment) {
              let loadOp = LoadOp.CLEAR;
              if (!(clearFlag & ClearFlagBit.COLOR) && attachment === AttachmentType.RENDER_TARGET) {
                if (clearFlag & SKYBOX_FLAG) {
                  loadOp = LoadOp.CLEAR;
                } else {
                  loadOp = LoadOp.LOAD;
                }
              }
              if ((clearFlag & ClearFlagBit.DEPTH_STENCIL) !== ClearFlagBit.DEPTH_STENCIL && attachment === AttachmentType.DEPTH_STENCIL) {
                if (!(clearFlag & ClearFlagBit.DEPTH)) loadOp = LoadOp.LOAD;
                if (!(clearFlag & ClearFlagBit.STENCIL)) loadOp = LoadOp.LOAD;
              }
              return loadOp;
            }
            function getRenderArea(camera, width, height, light = null, level = 0, out = undefined) {
              out = out || new Rect();
              const vp = camera ? camera.viewport : new Rect(0, 0, 1, 1);
              const w = width;
              const h = height;
              out.x = vp.x * w;
              out.y = vp.y * h;
              out.width = vp.width * w;
              out.height = vp.height * h;
              if (light) {
                switch (light.type) {
                  case LightType.DIRECTIONAL:
                    {
                      const mainLight = light;
                      if (mainLight.shadowFixedArea || mainLight.csmLevel === CSMLevel.LEVEL_1) {
                        out.x = 0;
                        out.y = 0;
                        out.width = w;
                        out.height = h;
                      } else {
                        const screenSpaceSignY = legacyCC.director.root.device.capabilities.screenSpaceSignY;
                        out.x = level % 2 * 0.5 * w;
                        if (screenSpaceSignY > 0) {
                          out.y = (1 - Math.floor(level / 2)) * 0.5 * h;
                        } else {
                          out.y = Math.floor(level / 2) * 0.5 * h;
                        }
                        out.width = 0.5 * w;
                        out.height = 0.5 * h;
                      }
                      break;
                    }
                  case LightType.SPOT:
                    {
                      out.x = 0;
                      out.y = 0;
                      out.width = w;
                      out.height = h;
                      break;
                    }
                }
              }
              return out;
            }
            class FxaaData {
              _updateFxaaPass() {
                if (!this.fxaaMaterial) return;
                const combinePass = this.fxaaMaterial.passes[0];
                combinePass.beginChangeStatesSilently();
                combinePass.tryCompile();
                combinePass.endChangeStatesSilently();
              }
              _init() {
                if (this.fxaaMaterial) return;
                this.fxaaMaterial = new Material();
                this.fxaaMaterial._uuid = 'builtin-fxaa-material';
                this.fxaaMaterial.initialize({
                  effectName: 'pipeline/post-process/fxaa-hq'
                });
                for (let i = 0; i < this.fxaaMaterial.passes.length; ++i) {
                  this.fxaaMaterial.passes[i].tryCompile();
                }
                this._updateFxaaPass();
              }
              constructor() {
                this._init();
              }
            }
            function buildCopyPass(ppl, inOuts) {
              ppl.addCopyPass(inOuts);
            }
            let fxaaData = null;
            function buildFxaaPass(camera, ppl, inputRT, inputDS) {
              if (!fxaaData) {
                fxaaData = new FxaaData();
              }
              const cameraID = getCameraUniqueID(camera);
              const cameraName = `Camera${cameraID}`;
              let width = camera.window.width;
              let height = camera.window.height;
              const area = getRenderArea(camera, width, height);
              width = area.width;
              height = area.height;
              const clearColor = new Color(0, 0, 0, 1);
              if (camera.clearFlag & ClearFlagBit.COLOR) {
                clearColor.x = camera.clearColor.x;
                clearColor.y = camera.clearColor.y;
                clearColor.z = camera.clearColor.z;
              }
              clearColor.w = camera.clearColor.w;
              const fxaaPassRTName = `dsFxaaPassColor${cameraName}`;
              if (!ppl.containsResource(fxaaPassRTName)) {
                ppl.addRenderTarget(fxaaPassRTName, Format.RGBA8, width, height, ResourceResidency.MANAGED);
              }
              ppl.updateRenderTarget(fxaaPassRTName, width, height);
              const fxaaPassIdx = 0;
              const fxaaPass = ppl.addRenderPass(width, height, 'fxaa');
              fxaaPass.name = `CameraFxaaPass${cameraID}`;
              fxaaPass.setViewport(new Viewport(area.x, area.y, width, height));
              if (ppl.containsResource(inputRT)) {
                fxaaPass.addTexture(inputRT, 'sceneColorMap');
              }
              fxaaPass.addRenderTarget(fxaaPassRTName, LoadOp.CLEAR, StoreOp.STORE, clearColor);
              fxaaData.fxaaMaterial.setProperty('texSize', new Vec4(width, height, 1.0 / width, 1.0 / height), fxaaPassIdx);
              fxaaPass.addQueue(QueueHint.RENDER_TRANSPARENT).addCameraQuad(camera, fxaaData.fxaaMaterial, fxaaPassIdx, SceneFlags.NONE);
              return {
                rtName: fxaaPassRTName,
                dsName: inputDS
              };
            }
            const MAX_BLOOM_FILTER_PASS_NUM = 6;
            const BLOOM_PREFILTERPASS_INDEX = 0;
            const BLOOM_DOWNSAMPLEPASS_INDEX = 1;
            const BLOOM_UPSAMPLEPASS_INDEX = BLOOM_DOWNSAMPLEPASS_INDEX + MAX_BLOOM_FILTER_PASS_NUM;
            const BLOOM_COMBINEPASS_INDEX = BLOOM_UPSAMPLEPASS_INDEX + MAX_BLOOM_FILTER_PASS_NUM;
            class BloomData {
              _updateBloomPass() {
                if (!this.bloomMaterial) return;
                const prefilterPass = this.bloomMaterial.passes[BLOOM_PREFILTERPASS_INDEX];
                prefilterPass.beginChangeStatesSilently();
                prefilterPass.tryCompile();
                prefilterPass.endChangeStatesSilently();
                for (let i = 0; i < MAX_BLOOM_FILTER_PASS_NUM; ++i) {
                  const downsamplePass = this.bloomMaterial.passes[BLOOM_DOWNSAMPLEPASS_INDEX + i];
                  downsamplePass.beginChangeStatesSilently();
                  downsamplePass.tryCompile();
                  downsamplePass.endChangeStatesSilently();
                  const upsamplePass = this.bloomMaterial.passes[BLOOM_UPSAMPLEPASS_INDEX + i];
                  upsamplePass.beginChangeStatesSilently();
                  upsamplePass.tryCompile();
                  upsamplePass.endChangeStatesSilently();
                }
                const combinePass = this.bloomMaterial.passes[BLOOM_COMBINEPASS_INDEX];
                combinePass.beginChangeStatesSilently();
                combinePass.tryCompile();
                combinePass.endChangeStatesSilently();
              }
              _init() {
                if (this.bloomMaterial) return;
                this.bloomMaterial = new Material();
                this.bloomMaterial._uuid = 'builtin-bloom-material';
                this.bloomMaterial.initialize({
                  effectName: 'pipeline/post-process/bloom'
                });
                for (let i = 0; i < this.bloomMaterial.passes.length; ++i) {
                  this.bloomMaterial.passes[i].tryCompile();
                }
                this._updateBloomPass();
              }
              constructor() {
                this.threshold = 0.1;
                this.iterations = 2;
                this.intensity = 0.8;
                this._init();
              }
            }
            let bloomData = null;
            function buildBloomPass(camera, ppl, inputRT, threshold = 0.6, iterations = 2, intensity = 2.0) {
              if (!bloomData) {
                bloomData = new BloomData();
              }
              bloomData.threshold = threshold;
              bloomData.iterations = iterations;
              bloomData.intensity = intensity;
              const cameraID = getCameraUniqueID(camera);
              const cameraName = `Camera${cameraID}`;
              let width = camera.window.width;
              let height = camera.window.height;
              const area = getRenderArea(camera, width, height);
              width = area.width;
              height = area.height;
              const bloomClearColor = new Color(0, 0, 0, 1);
              if (camera.clearFlag & ClearFlagBit.COLOR) {
                bloomClearColor.x = camera.clearColor.x;
                bloomClearColor.y = camera.clearColor.y;
                bloomClearColor.z = camera.clearColor.z;
              }
              bloomClearColor.w = camera.clearColor.w;
              const bloomPassPrefilterRTName = `dsBloomPassPrefilterColor${cameraName}`;
              const bloomPassPrefilterDSName = `dsBloomPassPrefilterDS${cameraName}`;
              width >>= 1;
              height >>= 1;
              if (!ppl.containsResource(bloomPassPrefilterRTName)) {
                ppl.addRenderTarget(bloomPassPrefilterRTName, Format.RGBA8, width, height, ResourceResidency.MANAGED);
                ppl.addDepthStencil(bloomPassPrefilterDSName, Format.DEPTH_STENCIL, width, height, ResourceResidency.MANAGED);
              }
              ppl.updateRenderTarget(bloomPassPrefilterRTName, width, height);
              ppl.updateDepthStencil(bloomPassPrefilterDSName, width, height);
              const bloomPrefilterPass = ppl.addRenderPass(width, height, 'bloom-prefilter');
              bloomPrefilterPass.name = `CameraBloomPrefilterPass${cameraID}`;
              bloomPrefilterPass.setViewport(new Viewport(area.x, area.y, width, height));
              if (ppl.containsResource(inputRT)) {
                bloomPrefilterPass.addTexture(inputRT, 'outputResultMap');
              }
              bloomPrefilterPass.addRenderTarget(bloomPassPrefilterRTName, LoadOp.CLEAR, StoreOp.STORE, bloomClearColor);
              bloomData.bloomMaterial.setProperty('texSize', new Vec4(0, 0, bloomData.threshold, 0), 0);
              bloomPrefilterPass.addQueue(QueueHint.RENDER_TRANSPARENT).addCameraQuad(camera, bloomData.bloomMaterial, 0, SceneFlags.NONE);
              for (let i = 0; i < bloomData.iterations; ++i) {
                const texSize = new Vec4(width, height, 0, 0);
                const bloomPassDownSampleRTName = `dsBloomPassDownSampleColor${cameraName}${i}`;
                const bloomPassDownSampleDSName = `dsBloomPassDownSampleDS${cameraName}${i}`;
                width >>= 1;
                height >>= 1;
                if (!ppl.containsResource(bloomPassDownSampleRTName)) {
                  ppl.addRenderTarget(bloomPassDownSampleRTName, Format.RGBA8, width, height, ResourceResidency.MANAGED);
                  ppl.addDepthStencil(bloomPassDownSampleDSName, Format.DEPTH_STENCIL, width, height, ResourceResidency.MANAGED);
                }
                ppl.updateRenderTarget(bloomPassDownSampleRTName, width, height);
                ppl.updateDepthStencil(bloomPassDownSampleDSName, width, height);
                const bloomDownSamplePass = ppl.addRenderPass(width, height, `bloom-downsample${i}`);
                bloomDownSamplePass.name = `CameraBloomDownSamplePass${cameraID}${i}`;
                bloomDownSamplePass.setViewport(new Viewport(area.x, area.y, width, height));
                if (i === 0) {
                  bloomDownSamplePass.addTexture(bloomPassPrefilterRTName, 'bloomTexture');
                } else {
                  bloomDownSamplePass.addTexture(`dsBloomPassDownSampleColor${cameraName}${i - 1}`, 'bloomTexture');
                }
                bloomDownSamplePass.addRenderTarget(bloomPassDownSampleRTName, LoadOp.CLEAR, StoreOp.STORE, bloomClearColor);
                bloomData.bloomMaterial.setProperty('texSize', texSize, BLOOM_DOWNSAMPLEPASS_INDEX + i);
                bloomDownSamplePass.addQueue(QueueHint.RENDER_TRANSPARENT).addCameraQuad(camera, bloomData.bloomMaterial, BLOOM_DOWNSAMPLEPASS_INDEX + i, SceneFlags.NONE);
              }
              for (let i = 0; i < bloomData.iterations; ++i) {
                const texSize = new Vec4(width, height, 0, 0);
                const bloomPassUpSampleRTName = `dsBloomPassUpSampleColor${cameraName}${bloomData.iterations - 1 - i}`;
                const bloomPassUpSampleDSName = `dsBloomPassUpSampleDS${cameraName}${bloomData.iterations - 1 - i}`;
                width <<= 1;
                height <<= 1;
                if (!ppl.containsResource(bloomPassUpSampleRTName)) {
                  ppl.addRenderTarget(bloomPassUpSampleRTName, Format.RGBA8, width, height, ResourceResidency.MANAGED);
                  ppl.addDepthStencil(bloomPassUpSampleDSName, Format.DEPTH_STENCIL, width, height, ResourceResidency.MANAGED);
                }
                ppl.updateRenderTarget(bloomPassUpSampleRTName, width, height);
                ppl.updateDepthStencil(bloomPassUpSampleDSName, width, height);
                const bloomUpSamplePass = ppl.addRenderPass(width, height, `bloom-upsample${i}`);
                bloomUpSamplePass.name = `CameraBloomUpSamplePass${cameraID}${bloomData.iterations - 1 - i}`;
                bloomUpSamplePass.setViewport(new Viewport(area.x, area.y, width, height));
                if (i === 0) {
                  bloomUpSamplePass.addTexture(`dsBloomPassDownSampleColor${cameraName}${bloomData.iterations - 1}`, 'bloomTexture');
                } else {
                  bloomUpSamplePass.addTexture(`dsBloomPassUpSampleColor${cameraName}${bloomData.iterations - i}`, 'bloomTexture');
                }
                bloomUpSamplePass.addRenderTarget(bloomPassUpSampleRTName, LoadOp.CLEAR, StoreOp.STORE, bloomClearColor);
                bloomData.bloomMaterial.setProperty('texSize', texSize, BLOOM_UPSAMPLEPASS_INDEX + i);
                bloomUpSamplePass.addQueue(QueueHint.RENDER_TRANSPARENT).addCameraQuad(camera, bloomData.bloomMaterial, BLOOM_UPSAMPLEPASS_INDEX + i, SceneFlags.NONE);
              }
              const bloomPassCombineRTName = `dsBloomPassCombineColor${cameraName}`;
              const bloomPassCombineDSName = `dsBloomPassCombineDS${cameraName}`;
              width = area.width;
              height = area.height;
              if (!ppl.containsResource(bloomPassCombineRTName)) {
                ppl.addRenderTarget(bloomPassCombineRTName, Format.RGBA8, width, height, ResourceResidency.MANAGED);
                ppl.addDepthStencil(bloomPassCombineDSName, Format.DEPTH_STENCIL, width, height, ResourceResidency.MANAGED);
              }
              ppl.updateRenderTarget(bloomPassCombineRTName, width, height);
              ppl.updateDepthStencil(bloomPassCombineDSName, width, height);
              const bloomCombinePass = ppl.addRenderPass(width, height, 'bloom-combine');
              bloomCombinePass.name = `CameraBloomCombinePass${cameraID}`;
              bloomCombinePass.setViewport(new Viewport(area.x, area.y, width, height));
              bloomCombinePass.addTexture(inputRT, 'outputResultMap');
              bloomCombinePass.addTexture(`dsBloomPassUpSampleColor${cameraName}${0}`, 'bloomTexture');
              bloomCombinePass.addRenderTarget(bloomPassCombineRTName, LoadOp.CLEAR, StoreOp.STORE, bloomClearColor);
              bloomData.bloomMaterial.setProperty('texSize', new Vec4(0, 0, 0, bloomData.intensity), BLOOM_COMBINEPASS_INDEX);
              bloomCombinePass.addQueue(QueueHint.RENDER_TRANSPARENT).addCameraQuad(camera, bloomData.bloomMaterial, BLOOM_COMBINEPASS_INDEX, SceneFlags.NONE);
              return {
                rtName: bloomPassCombineRTName,
                dsName: bloomPassCombineDSName
              };
            }
            class PostInfo {
              _init() {
                this.postMaterial = new Material();
                this.postMaterial.name = 'builtin-post-process-material';
                this.postMaterial.initialize({
                  effectName: 'pipeline/post-process',
                  defines: {
                    ANTIALIAS_TYPE: this.antiAliasing
                  }
                });
                for (let i = 0; i < this.postMaterial.passes.length; ++i) {
                  this.postMaterial.passes[i].tryCompile();
                }
              }
              constructor(antiAliasing = AntiAliasing.NONE) {
                this.antiAliasing = AntiAliasing.NONE;
                this.antiAliasing = antiAliasing;
                this._init();
              }
            }
            let postInfo$1;
            function buildPostprocessPass(camera, ppl, inputTex) {
              if (!postInfo$1) {
                postInfo$1 = new PostInfo();
              }
              const cameraID = getCameraUniqueID(camera);
              const area = getRenderArea(camera, camera.window.width, camera.window.height);
              const width = area.width;
              const height = area.height;
              const postprocessPassRTName = `postprocessPassRTName${cameraID}`;
              const postprocessPassDS = `postprocessPassDS${cameraID}`;
              if (!ppl.containsResource(postprocessPassRTName)) {
                ppl.addRenderWindow(postprocessPassRTName, Format.BGRA8, width, height, camera.window);
                ppl.addDepthStencil(postprocessPassDS, Format.DEPTH_STENCIL, width, height, ResourceResidency.MANAGED);
              }
              ppl.updateRenderWindow(postprocessPassRTName, camera.window);
              ppl.updateDepthStencil(postprocessPassDS, width, height);
              const postprocessPass = ppl.addRenderPass(width, height, 'post-process');
              postprocessPass.name = `CameraPostprocessPass${cameraID}`;
              postprocessPass.setViewport(new Viewport(area.x, area.y, area.width, area.height));
              if (ppl.containsResource(inputTex)) {
                postprocessPass.addTexture(inputTex, 'outputResultMap');
              }
              const postClearColor = new Color(0, 0, 0, camera.clearColor.w);
              if (camera.clearFlag & ClearFlagBit.COLOR) {
                postClearColor.x = camera.clearColor.x;
                postClearColor.y = camera.clearColor.y;
                postClearColor.z = camera.clearColor.z;
              }
              postprocessPass.addRenderTarget(postprocessPassRTName, getLoadOpOfClearFlag(camera.clearFlag, AttachmentType.RENDER_TARGET), StoreOp.STORE, postClearColor);
              postprocessPass.addDepthStencil(postprocessPassDS, getLoadOpOfClearFlag(camera.clearFlag, AttachmentType.DEPTH_STENCIL), StoreOp.STORE, camera.clearDepth, camera.clearStencil, camera.clearFlag);
              postprocessPass.addQueue(QueueHint.NONE).addFullscreenQuad(postInfo$1.postMaterial, 0, SceneFlags.NONE);
              if (getProfilerCamera() === camera) {
                postprocessPass.showStatistics = true;
              }
              return {
                rtName: postprocessPassRTName,
                dsName: postprocessPassDS
              };
            }
            function buildForwardPass(camera, ppl, isOffScreen, enabledAlpha = true) {
              const cameraID = getCameraUniqueID(camera);
              const cameraName = `Camera${cameraID}`;
              const shadowInfo = buildShadowPasses(cameraName, camera, ppl);
              const area = getRenderArea(camera, camera.window.width, camera.window.height);
              const width = area.width;
              const height = area.height;
              const forwardPassRTName = `dsForwardPassColor${cameraName}`;
              const forwardPassDSName = `dsForwardPassDS${cameraName}`;
              if (!ppl.containsResource(forwardPassRTName)) {
                if (!isOffScreen) {
                  ppl.addRenderWindow(forwardPassRTName, Format.BGRA8, width, height, camera.window);
                } else {
                  ppl.addRenderTarget(forwardPassRTName, getRTFormatBeforeToneMapping(ppl), width, height, ResourceResidency.PERSISTENT);
                }
                ppl.addDepthStencil(forwardPassDSName, Format.DEPTH_STENCIL, width, height, ResourceResidency.MANAGED);
              }
              if (!isOffScreen) {
                ppl.updateRenderWindow(forwardPassRTName, camera.window);
                ppl.updateDepthStencil(forwardPassDSName, width, height);
              } else {
                ppl.updateRenderTarget(forwardPassRTName, width, height);
                ppl.updateDepthStencil(forwardPassDSName, width, height);
              }
              const forwardPass = ppl.addRenderPass(width, height, 'default');
              forwardPass.name = `CameraForwardPass${cameraID}`;
              forwardPass.setViewport(new Viewport(area.x, area.y, width, height));
              for (const dirShadowName of shadowInfo.mainLightShadowNames) {
                if (ppl.containsResource(dirShadowName)) {
                  forwardPass.addTexture(dirShadowName, 'cc_shadowMap');
                }
              }
              for (const spotShadowName of shadowInfo.spotLightShadowNames) {
                if (ppl.containsResource(spotShadowName)) {
                  forwardPass.addTexture(spotShadowName, 'cc_spotShadowMap');
                }
              }
              forwardPass.addRenderTarget(forwardPassRTName, isOffScreen ? LoadOp.CLEAR : getLoadOpOfClearFlag(camera.clearFlag, AttachmentType.RENDER_TARGET), StoreOp.STORE, new Color(camera.clearColor.x, camera.clearColor.y, camera.clearColor.z, camera.clearColor.w));
              forwardPass.addDepthStencil(forwardPassDSName, isOffScreen ? LoadOp.CLEAR : getLoadOpOfClearFlag(camera.clearFlag, AttachmentType.DEPTH_STENCIL), isOffScreen ? StoreOp.DISCARD : StoreOp.STORE, camera.clearDepth, camera.clearStencil, camera.clearFlag);
              forwardPass.addQueue(QueueHint.RENDER_OPAQUE).addSceneOfCamera(camera, new LightInfo(), SceneFlags.OPAQUE_OBJECT | SceneFlags.PLANAR_SHADOW | SceneFlags.CUTOUT_OBJECT | SceneFlags.DEFAULT_LIGHTING | SceneFlags.DRAW_INSTANCING);
              let sceneFlags = SceneFlags.TRANSPARENT_OBJECT | SceneFlags.GEOMETRY;
              if (!isOffScreen) {
                sceneFlags |= SceneFlags.UI;
                forwardPass.showStatistics = true;
              }
              if (enabledAlpha) {
                forwardPass.addQueue(QueueHint.RENDER_TRANSPARENT).addSceneOfCamera(camera, new LightInfo(), sceneFlags);
              }
              return {
                rtName: forwardPassRTName,
                dsName: forwardPassDSName
              };
            }
            let shadowPass$1;
            function buildShadowPass$1(passName, ppl, camera, light, level, width, height) {
              const fboW = width;
              const fboH = height;
              const area = getRenderArea(camera, width, height, light, level);
              width = area.width;
              height = area.height;
              const device = ppl.device;
              const shadowMapName = passName;
              if (!ppl.containsResource(shadowMapName)) {
                const format = supportsR32FloatTexture(device) ? Format.R32F : Format.RGBA8;
                ppl.addRenderTarget(shadowMapName, format, fboW, fboH, ResourceResidency.MANAGED);
                ppl.addDepthStencil(`${shadowMapName}Depth`, Format.DEPTH_STENCIL, fboW, fboH, ResourceResidency.MANAGED);
              }
              ppl.updateRenderTarget(shadowMapName, fboW, fboH);
              ppl.updateDepthStencil(`${shadowMapName}Depth`, fboW, fboH);
              if (!level) {
                shadowPass$1 = ppl.addRenderPass(width, height, 'default');
                shadowPass$1.name = passName;
                shadowPass$1.setViewport(new Viewport(0, 0, fboW, fboH));
                shadowPass$1.addRenderTarget(shadowMapName, LoadOp.CLEAR, StoreOp.STORE, new Color(1, 1, 1, camera.clearColor.w));
                shadowPass$1.addDepthStencil(`${shadowMapName}Depth`, LoadOp.CLEAR, StoreOp.DISCARD, camera.clearDepth, camera.clearStencil, ClearFlagBit.DEPTH_STENCIL);
              }
              const queue = shadowPass$1.addQueue(QueueHint.RENDER_OPAQUE, 'shadow-caster');
              queue.addScene(camera, SceneFlags.SHADOW_CASTER | SceneFlags.OPAQUE_OBJECT | SceneFlags.MASK).useLightFrustum(light, light.type !== LightType.DIRECTIONAL ? 0 : level);
              queue.setViewport(new Viewport(area.x, area.y, area.width, area.height));
            }
            function buildReflectionProbePasss(camera, ppl) {
              const reflectionProbeManager = legacyCC.internal.reflectionProbeManager;
              if (!reflectionProbeManager) return;
              const probes = reflectionProbeManager.getProbes();
              if (probes.length === 0) return;
              for (let i = 0; i < probes.length; i++) {
                const probe = probes[i];
                if (probe.needRender) {
                  if (probes[i].probeType === ProbeType.PLANAR) {
                    buildReflectionProbePass(camera, ppl, probe, probe.realtimePlanarTexture.window, 0);
                  }
                }
              }
            }
            function buildReflectionProbePass(camera, ppl, probe, renderWindow, faceIdx) {
              const cameraName = `Camera${faceIdx}`;
              const area = probe.renderArea();
              const width = area.x;
              const height = area.y;
              const probeCamera = probe.camera;
              const probePassRTName = `reflectionProbePassColor${cameraName}`;
              const probePassDSName = `reflectionProbePassDS${cameraName}`;
              if (!ppl.containsResource(probePassRTName)) {
                ppl.addRenderWindow(probePassRTName, Format.RGBA8, width, height, renderWindow);
                ppl.addDepthStencil(probePassDSName, Format.DEPTH_STENCIL, width, height, ResourceResidency.EXTERNAL);
              }
              ppl.updateRenderWindow(probePassRTName, renderWindow);
              ppl.updateDepthStencil(probePassDSName, width, height);
              const probePass = ppl.addRenderPass(width, height, 'default');
              probePass.name = `ReflectionProbePass${faceIdx}`;
              probePass.setViewport(new Viewport(0, 0, width, height));
              probePass.addRenderTarget(probePassRTName, getLoadOpOfClearFlag(probeCamera.clearFlag, AttachmentType.RENDER_TARGET), StoreOp.STORE, new Color(probeCamera.clearColor.x, probeCamera.clearColor.y, probeCamera.clearColor.z, probeCamera.clearColor.w));
              probePass.addDepthStencil(probePassDSName, getLoadOpOfClearFlag(probeCamera.clearFlag, AttachmentType.DEPTH_STENCIL), StoreOp.STORE, probeCamera.clearDepth, probeCamera.clearStencil, probeCamera.clearFlag);
              const passBuilder = probePass.addQueue(QueueHint.RENDER_OPAQUE, 'reflect-map');
              const lightInfo = new LightInfo();
              lightInfo.probe = probe;
              passBuilder.addSceneOfCamera(camera, lightInfo, SceneFlags.REFLECTION_PROBE | SceneFlags.OPAQUE_OBJECT);
              updateCameraUBO(passBuilder, probeCamera, ppl);
            }
            class ShadowInfo {
              constructor() {
                this.shadowEnabled = false;
                this.mainLightShadowNames = new Array();
                this.spotLightShadowNames = new Array();
                this.validLights = [];
              }
              reset() {
                this.shadowEnabled = false;
                this.mainLightShadowNames.length = 0;
                this.spotLightShadowNames.length = 0;
                this.validLights.length = 0;
              }
            }
            function buildShadowPasses(cameraName, camera, ppl) {
              validPunctualLightsCulling(ppl, camera);
              const pipeline = ppl;
              const shadow = pipeline.pipelineSceneData.shadows;
              const validPunctualLights = ppl.pipelineSceneData.validPunctualLights;
              shadowInfo$1.reset();
              const shadows = ppl.pipelineSceneData.shadows;
              if (!shadow.enabled || shadow.type !== ShadowType.ShadowMap) {
                return shadowInfo$1;
              }
              shadowInfo$1.shadowEnabled = true;
              let n = 0;
              let m = 0;
              for (; n < shadow.maxReceived && m < validPunctualLights.length;) {
                const light = validPunctualLights[m];
                if (light.type === LightType.SPOT) {
                  const spotLight = light;
                  if (spotLight.shadowEnabled) {
                    shadowInfo$1.validLights.push(light);
                    n++;
                  }
                }
                m++;
              }
              const {
                mainLight
              } = camera.scene;
              const mapWidth = shadows.size.x;
              const mapHeight = shadows.size.y;
              if (mainLight && mainLight.shadowEnabled) {
                shadowInfo$1.mainLightShadowNames[0] = `MainLightShadow${cameraName}`;
                if (mainLight.shadowFixedArea) {
                  buildShadowPass$1(shadowInfo$1.mainLightShadowNames[0], ppl, camera, mainLight, 0, mapWidth, mapHeight);
                } else {
                  const csmLevel = pipeline.pipelineSceneData.csmSupported ? mainLight.csmLevel : 1;
                  shadowInfo$1.mainLightShadowNames[0] = `MainLightShadow${cameraName}`;
                  for (let i = 0; i < csmLevel; i++) {
                    buildShadowPass$1(shadowInfo$1.mainLightShadowNames[0], ppl, camera, mainLight, i, mapWidth, mapHeight);
                  }
                }
              }
              for (let l = 0; l < shadowInfo$1.validLights.length; l++) {
                const light = shadowInfo$1.validLights[l];
                const passName = `SpotLightShadow${l.toString()}${cameraName}`;
                shadowInfo$1.spotLightShadowNames[l] = passName;
                buildShadowPass$1(passName, ppl, camera, light, 0, mapWidth, mapHeight);
              }
              return shadowInfo$1;
            }
            const shadowInfo$1 = new ShadowInfo();
            class GBufferInfo {
              constructor() {
                this.color = void 0;
                this.normal = void 0;
                this.emissive = void 0;
                this.ds = void 0;
              }
            }
            class LightingInfo {
              _init() {
                this.deferredLightingMaterial = new Material();
                this.deferredLightingMaterial.name = 'builtin-deferred-material';
                this.deferredLightingMaterial.initialize({
                  effectName: 'pipeline/deferred-lighting',
                  defines: {
                    CC_ENABLE_CLUSTERED_LIGHT_CULLING: this.enableCluster,
                    CC_RECEIVE_SHADOW: 1
                  }
                });
                for (let i = 0; i < this.deferredLightingMaterial.passes.length; ++i) {
                  this.deferredLightingMaterial.passes[i].tryCompile();
                }
              }
              constructor(clusterEn) {
                this.enableCluster = void 0;
                this.enableCluster = clusterEn ? 1 : 0;
                this._init();
              }
            }
            function buildUIPass(camera, ppl) {
              const cameraID = getCameraUniqueID(camera);
              const cameraName = `Camera${cameraID}`;
              const area = getRenderArea(camera, camera.window.width, camera.window.height);
              const width = area.width;
              const height = area.height;
              const dsUIAndProfilerPassRTName = `dsUIAndProfilerPassColor${cameraName}`;
              const dsUIAndProfilerPassDSName = `dsUIAndProfilerPassDS${cameraName}`;
              if (!ppl.containsResource(dsUIAndProfilerPassRTName)) {
                ppl.addRenderWindow(dsUIAndProfilerPassRTName, Format.BGRA8, width, height, camera.window);
                ppl.addDepthStencil(dsUIAndProfilerPassDSName, Format.DEPTH_STENCIL, width, height, ResourceResidency.MANAGED);
              }
              ppl.updateRenderWindow(dsUIAndProfilerPassRTName, camera.window);
              ppl.updateDepthStencil(dsUIAndProfilerPassDSName, width, height);
              const uiAndProfilerPass = ppl.addRenderPass(width, height, 'default');
              uiAndProfilerPass.name = `CameraUIAndProfilerPass${cameraID}`;
              uiAndProfilerPass.setViewport(new Viewport(area.x, area.y, width, height));
              uiAndProfilerPass.addRenderTarget(dsUIAndProfilerPassRTName, getLoadOpOfClearFlag(camera.clearFlag, AttachmentType.RENDER_TARGET), StoreOp.STORE, new Color(camera.clearColor.x, camera.clearColor.y, camera.clearColor.z, camera.clearColor.w));
              uiAndProfilerPass.addDepthStencil(dsUIAndProfilerPassDSName, getLoadOpOfClearFlag(camera.clearFlag, AttachmentType.DEPTH_STENCIL), StoreOp.STORE, camera.clearDepth, camera.clearStencil, camera.clearFlag);
              const sceneFlags = SceneFlags.UI;
              uiAndProfilerPass.addQueue(QueueHint.RENDER_TRANSPARENT).addSceneOfCamera(camera, new LightInfo(), sceneFlags);
              if (getProfilerCamera() === camera) {
                uiAndProfilerPass.showStatistics = true;
              }
            }
            function updateCameraUBO(setter, camera, ppl) {
              const pipeline = legacyCC.director.root.pipeline;
              const sceneData = ppl.pipelineSceneData;
              const skybox = sceneData.skybox;
              setter.addConstant('CCCamera');
              setter.setMat4('cc_matView', camera.matView);
              setter.setMat4('cc_matViewInv', camera.node.worldMatrix);
              setter.setMat4('cc_matProj', camera.matProj);
              setter.setMat4('cc_matProjInv', camera.matProjInv);
              setter.setMat4('cc_matViewProj', camera.matViewProj);
              setter.setMat4('cc_matViewProjInv', camera.matViewProjInv);
              setter.setVec4('cc_cameraPos', new Vec4(camera.position.x, camera.position.y, camera.position.z, pipeline.getCombineSignY()));
              setter.setVec4('cc_surfaceTransform', new Vec4(camera.surfaceTransform, 0.0, Math.cos(toRadian(skybox.getRotationAngle())), Math.sin(toRadian(skybox.getRotationAngle()))));
              setter.setVec4('cc_screenScale', new Vec4(sceneData.shadingScale, sceneData.shadingScale, 1.0 / sceneData.shadingScale, 1.0 / sceneData.shadingScale));
              setter.setVec4('cc_exposure', new Vec4(camera.exposure, 1.0 / camera.exposure, sceneData.isHDR ? 1.0 : 0.0, 1.0 / Camera.standardExposureValue));
            }
            const _varianceArray = [0.0484, 0.187, 0.567, 1.99, 7.41];
            const _strengthParameterArray = [0.100, 0.118, 0.113, 0.358, 0.078];
            const _vec3Temp = new Vec3();
            const _vec3Temp2 = new Vec3();
            const _vec4Temp = new Vec4();
            const _vec4Temp2 = new Vec4();
            const COPY_INPUT_DS_PASS_INDEX = 0;
            const SSSS_BLUR_X_PASS_INDEX = 1;
            const SSSS_BLUR_Y_PASS_INDEX = 2;
            const EXPONENT = 2.0;
            const I_SAMPLES_COUNT = 25;
            class SSSSBlurData {
              get ssssStrength() {
                return this._v3SSSSStrength;
              }
              set ssssStrength(val) {
                this._v3SSSSStrength = val;
                this._updateSampleCount();
              }
              get ssssFallOff() {
                return this._v3SSSSFallOff;
              }
              set ssssFallOff(val) {
                this._v3SSSSFallOff = val;
                this._updateSampleCount();
              }
              get kernel() {
                return this._kernel;
              }
              _gaussian(out, variance, r) {
                const xx = r / (0.001 + this._v3SSSSFallOff.x);
                out.x = Math.exp(-(xx * xx) / (2.0 * variance)) / (2.0 * 3.14 * variance);
                const yy = r / (0.001 + this._v3SSSSFallOff.y);
                out.y = Math.exp(-(yy * yy) / (2.0 * variance)) / (2.0 * 3.14 * variance);
                const zz = r / (0.001 + this._v3SSSSFallOff.z);
                out.z = Math.exp(-(zz * zz) / (2.0 * variance)) / (2.0 * 3.14 * variance);
              }
              _profile(out, val) {
                for (let i = 0; i < 5; i++) {
                  this._gaussian(_vec3Temp2, _varianceArray[i], val);
                  _vec3Temp2.multiplyScalar(_strengthParameterArray[i]);
                  out.add(_vec3Temp2);
                }
              }
              _updateSampleCount() {
                const strength = this._v3SSSSStrength;
                const nSamples = I_SAMPLES_COUNT;
                const range = 3.0 ;
                const step = 2.0 * range / (nSamples - 1);
                for (let i = 0; i < nSamples; i++) {
                  const o = -range + i * step;
                  const sign = o < 0.0 ? -1.0 : 1.0;
                  this._kernel[i].w = range * sign * Math.abs(o ** EXPONENT) / range ** EXPONENT;
                }
                for (let i = 0; i < nSamples; i++) {
                  const w0 = i > 0 ? Math.abs(this._kernel[i].w - this._kernel[i - 1].w) : 0.0;
                  const w1 = i < nSamples - 1 ? Math.abs(this._kernel[i].w - this._kernel[i + 1].w) : 0.0;
                  const area = (w0 + w1) / 2.0;
                  _vec3Temp.set(0);
                  this._profile(_vec3Temp, this._kernel[i].w);
                  _vec3Temp.multiplyScalar(area);
                  this._kernel[i].x = _vec3Temp.x;
                  this._kernel[i].y = _vec3Temp.y;
                  this._kernel[i].z = _vec3Temp.z;
                }
                const remainder = nSamples % 2;
                _vec4Temp.set(this._kernel[(nSamples - remainder) / 2]);
                for (let i = (nSamples - remainder) / 2; i > 0; i--) {
                  _vec4Temp2.set(this._kernel[i - 1]);
                  this._kernel[i].set(_vec4Temp2);
                }
                this._kernel[0].set(_vec4Temp);
                _vec3Temp.set(0.0);
                for (let i = 0; i < nSamples; i++) {
                  _vec3Temp.add3f(this._kernel[i].x, this._kernel[i].y, this._kernel[i].z);
                }
                for (let i = 0; i < nSamples; i++) {
                  this._kernel[i].x /= _vec3Temp.x;
                  this._kernel[i].y /= _vec3Temp.y;
                  this._kernel[i].z /= _vec3Temp.z;
                }
                this._kernel[0].x = (1.0 - strength.x) * 1.0 + strength.x * this._kernel[0].x;
                this._kernel[0].y = (1.0 - strength.y) * 1.0 + strength.y * this._kernel[0].y;
                this._kernel[0].z = (1.0 - strength.z) * 1.0 + strength.z * this._kernel[0].z;
                for (let i = 1; i < nSamples; i++) {
                  this._kernel[i].x *= strength.x;
                  this._kernel[i].y *= strength.y;
                  this._kernel[i].z *= strength.z;
                }
              }
              _updateBlurPass() {
                if (!this.ssssBlurMaterial) return;
                const copyInputDSPass = this.ssssBlurMaterial.passes[COPY_INPUT_DS_PASS_INDEX];
                copyInputDSPass.beginChangeStatesSilently();
                copyInputDSPass.tryCompile();
                copyInputDSPass.endChangeStatesSilently();
                const ssssBlurXPass = this.ssssBlurMaterial.passes[SSSS_BLUR_X_PASS_INDEX];
                ssssBlurXPass.beginChangeStatesSilently();
                ssssBlurXPass.tryCompile();
                ssssBlurXPass.endChangeStatesSilently();
                const ssssBlurYPass = this.ssssBlurMaterial.passes[SSSS_BLUR_Y_PASS_INDEX];
                ssssBlurYPass.beginChangeStatesSilently();
                ssssBlurYPass.tryCompile();
                ssssBlurYPass.endChangeStatesSilently();
              }
              _init() {
                if (this.ssssBlurMaterial) return;
                this.ssssBlurMaterial = new Material();
                this.ssssBlurMaterial._uuid = 'builtin-ssssBlur-material';
                this.ssssBlurMaterial.initialize({
                  effectName: 'pipeline/ssss-blur'
                });
                for (let i = 0; i < this.ssssBlurMaterial.passes.length; ++i) {
                  this.ssssBlurMaterial.passes[i].tryCompile();
                }
                this._updateBlurPass();
                for (let i = 0; i < I_SAMPLES_COUNT; i++) {
                  this._kernel[i] = new Vec4();
                }
                this._updateSampleCount();
              }
              constructor() {
                this.ssssFov = 45.0 / 57.3;
                this.ssssWidth = 0.01;
                this.boundingBox = 0.4;
                this.ssssScale = 3.0;
                this._v3SSSSStrength = new Vec3(0.48, 0.41, 0.28);
                this._v3SSSSFallOff = new Vec3(1.0, 0.37, 0.3);
                this._kernel = [];
                this._init();
              }
            }
            let ssssBlurData = null;
            function hasSkinObject(ppl) {
              const sceneData = ppl.pipelineSceneData;
              return sceneData.skin.enabled && sceneData.standardSkinModel !== null;
            }
            function _buildSSSSBlurPass(camera, ppl, inputRT, inputDS) {
              const sceneData = ppl.pipelineSceneData;
              const skin = sceneData.skin;
              const standardSkinModel = sceneData.standardSkinModel;
              if (!skin.enabled && standardSkinModel) return {
                rtName: inputRT,
                dsName: inputDS
              };
              if (!ssssBlurData) ssssBlurData = new SSSSBlurData();
              ssssBlurData.ssssFov = camera.fov;
              ssssBlurData.ssssWidth = skin.blurRadius;
              if (standardSkinModel && standardSkinModel.worldBounds) {
                const halfExtents = standardSkinModel.worldBounds.halfExtents;
                ssssBlurData.boundingBox = Math.min(halfExtents.x, halfExtents.y, halfExtents.z) * 2.0;
              }
              ssssBlurData.ssssScale = skin.sssIntensity;
              const cameraID = getCameraUniqueID(camera);
              const cameraName = `Camera${cameraID}`;
              const webPipeline = ppl;
              const area = getRenderArea(camera, camera.window.width, camera.window.height);
              const width = area.width;
              const height = area.height;
              const ssssBlurClearColor = new Color(0, 0, 0, 1);
              if (camera.clearFlag & ClearFlagBit.COLOR) {
                ssssBlurClearColor.x = camera.clearColor.x;
                ssssBlurClearColor.y = camera.clearColor.y;
                ssssBlurClearColor.z = camera.clearColor.z;
              }
              ssssBlurClearColor.w = camera.clearColor.w;
              const ssssBlurRTName = `dsSSSSBlurColor${cameraName}`;
              const ssssBlurDSName = `dsSSSSBlurDSColor${cameraName}`;
              if (!ppl.containsResource(ssssBlurRTName)) {
                ppl.addRenderTarget(ssssBlurRTName, getRTFormatBeforeToneMapping(ppl), width, height, ResourceResidency.MANAGED);
                ppl.addRenderTarget(ssssBlurDSName, Format.RGBA8, width, height, ResourceResidency.MANAGED);
              }
              ppl.updateRenderTarget(ssssBlurRTName, width, height);
              ppl.updateRenderTarget(ssssBlurDSName, width, height);
              const copyInputDSPass = ppl.addRenderPass(width, height, 'copy-pass');
              copyInputDSPass.name = `CameraCopyDSPass${cameraID}`;
              copyInputDSPass.setViewport(new Viewport(area.x, area.y, width, height));
              if (ppl.containsResource(inputDS)) {
                const verId = webPipeline.resourceGraph.vertex(inputDS);
                const sampler = webPipeline.resourceGraph.getSampler(verId);
                sampler.minFilter = Filter.POINT;
                sampler.magFilter = Filter.POINT;
                sampler.mipFilter = Filter.NONE;
                copyInputDSPass.addTexture(inputDS, 'depthRaw');
              }
              copyInputDSPass.addRenderTarget(ssssBlurDSName, LoadOp.CLEAR, StoreOp.STORE, new Color(1.0, 0.0, 0.0, 0.0));
              copyInputDSPass.addQueue(QueueHint.RENDER_OPAQUE | QueueHint.RENDER_TRANSPARENT).addCameraQuad(camera, ssssBlurData.ssssBlurMaterial, COPY_INPUT_DS_PASS_INDEX, SceneFlags.NONE);
              const ssssblurXPass = ppl.addRenderPass(width, height, 'ssss-blurX');
              ssssblurXPass.name = `CameraSSSSBlurXPass${cameraID}`;
              ssssblurXPass.setViewport(new Viewport(area.x, area.y, width, height));
              if (ppl.containsResource(inputRT)) {
                const verId = webPipeline.resourceGraph.vertex(inputRT);
                const sampler = webPipeline.resourceGraph.getSampler(verId);
                sampler.minFilter = Filter.POINT;
                sampler.magFilter = Filter.POINT;
                sampler.mipFilter = Filter.NONE;
                ssssblurXPass.addTexture(inputRT, 'colorTex');
              }
              if (ppl.containsResource(ssssBlurDSName)) {
                const verId = webPipeline.resourceGraph.vertex(ssssBlurDSName);
                const sampler = webPipeline.resourceGraph.getSampler(verId);
                sampler.minFilter = Filter.POINT;
                sampler.magFilter = Filter.POINT;
                sampler.mipFilter = Filter.NONE;
                ssssblurXPass.addTexture(ssssBlurDSName, 'depthTex');
              }
              ssssblurXPass.addRenderTarget(ssssBlurRTName, LoadOp.CLEAR, StoreOp.STORE, ssssBlurClearColor);
              ssssblurXPass.addDepthStencil(inputDS, LoadOp.LOAD, StoreOp.STORE, camera.clearDepth, camera.clearStencil, camera.clearFlag);
              ssssBlurData.ssssBlurMaterial.setProperty('blurInfo', new Vec4(ssssBlurData.ssssFov, ssssBlurData.ssssWidth, ssssBlurData.boundingBox, ssssBlurData.ssssScale), SSSS_BLUR_X_PASS_INDEX);
              ssssBlurData.ssssBlurMaterial.setProperty('kernel', ssssBlurData.kernel, SSSS_BLUR_X_PASS_INDEX);
              ssssblurXPass.addQueue(QueueHint.RENDER_OPAQUE | QueueHint.RENDER_TRANSPARENT).addCameraQuad(camera, ssssBlurData.ssssBlurMaterial, SSSS_BLUR_X_PASS_INDEX, SceneFlags.NONE);
              const ssssblurYPass = ppl.addRenderPass(width, height, 'ssss-blurY');
              ssssblurYPass.name = `CameraSSSSBlurYPass${cameraID}`;
              ssssblurYPass.setViewport(new Viewport(area.x, area.y, width, height));
              if (ppl.containsResource(ssssBlurRTName)) {
                const verId = webPipeline.resourceGraph.vertex(ssssBlurRTName);
                const sampler = webPipeline.resourceGraph.getSampler(verId);
                sampler.minFilter = Filter.POINT;
                sampler.magFilter = Filter.POINT;
                sampler.mipFilter = Filter.NONE;
                ssssblurYPass.addTexture(ssssBlurRTName, 'colorTex');
              }
              if (ppl.containsResource(ssssBlurDSName)) {
                const verId = webPipeline.resourceGraph.vertex(ssssBlurDSName);
                const sampler = webPipeline.resourceGraph.getSampler(verId);
                sampler.minFilter = Filter.POINT;
                sampler.magFilter = Filter.POINT;
                sampler.mipFilter = Filter.NONE;
                ssssblurYPass.addTexture(ssssBlurDSName, 'depthTex');
              }
              ssssblurYPass.addRenderTarget(inputRT, LoadOp.LOAD, StoreOp.STORE, ssssBlurClearColor);
              ssssblurYPass.addDepthStencil(inputDS, LoadOp.LOAD, StoreOp.STORE, camera.clearDepth, camera.clearStencil, camera.clearFlag);
              ssssBlurData.ssssBlurMaterial.setProperty('blurInfo', new Vec4(ssssBlurData.ssssFov, ssssBlurData.ssssWidth, ssssBlurData.boundingBox, ssssBlurData.ssssScale), SSSS_BLUR_Y_PASS_INDEX);
              ssssBlurData.ssssBlurMaterial.setProperty('kernel', ssssBlurData.kernel, SSSS_BLUR_Y_PASS_INDEX);
              ssssblurYPass.addQueue(QueueHint.RENDER_OPAQUE | QueueHint.RENDER_TRANSPARENT).addCameraQuad(camera, ssssBlurData.ssssBlurMaterial, SSSS_BLUR_Y_PASS_INDEX, SceneFlags.NONE);
              return {
                rtName: inputRT,
                dsName: inputDS
              };
            }
            class ToneMappingInfo {
              _init() {
                this.toneMappingMaterial = new Material();
                this.toneMappingMaterial.name = 'builtin-tone-mapping-material';
                this.toneMappingMaterial.initialize({
                  effectName: 'pipeline/tone-mapping'
                });
                for (let i = 0; i < this.toneMappingMaterial.passes.length; ++i) {
                  this.toneMappingMaterial.passes[i].tryCompile();
                }
              }
              constructor() {
                this._init();
              }
            }
            let toneMappingInfo = null;
            function buildToneMappingPass(camera, ppl, inputRT, inputDS) {
              if (!ppl.pipelineSceneData.isHDR || !ppl.getMacroBool('CC_USE_FLOAT_OUTPUT')) return {
                rtName: inputRT,
                dsName: inputDS
              };
              if (!toneMappingInfo) {
                toneMappingInfo = new ToneMappingInfo();
              }
              const cameraID = getCameraUniqueID(camera);
              const area = getRenderArea(camera, camera.window.width, camera.window.height);
              const width = area.width;
              const height = area.height;
              const toneMappingClearColor = new Color(0, 0, 0, camera.clearColor.w);
              if (camera.clearFlag & ClearFlagBit.COLOR) {
                toneMappingClearColor.x = camera.clearColor.x;
                toneMappingClearColor.y = camera.clearColor.y;
                toneMappingClearColor.z = camera.clearColor.z;
              }
              const toneMappingPassRTName = `toneMappingPassRTName${cameraID}`;
              const toneMappingPassDS = `toneMappingPassDS${cameraID}`;
              if (!ppl.containsResource(toneMappingPassRTName)) {
                ppl.addRenderTarget(toneMappingPassRTName, Format.RGBA8, width, height, ResourceResidency.MANAGED);
                ppl.addDepthStencil(toneMappingPassDS, Format.DEPTH_STENCIL, width, height, ResourceResidency.MANAGED);
              }
              ppl.updateRenderTarget(toneMappingPassRTName, width, height);
              ppl.updateDepthStencil(toneMappingPassDS, width, height);
              const toneMappingPass = ppl.addRenderPass(width, height, 'tone-mapping');
              toneMappingPass.name = `CameraToneMappingPass${cameraID}`;
              toneMappingPass.setViewport(new Viewport(area.x, area.y, area.width, area.height));
              if (ppl.containsResource(inputRT)) {
                toneMappingPass.addTexture(inputRT, 'u_texSampler');
              }
              toneMappingPass.addRenderTarget(toneMappingPassRTName, getLoadOpOfClearFlag(camera.clearFlag, AttachmentType.RENDER_TARGET), StoreOp.STORE, toneMappingClearColor);
              toneMappingPass.addDepthStencil(toneMappingPassDS, getLoadOpOfClearFlag(camera.clearFlag, AttachmentType.DEPTH_STENCIL), StoreOp.STORE, camera.clearDepth, camera.clearStencil, camera.clearFlag);
              toneMappingPass.addQueue(QueueHint.NONE).addFullscreenQuad(toneMappingInfo.toneMappingMaterial, 0, SceneFlags.NONE);
              toneMappingPass.addQueue(QueueHint.RENDER_TRANSPARENT).addSceneOfCamera(camera, new LightInfo(), SceneFlags.UI);
              if (getProfilerCamera() === camera) {
                toneMappingPass.showStatistics = true;
              }
              return {
                rtName: toneMappingPassRTName,
                dsName: toneMappingPassDS
              };
            }
            function buildTransparencyPass(camera, ppl, inputRT, inputDS, hasDeferredTransparencyObject) {
              if (hasDeferredTransparencyObject) return {
                rtName: inputRT,
                dsName: inputDS
              };
              const cameraID = getCameraUniqueID(camera);
              const cameraName = `Camera${cameraID}`;
              const cameraInfo = buildShadowPasses(cameraName, camera, ppl);
              const area = getRenderArea(camera, camera.window.width, camera.window.height);
              const width = area.width;
              const height = area.height;
              const alphaPass = ppl.addRenderPass(width, height, 'default');
              alphaPass.name = `CameraAlphaPass${cameraID}`;
              alphaPass.setViewport(new Viewport(area.x, area.y, width, height));
              for (const dirShadowName of cameraInfo.mainLightShadowNames) {
                if (ppl.containsResource(dirShadowName)) {
                  alphaPass.addTexture(dirShadowName, 'cc_shadowMap');
                }
              }
              for (const spotShadowName of cameraInfo.spotLightShadowNames) {
                if (ppl.containsResource(spotShadowName)) {
                  alphaPass.addTexture(spotShadowName, 'cc_spotShadowMap');
                }
              }
              alphaPass.addRenderTarget(inputRT, LoadOp.LOAD, StoreOp.STORE, new Color(camera.clearDepth, camera.clearStencil, 0, 0));
              alphaPass.addDepthStencil(inputDS, LoadOp.LOAD, StoreOp.STORE, camera.clearDepth, camera.clearStencil, camera.clearFlag);
              alphaPass.addQueue(QueueHint.RENDER_TRANSPARENT).addSceneOfCamera(camera, new LightInfo(), SceneFlags.TRANSPARENT_OBJECT | SceneFlags.GEOMETRY);
              return {
                rtName: inputRT,
                dsName: inputDS
              };
            }
            function _buildSpecularPass(camera, ppl, inputRT, inputDS) {
              const cameraID = getCameraUniqueID(camera);
              const cameraName = `Camera${cameraID}`;
              const cameraInfo = buildShadowPasses(cameraName, camera, ppl);
              const area = getRenderArea(camera, camera.window.width, camera.window.height);
              const width = area.width;
              const height = area.height;
              const specalurPass = ppl.addRenderPass(width, height, 'specular-pass');
              specalurPass.name = `CameraSpecalurPass${cameraID}`;
              specalurPass.setViewport(new Viewport(area.x, area.y, width, height));
              for (const dirShadowName of cameraInfo.mainLightShadowNames) {
                if (ppl.containsResource(dirShadowName)) {
                  specalurPass.addTexture(dirShadowName, 'cc_shadowMap');
                }
              }
              for (const spotShadowName of cameraInfo.spotLightShadowNames) {
                if (ppl.containsResource(spotShadowName)) {
                  specalurPass.addTexture(spotShadowName, 'cc_spotShadowMap');
                }
              }
              specalurPass.addRenderTarget(inputRT, LoadOp.LOAD, StoreOp.STORE, new Color(camera.clearColor.x, camera.clearColor.y, camera.clearColor.z, camera.clearColor.w));
              specalurPass.addDepthStencil(inputDS, LoadOp.LOAD, StoreOp.STORE, camera.clearDepth, camera.clearStencil, camera.clearFlag);
              specalurPass.addQueue(QueueHint.RENDER_OPAQUE, 'default').addSceneOfCamera(camera, new LightInfo(), SceneFlags.TRANSPARENT_OBJECT | SceneFlags.DEFAULT_LIGHTING | SceneFlags.PLANAR_SHADOW | SceneFlags.CUTOUT_OBJECT | SceneFlags.DRAW_INSTANCING | SceneFlags.GEOMETRY);
              specalurPass.addQueue(QueueHint.RENDER_TRANSPARENT, 'forward-add').addSceneOfCamera(camera, new LightInfo(), SceneFlags.TRANSPARENT_OBJECT | SceneFlags.DEFAULT_LIGHTING | SceneFlags.PLANAR_SHADOW | SceneFlags.CUTOUT_OBJECT | SceneFlags.DRAW_INSTANCING | SceneFlags.GEOMETRY);
              return {
                rtName: inputRT,
                dsName: inputDS
              };
            }
            function buildSSSSPass(camera, ppl, inputRT, inputDS) {
              if (hasSkinObject(ppl)) {
                forceEnableFloatOutput(ppl);
                const blurInfo = _buildSSSSBlurPass(camera, ppl, inputRT, inputDS);
                const specularInfo = _buildSpecularPass(camera, ppl, blurInfo.rtName, blurInfo.dsName);
                return {
                  rtName: specularInfo.rtName,
                  dsName: specularInfo.dsName
                };
              } else {
                const specularInfo = _buildSpecularPass(camera, ppl, inputRT, inputDS);
                return {
                  rtName: specularInfo.rtName,
                  dsName: specularInfo.dsName
                };
              }
            }
            class HBAOParams {
              get uvDepthToEyePosParams() {
                return this._uvDepthToEyePosParams;
              }
              get radiusParam() {
                return this._radiusParam;
              }
              get miscParam() {
                return this._miscParam;
              }
              get blurParam() {
                return this._blurParam;
              }
              set depthTexFullResolution(val) {
                this._depthTexFullResolution.set(val);
              }
              set depthTexResolution(val) {
                this._depthTexResolution.set(val);
              }
              set sceneScale(val) {
                this._sceneScale = val;
              }
              set cameraFov(val) {
                this._cameraFov = val;
              }
              set radiusScale(val) {
                this._radiusScale = val;
              }
              set angleBiasDegree(val) {
                this._angleBiasDegree = val;
              }
              set aoStrength(val) {
                this._aoStrength = val;
              }
              set blurSharpness(val) {
                this._blurSharpness = val;
              }
              set aoSaturation(val) {
                this._aoSaturation = val;
              }
              _init() {
                if (this.hbaoMaterial) return;
                this.hbaoMaterial = new Material();
                this.hbaoMaterial.name = 'builtin-hbao-material';
                this.hbaoMaterial.initialize({
                  effectName: 'pipeline/post-process/hbao'
                });
                for (let i = 0; i < this.hbaoMaterial.passes.length; ++i) {
                  this.hbaoMaterial.passes[i].tryCompile();
                }
                const width = 4;
                const height = 4;
                const pixelFormat = Texture2D.PixelFormat.RGBA8888;
                const arrayBuffer = new Uint8Array(width * height * 4);
                for (let i = 0; i < this._randomDirAndJitter.length; i++) {
                  arrayBuffer[i] = this._randomDirAndJitter[i];
                }
                const image = new ImageAsset({
                  width,
                  height,
                  _data: arrayBuffer,
                  _compressed: false,
                  format: pixelFormat
                });
                this.randomTexture = new Texture2D();
                this.randomTexture.setFilters(Texture2D.Filter.NEAREST, Texture2D.Filter.NEAREST);
                this.randomTexture.setMipFilter(Texture2D.Filter.NONE);
                this.randomTexture.setWrapMode(Texture2D.WrapMode.REPEAT, Texture2D.WrapMode.REPEAT, Texture2D.WrapMode.REPEAT);
                this.randomTexture.image = image;
                this.hbaoMaterial.setProperty('RandomTex', this.randomTexture, 0);
              }
              update() {
                const HALF_KERNEL_RADIUS = 4;
                const INV_LN2 = 1.44269504;
                const SQRT_LN2 = 0.8325546;
                const gR = this._radiusScale * this._sceneScale;
                const gR2 = gR * gR;
                const gNegInvR2 = -1.0 / gR2;
                const gMaxRadiusPixels = 0.1 * Math.min(this._depthTexFullResolution.x, this._depthTexFullResolution.y);
                this._radiusParam.set(gR, gR2, gNegInvR2, gMaxRadiusPixels);
                const vec2 = new Vec2(this._depthTexResolution.y / this._depthTexResolution.x, 1.0);
                const gFocalLen = new Vec2(vec2.x / Math.tan(this._cameraFov * 0.5), vec2.y / Math.tan(this._cameraFov * 0.5));
                const gTanAngleBias = Math.tan(toRadian(this._angleBiasDegree));
                const gStrength = this._aoStrength;
                this._miscParam.set(gFocalLen.x, gFocalLen.y, gTanAngleBias, gStrength);
                const gUVToViewA = new Vec2(2.0 / gFocalLen.x, -2.0 / gFocalLen.y);
                const gUVToViewB = new Vec2(-1.0 / gFocalLen.x, 1.0 / gFocalLen.y);
                this._uvDepthToEyePosParams.set(gUVToViewA.x, gUVToViewA.y, gUVToViewB.x, gUVToViewB.y);
                const BlurSigma = (HALF_KERNEL_RADIUS + 1.0) * 0.5;
                const gBlurFallOff = INV_LN2 / (2.0 * BlurSigma * BlurSigma);
                const gBlurDepthThreshold = 2.0 * SQRT_LN2 * (this._sceneScale / this._blurSharpness);
                this._blurParam.set(gBlurFallOff, gBlurDepthThreshold, this._blurSharpness / 8.0, this._aoSaturation);
              }
              constructor() {
                this._uvDepthToEyePosParams = new Vec4();
                this._radiusParam = new Vec4();
                this._miscParam = new Vec4();
                this._blurParam = new Vec4();
                this._depthTexFullResolution = new Vec2(1024);
                this._depthTexResolution = new Vec2(1024);
                this._sceneScale = 1.0;
                this._cameraFov = toRadian(45.0);
                this._radiusScale = 1.0;
                this._angleBiasDegree = 10.0;
                this._aoStrength = 1.0;
                this._blurSharpness = 8;
                this._aoSaturation = 1.0;
                this._randomDirAndJitter = [238, 91, 87, 255, 251, 44, 119, 255, 247, 64, 250, 255, 232, 5, 225, 255, 253, 177, 140, 255, 250, 51, 84, 255, 243, 76, 97, 255, 252, 36, 232, 255, 235, 100, 24, 255, 252, 36, 158, 255, 254, 20, 142, 255, 245, 135, 124, 255, 251, 43, 121, 255, 253, 31, 145, 255, 235, 98, 160, 255, 240, 146, 198, 255];
                this._init();
                this.update();
              }
            }
            let _hbaoParams = null;
            const vec2 = new Vec2();
            function _buildHBAOPass(camera, ppl, inputRT, inputDS) {
              if (!_hbaoParams) return {
                rtName: inputRT,
                dsName: inputDS
              };
              const cameraID = getCameraUniqueID(camera);
              const area = getRenderArea(camera, camera.window.width, camera.window.height);
              const width = area.width;
              const height = area.height;
              const hbaoClearColor = new Color(0, 0, 0, camera.clearColor.w);
              const hbaoRTName = `hbaoRTName${cameraID}`;
              if (!ppl.containsResource(hbaoRTName)) {
                ppl.addRenderTarget(hbaoRTName, Format.BGRA8, width, height, ResourceResidency.MANAGED);
              }
              ppl.updateRenderTarget(hbaoRTName, width, height);
              const hbaoPass = ppl.addRenderPass(width, height, 'hbao-pass');
              hbaoPass.name = `CameraHBAOPass${cameraID}`;
              hbaoPass.setViewport(new Viewport(area.x, area.y, area.width, area.height));
              if (ppl.containsResource(inputDS)) {
                const webPipeline = ppl;
                const verId = webPipeline.resourceGraph.vertex(inputDS);
                const sampler = webPipeline.resourceGraph.getSampler(verId);
                sampler.minFilter = sampler.magFilter = Filter.POINT;
                sampler.mipFilter = Filter.NONE;
                sampler.addressU = sampler.addressV = Address.CLAMP;
                hbaoPass.addTexture(inputDS, 'DepthTex');
              }
              hbaoPass.addRenderTarget(hbaoRTName, LoadOp.LOAD, StoreOp.STORE, hbaoClearColor);
              const passIdx = 0;
              _hbaoParams.hbaoMaterial.setProperty('uvDepthToEyePosParams', _hbaoParams.uvDepthToEyePosParams, passIdx);
              _hbaoParams.hbaoMaterial.setProperty('radiusParam', _hbaoParams.radiusParam, passIdx);
              _hbaoParams.hbaoMaterial.setProperty('miscParam', _hbaoParams.miscParam, passIdx);
              _hbaoParams.hbaoMaterial.setProperty('randomTexSize', new Vec4(_hbaoParams.randomTexture.width, _hbaoParams.randomTexture.height, 1.0 / _hbaoParams.randomTexture.width, 1.0 / _hbaoParams.randomTexture.height), passIdx);
              _hbaoParams.hbaoMaterial.setProperty('blurParam', _hbaoParams.blurParam, passIdx);
              hbaoPass.addQueue(QueueHint.RENDER_TRANSPARENT | QueueHint.RENDER_OPAQUE).addCameraQuad(camera, _hbaoParams.hbaoMaterial, passIdx, SceneFlags.NONE);
              return {
                rtName: hbaoRTName,
                dsName: inputDS
              };
            }
            function _buildHBAOBlurPass(camera, ppl, inputRT, inputDS, isYPass) {
              if (!_hbaoParams) return {
                rtName: inputRT,
                dsName: inputDS
              };
              const cameraID = getCameraUniqueID(camera);
              const area = getRenderArea(camera, camera.window.width, camera.window.height);
              const width = area.width;
              const height = area.height;
              const hbaoClearColor = new Color(0, 0, 0, camera.clearColor.w);
              let inputRTName = `hbaoRTName${cameraID}`;
              let outputRTName = `hbaoBluredRTName${cameraID}`;
              let shaderPassName = 'blurx-pass';
              let blurPassName = `CameraHBAOBluredXPass${cameraID}`;
              if (isYPass) {
                outputRTName = `hbaoRTName${cameraID}`;
                inputRTName = `hbaoBluredRTName${cameraID}`;
                shaderPassName = 'blury-pass';
                blurPassName = `CameraHBAOBluredYPass${cameraID}`;
              }
              if (!ppl.containsResource(outputRTName)) {
                ppl.addRenderTarget(outputRTName, Format.BGRA8, width, height, ResourceResidency.MANAGED);
              }
              ppl.updateRenderTarget(outputRTName, width, height);
              const blurPass = ppl.addRenderPass(width, height, shaderPassName);
              blurPass.name = blurPassName;
              blurPass.setViewport(new Viewport(area.x, area.y, area.width, area.height));
              if (ppl.containsResource(inputDS)) {
                const webPipeline = ppl;
                const verId = webPipeline.resourceGraph.vertex(inputDS);
                const sampler = webPipeline.resourceGraph.getSampler(verId);
                sampler.minFilter = sampler.magFilter = Filter.POINT;
                sampler.mipFilter = Filter.NONE;
                sampler.addressU = sampler.addressV = Address.CLAMP;
                blurPass.addTexture(inputDS, 'DepthTex');
              }
              if (ppl.containsResource(inputRTName)) {
                const webPipeline = ppl;
                const verId = webPipeline.resourceGraph.vertex(inputRTName);
                const sampler = webPipeline.resourceGraph.getSampler(verId);
                sampler.minFilter = sampler.magFilter = Filter.LINEAR;
                sampler.mipFilter = Filter.NONE;
                sampler.addressU = sampler.addressV = Address.CLAMP;
                blurPass.addTexture(inputRTName, 'AOTexNearest');
              }
              blurPass.addRenderTarget(outputRTName, LoadOp.LOAD, StoreOp.STORE, hbaoClearColor);
              const passIdx = isYPass ? 2 : 1;
              _hbaoParams.hbaoMaterial.setProperty('uvDepthToEyePosParams', _hbaoParams.uvDepthToEyePosParams, passIdx);
              _hbaoParams.hbaoMaterial.setProperty('radiusParam', _hbaoParams.radiusParam, passIdx);
              _hbaoParams.hbaoMaterial.setProperty('miscParam', _hbaoParams.miscParam, passIdx);
              _hbaoParams.hbaoMaterial.setProperty('blurParam', _hbaoParams.blurParam, passIdx);
              blurPass.addQueue(QueueHint.RENDER_TRANSPARENT | QueueHint.RENDER_OPAQUE).addCameraQuad(camera, _hbaoParams.hbaoMaterial, passIdx, SceneFlags.NONE);
              return {
                rtName: outputRTName,
                dsName: inputDS
              };
            }
            function _buildHBAOCombinedPass(camera, ppl, inputRT, inputDS, outputRT) {
              if (!_hbaoParams) return {
                rtName: inputRT,
                dsName: inputDS
              };
              const cameraID = getCameraUniqueID(camera);
              const area = getRenderArea(camera, camera.window.width, camera.window.height);
              const width = area.width;
              const height = area.height;
              const hbaoClearColor = new Color(0, 0, 0, camera.clearColor.w);
              const outputRTName = outputRT;
              if (!ppl.containsResource(outputRTName)) {
                ppl.addRenderTarget(outputRTName, getRTFormatBeforeToneMapping(ppl), width, height, ResourceResidency.MANAGED);
              }
              ppl.updateRenderTarget(outputRTName, width, height);
              const hbaoPass = ppl.addRenderPass(width, height, 'combine-pass');
              hbaoPass.name = `CameraHBAOCombinedPass${cameraID}`;
              hbaoPass.setViewport(new Viewport(area.x, area.y, area.width, area.height));
              const inputRTName = inputRT;
              if (ppl.containsResource(inputRTName)) {
                const webPipeline = ppl;
                const verId = webPipeline.resourceGraph.vertex(inputRTName);
                const sampler = webPipeline.resourceGraph.getSampler(verId);
                sampler.minFilter = sampler.magFilter = Filter.LINEAR;
                sampler.mipFilter = Filter.NONE;
                sampler.addressU = sampler.addressV = Address.CLAMP;
                hbaoPass.addTexture(inputRTName, 'AOTexNearest');
              }
              hbaoPass.addRenderTarget(outputRTName, LoadOp.LOAD, StoreOp.STORE, hbaoClearColor);
              const passIdx = 3;
              _hbaoParams.hbaoMaterial.setProperty('uvDepthToEyePosParams', _hbaoParams.uvDepthToEyePosParams, passIdx);
              _hbaoParams.hbaoMaterial.setProperty('radiusParam', _hbaoParams.radiusParam, passIdx);
              _hbaoParams.hbaoMaterial.setProperty('miscParam', _hbaoParams.miscParam, passIdx);
              _hbaoParams.hbaoMaterial.setProperty('blurParam', _hbaoParams.blurParam, passIdx);
              hbaoPass.addQueue(QueueHint.RENDER_TRANSPARENT | QueueHint.RENDER_OPAQUE).addCameraQuad(camera, _hbaoParams.hbaoMaterial, passIdx, SceneFlags.NONE);
              return {
                rtName: outputRTName,
                dsName: inputDS
              };
            }
            function buildHBAOPasses(camera, ppl, inputRT, inputDS, radiusScale = 1.0, angleBiasDegree = 10.0, blurSharpness = 3, aoSaturation = 1.0, aoStrength = 1.0, needBlur = true) {
              const area = getRenderArea(camera, camera.window.width, camera.window.height);
              const width = area.width;
              const height = area.height;
              if (!_hbaoParams) _hbaoParams = new HBAOParams();
              const sceneScale = camera.nearClip;
              _hbaoParams.depthTexFullResolution = vec2.set(width, height);
              _hbaoParams.depthTexResolution = vec2.set(width, height);
              _hbaoParams.sceneScale = sceneScale;
              _hbaoParams.cameraFov = camera.fov;
              _hbaoParams.radiusScale = radiusScale;
              _hbaoParams.angleBiasDegree = angleBiasDegree;
              _hbaoParams.aoStrength = aoStrength;
              _hbaoParams.blurSharpness = blurSharpness;
              _hbaoParams.aoSaturation = aoSaturation;
              _hbaoParams.update();
              const director = legacyCC.director;
              const root = director.root;
              if (root.debugView) {
                if (root.debugView.isEnabled() && (root.debugView.singleMode !== DebugViewSingleType.NONE && root.debugView.singleMode !== DebugViewSingleType.AO || !root.debugView.isCompositeModeEnabled(DebugViewCompositeType.AO))) {
                  return {
                    rtName: inputRT,
                    dsName: inputDS
                  };
                }
              }
              const hbaoInfo = _buildHBAOPass(camera, ppl, inputRT, inputDS);
              let hbaoCombinedInputRTName = hbaoInfo.rtName;
              if (needBlur) {
                const haboBlurInfoX = _buildHBAOBlurPass(camera, ppl, hbaoInfo.rtName, inputDS, false);
                const haboBlurInfoY = _buildHBAOBlurPass(camera, ppl, haboBlurInfoX.rtName, inputDS, true);
                hbaoCombinedInputRTName = haboBlurInfoY.rtName;
              }
              const haboCombined = _buildHBAOCombinedPass(camera, ppl, hbaoCombinedInputRTName, inputDS, inputRT);
              return {
                rtName: haboCombined.rtName,
                dsName: inputDS
              };
            }
            const MAX_LIGHTS_PER_CLUSTER = 200;
            const CLUSTERS_X = 16;
            const CLUSTERS_Y = 8;
            const CLUSTERS_Z = 24;
            const CLUSTER_COUNT = CLUSTERS_X * CLUSTERS_Y * CLUSTERS_Z;
            class ClusterLightData {
              _initMaterial(id, effect) {
                const mat = new Material();
                mat.name = id;
                mat.initialize({
                  effectName: effect
                });
                for (let i = 0; i < mat.passes.length; ++i) {
                  mat.passes[i].tryCompile();
                }
                return mat;
              }
              _init() {
                this.clusterBuildCS = this._initMaterial('builtin-cluster-build-cs-material', 'pipeline/cluster-build');
                this.clusterLightCullingCS = this._initMaterial('builtin-cluster-culling-cs-material', 'pipeline/cluster-culling');
                this.dispatchX = CLUSTERS_X / this.clusters_x_threads;
                this.dispatchY = CLUSTERS_Y / this.clusters_y_threads;
                this.dispatchZ = CLUSTERS_Z / this.clusters_z_threads;
              }
              constructor() {
                this.clusters_x_threads = 16;
                this.clusters_y_threads = 8;
                this.clusters_z_threads = 1;
                this.dispatchX = 1;
                this.dispatchY = 1;
                this.dispatchZ = 1;
                this._init();
              }
            }
            let _clusterLightData = null;
            function buildLightClusterBuildPass(camera, clusterData, ppl) {
              const cameraID = getCameraUniqueID(camera);
              const clusterBufferName = `clusterBuffer${cameraID}`;
              const clusterBufferSize = CLUSTER_COUNT * 2 * 4 * 4;
              if (!ppl.containsResource(clusterBufferName)) {
                ppl.addStorageBuffer(clusterBufferName, Format.UNKNOWN, clusterBufferSize, ResourceResidency.MANAGED);
              }
              ppl.updateStorageBuffer(clusterBufferName, clusterBufferSize);
              const clusterPass = ppl.addComputePass('cluster-build-cs');
              clusterPass.addStorageBuffer(clusterBufferName, AccessType.WRITE, 'b_clustersBuffer');
              clusterPass.addQueue().addDispatch(clusterData.dispatchX, clusterData.dispatchY, clusterData.dispatchZ, clusterData.clusterBuildCS, 0);
              const width = camera.width * ppl.pipelineSceneData.shadingScale;
              const height = camera.height * ppl.pipelineSceneData.shadingScale;
              if ('setCurrConstant' in clusterPass) {
                clusterPass.addConstant('CCConst', 'cluster-build-cs');
              }
              clusterPass.setVec4('cc_nearFar', new Vec4(camera.nearClip, camera.farClip, camera.getClipSpaceMinz(), 0));
              clusterPass.setVec4('cc_viewPort', new Vec4(0, 0, width, height));
              clusterPass.setVec4('cc_workGroup', new Vec4(CLUSTERS_X, CLUSTERS_Y, CLUSTERS_Z, 0));
              clusterPass.setMat4('cc_matView', camera.matView);
              clusterPass.setMat4('cc_matProjInv', camera.matProjInv);
            }
            function buildLightClusterCullingPass(camera, clusterData, ppl) {
              const cameraID = getCameraUniqueID(camera);
              const clusterBufferName = `clusterBuffer${cameraID}`;
              const clusterLightBufferName = `clusterLightBuffer${cameraID}`;
              const clusterGlobalIndexBufferName = `globalIndexBuffer${cameraID}`;
              const clusterLightIndicesBufferName = `clusterLightIndicesBuffer${cameraID}`;
              const clusterLightGridBufferName = `clusterLightGridBuffer${cameraID}`;
              const lightIndexBufferSize = MAX_LIGHTS_PER_CLUSTER * CLUSTER_COUNT * 4;
              const lightGridBufferSize = CLUSTER_COUNT * 4 * 4;
              if (!ppl.containsResource(clusterLightIndicesBufferName)) {
                ppl.addStorageBuffer(clusterLightIndicesBufferName, Format.UNKNOWN, lightIndexBufferSize, ResourceResidency.MANAGED);
              }
              if (!ppl.containsResource(clusterLightGridBufferName)) {
                ppl.addStorageBuffer(clusterLightGridBufferName, Format.UNKNOWN, lightGridBufferSize, ResourceResidency.MANAGED);
              }
              const clusterPass = ppl.addComputePass('cluster-culling-cs');
              clusterPass.addStorageBuffer(clusterLightBufferName, AccessType.READ, 'b_ccLightsBuffer');
              clusterPass.addStorageBuffer(clusterBufferName, AccessType.READ, 'b_clustersBuffer');
              clusterPass.addStorageBuffer(clusterLightIndicesBufferName, AccessType.WRITE, 'b_clusterLightIndicesBuffer');
              clusterPass.addStorageBuffer(clusterLightGridBufferName, AccessType.WRITE, 'b_clusterLightGridBuffer');
              clusterPass.addStorageBuffer(clusterGlobalIndexBufferName, AccessType.WRITE, 'b_globalIndexBuffer');
              clusterPass.addQueue().addDispatch(clusterData.dispatchX, clusterData.dispatchY, clusterData.dispatchZ, clusterData.clusterLightCullingCS, 0);
              const width = camera.width * ppl.pipelineSceneData.shadingScale;
              const height = camera.height * ppl.pipelineSceneData.shadingScale;
              if ('setCurrConstant' in clusterPass) {
                clusterPass.addConstant('CCConst', 'cluster-build-cs');
              }
              clusterPass.setVec4('cc_nearFar', new Vec4(camera.nearClip, camera.farClip, camera.getClipSpaceMinz(), 0));
              clusterPass.setVec4('cc_viewPort', new Vec4(width, height, width, height));
              clusterPass.setVec4('cc_workGroup', new Vec4(CLUSTERS_X, CLUSTERS_Y, CLUSTERS_Z, 0));
              clusterPass.setMat4('cc_matView', camera.matView);
              clusterPass.setMat4('cc_matProjInv', camera.matProjInv);
            }
            function buildLightBuffer(size, floatPerLight, camera, pipeline) {
              const buffer = new ArrayBuffer(size);
              const view = new Float32Array(buffer);
              const data = pipeline.pipelineSceneData;
              const lightMeterScale = 10000.0;
              const exposure = camera.exposure;
              let index = 0;
              for (const light of data.validPunctualLights) {
                const offset = index * floatPerLight;
                const positionOffset = offset + 0;
                const colorOffset = offset + 4;
                const sizeRangeAngleOffset = offset + 8;
                const directionOffset = offset + 12;
                const boundSizeOffset = offset + 16;
                let luminanceHDR = 0;
                let luminanceLDR = 0;
                let position;
                if (light.type === LightType.POINT) {
                  const point = light;
                  position = point.position;
                  luminanceLDR = point.luminanceLDR;
                  luminanceHDR = point.luminanceHDR;
                  view[sizeRangeAngleOffset] = 0;
                  view[sizeRangeAngleOffset + 1] = point.range;
                  view[sizeRangeAngleOffset + 2] = 0;
                  view[sizeRangeAngleOffset + 3] = 0;
                } else if (light.type === LightType.SPHERE) {
                  const sphere = light;
                  position = sphere.position;
                  luminanceLDR = sphere.luminanceLDR;
                  luminanceHDR = sphere.luminanceHDR;
                  view[sizeRangeAngleOffset] = sphere.size;
                  view[sizeRangeAngleOffset + 1] = sphere.range;
                  view[sizeRangeAngleOffset + 2] = 0;
                  view[sizeRangeAngleOffset + 3] = 0;
                } else if (light.type === LightType.SPOT) {
                  const spot = light;
                  position = spot.position;
                  luminanceLDR = spot.luminanceLDR;
                  luminanceHDR = spot.luminanceHDR;
                  view[sizeRangeAngleOffset] = spot.size;
                  view[sizeRangeAngleOffset + 1] = spot.range;
                  view[sizeRangeAngleOffset + 2] = spot.spotAngle;
                  view[sizeRangeAngleOffset + 3] = 0;
                  const dir = spot.direction;
                  view[directionOffset] = dir.x;
                  view[directionOffset + 1] = dir.y;
                  view[directionOffset + 2] = dir.z;
                  view[directionOffset + 3] = 0;
                } else if (light.type === LightType.RANGED_DIRECTIONAL) {
                  const directional = light;
                  position = directional.position;
                  luminanceLDR = directional.illuminanceLDR;
                  luminanceHDR = directional.illuminanceHDR;
                  const right = directional.right;
                  view[sizeRangeAngleOffset] = right.x;
                  view[sizeRangeAngleOffset + 1] = right.y;
                  view[sizeRangeAngleOffset + 2] = right.z;
                  view[sizeRangeAngleOffset + 3] = 0;
                  const dir = directional.direction;
                  view[directionOffset] = dir.x;
                  view[directionOffset + 1] = dir.y;
                  view[directionOffset + 2] = dir.z;
                  view[directionOffset + 3] = 0;
                  const scale = directional.scale;
                  view[boundSizeOffset] = scale.x * 0.5;
                  view[boundSizeOffset + 1] = scale.y * 0.5;
                  view[boundSizeOffset + 2] = scale.z * 0.5;
                  view[boundSizeOffset + 3] = 0;
                }
                view[positionOffset] = position.x;
                view[positionOffset + 1] = position.y;
                view[positionOffset + 2] = position.z;
                view[positionOffset + 3] = light.type;
                const color = light.color;
                if (light.useColorTemperature) {
                  const tempRGB = light.colorTemperatureRGB;
                  view[colorOffset] = color.x * tempRGB.x;
                  view[colorOffset + 1] = color.y * tempRGB.y;
                  view[colorOffset + 2] = color.z * tempRGB.z;
                } else {
                  view[colorOffset] = color.x;
                  view[colorOffset + 1] = color.y;
                  view[colorOffset + 2] = color.z;
                }
                view[colorOffset + 3] = data.isHDR ? luminanceHDR * exposure * lightMeterScale : luminanceLDR;
                index++;
              }
              view[3 * 4 + 3] = data.validPunctualLights.length;
              return buffer;
            }
            function buildClusterLightData(camera, pipeline) {
              validPunctualLightsCulling(pipeline, camera);
              const data = pipeline.pipelineSceneData;
              const validLightCountForBuffer = nextPow2(Math.max(data.validPunctualLights.length, 1));
              const lightBufferFloatNum = 20;
              const clusterLightBufferSize = validLightCountForBuffer * 4 * lightBufferFloatNum;
              const cameraID = getCameraUniqueID(camera);
              const clusterLightBufferName = `clusterLightBuffer${cameraID}`;
              const clusterGlobalIndexBufferName = `globalIndexBuffer${cameraID}`;
              const ppl = pipeline;
              if (!ppl.containsResource(clusterGlobalIndexBufferName)) {
                ppl.addStorageBuffer(clusterGlobalIndexBufferName, Format.UNKNOWN, 4, ResourceResidency.PERSISTENT);
              }
              if (!ppl.containsResource(clusterLightBufferName)) {
                ppl.addStorageBuffer(clusterLightBufferName, Format.UNKNOWN, clusterLightBufferSize, ResourceResidency.PERSISTENT);
              }
              ppl.updateStorageBuffer(clusterLightBufferName, clusterLightBufferSize);
              const buffer = buildLightBuffer(clusterLightBufferSize, lightBufferFloatNum, camera, pipeline);
              const globalIndexBuffer = new ArrayBuffer(4);
              const globalIndexBufferView = new Uint32Array(globalIndexBuffer);
              globalIndexBufferView[0] = 0;
              const uploadPair1 = new UploadPair(new Uint8Array(buffer), clusterLightBufferName);
              const uploadPair2 = new UploadPair(new Uint8Array(globalIndexBuffer), clusterGlobalIndexBufferName);
              ppl.addUploadPass([uploadPair1, uploadPair2]);
            }
            function buildClusterPasses(camera, pipeline) {
              buildClusterLightData(camera, pipeline);
              const ppl = pipeline;
              if (!_clusterLightData) _clusterLightData = new ClusterLightData();
              buildLightClusterBuildPass(camera, _clusterLightData, ppl);
              buildLightClusterCullingPass(camera, _clusterLightData, ppl);
            }

            function isUICamera(camera) {
              const scene = camera.scene;
              const batches = scene.batches;
              for (let i = 0; batches && i < batches.length; i++) {
                const batch = batches[i];
                if (camera.visibility & batch.visFlags) {
                  return true;
                }
              }
              return false;
            }

            class CameraInfo {
              constructor(camera, id, windowID, width, height) {
                this.camera = void 0;
                this.id = 0xFFFFFFFF;
                this.windowID = 0xFFFFFFFF;
                this.width = 0;
                this.height = 0;
                this.camera = camera;
                this.id = id;
                this.windowID = windowID;
                this.width = width;
                this.height = height;
              }
            }
            const cameraInfos = new Map();
            const windowInfos = new Map();
            function prepareRenderWindow(camera) {
              let windowID = windowInfos.get(camera.window);
              if (windowID === undefined) {
                windowID = windowInfos.size;
                windowInfos.set(camera.window, windowID);
              }
              return windowID;
            }
            function prepareResource(ppl, camera, initResourceFunc, updateResourceFunc) {
              let info = cameraInfos.get(camera);
              if (info !== undefined) {
                let width = camera.window.width;
                let height = camera.window.height;
                if (width === 0) {
                  width = 1;
                }
                if (height === 0) {
                  height = 1;
                }
                const windowID = prepareRenderWindow(camera);
                info.width = width;
                info.height = height;
                info.windowID = windowID;
                updateResourceFunc(ppl, info);
                return info;
              }
              const windowID = prepareRenderWindow(camera);
              info = new CameraInfo(camera, cameraInfos.size, windowID, camera.window.width ? camera.window.width : 1, camera.window.height ? camera.window.height : 1);
              initResourceFunc(ppl, info);
              cameraInfos.set(camera, info);
              return info;
            }
            function buildShadowRes(ppl, name, width, height) {
              const fboW = width;
              const fboH = height;
              const shadowMapName = name;
              const device = ppl.device;
              if (!ppl.containsResource(shadowMapName)) {
                const format = supportsR32FloatTexture(device) ? Format.R32F : Format.RGBA8;
                ppl.addRenderTarget(shadowMapName, format, fboW, fboH, ResourceResidency.MANAGED);
                ppl.addDepthStencil(`${shadowMapName}Depth`, Format.DEPTH_STENCIL, fboW, fboH, ResourceResidency.MANAGED);
              }
              ppl.updateRenderTarget(shadowMapName, fboW, fboH);
              ppl.updateDepthStencil(`${shadowMapName}Depth`, fboW, fboH);
            }
            const shadowInfo = new ShadowInfo();
            function setupShadowRes(ppl, cameraInfo) {
              const camera = cameraInfo.camera;
              validPunctualLightsCulling(ppl, camera);
              const pipeline = ppl;
              const shadow = pipeline.pipelineSceneData.shadows;
              const validPunctualLights = ppl.pipelineSceneData.validPunctualLights;
              const shadows = ppl.pipelineSceneData.shadows;
              shadowInfo.reset();
              if (!shadow.enabled || shadow.type !== ShadowType$1.ShadowMap) {
                return shadowInfo;
              }
              shadowInfo.shadowEnabled = true;
              const _validLights = shadowInfo.validLights;
              let n = 0;
              let m = 0;
              for (; n < shadow.maxReceived && m < validPunctualLights.length;) {
                const light = validPunctualLights[m];
                if (light.type === LightType$1.SPOT) {
                  const spotLight = light;
                  if (spotLight.shadowEnabled) {
                    _validLights.push(light);
                    n++;
                  }
                }
                m++;
              }
              const {
                mainLight
              } = camera.scene;
              const mapWidth = shadows.size.x;
              const mapHeight = shadows.size.y;
              if (mainLight && mainLight.shadowEnabled) {
                shadowInfo.mainLightShadowNames[0] = `MainLightShadow${cameraInfo.id}`;
                if (mainLight.shadowFixedArea) {
                  buildShadowRes(ppl, shadowInfo.mainLightShadowNames[0], mapWidth, mapHeight);
                } else {
                  const csmLevel = pipeline.pipelineSceneData.csmSupported ? mainLight.csmLevel : 1;
                  shadowInfo.mainLightShadowNames[0] = `MainLightShadow${cameraInfo.id}`;
                  for (let i = 0; i < csmLevel; i++) {
                    buildShadowRes(ppl, shadowInfo.mainLightShadowNames[0], mapWidth, mapHeight);
                  }
                }
              }
              for (let l = 0; l < _validLights.length; l++) {
                _validLights[l];
                const passName = `SpotLightShadow${l.toString()}${cameraInfo.id}`;
                shadowInfo.spotLightShadowNames[l] = passName;
                buildShadowRes(ppl, shadowInfo.spotLightShadowNames[l], mapWidth, mapHeight);
              }
              return shadowInfo;
            }
            const updateShadowRes = setupShadowRes;
            let shadowPass;
            function buildShadowPass(passName, ppl, camera, light, level, width, height) {
              const fboW = width;
              const fboH = height;
              const area = getRenderArea(camera, width, height, light, level);
              width = area.width;
              height = area.height;
              const shadowMapName = passName;
              if (!level) {
                shadowPass = ppl.addRenderPass(width, height, 'default');
                shadowPass.name = passName;
                shadowPass.setViewport(new Viewport(0, 0, fboW, fboH));
                shadowPass.addRenderTarget(shadowMapName, LoadOp.CLEAR, StoreOp.STORE, new Color(1, 1, 1, camera.clearColor.w));
                shadowPass.addDepthStencil(`${shadowMapName}Depth`, LoadOp.CLEAR, StoreOp.DISCARD, camera.clearDepth, camera.clearStencil, ClearFlagBit.DEPTH_STENCIL);
              }
              const queue = shadowPass.addQueue(QueueHint.RENDER_OPAQUE, 'shadow-caster');
              queue.addSceneOfCamera(camera, new LightInfo(light, level), SceneFlags.SHADOW_CASTER);
              queue.setViewport(new Viewport(area.x, area.y, area.width, area.height));
            }
            function setupShadowPass(ppl, cameraInfo) {
              if (!shadowInfo.shadowEnabled) return;
              const camera = cameraInfo.camera;
              const shadows = ppl.pipelineSceneData.shadows;
              const mapWidth = shadows.size.x;
              const mapHeight = shadows.size.y;
              const {
                mainLight
              } = camera.scene;
              if (mainLight && mainLight.shadowEnabled) {
                shadowInfo.mainLightShadowNames[0] = `MainLightShadow${cameraInfo.id}`;
                if (mainLight.shadowFixedArea) {
                  buildShadowPass(shadowInfo.mainLightShadowNames[0], ppl, camera, mainLight, 0, mapWidth, mapHeight);
                } else {
                  const csmLevel = ppl.pipelineSceneData.csmSupported ? mainLight.csmLevel : 1;
                  shadowInfo.mainLightShadowNames[0] = `MainLightShadow${cameraInfo.id}`;
                  for (let i = 0; i < csmLevel; i++) {
                    buildShadowPass(shadowInfo.mainLightShadowNames[0], ppl, camera, mainLight, i, mapWidth, mapHeight);
                  }
                }
              }
              for (let l = 0; l < shadowInfo.validLights.length; l++) {
                const light = shadowInfo.validLights[l];
                const passName = `SpotLightShadow${l.toString()}${cameraInfo.id}`;
                shadowInfo.spotLightShadowNames[l] = passName;
                buildShadowPass(passName, ppl, camera, light, 0, mapWidth, mapHeight);
              }
            }
            function setupForwardRes(ppl, cameraInfo, isOffScreen = false) {
              const camera = cameraInfo.camera;
              const area = getRenderArea(camera, camera.window.width, camera.window.height);
              const width = area.width;
              const height = area.height;
              setupShadowRes(ppl, cameraInfo);
              if (!isOffScreen) {
                ppl.addRenderWindow(`ForwardColor${cameraInfo.id}`, Format.BGRA8, width, height, cameraInfo.camera.window);
              } else {
                ppl.addRenderTarget(`ForwardColor${cameraInfo.id}`, getRTFormatBeforeToneMapping(ppl), width, height, ResourceResidency.PERSISTENT);
              }
              ppl.addDepthStencil(`ForwardDepthStencil${cameraInfo.id}`, Format.DEPTH_STENCIL, width, height);
            }
            function updateForwardRes(ppl, cameraInfo, isOffScreen = false) {
              const camera = cameraInfo.camera;
              const area = getRenderArea(camera, camera.window.width, camera.window.height);
              const width = area.width;
              const height = area.height;
              updateShadowRes(ppl, cameraInfo);
              if (!isOffScreen) {
                ppl.updateRenderWindow(`ForwardColor${cameraInfo.id}`, cameraInfo.camera.window);
              } else {
                ppl.updateRenderTarget(`ForwardColor${cameraInfo.id}`, width, height);
              }
              ppl.updateDepthStencil(`ForwardDepthStencil${cameraInfo.id}`, width, height);
            }
            function setupDeferredForward(ppl, cameraInfo, inputColor, clusterLighting) {
              const area = getRenderArea(cameraInfo.camera, cameraInfo.camera.window.width, cameraInfo.camera.window.height);
              const width = area.width;
              const height = area.height;
              const forwardPass = ppl.addRenderPass(width, height, 'default');
              const camera = cameraInfo.camera;
              forwardPass.addRenderTarget(inputColor, LoadOp.LOAD, StoreOp.STORE);
              forwardPass.addDepthStencil(gBufferInfo.ds, LoadOp.LOAD, StoreOp.DISCARD);
              for (const dirShadowName of shadowInfo.mainLightShadowNames) {
                if (ppl.containsResource(dirShadowName)) {
                  forwardPass.addTexture(dirShadowName, 'cc_shadowMap');
                }
              }
              for (const spotShadowName of shadowInfo.spotLightShadowNames) {
                if (ppl.containsResource(spotShadowName)) {
                  forwardPass.addTexture(spotShadowName, 'cc_spotShadowMap');
                }
              }
              let sceneFlags = SceneFlags.OPAQUE_OBJECT | SceneFlags.PLANAR_SHADOW | SceneFlags.CUTOUT_OBJECT | SceneFlags.DRAW_INSTANCING;
              sceneFlags |= clusterLighting ? SceneFlags.CLUSTERED_LIGHTING : SceneFlags.DEFAULT_LIGHTING;
              forwardPass.addQueue(QueueHint.RENDER_OPAQUE, 'deferred-forward').addSceneOfCamera(camera, new LightInfo(), sceneFlags);
              forwardPass.addQueue(QueueHint.RENDER_TRANSPARENT, 'deferred-forward').addSceneOfCamera(camera, new LightInfo(), SceneFlags.TRANSPARENT_OBJECT | SceneFlags.GEOMETRY);
            }
            function setupForwardPass(ppl, cameraInfo, isOffScreen = false, enabledAlpha = true) {
              setupShadowPass(ppl, cameraInfo);
              const cameraID = cameraInfo.id;
              const area = getRenderArea(cameraInfo.camera, cameraInfo.camera.window.width, cameraInfo.camera.window.height);
              const width = area.width;
              const height = area.height;
              const forwardPass = ppl.addRenderPass(width, height, 'default');
              forwardPass.name = `ForwardPass${cameraID}`;
              forwardPass.setViewport(new Viewport(area.x, area.y, width, height));
              for (const dirShadowName of shadowInfo.mainLightShadowNames) {
                if (ppl.containsResource(dirShadowName)) {
                  forwardPass.addTexture(dirShadowName, 'cc_shadowMap');
                }
              }
              for (const spotShadowName of shadowInfo.spotLightShadowNames) {
                if (ppl.containsResource(spotShadowName)) {
                  forwardPass.addTexture(spotShadowName, 'cc_spotShadowMap');
                }
              }
              const camera = cameraInfo.camera;
              forwardPass.addRenderTarget(`ForwardColor${cameraInfo.id}`, isOffScreen ? LoadOp.CLEAR : getLoadOpOfClearFlag(camera.clearFlag, AttachmentType.RENDER_TARGET), StoreOp.STORE, new Color(camera.clearColor.x, camera.clearColor.y, camera.clearColor.z, camera.clearColor.w));
              forwardPass.addDepthStencil(`ForwardDepthStencil${cameraInfo.id}`, isOffScreen ? LoadOp.CLEAR : getLoadOpOfClearFlag(camera.clearFlag, AttachmentType.DEPTH_STENCIL), isOffScreen ? StoreOp.DISCARD : StoreOp.STORE, camera.clearDepth, camera.clearStencil, camera.clearFlag);
              forwardPass.addQueue(QueueHint.RENDER_OPAQUE).addSceneOfCamera(camera, new LightInfo(), SceneFlags.OPAQUE_OBJECT | SceneFlags.PLANAR_SHADOW | SceneFlags.CUTOUT_OBJECT | SceneFlags.DEFAULT_LIGHTING | SceneFlags.DRAW_INSTANCING);
              let sceneFlags = SceneFlags.TRANSPARENT_OBJECT | SceneFlags.GEOMETRY;
              if (!isOffScreen) {
                sceneFlags |= SceneFlags.UI;
                forwardPass.showStatistics = true;
              }
              if (enabledAlpha) {
                forwardPass.addQueue(QueueHint.RENDER_TRANSPARENT).addSceneOfCamera(camera, new LightInfo(), sceneFlags);
              }
              return {
                rtName: `ForwardColor${cameraInfo.id}`,
                dsName: `ForwardDepthStencil${cameraInfo.id}`
              };
            }
            const gBufferInfo = new GBufferInfo();
            function setupGBufferRes(ppl, info) {
              const camera = info.camera;
              const area = getRenderArea(camera, camera.window.width, camera.window.height);
              const width = area.width;
              const height = area.height;
              const gBufferPassRTName = `gBufferPassColorCamera${info.id}`;
              const gBufferPassNormal = `gBufferPassNormal${info.id}`;
              const gBufferPassEmissive = `gBufferPassEmissive${info.id}`;
              const gBufferPassDSName = `gBufferPassDSCamera${info.id}`;
              const colFormat = Format.RGBA16F;
              ppl.addRenderTarget(gBufferPassRTName, colFormat, width, height, ResourceResidency.MANAGED);
              ppl.addRenderTarget(gBufferPassEmissive, colFormat, width, height, ResourceResidency.MANAGED);
              ppl.addRenderTarget(gBufferPassNormal, colFormat, width, height, ResourceResidency.MANAGED);
              ppl.addDepthStencil(gBufferPassDSName, Format.DEPTH_STENCIL, width, height, ResourceResidency.MANAGED);
              gBufferInfo.color = gBufferPassRTName;
              gBufferInfo.normal = gBufferPassNormal;
              gBufferInfo.emissive = gBufferPassEmissive;
              gBufferInfo.ds = gBufferPassDSName;
            }
            function updateGBufferRes(ppl, info) {
              const camera = info.camera;
              const area = getRenderArea(camera, camera.window.width, camera.window.height);
              const width = area.width;
              const height = area.height;
              const gBufferPassRTName = `gBufferPassColorCamera${info.id}`;
              const gBufferPassNormal = `gBufferPassNormal${info.id}`;
              const gBufferPassEmissive = `gBufferPassEmissive${info.id}`;
              const gBufferPassDSName = `gBufferPassDSCamera${info.id}`;
              ppl.updateRenderTarget(gBufferPassRTName, width, height);
              ppl.updateRenderTarget(gBufferPassEmissive, width, height);
              ppl.updateRenderTarget(gBufferPassNormal, width, height);
              ppl.updateDepthStencil(gBufferPassDSName, width, height);
            }
            new Color(0, 0, 0, 0);
            function setupGBufferPass(ppl, info) {
              const camera = info.camera;
              const area = getRenderArea(camera, camera.window.width, camera.window.height);
              const width = area.width;
              const height = area.height;
              const gBufferPassRTName = gBufferInfo.color;
              const gBufferPassNormal = gBufferInfo.normal;
              const gBufferPassEmissive = gBufferInfo.emissive;
              const gBufferPassDSName = gBufferInfo.ds;
              const gBufferPass = ppl.addRenderPass(width, height, 'gbuffer');
              gBufferPass.name = `CameraGBufferPass${info.id}`;
              gBufferPass.setViewport(new Viewport(area.x, area.y, width, height));
              const rtColor = new Color(0, 0, 0, 0);
              if (camera.clearFlag & ClearFlagBit.COLOR) {
                if (ppl.pipelineSceneData.isHDR) {
                  SRGBToLinear(rtColor, camera.clearColor);
                } else {
                  rtColor.x = camera.clearColor.x;
                  rtColor.y = camera.clearColor.y;
                  rtColor.z = camera.clearColor.z;
                }
              }
              gBufferPass.addRenderTarget(gBufferPassRTName, LoadOp.CLEAR, StoreOp.STORE, rtColor);
              gBufferPass.addRenderTarget(gBufferPassEmissive, LoadOp.CLEAR, StoreOp.STORE, new Color(0, 0, 0, 0));
              gBufferPass.addRenderTarget(gBufferPassNormal, LoadOp.CLEAR, StoreOp.STORE, new Color(0, 0, 0, 0));
              gBufferPass.addDepthStencil(gBufferPassDSName, LoadOp.CLEAR, StoreOp.STORE, camera.clearDepth, camera.clearStencil, camera.clearFlag);
              gBufferPass.addQueue(QueueHint.RENDER_OPAQUE, 'gbuffer').addSceneOfCamera(camera, new LightInfo(), SceneFlags.OPAQUE_OBJECT | SceneFlags.CUTOUT_OBJECT);
              return gBufferPass;
            }
            function setupLightingRes(ppl, info) {
              setupShadowRes(ppl, info);
              const camera = info.camera;
              const area = getRenderArea(camera, camera.window.width, camera.window.height);
              const width = area.width;
              const height = area.height;
              const deferredLightingPassRTName = `deferredLightingPassRTName${info.id}`;
              ppl.addRenderTarget(deferredLightingPassRTName, Format.RGBA8, width, height, ResourceResidency.MANAGED);
            }
            function updateLightingRes(ppl, info) {
              updateShadowRes(ppl, info);
              const camera = info.camera;
              const area = getRenderArea(camera, camera.window.width, camera.window.height);
              const width = area.width;
              const height = area.height;
              const deferredLightingPassRTName = `deferredLightingPassRTName${info.id}`;
              ppl.updateRenderTarget(deferredLightingPassRTName, width, height);
            }
            let lightingInfo;
            function setupLightingPass(pipeline, info, useCluster) {
              setupShadowPass(pipeline, info);
              if (!lightingInfo) {
                lightingInfo = new LightingInfo(useCluster);
              }
              const ppl = pipeline;
              const camera = info.camera;
              const area = getRenderArea(camera, camera.window.width, camera.window.height);
              const width = area.width;
              const height = area.height;
              const cameraID = getCameraUniqueID(camera);
              const deferredLightingPassRTName = `deferredLightingPassRTName${info.id}`;
              const lightingPass = ppl.addRenderPass(width, height, 'deferred-lighting');
              lightingPass.name = `CameraLightingPass${info.id}`;
              lightingPass.setViewport(new Viewport(area.x, area.y, width, height));
              for (const dirShadowName of shadowInfo.mainLightShadowNames) {
                if (ppl.containsResource(dirShadowName)) {
                  lightingPass.addTexture(dirShadowName, 'cc_shadowMap');
                }
              }
              for (const spotShadowName of shadowInfo.spotLightShadowNames) {
                if (ppl.containsResource(spotShadowName)) {
                  lightingPass.addTexture(spotShadowName, 'cc_spotShadowMap');
                }
              }
              if (ppl.containsResource(gBufferInfo.color)) {
                lightingPass.addTexture(gBufferInfo.color, 'albedoMap');
                lightingPass.addTexture(gBufferInfo.normal, 'normalMap');
                lightingPass.addTexture(gBufferInfo.emissive, 'emissiveMap');
                lightingPass.addTexture(gBufferInfo.ds, 'depthStencil');
              }
              const clusterLightBufferName = `clusterLightBuffer${cameraID}`;
              const clusterLightIndicesBufferName = `clusterLightIndicesBuffer${cameraID}`;
              const clusterLightGridBufferName = `clusterLightGridBuffer${cameraID}`;
              if (ppl.containsResource(clusterLightBufferName)) {
                lightingPass.addStorageBuffer(clusterLightBufferName, AccessType.READ, 'b_ccLightsBuffer');
                lightingPass.addStorageBuffer(clusterLightIndicesBufferName, AccessType.READ, 'b_clusterLightIndicesBuffer');
                lightingPass.addStorageBuffer(clusterLightGridBufferName, AccessType.READ, 'b_clusterLightGridBuffer');
              }
              const lightingClearColor = new Color(0, 0, 0, 0);
              if (camera.clearFlag & ClearFlagBit.COLOR) {
                lightingClearColor.x = camera.clearColor.x;
                lightingClearColor.y = camera.clearColor.y;
                lightingClearColor.z = camera.clearColor.z;
              }
              lightingClearColor.w = 0;
              lightingPass.addRenderTarget(deferredLightingPassRTName, LoadOp.CLEAR, StoreOp.STORE, lightingClearColor);
              lightingPass.addQueue(QueueHint.RENDER_TRANSPARENT).addCameraQuad(camera, lightingInfo.deferredLightingMaterial, 0, SceneFlags.VOLUMETRIC_LIGHTING);
              return {
                rtName: deferredLightingPassRTName
              };
            }
            function setupPostprocessRes(ppl, info) {
              const cameraID = info.id;
              const camera = info.camera;
              const area = getRenderArea(camera, camera.window.width, camera.window.height);
              const width = area.width;
              const height = area.height;
              const postprocessPassRTName = `postprocessPassRTName${cameraID}`;
              const postprocessPassDS = `postprocessPassDS${cameraID}`;
              ppl.addRenderWindow(postprocessPassRTName, Format.BGRA8, width, height, camera.window);
              ppl.addDepthStencil(postprocessPassDS, Format.DEPTH_STENCIL, width, height, ResourceResidency.MANAGED);
            }
            function updatePostprocessRes(ppl, info) {
              const cameraID = info.id;
              const camera = info.camera;
              const area = getRenderArea(camera, camera.window.width, camera.window.height);
              const width = area.width;
              const height = area.height;
              const postprocessPassRTName = `postprocessPassRTName${cameraID}`;
              const postprocessPassDS = `postprocessPassDS${cameraID}`;
              ppl.updateRenderWindow(postprocessPassRTName, camera.window);
              ppl.updateDepthStencil(postprocessPassDS, width, height);
            }
            let postInfo;
            function setupPostprocessPass(ppl, info, inputTex) {
              if (!postInfo) {
                postInfo = new PostInfo();
              }
              const cameraID = info.id;
              const camera = info.camera;
              const area = getRenderArea(camera, camera.window.width, camera.window.height);
              const width = area.width;
              const height = area.height;
              const postprocessPassRTName = `postprocessPassRTName${cameraID}`;
              const postprocessPassDS = `postprocessPassDS${cameraID}`;
              const postprocessPass = ppl.addRenderPass(width, height, 'post-process');
              postprocessPass.name = `CameraPostprocessPass${cameraID}`;
              postprocessPass.setViewport(new Viewport(area.x, area.y, area.width, area.height));
              if (ppl.containsResource(inputTex)) {
                postprocessPass.addTexture(inputTex, 'outputResultMap');
              }
              const postClearColor = new Color(0, 0, 0, camera.clearColor.w);
              if (camera.clearFlag & ClearFlagBit.COLOR) {
                postClearColor.x = camera.clearColor.x;
                postClearColor.y = camera.clearColor.y;
                postClearColor.z = camera.clearColor.z;
              }
              postprocessPass.addRenderTarget(postprocessPassRTName, getLoadOpOfClearFlag(camera.clearFlag, AttachmentType.RENDER_TARGET), StoreOp.STORE, postClearColor);
              postprocessPass.addDepthStencil(postprocessPassDS, getLoadOpOfClearFlag(camera.clearFlag, AttachmentType.DEPTH_STENCIL), StoreOp.STORE, camera.clearDepth, camera.clearStencil, camera.clearFlag);
              postprocessPass.addQueue(QueueHint.NONE).addCameraQuad(camera, postInfo.postMaterial, 0, SceneFlags.NONE);
              if (getProfilerCamera() === camera) {
                postprocessPass.showStatistics = true;
              }
              return {
                rtName: postprocessPassRTName,
                dsName: postprocessPassDS
              };
            }
            function setupUIRes(ppl, info) {
              const camera = info.camera;
              const area = getRenderArea(camera, camera.window.width, camera.window.height);
              const width = area.width;
              const height = area.height;
              const dsUIAndProfilerPassRTName = `dsUIAndProfilerPassColor${info.id}`;
              const dsUIAndProfilerPassDSName = `dsUIAndProfilerPassDS${info.id}`;
              ppl.addRenderWindow(dsUIAndProfilerPassRTName, Format.BGRA8, width, height, camera.window);
              ppl.addDepthStencil(dsUIAndProfilerPassDSName, Format.DEPTH_STENCIL, width, height, ResourceResidency.MANAGED);
            }
            function updateUIRes(ppl, info) {
              const camera = info.camera;
              const area = getRenderArea(camera, camera.window.width, camera.window.height);
              const width = area.width;
              const height = area.height;
              const dsUIAndProfilerPassRTName = `dsUIAndProfilerPassColor${info.id}`;
              const dsUIAndProfilerPassDSName = `dsUIAndProfilerPassDS${info.id}`;
              ppl.updateRenderWindow(dsUIAndProfilerPassRTName, camera.window);
              ppl.updateDepthStencil(dsUIAndProfilerPassDSName, width, height);
            }
            function setupUIPass(ppl, info) {
              const camera = info.camera;
              const area = getRenderArea(camera, camera.window.width, camera.window.height);
              const width = area.width;
              const height = area.height;
              const dsUIAndProfilerPassRTName = `dsUIAndProfilerPassColor${info.id}`;
              const dsUIAndProfilerPassDSName = `dsUIAndProfilerPassDS${info.id}`;
              const uiAndProfilerPass = ppl.addRenderPass(width, height, 'default');
              uiAndProfilerPass.name = `CameraUIAndProfilerPass${info.id}`;
              uiAndProfilerPass.setViewport(new Viewport(area.x, area.y, width, height));
              uiAndProfilerPass.addRenderTarget(dsUIAndProfilerPassRTName, getLoadOpOfClearFlag(camera.clearFlag, AttachmentType.RENDER_TARGET), StoreOp.STORE, new Color(camera.clearColor.x, camera.clearColor.y, camera.clearColor.z, camera.clearColor.w));
              uiAndProfilerPass.addDepthStencil(dsUIAndProfilerPassDSName, getLoadOpOfClearFlag(camera.clearFlag, AttachmentType.DEPTH_STENCIL), StoreOp.STORE, camera.clearDepth, camera.clearStencil, camera.clearFlag);
              const sceneFlags = SceneFlags.UI;
              uiAndProfilerPass.addQueue(QueueHint.RENDER_TRANSPARENT).addSceneOfCamera(camera, new LightInfo(), sceneFlags);
              if (getProfilerCamera() === camera) {
                uiAndProfilerPass.showStatistics = true;
              }
            }

            class ForwardPipelineBuilder {
              setup(cameras, ppl) {
                for (let i = 0; i < cameras.length; i++) {
                  const camera = cameras[i];
                  if (camera.scene === null) {
                    continue;
                  }
                  ppl.update(camera);
                  const info = prepareResource(ppl, camera, this.initResource, this.updateResource);
                  setupForwardPass(ppl, info);
                }
              }
              initResource(ppl, cameraInfo) {
                setupForwardRes(ppl, cameraInfo);
              }
              updateResource(ppl, cameraInfo) {
                updateForwardRes(ppl, cameraInfo);
              }
            } exports('F', ForwardPipelineBuilder);
            class DeferredPipelineBuilder {
              setup(cameras, ppl) {
                for (let i = 0; i < cameras.length; ++i) {
                  const camera = cameras[i];
                  if (!camera.scene) {
                    continue;
                  }
                  ppl.update(camera);
                  const useCluster = ppl.device.hasFeature(Feature.COMPUTE_SHADER);
                  const isGameView = camera.cameraUsage === CameraUsage.GAME || camera.cameraUsage === CameraUsage.GAME_VIEW;
                  const info = prepareResource(ppl, camera, this.initResource, this.updateResource);
                  if (!isGameView) {
                    setupForwardPass(ppl, info);
                    continue;
                  }
                  if (!isUICamera(camera)) {
                    if (useCluster) {
                      buildClusterPasses(camera, ppl);
                    }
                    setupGBufferPass(ppl, info);
                    const lightInfo = setupLightingPass(ppl, info, useCluster);
                    setupDeferredForward(ppl, info, lightInfo.rtName, useCluster);
                    setupPostprocessPass(ppl, info, lightInfo.rtName);
                    continue;
                  }
                  setupUIPass(ppl, info);
                }
              }
              initResource(ppl, cameraInfo) {
                if (!isUICamera(cameraInfo.camera)) {
                  setupGBufferRes(ppl, cameraInfo);
                  setupLightingRes(ppl, cameraInfo);
                  setupPostprocessRes(ppl, cameraInfo);
                } else {
                  setupUIRes(ppl, cameraInfo);
                }
              }
              updateResource(ppl, cameraInfo) {
                if (!isUICamera(cameraInfo.camera)) {
                  updateGBufferRes(ppl, cameraInfo);
                  updateLightingRes(ppl, cameraInfo);
                  updatePostprocessRes(ppl, cameraInfo);
                } else {
                  updateUIRes(ppl, cameraInfo);
                }
              }
            } exports('D', DeferredPipelineBuilder);

        })
    };
}));