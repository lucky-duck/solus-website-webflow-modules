function renderCustomClasses(customClasses) {
  return customClasses ? customClasses.join(' ') : '';
}

export function createVideoFrameMarkup({ customClasses } = {}) {
  return `
    <div class="video-frame ${renderCustomClasses(customClasses)}">
      <div class="video-frame__video-container" data-video-frame-videos></div>
      <div class="video-frame__frame"></div>
    </div>
  `;
}

function createVideoUrl(index) {
  return `https://solus-webflow-modules.netlify.com/media/video/${index}.mp4`;
}

export function createVideoNode(
  index,
  { customClasses, loop, autoplay } = { autoplay: true, loop: true }
) {
  const videoNode = document.createElement('video');
  const attrs = {
    class: `video-frame__video ${renderCustomClasses(customClasses)}`,
    preload: 'auto',
    playsinline: true,
    muted: true,
    src: createVideoUrl(index),
  };
  if (loop) {
    attrs.loop = true;
  }
  if (autoplay) {
    attrs.autoplay = true;
  }
  Object.keys(attrs).forEach(key => {
    videoNode.setAttribute(key, attrs[key]);
  });
  return videoNode;
}
