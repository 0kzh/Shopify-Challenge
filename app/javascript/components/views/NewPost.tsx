import React, { useEffect, useState } from "react";
import Dropzone from 'react-dropzone';
import axios from "axios";
import {
    Button,
    Container,
    Card,
    Row,
    Col,
    Link,
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

    const sendImageToController = async (payload) => {
        const { data, status } = await axios.post(`/posts`, payload);
        if (status === 200) {
            window.location = HOME_ROUTE
        } else {
            alert('Error uploading image :(')
        }
    }

    const uploadFile = () => {
        let formPayload = new FormData();
        formPayload.append('image', selectedFile);
        sendImageToController(formPayload);
    }

    const processFile = (file) => {
        Object.assign(file, {
            preview: file['type'].split('/')[0] === 'image' ? URL.createObjectURL(file) : null,
            formattedSize: formatBytes(file.size, 0),
        });
        setSelectedFile(file)
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
                                    <img src={selectedFile ? selectedFile.preview : newPhoto} style={styles.thumbnail}/>
                                    <h2 style={styles.fileName}>{selectedFile ? `${selectedFile.name} (${selectedFile.formattedSize})` :
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
                <Button style={styles.uploadBtn} onClick={uploadFile}>Upload Image</Button>
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
    }
}

export default NewPost;
