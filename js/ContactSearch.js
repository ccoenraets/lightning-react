import React from 'react';
import SearchBar from './SearchBar';
import ContactList from './ContactList';

export default React.createClass({

    getInitialState: function() {
        return {contacts: []};
    },

    componentDidMount() {
        this.props.service.findAll(data => this.setState({contacts: data}));
    },

    searchKeyChange: function(searchKey) {
        this.props.service.findByName(searchKey, data => this.setState({contacts: data}));
    },

    render: function () {
        return (
            <div>
                <SearchBar onChange={this.searchKeyChange}/>
                <ContactList contacts={this.state.contacts}/>
            </div>
        );
    }

});