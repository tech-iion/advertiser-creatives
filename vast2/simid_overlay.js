class SimidOverlay extends BaseSimidCreative {
  constructor() {
    super();
    this.adContainer = document.getElementById('ad_container');
    this.showPlayableAd(); // Automatically launch playable
  }

  showPlayableAd() {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://tech-iion.github.io/advertiser-creatives/allkindsLandscape/';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';

    this.adContainer.appendChild(iframe);
  }
}
