import React, { ReactNode } from 'react';
import './PageTemplate.scss';

interface PageTemplateProps {
  children?: ReactNode;
}

const PageTemplate = ({ children }: PageTemplateProps) => {
  return (
    <div className ="PageTemplate">
      {children && children}
    </div>
  );
};

export default PageTemplate;