import { RGBColor } from './../../../node_modules/@types/react-color/index.d';

export function isTextType(type: string | undefined) {
  return type === 'text' || type === 'i-text' || type === 'textbox';
}

export function formatRGBA(object: RGBColor | 'transparent') {
  if (object === 'transparent') return `rgba(0,0,0,0)`;

  const { r, g, b, a } = object;
  const alpha = a === undefined ? 1 : a;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
