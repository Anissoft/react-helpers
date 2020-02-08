import * as React from 'react';

import { _, renderChildren, Children } from '../../utils';

export const Then = ({ children }: { children?: Children }) => {
  return (<>{renderChildren(children)}</>);
};
export const Else = ({ children }: { children?: Children }) => {
  return (<>{renderChildren(children)}</>);
};

export function If({
  condition,
  children,
}: {
  condition: boolean | (() => boolean);
  children?: Children;
}) {
  if (!children || children === null) {
    return null;
  }

  if (typeof children === 'function') {
    return _(condition) ? <>{children()}</> : null;
  }

  const elseTypes = React.useMemo(() => ([
    (<Else />).type,
    (<ElseIf condition={false} />).type
  ]), []);

  const thenTypes = React.useMemo(() => ([
    (<Then />).type,
    (<ThenIf condition={false} />).type
  ]), []);

  if (typeof children === 'string'
    || typeof children === 'number'
    || typeof children === 'boolean'
    || (!Array.isArray(children) && !elseTypes.includes((children as any).type))
  ) {
    return _(condition) ? <>{children}</> : null;
  }
  const options = (Array.isArray(children) ? children : [children]);

  if (_(condition)) {
    return (
      <>
        {options.filter((child: any) => !elseTypes.includes(child!.type)) || null}
      </>
    );
  }

  return (
    <>
      {options.filter((child: any) => !thenTypes.includes(child!.type)) || null}
    </>
  );
}

export function ElseIf({
  condition,
  children,
}: {
  condition: boolean | (() => boolean);
  children?: Children;
}) {
  return (
    <Else>
      <If condition={condition}>
        {children}
      </If>
    </Else>
  );
}

export function ThenIf({
  condition,
  children,
}: {
  condition: boolean | (() => boolean);
  children?: Children;
}) {
  return (
    <Then>
      <If condition={condition}>
        {children}
      </If>
    </Then>
  );
}

export default { If, Then, Else, ElseIf };
