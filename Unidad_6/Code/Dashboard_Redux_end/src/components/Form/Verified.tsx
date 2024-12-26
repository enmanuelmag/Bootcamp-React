import { $ } from '@utils/styles';

type VerifiedProps = {
  verified: boolean;
};

const Verified = ({ verified }: VerifiedProps) => {
  console.log('Rendering Verified');

  return (
    <div
      className={$(
        'flex items-center gap-4 p-4 rounded-md',
        verified ? 'bg-green-100' : 'bg-red-100'
      )}
    >
      <p className={verified ? 'text-green-600' : 'text-red-600'}>
        {verified
          ? 'User will be marked as verified but required double check'
          : 'User will be marked as not verified'}
      </p>
    </div>
  );
};

export default Verified;
