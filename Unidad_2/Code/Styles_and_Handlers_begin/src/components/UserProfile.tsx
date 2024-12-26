type UserProfileProps = {
  name: string;
  url: string;
  verified?: boolean;
};

const UserProfile = (props: UserProfileProps) => {
  const { name, url, verified } = props;

  return (
    <div>
      <img
        src={url}
        alt="Avatar"
        className="avatar"
        height="auto"
        width="150"
      />
      <h2>{name}</h2>
      <p>{verified ? 'Verified' : 'Not verified'}</p>
    </div>
  );
};

export default UserProfile;
