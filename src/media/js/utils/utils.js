export function nextTabAndReturnNewIndex(buttonNodes, index) {
  const nextIndex = index === buttonNodes.length - 1 ? 0 : index + 1;
  const buttonNode = buttonNodes[nextIndex];
  if (buttonNode) {
    buttonNode.click();
  }
  return nextIndex;
}
