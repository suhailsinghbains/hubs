import { paths } from "../systems/actions/paths";

const degToRad = THREE.Math.degToRad;
AFRAME.registerComponent("pitch-yaw-rotator", {
  schema: {
    minPitch: { default: -50 },
    maxPitch: { default: 50 }
  },

  init() {
    this.pitch = 0;
    this.yaw = 0;
  },

  look(deltaPitch, deltaYaw) {
    const { minPitch, maxPitch } = this.data;
    this.pitch += deltaPitch;
    this.pitch = Math.max(minPitch, Math.min(maxPitch, this.pitch));
    this.yaw += deltaYaw;
  },

  tick() {
    const actions = AFRAME.scenes[0].systems.actions;
    const cameraDelta = actions.poll(paths.actions.cameraDelta);
    if (cameraDelta) {
      this.look(cameraDelta[1], cameraDelta[0]);
    }

    this.el.object3D.rotation.set(degToRad(this.pitch), degToRad(this.yaw), 0);
    this.el.object3D.rotation.order = "YXZ";
  }
});
