import UserProfile from '@components/UserProfile';

import './App.css';

const users = [
  {
    name: 'Enmanuel',
    url: 'https://avatar.iran.liara.run/public/boy?username=Enmanuel',
  },
  {
    name: 'Luis',
    url: 'https://avatar.iran.liara.run/public/boy?username=Luis',
  },
];

function App() {
  return (
    <section>
      {users.map((user, index) => (
        <UserProfile
          key={`app-user-${index}`}
          name={user.name}
          url={user.url}
        />
      ))}
    </section>
  );
}

export default App;
