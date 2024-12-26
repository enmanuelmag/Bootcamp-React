type UserProfileProps = {
  name: string;
  url: string;
  verified?: boolean;
  children?: React.ReactNode;
};

const UserProfile = (props: UserProfileProps) => {
  const { name, url, verified, children } = props;

  return (
    <article className="cd-basis-full sm:cd-basis-1/3 md:cd-basis-1/3 lg:cd-basis-1/3 cd-p-[0.5rem]">
      <div className="cd-p-[1rem] cd-text-center cd-justify-center cd-items-center cd-flex cd-flex-col cd-gap-y-[1rem] cd-shadow-lg cd-rounded-md cd-border cd-border-gray-200">
        <img width="150" src={url} alt={`Avatar of ${name}`} />

        <div>
          <h2 className="cd-text-base cd-font-bold">
            {name} ({getNameLength()})
          </h2>
          <p
            className={`cd-text-sm ${
              verified ? 'cd-text-green-500' : 'cd-text-red-500'
            }`}
          >
            {verified ? 'Verified' : 'Not verified'} user
          </p>
        </div>

        <button
          className="cd-transition-colors cd-duration-200 cd-w-full cd-bg-sky-500 hover:cd-bg-sky-600 cd-rounded-md cd-px-[0.5rem] cd-py-[0.25rem] cd-text-white cd-text-sm"
          onClick={copyData}
        >
          Copiar datos
        </button>

        {children}
      </div>
    </article>
  );

  function getNameLength() {
    return name.length;
  }

  async function copyData() {
    const data = `${name} - ${verified ? 'Verified' : 'Not verified'}`;

    try {
      await window.navigator.clipboard.writeText(data);

      alert('Data copied!');

      if (window.navigator.canShare()) {
        await window.navigator.share({
          title: 'User data',
          text: data,
        });

        alert('Data shared!');
      }
    } catch (error) {
      console.error('Error on copy/share data:', error);
    }
  }
};

export default UserProfile;
