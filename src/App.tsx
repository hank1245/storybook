import TypingEffect from "./components/TypingEffect/TypingEffect";

export function App() {
  return (
    <div className="app-shell">
      <main className="app-content">
        <div style={{ marginTop: 24 }}>
          <TypingEffect
            text="This is a typing demo."
            speed={14}
            center={false}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
