import { useSelector } from "react-redux";
import TodoItem from "./Todoitem";
const TodoList = () => {
  const filteredTodos = useSelector((state) => {
    const todos = state.todos;
    const filter = state.filter;
    const searchTerm = state.searchTerm;

    return todos.filter((todo) => {
      const matchFilter =
        (filter === "COMPLETED" && todo.completed) ||
        (filter === "INCOMPLETE" && !todo.completed) ||
        filter === "ALL";

      const matchSearch = todo.text.toLowerCase().includes(searchTerm);

      return matchFilter && matchSearch;
    });
  });

  // Sort todos so that completed todos appear last
  const reorderedTodos = filteredTodos.slice().sort((a, b) => {
    if (a.completed && !b.completed) {
      return 1; // Move a to end of the array
    } else if (!a.completed && b.completed) {
      return -1; // Move b to end of the array
    } else {
      return 0; // Maintain order
    }
  });

  return (
    <ul>
      <li className="my-2 text-sm italic">All your Notes Here...</li>
      {reorderedTodos.map((todo, index) => (
        <TodoItem key={index} todo={todo} index={index} />
      ))}
    </ul>
  );
};

export default TodoList;
