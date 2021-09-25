/* eslint-disable max-classes-per-file */
/* eslint-disable react/prop-types */
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';

function Theme() {
  useEffect(() => {
    const navbar = document.getElementById('navbar');
    const colorDiv = document.getElementById('color-div');
    if (navbar && colorDiv) {
      colorDiv.style.marginTop = `${navbar.offsetHeight + 50}px`;
    }
  });

  const setTheme = (theme1, theme2, theme3, theme4) => {
    document.body.style.setProperty('--color1', `var(--${theme1})`);
    document.body.style.setProperty('--color2', `var(--${theme2})`);
    document.body.style.setProperty('--color3', `var(--${theme3})`);
    document.body.style.setProperty('--color4', `var(--${theme4})`);
    localStorage.setItem('theme1', theme1);
    localStorage.setItem('theme2', theme2);
    localStorage.setItem('theme3', theme3);
    localStorage.setItem('theme4', theme4);
  };

  return (
    <div
      className="rounded-2 ml-0 text-white mb-4"
      id="color-div"
    >
      <h6>Select Theme Color</h6>
      <div className="d-flex">
        <FontAwesomeIcon
          className="mr-2 font-25 text-warning"
          id="warning-theme"
          icon={faCircle}
          onClick={() => {
            document.getElementById('warning-theme').classList.remove('text-warning');
            document.getElementById('warning-theme').classList.add('glow');
            document.getElementById('setting-color-display').style.display = 'flex';
            setTimeout(() => {
              document.getElementById('warning-theme').classList.add('text-warning');
              document.getElementById('warning-theme').classList.remove('glow');
              setTheme('warning', 'dark', 'light', 'light');
              const color1 = getComputedStyle(document.body).getPropertyValue('--color1');
              Array.from(document.head.getElementsByTagName('meta')).find((tag) => tag.name === 'theme-color').content = color1;
              document.getElementById('setting-color-display').style.display = 'none';
            }, 1000);
          }}
        />
        <FontAwesomeIcon
          className="mr-2 font-25 text-primary"
          id="primary-theme"
          icon={faCircle}
          onClick={() => {
            document.getElementById('primary-theme').classList.remove('text-primary');
            document.getElementById('primary-theme').classList.add('glow');
            document.getElementById('setting-color-display').style.display = 'flex';
            setTimeout(() => {
              document.getElementById('primary-theme').classList.add('text-primary');
              document.getElementById('primary-theme').classList.remove('glow');
              setTheme('primary', 'dark', 'light', 'light');
              const color1 = getComputedStyle(document.body).getPropertyValue('--color1');
              Array.from(document.head.getElementsByTagName('meta')).find((tag) => tag.name === 'theme-color').content = color1;
              document.getElementById('setting-color-display').style.display = 'none';
            }, 1000);
          }}
        />
        <FontAwesomeIcon
          className="mr-2 font-25 text-danger"
          id="danger-theme"
          icon={faCircle}
          onClick={() => {
            document.getElementById('danger-theme').classList.remove('text-danger');
            document.getElementById('danger-theme').classList.add('glow');
            document.getElementById('setting-color-display').style.display = 'flex';
            setTimeout(() => {
              document.getElementById('danger-theme').classList.add('text-danger');
              document.getElementById('danger-theme').classList.remove('glow');
              setTheme('danger', 'dark', 'light', 'light');
              const color1 = getComputedStyle(document.body).getPropertyValue('--color1');
              Array.from(document.head.getElementsByTagName('meta')).find((tag) => tag.name === 'theme-color').content = color1;
              document.getElementById('setting-color-display').style.display = 'none';
            }, 1000);
          }}
        />
        <FontAwesomeIcon
          className="mr-2 font-25 text-success"
          id="success-theme"
          icon={faCircle}
          onClick={() => {
            document.getElementById('success-theme').classList.remove('text-success');
            document.getElementById('success-theme').classList.add('glow');
            document.getElementById('setting-color-display').style.display = 'flex';
            setTimeout(() => {
              document.getElementById('success-theme').classList.add('text-success');
              document.getElementById('success-theme').classList.remove('glow');
              setTheme('success', 'dark', 'light', 'light');
              const color1 = getComputedStyle(document.body).getPropertyValue('--color1');
              Array.from(document.head.getElementsByTagName('meta')).find((tag) => tag.name === 'theme-color').content = color1;
              document.getElementById('setting-color-display').style.display = 'none';
            }, 1000);
          }}
        />
        <FontAwesomeIcon
          className="mr-2 font-25 text-pink"
          id="pink-theme"
          icon={faCircle}
          onClick={() => {
            document.getElementById('pink-theme').classList.remove('text-pink');
            document.getElementById('pink-theme').classList.add('glow');
            document.getElementById('setting-color-display').style.display = 'flex';
            setTimeout(() => {
              document.getElementById('pink-theme').classList.add('text-pink');
              document.getElementById('pink-theme').classList.remove('glow');
              setTheme('pink', 'dark', 'light', 'light');
              const color1 = getComputedStyle(document.body).getPropertyValue('--color1');
              Array.from(document.head.getElementsByTagName('meta')).find((tag) => tag.name === 'theme-color').content = color1;
              document.getElementById('setting-color-display').style.display = 'none';
            }, 1000);
          }}
        />
        <FontAwesomeIcon
          className="mr-2 font-25 text-secondary"
          id="secondary-theme"
          icon={faCircle}
          onClick={() => {
            document.getElementById('secondary-theme').classList.remove('text-secondary');
            document.getElementById('secondary-theme').classList.add('glow');
            document.getElementById('setting-color-display').style.display = 'flex';
            setTimeout(() => {
              document.getElementById('secondary-theme').classList.add('text-secondary');
              document.getElementById('secondary-theme').classList.remove('glow');
              setTheme('secondary', 'dark', 'light', 'light');
              const color1 = getComputedStyle(document.body).getPropertyValue('--color1');
              Array.from(document.head.getElementsByTagName('meta')).find((tag) => tag.name === 'theme-color').content = color1;
              document.getElementById('setting-color-display').style.display = 'none';
            }, 1000);
          }}
        />
      </div>
    </div>
  );
}

export default Theme;
