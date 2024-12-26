import UserProfile from '@components/UserProfile';

import './App.css';

const users = [
  {
    name: 'Enmanuel',
    url: 'https://avatar.iran.liara.run/public/boy?username=Enmanuel',
    verified: true,
  },
  {
    name: 'Luis',
    url: 'https://avatar.iran.liara.run/public/boy?username=Luis',
  },
  {
    name: 'Miguel',
    url: 'https://avatar.iran.liara.run/public/boy?username=Miguel',
  },
];

function App() {
  return (
    <section className="cd-flex cd-flex-row cd-flex-wrap cd-justify-center">
      {users.map((user, index) => (
        <UserProfile
          key={`app-user-${index}`}
          name={user.name}
          url={user.url}
          verified={user.verified}
        />
      ))}
    </section>
  );
}

export default App;
