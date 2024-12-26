import LocalStorageDS from '@api/impl/ds/LocalStorage';
import DataRepoImpl from '@api/impl/repo/DataRepoImpl';

const LocalStorageImpl = new LocalStorageDS();

const DataRepo = new DataRepoImpl(LocalStorageImpl);

export default DataRepo;
