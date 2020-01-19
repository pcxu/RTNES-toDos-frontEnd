import * as React from 'react';
import * as Loadable from 'react-loadable';
import { BrowserRouter as Router, Route, Switch } from 'dva/router';

import { ConfigProvider  } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import '../style/style.less';
import loading from '../components/loading';

const RouterList: any[] = [
    {
        component: () => import('../containers/todo'),
        path: '/'
    },
    {
        component: () => import('../containers/todo'),
        path: '*'
    },
]

const RouterMap = () => (
  <ConfigProvider  locale={zhCN}>
  <Router>
      <Switch>
        {RouterList.map(item => (
          <Route
            key={item.path}
            exact={true}
            path={item.path}
            component={Loadable({
              loader: item.component,
              loading
            })}
          />
        ))}
      </Switch>
  </Router>
  </ConfigProvider>
)

export default RouterMap
