# 🤖 WhatsApp Jobs Bot

A smart WhatsApp bot for managing and displaying job opportunities with a comprehensive admin dashboard.

## ✨ Features

- 🤖 Smart WhatsApp bot with dynamic message handling
- 📊 Comprehensive admin dashboard
- 🗄️ SQLite database for data management
- 📱 Dynamic QR Code for WhatsApp connection
- 🌙 Dark mode support in dashboard
- 🔄 Dynamic management of categories and jobs
- 📝 Customizable messages
- 🔢 Support for Arabic and English numerals

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/whatsjob-bot.git
cd whatsjob-bot
```

2. **Install dependencies**
```bash
npm install
```

3. **Initialize database**
```bash
npm run init-db
```

4. **Start the bot**
```bash
npm run dev
```

5. **Access the dashboard**
```
http://localhost:3000/dashboard
```

## 📱 How to Use

### For Users
1. Write **"وظائف"** (jobs) in WhatsApp
2. Choose the category number
3. Get the list of jobs with links

### For Administrators
1. Open the dashboard
2. Scan QR Code to connect
3. Manage settings, categories, and jobs

## 🛠️ Dashboard Features

### 📊 Main Dashboard
- Quick statistics
- QR Code display
- Quick links to sections

### ⚙️ Settings
- Welcome message
- Menu messages
- Error messages

### 📂 Categories
- Add new categories
- Edit existing categories
- Delete categories
- Reorder categories

### 💼 Jobs
- Add new jobs
- Edit jobs
- Delete jobs
- Organize jobs by category

## 🔧 Available Scripts

```bash
npm run dev          # Development mode with auto-restart
npm start           # Production mode
npm run init-db     # Initialize database
```

## 🌐 Access Points

- **Dashboard:** http://localhost:3000/dashboard
- **Main Page:** http://localhost:3000
- **API:** http://localhost:3000/api

## 🗄️ Database Structure

### Tables
- `settings` - Bot configuration
- `categories` - Job categories
- `jobs` - Job listings

### Initial Data
- 5 default settings
- 6 job categories
- 12 sample jobs

## 🌙 Dark Mode

The dashboard supports dark mode with:
- Smooth switching between modes
- Preference saved in browser
- Responsive design for all devices

## 🔢 Number Support

The bot supports both:
- English numerals: 1, 2, 3, 4, 5, 6
- Arabic numerals: ١, ٢, ٣, ٤, ٥, ٦

## 📁 Project Structure

```
whatsjob-bot/
├── server/
│   ├── server.js          # Main server
│   ├── routes.js          # API routes
│   └── whatsappBot.js     # WhatsApp bot
├── bot/
│   └── messageHandler.js  # Message handler
├── dashboard/
│   ├── routes.js          # Dashboard routes
│   ├── views/             # EJS templates
│   └── style.css          # Styles
├── db/
│   ├── init.js            # Database initialization
│   └── jobs.db            # Database file
└── README.md              # This file
```

## 🚨 Troubleshooting

### Common Issues

1. **Bot not responding**
```bash
taskkill /IM node.exe /F
npm run dev
```

2. **QR Code not showing**
```bash
Remove-Item -Recurse -Force .wwebjs_auth
npm run dev
```

3. **Database errors**
```bash
npm run init-db
```

4. **Package issues**
```bash
Remove-Item -Recurse -Force node_modules
npm install
```

## 📦 Dependencies

- `express` - Web framework
- `sqlite3` - Database
- `whatsapp-web.js` - WhatsApp bot
- `ejs` - Template engine
- `cors` - CORS middleware
- `nodemon` - Auto-restart
- `body-parser` - Request parsing
- `dotenv` - Environment variables
- `axios` - HTTP requests
- `qrcode-terminal` - QR Code display

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

If you encounter any issues:
1. Check the `COMMANDS.md` file for quick commands
2. Review the `CHECKLIST.md` file for troubleshooting
3. Read the `README_AR.md` file for comprehensive documentation

---

**Developer:** Development Team
**Version:** 1.0.0
**Last Updated:** 2024
