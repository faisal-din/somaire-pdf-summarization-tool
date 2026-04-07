import { Trash2 } from 'lucide-react';
import { Button } from '../ui/button';

const DeleteButton = () => {
  return (
    <div>
      <Button
        variant='outline'
        size='icon'
        className='text-gray-400 bg-gray-100 border-gray-300 hover:text-rose-600 hover:bg-rose-200 cursor-pointer transition-colors duration-200 rounded-md'
      >
        <Trash2 className='w-4 h-4' />
      </Button>
    </div>
  );
};

export default DeleteButton;
