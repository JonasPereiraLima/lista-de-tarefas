const form = document.querySelector("form#addNewAssignment");

const input = document.querySelector("input#newTarefa");

const unordedList = document.querySelector("ul#lista-de-tarefas");

var tasks = [];

function newAssigment(tarefa, done = false) {
  const li = document.createElement("li");

  const check = document.createElement("input");
  check.setAttribute("type", "checkbox");

  const span = document.createElement("span");
  span.textContent = tarefa;

  const button = document.createElement("button");
  button.textContent = "remove";

  // remover elemento
  button.addEventListener("click", (event) => {
    unordedList.removeChild(li);

    const parent = event.target.parentElement;
    const span = parent.querySelector("span");

    tasks = tasks.filter((t) => t.title !== span.textContent);

    localStorage.removeItem("tasks");
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  // marcando elemento
  check.addEventListener("change", (event) => {
    const parent = event.target.parentElement;
    const spanToToggle = parent.querySelector("span");

    const done = event.target.checked;

    tasks.map((t) => {
      if (t.title === spanToToggle.textContent) return (t.done = done);
    });

    localStorage.removeItem("tasks");
    localStorage.setItem("tasks", JSON.stringify(tasks));

    if (done) {
      spanToToggle.style.textDecoration = "line-through";
    } else {
      spanToToggle.style.textDecoration = "none";
    }
  });

  if (done) {
    span.style.textDecoration = "line-through";
  } else {
    span.style.textDecoration = "none";
  }

  // adicionando os elementos na li
  li.appendChild(check);
  li.appendChild(span);
  li.appendChild(button);

  // adicionando os elementos na ul
  unordedList.appendChild(li);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // adicionar a nova tarefa na lista
  newAssigment(input.value);

  tasks.push({
    title: input.value,
    done: false,
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
});

window.onload = () => {
  const storage = JSON.parse(localStorage.getItem("tasks"));

  tasks = storage;

  for (let t in tasks) {
    newAssigment(tasks[t].title, tasks[t].done);
  }
};
