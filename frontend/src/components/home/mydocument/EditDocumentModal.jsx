import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
// import axiosInstance from '../../axios/stdaxios';
// import { useDispatch, useSelector } from 'react-redux';
// import {changeNotes} from '../../features/notesEditSlice';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    marginTop:5 ,
    p: 4,
  };

const EditDocumentModal = ({documentId,setEditDocuments,setRender}) => {

    const [notes,setNotes] = useState([]); 
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false)
        setEditDocuments((prev)=>!prev)
    };

    console.log(documentId,"documentId in edit moall");

    const [ws, setWs] = useState(null);
    const [userId, setUserId] = useState("");
    const [documentTitle, setDocumentTitle] = useState("");
    const [documentContent, setDocumentContent] = useState("");

    useEffect(() => {
        const socket = new W3CWebSocket('ws://localhost:8000/ws/documents/');
    
        const userData = localStorage.getItem("userDetails");
    
        socket.onopen = () => {
          console.log('WebSocket connected');
    
          if (userData) {
            const parseData = JSON.parse(userData);
            const userId = parseData.id;
            setUserId(userId)
            console.log(documentId,"here in send");
            // Fetch initial documents when WebSocket connection is open
            socket.send(JSON.stringify({ action: 'get_edit_documents', documentId:documentId }));
          }
        };
    
        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          console.log(data, "data in onmessage//////modal-edit#@#$%^&*&^%43");   

          if (data.action === 'documents_fetched') {
            const value = data.documents
            console.log(value,"value here in mydocuments");
            // if (value.user === userId ){
            //     setMyDocuments(value);
            // }
            
          }
    
          if (data.action === 'edit_document_fetched') {

            const value = data.documents
            console.log(value,"value here in doc modallll ---------------------?????????");
            setDocumentContent(data.documents.content)
            setDocumentTitle(data.documents.title)
            
          }

        };

        console.log(documentContent,"\n",documentTitle,"hereee");
    
        socket.onclose = () => {
          console.log('WebSocket closed');
        };
    
        setWs(socket);
    
      }, []);


      const handleSubmit = (e) => {
    
        const documentData = {
          'userId' : userId,
          'title': documentTitle,
          'content' : documentContent,
          'documentId': documentId
        }
        console.log(documentData,"documentdata///in edit modal");

        ws.send(JSON.stringify({ action: 'edit_document', documentData }));
        setRender((prev)=>!prev)
        
        handleClose();
      };

      


  return (
    <>
                <Modal open={open} onClose={handleClose} className='edit-modal'>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Edit Document
          </Typography>
          <br />

          <TextField
            label="Edit document title"
            variant="outlined"
            fullWidth
            multiline
            rows={4} 
            value={documentTitle}
            onChange={(e)=>setDocumentTitle(e.target.value)}  
          />

            <TextField
            label="Edit document content"
            variant="outlined"
            fullWidth
            multiline
            rows={4} 
            value={documentContent}
            onChange={(e)=>setDocumentContent(e.target.value)}  
          />

          <br /><br />

          <button className='edit-btn'  onClick={handleSubmit}>
           Edit Notes
          </button>
        </Box>
      </Modal>
    </>
  )
}

export default EditDocumentModal