import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { addLogo } from './logo';

/**
 * Initialization data for the jupyterlab_add_logo extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab_add_logo:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupyterlab_add_logo is activated');
    addLogo();
  }
};

export default plugin;
