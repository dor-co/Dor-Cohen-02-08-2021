import { Button, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { close } from "../../redux/Actions";
import './Style.css';
import { useFirestore } from "reactfire";

function Modall({text, cityId}) {
    const modalRed = useSelector((state) => state.modalReducer);
    const dispatch = useDispatch();
    const db = useFirestore();

    const closeModal = () => {
        return dispatch(close());
    }

    const cancel = () => {
        return dispatch(close());
    }

    const okDelete = () => {
        if (text === 'delete') {
            db.collection("Weathers").doc(cityId)
                .delete()
        }
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
                {text === 'delete' && 
                <Button onClick={cancel}>Cancel</Button>                
                }
                <Button onClick={okDelete}>OK</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Modall;