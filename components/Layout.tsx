
import React from 'react';
import Sidebar from './Sidebar';
type Props = { children: React.ReactNode; active?: string };
export default function Layout({ children, active }: Props) {
  return (<div className="app-layout"><Sidebar active={active} /> <div className="content">{children}</div></div>);
}
