import { useState } from "react";
import { Container, VStack, HStack, Input, Button, Text, Checkbox, IconButton, Box } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue("");
    }
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const toggleTodo = (index) => {
    const newTodos = todos.map((todo, i) => 
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} w="100%">
        <HStack w="100%">
          <Input 
            placeholder="Add a new task" 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
          />
          <Button onClick={addTodo} colorScheme="teal">Add</Button>
        </HStack>
        <VStack w="100%" spacing={3}>
          {todos.map((todo, index) => (
            <HStack key={index} w="100%" justifyContent="space-between">
              <Checkbox 
                isChecked={todo.completed} 
                onChange={() => toggleTodo(index)}
              >
                <Text as={todo.completed ? "s" : ""}>{todo.text}</Text>
              </Checkbox>
              <IconButton 
                aria-label="Delete" 
                icon={<FaTrash />} 
                onClick={() => deleteTodo(index)} 
              />
            </HStack>
          ))}
        </VStack>
      </VStack>
      <Footer />
    </Container>
  );
};

const Footer = () => (
  <Box as="footer" py={4} textAlign="center" width="100%" bg="gray.200" mt={10}>
    <Text>&copy; {new Date().getFullYear()} Todo App. All rights reserved.</Text>
  </Box>
);

export default Index;