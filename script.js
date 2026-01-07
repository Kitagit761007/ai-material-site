// DOM Elements
const todoInput = document.getElementById('todo-input');
const priorityInput = document.getElementById('priority-input');
const startTimeInput = document.getElementById('start-time');
const endTimeInput = document.getElementById('end-time');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const itemsLeft = document.getElementById('items-left');
const filterBtns = document.querySelectorAll('.filter-btn');
const authBtn = document.getElementById('auth-btn');

// State
let todos = [
    { id: 1, text: 'TODOアプリのデザイン案を作成する', completed: true, memo: '', priority: '1', start: '09:00', end: '10:00' },
    { id: 2, text: 'HTMLとCSSを実装する', completed: false, memo: '青色は見やすくて良い感じ。', priority: '2', start: '', end: '' },
    { id: 3, text: 'JavaScriptで動きをつける', completed: false, memo: '', priority: '', start: '13:00', end: '' }
];
let calendarEvents = [];
let filter = 'all';

// Google Calendar Config
const CLIENT_ID = 'YOUR_BE_CLIENT_ID';
const API_KEY = 'YOUR_API_KEY';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar.events.readonly';

let tokenClient;
let gapiInited = false;
let gisInited = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateDate();
    renderTodos();

    if (typeof gapi !== 'undefined') gapi.load('client', intializeGapiClient);
    if (typeof google !== 'undefined') initializeGisClient();
});

// Event Listeners
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        if (btn.parentNode.classList.contains('priority-filters')) {
            // Priority filters are unique, remove active from others if needed
            // For now, simplify: single filter active at a time
        }
        btn.classList.add('active');
        filter = btn.dataset.filter;
        renderTodos();
    });
});

authBtn.addEventListener('click', handleAuthClick);

// Functions
function updateDate() {
    const dateDisplay = document.querySelector('.date-display');
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' };
    dateDisplay.textContent = now.toLocaleDateString('ja-JP', options);
}

function renderTodos() {
    todoList.innerHTML = '';

    // 1. Render Calendar Events
    calendarEvents.forEach(event => {
        const li = document.createElement('li');
        li.className = 'todo-item calendar-event';
        li.innerHTML = `
            <div class="todo-main">
                <div class="todo-content">
                    <span class="todo-text">📅 ${escapeHtml(event.summary)}</span>
                    <span class="event-time">${event.start} - ${event.end}</span>
                </div>
            </div>
        `;
        todoList.appendChild(li);
    });

    // 2. Filter User Todos
    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        if (filter === 'p1') return todo.priority === '1';
        if (filter === 'p2') return todo.priority === '2';
        if (filter === 'p3') return todo.priority === '3';
        return true; // 'all'
    });

    // 3. Render User Todos
    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

        // Priority Badge HTML
        let priorityBadge = '';
        if (todo.priority) {
            priorityBadge = `<span class="priority-badge p${todo.priority}">優先度${todo.priority}</span>`;
        }

        // Time HTML
        let timeDisplay = '';
        if (todo.start || todo.end) {
            const timeStr = `${todo.start || '?'} - ${todo.end || '?'}`;
            timeDisplay = `<span class="todo-meta">⏰ ${timeStr}</span>`;
        }

        li.innerHTML = `
            <div class="todo-main">
                <label class="custom-checkbox">
                    <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                    <span class="checkmark"></span>
                </label>
                <div class="todo-content">
                    <div class="todo-header">
                        ${priorityBadge}
                        <span class="todo-text">${escapeHtml(todo.text)}</span>
                    </div>
                    ${timeDisplay}
                </div>
                <button class="detail-btn">詳細</button>
                <button class="delete-btn" aria-label="削除">×</button>
            </div>
            <div class="memo-area ${todo.memo ? 'open' : ''}">
                <textarea class="memo-input" placeholder="メモを入力...">${escapeHtml(todo.memo)}</textarea>
            </div>
        `;

        // Event listeners
        const checkbox = li.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => toggleTodo(todo.id));

        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

        const detailBtn = li.querySelector('.detail-btn');
        const memoArea = li.querySelector('.memo-area');
        detailBtn.addEventListener('click', () => {
            memoArea.classList.toggle('open');
        });

        const memoInput = li.querySelector('.memo-input');
        memoInput.addEventListener('input', (e) => updateMemo(todo.id, e.target.value));

        todoList.appendChild(li);
    });

    updateItemsLeft();
}

function addTodo() {
    const text = todoInput.value.trim();
    if (text === '') return;

    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false,
        priority: priorityInput.value,
        start: startTimeInput.value,
        end: endTimeInput.value,
        memo: ''
    };

    todos.push(newTodo);

    // Reset inputs
    todoInput.value = '';
    priorityInput.value = '';
    startTimeInput.value = '';
    endTimeInput.value = '';

    renderTodos();
    todoList.scrollTop = todoList.scrollHeight;
}

function toggleTodo(id) {
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

function updateMemo(id, text) {
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, memo: text } : todo
    );
}

function updateItemsLeft() {
    const count = todos.filter(todo => !todo.completed).length;
    itemsLeft.textContent = count;
}

function escapeHtml(text) {
    if (!text) return '';
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}

// --- Google Calendar API Logic (Same as before) ---

function intializeGapiClient() {
    gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    }).then(() => {
        gapiInited = true;
        checkAuth();
    }).catch(error => {
        console.log("API Key error (expected for demo)", error);
        gapiInited = true;
    });
}

function initializeGisClient() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '',
    });
    gisInited = true;
    checkAuth();
}

function checkAuth() {
    if (gapiInited && gisInited) {
        authBtn.style.display = 'block';
    }
}

function handleAuthClick() {
    if (API_KEY === 'YOUR_API_KEY' || CLIENT_ID === 'YOUR_BE_CLIENT_ID') {
        alert("Google Cloud APIの設定が必要です。\n現在はデモデータを表示します。");
        showDemoEvents();
        return;
    }

    tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
            throw (resp);
        }
        await listUpcomingEvents();
    };

    if (gapi.client.getToken() === null) {
        tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
        tokenClient.requestAccessToken({ prompt: '' });
    }
}

async function listUpcomingEvents() {
    try {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(23, 59, 59);

        const request = {
            'calendarId': 'primary',
            'timeMin': today.toISOString(),
            'timeMax': tomorrow.toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        };

        const response = await gapi.client.calendar.events.list(request);
        const events = response.result.items;

        calendarEvents = events.map(event => {
            let start = event.start.dateTime;
            let end = event.end.dateTime;

            if (!start) {
                start = event.start.date;
                end = '終日';
            } else {
                start = new Date(start).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
                end = new Date(end).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
            }

            return {
                summary: event.summary,
                start: start,
                end: end
            };
        });

        renderTodos();
        alert('カレンダーから予定を取得しました！');

    } catch (err) {
        console.error('Error fetching events', err);
        alert('予定の取得に失敗しました。');
    }
}

function showDemoEvents() {
    calendarEvents = [
        { summary: '【デモ】チーム定例会議', start: '10:00', end: '11:00' },
        { summary: '【デモ】ランチミーティング', start: '12:30', end: '13:30' },
        { summary: '【デモ】プロジェクト締め切り', start: '18:00', end: '19:00' }
    ];
    renderTodos();
    authBtn.textContent = '連携済み (デモ)';
}
