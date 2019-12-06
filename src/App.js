import React, { Component } from 'react';
//Above you have brought in, or imported, two things:
//1) The default functionality (export) from the React package and assigned that functionality to the name React
//2) The component class from the React package 
//This is similar to using a using statement in a C# controller 
import { TodoBanner } from "./TodoBanner";
import { TodoRow } from "./TodoRow";
import { TodoCreator } from "./TodoCreator";
import { VisibilityControl } from "./VisibilityControl";

export default class App extends Component {
  //Above we have created a class called App that extends the functionality 
  //of the Component class inside of the React package.
  //The export keyword makes the class available for use outside of the JS file where it is created.

  //We are going to create state data for our component.
  //To do that, we need to create a constructor method.
  //This method will get called when an object is created using this class.
  //Or, this method will be called when the component is initialized.
  constructor(props) {
    super(props);
    //React components have a special property called state which is what
    //we will use to define state data.
    //Calling on super(props) sets our component up from the component class in the React library
    //to be stateful (hold its own data)
    this.state = {
      userName: "Zoe",
      todoItems: [
        {
          action: "Buy Flowers",
          done: false
        },
        {
          action: "Get Shoes",
          done: false
        },
        {
          action: "Collect tickets",
          done: true
        },
        {
          action: "Call Joe",
          done: false
        }
      ],
      showCompleted: true
    }
  }

  //We now need a way to change the state data for our component. 
  //We will create a method that can be called on a button click to change the value 
  //of the userName prop of that state data.
  //We will use fat arrow syntax - this allows functions to be expressed concisely.
  //In the background, what is really being done is an anonymous function (aka function without a name)
  //is being created.
  //The functionality to toggle userName was removed from our final app.
  //THE FUNCTION BELOW IS NOT BEING USED.
  changeStateData = () => {
    this.setState({
      userName: this.state.userName === "Zoe" ? "Bob" : "Zoe"
      //The above is a Ternary Operator that says if the state of userName equals Zoe then it is changed
      //to Bob. If it does not equal Zoe, then it is changed back to Zoe.
    })
  }

  updateNewTextValue = (event) => {
    this.setState({ newItemText: event.target.value });
    //We use the setState() here because state data should NOT be updated directly.
    //When setState is called, the components state data is updated with new values 
    //and then the render() is called (invoked) so that the UI will be updated.
  }

  createNewTodo = (task) => {
    if (!this.state.todoItems.find(x => x.action === task)) {
      //The above searches the existing todoItems for an action that matches the text that 
      //the user typed into the input and was captured in the newItemText state property.
      //This allows us to prevent duplicate entries.
      this.setState({
        todoItems: [
          ...this.state.todoItems,
          {
            action: task,
            done: false
          }
        ]
      },
        () => localStorage.setItem("todos", JSON.stringify(this.state))
      );

      //The above uses the SPREAD OPERATOR, it says add what was already in the array and then 
      //add in one more additional object that has new information.
    }
  }

  //We have been focusing on imbedding JavaScript expressions in fragments of HTML.
  //However, since JSX allows us to freely mix HTML-like syntax and JavaScript, we can 
  //create methods that return HTML content.

  //The map() below allows us to generate a sequence of HTML for each todoItem in our state object.
  //The key attribute on the <tr> allows React to keep track of which items are updated to avoid
  //unnecessary rerendering which causes performance pits.
  todoTableRows = (doneValue) => this.state.todoItems
    .filter(item => item.done === doneValue)
    .map(item =>
      <TodoRow key={item.action} item={item} callback={this.toggleTodo} />
    );

  toggleTodo = (todo) => this.setState(
    {
      todoItems: this.state.todoItems.map(
        item => item.action === todo.action ? { ...item, done: !item.done } : item
      )
    }, 
    () => localStorage.setItem("todos", JSON.stringify(this.state))
  );

  //This is a lifecycle event for a component that is triggered when the component is mounted to the DOM.
  componentDidMount = () => {
    let data = localStorage.getItem("todos");
    this.setState(data != null ? JSON.parse(data) :
      {
        userName: "Zoe", todoItems: [
          {
            action: "Buy Flowers",
            done: false
          },
          {
            action: "Get Shoes",
            done: false
          },
          {
            action: "Collect tickets",
            done: true
          },
          {
            action: "Call Joe",
            done: false
          }
        ],
        showCompleted: true
      }
    )
  }

  //When you use the fat arrow syntax, you do not have to use the return keyword
  //or put curly braces around the body of the function.
  render = () =>
    <div>
      <TodoBanner name={this.state.userName} tasks={this.state.todoItems} />
      <div className="container-fluid">
        <TodoCreator callback={this.createNewTodo} />
      </div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Description</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          {this.todoTableRows(false)}
        </tbody>
      </table>
      <div className="bg-secondary text-white text-center p-2">
        <VisibilityControl description="Completed Tasks" isChecked={this.state.showCompleted}
          callback={(checked) => this.setState({ showCompleted: checked })} />
      </div>
      {
        this.state.showCompleted &&
        <table className="table table-striped table-bordered">
          <thead>
            <tr><th>Description</th><th>Done</th></tr>
          </thead>
          <tbody>{this.todoTableRows(true)}</tbody>
        </table>
      }
    </div>

}
