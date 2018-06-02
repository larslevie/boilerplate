import config from '../config';

const { livereloadPort, url, watch } = config;

if (watch) {
  const script = document.createElement('script');
  script.async = true;
  script.src = `${url}:${livereloadPort}/livereload.js`;
  document.body.appendChild(script);
}
