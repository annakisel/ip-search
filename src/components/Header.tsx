
import './Header.scss';

interface HeaderProps {
  onClose?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClose }) => (
  <div className="header">
    <span className="title">IP Lookup</span>
    <span className="close" onClick={onClose}>&times;</span>
  </div>
);

export default Header;
