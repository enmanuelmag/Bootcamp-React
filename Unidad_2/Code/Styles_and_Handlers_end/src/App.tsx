import UserProfile from './components/UserProfile';

const users = [
  {
    name: 'Dan Abramov',
    url: 'https://avatar.iran.liara.run/public/boy',
    verified: true,
  },
  {
    name: 'Sophie Alpert',
    url: 'https://avatar.iran.liara.run/public/girl',
    verified: false,
  },
  {
    name: 'Ryan Florence',
    url: 'https://avatar.iran.liara.run/public/girl',
  },
];

function App() {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <section className="flex flex-row gap-x-[2rem]">
        {users.map((user, index) => (
          <UserProfile key={index} {...user} />
        ))}
      </section>
    </div>
  );
}

export default App;
