'use client'

import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

// import { Document, Page } from 'react-pdf'
import { pdfjs, Document, Page } from 'react-pdf';
// import  privacidad from '/public/privacidad.pdf';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import { PDFDocumentProxy } from 'pdfjs-dist';

import { useState } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();

// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const pagerStyles = {
    position: 'fixed',
    bottom: '50px',
    left: '40%'
}

function ShowPDF() {

    const [numPages, setNumPages] = useState(null)
	const [pageNumber, setPageNumber] = useState(1)

    const onDocumentLoadSuccess = ({ numPages }) => {
		setNumPages(numPages);
	};

	const goToPrevPage = () =>
		setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1)

	const goToNextPage = () =>
		setPageNumber(
			pageNumber + 1 >= numPages ? numPages : pageNumber + 1)

    return (

        <Paper
            style={{
                overflowY: "auto",
                overflowX: 'hidden',
                width: '100%',
                position: 'relative'
            }}
        >
            <Document
                file={'/privacidad.pdf'}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />
            </Document>
            <Paper
                elevation={2}
                sx={{
                    position: 'fixed',
                    bottom: '50px',
                    left: '40%',
                    zIndex: '2'
                }}
            >
                <Grid
                    container
                    justify="center"
                    alignItems='center'
                    justifyContent='center'
                    sx={{

                    }}
                >
                    <IconButton
                        variant="contained"
                        color="primary"
                        size='small'
                        onClick={goToPrevPage}
                        disabled={pageNumber === 1}
                    >
                        {/* Prev */}
                        <KeyboardArrowLeftIcon />
                    </IconButton>
                    <Typography>
                        {pageNumber} / {numPages}
                    </Typography>
                    <IconButton
                        variant="contained"
                        color="primary"
                        size='small'
                        onClick={goToNextPage}
                        disabled={pageNumber === numPages}
                    >
                        <ChevronRightIcon />
                    </IconButton>
                </Grid>
            </Paper>
		</Paper>
    )
}

export default ShowPDF