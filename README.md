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

<img width="950" height="481" alt="{33B61B6B-9BFA-4760-AFAC-C0EFF906C34F}" src="https://github.com/user-attachments/assets/3c4bce5d-148d-4f9f-a3a9-99693000f744" />

<img width="953" height="480" alt="{933794F1-044E-454A-ADAE-A972D8045463}" src="https://github.com/user-attachments/assets/0ee0da77-0a9a-4780-947c-569d1bd6bc70" />



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
