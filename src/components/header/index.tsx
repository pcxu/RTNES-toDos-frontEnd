import * as React from 'react';
import units from '../../units/units';
import './style.less'

class header extends React.Component {
    render() {

        return (
            <div className='header-index' >
                ToDo 【{units.nowDate()}】
            </div>
        );
    }
  }

export default header;