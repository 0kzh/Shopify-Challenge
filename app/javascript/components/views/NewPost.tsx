import React, { useEffect, useState } from "react";
import Dropzone from 'react-dropzone';
import axios from "axios";
import {
    Button,
    Container,
    Spinner,
} from "reactstrap";

import { formatBytes } from '../../helpers/utils';
import { HOME_ROUTE } from '../../helpers/constants';
import Navbar from '../Navbar';

const newPhoto = require('../../../assets/images/new_photo.svg');

interface Props {
    account: any;
}

const NewPost = (props: Props) => {
    const { account } = props;

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileDetails, setFileDetails] = useState(null);
    const [uploading, setUploading] = useState(false);

    const sendImageToController = async (payload) => {
        const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
        const { data, status } = await axios.post(`/posts`, payload, { headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrf,
        }});

        if (status === 201) {
            window.location.href = HOME_ROUTE
        } else {
            alert('Error uploading image :(')
        }

        setUploading(false);
    }

    const uploadFile = () => {
        setUploading(true);
        let formPayload = new FormData();
        formPayload.append('post[image]', selectedFile);
        sendImageToController(formPayload);
    }

    const processFile = (file) => {
        const details = {
            preview: file['type'].split('/')[0] === 'image' ? URL.createObjectURL(file) : null,
            formattedSize: formatBytes(file.size, 0),
        };
        setSelectedFile(file)
        setFileDetails(details);
    };

    return (
        <div>
            <Navbar account={account} />
            <Container>
                <Dropzone onDrop={acceptedFiles => processFile(acceptedFiles[0])}>
                    {({getRootProps, getInputProps}) => (
                        <section style={styles.dropzone}>
                            <div {...getRootProps()} style={{ width: '100%' }}>
                                <input {...getInputProps()} />
                                <div style={styles.preview}>
                                    <img src={fileDetails ? fileDetails.preview : newPhoto} style={styles.thumbnail}/>
                                    <h2 style={styles.fileName}>{selectedFile && fileDetails ? `${selectedFile.name} (${fileDetails.formattedSize})` :
                                        <div>
                                            <div>Drag and drop an image here</div>
                                            <div>or click to select a file</div>
                                        </div>
                                    }</h2>
                                </div>
                            </div>
                        </section>
                    )}
                </Dropzone>
                {
                    uploading ?
                    <Button style={{...styles.uploadBtn, ...styles.progress}}><Spinner color="dark" /></Button>
                    :
                    <Button style={styles.uploadBtn} onClick={uploadFile}>Upload Image</Button>
                }
            </Container>
        </div>
    );
}

const styles = {
    preview: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100,
        paddingBottom: 100,
        width: '100%',
        textAlign: 'center',
        cursor: 'pointer',
    },
    fileName: {
        marginTop: 10,
    },
    thumbnail: {
        width: 64,
        height: 64,
        borderRadius: 4,
    },
    dropzone: {
        border: '1px dashed rgba(0, 0, 0, 0.2)',
        borderRadius: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    uploadBtn: {
        width: '100%',
        marginTop: 10,
    },
    progress: {
        cursor: 'default',
    },
}

export default NewPost;
