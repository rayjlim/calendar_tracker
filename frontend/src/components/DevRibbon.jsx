import React from 'react';
import { ENVIRONMENT } from '../constants';

const showDevRibbon = ENVIRONMENT === 'development';

const DevRibbon = () => (
  <span>
    {showDevRibbon && <a className="github-fork-ribbon" href="#dev" data-ribbon="Development" title="Development">Development</a>}
  </span>
);
export default DevRibbon;
