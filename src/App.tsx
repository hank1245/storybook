import { useState } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Card } from './components/Card/Card';
import { Button } from './components/Button/Button';
import { Modal } from './components/Modal/Modal';
import { Input } from './components/Input/Input';

export function App() {
  const [page, setPage] = useState<'home' | 'about' | 'contact'>('home');
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');

  return (
    <div className="app-shell">
      <Navbar
        items={[
          { id: 'home', label: 'Home' },
          { id: 'about', label: 'About' },
          { id: 'contact', label: 'Contact' }
        ]}
        currentId={page}
        onNavigate={(id) => setPage(id as typeof page)}
        ariaLabel="Main Navigation"
      />
      <main className="app-content">
        {page === 'home' && (
          <Card title="Welcome">
            <p>Use this sandbox to preview and test components.</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
              <Button variant="primary" onClick={() => setModalOpen(true)}>
                Open Modal
              </Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline" size="sm">
                Small
              </Button>
            </div>

            <div style={{ marginTop: 16 }}>
              <Input
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>

            <Modal
              isOpen={modalOpen}
              title="Say Hello"
              onClose={() => setModalOpen(false)}
            >
              <p>Hi{ name ? `, ${name}` : ''}! This is a modal.</p>
              <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={() => setModalOpen(false)}>Close</Button>
              </div>
            </Modal>
          </Card>
        )}

        {page === 'about' && (
          <Card title="About">
            <p>Storybook design system sandbox built with Vite + React.</p>
          </Card>
        )}

        {page === 'contact' && (
          <Card title="Contact">
            <p>No real backend here — just a demo UI.</p>
          </Card>
        )}
      </main>
    </div>
  );
}

export default App;

