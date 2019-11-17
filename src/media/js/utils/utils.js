export function nextTabAndReturnNewIndex(buttonNodes, index) {
  const nextIndex = this.currentIndex === this.buttonNodes.length - 1 ? 0 : this.currentIndex + 1;
  const buttonNode = this.buttonNodes[nextIndex];
  if (buttonNode) {
    buttonNode.click();
  }
  return nextIndex;
}
