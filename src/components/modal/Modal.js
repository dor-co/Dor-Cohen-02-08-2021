import { Button, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import modalReducer from '../../redux/ModalReducer';
import { close } from "../../redux/Actions";

function Modall() {
    const modalRed = useSelector((state) => state.modalReducer);
    const dispatch = useDispatch();

    // console.log('t/f', modalRed);

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
            <Modal.Header className='modalHeaderStyle'>
                <Modal.Title id="contained-modal-title-vcenter">
                    title
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='modalTextStyle'>
                    <h1>{modalRed.body}</h1>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={closeModal}>OK</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Modall;