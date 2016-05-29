import React from 'react';
import { withRouter } from 'react-router';

var RobotsForm = withRouter (
  React.createClass({

    getInitialState: function() {
      console.log("FORM - INITIAL STATE")
      return {
        bot: {}
      };
    },

    componentWillMount: function(){
      console.log("FORM -- WILL MOUNT")
    },

    componentWillReceiveProps: function(nextProps) {
      console.log("FORM -- RECEIVE PROPS", nextProps)
    },

    componentWillUpdate: function(nextProps, nextState){
      console.log("FORM -- WILL UPDATE", nextProps, nextState)
    },

    setRobot(){
      var name = this.refs.robotNameRef.value;
      var description = this.refs.robotDescriptionRef.value;
      console.log("SET ROBOT:", name, description);
      this.setState({
        bot: {name: name, description: description}
      });
    },

    handleChange: function(event){
      this.setRobot();
    },

    handleSubmit: function(event){
      event.preventDefault(); // prevents the redirect route from receiving params (e.g. http://localhost:3000/#/?_k=10eu8m rather than http://localhost:3000/?description=fun+times#/?_k=kua7fi)
      this.setRobot();
      this.props.router.push('/');
    },

    render: function(){
      return (
        <form className="form-horizontal" onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <div className="form-group">
            <label for="robotName" className="col-sm-2 control-label">Name</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="robotName" ref="robotNameRef" placeholder="My Robot" defaultValue="my bot"/>
            </div>
          </div>

          <div className="form-group">
            <label for="robotDescription" className="col-sm-2 control-label">Description</label>
            <div className="col-sm-10">
              <textarea className="form-control" rows="3" name="robotDescription" ref="robotDescriptionRef" placeholder="All the things..." defaultValue="does stuff"></textarea>
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-success">Submit</button>
            </div>
          </div>
        </form>
      )
    }
  })
);

module.exports = RobotsForm;
