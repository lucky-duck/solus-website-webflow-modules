export function createVideoFrameMarkup({ whiteFrame } = { whiteFrame: false }) {
  return `
    <div class="video-frame ${whiteFrame ? '_white' : ''}">
      <div class="video-frame__video-container" data-video-frame-videos></div>
      <div class="video-frame__frame"></div>
    </div>
  `;
}

function createVideoUrl(index) {
  return `https://solus-webflow-modules.netlify.com/media/video/${index}.mp4`;
}

export function createVideoNode(index, { hidden } = { hidden: false }) {
  const videoNode = document.createElement('video');
  const attrs = {
    className: `video-frame__video ${hidden ? '_hidden' : ''}`,
    autoplay: true,
    loop: true,
    preload: 'auto',
    playsinline: true,
    muted: true,
    src: createVideoUrl(index),
  };
  Object.keys(attrs).forEach(key => (videoNode[key] = attrs[key]));
  return videoNode;
}
