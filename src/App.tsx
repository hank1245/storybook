import TypingEffect from "./components/TypingEffect/TypingEffect";
import GlitchText from "./components/GlitchText/GlitchText";

export function App() {
  return (
    <div className="app-shell">
      <main className="app-content">
        <div style={{ marginTop: 24 }}>
          <TypingEffect
            text="You can type anything you want."
            speed={14}
            center={false}
          />
        </div>
        <div style={{ marginTop: 48 }}>
          <GlitchText text="HELLO WORLD" fontSize={72} width={320} />
        </div>
      </main>
    </div>
  );
}

export default App;
