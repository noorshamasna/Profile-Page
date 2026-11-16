import ProfilePage from './ProfilePage.jsx';

// Standalone demo only. In your real app, pass navigate() from your router so the Sources card opens your Sources page.
export default function App() {
  return <ProfilePage sourcesPath="/sources" onNavigate={(path) => alert(`Navigate to: ${path}`)} />;
}
