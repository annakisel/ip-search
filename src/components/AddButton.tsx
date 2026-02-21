
import './AddButton.scss';

interface AddButtonProps {
  onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => (
  <button className="add-btn" onClick={onClick}>
    <span className="plus">+</span> Add
  </button>
);

export default AddButton;
