// ===== CONFIGURAÇÕES E CONSTANTES =====
/**
 * Configurações principais da aplicação Agenda da Isadora
 * Contém limites, chaves de armazenamento, categorias, conquistas e mensagens
 */
const CONFIG = {
  MAX_TASKS: 100,
  MAX_TITLE_LENGTH: 100,
  STORAGE_KEYS: {
    TASKS: 'agenda_tarefas',
    STARS: 'agenda_estrelas',
    ACHIEVEMENTS: 'agenda_conquistas',
    PREFERENCES: 'agenda_preferencias',
    BACKUP: 'agenda_backup'
  },
  CATEGORIES: {
    escola: { emoji: '📚', name: 'Tarefas da Escola' },
    casa: { emoji: '🏠', name: 'Tarefas de Casa' },
    higiene: { emoji: '🚿', name: 'Rotinas de Higiene' },
    atividades: { emoji: '🎯', name: 'Atividades Extras' },
    alimentacao: { emoji: '🍎', name: 'Alimentação / Remédio' },
    outro: { emoji: '⭐', name: 'Outros' }
  },
  ACHIEVEMENTS: {
    primeira_tarefa: {
      id: 'primeira_tarefa',
      title: 'Primeira Tarefa',
      description: 'Complete sua primeira tarefa',
      icon: '🎯',
      condition: (stats) => stats.completedTasks >= 1
    },
    dia_perfeito: {
      id: 'dia_perfeito',
      title: 'Dia Perfeito',
      description: 'Complete todas as tarefas do dia',
      icon: '🌟',
      condition: (stats) => stats.perfectDays >= 1
    },
    semana_produtiva: {
      id: 'semana_produtiva',
      title: 'Semana Produtiva',
      description: '7 dias com tarefas completas',
      icon: '📅',
      condition: (stats) => stats.consecutiveDays >= 7
    },
    super_organizada: {
      id: 'super_organizada',
      title: 'Super Organizada',
      description: '20 tarefas completadas no total',
      icon: '🦸‍♀️',
      condition: (stats) => stats.completedTasks >= 20
    },
    mestre_agenda: {
      id: 'mestre_agenda',
      title: 'Mestre da Agenda',
      description: '50 tarefas completadas no total',
      icon: '👑',
      condition: (stats) => stats.completedTasks >= 50
    },
    estrela_dourada: {
      id: 'estrela_dourada',
      title: 'Estrela Dourada',
      description: '100 estrelas acumuladas',
      icon: '🌟',
      condition: (stats) => stats.totalStars >= 100
    }
  },
  MOTIVATIONAL_MESSAGES: [
    'Você consegue, Isadora! 💪',
    'Que legal, mais uma tarefa feita! ⭐',
    'Uau, você está arrasando! 🌟',
    'Parabéns! Continue assim! 🎉',
    'Muito bem! Você é demais! 🦸‍♀️',
    'Incrível! Mais uma conquista! 🏆',
    'Fantástico! Você é uma estrela! ✨',
    'Perfeito! Que organização! 📋',
    'Maravilhoso! Continue brilhando! 💫',
    'Excelente! Você é incrível! 🎊'
  ],
  DEFAULT_SOUNDS: {
    taskComplete: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT',
    achievement: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT',
    notification: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT',
    // Sons específicos para cada conquista
    achievement_primeira_tarefa: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT',
    achievement_dia_perfeito: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT',
    achievement_semana_produtiva: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT',
    achievement_super_organizada: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT',
    achievement_mestre_agenda: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT',
    achievement_estrela_dourada: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'
  }
};

// ===== ESTADO GLOBAL =====
/**
 * Classe principal que gerencia todo o estado da aplicação
 * Responsável por CRUD de tarefas, gamificação, UI e persistência de dados
 */
class AppState {
  constructor() {
    this.tasks = [];
    this.stars = 0;
    this.achievements = [];
    this.preferences = {
      theme: 'light',
      sound: true,
      notifications: false,
      customSounds: {
        taskComplete: CONFIG.DEFAULT_SOUNDS.taskComplete,
        achievement: CONFIG.DEFAULT_SOUNDS.achievement,
        notification: CONFIG.DEFAULT_SOUNDS.notification
      }
    };
    this.currentView = 'hoje';
    this.editingTask = null;
    this.init();
  }

  init() {
    this.loadFromStorage();
    this.setupEventListeners();
    this.updateUI();
    this.checkAchievements();
    this.setupTheme();
  }

  // ===== GERENCIAMENTO DE DADOS =====
  loadFromStorage() {
    try {
      this.tasks = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.TASKS)) || [];
      this.stars = parseInt(localStorage.getItem(CONFIG.STORAGE_KEYS.STARS)) || 0;
      this.achievements = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.ACHIEVEMENTS)) || [];
      this.preferences = {
        ...this.preferences,
        ...JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.PREFERENCES) || '{}')
      };
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      this.showNotification('Erro ao carregar dados salvos', 'error');
    }
  }

  saveToStorage() {
    try {
      localStorage.setItem(CONFIG.STORAGE_KEYS.TASKS, JSON.stringify(this.tasks));
      localStorage.setItem(CONFIG.STORAGE_KEYS.STARS, this.stars.toString());
      localStorage.setItem(CONFIG.STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(this.achievements));
      localStorage.setItem(CONFIG.STORAGE_KEYS.PREFERENCES, JSON.stringify(this.preferences));
      
      // Backup automático
      const backup = {
        date: new Date().toISOString(),
        tasks: this.tasks,
        stars: this.stars,
        achievements: this.achievements
      };
      localStorage.setItem(CONFIG.STORAGE_KEYS.BACKUP, JSON.stringify(backup));
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      this.showNotification('Erro ao salvar dados', 'error');
    }
  }

  // ===== GERENCIAMENTO DE TAREFAS =====
  /**
   * Cria uma nova tarefa com validações de limite e sanitização
   * @param {Object} taskData - Dados da tarefa (titulo, categoria, dataHora, recorrencia)
   * @returns {boolean} - Sucesso da operação
   */
  createTask(taskData) {
    if (this.tasks.length >= CONFIG.MAX_TASKS) {
      this.showNotification('Limite máximo de tarefas atingido!', 'warning');
      return false;
    }

    const task = {
      id: this.generateId(),
      titulo: this.sanitizeInput(taskData.titulo),
      categoria: taskData.categoria,
      emoji: CONFIG.CATEGORIES[taskData.categoria].emoji,
      dataHora: taskData.dataHora,
      completa: false,
      recorrencia: taskData.recorrencia || { tipo: 'unica' },
      datasCompletadas: [],
      criadaEm: new Date().toISOString(),
      atualizadaEm: new Date().toISOString()
    };

    this.tasks.push(task);
    this.saveToStorage();
    this.updateUI();
    this.showNotification('Tarefa criada com sucesso! ✨');
    return true;
  }

  updateTask(taskId, taskData) {
    const taskIndex = this.tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return false;

    const task = this.tasks[taskIndex];
    task.titulo = this.sanitizeInput(taskData.titulo);
    task.categoria = taskData.categoria;
    task.emoji = CONFIG.CATEGORIES[taskData.categoria].emoji;
    task.dataHora = taskData.dataHora;
    task.recorrencia = taskData.recorrencia;
    task.atualizadaEm = new Date().toISOString();

    this.saveToStorage();
    this.updateUI();
    this.showNotification('Tarefa atualizada! 📝');
    return true;
  }

  deleteTask(taskId) {
    const taskIndex = this.tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return false;

    this.tasks.splice(taskIndex, 1);
    this.saveToStorage();
    this.updateUI();
    this.showNotification('Tarefa removida! 🗑️');
    return true;
  }

  toggleTaskComplete(taskId) {
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return false;

    const today = new Date().toISOString().split('T')[0];
    
    if (!task.completa) {
      // Marcar como completa
      task.completa = true;
      if (!task.datasCompletadas.includes(today)) {
        task.datasCompletadas.push(today);
      }
      this.addStars(1);
      this.playSound('taskComplete');
      this.showMotivationalMessage();
      this.createConfetti();
      
      // Criar próxima ocorrência se for recorrente
      this.createRecurringTask(task);
    } else {
      // Desmarcar
      task.completa = false;
      const dateIndex = task.datasCompletadas.indexOf(today);
      if (dateIndex > -1) {
        task.datasCompletadas.splice(dateIndex, 1);
      }
      this.removeStars(1);
    }

    task.atualizadaEm = new Date().toISOString();
    this.saveToStorage();
    this.updateUI();
    this.checkAchievements();
    return true;
  }

  createRecurringTask(originalTask) {
    if (originalTask.recorrencia.tipo === 'unica') return;

    const nextDate = this.calculateNextOccurrence(originalTask);
    if (!nextDate) return;

    const newTask = {
      ...originalTask,
      id: this.generateId(),
      dataHora: nextDate.toISOString(),
      completa: false,
      datasCompletadas: [],
      criadaEm: new Date().toISOString(),
      atualizadaEm: new Date().toISOString()
    };

    this.tasks.push(newTask);
  }

  calculateNextOccurrence(task) {
    const currentDate = new Date(task.dataHora);
    const recurrence = task.recorrencia;

    switch (recurrence.tipo) {
      case 'diaria':
        currentDate.setDate(currentDate.getDate() + 1);
        break;
      
      case 'semanal':
        currentDate.setDate(currentDate.getDate() + 7);
        break;
      
      case 'personalizada':
        if (recurrence.diasSemana && recurrence.diasSemana.length > 0) {
          const nextDay = this.findNextWeekday(currentDate, recurrence.diasSemana);
          if (nextDay) currentDate.setTime(nextDay.getTime());
        }
        break;
    }

    // Verificar se não passou da data fim
    if (recurrence.dataFim && currentDate > new Date(recurrence.dataFim)) {
      return null;
    }

    return currentDate;
  }

  findNextWeekday(currentDate, weekdays) {
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    
    for (let i = 0; i < 7; i++) {
      if (weekdays.includes(nextDate.getDay())) {
        return nextDate;
      }
      nextDate.setDate(nextDate.getDate() + 1);
    }
    
    return null;
  }

  // ===== SISTEMA DE GAMIFICAÇÃO =====
  /**
   * Adiciona estrelas ao total do usuário
   * @param {number} amount - Quantidade de estrelas a adicionar
   */
  addStars(amount) {
    this.stars += amount;
    this.updateStarsDisplay();
  }

  removeStars(amount) {
    this.stars = Math.max(0, this.stars - amount);
    this.updateStarsDisplay();
  }

  checkAchievements() {
    const stats = this.calculateStats();
    const newAchievements = [];

    Object.values(CONFIG.ACHIEVEMENTS).forEach(achievement => {
      if (!this.achievements.includes(achievement.id) && achievement.condition(stats)) {
        this.achievements.push(achievement.id);
        newAchievements.push(achievement);
      }
    });

    if (newAchievements.length > 0) {
      this.showAchievementUnlocked(newAchievements);
    }
  }

  calculateStats() {
    const completedTasks = this.tasks.filter(t => t.completa).length;
    const today = new Date().toISOString().split('T')[0];
    const todayTasks = this.getTasksForDate(today);
    const todayCompleted = todayTasks.filter(t => t.completa).length;
    const perfectDays = todayTasks.length > 0 && todayCompleted === todayTasks.length ? 1 : 0;

    return {
      completedTasks,
      perfectDays,
      consecutiveDays: this.calculateConsecutiveDays(),
      totalStars: this.stars
    };
  }

  calculateConsecutiveDays() {
    // Implementação simplificada - pode ser expandida
    return Math.floor(this.tasks.filter(t => t.completa).length / 3);
  }

  // ===== FILTROS E VISUALIZAÇÕES =====
  getFilteredTasks() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    switch (this.currentView) {
      case 'hoje':
        return this.tasks.filter(task => {
          const taskDate = new Date(task.dataHora);
          const taskDay = new Date(taskDate.getFullYear(), taskDate.getMonth(), taskDate.getDate());
          return taskDay.getTime() === today.getTime();
        });
      
      case 'semana':
        return this.tasks.filter(task => {
          const taskDate = new Date(task.dataHora);
          return taskDate >= today && taskDate < weekFromNow;
        });
      
      case 'todas':
      default:
        return this.tasks;
    }
  }

  getTasksForDate(dateString) {
    return this.tasks.filter(task => {
      const taskDate = new Date(task.dataHora).toISOString().split('T')[0];
      return taskDate === dateString;
    });
  }

  // ===== INTERFACE DO USUÁRIO =====
  updateUI() {
    this.updateTasksList();
    this.updateTasksCount();
    this.updateProgress();
    this.updateStarsDisplay();
    this.updateViewTitle();
  }

  updateTasksList() {
    const tasksList = document.getElementById('tasksList');
    const emptyState = document.getElementById('emptyState');
    const filteredTasks = this.getFilteredTasks();

    if (!tasksList || !emptyState) {
      console.error('Elementos necessários não encontrados no DOM');
      return;
    }

    if (filteredTasks.length === 0) {
      tasksList.innerHTML = '';
      tasksList.appendChild(emptyState);
      emptyState.style.display = 'block';
      return;
    }

    emptyState.style.display = 'none';
    tasksList.innerHTML = '';

    // Ordenar tarefas: não completas primeiro, depois por data
    filteredTasks.sort((a, b) => {
      if (a.completa !== b.completa) {
        return a.completa ? 1 : -1;
      }
      return new Date(a.dataHora) - new Date(b.dataHora);
    });

    filteredTasks.forEach(task => {
      const taskElement = this.createTaskElement(task);
      tasksList.appendChild(taskElement);
    });
  }

  createTaskElement(task) {
    const taskItem = document.createElement('div');
    taskItem.className = `task-item ${task.completa ? 'completed' : ''}`;
    taskItem.dataset.taskId = task.id;

    const taskDate = new Date(task.dataHora);
    const timeString = taskDate.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    const dateString = taskDate.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit'
    });

    taskItem.innerHTML = `
      <div class="task-checkbox ${task.completa ? 'checked' : ''}" data-task-id="${task.id}">
        ${task.completa ? '✓' : ''}
      </div>
      <div class="task-content">
        <div class="task-title">${this.escapeHtml(task.titulo)}</div>
        <div class="task-meta">
          <div class="task-category">
            <span>${task.emoji}</span>
            <span>${CONFIG.CATEGORIES[task.categoria].name}</span>
          </div>
          <div class="task-time">
            <span>🕐</span>
            <span>${timeString} - ${dateString}</span>
          </div>
        </div>
      </div>
      <div class="task-actions">
        <button class="task-action-btn task-edit-btn" data-task-id="${task.id}" title="Editar">
          ✏️
        </button>
        <button class="task-action-btn task-delete-btn" data-task-id="${task.id}" title="Excluir">
          🗑️
        </button>
      </div>
    `;

    return taskItem;
  }

  updateTasksCount() {
    const tasksCount = document.getElementById('tasksCount');
    const filteredTasks = this.getFilteredTasks();
    const completedCount = filteredTasks.filter(t => t.completa).length;
    
    tasksCount.textContent = `${completedCount}/${filteredTasks.length} tarefas`;
  }

  updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const filteredTasks = this.getFilteredTasks();
    
    if (filteredTasks.length === 0) {
      progressFill.style.width = '0%';
      return;
    }

    const completedCount = filteredTasks.filter(t => t.completa).length;
    const percentage = (completedCount / filteredTasks.length) * 100;
    progressFill.style.width = `${percentage}%`;
  }

  updateStarsDisplay() {
    const starsCount = document.getElementById('starsCount');
    starsCount.textContent = this.stars;
  }

  updateViewTitle() {
    const tasksTitle = document.getElementById('tasksTitle');
    const titles = {
      hoje: '📋 Tarefas de Hoje',
      semana: '📊 Tarefas da Semana',
      todas: '📚 Todas as Tarefas'
    };
    tasksTitle.textContent = titles[this.currentView] || titles.todas;
  }

  // ===== MODAIS =====
  openTaskModal(taskId = null) {
    const modal = document.getElementById('taskModal');
    const modalTitle = document.getElementById('modalTitle');
    const form = document.getElementById('taskForm');
    
    this.editingTask = taskId;
    
    if (taskId) {
      const task = this.tasks.find(t => t.id === taskId);
      if (task) {
        modalTitle.textContent = '✏️ Editar Tarefa';
        this.populateTaskForm(task);
      }
    } else {
      modalTitle.textContent = '✨ Nova Tarefa';
      form.reset();
      this.setDefaultDateTime();
    }
    
    modal.classList.add('active');
    document.getElementById('taskTitle').focus();
  }

  closeTaskModal() {
    const modal = document.getElementById('taskModal');
    modal.classList.remove('active');
    this.editingTask = null;
  }

  populateTaskForm(task) {
    const taskDate = new Date(task.dataHora);
    
    document.getElementById('taskTitle').value = task.titulo;
    document.getElementById('taskCategory').value = task.categoria;
    document.getElementById('taskDate').value = taskDate.toISOString().split('T')[0];
    document.getElementById('taskTime').value = taskDate.toTimeString().slice(0, 5);
    document.getElementById('taskRecurrence').value = task.recorrencia.tipo;
    
    this.updateRecurrenceOptions();
    
    if (task.recorrencia.tipo === 'personalizada' && task.recorrencia.diasSemana) {
      task.recorrencia.diasSemana.forEach(day => {
        const checkbox = document.querySelector(`input[value="${day}"]`);
        if (checkbox) checkbox.checked = true;
      });
    }
  }

  setDefaultDateTime() {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    
    document.getElementById('taskDate').value = tomorrow.toISOString().split('T')[0];
    document.getElementById('taskTime').value = '09:00';
  }

  updateRecurrenceOptions() {
    const recurrenceType = document.getElementById('taskRecurrence').value;
    const recurrenceOptions = document.getElementById('recurrenceOptions');
    
    if (recurrenceType === 'personalizada') {
      recurrenceOptions.style.display = 'block';
    } else {
      recurrenceOptions.style.display = 'none';
    }
  }

  // ===== CONFIGURAÇÕES =====
  openSettingsModal() {
    const modal = document.getElementById('settingsModal');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const soundToggle = document.getElementById('soundToggle');
    
    darkModeToggle.checked = this.preferences.theme === 'dark';
    soundToggle.checked = this.preferences.sound;
    
    modal.classList.add('active');
  }

  closeSettingsModal() {
    const modal = document.getElementById('settingsModal');
    modal.classList.remove('active');
  }

  toggleTheme() {
    this.preferences.theme = this.preferences.theme === 'light' ? 'dark' : 'light';
    this.setupTheme();
    this.saveToStorage();
  }

  setupTheme() {
    document.documentElement.setAttribute('data-theme', this.preferences.theme);
  }

  toggleSound() {
    this.preferences.sound = !this.preferences.sound;
    this.saveToStorage();
  }

  playSound(soundType) {
    if (!this.preferences.sound) return;
    
    try {
      const soundUrl = this.preferences.customSounds[soundType];
      if (soundUrl) {
        const audio = new Audio(soundUrl);
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Erro ao reproduzir som:', e));
      }
    } catch (error) {
      console.log('Erro ao reproduzir som:', error);
    }
  }

  // ===== SONS PERSONALIZADOS =====
  openCustomSoundsModal() {
    const modal = document.getElementById('customSoundsModal');
    if (!modal) {
      console.error('Modal de sons personalizados não encontrado');
      return;
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeCustomSoundsModal() {
    const modal = document.getElementById('customSoundsModal');
    if (!modal) {
      console.error('Modal de sons personalizados não encontrado');
      return;
    }
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  handleSoundUpload(event, soundType) {
    const file = event.target.files[0];
    if (!file) return;

    // Verificar se é um arquivo de áudio
    if (!file.type.startsWith('audio/')) {
      this.showNotification('Por favor, selecione um arquivo de áudio válido.', 'error');
      return;
    }

    // Verificar tamanho do arquivo (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      this.showNotification('O arquivo é muito grande. Máximo 5MB.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        this.preferences.customSounds[soundType] = e.target.result;
        this.saveToStorage();
        this.showNotification(`Som ${this.getSoundTypeName(soundType)} atualizado!`, 'success');
      } catch (error) {
        this.showNotification('Erro ao salvar o som.', 'error');
      }
    };
    reader.readAsDataURL(file);
  }

  resetSound(soundType) {
    this.preferences.customSounds[soundType] = CONFIG.DEFAULT_SOUNDS[soundType];
    this.saveToStorage();
    this.showNotification(`Som ${this.getSoundTypeName(soundType)} redefinido!`, 'success');
    
    // Limpar o input file
    const input = document.getElementById(`${soundType}Sound`);
    if (input) input.value = '';
  }

  getSoundTypeName(soundType) {
    const names = {
      taskComplete: 'de Tarefa Completa',
      achievement: 'de Conquista',
      notification: 'de Notificação'
    };
    return names[soundType] || soundType;
  }

  // ===== CONQUISTAS =====
  openAchievementsModal() {
    const modal = document.getElementById('achievementsModal');
    const achievementsList = document.getElementById('achievementsList');
    
    achievementsList.innerHTML = '';
    
    Object.values(CONFIG.ACHIEVEMENTS).forEach(achievement => {
      const isUnlocked = this.achievements.includes(achievement.id);
      const achievementElement = document.createElement('div');
      achievementElement.className = `achievement-item ${isUnlocked ? 'unlocked' : ''}`;
      
      achievementElement.innerHTML = `
        <div class="achievement-icon">${achievement.icon}</div>
        <div class="achievement-content">
          <div class="achievement-title">${achievement.title}</div>
          <div class="achievement-description">${achievement.description}</div>
        </div>
      `;
      
      achievementsList.appendChild(achievementElement);
    });
    
    modal.classList.add('active');
  }

  closeAchievementsModal() {
    const modal = document.getElementById('achievementsModal');
    modal.classList.remove('active');
  }

  showAchievementUnlocked(achievements) {
    achievements.forEach(achievement => {
      setTimeout(() => {
        // Toca som específico da conquista
        this.playSound(`achievement_${achievement.id}`);
        this.showNotification(`🏆 Conquista desbloqueada: ${achievement.title}!`, 'achievement');
        this.createConfetti();
      }, 500);
    });
  }

  // ===== EXPORTAÇÃO =====
  /**
   * Abre o modal de exportação para Google Calendar
   */
  openExportModal() {
    const modal = document.getElementById('exportModal');
    modal.classList.add('active');
  }

  closeExportModal() {
    const modal = document.getElementById('exportModal');
    modal.classList.remove('active');
  }

  /**
   * Exporta tarefas diretamente para a agenda do Android
   */
  exportToAndroidCalendar() {
    const futureTasks = this.tasks.filter(task => {
      const taskDate = new Date(task.dataHora);
      return taskDate >= new Date() && !task.completa;
    });

    if (futureTasks.length === 0) {
      this.showNotification('Nenhuma tarefa futura para exportar!', 'warning');
      return;
    }

    // Para Android, vamos criar um evento por vez ou usar Web Share API
    if (futureTasks.length === 1) {
      this.createAndroidCalendarIntent(futureTasks[0]);
    } else {
      this.shareMultipleTasksToAndroid(futureTasks);
    }
  }

  /**
   * Cria um Intent URL para abrir o calendário do Android com uma tarefa
   */
  createAndroidCalendarIntent(task) {
    const startDate = new Date(task.dataHora);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hora depois
    
    // Formato de data para Android Calendar Intent
    const startTime = startDate.getTime();
    const endTime = endDate.getTime();
    
    const title = encodeURIComponent(`${task.emoji} ${task.titulo}`);
    const description = encodeURIComponent(`Categoria: ${CONFIG.CATEGORIES[task.categoria].name}\n\nCriado pela Agenda da Isadora`);
    
    // Intent URL para Android Calendar
    const intentUrl = `intent://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${this.formatDateForAndroid(startDate)}/${this.formatDateForAndroid(endDate)}&details=${description}#Intent;scheme=https;package=com.google.android.calendar;end`;
    
    // Fallback para web se o app não estiver disponível
    const webUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${this.formatDateForAndroid(startDate)}/${this.formatDateForAndroid(endDate)}&details=${description}`;
    
    try {
      // Tenta abrir o app nativo primeiro
      window.location.href = intentUrl;
      
      // Fallback para web após um pequeno delay
      setTimeout(() => {
        window.open(webUrl, '_blank');
      }, 1000);
      
      this.showNotification('Abrindo calendário do Android... 📱');
    } catch (error) {
      // Se falhar, abre direto no navegador
      window.open(webUrl, '_blank');
      this.showNotification('Abrindo Google Calendar... 📅');
    }
  }

  /**
   * Compartilha múltiplas tarefas usando Web Share API ou ICS
   */
  async shareMultipleTasksToAndroid(tasks) {
    // Verifica se Web Share API está disponível
    if (navigator.share) {
      try {
        const tasksList = tasks.map(task => {
          const date = new Date(task.dataHora).toLocaleDateString('pt-BR');
          const time = new Date(task.dataHora).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
          return `${task.emoji} ${task.titulo} - ${date} às ${time}`;
        }).join('\n');
        
        await navigator.share({
          title: 'Minhas Tarefas - Agenda da Isadora',
          text: `📋 Tarefas para adicionar na agenda:\n\n${tasksList}\n\n🌟 Criado pela Agenda da Isadora`,
        });
        
        this.showNotification('Tarefas compartilhadas! 📱');
      } catch (error) {
        // Se o usuário cancelar ou der erro, volta para ICS
        this.exportToICS();
      }
    } else {
      // Fallback para ICS se Web Share não estiver disponível
      this.exportToICS();
    }
  }

  /**
   * Formata data para Android Calendar Intent (formato: YYYYMMDDTHHMMSSZ)
   */
  formatDateForAndroid(date) {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  }

  exportToICS() {
    const futureTasks = this.tasks.filter(task => {
      const taskDate = new Date(task.dataHora);
      return taskDate >= new Date() && !task.completa;
    });

    if (futureTasks.length === 0) {
      this.showNotification('Nenhuma tarefa futura para exportar!', 'warning');
      return;
    }

    let icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Agenda da Isadora//PT',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH'
    ];

    futureTasks.forEach(task => {
      const startDate = new Date(task.dataHora);
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hora depois
      
      icsContent.push(
        'BEGIN:VEVENT',
        `UID:${task.id}@agenda-isadora.com`,
        `DTSTART:${this.formatDateForICS(startDate)}`,
        `DTEND:${this.formatDateForICS(endDate)}`,
        `SUMMARY:${task.emoji} ${task.titulo}`,
        `DESCRIPTION:Categoria: ${CONFIG.CATEGORIES[task.categoria].name}`,
        `CATEGORIES:${CONFIG.CATEGORIES[task.categoria].name}`,
        'END:VEVENT'
      );
    });

    icsContent.push('END:VCALENDAR');

    const blob = new Blob([icsContent.join('\r\n')], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `agenda-isadora-${new Date().toISOString().split('T')[0]}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    this.showNotification('Arquivo exportado com sucesso! 📅');
  }

  formatDateForICS(date) {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  }

  // ===== NOTIFICAÇÕES E FEEDBACK =====
  showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    const notificationIcon = notification.querySelector('.notification-icon');
    
    const icons = {
      success: '✨',
      error: '❌',
      warning: '⚠️',
      achievement: '🏆'
    };
    
    notificationIcon.textContent = icons[type] || icons.success;
    notificationText.textContent = message;
    
    notification.classList.add('show');
    
    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }

  showMotivationalMessage() {
    const messages = CONFIG.MOTIVATIONAL_MESSAGES;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    this.showNotification(randomMessage);
  }

  createConfetti() {
    const container = document.getElementById('confettiContainer');
    const colors = ['#FFB6C1', '#FF69B4', '#98FB98', '#FFE4B5', '#87CEEB'];
    
    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 3 + 's';
      
      container.appendChild(confetti);
      
      setTimeout(() => {
        if (confetti.parentNode) {
          confetti.parentNode.removeChild(confetti);
        }
      }, 3000);
    }
  }

  // ===== UTILITÁRIOS =====
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Sanitiza entrada do usuário removendo espaços e limitando tamanho
   * Previne ataques de injeção e garante limites de dados
   * @param {string} input - Texto a ser sanitizado
   * @returns {string} - Texto sanitizado
   */
  sanitizeInput(input) {
    return input.trim().substring(0, CONFIG.MAX_TITLE_LENGTH);
  }

  /**
   * Escapa caracteres HTML para prevenir XSS
   * @param {string} text - Texto a ser escapado
   * @returns {string} - Texto com HTML escapado
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  clearAllData() {
    if (confirm('⚠️ Tem certeza que deseja apagar todos os dados? Esta ação não pode ser desfeita!')) {
      Object.values(CONFIG.STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      
      this.tasks = [];
      this.stars = 0;
      this.achievements = [];
      this.preferences = {
        theme: 'light',
        sound: true,
        notifications: false
      };
      
      this.setupTheme();
      this.updateUI();
      this.showNotification('Todos os dados foram apagados! 🗑️');
    }
  }

  // ===== EVENT LISTENERS =====
  /**
   * Configura todos os event listeners da aplicação
   * Inclui formulários, botões, modais, navegação e atalhos de teclado
   */
  setupEventListeners() {
    // Botão adicionar tarefa
    document.getElementById('addTaskBtn').addEventListener('click', () => {
      this.openTaskModal();
    });

    // Formulário de tarefa
    document.getElementById('taskForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleTaskSubmit();
    });

    // Botões do modal de tarefa
    document.getElementById('modalClose').addEventListener('click', () => {
      this.closeTaskModal();
    });
    
    document.getElementById('cancelBtn').addEventListener('click', () => {
      this.closeTaskModal();
    });

    // Recorrência
    document.getElementById('taskRecurrence').addEventListener('change', () => {
      this.updateRecurrenceOptions();
    });

    // Filtros de visualização
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.setCurrentView(e.target.dataset.filter);
      });
    });

    // Navegação inferior
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.setCurrentView(e.target.dataset.view);
      });
    });

    // Configurações
    document.getElementById('settingsBtn').addEventListener('click', () => {
      this.openSettingsModal();
    });
    
    document.getElementById('settingsModalClose').addEventListener('click', () => {
      this.closeSettingsModal();
    });
    
    document.getElementById('darkModeToggle').addEventListener('change', () => {
      this.toggleTheme();
    });
    
    document.getElementById('soundToggle').addEventListener('change', () => {
      this.toggleSound();
    });
    
    // Sons personalizados
    const customSoundsBtn = document.getElementById('customSoundsBtn');
    if (customSoundsBtn) {
      customSoundsBtn.addEventListener('click', () => {
        this.openCustomSoundsModal();
      });
    }
    
    const customSoundsModalClose = document.getElementById('customSoundsModalClose');
    if (customSoundsModalClose) {
      customSoundsModalClose.addEventListener('click', () => {
        this.closeCustomSoundsModal();
      });
    }
    
    // Upload de sons
    const taskCompleteSound = document.getElementById('taskCompleteSound');
    if (taskCompleteSound) {
      taskCompleteSound.addEventListener('change', (e) => {
        this.handleSoundUpload(e, 'taskComplete');
      });
    }
    
    const achievementSound = document.getElementById('achievementSound');
    if (achievementSound) {
      achievementSound.addEventListener('change', (e) => {
        this.handleSoundUpload(e, 'achievement');
      });
    }
    
    const notificationSound = document.getElementById('notificationSound');
    if (notificationSound) {
      notificationSound.addEventListener('change', (e) => {
        this.handleSoundUpload(e, 'notification');
      });
    }
    
    // Testar sons
    const playTaskCompleteSound = document.getElementById('playTaskCompleteSound');
    if (playTaskCompleteSound) {
      playTaskCompleteSound.addEventListener('click', () => {
        this.playSound('taskComplete');
      });
    }
    
    const playAchievementSound = document.getElementById('playAchievementSound');
    if (playAchievementSound) {
      playAchievementSound.addEventListener('click', () => {
        this.playSound('achievement');
      });
    }
    
    const playNotificationSound = document.getElementById('playNotificationSound');
    if (playNotificationSound) {
      playNotificationSound.addEventListener('click', () => {
        this.playSound('notification');
      });
    }
    
    // Reset sons
    const resetTaskCompleteSound = document.getElementById('resetTaskCompleteSound');
    if (resetTaskCompleteSound) {
      resetTaskCompleteSound.addEventListener('click', () => {
        this.resetSound('taskComplete');
      });
    }
    
    const resetAchievementSound = document.getElementById('resetAchievementSound');
    if (resetAchievementSound) {
      resetAchievementSound.addEventListener('click', () => {
        this.resetSound('achievement');
      });
    }
    
    const resetNotificationSound = document.getElementById('resetNotificationSound');
    if (resetNotificationSound) {
      resetNotificationSound.addEventListener('click', () => {
        this.resetSound('notification');
      });
    }

    // Conquistas
    document.getElementById('achievementsBtn').addEventListener('click', () => {
      this.openAchievementsModal();
    });
    
    document.getElementById('achievementsModalClose').addEventListener('click', () => {
      this.closeAchievementsModal();
    });

    // Exportação
    document.getElementById('exportBtn').addEventListener('click', () => {
      this.openExportModal();
    });
    
    document.getElementById('exportModalClose').addEventListener('click', () => {
      this.closeExportModal();
    });
    
    document.getElementById('exportAndroidBtn').addEventListener('click', () => {
      this.exportToAndroidCalendar();
      this.closeExportModal();
    });
    
    document.getElementById('downloadIcsBtn').addEventListener('click', () => {
      this.exportToICS();
    });

    // Limpar dados
    document.getElementById('clearDataBtn').addEventListener('click', () => {
      this.clearAllData();
    });

    // Delegação de eventos para tarefas
    document.getElementById('tasksList').addEventListener('click', (e) => {
      const taskId = e.target.dataset.taskId;
      if (!taskId) return;

      if (e.target.classList.contains('task-checkbox')) {
        // Atualizar visual imediatamente
        const taskItem = e.target.closest('.task-item');
        const task = this.tasks.find(t => t.id === taskId);
        
        if (task) {
          // Toggle visual imediato
          const isCompleting = !task.completa;
          
          if (isCompleting) {
            taskItem.classList.add('completed');
            e.target.classList.add('checked');
            e.target.textContent = '✓';
            taskItem.querySelector('.task-title').style.textDecoration = 'line-through';
            taskItem.querySelector('.task-title').style.color = 'var(--text-secondary)';
          } else {
            taskItem.classList.remove('completed');
            e.target.classList.remove('checked');
            e.target.textContent = '';
            taskItem.querySelector('.task-title').style.textDecoration = 'none';
            taskItem.querySelector('.task-title').style.color = 'var(--text-primary)';
          }
        }
        
        // Executar lógica de negócio
        this.toggleTaskComplete(taskId);
      } else if (e.target.classList.contains('task-edit-btn')) {
        this.openTaskModal(taskId);
      } else if (e.target.classList.contains('task-delete-btn')) {
        if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
          this.deleteTask(taskId);
        }
      }
    });

    // Fechar modais clicando fora
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    });

    // Atalhos de teclado
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
          modal.classList.remove('active');
        });
      }
    });
  }

  handleTaskSubmit() {
    const formData = new FormData(document.getElementById('taskForm'));
    const title = document.getElementById('taskTitle').value.trim();
    const category = document.getElementById('taskCategory').value;
    const date = document.getElementById('taskDate').value;
    const time = document.getElementById('taskTime').value;
    const recurrenceType = document.getElementById('taskRecurrence').value;

    if (!title || !category || !date || !time) {
      this.showNotification('Por favor, preencha todos os campos obrigatórios!', 'warning');
      return;
    }

    const dateTime = new Date(`${date}T${time}`);
    if (dateTime < new Date() && !this.editingTask) {
      this.showNotification('Não é possível criar tarefas no passado!', 'warning');
      return;
    }

    const recurrence = { tipo: recurrenceType };
    
    if (recurrenceType === 'personalizada') {
      const selectedDays = Array.from(document.querySelectorAll('.weekday-checkbox:checked'))
        .map(cb => parseInt(cb.value));
      
      if (selectedDays.length === 0) {
        this.showNotification('Selecione pelo menos um dia da semana!', 'warning');
        return;
      }
      
      recurrence.diasSemana = selectedDays;
    }

    const taskData = {
      titulo: title,
      categoria: category,
      dataHora: dateTime.toISOString(),
      recorrencia: recurrence
    };

    let success;
    if (this.editingTask) {
      success = this.updateTask(this.editingTask, taskData);
    } else {
      success = this.createTask(taskData);
    }

    if (success) {
      this.closeTaskModal();
    }
  }

  setCurrentView(view) {
    this.currentView = view;
    
    // Atualizar botões de filtro
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === view);
    });
    
    // Atualizar navegação inferior
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === view);
    });
    
    this.updateUI();
  }
}

// ===== INICIALIZAÇÃO DA APLICAÇÃO =====
/**
 * Inicializa a aplicação quando o DOM estiver carregado
 * Cria instância global do AppState para gerenciar toda a aplicação
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log('🌟 Iniciando Agenda da Isadora...');
  window.app = new AppState();
  console.log('✅ Aplicação inicializada com sucesso!');
});

// ===== SERVICE WORKER =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registrado com sucesso:', registration.scope);
      })
      .catch(error => {
        console.log('Falha ao registrar SW:', error);
      });
  });
}
