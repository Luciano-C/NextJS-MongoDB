import React from 'react';
import { Button, Card, Container, Grid } from "semantic-ui-react";

const HomePage = ({ tasks }) => {
  
  if (tasks.length === 0) return (
    <Grid centered verticalAlign='middle' columns="1" style={{height: "80vh"}}>
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <h1>There are no tasks yet</h1>
          <img src='https://cdn.iconscout.com/icon/free/png-256/data-not-found-1965034-1662569.png' alt='No tasks yet'/>
          <div>
            <Button primary>Create a Task</Button>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
  
  return (
    // Renders a list of tasks
    <Container>
      <Card.Group itemsPerRow={4}>
        {
          tasks.map(task => {
            return (
            <Card key={task._id}>
              <Card.Content>
                <Card.Header>{task.title}</Card.Header>
                <p>{task.description}</p>
              </Card.Content>
              <Card.Content extra>
                <Button primary>View</Button>
                <Button primary>Edit</Button>
              </Card.Content>
            </Card>
          )})
        }
      </Card.Group>
    </Container>
  )
}

export default HomePage

export const getServerSideProps = async (ctx) => {

  const res = await fetch("http://localhost:3000/api/tasks");
  const tasks = await res.json();


  return {
    props: {
      // En JavaScript es lo mismo que tasks:tasks
      tasks
    }
  }
}
