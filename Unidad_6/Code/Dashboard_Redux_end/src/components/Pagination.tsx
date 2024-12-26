import { $ } from '@utils/styles';

type PaginationProps<T> = {
  data: T[];
  totalPages: number;
  currentPage: number;
  onChange: (page: number) => void;
  renderItem: (items: T, index: number) => React.ReactNode;
};

export const Pagination = <T,>(props: PaginationProps<T>) => {
  const { data, totalPages, currentPage, onChange, renderItem } = props;

  return (
    <div className="flex flex-col gap-y-4 mt-[2rem]">
      <div className="flex flex-row justify-center gap-x-[1rem]">
        {data.map((item, index) => renderItem(item, index))}
      </div>

      <div className="flex justify-center gap-x-4">
        <button
          className={$(
            'bg-gray-200 px-4 py-2 rounded-lg',
            currentPage === 1 && 'cursor-not-allowed'
          )}
          disabled={currentPage === 1}
          onClick={() => onChange(currentPage - 1)}
        >
          Anterior
        </button>
        <button
          className={$(
            'bg-gray-200 px-4 py-2 rounded-lg',
            currentPage === totalPages && 'cursor-not-allowed'
          )}
          disabled={currentPage === totalPages}
          onClick={() => onChange(currentPage + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
