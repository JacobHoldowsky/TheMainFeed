import React, { useState } from "react";
import { Modal } from '../ModelContext/Modal'
import EditCommentForm from "../../components/EditCommentForm";


function EditCommentModal({ comment }) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditCommentForm setShowModal={setShowModal} commentInfo={comment} />
                </Modal>
            )}
        </>
    );
}

export default EditCommentModal;
