class SimidOverlay extends BaseSimidCreative {
  constructor() {
    super();
    this.tryMeButton = document.getElementById('try_me_button');
    this.adContainer = document.getElementById('ad_container');

    this.tryMeButton.addEventListener('click', this.showPlayableAd.bind(this));
  }

  showPlayableAd() {
    this.tryMeButton.style.display = 'none';

    const iframe = document.createElement('iframe');
    iframe.src = 'https://tech-iion.github.io/advertiser-creatives/allKinds/';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';

    this.adContainer.appendChild(iframe);
  }
}
