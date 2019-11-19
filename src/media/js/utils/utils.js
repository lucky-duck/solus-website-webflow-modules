import { BREAKPOINT_MD } from './constants';

export function nextTabAndReturnNewIndex(buttonNodes, index) {
  const nextIndex = index === buttonNodes.length - 1 ? 0 : index + 1;
  const buttonNode = buttonNodes[nextIndex];
  if (buttonNode) {
    buttonNode.click();
  }
  return nextIndex;
}

export function isTabletOrMobile() {
  return window.innerWidth <= BREAKPOINT_MD;
}
