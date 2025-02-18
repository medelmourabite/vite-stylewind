import React, {
  ComponentProps,
  createElement,
  forwardRef,
  HTMLProps,
} from 'react';

const tags = [
  'div',
  'span',
  'p',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'a',
  'ul',
  'ol',
  'li',
  'table',
  'thead',
  'tbody',
  'tr',
  'th',
  'td',
  'pre',
  'code',
  'blockquote',
  'hr',
  'br',
  'svg',
  'image',
  'style',
  'title',
  'desc',
] as const;

type Tag = (typeof tags)[number];
type ClassNames = HTMLProps<HTMLElement>['className'];
type Props = ComponentProps<Tag>;

const baseStyled = (tag: Tag) => {
  return (arg: ClassNames[] | ((props: Props) => ClassNames[])) => {
    const Component = (props: Props) => createElement(tag, { ...props });
    return ({ ...props }: Props) => {
      let classes: ClassNames[] = [];
      if (typeof arg === 'function') {
        classes = arg(props);
      } else {
        classes = arg;
      }
      return <Component {...props} className={classes?.join(' ')} />;
    };
  };
};

const createClassStyled = () => {
  const styled = tags.reduce((acc, tag) => {
    acc[tag] = baseStyled(tag);
    return acc;
  }, {} as Record<Tag, ReturnType<typeof baseStyled>>);
  return styled;
};

const styled = createClassStyled();
export default styled;
