const sleepUntil = async (f: any, timeoutMs: number): Promise<void> => {
  const getCurrentTime = () => new Date().getTime();
  return new Promise((resolve, reject) => {
    const timeWas = getCurrentTime();
    const wait = setInterval(() => {
      if (f()) {
        console.log('resolved after', getCurrentTime() - timeWas, 'ms');
        clearInterval(wait);
        resolve();
      } else if (getCurrentTime() - timeWas > timeoutMs) {
        // Timeout
        console.log('rejected after', getCurrentTime() - timeWas, 'ms');
        clearInterval(wait);
        reject();
      }
    }, 20);
  });
};

const buildLogoWrapperElt = (): HTMLElement => {
  const logoWrapper = document.createElement('div');
  logoWrapper.setAttribute('id', 'logo-wrapper');

  const logoDiv = document.createElement('div');
  logoDiv.setAttribute('id', 'logo-custom');

  logoWrapper.appendChild(logoDiv);

  return logoWrapper;
};

const addLogo = async (): Promise<void> => {
  console.log('start addLogo');

  try {
    await sleepUntil(() => document.querySelector('#jp-top-panel'), 5000);

    const wrapper = buildLogoWrapperElt();
    document.querySelector('#jp-top-panel')?.appendChild(wrapper);

    console.log('added logo to DOM');
  } catch {
    console.log('could not add logo to DOM');
  }

  return Promise.resolve(undefined);
};

export { addLogo };
