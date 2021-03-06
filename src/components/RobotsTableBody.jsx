var $ = require('jquery');
import React from 'react';
import { withRouter } from 'react-router';

import RobotsTableRow from './RobotsTableRow.jsx';

var RobotsTableBody = withRouter (
  React.createClass({
    render: function(){
      return (
        <tbody>
          {
            this.state.robots.map( function(robot){
              return (
                <RobotsTableRow key={robot._id} robot={robot}/>
              );
            })
          }
        </tbody>
      )
    },

    //
    // EVENT LIFECYCLE
    //

    getInitialState: function() {
      console.log("TABLE BODY GET INITIAL STATE");
      return {
        robots: []
      };
    },

    componentWillMount: function(){
      console.log("TABLE BODY WILL MOUNT");
    },

    componentDidMount: function(){
      console.log("TABLE BODY DID MOUNT");
      this.determinePageTitle(this.props.params);
      this.determineRobots(this.props.params);
    },

    componentWillReceiveProps: function(nextProps) {
      console.log("TABLE BODY WILL RECEIVE PROPS");
      this.determinePageTitle(nextProps.params);
      this.determineRobots(nextProps.params);
    },

    componentWillUpdate: function(nextProps, nextState) {
      console.log("TABLE BODY WILL UPDATE");
    },

    //
    // PAGE TITLE FUNCTIONS
    //

    determinePageTitle: function(paramz){
      console.log("DETERMINING PAGE TITLE BASED ON PARAMS", paramz);
      if(paramz.id){
        this.props.setPageTitle("Robot #"+paramz.id);
      } else {
        this.props.setPageTitle("Robots");
      };
    },

    //
    // FLASH FUNCTIONS
    //

    determineRobots: function(paramz){
      console.log("DETERMINING ROBOTS BASED ON PARAMS", paramz, this.state.robots);
      if(paramz.id){
        this.setRobot(paramz.id);
      } else {
        this.setRobots();
      };
    },

    setRobot: function(robotId){
      var requestUrl = '/api/robots/'+robotId;
      console.log("AJAX REQUEST", requestUrl)
      $.ajax({
        url: requestUrl,
        dataType: 'json',
        cache: false,
        success: function(data) {
          console.log("REQUEST SUCCESS", data);
          this.setState({robots: [data]});
        }.bind(this),
        error: function(xhr, status, err) {
          console.log("REQUEST ERROR", xhr, status, err);
          this.props.router.push({
            pathname: '/',
            state: {
              robots: [],
              flash: {danger: ["Couldn't find robot #"+robotId]}
            }
          });
        }.bind(this)
      });
    },

    setRobots: function(){
      var requestUrl = '/api/robots';
      console.log("AJAX REQUEST", requestUrl)
      $.ajax({
        url: requestUrl,
        dataType: 'json',
        cache: false,
        success: function(data) {
          console.log("REQUEST SUCCESS", data);
          this.setState({robots: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.log("REQUEST ERROR", xhr, status, err);
          this.props.router.push({
            pathname: '/',
            state: {
              robots: [],
              flash: {danger: ["Couldn't find any robots"]}
            }
          });
        }.bind(this)
      });
    }
  })
);

module.exports = RobotsTableBody;
