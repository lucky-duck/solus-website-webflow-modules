import { BREAKPOINT_MD } from './constants';

export function nextTabIndex(buttonNodes, index) {
  return index === buttonNodes.length - 1 ? 0 : index + 1;
}

export function nextTabAndReturnNewIndex(buttonNodes, index) {
  const nextIndex = nextTabIndex(buttonNodes, index);
  const buttonNode = buttonNodes[nextIndex];
  if (buttonNode) {
    buttonNode.click();
  }
  return nextIndex;
}

export function isTabletOrMobile() {
  return window.innerWidth <= BREAKPOINT_MD;
}
