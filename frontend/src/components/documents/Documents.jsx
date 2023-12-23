import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { styled } from "@mui/joy/styles";
import Grid from "@mui/joy/Grid";
import Sheet from "@mui/joy/Sheet";
import { useNavigate } from 'react-router-dom'
import Navbar from "../navbar/Navbar";

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.background.level1 : "#fff",
  ...theme.typography["body-sm"],
  padding: theme.spacing(2.5),
  textAlign: "center",
  borderRadius: 5,
  color: theme.vars.palette.text.secondary,
}));

const Documents = () => {
  const navigate = useNavigate()

  const [ws, setWs] = useState(null);
  const [documents, setDocuments] = useState([]);

  const coverpageHandle=()=>{
    navigate('../')
  }

  useEffect(() => {
    const socket = new W3CWebSocket("ws://localhost:8000/ws/documents/");

    socket.onopen = () => {
      console.log("WebSocket connected");

        socket.send(JSON.stringify({ action: 'get_all_documents' }));

    };


    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data,"data here in main documents############");

        if (data.action === 'all_documents_fetched') {
          const value = data.documents
          console.log(value,"value here in main documents############");
          setDocuments(value);
        }

    };

    socket.onclose = () => {
      console.log("WebSocket closed");
    };

    setWs(socket);

    // No return cleanup function is needed here
  }, []); // Empty dependency array ensures the effect runs once after the initial render


  return (
    <div>
      <Navbar/>
      <h1>Documents</h1>
      <button onClick={coverpageHandle}>Cover page</button>

      <div className="container">
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ width: "100%" }}
        >
          {documents &&
            documents.map((item) => (
              <Grid xs={6}>
                <Item>
                  <div className="d-flex flex-row justify-content-between ">
                    <div className="notes-text">
                      {item.title}
                      <br />
                      hii
                      {item.content}
                    </div>

                    <div className="icon-container">
                      {/* <span className='ml-4 ' onClick={()=>documentEditHandle(item._id)}><i className="fas fa-edit icon"></i></span>  */}

                      {/* <span
                        className="ml-1 "
                        onClick={() => DeleteHandle(item._id)}
                      >
                        <i className="fas fa-trash icon"></i>
                      </span> */}
                    </div>
                  </div>
                </Item>
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  )
}

export default Documents