import { FaTimes, FaCircle } from 'react-icons/fa'

function Square (props) {
  return (
    <button className='square' onClick={props.onClick}>
      {props.value === 'X' && <FaTimes size={48} />}
      {props.value === 'O' && <FaCircle size={48} />}
    </button>
  )
}
export default Square
