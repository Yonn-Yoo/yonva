import { ChromePicker, CirclePicker } from 'react-color';
import { colors } from '../types';
import { formatRGBA } from '../utils';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function ColorPicker({ value, onChange }: Props) {
  return (
    <div className="w-full flex flex-col items-center space-y-4">
      <ChromePicker
        className="!w-full !border !rounded-lg !shadow-none"
        color={value}
        onChange={({ rgb }) => onChange(formatRGBA(rgb))}
      />
      <CirclePicker
        className="!w-full !grid !grid-cols-6"
        color={value}
        colors={colors}
        onChangeComplete={({ rgb }) => onChange(formatRGBA(rgb))}
      />
    </div>
  );
}
