const loadModule = async (url) => new Promise((resolve, reject) => {
  const script = document.createElement('script');
  script.src = url;
  script.onload = resolve;
  script.onerror = reject;
  const firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(script, firstScript);
});

// const env = process.env.NODE_ENV

const modules = {
  'submodule-page1': `http://127.0.0.1:3000/module-page1.js?timestamp=${Date.now()}`,
  'submodule-page2': `http://127.0.0.1:3002/module-page2.js?timestamp=${Date.now()}`,
  // page1: import('./views/page1/entry.js'),
  // page2: import('./views/page2/entry.js'),
};

export default function loadModules() {
  const missions = [];
  Object.keys(modules).forEach((module) => {
    missions.push(
      new Promise((resolve) => {
        const name = module.replace('submodule-', '');
        if (typeof modules[module] === 'string') {
          loadModule(modules[module]).then(() => {
            resolve({
              name,
              ...window[module],
            });
          }).catch(() => {
            resolve({});
          });
        } else {
          modules[module].then((res) => {
            resolve({
              name,
              router: res.router,
              store: res.store,
            });
          });
        }
      }),
    );
  });
  return Promise.all(missions);
}
