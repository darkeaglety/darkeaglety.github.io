export function createInputState() {
  return {
    left: false,
    right: false,
    down: false,
    jumpPressed: false,
    shootPressed: false,
    downPressed: false,
  };
}

export function clearEdges(state) {
  state.jumpPressed = false;
  state.shootPressed = false;
  state.downPressed = false;
}
