type UserProfileProps = {
  name: string;
  url: string;
  children?: React.ReactNode;
};

const UserProfile = (props: UserProfileProps) => {
  const { name, url, children } = props;

  return (
    <div>
      <img width="150" src={url} alt={`Avatar of ${name}`} />
      <h2>
        {name} ({getNameLength()})
      </h2>

      {children}
    </div>
  );

  function getNameLength() {
    return name.length;
  }
};

export default UserProfile;
