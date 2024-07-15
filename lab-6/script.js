document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const taskDateTime = document.getElementById('taskDateTime');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskSections = document.getElementById('taskSections');
    const completedTasksTable = document.getElementById('completedTasksTable').querySelector('tbody');
    const clearAllButton = document.getElementById('clearAllButton');
    const completedTasksSection = document.getElementById('completedTasksSection');

    addTaskButton.addEventListener('click', addTask);
    taskSections.addEventListener('click', handleTaskClick);
    clearAllButton.addEventListener('click', clearAllTasks);

    loadTasks();

    function addTask() {
        const taskText = taskInput.value.trim();
        const taskDateTimeValue = taskDateTime.value.trim();
        if (taskText && taskDateTimeValue) {
            const taskDate = new Date(taskDateTimeValue).toLocaleDateString();
            const taskTime = new Date(taskDateTimeValue).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const taskItem = { text: taskText, date: taskDate, time: taskTime, completed: false };
            saveTask(taskItem);
            taskInput.value = '';
            taskDateTime.value = '';
        }
    }

    function handleTaskClick(e) {
        if (e.target.tagName === 'BUTTON' && e.target.classList.contains('complete-button')) {
            const taskRow = e.target.closest('tr');
            const taskText = taskRow.querySelector('.task-text').textContent;
            const taskDate = taskRow.querySelector('.task-text').dataset.date;
            const completedDate = new Date().toLocaleDateString();

            taskRow.remove();
            updateTaskStatus(taskDate, taskText, completedDate);
        }
    }

    function saveTask(task) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function updateTaskStatus(date, text, completedDate) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach((task, index) => {
            if (task.date === date && task.text === text) {
                task.completed = true;
                addCompletedTask(task, completedDate);
                tasks.splice(index, 1); // Remove completed task from to-do list
            }
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function addCompletedTask(task, completedDate) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${task.text}</td><td>${task.date}</td><td>${completedDate}</td>`;
        completedTasksTable.appendChild(row);
        saveCompletedTasks();
        toggleClearAllButton(); // Check if Clear All button should be shown
        toggleCompletedTasksSection(); // Check if Completed Tasks section should be shown
    }

    function saveCompletedTasks() {
        const completedTasks = Array.from(completedTasksTable.children).map(row => {
            return {
                text: row.children[0].textContent,
                startDate: row.children[1].textContent,
                completedDate: row.children[2].textContent
            };
        });
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }

    function loadTasks() {
        renderTasks();
        loadCompletedTasks();
        toggleClearAllButton(); // Initial check to show Clear All button
        toggleCompletedTasksSection(); // Initial check to show Completed Tasks section
    }

    function loadCompletedTasks() {
        const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
        completedTasksTable.innerHTML = ''; // Clear existing table content
        if (completedTasks.length === 0) {
            completedTasksSection.style.display = 'none';
        } else {
            completedTasksSection.style.display = 'block';
            completedTasks.forEach(task => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${task.text}</td><td>${task.startDate}</td><td>${task.completedDate}</td>`;
                completedTasksTable.appendChild(row);
            });
        }
    }

    function renderTasks() {
        taskSections.innerHTML = '';
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const groupedTasks = tasks.reduce((acc, task) => {
            if (!acc[task.date]) {
                acc[task.date] = [];
            }
            acc[task.date].push(task);
            return acc;
        }, {});

        Object.keys(groupedTasks).forEach(date => {
            const section = document.createElement('div');
            section.innerHTML = `<h3>${date}</h3>`;
            const table = document.createElement('table');
            const thead = document.createElement('thead');
            thead.innerHTML = '<tr><th>Task</th><th>Date</th><th>Action</th></tr>';
            table.appendChild(thead);
            const tbody = document.createElement('tbody');
            groupedTasks[date].forEach(task => {
                const row = document.createElement('tr');
                row.innerHTML = `<td class="task-text" data-date="${task.date}">${task.text}</td><td>${task.time}</td>`;
                const actionCell = document.createElement('td');
                const completeButton = document.createElement('button');
                completeButton.textContent = 'Complete';
                completeButton.classList.add('complete-button');
                actionCell.appendChild(completeButton);
                row.appendChild(actionCell);
                tbody.appendChild(row);
            });

            table.appendChild(tbody);
            section.appendChild(table);
            taskSections.appendChild(section);
        });

        toggleClearAllButton(); // Check if Clear All button should be shown after rendering
    }

    function toggleClearAllButton() {
        const tbody = document.querySelector('#completedTasksTable tbody');
        clearAllButton.style.display = (tbody.rows.length > 0) ? 'block' : 'none';
    }

    function toggleCompletedTasksSection() {
        const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
        completedTasksSection.style.display = (completedTasks.length > 0) ? 'block' : 'none';
    }

    function clearAllTasks() {
        localStorage.removeItem('tasks');
        localStorage.removeItem('completedTasks');
        taskSections.innerHTML = '';
        completedTasksTable.innerHTML = '';
        completedTasksSection.style.display = 'none';
        clearAllButton.style.display = 'none';
    }
});
