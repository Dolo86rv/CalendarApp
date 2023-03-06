import { useState } from 'react'
import Modal from 'react-modal'

const customStyles = {
    content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    },
}

Modal.setAppElement('#root')

export const CalendarModal = () => {
    
    const [isModalOpen, setisModalOpen] = useState(true)
    
    const onCloseModal = () => {
        console.log('Cerrando Modal')
        setisModalOpen( false )
    }
    
    return (
        <Modal
            isOpen= { isModalOpen }
            onRequestClose={ onCloseModal }
            style={customStyles}
            className = "modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 200 }
        >
            <h1>Hola Mundo</h1>
            <hr />
            <p>Dolor et ullamco minim est. Do et anim enim consequat velit sunt labore consequat consequat velit exercitation laborum consequat. Non aliquip qui non exercitation reprehenderit ad cupidatat anim mollit quis. Tempor dolor qui mollit sunt pariatur velit eiusmod incididunt.</p>
        </Modal>
    )
}
