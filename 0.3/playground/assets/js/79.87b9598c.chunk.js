(window.webpackJsonp=window.webpackJsonp||[]).push([[79],{508:function(e,n,r){"use strict";r.r(n),n.default='import { OrbitControl } from "@oasis-engine/controls";\r\nimport {\r\n  BlinnPhongMaterial,\r\n  Camera,\r\n  Color,\r\n  MeshRenderer,\r\n  PrimitiveMesh,\r\n  Script,\r\n  SpotLight,\r\n  SystemInfo,\r\n  Vector3,\r\n  WebGLEngine\r\n} from "oasis-engine";\r\nconst target = new Vector3(0, -3, 0);\r\nconst up = new Vector3(0, 1, 0);\r\n\r\nclass Move extends Script {\r\n  time = 0;\r\n  y = 3;\r\n  range = 5;\r\n\r\n  constructor(node) {\r\n    super(node);\r\n  }\r\n\r\n  onUpdate(deltaTime) {\r\n    this.time += deltaTime / 1000;\r\n    let x = Math.cos(this.time) * this.range;\r\n    let y = Math.sin(this.time) * this.range * 0.2 + this.y;\r\n    let z = Math.cos(this.time) * this.range;\r\n    this.entity.transform.position = new Vector3(x, y, z);\r\n  }\r\n}\r\n\r\n// \u63a7\u5236 light entity \u59cb\u7ec8\u770b\u5411\u56fa\u5b9a\u70b9\r\nclass LookAtFocus extends Script {\r\n  onUpdate(deltaTime) {\r\n    light1.transform.lookAt(target, up);\r\n  }\r\n}\r\n\r\n//-- create engine object\r\nconst engine = new WebGLEngine("o3-demo");\r\nengine.canvas.width = window.innerWidth * SystemInfo.devicePixelRatio;\r\nengine.canvas.height = window.innerHeight * SystemInfo.devicePixelRatio;\r\nconst scene = engine.sceneManager.activeScene;\r\nconst rootEntity = scene.createRootEntity();\r\n\r\n// Logger.enable();\r\nfunction createCuboidGeometry(name, position, rotation, w, h, d, castShadow: boolean = false) {\r\n  let obj = rootEntity.createChild(name);\r\n  obj.position = new Vector3(...position);\r\n  obj.transform.rotation = new Vector3(rotation[0], rotation[0], rotation[0]);\r\n  let cubeRenderer = obj.addComponent(MeshRenderer);\r\n  cubeRenderer.mesh = PrimitiveMesh.createCuboid(rootEntity.engine, w, h, d);\r\n  cubeRenderer.setMaterial(mtl);\r\n  cubeRenderer["recieveShadow"] = !castShadow;\r\n  cubeRenderer["castShadow"] = castShadow;\r\n}\r\n\r\nlet mtl = new BlinnPhongMaterial(engine);\r\nmtl.baseColor = new Color(0.1, 0.9, 0.8, 1);\r\n//-- create light entity\r\nlet lighthouse = rootEntity.createChild("lighthouse");\r\nlet light1 = lighthouse.createChild("light1");\r\nlight1.addComponent(Move);\r\nlight1.addComponent(LookAtFocus);\r\n\r\nlet spotLight = light1.addComponent(SpotLight);\r\nspotLight.angle = Math.PI / 12;\r\nspotLight.penumbra = 2;\r\nspotLight["enableShadow"] = true;\r\nspotLight["shadow"].bias = 0.0001;\r\nspotLight["shadow"].intensity = 0.2;\r\n\r\nlet sphereRenderer3 = light1.addComponent(MeshRenderer);\r\nsphereRenderer3.mesh = PrimitiveMesh.createSphere(engine, 0.1);\r\nsphereRenderer3.setMaterial(mtl);\r\n\r\n//-- create geometry\r\ncreateCuboidGeometry("cubiod1", [0, -3, 0], [0, 0, 0], 10, 0.1, 10);\r\ncreateCuboidGeometry("cubiod2", [5, -2, 0], [0, 0, 0], 0.1, 2, 10);\r\ncreateCuboidGeometry("cubiod3", [-5, -2, 0], [0, 0, 0], 0.1, 2, 10);\r\ncreateCuboidGeometry("cubiod4", [0, -2, -5], [0, 0, 0], 10, 2, 0.1);\r\ncreateCuboidGeometry("cubiod-cast-shadow", [0, -1, 0], [0, 0, 0], 1, 1, 1, true);\r\n\r\n//-- create camera\r\nlet cameraNode = rootEntity.createChild("camera_node");\r\ncameraNode.transform.position = new Vector3(0, 5, 17);\r\ncameraNode.transform.lookAt(new Vector3(), new Vector3(0, 1, 0));\r\ncameraNode.addComponent(Camera);\r\ncameraNode.addComponent(OrbitControl);\r\n\r\n//-- run\r\nengine.run();\r\n'}}]);