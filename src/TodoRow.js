import React, { Component } from 'react';

export class TodoRow extends Component{
    //Below, we define the value for the onChange event prop as a callback().
    //This is how child components are able to communicate with parents.
    //They cannot update the value of the props passed to them from a parent component
    //because React only supports One-Way Data Flow (from parent to child).
    //However, the parent can provide a function prop that children can call 
    //when something important happens.

    //There are two different types of props:
    //1) Data props allows parents to pass data to children.
    //2) Function props allow a child to communicate with the parent.
    render = () =>
    <tr>
        <td>{ this.props.item.action }</td>
        <td>
            <input type="checkbox" checked={ this.props.item.done } 
                onChange={ () => this.props.callback(this.props.item)}/>
        </td>
    </tr>
}