import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Container,
    TextField,
    Button,
    Typography,
    List,
    ListItem,
    ListItemText,
    Checkbox,
    Box,
    Divider,
} from "@mui/material";

const App = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [newBody, setNewBody] = useState("");

    const apiBaseUrl = "http://localhost:5000/api/todos";

    // Fetch To-Dos
    const fetchTodos = async () => {
        try {
            const response = await axios.get(apiBaseUrl);
            setTodos(response.data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    // Add To-Do
    const addTodo = async () => {
        if (!newTodo.trim() || !newBody.trim()) return;

        try {
            const response = await axios.post(apiBaseUrl, {
                title: newTodo,
                body: newBody,
                done: false,
            });
            setTodos(response.data);
            setNewTodo("");
            setNewBody("");
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    // Mark To-Do as Done
    const markAsDone = async (id) => {
        try {
            const response = await axios.patch(`${apiBaseUrl}/${id}/done`);
            setTodos(response.data);
        } catch (error) {
            console.error("Error marking todo as done:", error);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
            <Typography variant="h4" align="center" gutterBottom>
                To-Do App
            </Typography>
            <Box display="flex" flexDirection="column" gap={2} marginBottom={2}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Add a new task title..."
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Add details or description..."
                    value={newBody}
                    onChange={(e) => setNewBody(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={addTodo}>
                    Add
                </Button>
            </Box>
            <Divider />
            <List>
                {todos.map((todo) => (
                    <ListItem
                        key={todo.id}
                        secondaryAction={
                            <Checkbox
                                edge="end"
                                checked={todo.done}
                                onChange={() => markAsDone(todo.id)}
                            />
                        }
                    >
                        <ListItemText
                            primary={todo.title}
                            secondary={
                                <>
                                    <Typography variant="body2">{todo.body}</Typography>
                                    {todo.done ? "Status: Completed" : "Status: Pending"}
                                </>
                            }
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default App;
