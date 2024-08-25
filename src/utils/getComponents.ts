import { Children, isValidElement, ReactNode } from 'react';

export default function getComponents(
  children: ReactNode,
  componentType: React.ElementType
) {
  const childrenArray = Children.toArray(children);
  return childrenArray.filter(
    (child) => isValidElement(child) && child.type === componentType
  );
}
