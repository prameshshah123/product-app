
import React from 'react';
type Props = { active?: string };
export default function Sidebar({ active }: Props) {
  const items = [
    { key: 'orders', label: 'Orders' },
    { key: 'products', label: 'Products' },
    { key: 'stock', label: 'Stock' },
    { key: 'paper', label: 'Paper' },
    { key: 'artwork', label: 'Artwork' },
    { key: 'completed', label: 'Completed' }
  ];
  return (<div className="sidebar"><div className="brand">Creative Packaging</div>{items.map(it=> (<div key={it.key} className={'nav-item '+(active===it.key?'active':'')}>{it.label}</div>))}</div>);
}
