import * as React from 'react';

import './style.less';
import * as classnames from 'classnames';

import Header from '../../components/header';
import Screen from '../../components/screen';
import Drawer from '../../components/drawer';
import Table from '../../components/table';

interface State {
}

export default class Tode extends React.Component {
    static displayName = 'Tode'

    static defaultProps = {
    }

    public state: State = {
    }

    render() {
  
      return (
        <div className={classnames(`${['todo-index']}`)} >
            <Header />
            <Screen />
            <Drawer />
            <Table />
        </div>
      );
    }
}
