import TypingEffect from "./components/TypingEffect/TypingEffect";
import GlitchText from "./components/GlitchText/GlitchText";

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
        <div style={{ marginTop: 48 }}>
          <GlitchText text="GLITCH" fontSize={72} width={320} />
        </div>
      </main>
    </div>
  );
}

export default App;
