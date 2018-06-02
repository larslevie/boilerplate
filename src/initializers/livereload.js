import config from '../config';

const { watch, livereloadPort } = config;

if (watch) {
  const script = document.createElement('script');
  script.async = true;
  script.src = `/livereload.js?port=${livereloadPort}`;
  document.body.appendChild(script);
}
