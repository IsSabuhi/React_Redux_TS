import React from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useAction } from "../hooks/useAction";

const TodoList: React.FC = () => {
  const { todos, page, limit, loading, error } = useTypedSelector(
    (state) => state.todo
  );

  const { fetchTodos, setTodoPage } = useAction();

  const pages = [1, 2, 3, 4, 5];

  React.useEffect(() => {
    fetchTodos(page, limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  if (loading) {
    return <h1>Идет загрузка...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.id} - {todo.title}
        </div>
      ))}
      <div style={{ display: "flex" }}>
        {pages.map((p) => (
          <div
            onClick={() => setTodoPage(p)}
            style={{
              border: p === page ? "2px solid green" : "1px solid gray",
              padding: "10px",
            }}
            key={p}
          >
            {p}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
