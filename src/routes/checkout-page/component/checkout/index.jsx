import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useFetcher, useLoaderData } from 'react-router-dom'
import { AddressInputs } from '../address-inputs'
import { NameInputs } from '../name-inputs'

export default function Checkout() {
  const [expanded, setExpanded] = useState(false)
  const { data } = useLoaderData()
  const fetcher = useFetcher()
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <Box
      component={fetcher.Form}
      method='post'
      sx={{ m: 2 }}
    >
      <Typography
        variant='h4'
        align='center'
      >
        Check delivery details
      </Typography>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='Personal-data-content'
          id='Personal-data-header'
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Receiver name:
          </Typography>
          <Typography
            noWrap
            sx={{ color: 'text.secondary' }}
          >
            {data.firstName} {data.lastName}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <NameInputs data={data} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2bh-content'
          id='panel2bh-header'
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Phone & delivery address:
          </Typography>
          <Box>
            <Typography sx={{ color: 'text.secondary' }}>
              {data.phone}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {data.address.address}, {data.address.city},
              {data.address.postalCode}, {data.address.state}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <AddressInputs data={data} />
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}
