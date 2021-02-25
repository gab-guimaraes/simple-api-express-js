//yarn init
//yarn add express
//YARN ADD NODEMON -D
//execute nodemon: yarn nodemon src/index.js

/**
 * Tipos de parametros
 * query params: Filtros e paginação
 * route params: 
 * request params:
 */

//const { request } = require('express');

//middlewere: interceptador de requisicoes

const express = require('express');
const { uuid } = require('uuidv4')
const app = express();
app.use(express.json())

const projects = [];

function logRequests(request, response, next) {
    const { method, url} = request;
    const logLabel = `[${method.toUpperCase()}] ${url}`;
    console.log(logLabel);
    next();
}

app.use(logRequests)


app.get('/projects', (require, response) => {
    var name = require.query.name
    var age = require.query.age
    
    console.log("Name :", name) 
    console.log("Age :", age) 
 
    return response.json(projects);
})

//insert a new project
app.post('/projects', (request, response) => {

    const { title, owner} = request.body;

    const project = {id: uuid(), title, owner};
    
    projects.push(project);

    return response.json(project)

})

app.put('/projects/:id', (request, response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id == id);

    if (projectIndex < 0) {
        return response.status(204).json({error: 'project not found'})
    } 

    const project = {
        id, title, owner
    }
    
    projects[projectIndex] = project

    return response.json(project);

})

app.listen(3333, () => {
    console.log('🚀 back-end started')
});

