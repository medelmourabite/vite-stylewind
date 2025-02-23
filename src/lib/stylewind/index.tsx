import { ComponentProps, createElement, HTMLProps, useMemo } from 'react';

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
  'main',
  'section',
  'aside',
  'header',
  'footer',
  'button',
] as const;

type Tag = (typeof tags)[number];
type ClassNames = HTMLProps<HTMLElement>['className'];
type Props = ComponentProps<Tag>;

const baseStyled = (tag: Tag) => {
  return <T,>(arg: ClassNames[] | ((props: Props & T) => ClassNames[])) => {
    const Component = (props: Props) => createElement(tag, { ...props });
    return (props: Props & T) => {
      const className = useMemo(() => {
        if (typeof arg === 'function') {
          return arg(props)?.join(' ');
        }
        return arg?.join(' ');
      }, [props]);
      return <Component {...props} className={className} />;
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
