# Todo List App - Modern Task Management

A modern, production-ready todo list application built with Next.js, TypeScript, and TailwindCSS. This application demonstrates best practices in React development, state management, and user experience design.

## ✨ Features

### Core Functionality
- ✅ **CRUD Operations**: Create, read, update, and delete todos
- 🔐 **User Authentication**: Secure login and registration system
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Clean, intuitive interface with smooth animations

### Advanced Features
- 🏷️ **Categories**: Organize todos with custom categories and colors
- ⚡ **Priorities**: Set priority levels (Low, Medium, High, Urgent)
- 🔍 **Search & Filter**: Find todos by title, description, status, priority, or category
- 📅 **Due Dates**: Set and track deadlines for your tasks
- 🔄 **Drag & Drop**: Reorder todos with intuitive drag-and-drop functionality
- 🎭 **Theme Switching**: Multiple beautiful themes including dark mode
- 📊 **Real-time Updates**: Instant UI updates with optimistic rendering
- 💾 **Offline Support**: PWA capabilities for offline usage
- 🔔 **Notifications**: Toast notifications for user feedback

### Technical Features
- 🚀 **TypeScript**: Full type safety throughout the application
- ⚛️ **React Hooks**: Modern React patterns with custom hooks
- 🎯 **Form Validation**: Robust form validation with Zod schemas
- 🎨 **TailwindCSS**: Utility-first CSS framework for rapid styling
- 📦 **Component Library**: Reusable UI components
- 🧪 **Testing Ready**: Set up for unit, integration, and E2E testing
- 🐳 **Docker Support**: Containerized for easy deployment
- 🔄 **CI/CD Ready**: GitHub Actions workflow configuration

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0.0 or higher
- npm 8.0.0 or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/todo-list-app.git
   cd todo-list-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Demo Credentials
- **Email**: demo@example.com
- **Password**: password

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── login/             # Authentication pages
│   └── register/
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── TodoItem.tsx      # Individual todo component
│   ├── CreateTodoModal.tsx
│   ├── EditTodoModal.tsx
│   ├── CategoryManager.tsx
│   ├── ThemeSwitcher.tsx
│   └── DraggableTodoList.tsx
├── contexts/             # React contexts
│   └── AuthContext.tsx
├── hooks/               # Custom React hooks
│   ├── useAuth.ts
│   ├── useTodos.ts
│   └── useCategories.ts
├── lib/                 # Utility functions
│   ├── api.ts          # API client
│   ├── mockApi.ts      # Mock API for frontend-only demo
│   └── utils.ts        # Helper functions
└── types/              # TypeScript type definitions
    └── index.ts
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests

## 🎨 Themes

The application includes 11 beautiful themes:
- Light & Dark modes
- Cupcake, Bumblebee, Synthwave
- Halloween, Fantasy, Dracula
- Aqua, Luxury, Night

## 📱 PWA Features

- **Offline Support**: Works without internet connection
- **Installable**: Can be installed as a native app
- **Responsive**: Optimized for all screen sizes
- **Fast Loading**: Cached resources for quick access

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Type Checking
```bash
npm run type-check
```

## 🐳 Docker

### Build Docker Image
```bash
docker build -t todo-list-app .
```

### Run Container
```bash
docker run -p 3000:3000 todo-list-app
```

### Docker Compose
```bash
docker-compose up
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify

### Manual Deployment
1. Build: `npm run build`
2. Start: `npm run start`
3. Configure reverse proxy (nginx/Apache)

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_NAME=Todo List App
```

### Customization
- **Themes**: Modify `tailwind.config.js`
- **API**: Update `src/lib/api.ts`
- **Styling**: Edit `src/app/globals.css`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Zod](https://zod.dev/) - Schema validation
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd) - Drag and drop

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the documentation
- Contact the development team

---

**Made with ❤️ by the Todo List App Team**