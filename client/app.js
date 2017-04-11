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
