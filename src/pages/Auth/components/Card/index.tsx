import React from 'react';
import './styles.scss';

type Props = {
  title: string;
  children: React.ReactNode;
}

const AuthCard = ({ title, children }: Props) => {
  return (
    <div className="card-base auth-card">
      <h2 className="auth-card-title"><strong>{title}</strong></h2>
      {children}
    </div>
  );
}

export default AuthCard;