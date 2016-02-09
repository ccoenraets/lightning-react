import React from 'react';

let ContactListItem = React.createClass({
    render: function () {
        return (
            <li className="slds-lookup__item">
                <a href="#" role="option">
                    {this.props.contact.Name}
                </a>
            </li>
        );
    }
});

export default React.createClass({
    render: function () {
        let items = this.props.contacts.map(contact => <ContactListItem key={contact.Id} contact={contact}/>);
        return (
            <ul className="slds-list--vertical" role="presentation">
                {items}
            </ul>
        );
    }
});