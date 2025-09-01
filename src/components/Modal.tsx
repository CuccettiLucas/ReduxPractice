import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import EditTask from './EditTask';
import DeleteTask from './DeleteTask';
import CreateTask from './CreateTask';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface ModalProps{
    open:boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    act:string;
    idSelected:number;
}

export default function BasicModal({open,setOpen,act,idSelected}:ModalProps) {

  const RenderAct = () =>{
    switch (act) {
      case "edit":
        return <EditTask id={idSelected} setOpen={setOpen}/>
        break;
      case "delete":
        return <DeleteTask id={idSelected} setOpen={setOpen}/>
        break;
      case "create":
        return <CreateTask setOpen={setOpen} />
        break;
      default:
        return <CreateTask setOpen={setOpen} />
        break;
    }
  }

  return (
    <div>
        <Modal
        open={open}
        onClose={() => setOpen(false) }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            {RenderAct()}
        </Box>
        </Modal>
    </div>
  );
}