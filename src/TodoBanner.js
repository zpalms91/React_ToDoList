import React, { Component } from 'react';

export class TodoBanner extends Component {
    render = () =>
    <h4 className="bg-primary text-white text-center p-2">
        {/*
          The curly braces below will denote an expression. When the render method is called,
          the expression will be evaluated, and its results are included in the content presented
          to the user. This is very similar to how Razor works in .cshtml files.
        */}
        { this.props.name }'s
        To Do List Application
        ({ this.props.tasks.filter(t => !t.done).length } items To-Do)
    </h4>
}