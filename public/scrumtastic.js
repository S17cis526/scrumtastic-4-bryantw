(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* Main entry point */

var scrumtastic = {}

/* Add functionality to the library */
require('./project')(scrumtastic);

scrumtastic.listProjects();

/* Apply menu controls */
$('.navbar-brand').on('click', (event) => {
  event.preventDefault();
  scrumtastic.listProjects();
});

$('#projects-link').on('click', (event) => {
  event.preventDefault();
  scrumtastic.listProjects();
});

},{"./project":2}],2:[function(require,module,exports){
"use strict";

/** @module project
  * Adds functions for displaying projects
  * to the supplied library object
  * @param {object} scrumtastic - the object to expand
  */
module.exports = function(scrumtastic) {


  /** @function listProjects
   * Displays a list of projects available
   * to the user in the content element
   */
  scrumtastic.listProjects = function() {
    $.get('/projects/', (projects) => {

      // Grab and clear the content element
      var content = $('#content').empty();

      // Append a Title
      var title = $('<h1>').text("Projects").appendTo(content);

      // Create projects Table
      var table = $('<table>').addClass('table');
      var head = $('<tr>')
        .append('<th>Name</th>')
        .append('<th>Description</th>')
        .appendTo(table);
      projects.forEach(function(project) {
        var row = $('<tr>').addClass('selectable')
          .append($('<td>').text(project.name))
          .append($('<td>').text(project.description))
          .on('click', function(event){
            event.preventDefault();
            scrumtastic.showProject(project.id);
          }).appendTo(table);
      });
      content.append(table);

      // Create "add project" button
      var button = $('<button>')
        .text("Create New Project")
        .appendTo(content)
        .addClass('btn btn-primary')
        .on("click", function(){
          scrumtastic.newProject();
        });

    });
  }

  /** @function newProject
   * Displays a form to create a new project
   * in the page's content div
   */
  scrumtastic.newProject = function() {
    // Grab and clear the content element
    var content = $('#content').empty();

    // Append a title
    $('<h1>').text('Create New Project').appendTo(content);

    // Display the edit form
    var form = $('<form>').appendTo(content);
    $('<div>').addClass('form-group')
      .appendTo(form)
      .append($('<label>').text('Project Name:'))
      .append($('<input name="name" type="text" class="form-control">'))
    $('<div>').addClass('form-group')
      .append($('<label>').text('Project Description:'))
      .append($('<textarea name="description" class="form-control">'))
      .appendTo(form);
    $('<div>').addClass('form-group')
      .append($('<label>').text('Version'))
      .append($('<input name="version" type="text" class="form-control">'))
      .appendTo(form);
    $('<div>').addClass('form-group')
      .append($('<label>').text('Repository'))
      .append($('<input name="repository" type="url" class="form-control">'))
      .appendTo(form);
    $('<div>').addClass('form-group')
      .append($('<label>').text('License'))
      .append($('<input name="license" type="text" class="form-control">'))
      .appendTo(form);
    $('<button>').text("Create Project")
      .addClass('btn btn-primary')
      .appendTo(form)
      .on('click', function(event){
        event.preventDefault();
        $.post('/projects/', form.serialize(), function(){
          scrumtastic.showProject(id);
        });
      });
  }

  /** @function showProject
   * Displays the specified project in the
   * content div of the page
   * @param {integer} id - the id of the project
   */
  scrumtastic.showProject = function(id) {
    $.get('/projects/' + id, (project) => {

      // Grab and clear the content element
      var content = $('#content').empty();

      // Display the project name
      $('<h1>').text(project.name).appendTo(content);

      // Display the project description
      $('<p>').text(project.description).appendTo(content);

      // Display the edit button
      $('<button>').text('Edit')
        .appendTo(content)
        .addClass('btn btn-primary')
        .on('click', function(){
          scrumtastic.editProject(id);
        });

      // Display the project sprints
    });
  }

  /** @function editProject
   * Displays a form to edit the specified project
   * in the page's content div
   * @param {integer} id - the project to edit
   */
  scrumtastic.editProject = function(id) {
    $.get('/projects/' + id, (project) => {

      // Grab and clear the content element
      var content = $('#content').empty();

      // Append a title
      $('<h1>').text('Edit Project').appendTo(content);

      // Display the edit form
      var form = $('<form>').appendTo(content);
      $('<div>').addClass('form-group')
        .appendTo(form)
        .append($('<label>').text('Project Name:'))
        .append(
          $('<input>')
            .addClass('form-control')
            .attr('name', 'name')
            .attr('type', 'text')
            .val(project.name)
        );
      $('<div>').addClass('form-group')
        .append($('<label>').text('Project Description:'))
        .append(
          $('<textarea>')
            .addClass('form-control')
            .attr('name', 'description')
            .val(project.description)
          )
        .appendTo(form);
      $('<button>').text("Update Project")
        .addClass('btn btn-primary')
        .appendTo(form)
        .on('click', function(event){
          event.preventDefault();
          $.post('/projects/' + id, form.serialize(), function(){
            scrumtastic.showProject(id);
          });
        });
    });
  }

}

},{}]},{},[1]);
