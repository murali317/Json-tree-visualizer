# JSON Tree Visualizer

A modern, interactive JSON tree visualizer built with React, React Flow, and Tailwind CSS.

## Features

- **Visualize JSON as a Tree:** Instantly convert any JSON object into an interactive, expandable tree graph.
- **Search & Highlight:** Search for keys, values, or paths. Navigate between multiple matches with ease.
- **Copy JSON Path:** Click any node to copy its full JSON path to your clipboard.
- **Dark/Light Mode:** Toggle between beautiful dark and light themes.
- **Download as Image:** Export the current tree visualization as a PNG image.
- **Responsive & Fast:** Built with Vite, SWC, and the latest React for top performance.

## Demo

Screenshots of JSON Tree Visualizer

<img width="955" height="483" alt="{1778D8B9-0510-415E-BE67-172E8A620C6D}" src="https://github.com/user-attachments/assets/2ae62f5a-d413-45bc-a57d-0d9fed48a5ad" />

<img width="957" height="480" alt="{9948B754-843D-49BF-B166-78F9B5F8756C}" src="https://github.com/user-attachments/assets/11863b30-dc52-4192-b0d8-adb8a1aedf11" />

<img width="947" height="475" alt="{675CA776-68AA-4DFF-A972-AF1CB6FE4778}" src="https://github.com/user-attachments/assets/00458130-6408-4c9d-9fd5-38c3f084ccec" />


## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/json-tree-visualizer.git
   cd json-tree-visualizer
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Start the development server:**
   ```sh
   npm run dev
   ```
4. **Open in your browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

## Usage

- Paste or type your JSON in the input area.
- Click **Visualize** to render the tree.
- Use the search bar to find keys/values/paths.
- Click nodes to copy their JSON path.
- Use the top-right controls to toggle theme or download the tree as an image.

## Tech Stack

- [React 19](https://react.dev/)
- [React Flow](https://reactflow.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [html-to-image](https://github.com/bubkoo/html-to-image)

## Project Structure

```
src/
  components/
    JsonInput.jsx      # JSON input and controls
    JsonTree.jsx       # React Flow visualization
    SearchBar.jsx      # Search and navigation
    ThemeToggle.jsx    # Dark/light mode toggle
    ControlsBar.jsx    # (Optional) extra controls
  utils/
    jsonToGraph.js     # JSON → graph conversion
    jsonPathFinder.js  # Path/key/value search logic
  App.jsx              # Main app logic
  main.jsx             # Entry point
```

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

> Made with ❤️ using React Flow and Tailwind CSS by Krishna 🦚
