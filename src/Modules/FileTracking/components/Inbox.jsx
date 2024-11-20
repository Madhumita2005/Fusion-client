import React, { useState } from "react";
import { Box, Card, Title, Table, ActionIcon, Tooltip } from "@mantine/core";
import { Archive, Eye } from "@phosphor-icons/react";
import { useForm } from "@mantine/form";
import ViewFiles from "./ViewFile";

import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Title,
  Table,
  Badge,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { Archive, Eye } from "@phosphor-icons/react";
import axios from "axios";
import { useSelector } from "react-redux";
import View from "./ViewFile";


export default function Inboxfunc() {
  const [files, setFiles] = useState([]);
  const token = localStorage.getItem("authToken");
  const role = useSelector((state) => state.user.role);
  const username = useSelector((state) => state.user.name);
  let current_module = useSelector((state) => state.module.current_module);
  current_module = current_module.split(" ").join("").toLowerCase();
  useEffect(() => {
    const getFiles = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/filetracking/api/inbox/`,

          {
            params: {
              username,
              designation: role,
              src_module: current_module,
            },
            withCredentials: true,
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "multipart/form-data",
            },
          },
        );
        // Set the response data to the files state
        setFiles(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching files:", err);
      }
    };

    // Call the getFiles function to fetch data on component mount
    getFiles();
  }, []);

  const [selectedFile, setSelectedFile] = useState(null);

  const form = useForm({
    initialValues: {
      // Placeholder for future form values if needed
    },
  });

  const handleArchive = (fileID) => {
    const updatedFiles = files.filter((file) => file.fileID !== fileID);

  const handleArchive = async (fileID) => {
    // eslint-disable-next-line no-unused-vars
    const response = await axios.post(
      "http://localhost:8000/filetracking/api/createarchive/",
      {
        file_id: fileID,
      },
      {
        params: {
          username: "atul",
          designation: "Professor",
          src_module: "filetracking",
        },
        withCredentials: true,
        headers: {
          Authorization: `Token ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      },
    );
    const updatedFiles = files.filter((file) => file.id !== fileID);

    setFiles(updatedFiles);
  };

  const handleViewFile = (file) => {
    setSelectedFile(file);
  };

  const handleBack = () => {
    setSelectedFile(null);
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ backgroundColor: "#F5F7F8", maxWidth: "100%", margin: "32px" }}
    >
      {!selectedFile && (
        <Title order={2} mb="md">
          Inbox
        </Title>
      )}

      {selectedFile ? (
        <div>
          <Title order={3} mb="md">
            File Subject
          </Title>
          <View file={selectedFile} onBack={handleBack} />
        </div>
      ) : (
        <Box
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            overflowY: "auto",
            height: "400px",
            backgroundColor: "#fff",
          }}
        >
          <Table
            highlightOnHover
            style={{
              width: "100%",
              borderCollapse: "collapse",
              tableLayout: "fixed",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#0000" }}>
                <th
                  style={{
                    padding: "12px",
                    width: "8%",
                    border: "1px solid #ddd",
                  }}
                >
                  Archive
                </th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                  Received as
                </th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                  Sent By
                </th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                  File ID
                </th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                  Subject
                </th>
                <th style={{ padding: "12px", border: "1px solid #ddd" }}>
                  Date
                </th>
                <th
                  style={{
                    padding: "12px",
                    width: "8.5%",
                    border: "1px solid #ddd",
                  }}
                >
                  View File
                </th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => (
                <tr key={index}>
                  <td
                    style={{
                      padding: "8px",
                      textAlign: "center",
                      border: "1px solid #ddd",
                    }}
                  >
                    <Tooltip label="Archive file" position="top" withArrow>
                      <ActionIcon
                        variant="light"

                        color="blue"
                        onClick={() => handleArchive(file.fileID)}

                        color="red"
                        style={{
                          transition: "background-color 0.3s",
                          width: "2rem",
                          height: "2rem",
                        }}
                      >
                        <Archive
                          size="1rem"
                          onClick={() => handleArchive(file.id)}
                        />
                      </ActionIcon>
                    </Tooltip>
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid #ddd",
                      textAlign: "center",
                    }}
                  >
                    {file.fileType}

                    <Badge color="gray" style={{ fontSize: "12px" }}>
                      File type: {file.name}
                    </Badge>
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid #ddd",
                      textAlign: "center",
                    }}
                  >
                    {file.uploader}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid #ddd",
                      textAlign: "center",
                    }}
                  >
                    {file.id}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid #ddd",
                      textAlign: "center",
                    }}
                  >
                    {file.subject}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid #ddd",
                      textAlign: "center",
                    }}
                  >
                    {file.upload_date}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      border: "1px solid #ddd",
                      textAlign: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    <ActionIcon
                      variant="outline"
                      color="black"
                      style={{
                        transition: "background-color 0.3s",
                        width: "2rem",
                        height: "2rem",
                      }}
                      onClick={() => handleViewFile(file)}

                      data-default-color="white" // Store default color
                      data-hover-color="#e0e0e0" // Store hover color
                      onMouseEnter={handleMouseEnter} // Handle mouse enter
                      onMouseLeave={handleMouseLeave} // Handle mouse leave
                      onClick={() => handleViewFile(file.id)}
                    >
                      <Eye size="1rem" />
                    </ActionIcon>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
      )}
    </Card>
  );
}