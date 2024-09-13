export const todosPage = () => {
  const container = document.createElement("div");

  container.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "h-screen",
    "bg-gray-200"
  );

  const btnHome = document.createElement("button");

  btnHome.classList.add(
    "bg-blue-500",
    "text-white",
    "p-2",
    "rounded",
    "hover:bg-blue-600",
    "mb-4"
  );

  btnHome.textContent = "Home";

  btnHome.addEventListener("click", () => {
    window.location.pathname = "/home";
  });

  const title = document.createElement("h1");

  title.classList.add("text-3xl", "font-bold", "mb-4");
  title.textContent = "List of Todos";

  const table = document.createElement("table");

  table.classList.add(
    "w-1/2",
    "bg-white",
    "shadow-md",
    "h-[700px]",
    "overflow-y-scroll"
  );

  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  const th1 = document.createElement("th");
  th1.classList.add("border", "px-4", "py-2");
  th1.textContent = "ID";

  const th2 = document.createElement("th");
  th2.classList.add("border", "px-4", "py-2");
  th2.textContent = "Title";

  const th3 = document.createElement("th");
  th3.classList.add("border", "px-4", "py-2");
  th3.textContent = "Completed";

  const th4 = document.createElement("th");
  th4.classList.add("border", "px-4", "py-2");
  th4.textContent = "Owner Id";

  const th5 = document.createElement("th");
  th5.classList.add("border", "px-4", "py-2");
  th5.textContent = "Acciones";

  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);
  tr.appendChild(th5);

  thead.appendChild(tr);

  const tbody = document.createElement("tbody");

  tbody.classList.add("text-center");
  table.appendChild(thead);
  table.appendChild(tbody);

  container.appendChild(btnHome);
  fetch("http://localhost:4000/todos", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      data.todos.forEach((todo) => {
        if (todo.id > 10) return;

        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        td1.classList.add("border", "px-4", "py-2");
        td1.textContent = todo.id;

        const td2 = document.createElement("td");
        td2.classList.add("border", "px-4", "py-2");
        td2.textContent = todo.title;

        const td3 = document.createElement("td");
        td3.classList.add("border", "px-4", "py-2");
        td3.textContent = todo.completed ? "Sí" : "No";

        const td4 = document.createElement("td");
        td4.classList.add("border", "px-4", "py-2");
        td4.textContent = todo.owner;

        const td5 = document.createElement("td");
        td5.classList.add("border", "px-4", "py-2");

        const updateBtn = document.createElement("button");
        updateBtn.classList.add("bg-yellow-500", "text-white", "p-2", "rounded", "hover:bg-yellow-600", "mr-2");
        updateBtn.textContent = "Update";
        updateBtn.addEventListener("click", () => {
          openForm(todo);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("bg-red-500", "text-white", "p-2", "rounded", "hover:bg-red-600");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
          tr.remove();
        });

        td5.appendChild(updateBtn);
        td5.appendChild(deleteBtn);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tbody.appendChild(tr);
      });
    });

  const addTaskBtn = document.createElement("button");
  addTaskBtn.classList.add("bg-green-500", "text-white", "p-2", "rounded", "hover:bg-green-600", "mb-4");
  addTaskBtn.textContent = "Add New Task";
  addTaskBtn.addEventListener("click", () => {
    openForm();
  });

  container.appendChild(btnHome);
  container.appendChild(title);
  container.appendChild(addTaskBtn);
  container.appendChild(table);

  return container;
};

const openForm = (todo = {}) => {
  const formContainer = document.createElement("div");
  formContainer.classList.add("fixed", "top-0", "left-0", "w-full", "h-full", "bg-black", "bg-opacity-50", "flex", "items-center", "justify-center");

  const form = document.createElement("form");
  form.classList.add("bg-white", "p-6", "rounded", "shadow-md");

  const titleInput = document.createElement("input");
  titleInput.classList.add("border", "p-2", "mb-4", "w-full");
  titleInput.placeholder = "Title";
  titleInput.value = todo.title || "";

  const completedInput = document.createElement("input");
  completedInput.type = "checkbox";
  completedInput.classList.add("mb-4");
  completedInput.checked = todo.completed || false;

  const ownerInput = document.createElement("input");
  ownerInput.classList.add("border", "p-2", "mb-4", "w-full");
  ownerInput.placeholder = "Owner Id";
  ownerInput.value = todo.owner || "";

  const submitBtn = document.createElement("button");
  submitBtn.classList.add("bg-blue-500", "text-white", "p-2", "rounded", "hover:bg-blue-600");
  submitBtn.textContent = todo.id ? "Update Task" : "Add Task";
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos al servidor
    formContainer.remove();
  });

  const cancelBtn = document.createElement("button");
  cancelBtn.classList.add("bg-gray-500", "text-white", "p-2", "rounded", "hover:bg-gray-600", "ml-2");
  cancelBtn.textContent = "Cancel";
  cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formContainer.remove();
  });

  form.appendChild(titleInput);
  form.appendChild(completedInput);
  form.appendChild(ownerInput);
  form.appendChild(submitBtn);
  form.appendChild(cancelBtn);

  formContainer.appendChild(form);
  document.body.appendChild(formContainer);
};