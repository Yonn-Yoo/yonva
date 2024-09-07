import { Minus, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChangeEvent } from 'react';

type Props = {
  value: number;
  onChange: (value: number) => void;
};

export const FontSizeInput = ({ value, onChange }: Props) => {
  const increment = () => onChange(value + 1);
  const decrement = () => onChange(value - 1);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    onChange(value);
  };

  return (
    <div className="flex items-center">
      <Button
        onClick={decrement}
        variant="outline"
        className="p-2 rounded-r-none border-r-0"
        size="icon"
      >
        <Minus className="size-3" />
      </Button>
      <Input
        onChange={handleChange}
        value={value || 0}
        className="w-12 h-10 text-xs focus-visible:ring-offset-0 focus-visible:ring-0 rounded-none"
      />
      <Button
        onClick={increment}
        variant="outline"
        className="p-2 rounded-l-none border-l-0"
        size="icon"
      >
        <Plus className="size-3" />
      </Button>
    </div>
  );
};
