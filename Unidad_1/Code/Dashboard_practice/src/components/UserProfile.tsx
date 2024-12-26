type UserProfileProps = {
  name: string;
  url: string;
};

const UserProfile = (props: UserProfileProps) => {
  const { name, url } = props;

  return (
    <div>
      <img width="150" src={url} alt={`Avatar of ${name}`} />
      <h2>
        {name} ({getNameLength()})
      </h2>
    </div>
  );

  function getNameLength() {
    return name.length;
  }
};

export default UserProfile;
