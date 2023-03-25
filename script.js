let tasks = [];
let themeDark = false;

const page = document.URL.replace(document.location.origin,"");
const body = document.getElementsByTagName('body')[0];
const buttonChangeTheme = document.getElementById('button-change-theme');

(() => {
  const tasksLocal = localStorage.getItem("tasks");
  const themeDarkLocal = localStorage.getItem("theme-dark");

  if (tasksLocal)
    tasks = JSON.parse(tasksLocal);

  if (themeDarkLocal)
    themeDark = JSON.parse(themeDarkLocal);

  render();
})();

function updateLocalStorage() {
  localStorage.setItem('tasks',JSON.stringify(tasks));
  localStorage.setItem('theme-dark',JSON.stringify(themeDark));
}

function changeTheme() {
  themeDark = !body.classList.contains("dark");
  render();
}

function addTask(event) {
  event.preventDefault();

  const input = document.getElementById('add-task-bar');
  let taskName = input.value;

  input.value = "";

  tasks.push({
    id: generateUUID(),
    name: taskName,
    deleted: false,
    completed: false,
    editing: false
  });

  render();
}

function permanentlyDeleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);

  render();
}

function deleteTask(id) {
  tasks = tasks.map(task => {
    if (task.id === id)
      return {
        ...task,
        deleted: true,
        completed: false,
        editing: false,
      };
    return task;
  });

  render();
}

function checkTask(id) {
  tasks = tasks.map(task => {
    if (task.id === id)
      return {
        ...task,
        completed: !task.completed,
      };
    return task;
  });

  render();
}

function editTask(id) {
  tasks = tasks.map(task => {
    if (task.id === id)
      return {
        ...task,
        editing: true,
      };
    return task;
  });

  render();
}

function recoveTask(id) {
  tasks = tasks.map(task => {
    if (task.id === id)
      return {
        ...task,
        deleted: false,
      };
    return task;
  });

  render();
}

function saveTask(id) {
  const input = document.getElementById(`input-${id}`);
  let taskName = input.value;

  input.value = "";

  tasks = tasks.map(task => {
    if (task.id === id)
      return {
        ...task,
        name: taskName,
        editing: false
      };
    return task;
  });

  render();
}

function render() {
  buttonChangeTheme.addEventListener('click',changeTheme);

  if (!themeDark) {
    body.classList.remove('dark');
    buttonChangeTheme.innerHTML = `<i class="feather" data-feather="moon"></i>`;
  } else {
    body.classList.add('dark');
    buttonChangeTheme.innerHTML = `<i class="feather" data-feather="sun"></i>`;
  }

  const taskList = document.getElementById('task-list');
  taskList.innerHTML = "";

  for (let task of tasks) {
    let completed = task.completed;
    let editing = task.editing;
    let deleted = task.deleted;

    if (
      (!page.includes("deleted") && !page.includes("completed") && deleted) ||
      (!deleted && page.includes("deleted")) ||
      (!completed && page.includes("completed"))
    )
      continue;

    taskList.innerHTML +=
      `<fieldset class="task-field ${completed ? "checked" : ""}">
        <div class="task-item">
          ${!deleted ?
        `<button class="check-button" onclick="checkTask('${task.id}')" title="${completed ? "Marcar como não concluída" : "Marcar como concluída"}">
            <i class="feather" data-feather="check"></i>
          </button>` : ""}
          <input id="input-${task.id}" value="${task.name}" ${!editing ? "disabled" : ""} />
        </div>

        <div class="task-buttons">
          ${editing ?
        `<button class="task-button" id="edit-button" title="Salvar" onclick="saveTask('${task.id}')">
                  <i class="feather" data-feather="save"></i>
                </button>` :
        deleted ? `<button class="task-button" id="edit-button" title="Restaurar" onclick="recoveTask('${task.id}')">
                  <i class="feather" data-feather="rotate-cw"></i>
                </button>` : `<button class="task-button" id="edit-button" title="Editar" onclick="editTask('${task.id}')">
                  <i class="feather" data-feather="edit-2"></i>
                </button>`
      }

          ${deleted ?
        `<button class="task-button" id="delete-button" title="Excluir permanemente" onclick="permanentlyDeleteTask('${task.id}')">
              <i class="feather" data-feather="trash-2"></i>
            </button>` :
        `<button class="task-button" id="delete-button" title="Excluir" onclick="deleteTask('${task.id}')">
              <i class="feather" data-feather="trash-2"></i>
            </button>`
      }
        </div>
      </fieldset>`;
  }

  updateLocalStorage();
  feather.replace();
}

function generateUUID() {
  let d = new Date().getTime();
  if (
    typeof performance !== "undefined" &&
    typeof performance.now === "function"
  ) {
    d += performance.now(); // use high-precision timer if available
  }
  let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      let r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}