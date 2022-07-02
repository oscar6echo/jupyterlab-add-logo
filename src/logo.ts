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

const buildSvgWrapperElt = (): HTMLElement => {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('id', 'custom-wrapper');
  wrapper.setAttribute(
    'style',
    'width: 100%; margin: 2px; display: flex; justify-content: end'
  );
  return wrapper;
};

const addLogo = async (): Promise<void> => {
  console.log('start addLogo');

  try {
    await sleepUntil(() => document.querySelector('#jp-top-panel'), 5000);

    const wrapper = buildSvgWrapperElt();
    document.querySelector('#jp-top-panel')?.appendChild(wrapper);

    console.log('added logo to DOM');
  } catch {
    console.log('could not add logo to DOM');
  }

  return Promise.resolve(undefined);
};

export { addLogo };
