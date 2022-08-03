import React, { useState } from 'react'
import { Form, Grid, Button } from "semantic-ui-react"
import { useRouter } from 'next/router';

const TaskFormPage = () => {

    const [newTask, setNewTask] = useState({
        title: "",
        description: ""
    });

    const [errors, setErrors] = useState({
        title: "",
        description: ""
    });

    const router = useRouter();


    // Para no enviar datos vacíos al backend
    const validate = () => {
        const errors = {};
        if (!newTask.title) errors.title = "Title is required";
        if (!newTask.description) errors.description = "Description is required";

        return errors;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = validate();
        // Si hay keys en errors => asigna el valor a la variable de estado errors. El "return" asegura que no continúa con lo de abajo.
        if (Object.keys(errors).length) return setErrors(errors);
        await createTask();
        router.push("/");
    }


    const createTask = async () => {
        try {
            await fetch("http://localhost:3000/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask)

            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) =>
        setNewTask({ ...newTask, [e.target.name]: e.target.value })



    return (
        <Grid
            centered
            verticalAlign='middle'
            columns="3"
            style={{ height: "80vh" }}
        >
            <Grid.Row>
                <Grid.Column textAlign='center'>
                    <h1>Create Task</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Input
                            label="Title"
                            placeholder="Title"
                            name="title"
                            onChange={handleChange}
                            error={errors.title ? { content: "Enter a title", pointing: "below" } : null}
                        />
                        <Form.TextArea
                            label="Description"
                            placeholder="Description"
                            name="description"
                            onChange={handleChange}
                            error={errors.description ? { content: errors.description, pointing: "below" } : null}
                        />
                        <Button primary>Save</Button>
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default TaskFormPage