export function createInputState() {
  return {
    left: false,
    right: false,
    down: false,
    jumpPressed: false,
    shootPressed: false,
    downPressed: false,
    stealDir: 0,
    stealToBall: false,
  };
}

export function clearEdges(state) {
  state.jumpPressed = false;
  state.shootPressed = false;
  state.downPressed = false;
  state.stealDir = 0;
  state.stealToBall = false;
}
