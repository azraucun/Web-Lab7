# Assignment 7 — Online Shopping

A multi-page online shop built with React, Vite, React Router, Context + `useReducer` and Zustand. Products come from the DummyJSON API.

**Run:** `npm install` then `npm run dev` (http://localhost:5173)
**Demo account:** `230408015@st.biruni.edu.tr` / `demo123456`

## File organization

```
src/
 ├─ api/         productsApi.js (fetch + AbortSignal), authApi.js (simulated login)
 ├─ hooks/       useFetch.js, useLocalStorage.js
 ├─ context/     AuthContext.jsx (AuthProvider, useAuth)
 ├─ store/       cartStore.js (Zustand cart + localStorage persistence)
 ├─ components/  Layout, NavBar, ProductCard, ProtectedRoute
 ├─ pages/       Home, ProductList, ProductDetail, Cart, Login, NotFound
 ├─ App.jsx      routes
 └─ main.jsx     BrowserRouter > AuthProvider > App
```

## Reasoning questions

**1. State choices.**
- Signed-in user: Context + `useReducer`, because many distant components read it and it rarely changes.
- Cart: Zustand store, because it changes often and many components read it.
- Filters: URL query string, so a filtered view can be shared and survives reload.
- Product list: fetched with `useFetch` in `ProductList` (server data); the filtered list is derived during render.
- Theme: `useLocalStorage` in `Layout`, passed as a prop to its child `NavBar`.

**2. Context versus store.** The user only changes at login/logout, so Context is enough. The cart changes on every click and Context has no selectors, so every consumer (NavBar, 100 product cards) would re-render each time. With Zustand, the cards select only `addItem` and the NavBar selects only the item count, so they skip unrelated updates.

**3. Custom hooks.** `useFetch` shares the logic: the reducer, the abort controller and the cleanup. It does not share state: each call has its own `loading`/`error`/`data`, and the caller decides what to fetch and which inputs it depends on.

**4. Route parameters.** `useParams()` returns a string, so `id` is `'7'`, not `7`. In `ProductDetail` I use `Number(id)` for the previous/next links, otherwise `'7' + 1` becomes `'71'`.

**5. Protected routes.** `ProtectedRoute` only changes what the browser shows; all the code (even the demo password) is visible to anyone. Real security needs a server that verifies credentials and checks a session or token on every request.

**6. Deep links.** A static file server has no file for `/products/3`, so reloading returns 404. Vite's dev server falls back to `index.html` for unknown paths; in production the server needs the same fallback rule.

## Self-study notes

- **Updating one query parameter:** `setSearchParams` accepts a function. I copy the current params with `new URLSearchParams(prev)`, `set` or `delete` one key, and return the copy, so the other filters are kept.
- **Safe localStorage init:** `loadCartItems()` returns `[]` if nothing is stored, if `JSON.parse` throws (`try/catch`), if the value is not an array, and drops items with the wrong shape. Saving uses `useCartStore.subscribe` outside React, only when `items` changed.
- **Light/dark theme:** `Layout` sets `className="app light"` or `"app dark"`. CSS custom properties (`--bg`, `--text`, ...) are defined for each class, and all other rules use `var(--...)`.

## Challenges

- The project ended up in a nested folder, which caused `ENOENT package.json` and a missing-import error until I checked paths with `ls`/`find`.
- Safari's console did not accept `const x = await import(...)`, so I tested with `.then(...)`.
- `StrictMode` runs effects twice in development; the cancelled first request showed that the `useFetch` cleanup works.
- Selectors that return a new object cause extra re-renders, so every value is selected separately.