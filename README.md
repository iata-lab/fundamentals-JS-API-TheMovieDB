# fundamentals-JS-API-TheMovieDB
Research and use The Movie Database (TMDb) movie API to create a dynamic movie search engine.


# 🎬 Movie Search Engine with The Movie Database (TMDb) API

## 🔍 Objective

Explore and use **The Movie Database (TMDb)** API to create a dynamic movie search engine.

---

## ✅ Steps to Follow

1. **Sign up** on the official TMDb website: [https://www.themoviedb.org](https://www.themoviedb.org)
2. **Generate an API KEY** (or Access Token) from the account settings / API section.

---

## 🛠️ Functional Requirements

Create an application that allows:

- An **input** where the user can type the name of a movie.
- Upon searching, a request to the API must be made with the entered name.
- Display a list of results including:

  - 📷 **Image** (movie poster)
  - 🎞️ **Title**
  - 📝 **Description**
  - 🎭 **Genres** of the movie (obtained via `genre_ids`)

---

## 🔧 Technical Recommendations

- Use `fetch` or `axios` to make HTTP requests.
- To display genres correctly, map the `genre_ids` array to the complete genre list obtained from the API.
- Apply styles with CSS (optionally use Bootstrap for responsive design).

---

## 📚 Useful Resources

- [Official API Documentation](https://developer.themoviedb.org/docs)
- [Movie Genre List (endpoint)](https://developer.themoviedb.org/reference/genre-movie-list)