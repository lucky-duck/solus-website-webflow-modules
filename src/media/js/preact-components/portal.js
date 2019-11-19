import { render } from 'preact';

const modalRoot = document.createElement('div');
modalRoot.id = 'modal-root';
document.appendChild(modalRoot);

function Portal({ children }) {
  return render(children, modalRoot);
}

export default Portal;
