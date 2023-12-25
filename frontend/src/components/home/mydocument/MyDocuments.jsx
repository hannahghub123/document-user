import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import AddDocumentsModal from "./AddDocumentsModal";
import { styled } from "@mui/joy/styles";
import Grid from "@mui/joy/Grid";
import Sheet from "@mui/joy/Sheet";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Style.css";
import EditDocumentModal from "./EditDocumentModal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axios/Axios";
import Navbar from "../../navbar/Navbar";
import { Button } from "@mui/material";

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.background.level1 : "#fff",
  ...theme.typography["body-sm"],
  padding: theme.spacing(2.5),
  textAlign: "center",
  borderRadius: 5,
  color: theme.vars.palette.text.secondary,
}));

const MyDocuments = () => {
  const [ws, setWs] = useState(null);
  const [editDocuments, setEditDocuments] = useState(false);
  const [mydocuments, setMyDocuments] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [documentId, setDocumentId] = useState(null);
  const [getDocuments, setGetDocuments] = useState([]);
  const [name, setName] = useState("");
  const [render, setRender] = useState(false);
  const [addRender, setAddRender] = useState(false);
  const [deleteRender, setDeleteRender] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("userDetails");
    if (userData) {
      const parseData = JSON.parse(userData);
      const userId = parseData.id;
      const values = {
        id: userId,
      };
      axiosInstance
        .post("get-documents/", values)
        .then((res) => {
          setGetDocuments(res.data.documents);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [render, addRender, deleteRender]);

  useEffect(() => {
    const socket = new W3CWebSocket("ws://localhost:8000/ws/documents/");

    const userData = localStorage.getItem("userDetails");

    socket.onopen = () => {
      console.log("WebSocket connected");
      if (userData) {
        const parseData = JSON.parse(userData);
        const userId = parseData.id;

        setName(parseData.username);

        const values = {
          id: userId,
        };

        socket.send(
          JSON.stringify({ action: "get_documents", userId: userId })
        );
      }
    };

    console.log(mydocuments, "mydocuments---------");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data, "data in onmessage//////");

      if (data.action === "documents_fetched") {
        const value = data.documents;
        console.log(value, "value here in mydocuments-----demooooo");
        setMyDocuments(value);
      }

      if (data.message === "documents_deleted") {
        console.log("inside action delete");
        toast.success("Document Deleted !!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        const value = data.documents;
        console.log(value, "value here in mydocuments");
        setMyDocuments(value);
        setDeleteRender(!deleteRender);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
    };

    setWs(socket);

    // No return cleanup function is needed here
  }, [render]); // Empty dependency array ensures the effect runs once after the initial render

  const documentEditHandle = (id) => {
    setEditDocuments(!editDocuments);
    setDocumentId(id);
  };

  // const editDocument = (documentId) => {
  //   ws.send(JSON.stringify({ action: 'edit_document', documentData }));
  // };

  const DeleteHandle = (id) => {
    showDeleteConfirmation(id);
  };

  const showDeleteConfirmation = (id) => {
    toast.info(
      <div>
        <p>Are you sure you want to delete this document ?</p>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button variant="contained" onClick={() => deleteDocument(id)}>
            Delete
          </Button>
          <Button variant="contained" onClick={toast.dismiss}>
            Cancel
          </Button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: true,
        closeButton: false,
      }
    );
  };

  const deleteDocument = (documentId) => {
    console.log(documentId, "JJJJJJJJJJSSSSSSSSSSSSSSSSSSSSS");
    ws.send(JSON.stringify({ action: "delete_document", documentId }));
  };

  const openAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  return (
    <>
      <Navbar />
      <div style={{ marginTop: "10px" }}>
        <h1 style={{ textAlign: "center" }} className="mt-4 mb-2">
          <b>{name}'s - My Documents</b>
        </h1>

        <div className="notes">
          <h4>
            <b>ADD NOTES</b>
          </h4>
          <span onClick={openAddModal}>
            <i class="fa fa-plus icon" aria-hidden="true"></i>
          </span>
        </div>
        <div className="container">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ width: "100%" }}
          >
            {getDocuments &&
              getDocuments.map((item) => (
                <Grid xs={6}>
                  <Item>
                    <div className="d-flex flex-row justify-content-between ">
                      <div className="notes-text">
                        <b>Title - {item.title}</b>
                        <br />
                        {item.content}
                      </div>

                      <div className="icon-container">
                        <span
                          className="ml-4 "
                          onClick={() => documentEditHandle(item._id)}
                        >
                          <i className="fas fa-edit icon"></i>
                        </span>

                        <span
                          className="ml-1 "
                          onClick={() => DeleteHandle(item._id)}
                        >
                          <i className="fas fa-trash icon"></i>
                        </span>
                      </div>
                    </div>
                  </Item>
                </Grid>
              ))}
          </Grid>
        </div>

        {showAddModal && (
          <AddDocumentsModal
            setShowAddModal={setShowAddModal}
            setMyDocuments={setMyDocuments}
            setAddRender={setAddRender}
          />
        )}
        {editDocuments ? (
          <EditDocumentModal
            documentId={documentId}
            setEditDocuments={setEditDocuments}
            setRender={setRender}
          />
        ) : null}
      </div>
    </>
  );
};

export default MyDocuments;
