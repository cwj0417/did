import {menu, tabs} from '../libs/bg';
import {appInfo} from '../libs/cm';

const displayOnNewTab = function () {
  let id = appInfo.id;
  tabs.create({
    url: `chrome-extension://${id}/popup.html`
  })
}
menu.create({
  type: 'normal',
  title: '显示did',
  contexts: ['browser_action'],
  onclick: displayOnNewTab
})