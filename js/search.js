import React from 'react';
import {render} from 'react-dom';
import ContactSearch from './ContactSearch';

export var init = function(el, service) {

    render((
        <ContactSearch service={service}/>
    ), el);

};
