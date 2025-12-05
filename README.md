# JDS MOVIES 🎬

Web application to explore movies using The Movie Database (TMDb) API. Discover trending movies, search by title, explore by categories, and save your favorites.

## 📋 Features

- **Trending Movies**: View the most popular movies of the moment
- **Search**: Find movies by name
- **Categories**: Explore movies by genre (Action, Drama, Romance, etc.)
- **Movie Details**: Complete information including synopsis, rating, and related movies
- **Favorites**: Save and manage your favorite movies
- **Responsive Design**: Adapted for mobile and desktop devices

## 🛠️ Technologies

- **HTML5**
- **CSS3**
- **Vanilla JavaScript**
- **Axios** - For HTTP requests
- **The Movie Database (TMDb) API** - Movie data source

## 🚀 Installation

1. Clone the repository:
```bash
git clone https://github.com/juanda404/API-REST-MOVIES
cd jds-movies
```

2. Create a `src/secrets.js` file with your TMDb API Key:
```javascript
const API_KEY = 'your_api_key_here';
```

3. Open `index.html` in your browser or use a local server:
```bash
# With Python 3
python -m http.server 8000

# With Node.js (http-server)
npx http-server
```

## 🔑 Getting API Key

1. Sign up at [The Movie Database](https://www.themoviedb.org/)
2. Go to your profile > Settings > API
3. Request an API Key (it's free)
4. Copy your API Key to the `secrets.js` file

## 📁 Project Structure

```
jds-movies/
├── index.html
├── styles/
│   └── app.css
├── src/
│   ├── secrets.js      # API Key (do not include in git)
│   ├── node.js         # DOM selectors
│   ├── main.js         # Main logic
│   └── navigation.js   # Navigation system
└── README.md
```

## 🎯 Usage

### Main Navigation
- **Home**: Shows trending movies and categories
- **Search**: Use the search field in the header
- **Categories**: Click any category to see movies of that genre
- **Details**: Click any movie to see complete information

### Favorites Management
- Click on a movie to mark it as favorite
- Your favorites are saved in the browser (LocalStorage)
- View all your favorite movies in the "Movies Favorites" section

## 🌐 API Endpoints Used

```javascript
// Trending movies
GET /trending/movie/day

// Movie search
GET /search/movie?query={query}

// Genre list
GET /genre/movie/list

// Movies by category
GET /discover/movie?with_genres={genreId}

// Movie details
GET /movie/{movieId}

// Similar movies
GET /movie/{movieId}/recommendations
```

## 🎨 Customization

### Fonts
The project uses Google Fonts:
- **Dosis** (700, 800) - For titles
- **Red Hat Display** (400, 500) - For general text

### Colors
You can customize colors by editing `styles/app.css`

## 📝 Notes

- The application uses LocalStorage to save favorite movies
- Internet connection required to load movies
- Images are loaded from TMDb servers
- Respect API rate limiting (40 requests per 10 seconds)

## 🤝 Contributing

Contributions are welcome. Please:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is under the MIT License.

## 👤 Author

**JuanDa**

---

⭐ If you liked this project, give it a star on GitHub

## 🔗 Useful Links

- [TMDb API Documentation](https://developers.themoviedb.org/3)
- [TMDb API Terms of Use](https://www.themoviedb.org/documentation/api/terms-of-use)