# 📅 Agenda da Isadora

> Web app de agenda/planner educativo desenvolvido especialmente para crianças, com foco em organização de tarefas escolares e rotinas diárias de forma lúdica e intuitiva.

## 🌟 Funcionalidades

### ✅ Gerenciamento de Tarefas
- **CRUD Completo**: Criar, editar, deletar e marcar tarefas como concluídas
- **Categorias com Emojis**: 📚 Escola, 🚿 Banho, 🥋 Karatê, 🎵 Música, 🧹 Organização
- **Tarefas Recorrentes**: Única, diária, semanal ou personalizada
- **Três Visualizações**: Hoje, Semana, Todas as tarefas

### 🎮 Gamificação
- **Sistema de Estrelas**: Ganhe estrelas ao completar tarefas
- **Conquistas Desbloqueáveis**: 6 conquistas diferentes para motivar
- **Animações de Recompensa**: Confetti e feedback visual
- **Mensagens Motivacionais**: Frases encorajadoras aleatórias

### 📱 PWA (Progressive Web App)
- **Instalável**: Funciona como app nativo no celular
- **Offline**: Funciona sem internet após primeira visita
- **Responsivo**: Design mobile-first otimizado para tablets e celulares
- **Modo Claro/Escuro**: Alternância de tema conforme preferência

### 📅 Integração Google Calendar
- **Exportação .ics**: Baixe suas tarefas em formato compatível
- **Eventos Recorrentes**: Suporte completo a tarefas repetitivas
- **Instruções Visuais**: Guia passo-a-passo para importar no Google

## 🚀 Como Usar

### 📲 Instalação como App
1. Acesse o site no seu celular/tablet
2. No menu do navegador, toque em "Adicionar à tela inicial"
3. Confirme a instalação
4. Use como um app normal!

### ➕ Adicionando Tarefas
1. Toque no botão **+** (azul, canto inferior direito)
2. Preencha o título da tarefa
3. Escolha uma categoria com emoji
4. Defina data e hora
5. Configure recorrência se necessário
6. Toque em **"Salvar"**

### ⭐ Sistema de Estrelas
- **1 estrela** por tarefa concluída
- Acumule estrelas para desbloquear conquistas
- Veja seu progresso no cabeçalho do app

### 🏆 Conquistas Disponíveis
- **Primeira Tarefa**: Complete sua primeira tarefa
- **Dia Perfeito**: Complete todas as tarefas do dia
- **Semana Produtiva**: 7 dias consecutivos com tarefas completas
- **Super Organizada**: 20 tarefas completadas no total
- **Mestre da Agenda**: 50 tarefas completadas
- **Estrela Dourada**: 100 estrelas acumuladas

### 📤 Exportar para Google Calendar
1. Toque no ícone de **configurações** (⚙️)
2. Selecione **"Exportar para Google"**
3. Escolha o período (próximos 30 dias)
4. Toque em **"Baixar .ics"**
5. Siga as instruções para importar no Google Calendar

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript Vanilla
- **Armazenamento**: localStorage (navegador)
- **PWA**: Service Worker + Web App Manifest
- **Exportação**: Formato iCalendar (.ics)
- **Deploy**: Vercel (hospedagem gratuita)

## 📁 Estrutura do Projeto

```
📦 agenda-isadora/
├── 📄 index.html          # Estrutura HTML principal
├── 🎨 style.css           # Estilos CSS responsivos
├── ⚡ script.js           # Lógica JavaScript
├── 📱 manifest.json       # Configuração PWA
├── 🔧 sw.js              # Service Worker (offline)
└── 📖 README.md          # Esta documentação
```

## 🚀 Deploy no Vercel

### Pré-requisitos
- Conta no [GitHub](https://github.com)
- Conta no [Vercel](https://vercel.com)

### Passos para Deploy

1. **Criar Repositório no GitHub**
   ```bash
   git init
   git add .
   git commit -m "🎉 Agenda da Isadora - Versão inicial"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/agenda-isadora.git
   git push -u origin main
   ```

2. **Deploy no Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com GitHub
   - Clique em "New Project"
   - Selecione o repositório `agenda-isadora`
   - Configure:
     - **Framework Preset**: Other
     - **Root Directory**: `./`
     - **Build Command**: (deixe vazio)
     - **Output Directory**: `./`
   - Clique em "Deploy"

3. **Configurar Domínio (Opcional)**
   - No painel do Vercel, vá em "Settings" > "Domains"
   - Adicione um domínio personalizado se desejar

### 🔄 Atualizações Automáticas
Após o primeiro deploy, qualquer push para a branch `main` do GitHub irá automaticamente atualizar o site no Vercel.

## 🧪 Testando Localmente

### Opção 1: Servidor HTTP Simples
```bash
# Com Node.js instalado
npx serve . -p 3000

# Ou com Python
python -m http.server 3000
```

### Opção 2: Live Server (VS Code)
1. Instale a extensão "Live Server"
2. Clique direito em `index.html`
3. Selecione "Open with Live Server"

## 📱 Testando PWA

### Chrome DevTools
1. Abra o site no Chrome
2. Pressione `F12` para abrir DevTools
3. Vá na aba "Application"
4. Verifique:
   - **Manifest**: Configurações do PWA
   - **Service Workers**: Status do cache offline
   - **Storage**: Dados salvos no localStorage

### Teste de Instalação
1. Acesse o site no celular
2. Verifique se aparece o banner de instalação
3. Teste a instalação e uso offline

## 🔧 Personalização

### Adicionando Novas Categorias
No arquivo `script.js`, localize o array `categorias` e adicione novos itens:

```javascript
const categorias = [
  { id: 'escola', nome: 'Tarefa da Escola', emoji: '📚' },
  { id: 'banho', nome: 'Tomar Banho', emoji: '🚿' },
  // Adicione aqui suas novas categorias
  { id: 'nova', nome: 'Nova Categoria', emoji: '🎯' }
];
```

### Modificando Cores do Tema
No arquivo `style.css`, altere as variáveis CSS:

```css
:root {
  --primary-color: #FFB6C1;     /* Rosa principal */
  --secondary-color: #87CEEB;   /* Azul secundário */
  --accent-color: #98FB98;      /* Verde destaque */
  /* Modifique conforme desejado */
}
```

### Adicionando Novas Conquistas
No arquivo `script.js`, localize o array `conquistas` e adicione:

```javascript
const conquistas = [
  {
    id: 'nova_conquista',
    nome: 'Nome da Conquista',
    descricao: 'Descrição do que fazer',
    emoji: '🎯',
    condicao: (stats) => stats.tarefasCompletas >= 10
  }
];
```

## 🐛 Solução de Problemas

### App não instala no celular
- Verifique se o `manifest.json` está acessível
- Confirme que o site está sendo servido via HTTPS
- Teste em diferentes navegadores

### Dados não salvam
- Verifique se o localStorage está habilitado
- Confirme que não está em modo privado/incógnito
- Teste em outro navegador

### Service Worker não funciona
- Verifique o console do navegador (F12)
- Confirme que o `sw.js` está acessível
- Teste a funcionalidade offline

### Exportação .ics não funciona
- Verifique se há tarefas futuras para exportar
- Confirme que o navegador suporta download de arquivos
- Teste em desktop se estiver no mobile

## 📞 Suporte

Se encontrar algum problema ou tiver sugestões:

1. **Verifique este README** para soluções comuns
2. **Teste em outro navegador** para isolar o problema
3. **Verifique o console** (F12) para mensagens de erro
4. **Documente o problema** com passos para reproduzir

## 📄 Licença

Este projeto foi desenvolvido para uso educacional e pessoal. Sinta-se livre para modificar e adaptar conforme suas necessidades.

---

**Desenvolvido com ❤️ para tornar a organização divertida e educativa!**

*Versão 1.0.0 - Janeiro 2024*