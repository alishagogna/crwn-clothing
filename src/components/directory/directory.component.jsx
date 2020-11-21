import React from 'react';
import MenuItem from '../menu-item/menu-item.component';
import { selectDirectorySections } from '../../redux/directory/directory.selectors';
import { createStructuredSelector, createSelectorCreator } from 'reselect';
import { connect } from 'react-redux';
import './directory.styles.scss';
const Directory = ({sections}) => (
    <div className='directory-menu'>
        {
            sections.map(({ title, imageUrl, id, size }) => (
                <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} />
            ))
        }
    </div>
)
const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections
})
export default connect(mapStateToProps)(Directory);