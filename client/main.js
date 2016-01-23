/*
Template.TEMPNAME.helpers({
    methodName: function () {
      // do
    }
});

Template.TEMPNAME.events({
    'click thing': function () {
      // do thing when 'click thing' happens
    }
});
*/

/**
 * Iron:Router Configuration
 */
Router.configure({
    layoutTemplate: 'ApplicationLayout',
    
    waitOn: function(){
        // TODO: Subscribe
        return;
    }
});

/**
 * Iron:Router 
 *   ---Landing Page
 */
Router.route("/", function(){
    this.render("navbar", {to: "header"});
    this.render("landingPage", {to: "main"});
});

/**
 * Iron:Router
 *   ---Task Page
 */
Router.route("/task/:_id", {
    waitOn: function(){
        // TODO: Subscribe
        return;
    },
    
    action: function(){
        // TODO: Grab task by user and ID
        
        this.render("navbar", {to: "header"});
        this.render("taskPage", {to: "main"});
    }
});
/**
 * End of Iron:Router
 */

