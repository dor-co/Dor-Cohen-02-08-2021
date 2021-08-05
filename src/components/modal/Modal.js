import { Button, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import modalReducer from '../../redux/ModalReducer';
import { close } from "../../redux/Actions";
import './Style.css';

function Modall() {
    const modalRed = useSelector((state) => state.modalReducer);
    const dispatch = useDispatch();

    console.log('t/f', modalRed);

    const closeModal = () => {
        return dispatch(close());
    }

    return (
        <Modal
            show={modalRed.boolOpen}
            onHide={closeModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered={true}
            contentclassname={"modal-content "}
        >
            <Modal.Body>
                <div className='modalTextStyle'>
                    <h4>{modalRed.body}</h4>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={closeModal}>OK</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Modall;