import React, { useState } from 'react'
// Next provee de páginas de error
import Error from "next/error"
import { Button, Grid, Confirm, Loader } from 'semantic-ui-react'

import { useRouter } from 'next/router'

const TaskDetail = ({ task, error }) => {

  const [confirm, setconfirm] = useState(false);
  // Sólo nos interesa el query para obtener la id (esto es para obtener desde el fron end el id, otra alternative es getServerSideProps para backend)
  const { query, push } = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);


  // Para el modal
  const open = () => {
    setconfirm(true);
  };
  const close = () => {
    setconfirm(false);
  };

  const deleteTask = async () => {
    const { id } = query;
    try {
      await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE"
      })
    } catch (error) {
      console.log(error);
    }
  }


  const handleDelete = () => {
    setIsDeleting(true)
    deleteTask();
    close();
    push("/")
  }



  if (error && error.statusCode) return <Error statusCode={error.statusCode} title={error.statusText} />

  return (
    <Grid centered verticalAlign='middle' columns="1" style={{ height: "80vh" }}>
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <h1>{task.title}</h1>
          <p>{task.description}</p>
          <div>
            <Button color='red' onClick={open} loading={isDeleting}>Delete</Button>
          </div>
        </Grid.Column>
      </Grid.Row>
      <Confirm
        header="Please confirm"
        content="Are you sure you want to delete this task?"
        open={confirm}
        onConfirm={handleDelete}
        onCancel={close}
      />
    </Grid>
  )
}

export default TaskDetail

// Normalmente se pone context, pero en este caso sólo queremos id del query, así que lo destructuramos
export async function getServerSideProps({ query: { id } }) {

  const res = await fetch(`http://localhost:3000/api/tasks/${id}`);

  if (res.status === 200) {
    const task = await res.json();
    return {
      props: {
        task
      }
    }
  }


  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: "Invalid id"
      }
    }
  }
}