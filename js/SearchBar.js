import React from 'react';

export default React.createClass({

    getInitialState: function() {
        return {searchKey: ""};
    },

    searchHandler: function(event) {
        var searchKey = event.target.value;
        this.setState({searchKey: searchKey});
        this.props.onChange(searchKey);
    },

    render: function () {
        return (
            <div className="slds-form-element">
                <div className="slds-form-element__control">
                    <input className="slds-input" type="text" placeholder="Enter contact name..."
                        value={this.state.searchKey} onChange={this.searchHandler}/>
                </div>
            </div>
        );
    }

});