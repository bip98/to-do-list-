const API_URL = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
  ? "http://localhost:3000/todos" // local server
  : "/api/todos"; // production (Vercel rewrites)

async function loadTodos() {
  const res = await fetch(API_URL);
  const todos = await res.json();
  const list = document.getElementById("todoList");
  list.innerHTML = "";
  todos.forEach(todo => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${todo.text}</span>
      <button onclick="deleteTodo(${todo.id})">Delete</button>
    `;
    list.appendChild(li);
  });
}

async function addTodo() {
  const input = document.getElementById("todoInput");
  const text = input.value.trim();
  if (!text) return;

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
  input.value = "";
  loadTodos();
}

async function deleteTodo(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  loadTodos();
}

document.getElementById("addBtn").addEventListener("click", addTodo);
document.getElementById("todoInput").addEventListener("keypress", e => {
  if (e.key === "Enter") addTodo();
});

loadTodos(); // initial load