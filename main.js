// Date & Time
function updateTime() {
    const now = new Date();
    const options = { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    };
    document.getElementById('datetime').textContent = now.toLocaleDateString('en-US', options);
}

updateTime();
setInterval(updateTime, 60000);

// To-Do App Logic
document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => addTodoElement(todo.text, todo.completed));
    }

    function saveTodos() {
        const todos = [];
        document.querySelectorAll('.todo').forEach(item => {
            todos.push({
                text: item.querySelector('.todo-text').textContent,
                completed: item.classList.contains('completed')
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function addTodoElement(text, completed = false) {
        const li = document.createElement('li');
        li.className = `todo ${completed ? 'completed' : ''}`;
        li.innerHTML = `
            <span class="todo-text">${text}</span>
            <div class="todo-buttons">
                <button class="check-btn"><i class="fas fa-check"></i></button>
                <button class="delete-btn"><i class="fas fa-trash"></i></button>
            </div>
        `;

        li.querySelector('.check-btn').addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTodos();
        });

        li.querySelector('.delete-btn').addEventListener('click', () => {
            li.style.opacity = '0';
            setTimeout(() => {
                li.remove();
                saveTodos();
            }, 300);
        });

        todoList.appendChild(li);
    }

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = todoInput.value.trim();
        if (text === '') return;

        addTodoElement(text);
        saveTodos();
        todoInput.value = '';
    });

    // Theme Switching
    window.setTheme = function(theme) {
        document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
        
        if (theme === 'standard') {
            document.querySelector('.standard-theme').classList.add('active');
            document.body.style.background = 'linear-gradient(135deg, #062e3f 0%, #0a4a5f 100%)';
            document.body.style.color = 'white';
        } 
        else if (theme === 'light') {
            document.querySelector('.light-theme').classList.add('active');
            document.body.style.background = '#f1f5f9';
            document.body.style.color = '#1e2937';
        } 
        else if (theme === 'darker') {
            document.querySelector('.darker-theme').classList.add('active');
            document.body.style.background = '#0a0a0a';
            document.body.style.color = '#e0e0e0';
        }
        
        localStorage.setItem('theme', theme);
    };

    // Load saved theme & todos
    const savedTheme = localStorage.getItem('theme') || 'standard';
    setTheme(savedTheme);
    
    loadTodos();
});
