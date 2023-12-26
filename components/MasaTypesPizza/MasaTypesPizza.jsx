'use client'

import { useEffect, useState } from 'react';

import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid'
import RadioGroup from '@mui/material/RadioGroup';
import Box from '@mui/material/Box'
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography'
import Radio from '@mui/material/Radio';

import massesJSON from '@/masses.json'

function fetchMasses() {
    return fetch('http://localhost:3000/api/pizzaMasses')
        .then(response => response.json())
        .then(data => {
            const listMasses = data.map(mass => {
                const { id, name, text } = mass
                return {
                    id,
                    name,
                    text
                }
            })
            const listMassesObject = {}
            listMasses.forEach(mass => {
                listMassesObject[mass.name] = {
                    ...mass
                }
            })
            return listMassesObject
        })
}

function MasaTypesPizza({ listMass, mass, handleMass }) {

    const [masses, setMasses] = useState({})

    useEffect(() => {
        fetchMasses().then(data => {
            console.log('data:', data)
            setMasses(data)
        })
    },[])

    return (
        <FormControl>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                onChange={handleMass}
            >
                <Grid
                    container
                    direction='row'
                    justifyContent="space-between"
                    columns={{ sm:12, md:24}}
                >
                    {
                        Object.keys(listMass).map((typeMass, index) => (
                            <Grid
                                key={typeMass + index}
                                item
                                sm={12}
                                md={11}
                                mt={1}
                                sx={ {
                                    minWidth: '49%',
                                    borderRadius: '10px',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0,0,0,0.1)'
                                    }
                                }}
                            >
                                <Box
                                    sx={{
                                        component: 'div',
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center'
                                    }}
                                >
                                    <FormControlLabel
                                        value={typeMass}
                                        control={
                                            <Radio
                                                checked={mass === typeMass ? true : false}
                                            />}
                                        label={
                                            <Typography
                                                variant='p'
                                                sx={{
                                                    width: 'inline',
                                                    fontWeight: 400
                                                }}
                                            >
                                                {typeMass.slice(5)}
                                            </Typography>
                                        }
                                        sx={ mass === typeMass
                                            ? {
                                                width: '100%',
                                                height: '100%',
                                                mt: 1,
                                                borderRadius: '10px',
                                                margin: 0,
                                                px: 2,
                                                pl: 0,
                                                py: 1,
                                            } : {
                                                width: '100%',
                                                height: '100%',
                                                mt: 1,
                                                borderRadius: '10px',
                                                margin: 0,
                                                px: 2,
                                                pl: 0,
                                                py: 1,   
                                            }
                                        }
                                    />
                                    <Typography
                                        id="modal-modal-description"
                                        sx={{
                                            width: 'inline',
                                            paddingRight: 1
                                        }}
                                    >
                                        ${listMass[typeMass]}
                                    </Typography>
                                </Box>
                                <Typography
                                    variant='miniature'
                                    component='p'
                                    sx={{
                                        paddingTop: 0
                                    }}
                                >
                                    {/* {massesJSON[typeMass].text} */}
                                    { masses[typeMass] && masses[typeMass].text}
                                </Typography>
                            </Grid>
                        ))    
                    }
                </Grid>
            </RadioGroup>
        </FormControl>
    )
}

export default MasaTypesPizza